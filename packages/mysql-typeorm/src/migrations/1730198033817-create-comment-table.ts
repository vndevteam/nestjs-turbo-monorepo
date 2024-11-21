import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCommentTable1730198033817 implements MigrationInterface {
  name = 'CreateCommentTable1730198033817';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`comment\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`body\` varchar(255) NOT NULL,
                \`article_id\` int NOT NULL,
                \`author_id\` int NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            ALTER TABLE \`comment\`
            ADD CONSTRAINT \`FK_comment_article\` FOREIGN KEY (\`article_id\`) REFERENCES \`article\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`comment\`
            ADD CONSTRAINT \`FK_comment_user\` FOREIGN KEY (\`author_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_comment_user\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_comment_article\`
        `);
    await queryRunner.query(`
            DROP TABLE \`comment\`
        `);
  }
}
