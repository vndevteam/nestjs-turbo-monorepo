import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTagTable1730193511880 implements MigrationInterface {
  name = 'CreateTagTable1730193511880';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`tag\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                UNIQUE INDEX \`UQ_tag_name\` (\`name\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX \`UQ_tag_name\` ON \`tag\`
        `);
    await queryRunner.query(`
            DROP TABLE \`tag\`
        `);
  }
}
