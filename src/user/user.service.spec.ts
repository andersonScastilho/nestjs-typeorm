import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepositoryMock } from '../testing/user-repository.mock';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserRepositoryMock],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  test('Validar a definição do meu userService', () => {
    expect(userService).toBeDefined();
  });
});
