import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {SettingService} from './setting.service';
import {ApiOperation, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {SettingModel} from "./Setting.model";
import {CreateSettingDto} from "./dto/create-setting.dto";
import {ChangeSettingDto} from "./dto/change-setting.dto";
import {RolesGuard} from "../auth/roles.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {SettingRemoveResponse} from "./responses/setting-remove-response.type";

@ApiTags('Settings')
@Controller('settings')
export class SettingController {
  constructor(private readonly settingService: SettingService) {
  }

  @Roles("ADMIN", "EDITOR")
  @UseGuards(RolesGuard)
  @ApiOperation({summary: "Создание нового поля"})
  @ApiResponse({type: SettingModel, status: 200})
  @ApiResponse({status: 403, type: SettingRemoveResponse})
  @ApiQuery({type: CreateSettingDto})
  @Post('/create')
  async createSetting(@Body() dto: CreateSettingDto) {
    return this.settingService.createSetting(dto);
  }

  @ApiOperation({summary: "Получение поля по значению"})
  @ApiResponse({type: SettingModel, status: 200})
  @ApiResponse({status: 404, type: SettingRemoveResponse})
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
  @ApiQuery({type: ChangeSettingDto})
  @ApiResponse({status: 404, type: SettingRemoveResponse})
  @Patch('/change')
  async changeSetting(@Body() dto: ChangeSettingDto) {
    return this.settingService.changeSetting(dto);
  }

  @Roles("ADMIN", "EDITOR")
  @UseGuards(RolesGuard)
  @ApiOperation({summary: "Удалить поле"})
  @ApiQuery({type: "setting_id", required: true, example: 1, description: "Уникальный идентификатор записи"})
  @ApiResponse({status: 200, type: SettingRemoveResponse})
  @ApiResponse({status: 404, type: SettingRemoveResponse})
  @Delete('/remove')
  async removeSetting(@Body('setting_id') setting_id: number) {
    return this.settingService.removeSettings(setting_id);
  }
}
