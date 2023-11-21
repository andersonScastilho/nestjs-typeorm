import { AuthService } from '../../auth/auth.service';
import { acessTokenMock } from './acessToken.mock';
import { jwtPayloadMock } from './jwt-payload.mock';

export const authServiceMock = {
  provide: AuthService,
  useValue: {
    createToken: jest.fn().mockReturnValue(acessTokenMock),
    checarTokne: jest.fn().mockReturnValue(jwtPayloadMock),
    isValidToken: jest.fn().mockReturnValue(true),
    login: jest.fn().mockResolvedValue(acessTokenMock),
    forget: jest.fn().mockResolvedValue({
      success: true,
    }),
    reset: jest.fn().mockResolvedValue(acessTokenMock),
    register: jest.fn().mockResolvedValue(acessTokenMock),
  },
};
