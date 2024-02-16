import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {SizeModel} from "./size.model";
import {CreateSizeDto} from "./dto/create-size.dto";

@Injectable()
export class SizeService {
  constructor(@InjectModel(SizeModel) private sizeRepository: typeof SizeModel) {}

  async createSizeField(dto: CreateSizeDto) {

  }
}
