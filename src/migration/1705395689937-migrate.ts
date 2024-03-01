import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1705395689937 implements MigrationInterface {
    name = 'Migrate1705395689937'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "UQ_605deebb499d06612ea913b63df"`);
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "regNO" SET DEFAULT '24/25-6353'`);
        await queryRunner.query(`ALTER TABLE "admission" DROP CONSTRAINT "UQ_43b624afbddffa857b35628d73b"`);
        await queryRunner.query(`ALTER TABLE "admission" ALTER COLUMN "regNO" SET DEFAULT '24/25-516'`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "UQ_605deebb499d06612ea913b63df" UNIQUE ("email", "regNO")`);
        await queryRunner.query(`ALTER TABLE "admission" ADD CONSTRAINT "UQ_43b624afbddffa857b35628d73b" UNIQUE ("email", "regNO")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admission" DROP CONSTRAINT "UQ_43b624afbddffa857b35628d73b"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "UQ_605deebb499d06612ea913b63df"`);
        await queryRunner.query(`ALTER TABLE "admission" ALTER COLUMN "regNO" SET DEFAULT '24/25-2714'`);
        await queryRunner.query(`ALTER TABLE "admission" ADD CONSTRAINT "UQ_43b624afbddffa857b35628d73b" UNIQUE ("regNO", "email")`);
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "regNO" SET DEFAULT '24/25-7710'`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "UQ_605deebb499d06612ea913b63df" UNIQUE ("regNO", "email")`);
    }

}
