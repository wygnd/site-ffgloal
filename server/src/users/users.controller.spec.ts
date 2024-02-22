import {Test, TestingModule} from '@nestjs/testing';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {UserModel} from "./user.model";
import {RolesModule} from "../roles/roles.module";
import {forwardRef} from "@nestjs/common";
import {AuthModule} from "../auth/auth.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {RolesModel} from "../roles/roles.model";
import {UserRolesModel} from "../roles/user-roles.model";

describe('UsersController', () => {
  let userController: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({

      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    userController = module.get<UsersController>(UsersController);
  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      const result = [];
      jest.spyOn(userService, 'getAllUsers').mockImplementation(async () => result);

      expect(await userController.getAllUsers()).toBe(result)
    })
  })
});
