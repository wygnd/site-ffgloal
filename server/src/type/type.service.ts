import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {TypeModel} from "./type.model";
import {CreateTypeDto} from "./dto/create-type.dto";

@Injectable()
export class TypeService {
  constructor(@InjectModel(TypeModel) private typeRepository: typeof TypeModel) {
  }

  async createType(dto: CreateTypeDto) {
    return await this.typeRepository.create(dto);
  }

  async getTypes() {
    const types = await this.typeRepository.findAll();

    if (!types) {
      throw new HttpException(`Типов не найдено`, HttpStatus.NOT_FOUND);
    }

    return types;
  }

  async getTypeByValue(value: string): Promise<TypeModel> {
    const type = await this.typeRepository.findOne({where: {value}})

    if(!type){
      throw new HttpException(`Такого типа (${value}) не существует`, HttpStatus.NOT_FOUND);
    }

    return type;
  }
}
