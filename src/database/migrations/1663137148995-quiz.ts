import {MigrationInterface, QueryRunner} from "typeorm";

export class quiz1663137148995 implements MigrationInterface {
    name = 'quiz1663137148995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`quiz\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quiz\` json NOT NULL, \`hotelId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`quiz\` ADD CONSTRAINT \`FK_7285e4b7525df63f931fe8d22c8\` FOREIGN KEY (\`hotelId\`) REFERENCES \`hotel\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`video\` DROP FOREIGN KEY \`FK_cc21f2512092fe2305a84d2f98d\``);
        await queryRunner.query(`ALTER TABLE \`quiz\` DROP FOREIGN KEY \`FK_7285e4b7525df63f931fe8d22c8\``);
        await queryRunner.query(`ALTER TABLE \`account\` DROP FOREIGN KEY \`FK_77bf26eef8865441fb9bd53a364\``);
        await queryRunner.query(`ALTER TABLE \`body_recovery\` DROP FOREIGN KEY \`FK_c44e69b32a905592d73db4c5339\``);
        await queryRunner.query(`DROP INDEX \`REL_cc21f2512092fe2305a84d2f98\` ON \`video\``);
        await queryRunner.query(`DROP INDEX \`REL_77bf26eef8865441fb9bd53a36\` ON \`account\``);
        await queryRunner.query(`DROP INDEX \`REL_c44e69b32a905592d73db4c533\` ON \`body_recovery\``);
        await queryRunner.query(`ALTER TABLE \`video\` DROP INDEX \`IDX_cc21f2512092fe2305a84d2f98\``);
        await queryRunner.query(`ALTER TABLE \`video\` ADD CONSTRAINT \`FK_cc21f2512092fe2305a84d2f98d\` FOREIGN KEY (\`bodyRecoveryId\`) REFERENCES \`body_recovery\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`account\` DROP INDEX \`IDX_77bf26eef8865441fb9bd53a36\``);
        await queryRunner.query(`ALTER TABLE \`account\` ADD CONSTRAINT \`FK_77bf26eef8865441fb9bd53a364\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`body_recovery\` DROP INDEX \`IDX_c44e69b32a905592d73db4c533\``);
        await queryRunner.query(`ALTER TABLE \`body_recovery\` ADD CONSTRAINT \`FK_c44e69b32a905592d73db4c5339\` FOREIGN KEY (\`recoveryId\`) REFERENCES \`recovery\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`DROP TABLE \`quiz\``);
        await queryRunner.query(`CREATE INDEX \`REL_cc21f2512092fe2305a84d2f98\` ON \`video\` (\`bodyRecoveryId\`)`);
        await queryRunner.query(`CREATE INDEX \`REL_77bf26eef8865441fb9bd53a36\` ON \`account\` (\`roleId\`)`);
        await queryRunner.query(`CREATE INDEX \`REL_c44e69b32a905592d73db4c533\` ON \`body_recovery\` (\`recoveryId\`)`);
    }

}
