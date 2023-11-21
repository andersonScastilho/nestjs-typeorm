import { UserService } from '../../user/user.service';
import { userEntityList } from '../user/user-entity-list.mock';

export const userServiceMock = {
  provide: UserService,
  useValue: {
    show: jest.fn().mockResolvedValue(userEntityList[0]),
    index: jest.fn().mockResolvedValue(userEntityList),
    exists: jest.fn().mockResolvedValue(true),
    create: jest.fn().mockResolvedValue(userEntityList[0]),
    update: jest.fn().mockResolvedValue(userEntityList[0]),
    updatePartial: jest.fn().mockResolvedValue(userEntityList[0]),
    delete: jest.fn().mockResolvedValue(true),
  },
};
