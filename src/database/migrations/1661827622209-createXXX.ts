import {MigrationInterface, QueryRunner} from "typeorm";

export class createXXX1661827622209 implements MigrationInterface {
    name = 'createXXX1661827622209'

    public async up(queryRunner: QueryRunner): Promise<void> {
       
        await queryRunner.query(`ALTER TABLE \`recommend\` ADD \`hotelId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`recommend\` ADD CONSTRAINT \`FK_c9d4bcc5b5a1f5e05100ea2d4df\` FOREIGN KEY (\`hotelId\`) REFERENCES \`hotel\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`video\` DROP FOREIGN KEY \`FK_cc21f2512092fe2305a84d2f98d\``);
        await queryRunner.query(`ALTER TABLE \`body_recovery\` DROP FOREIGN KEY \`FK_c44e69b32a905592d73db4c5339\``);
        await queryRunner.query(`ALTER TABLE \`recommend\` DROP FOREIGN KEY \`FK_c9d4bcc5b5a1f5e05100ea2d4df\``);
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
        await queryRunner.query(`ALTER TABLE \`recommend\` DROP COLUMN \`hotelId\``);
        await queryRunner.query(`CREATE INDEX \`REL_cc21f2512092fe2305a84d2f98\` ON \`video\` (\`bodyRecoveryId\`)`);
        await queryRunner.query(`CREATE INDEX \`REL_c44e69b32a905592d73db4c533\` ON \`body_recovery\` (\`recoveryId\`)`);
        await queryRunner.query(`CREATE INDEX \`REL_77bf26eef8865441fb9bd53a36\` ON \`account\` (\`roleId\`)`);
    }

}
