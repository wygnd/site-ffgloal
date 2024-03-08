import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {SettingModel} from "./Setting.model";
import {CreateSettingDto} from "./dto/create-setting.dto";
import {ChangeSettingDto} from "./dto/change-setting.dto";
import {SettingRemoveResponse} from "./responses/setting-remove-response.type";

@Injectable()
export class SettingService {
  constructor(@InjectModel(SettingModel) private settingRepository: typeof SettingModel) {
  }

  async createSetting(dto: CreateSettingDto) {
    const candidateSetting = await this.settingRepository.findOne({where: {meta_key: dto.meta_key}});

    if (candidateSetting) {
      throw new HttpException(`Такое поле уже существует`, HttpStatus.BAD_REQUEST);
    }

    return await this.settingRepository.create(dto);
  }

  async getSettingByKey(meta_key: string) {
    const candidateSetting = await this.settingRepository.findOne({where: {meta_key: meta_key}});

    if (!candidateSetting) {
      throw new HttpException(`Такого поля не существует`, HttpStatus.NOT_FOUND);
    }

    return candidateSetting;
  }

  async changeSetting(dto: ChangeSettingDto) {
    const candidateSetting = await this.settingRepository.findOne({where: {meta_key: dto.meta_key}});

    if (!candidateSetting) {
      throw new HttpException(`Такого поля не существует`, HttpStatus.NOT_FOUND);
    }

    return await candidateSetting.update({
      meta_key: dto.meta_key,
      meta_value: dto.meta_value,
    });
  }

  async getSettings() {
    return await this.settingRepository.findAll();
  }

  async removeSettings(setting_id: number): Promise<SettingRemoveResponse> {
    const candidateSetting = await this.settingRepository.findByPk(setting_id);

    if (!candidateSetting) {
      throw new HttpException(`Такого поля не существует`, HttpStatus.NOT_FOUND);
    }

    await candidateSetting.destroy();

    return {
      message: "Поле успешно удалено",
      statusCode: 200
    };
  }
}
