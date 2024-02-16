import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {UploadModel} from "./upload.model";
import {UsersService} from "../users/users.service";
import {v4} from 'uuid';
import {MulterFileDto} from "./dto/multer-file.dto";
import {SharpService} from "nestjs-sharp";
import {join} from "path";
import {access, mkdir, writeFile} from 'fs/promises';
import {authPlugins} from "mysql2";
import {FileResponse} from "./interface/file-response.interface";
import {SizeService} from "../size/size.service";
import * as crypto from "crypto";
import * as path from "path";

@Injectable()
export class UploadsService {
  constructor(@InjectModel(UploadModel) private uploadRepository: typeof UploadModel,
              private userService: UsersService,
              private sharpService: SharpService,
              private sizeService: SizeService) {
  }

  async uploadFiles(files: MulterFileDto[]) {
    const newFiles = await Promise.all(
      files.map(async file => {
        const mimetype = file.mimetype;
        const currentFileType = file.mimetype.split('/')[1];
        const type = file.originalname.split('.')[1];
        const size = file.size;
        const newName = v4();


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

    console.log(newFiles)
    // return await this.saveFiles(newFiles);
  }

  async saveFiles(files: MulterFileDto[]) {
    const uploadFolderOtherFiles = join(__dirname, '..', '..', 'static', "files")

    try {
      await access(uploadFolderOtherFiles);
    } catch (e) {
      await mkdir(uploadFolderOtherFiles, {recursive: true});
    }

    return await Promise.all(
      files.map(async (file): Promise<FileResponse> => {
        try {
          const currentFileType = file.mimetype.split('/')[1];

          if (!file.mimetype.includes('image')) {
            await writeFile(join(uploadFolderOtherFiles, file.originalname), file.buffer);

            return {
              url: `/static/files/${file.originalname}`,
              name: file.originalname,
              size: file.size
            }
          }

          if(currentFileType == "svg/xml") {

          }

          const hashed = crypto.createHash('md5').update(file.buffer).digest('base64');
          const folderPathForImage = this.createFolderPath(hashed);
          const sizes = this.cropAndConvertToWebP(file.buffer);




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

  private async cropAndConvertToWebP(buffer: Buffer) {
    const large = this.sharpService.edit(buffer)
      .resize({width: 1024, fit: "cover"})
      .webp({quality: 100, lossless: true, nearLossless: true});

    const medium = this.sharpService.edit(buffer)
      .resize({width: 300, fit: "cover"})
      .webp({quality: 100, lossless: true, nearLossless: true});

    const thumbnail = this.sharpService.edit(buffer)
      .resize(({width: 150, fit: "cover"}))
      .webp({quality: 100, lossless: true, nearLossless: true})

    return [large, medium, thumbnail];
  }

  private createFolderPath(hash: string) {
    const first2Letters = hash.substring(0, 2);
    const second2Letters = hash.substring(2, 4);

    return {
      path: join(__dirname, '..', '..', 'static', 'uploads', first2Letters, second2Letters),
      first2Letters,
      second2Letters
    }
  }
}
