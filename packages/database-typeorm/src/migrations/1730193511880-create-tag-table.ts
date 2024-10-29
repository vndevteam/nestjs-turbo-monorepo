import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTagTable1730193511880 implements MigrationInterface {
  name = 'CreateTagTable1730193511880';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "tag" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "PK_tag_id" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "tag"
        `);
  }
}
