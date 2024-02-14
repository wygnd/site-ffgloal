import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import { StatusService } from './status.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateStatusDto} from "./dto/create-status.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {StatusModel} from "./status.model";

@ApiTags('Status')
@UseGuards(JwtAuthGuard)
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @ApiOperation({summary: "Создание нового статуса"})
  @ApiResponse({status: 200, type: StatusModel})
  @Post('/create')
  createStatus(@Body() dto: CreateStatusDto) {
  return this.statusService.createStatus(dto);
  }

  @ApiOperation({summary: "Получение всех значений"})
  @ApiResponse({status: 200, type: [StatusModel]})
  @Get()
  getAllValues() {
    return this.statusService.getAll();
  }

  @ApiOperation({summary: "Получение статуса по значению"})
  @ApiResponse({status: 200, type: StatusModel})
  @Get("/:value")
  getStatusByValue(@Param('value') value: string) {
    return this.statusService.getStatusByValue(value);
  }
}
