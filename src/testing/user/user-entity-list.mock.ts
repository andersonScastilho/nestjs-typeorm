import { Role } from '../../enums/role.enum';
import { UserEntity } from '../../user/entities/user.entity';

export const userEntityList: UserEntity[] = [
  {
    birth_at: new Date('2000-01-01'),
    email: 'jonhdoe@gmail.com',
    name: 'john',
    password: '$2b$10$KTCMumuAvsZcxgEXCA4.x.sqeqtrWXmB7ptFGkF.f32XW3OE3Awb6',
    role: Role.Admin,
    id: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    birth_at: new Date('2000-01-01'),
    email: 'jonhdoe2@gmail.com',
    name: 'john',
    password: '$2b$10$KTCMumuAvsZcxgEXCA4.x.sqeqtrWXmB7ptFGkF.f32XW3OE3Awb6',
    role: Role.Admin,
    id: 2,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    birth_at: new Date('2000-01-01'),
    email: 'jonhdoe3@gmail.com',
    name: 'john',
    password: '$2b$10$KTCMumuAvsZcxgEXCA4.x.sqeqtrWXmB7ptFGkF.f32XW3OE3Awb6',
    role: Role.Admin,
    id: 3,
    created_at: new Date(),
    updated_at: new Date(),
  },
];
