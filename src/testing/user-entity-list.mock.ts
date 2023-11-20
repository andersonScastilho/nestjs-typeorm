import { Role } from '../enums/role.enum';
import { UserEntity } from '../user/entities/user.entity';

export const userEntityList: UserEntity[] = [
  {
    birth_at: new Date('2000-01-01'),
    email: 'jonhdoe@gmail.com',
    name: 'john',
    password: '123456',
    role: Role.Admin,
    id: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    birth_at: new Date('2000-01-01'),
    email: 'jonhdoe@gmail.com',
    name: 'john',
    password: '123456',
    role: Role.Admin,
    id: 2,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    birth_at: new Date('2000-01-01'),
    email: 'jonhdoe@gmail.com',
    name: 'john',
    password: '123456',
    role: Role.Admin,
    id: 3,
    created_at: new Date(),
    updated_at: new Date(),
  },
];
