import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {RolesService} from './roles.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateRoleDto} from "./dto/create-role.dto";
import {RolesModel} from "./roles.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {ChangeRoleDto} from "./dto/change-role.dto";

@ApiTags('Roles')
@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {
  }

  @ApiOperation({summary: "Получить все роли"})
  @ApiResponse({status: 200, type: [RolesModel]})
  @Get()
  getRoles() {
    return this.rolesService.getAllRoles();
  }

  @ApiOperation({summary: "Создать новую роль"})
  @ApiResponse({status: 200, type: RolesModel})
  @Post('/create')
  createRole(@Body() roleDto: CreateRoleDto) {
    return this.rolesService.createRole(roleDto);
  }

  @ApiOperation({summary: "Изменить роль"})
  @ApiResponse({status: 200, type: RolesModel})
  @Patch('/change')
  changeRole(@Body() dto: ChangeRoleDto) {
    return this.rolesService.changeRole(dto);
  }

  @ApiOperation({summary: "Удалить роль"})
  @Delete('/remove/:role_id')
  removeRole(@Param('role_id') role_id: number) {
    return this.rolesService.removeRole(role_id);
  }
}
