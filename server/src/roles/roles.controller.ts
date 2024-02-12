import {Body, Controller, Get, Post} from '@nestjs/common';
import { RolesService } from './roles.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateRoleDto} from "./dto/create-role.dto";
import {RolesModel} from "./roles.model";

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({summary: "Получить все роли"})
  @ApiResponse({status: 200, type: [RolesModel]})
  @Get()
  getRoles() {
    return this.rolesService.getAllRoles();
  }

  @ApiOperation({summary: "Создать новую роль"})
  @ApiResponse({status: 200, type: RolesModel})
  @Post('/create')
  createRole(@Body() roleDto: CreateRoleDto){
    return this.rolesService.createRole(roleDto);
  }
}
