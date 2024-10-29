import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserFollowsTable1730196525915 implements MigrationInterface {
  name = 'CreateUserFollowsTable1730196525915';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user_follows" (
                "follower_id" integer NOT NULL,
                "following_id" integer NOT NULL,
                CONSTRAINT "PK_abc657d7ff1282910784b819171" PRIMARY KEY ("follower_id", "following_id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_f7af3bf8f2dcba61b4adc10823" ON "user_follows" ("follower_id")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_5a71643cec3110af425f92e76e" ON "user_follows" ("following_id")
        `);
    await queryRunner.query(`
            ALTER TABLE "user_follows"
            ADD CONSTRAINT "FK_user_follows_follower" FOREIGN KEY ("follower_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "user_follows"
            ADD CONSTRAINT "FK_user_follows_following" FOREIGN KEY ("following_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user_follows" DROP CONSTRAINT "FK_user_follows_following"
        `);
    await queryRunner.query(`
            ALTER TABLE "user_follows" DROP CONSTRAINT "FK_user_follows_follower"
        `);
    await queryRunner.query(`
            DROP INDEX "IDX_5a71643cec3110af425f92e76e"
        `);
    await queryRunner.query(`
            DROP INDEX "IDX_f7af3bf8f2dcba61b4adc10823"
        `);
    await queryRunner.query(`
            DROP TABLE "user_follows"
        `);
  }
}
