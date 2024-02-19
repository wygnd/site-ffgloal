import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {UploadModel} from "./upload.model";
import {UsersService} from "../users/users.service";
import {v4} from 'uuid';
import {MulterFileDto} from "./dto/multer-file.dto";
import {SharpService} from "nestjs-sharp";
import {join} from "path";
import {access, mkdir, writeFile} from 'fs/promises';
import {FileResponse} from "./interface/file-response.interface";
import {SizeService} from "../size/size.service";
import * as crypto from "crypto";
import * as path from "path";
import {SizesResponseDto} from "./interface/sizes-response.dto";
import {CreateFolderPathDto} from "./interface/create-folder-path.dto";
import {TypeService} from "../type/type.service";
import {CreateSizeDto} from "../size/dto/create-size.dto";

@Injectable()
export class UploadsService {
  constructor(@InjectModel(UploadModel) private uploadRepository: typeof UploadModel,
              private userService: UsersService,
              private sharpService: SharpService,
              private sizeService: SizeService,
              private typeService: TypeService) {
  }

  async uploadFiles(files: MulterFileDto[], token: string) {
    const user = this.userService.getUserByToken(token);
    const newFiles = await Promise.all(
      files.map(async file => {
        const newName = file.originalname;
        const mimetype = file.mimetype;
        const currentFileType = file.mimetype.split('/')[1];
        const type = file.originalname.split('.')[1];
        const size = file.size;
        // const newName = v4();


        if (!mimetype.includes('image')) {
          return new MulterFileDto({
            buffer: file.buffer,
            originalname: `${newName}.${type}`,
            mimetype,
            size
          })
        }

        if (currentFileType == 'svg+xml') {
          return new MulterFileDto({
            buffer: file.buffer,
            originalname: `${newName}.svg`,
            mimetype,
            size
          })
        }

        const buffer = await this.convertToWebP(file.buffer);
        return new MulterFileDto({
          buffer: buffer,
          originalname: `${newName}.${type}`,
          mimetype: mimetype,
          size
        })
      })
    )

    return await this.saveFiles(newFiles, user.user_id);
  }

  async saveFiles(files: MulterFileDto[], user_id: number) {
    const uploadFolderImages = join(__dirname, '..', '..', 'static', 'uploads');
    const uploadFolderOtherFiles = join(__dirname, '..', '..', 'static', "files")
    const uploadFolderSvg = join(__dirname, '..', '..', 'static', 'svg');


    return await Promise.all(
      files.map(async (file) => {
        try {
          const currentFileType = file.mimetype.split('/')[1];

          if (!file.mimetype.includes('image')) {
            try {
              await access(uploadFolderOtherFiles);
            } catch (e) {
              await mkdir(uploadFolderOtherFiles, {recursive: true});
            }
            const type = await this.typeService.getTypeByValue("file");
            await writeFile(join(uploadFolderOtherFiles, file.originalname), file.buffer);
            const upload = await this.uploadRepository.create({
              author_id: user_id,
              url: `/static/files/${file.originalname}`,
              size: file.size,
              name: file.originalname
            })
            await upload.$set('type', type.type_id)

            return await this.uploadRepository.findByPk(upload.upload_id, {include: {all: true}})
          }

          if (currentFileType == "svg+xml") {
            try {
              await access(uploadFolderSvg);
            } catch (e) {
              await mkdir(uploadFolderSvg, {recursive: true});
            }
            await writeFile(join(uploadFolderSvg, file.originalname), file.buffer);

            const type = await this.typeService.getTypeByValue("svg");
            const upload = await this.uploadRepository.create({
              author_id: user_id,
              url: `/static/svg/${file.originalname}`,
              name: file.originalname,
              size: file.size,
            })
            await upload.$set('type', type.type_id)
            return await this.uploadRepository.findByPk(upload.upload_id, {include: {all: true}})
          }

          try {
            await access(uploadFolderImages);
          } catch (e) {
            await mkdir(uploadFolderImages, {recursive: true});
          }

          const hashed = crypto.createHash('md5').update(file.buffer).digest('base64');
          const folderPathForImage = this.createFolderPath(hashed);
          const sizes = await this.cropAndConvertToWebP(file.buffer);

          try {
            await access(join(uploadFolderImages, folderPathForImage.path));
          } catch (e) {
            await mkdir(join(uploadFolderImages, folderPathForImage.path), {recursive: true});
          }
          await writeFile(join(uploadFolderImages, folderPathForImage.path, `${hashed}.webp`), file.buffer);
          await writeFile(join(uploadFolderImages, folderPathForImage.path, `${hashed}_1024.webp`), sizes.large);
          await writeFile(join(uploadFolderImages, folderPathForImage.path, `${hashed}_300.webp`), sizes.medium);
          await writeFile(join(uploadFolderImages, folderPathForImage.path, `${hashed}_150.webp`), sizes.thumbnail);

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
            size_id: createdSizes.size_id
          })
          await upload.$set('type', type.type_id)
          await upload.$set('size_model', createdSizes.size_id);

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
}
