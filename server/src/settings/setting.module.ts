import {Module} from '@nestjs/common';
import {SettingService} from './setting.service';
import {SettingController} from './setting.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {SettingModel} from "./Setting.model";

@Module({
  imports: [
    SequelizeModule.forFeature(
      [SettingModel]
    )
  ],
  controllers: [SettingController],
  providers: [SettingService],
})
export class SettingModule {
}
