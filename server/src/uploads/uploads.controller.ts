import {
  Body,
  Controller, Delete, Headers,
  HttpStatus,
  ParseFilePipeBuilder,
  Post, UploadedFiles, UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {UploadsService} from './uploads.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UploadModel} from "./upload.model";
import {FilesInterceptor} from "@nestjs/platform-express";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";

@ApiTags('Uploads')
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {
  }

  @ApiOperation({summary: "Загрузка файла"})
  @ApiResponse({status: 200, type: UploadModel})
  @Roles("ADMIN", "EDITOR")
  @UseGuards(RolesGuard)
  @Post('/upload')
  @UseInterceptors(FilesInterceptor('file', 10))
  async uploadFile(@UploadedFiles(
    new ParseFilePipeBuilder()
      .addMaxSizeValidator({maxSize: 5000000})
      .build({errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY}),
  ) files: Express.Multer.File[], @Headers('Authorization') token: string) {
    return await this.uploadsService.uploadFiles(files, token);
  }

  @ApiOperation({summary: "Удаление файлов"})
  @ApiResponse({status: 200})
  @Delete('/remove')
  async removeFiles(@Body('ids') ids: number[]) {
    return this.uploadsService.removeFiles(ids);
  }
}
