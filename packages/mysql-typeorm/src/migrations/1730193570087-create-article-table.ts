import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateArticleTable1730193570087 implements MigrationInterface {
  name = 'CreateArticleTable1730193570087';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`article\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`slug\` varchar(255) NOT NULL,
                \`title\` varchar(255) NOT NULL,
                \`description\` varchar(255) NOT NULL DEFAULT '',
                \`body\` text NOT NULL,
                \`author_id\` int NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                UNIQUE INDEX \`UQ_article_slug\` (\`slug\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            ALTER TABLE \`article\`
            ADD CONSTRAINT \`FK_article_user\` FOREIGN KEY (\`author_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`article\` DROP FOREIGN KEY \`FK_article_user\`
        `);
    await queryRunner.query(`
            DROP INDEX \`UQ_article_slug\` ON \`article\`
        `);
    await queryRunner.query(`
            DROP TABLE \`article\`
        `);
  }
}
