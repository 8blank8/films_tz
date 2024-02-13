import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1707759622277 implements MigrationInterface {
    name = 'Migration1707759622277'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "genre_entity" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP, "name" character varying NOT NULL, "locateName" character varying NOT NULL, "description" character varying NOT NULL, "isDeleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_cae0cec334ef1e35fe187160f0d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "film_entity" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP, "title" character varying NOT NULL, "locateTitle" character varying NOT NULL, "year" integer NOT NULL, "rating" double precision NOT NULL, "description" character varying NOT NULL, "isDeleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_cdbbf1dbffec037cfeb75f01102" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "film_entity"`);
        await queryRunner.query(`DROP TABLE "genre_entity"`);
    }

}
