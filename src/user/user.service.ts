import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdadePatchUserDto } from './dtos/update-patch-user.dto';
import { UpdadePutUserDto } from './dtos/update-put-user.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(data: CreateUserDto) {
    if (
      await this.usersRepository.exist({
        where: {
          email: data.email,
        },
      })
    ) {
      throw new BadRequestException('Este email ja esta sendo utilizado');
    }

    const salt = await bcrypt.genSalt();

    data.password = await bcrypt.hash(data.password, salt);

    const user = this.usersRepository.create(data);

    return this.usersRepository.save(user);
  }

  async index() {
    return this.usersRepository.find();
  }

  async show(id: number) {
    await this.exists(id);
    return this.usersRepository.findOneBy({
      id: id,
    });
  }

  async update(
    id: number,
    { birth_at, email, name, password, role }: UpdadePutUserDto,
  ) {
    await this.exists(id);

    const salt = await bcrypt.genSalt();

    password = await bcrypt.hash(password, salt);

    await this.usersRepository.update(id, {
      email,
      name,
      password,
      birth_at: birth_at ? new Date(birth_at) : null,
      role: role,
    });

    return this.show(id);
  }

  async updatePartial(
    id: number,
    { birth_at, email, name, password, role }: UpdadePatchUserDto,
  ) {
    await this.exists(id);

    const data: any = {};

    if (email) {
      data.email = email;
    }

    if (birth_at) {
      data.birth_at = new Date(birth_at);
    }

    if (name) {
      data.name = name;
    }

    if (password) {
      const salt = await bcrypt.genSalt();

      data.password = await bcrypt.hash(password, salt);
    }

    if (role) {
      data.role = role;
    }

    await this.usersRepository.update(id, data);

    return this.show(id);
  }

  async delete(id: number) {
    await this.exists(id);

    await this.usersRepository.delete(id);

    return true;
  }

  async exists(id: number) {
    if (
      !(await this.usersRepository.exist({
        where: {
          id: id,
        },
      }))
    ) {
      throw new NotFoundException(`O usuario ${id} não`);
    }
  }
}
