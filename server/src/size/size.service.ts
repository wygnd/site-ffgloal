import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {SizeModel} from "./size.model";
import {CreateSizeDto} from "./dto/create-size.dto";

@Injectable()
export class SizeService {
  constructor(@InjectModel(SizeModel) private sizeRepository: typeof SizeModel) {
  }

  async createSizeField(dto: CreateSizeDto) {
    return await this.sizeRepository.create(dto);
  }

  async getSizeById(size_id: number) {
    const size = await this.sizeRepository.findByPk(size_id, {include: {all: true}});

    if (!size) {
      throw new HttpException(`Записи не существует`, HttpStatus.NOT_FOUND);
    }

    return size;
  }

  async removeSize(size_id: number) {
    const size = await this.sizeRepository.findByPk(size_id);

    if (!size) {
      throw new HttpException(`Записи не существует`, HttpStatus.NOT_FOUND);
    }

    return await size.destroy();
  }
}
