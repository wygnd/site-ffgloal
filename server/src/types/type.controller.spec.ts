import {Test, TestingModule} from '@nestjs/testing';
import {TypeController} from './type.controller';
import {TypeService} from './type.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {TypeModel} from "./type.model";

describe('TypeController', () => {
  let typeController: TypeController;
  let typeService: TypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeController],
      providers: [TypeService],
    }).compile();

    typeController = module.get<TypeController>(TypeController);
    typeService = module.get<TypeService>(TypeService);
  });

  it('should be defined', () => {
    expect(typeController).toBeDefined();
  });
});
