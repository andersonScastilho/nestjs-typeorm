import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { userServiceMock } from '../testing/auth/user-service.mock';
import { AuthGuard } from '../guards/auth.guard';
import { guardMock } from '../testing/guard/guard.mock';
import { RoleGuard } from '../guards/role.guard';
import { UserService } from './user.service';
import { createUserDtoMock } from '../testing/user/create-user-dto.mock';
import { userEntityList } from '../testing/user/user-entity-list.mock';
import { updatePutUserDtoMock } from '../testing/user/update-put-user-dto.mock';
import { updatePatchUserDtoMock } from '../testing/user/update-patch-user-dto.mock';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [userServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .overrideGuard(RoleGuard)
      .useValue(guardMock)
      .compile();
    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  test('Validar definições', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('Teste da aplicação dos guards neste controller ', () => {
    test('Verifica se os guards estão aplicados no controller', () => {
      const guards = Reflect.getMetadata('__guards__', UserController);

      expect(guards.length).toEqual(2);
      expect(new guards[0]()).toBeInstanceOf(AuthGuard);
      expect(new guards[1]()).toBeInstanceOf(RoleGuard);
    });
  });

  describe('Create', () => {
    test('Create method', async () => {
      const result = await userController.create(createUserDtoMock);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Read', () => {
    test('Index method', async () => {
      const result = await userController.index();

      expect(result).toEqual(userEntityList);
    });

    test('Show method', async () => {
      const result = await userController.show(1);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Update', () => {
    test('Update method', async () => {
      const result = await userController.update(updatePutUserDtoMock, 1);

      expect(result).toEqual(userEntityList[0]);
    });

    test('UpdatePartial method', async () => {
      const result = await userController.updatePartial(
        updatePatchUserDtoMock,
        1,
      );

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Delete', () => {
    test('Delete method', async () => {
      const result = await userController.delete(1);

      expect(result).toEqual({
        success: true,
      });
    });
  });
});
