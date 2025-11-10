import { MigrationInterface, QueryRunner } from "typeorm";

export class Todo1762799504410 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
	await queryRunner.query(`
		CREATE TABLE "todos" (
			"id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
			"title" TEXT NOT NULL,
			"description" TEXT,
			"isCompleted" INTEGER NOT NULL DEFAULT 0,
			"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
			"updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
		)
	`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
	await queryRunner.query(`
		DROP TABLE "todos"
	`)
    }

}
