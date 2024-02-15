import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {UploadModel} from "./upload.model";
import {UsersService} from "../users/users.service";
import {v4} from 'uuid';
import {MulterFileDto} from "./dto/multer-file.dto";

@Injectable()
export class UploadsService {
  constructor(@InjectModel(UploadModel) private uploadRepository: typeof UploadModel,
              private userService: UsersService) {
  }

  async uploadFiles(files: Express.Multer.File[], token: string) {
    const user = this.userService.getUserByToken(token);
    const newFiles = await Promise.all(
      files.map(async file => {
        const mimetype = file.mimetype;
        const currentFileType = file.mimetype.split('/')[1];
        const type = file.originalname.split('.')[1];
        const newName = v4();

        if(!mimetype.includes('image')) {
          return new MulterFileDto({
            buffer: file.buffer,
            originalname: `${newName}.${type}`,
            mimetype
          })
        }

        if(currentFileType == 'svg+xml') {
          return new MulterFileDto({
            buffer: file.buffer,
            originalname: `${newName}.svg`,
            mimetype
          })
        }
        
        const buffer = {};
        // return new MulterFileDto({
        //   buffer: buffer,
        //   originalname: `${newName}.${type}`,
        //   mimetype: mimetype
        // })
      })
    )
    console.log(files);
  }

  private convertToWebP(file: Buffer): Promise<Buffer> {
    return;
  }
}
