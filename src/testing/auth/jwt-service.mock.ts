import { JwtService } from '@nestjs/jwt';
import { acessTokenMock } from './acessToken.mock';
import { jwtPayloadMock } from './jwt-payload.mock';

export const jwtServiceMock = {
  provide: JwtService,
  useValue: {
    sign: jest.fn().mockReturnValue(acessTokenMock),
    verify: jest.fn().mockReturnValue(jwtPayloadMock),
  },
};
