import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer/dist';
import { UserEntity } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class AuthService {
  private readonly audience = 'users';
  private readonly issuer = 'login';

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailerService: MailerService,

    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  createToken(user: UserEntity) {
    return {
      acessToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: '7 days',
          subject: String(user.id),
          audience: this.audience,
          issuer: this.issuer,
        },
      ),
    };
  }

  checarToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: this.audience,
        issuer: this.issuer,
      });

      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async login(email: string, password: string) {
    const user = await this.usersRepository.findOneBy({
      email: email,
    });

    if (!user) {
      throw new UnauthorizedException('Email e/ou senha incorreto');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Email e/ou senha incorreto');
    }

    return this.createToken(user);
  }

  async forget(email: string) {
    const user = await this.usersRepository.findOneBy({
      email: email,
    });

    if (!user) {
      throw new UnauthorizedException('Email está incorreto');
    }

    const token = this.jwtService.sign(
      {
        id: user.id,
      },
      {
        expiresIn: '5 minutes',
        subject: String(user.id),
        audience: this.audience,
        issuer: 'forget',
      },
    );

    await this.mailerService.sendMail({
      subject: 'Recuperação de senha',
      to: email,
      html: `<!DOCTYPE html>
      <html lang="pt-br">
        <head>
          <title>Título da página</title>
          <meta charset="utf-8">
        </head>
        <body>
        p ${user.name}você solicitou a recuperação de senha, por favor use o token a seguir: <a href='${token}'>${token}<a>

        </body>
      </html>`,
    });

    return true;
  }

  async reset(password: string, token: string) {
    try {
      const { id } = this.jwtService.verify<{ id: number }>(token, {
        audience: this.audience,
        issuer: 'forget',
      });

      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);

      await this.usersRepository.update(id, {
        password: passwordHash,
      });

      const user = await this.userService.show(id);

      return this.createToken(user);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async register(data: AuthRegisterDto) {
    delete data.role;

    const user = await this.userService.create(data);

    return this.createToken(user);
  }

  isValidToken(token: string) {
    try {
      this.checarToken(token);

      return true;
    } catch (e) {
      return false;
    }
  }
}
