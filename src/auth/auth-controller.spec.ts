import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthGuard } from '../guards/auth.guard';
import { guardMock } from '../testing/guard/guard.mock';
import { authServiceMock } from '../testing/auth/auth-service.mock';
import { fileServiceMock } from '../testing/file/file-service.mock';
import { acessTokenMock } from '../testing/auth/acessToken.mock';
import { authLoginDtoMock } from '../testing/auth/auth-login-dto.mock';
import { authRegisterDtoMock } from '../testing/auth/auth-register-dto.mock';
import { authForgetDtoMock } from '../testing/auth/auth-forget-dto.mock';
import { authResetDtoMock } from '../testing/auth/auth-reset-dto.mock';
import { userEntityList } from '../testing/user/user-entity-list.mock';
import { getPhoto } from '../testing/file/get-photo-mock';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [authServiceMock, fileServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .compile();

    authController = module.get<AuthController>(AuthController);
  });

  test('Validar a definição', () => {
    expect(authController).toBeDefined();
  });

  describe('Autenticação', () => {
    test('login method', async () => {
      const result = await authController.login(authLoginDtoMock);

      expect(result).toEqual(acessTokenMock);
    });

    test('register method', async () => {
      const result = await authController.register(authRegisterDtoMock);

      expect(result).toEqual(acessTokenMock);
    });

    test('forget method', async () => {
      const result = await authController.forget(authForgetDtoMock);

      expect(result).toEqual({
        success: true,
      });
    });

    test('reset method', async () => {
      const result = await authController.reset(authResetDtoMock);

      expect(result).toEqual(acessTokenMock);
    });
  });

  describe('Rotas autenticadas', () => {
    test('me method', async () => {
      const result = await authController.me(userEntityList[0]);

      expect(result).toEqual(userEntityList[0]);
    });

    test('uploadPhoto method', async () => {
      const photo = await getPhoto();

      const result = await authController.uploadPhoto(userEntityList[0], photo);

      expect(result).toEqual(photo);
    });
  });
});
