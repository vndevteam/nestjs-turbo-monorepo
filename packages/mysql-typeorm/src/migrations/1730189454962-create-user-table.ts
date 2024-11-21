import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1730189454962 implements MigrationInterface {
  name = 'CreateUserTable1730189454962';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`user\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`username\` varchar(255) NOT NULL,
                \`email\` varchar(255) NOT NULL,
                \`password\` varchar(255) NOT NULL,
                \`image\` varchar(255) NOT NULL DEFAULT '',
                \`bio\` varchar(255) NOT NULL DEFAULT '',
                UNIQUE INDEX \`UQ_user_username\` (\`username\`),
                UNIQUE INDEX \`UQ_user_email\` (\`email\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX \`UQ_user_email\` ON \`user\`
        `);
    await queryRunner.query(`
            DROP INDEX \`UQ_user_username\` ON \`user\`
        `);
    await queryRunner.query(`
            DROP TABLE \`user\`
        `);
  }
}
