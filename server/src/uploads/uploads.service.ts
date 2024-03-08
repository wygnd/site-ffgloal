import {HttpException, HttpStatus, Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {UploadModel} from "./upload.model";
import {UsersService} from "../users/users.service";
import {MulterFileDto} from "./dto/multer-file.dto";
import {SharpService} from "nestjs-sharp";
import {join} from "path";
import {access, mkdir, writeFile, rm} from 'fs/promises';
import {SizeService} from "../size/size.service";
import * as crypto from "crypto";
import {SizesResponseDto} from "./dto/sizes-response.dto";
import {CreateFolderPathDto} from "./dto/create-folder-path.dto";
import {TypeService} from "../type/type.service";
import {CreateSizeDto} from "../size/dto/create-size.dto";
import {Op} from "sequelize";

@Injectable()
export class UploadsService {
  constructor(@InjectModel(UploadModel) private uploadRepository: typeof UploadModel,
              private userService: UsersService,
              private sharpService: SharpService,
              private sizeService: SizeService,
              private typeService: TypeService) {
  }

  private uploadFolderImages = join(__dirname, '..', '..', 'static', 'uploads');
  private uploadFolderOtherFiles = join(__dirname, '..', '..', 'static', "files");

  async uploadFiles(files: MulterFileDto[], token: string) {
    const user = this.userService.getUserByToken(token);
    const newFiles = await Promise.all(
      files.map(async file => {
        const mimetype = file.mimetype;
        const currentFileName = file.originalname.split('.')[0];
        const currentFileType = file.mimetype.split('/')[1];
        const size = file.size;

        if (!mimetype.includes('image')) {
          return new MulterFileDto({
            buffer: file.buffer,
            originalname: `${currentFileName}.${currentFileType}`,
            mimetype,
            size
          })
        }

        if (currentFileType == 'svg+xml') {
          return new MulterFileDto({
            buffer: file.buffer,
            originalname: `${currentFileName}.svg`,
            mimetype,
            size
          })
        }

        const buffer = await this.convertToWebP(file.buffer);
        return new MulterFileDto({
          buffer: buffer,
          originalname: `${currentFileName}.${currentFileType}`,
          mimetype: mimetype,
          size
        })
      })
    )

    return await this.saveFiles(newFiles, user.user_id);
  }

  private async saveFiles(files: MulterFileDto[], user_id: number) {
    return await Promise.all(
      files.map(async (file) => {
        try {
          const currentFileType = file.mimetype.split('/')[1];

          if (!file.mimetype.includes('image') || file.mimetype.includes('svg+xml')) {
            try {
              await access(this.uploadFolderOtherFiles);
            } catch (e) {
              await mkdir(this.uploadFolderOtherFiles, {recursive: true});
            }
            const type = await this.typeService.getTypeByValue("other");
            await writeFile(join(this.uploadFolderOtherFiles, file.originalname), file.buffer);
            const upload = await this.uploadRepository.create({
              author_id: user_id,
              url: `/static/files/${file.originalname}`,
              size: file.size,
              name: file.originalname,
              type_id: type.type_id
            })
            await upload.$set('type_model', type)

            return await this.uploadRepository.findByPk(upload.upload_id, {include: {all: true}})
          }

          try {
            await access(this.uploadFolderImages);
          } catch (e) {
            await mkdir(this.uploadFolderImages, {recursive: true});
          }

          const hashed = crypto.createHash('md5').update(file.buffer).digest('base64url').toString();
          const folderPathForImage = this.createFolderPath(hashed);
          const sizes = await this.cropAndConvertToWebP(file.buffer);
          try {
            await access(join(this.uploadFolderImages, folderPathForImage.path));
          } catch (e) {
            await mkdir(join(this.uploadFolderImages, folderPathForImage.path), {recursive: true});
          }
          await writeFile(join(this.uploadFolderImages, folderPathForImage.path, `${hashed}.webp`), file.buffer);
          await writeFile(join(this.uploadFolderImages, folderPathForImage.path, `${hashed}_1024.webp`), sizes.large);
          await writeFile(join(this.uploadFolderImages, folderPathForImage.path, `${hashed}_300.webp`), sizes.medium);
          await writeFile(join(this.uploadFolderImages, folderPathForImage.path, `${hashed}_150.webp`), sizes.thumbnail);

          const sizes_urls: CreateSizeDto = {
            large: `/static/uploads/${hashed}_1024.webp`,
            medium: `/static/uploads/${hashed}_300.webp`,
            thumbnail: `/static/uploads/${hashed}_150.webp`
          }
          const type = await this.typeService.getTypeByValue("image");
          const createdSizes = await this.sizeService.createSizeField(sizes_urls);
          const upload = await this.uploadRepository.create({
            author_id: user_id,
            url: `/static/uploads/${hashed}_1024.webp`,
            name: `${hashed}_1024.webp`,
            size: file.size,
            size_id: createdSizes.size_id,
            type_id: type.type_id
          })
          await upload.$set('type_model', type)
          await upload.$set('size_model', createdSizes);

          return await this.uploadRepository.findByPk(upload.upload_id, {include: {all: true}});
        } catch (e) {
          console.log(e);
          throw new InternalServerErrorException("Ошибка при записи файла", e);
        }
      })
    )
  }

  private async convertToWebP(buffer: Buffer): Promise<Buffer> {
    return await this.sharpService.edit(buffer).webp().toBuffer();
  }

  private async cropAndConvertToWebP(buffer: Buffer): Promise<SizesResponseDto> {
    const large = await this.sharpService.edit(buffer)
      .resize({width: 1024, fit: "cover"})
      .webp({quality: 100, lossless: true, nearLossless: true})
      .toBuffer();

    const medium = await this.sharpService.edit(buffer)
      .resize({width: 300, fit: "cover"})
      .webp({quality: 100, lossless: true, nearLossless: true})
      .toBuffer();

    const thumbnail = await this.sharpService.edit(buffer)
      .resize(({width: 150, fit: "cover"}))
      .webp({quality: 100, lossless: true, nearLossless: true})
      .toBuffer()

    return {large, medium, thumbnail};
  }

  private createFolderPath(hash: string): CreateFolderPathDto {
    const first2Letters = hash.substring(0, 2);
    const second2Letters = hash.substring(2, 4);

    return {
      path: `/${first2Letters}/${second2Letters}`,
      first2Letters,
      second2Letters
    }
  }

  async removeFiles(ids: number[]) {
    const files = await this.uploadRepository.findAll({
      where: {
        upload_id: {
          [Op.in]: ids,
        },
      },
      include: {all: true}
    })

    if (files.length === 0 || !files) {
      throw new HttpException(`Файлов не найдено`, HttpStatus.NOT_FOUND);
    }
    const isRemoveFromFolder: boolean[] = await this.removeFilesFromFolder(files);

    if (isRemoveFromFolder.includes(false)) {
      throw new HttpException('Что-то пошло не так', HttpStatus.BAD_REQUEST);
    }

    return true;
  }


  private async removeFilesFromFolder(files: UploadModel[]): Promise<boolean[]> {
    return await Promise.all(files.map(async (file): Promise<boolean> => {
        try {
          const fileType = file.type_model.value;
          const fileName = file.name.split('.')[0];
          const filePath = this.createFolderPath(fileName);
          await access(this.uploadFolderOtherFiles);

          if (fileType !== "image") {
            try {
              await rm(join(this.uploadFolderOtherFiles, file.name));
              await file.destroy();
              return true
            } catch (e) {
              console.log(e);
              return false;
            }
          }

          await rm(join(this.uploadFolderImages, filePath.path))
          await file.destroy();
          return true;
        } catch
          (e) {
          console.log(e);
          throw new InternalServerErrorException("Ошибка при удалении файла");
        }
      }
    ))
  }

  async getFiles(type_id: number = 0) {
    let files: UploadModel[];
    if (type_id === 0) {
      files = await this.uploadRepository.findAll({include: {all: true}});
      return files;
    }

    files = await this.uploadRepository.findAll({where: {type_id}, include: {all: true}});
    return files;
  }
}
