import { Role } from '../../enums/role.enum';
import { UpdadePatchUserDto } from '../../user/dtos/update-patch-user.dto';

export const updatePatchUserDtoMock: UpdadePatchUserDto = {
  birth_at: '2000-01-01',
  email: 'jonhdoe@gmail.com',
  name: 'john',
  password: '123456',
  role: Role.User,
};
