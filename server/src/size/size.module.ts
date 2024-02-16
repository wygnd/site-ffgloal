import { Module } from '@nestjs/common';
import { SizeService } from './size.service';
import { SizeController } from './size.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {SizeModel} from "./size.model";

@Module({
  imports: [
    SequelizeModule.forFeature([SizeModel])
  ],
  controllers: [SizeController],
  providers: [SizeService],
  exports: [SizeService]
})
export class SizeModule {}
