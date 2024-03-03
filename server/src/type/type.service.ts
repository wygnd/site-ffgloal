import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {TypeModel} from "./type.model";
import {CreateTypeDto} from "./dto/create-type.dto";
import {ChangeTypeDto} from "./dto/change-type.dto";
import {GetTypeDto} from "./dto/getType.dto";

@Injectable()
export class TypeService {
  constructor(@InjectModel(TypeModel) private typeRepository: typeof TypeModel) {
  }

  async createType(dto: CreateTypeDto) {
    return await this.typeRepository.create(dto);
  }

  async getTypes(order?: [string]) {
    const types = await this.typeRepository.findAll({order});

    if (!types) {
      throw new HttpException(`Типов не найдено`, HttpStatus.NOT_FOUND);
    }

    return types;
  }

  async getTypeByValue(value: string): Promise<TypeModel> {
    const type = await this.typeRepository.findOne({where: {value}})

    if (!type) {
      throw new HttpException(`Такого типа (${value}) не существует`, HttpStatus.NOT_FOUND);
    }

    return type;
  }

  async changeType(type_dto: ChangeTypeDto) {
    const type = await this.typeRepository.findByPk(type_dto.type_id);

    if (!type) {
      throw new HttpException(`Такой записи не найдено`, HttpStatus.NOT_FOUND);
    }

    return await type.update({value: type_dto.value, description: type_dto.description})
  }

  async removeType(type_id: number) {
    const type = await this.typeRepository.findByPk(type_id);

    if (!type) {
      throw new HttpException(`Такой записи не найдено`, HttpStatus.NOT_FOUND);
    }

    await type.destroy();

    return {message: "Запись успешно удалена", status: HttpStatus.OK}
  }
}
