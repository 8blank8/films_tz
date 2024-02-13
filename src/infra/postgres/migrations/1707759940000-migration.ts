import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1707759940000 implements MigrationInterface {
    name = 'Migration1707759940000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "film_entity_genres_genre_entity" ("filmEntityId" uuid NOT NULL, "genreEntityId" uuid NOT NULL, CONSTRAINT "PK_3df402609753bc15a0744e4c69d" PRIMARY KEY ("filmEntityId", "genreEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_422fdbcd3eb672950005d94c94" ON "film_entity_genres_genre_entity" ("filmEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d778dacf3a44da494ca226431f" ON "film_entity_genres_genre_entity" ("genreEntityId") `);
        await queryRunner.query(`ALTER TABLE "film_entity_genres_genre_entity" ADD CONSTRAINT "FK_422fdbcd3eb672950005d94c948" FOREIGN KEY ("filmEntityId") REFERENCES "film_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "film_entity_genres_genre_entity" ADD CONSTRAINT "FK_d778dacf3a44da494ca226431f9" FOREIGN KEY ("genreEntityId") REFERENCES "genre_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "film_entity_genres_genre_entity" DROP CONSTRAINT "FK_d778dacf3a44da494ca226431f9"`);
        await queryRunner.query(`ALTER TABLE "film_entity_genres_genre_entity" DROP CONSTRAINT "FK_422fdbcd3eb672950005d94c948"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d778dacf3a44da494ca226431f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_422fdbcd3eb672950005d94c94"`);
        await queryRunner.query(`DROP TABLE "film_entity_genres_genre_entity"`);
    }

}
