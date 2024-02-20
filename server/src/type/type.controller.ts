import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {TypeService} from './type.service';
import {RolesGuard} from "../auth/roles.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateTypeDto} from "./dto/create-type.dto";
import {TypeModel} from "./type.model";

@ApiTags('Types')
@Controller('types')
@Roles("ADMIN")
@UseGuards(RolesGuard)
export class TypeController {
  constructor(private readonly typeService: TypeService) {
  }

  @ApiOperation({summary: "Создание нового типа файла"})
  @ApiResponse({status: 200, type: TypeModel})
  @Post('/create')
  createType(@Body() dto: CreateTypeDto) {
    return this.typeService.createType(dto);
  }

  @ApiOperation({summary: "Получить все типы файлов"})
  @ApiResponse({status: 200, type: [TypeModel]})
  @Get()
  getTypes() {
    return this.typeService.getTypes();
  }
}
