import {Test, TestingModule} from '@nestjs/testing';
import {TypeService} from './type.service';
import {TypeController} from "./type.controller";
import {TypeModel} from "./type.model";
import {TypeInterface} from "./interface/type.interface";

describe('TypeService', () => {
  let service: TypeService;
  let controller: TypeController;

  const result: TypeInterface[] = [{type_id: 1, description: "", value: ""}];

  const mockTypeService = {
    getTypes: (): TypeInterface[] => (result),
  }

  const typeServiceProvider = {
    provide: TypeService,
    useValue: mockTypeService,
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeController],
      providers: [typeServiceProvider],
    }).compile();

    service = module.get<TypeService>(TypeService);
    controller = module.get<TypeController>(TypeController);
  });

  describe('findAll', () => {
    it('should return an array of types', async () => {
      jest.spyOn(service, 'getTypes').mockImplementation(async (): Promise<TypeInterface> => result);

      expect(await controller.getTypes()).toBe(result);
    });
  });
});
