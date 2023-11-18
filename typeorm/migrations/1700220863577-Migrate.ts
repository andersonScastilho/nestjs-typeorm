import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Migrate1700219640435 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '63',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '127',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '127',
            isNullable: false,
          },
          {
            name: 'birth_at',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'role',
            type: 'int',
            isNullable: false,
            default: '1',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
