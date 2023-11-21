import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { userRepositoryMock } from '../testing/user/user-repository.mock';
import { jwtServiceMock } from '../testing/auth/jwt-service.mock';
import { userServiceMock } from '../testing/auth/user-service.mock';
import { mailerServiceMock } from '../testing/auth/mailer-service.mock';
import { userEntityList } from '../testing/user/user-entity-list.mock';
import { acessTokenMock } from '../testing/auth/acessToken.mock';
import { jwtPayloadMock } from '../testing/auth/jwt-payload.mock';
import { resetTokenMock } from '../testing/auth/reset-token.mock';
import { authRegisterDtoMock } from '../testing/auth/auth-register-dto.mock';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        userRepositoryMock,
        jwtServiceMock,
        userServiceMock,
        mailerServiceMock,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  test('validar a definição', () => {
    expect(authService).toBeDefined();
  });

  describe('token', () => {
    test('createToken method', () => {
      const result = authService.createToken(userEntityList[0]);

      expect(result).toEqual({ acessToken: acessTokenMock });
    });
  });

  test('checarToken method', () => {
    const result = authService.checarToken(acessTokenMock);

    expect(result).toEqual(jwtPayloadMock);
  });

  test('isValidToken', () => {
    const result = authService.isValidToken(acessTokenMock);

    expect(result).toEqual(true);
  });

  describe('Authenticação', () => {
    test('login mehtod', async () => {
      const result = await authService.login('jonhdoe@gmail.com', '123456');

      expect(result).toEqual({ acessToken: acessTokenMock });
    });

    test('forget mehtod', async () => {
      const result = await authService.forget('jonhdoe@gmail.com');

      expect(result).toEqual({
        success: true,
      });
    });

    test('reset mehtod', async () => {
      const result = await authService.reset('654321', resetTokenMock);

      expect(result).toEqual({ acessToken: acessTokenMock });
    });

    test('register mehtod', async () => {
      const result = await authService.register(authRegisterDtoMock);

      expect(result).toEqual({ acessToken: acessTokenMock });
    });
  });
});
