import { UpdadePutUserDto } from '../user/dtos/update-put-user.dto';
import { Role } from '../enums/role.enum';

export const updatePutUserDtoMock: UpdadePutUserDto = {
  birth_at: '2000-01-01',
  email: 'jonhdoe@gmail.com',
  name: 'john',
  password: '123456',
  role: Role.User,
};
