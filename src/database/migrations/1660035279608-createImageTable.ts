import {MigrationInterface, QueryRunner} from "typeorm";

export class createImageTable1660035279608 implements MigrationInterface {
    name = 'createImageTable1660035279608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`image\` (\`id\` int NOT NULL AUTO_INCREMENT, \`image_url\` varchar(255) NOT NULL, \`hotelId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`account\` ADD \`imageId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`image\` ADD CONSTRAINT \`FK_2420fe1ea864ea120915bf8b6c7\` FOREIGN KEY (\`hotelId\`) REFERENCES \`hotel\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`account\` ADD CONSTRAINT \`FK_aa6586a02b5985e17e3b85d4e5e\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` DROP FOREIGN KEY \`FK_aa6586a02b5985e17e3b85d4e5e\``);
        await queryRunner.query(`ALTER TABLE \`account\` DROP FOREIGN KEY \`FK_77bf26eef8865441fb9bd53a364\``);
        await queryRunner.query(`ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_2420fe1ea864ea120915bf8b6c7\``);
        await queryRunner.query(`DROP INDEX \`REL_aa6586a02b5985e17e3b85d4e5\` ON \`account\``);
        await queryRunner.query(`DROP INDEX \`REL_77bf26eef8865441fb9bd53a36\` ON \`account\``);
        await queryRunner.query(`ALTER TABLE \`account\` DROP INDEX \`IDX_77bf26eef8865441fb9bd53a36\``);
        await queryRunner.query(`ALTER TABLE \`account\` ADD CONSTRAINT \`FK_77bf26eef8865441fb9bd53a364\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`account\` DROP INDEX \`IDX_aa6586a02b5985e17e3b85d4e5\``);
        await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`imageId\``);
        await queryRunner.query(`DROP TABLE \`image\``);
        await queryRunner.query(`CREATE INDEX \`REL_77bf26eef8865441fb9bd53a36\` ON \`account\` (\`roleId\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_77bf26eef8865441fb9bd53a36\` ON \`account\` (\`roleId\`)`);
    }

}
