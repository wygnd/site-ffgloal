import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {BitrixService} from './bitrix.service';
import {ApiTags} from "@nestjs/swagger";
import {CreateDealDto} from "./dto/create-deal.dto";

@ApiTags("bitrix")
@Controller('bitrix')
export class BitrixController {
  constructor(private readonly bitrixService: BitrixService) {
  }

  @Post('/deal/create')
  create_lead(@Body() dto: CreateDealDto) {
    return this.bitrixService.create_deal(dto);
  }

  @Get('/deal/:deal_id')
  get_deal(@Param('deal_id') deal_id: string) {
    return this.bitrixService.get_deal_by_id(deal_id);
  }
}
