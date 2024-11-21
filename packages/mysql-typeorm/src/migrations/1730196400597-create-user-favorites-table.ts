import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserFavoritesTable1730196400597
  implements MigrationInterface
{
  name = 'CreateUserFavoritesTable1730196400597';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`user_favorites\` (
                \`user_id\` int NOT NULL,
                \`article_id\` int NOT NULL,
                INDEX \`IDX_5238ce0a21cc77dc16c8efe3d3\` (\`user_id\`),
                INDEX \`IDX_57c7c9e22aad40815268f28b5f\` (\`article_id\`),
                PRIMARY KEY (\`user_id\`, \`article_id\`)
            ) ENGINE = InnoDB
        `);

    await queryRunner.query(`
            ALTER TABLE \`user_favorites\`
            ADD CONSTRAINT \`FK_user_favorites_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE \`user_favorites\`
            ADD CONSTRAINT \`FK_user_favorites_article\` FOREIGN KEY (\`article_id\`) REFERENCES \`article\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`user_favorites\` DROP FOREIGN KEY \`FK_user_favorites_article\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`user_favorites\` DROP FOREIGN KEY \`FK_user_favorites_user\`
        `);

    await queryRunner.query(`
            DROP INDEX \`IDX_57c7c9e22aad40815268f28b5f\` ON \`user_favorites\`
        `);
    await queryRunner.query(`
            DROP INDEX \`IDX_5238ce0a21cc77dc16c8efe3d3\` ON \`user_favorites\`
        `);
    await queryRunner.query(`
            DROP TABLE \`user_favorites\`
        `);
  }
}
