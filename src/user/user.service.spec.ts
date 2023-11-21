import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { userRepositoryMock } from '../testing/user/user-repository.mock';
import { userEntityList } from '../testing/user/user-entity-list.mock';
import { createUserDtoMock } from '../testing/user/create-user-dto.mock';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { updatePutUserDtoMock } from '../testing/user/update-put-user-dto.mock';
import { updatePatchUserDtoMock } from '../testing/user/update-patch-user-dto.mock';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userRepositoryMock],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(UserEntity));
  });

  test('Validar a definição do meu userService', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('create', () => {
    test('method create', async () => {
      jest.spyOn(userRepository, 'exist').mockResolvedValueOnce(false);

      const user = await userService.create(createUserDtoMock);

      expect(user).toEqual(userEntityList[0]);
    });
  });

  describe('read', () => {
    test('method index', async () => {
      const result = await userService.index();

      expect(result).toEqual(userEntityList);
    });

    test('method show', async () => {
      const result = await userService.show(1);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('update', () => {
    test('method update', async () => {
      const result = await userService.update(1, updatePutUserDtoMock);
      expect(result).toEqual(userEntityList[0]);
    });

    test('method update partial', async () => {
      const result = await userService.updatePartial(1, updatePatchUserDtoMock);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('delete', () => {
    test('method delete', async () => {
      const result = await userService.delete(1);

      expect(result).toEqual(true);
    });
  });
});
