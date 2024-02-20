import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {SizeService} from './size.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateSizeDto} from "./dto/create-size.dto";
import {SizeModel} from "./size.model";

@ApiTags('Sizes')
@Controller('size')
export class SizeController {
  constructor(private readonly sizeService: SizeService) {
  }

  @ApiOperation({summary: "Создание записи"})
  @ApiResponse({status: 200, type: SizeModel})
  @Post('/create')
  createSize(@Body() dto: CreateSizeDto) {
    return this.sizeService.createSizeField(dto);
  }

  @ApiOperation({summary: "Получение записи по уникальному идентификатору"})
  @ApiResponse({status: 200, type: SizeModel})
  @Get('/:size_id')
  getSize(@Param("size_id") size_id: number) {
    return this.sizeService.getSizeById(size_id);
  }

  @ApiOperation({summary: "Удаление записи"})
  @ApiResponse({status: 200})
  @Delete('/:size_id')
  removeSize(@Param('size_id') size_id: number) {
    return this.sizeService.removeSize(size_id);
  }
}
