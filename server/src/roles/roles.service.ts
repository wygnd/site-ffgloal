import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {RolesModel} from "./roles.model";
import {CreateRoleDto} from "./dto/create-role.dto";
import {ChangeRoleDto} from "./dto/change-role.dto";

@Injectable()
export class RolesService {
  constructor(@InjectModel(RolesModel) private rolesRepository: typeof RolesModel) {
  }

  async createRole(dto: CreateRoleDto) {
    return this.rolesRepository.create(dto);
  }

  async getRoleByValue(value: string) {
    const role = await this.rolesRepository.findOne({where: {value}})
    if (!role) {
      throw new HttpException(`Роли ${value} не найдено`, HttpStatus.NOT_FOUND);
    }
    return role;
  }

  async getAllRoles() {
    return this.rolesRepository.findAll();
  }

  async changeRole(role_dto: ChangeRoleDto) {
    const role = await this.rolesRepository.findByPk(role_dto.role_id);

    if (!role) {
      throw new HttpException(`Такой роли не найдено`, HttpStatus.NOT_FOUND);
    }

    return await role.update({value: role_dto.value, description: role_dto.description})
  }

  async removeRole(role_id: number) {
    const role = await this.rolesRepository.findByPk(role_id);

    if (!role) {
      throw new HttpException(`Такой роли не найдено`, HttpStatus.NOT_FOUND);
    }

    await role.destroy();

    return {
      message: "Роль успешно удалена",
      status: HttpStatus.OK
    }
  }
}
