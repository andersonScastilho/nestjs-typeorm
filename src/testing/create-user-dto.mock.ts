import { Role } from '../enums/role.enum';
import { CreateUserDto } from '../user/dtos/create-user.dto';

export const createUserDtoMock: CreateUserDto = {
  birth_at: '2000-01-01',
  email: 'jonhdoe@gmail.com',
  name: 'john',
  password: '123456',
  role: Role.User,
};
