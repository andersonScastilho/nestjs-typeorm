import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config({
  path: process.env.ENV === 'test' ? '.env.test' : '.env',
});

const dataSource = new DataSource({
  type: 'postgres',
  port: +process.env.DB_PORT,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrations: [`${__dirname}/migrations/**/*.ts`],
});
export default dataSource;
