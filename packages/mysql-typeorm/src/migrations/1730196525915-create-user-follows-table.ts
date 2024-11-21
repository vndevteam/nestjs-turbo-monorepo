import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserFollowsTable1730196525915 implements MigrationInterface {
  name = 'CreateUserFollowsTable1730196525915';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`user_follows\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`follower_id\` int NOT NULL,
                \`followee_id\` int NOT NULL,
                INDEX \`UQ_user_follows_follower_id\` (\`follower_id\`),
                INDEX \`UQ_user_follows_followee_id\` (\`followee_id\`),
                UNIQUE INDEX \`UQ_user_follows_follower_id_followee_id\` (\`follower_id\`, \`followee_id\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            ALTER TABLE \`user_follows\`
            ADD CONSTRAINT \`FK_user_follows_follower_id\` FOREIGN KEY (\`follower_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`user_follows\`
            ADD CONSTRAINT \`FK_user_follows_followee_id\` FOREIGN KEY (\`followee_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`user_follows\` DROP FOREIGN KEY \`FK_user_follows_followee_id\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`user_follows\` DROP FOREIGN KEY \`FK_user_follows_follower_id\`
        `);
    await queryRunner.query(`
            DROP INDEX \`UQ_user_follows_follower_id_followee_id\` ON \`user_follows\`
        `);
    await queryRunner.query(`
            DROP INDEX \`UQ_user_follows_followee_id\` ON \`user_follows\`
        `);
    await queryRunner.query(`
            DROP INDEX \`UQ_user_follows_follower_id\` ON \`user_follows\`
        `);
    await queryRunner.query(`
            DROP TABLE \`user_follows\`
        `);
  }
}
