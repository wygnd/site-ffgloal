import {
  Controller, Headers,
  HttpStatus,
  ParseFilePipeBuilder,
  Post, UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import {UploadsService} from './uploads.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UploadModel} from "./upload.model";
import {FilesInterceptor} from "@nestjs/platform-express";

@ApiTags('uploads')
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {
  }

  @ApiOperation({summary: "Загрузка файла"})
  @ApiResponse({status: 200, type: UploadModel})
  @Post('/upload')
  @UseInterceptors(FilesInterceptor('file', 10))
  async uploadFile(@UploadedFiles(
    // new ParseFilePipeBuilder()
      // .addFileTypeValidator({fileType: 'svg'})
      // .addMaxSizeValidator({maxSize: 5000000})
      // .build({errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY}),
  ) files: Express.Multer.File[]) {
  return await this.uploadsService.uploadFiles(files);
  }
}
