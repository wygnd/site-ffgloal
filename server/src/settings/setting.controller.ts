import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {SettingService} from './setting.service';
import {ApiOperation, ApiProperty, ApiResponse, ApiTags} from "@nestjs/swagger";
import {SettingModel} from "./Setting.model";
import {CreateSettingDto} from "./dto/create-setting.dto";
import {ChangeSettingDto} from "./dto/change-setting.dto";
import {RolesGuard} from "../auth/roles.guard";
import {Roles} from "../auth/roles-auth.decorator";

@ApiTags('Settings')
@Controller('settings')
export class SettingController {
  constructor(private readonly settingService: SettingService) {
  }

  @Roles("ADMIN", "EDITOR")
  @UseGuards(RolesGuard)
  @ApiOperation({summary: "Создание нового поля"})
  @ApiResponse({type: SettingModel, status: 200})
  @Post('/create')
  async createSetting(@Body() dto: CreateSettingDto) {
    return this.settingService.createSetting(dto);
  }

  @ApiOperation({summary: "Получение поля по значению"})
  @ApiResponse({type: SettingModel, status: 200})
  @Get('/:meta_key')
  async getSettingByKey(@Param('meta_key') meta_key: string) {
    return this.settingService.getSettingByKey(meta_key);
  }

  @ApiOperation({summary: "Получение всех полей"})
  @ApiResponse({type: SettingModel, status: 200})
  @Get()
  async getSettings() {
  return this.settingService.getSettings();
  }

  @Roles("ADMIN", "EDITOR")
  @UseGuards(RolesGuard)
  @ApiOperation({summary: "Изменить поле"})
  @ApiResponse({type: SettingModel, status: 200})
  @Patch('/change')
  async changeSetting(@Body() dto: ChangeSettingDto) {
    return this.settingService.changeSetting(dto);
  }

  @Roles("ADMIN", "EDITOR")
  @UseGuards(RolesGuard)
  @ApiOperation({summary: "Удалить поле"})
  @ApiResponse({status: 200})
  @Delete('/remove')
  async removeSetting(@Body('setting_id') setting_id: number) {
    return this.settingService.removeSettings(setting_id);
  }
}
