import {Body, Controller, Post} from '@nestjs/common';
import { SizeService } from './size.service';
import {ApiTags} from "@nestjs/swagger";
import {CreateSizeDto} from "./dto/create-size.dto";

@ApiTags('sizes')
@Controller('size')
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  @Post('/create')
  createSize(@Body() dto: CreateSizeDto) {
    return this.sizeService.createSizeField(dto);
  }
}
