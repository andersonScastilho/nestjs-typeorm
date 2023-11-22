import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { authRegisterDtoMock } from './../src/testing/auth/auth-register-dto.mock';
import { Role } from './../src/enums/role.enum';
import dataSource from '../typeorm/data-source';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let acessToken: string;
  let userId: number;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('Registrar novo usuario', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(authRegisterDtoMock);

    expect(response.statusCode).toEqual(201);

    expect(typeof response.body.acessToken).toEqual('string');
  });

  it('Fazer login com o novo usuario', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: authRegisterDtoMock.email,
        password: authRegisterDtoMock.password,
      });

    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.acessToken).toEqual('string');

    acessToken = response.body.acessToken;
  });

  it('Obter os dados do usuario logado', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/me')
      .set('Authorization', `bearer ${acessToken}`)
      .send();

    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.id).toEqual('number');
    expect(response.body.role).toEqual(Role.User);
  });

  it('Registrar um novo usuario como administrador', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        ...authRegisterDtoMock,
        role: Role.Admin,
        email: 'teste123@gmail.com',
      });

    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.acessToken).toEqual('string');

    acessToken = response.body.acessToken;
  });

  it('Validar se a função do novo usuario ainda e user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/me')
      .set('Authorization', `bearer ${acessToken}`)
      .send();

    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.id).toEqual('number');
    expect(response.body.role).toEqual(Role.User);

    userId = response.body.id;
  });

  it('Tentar visualizar a lista de todos os usuarios', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `bearer ${acessToken}`)
      .send();

    expect(response.statusCode).toEqual(403);
    expect(response.body.error).toEqual('Forbidden');
  });

  it('Alterando manualmente o usuario para a função admin', async () => {
    const ds = await dataSource.initialize();

    const queryRunner = ds.createQueryRunner();

    await queryRunner.query(
      `UPDATE users SET role = ${Role.Admin} WHERE id = ${userId}`,
    );

    const rows = await queryRunner.query(
      `SELECT * FROM users WHERE id = ${userId}`,
    );

    dataSource.destroy();

    expect(rows.length).toEqual(1);
    expect(rows[0].role).toEqual(Role.Admin);
  });

  it('Tentar visualizar a lista de todos os usuarios, agora com acesso', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `bearer ${acessToken}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.length).toEqual(2);
  });
});
