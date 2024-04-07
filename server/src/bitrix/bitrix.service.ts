import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateDealDto} from "./dto/create-deal.dto";
import {BitrixRepository} from "./bitrix.connect";


@Injectable()
export class BitrixService {
  private bitrixRepository = BitrixRepository;

  async create_deal(dto: CreateDealDto) {
    try {
      return await this.bitrixRepository.deals.create({
        TITLE: dto.name,
        UF_CRM_1712469619350: dto.phone,
        UF_CRM_1712469654603: dto.message,
        UF_CRM_1712469689890: dto.callback,
        ASSIGNED_BY_ID: "9",
      });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }

  }

  async get_deal_by_id(deal_id: string) {
    try {
      return await this.bitrixRepository.deals.get(deal_id);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
