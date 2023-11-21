import { AuthResetDto } from '../../auth/dto/auth-reset.dto';
import { resetTokenMock } from './reset-token.mock';

export const authResetDtoMock: AuthResetDto = {
  password: '123456',
  token: resetTokenMock,
};
