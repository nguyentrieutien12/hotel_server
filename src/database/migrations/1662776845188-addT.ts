import {MigrationInterface, QueryRunner} from "typeorm";

export class addT1662776845188 implements MigrationInterface {
    name = 'addT1662776845188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`feedback\` (\`id\` int NOT NULL AUTO_INCREMENT, \`feedback\` varchar(255) NOT NULL, \`rate\` int NOT NULL, \`accountId\` int NULL, \`hotelId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`feedback\` ADD CONSTRAINT \`FK_41ba949b387b1817e4e8f41dc53\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`feedback\` ADD CONSTRAINT \`FK_41daf4c505115f4fd6355f51a6b\` FOREIGN KEY (\`hotelId\`) REFERENCES \`hotel\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`video\` DROP FOREIGN KEY \`FK_cc21f2512092fe2305a84d2f98d\``);
        await queryRunner.query(`ALTER TABLE \`feedback\` DROP FOREIGN KEY \`FK_41daf4c505115f4fd6355f51a6b\``);
        await queryRunner.query(`ALTER TABLE \`feedback\` DROP FOREIGN KEY \`FK_41ba949b387b1817e4e8f41dc53\``);
        await queryRunner.query(`ALTER TABLE \`body_recovery\` DROP FOREIGN KEY \`FK_c44e69b32a905592d73db4c5339\``);
        await queryRunner.query(`ALTER TABLE \`account\` DROP FOREIGN KEY \`FK_77bf26eef8865441fb9bd53a364\``);
        await queryRunner.query(`DROP INDEX \`REL_cc21f2512092fe2305a84d2f98\` ON \`video\``);
        await queryRunner.query(`DROP INDEX \`REL_c44e69b32a905592d73db4c533\` ON \`body_recovery\``);
        await queryRunner.query(`DROP INDEX \`REL_77bf26eef8865441fb9bd53a36\` ON \`account\``);
        await queryRunner.query(`ALTER TABLE \`video\` DROP INDEX \`IDX_cc21f2512092fe2305a84d2f98\``);
        await queryRunner.query(`ALTER TABLE \`video\` ADD CONSTRAINT \`FK_cc21f2512092fe2305a84d2f98d\` FOREIGN KEY (\`bodyRecoveryId\`) REFERENCES \`body_recovery\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`body_recovery\` DROP INDEX \`IDX_c44e69b32a905592d73db4c533\``);
        await queryRunner.query(`ALTER TABLE \`body_recovery\` ADD CONSTRAINT \`FK_c44e69b32a905592d73db4c5339\` FOREIGN KEY (\`recoveryId\`) REFERENCES \`recovery\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`account\` DROP INDEX \`IDX_77bf26eef8865441fb9bd53a36\``);
        await queryRunner.query(`ALTER TABLE \`account\` ADD CONSTRAINT \`FK_77bf26eef8865441fb9bd53a364\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`DROP TABLE \`feedback\``);
        await queryRunner.query(`CREATE INDEX \`REL_cc21f2512092fe2305a84d2f98\` ON \`video\` (\`bodyRecoveryId\`)`);
        await queryRunner.query(`CREATE INDEX \`REL_c44e69b32a905592d73db4c533\` ON \`body_recovery\` (\`recoveryId\`)`);
        await queryRunner.query(`CREATE INDEX \`REL_77bf26eef8865441fb9bd53a36\` ON \`account\` (\`roleId\`)`);
    }

}
