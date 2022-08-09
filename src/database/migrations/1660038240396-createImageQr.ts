import { MigrationInterface, QueryRunner } from 'typeorm';

export class createImageQr1660038240396 implements MigrationInterface {
  name = 'createImageQr1660038240396';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`qrcode\` (\`id\` int NOT NULL AUTO_INCREMENT, \`qr_link\` text NOT NULL, \`hotelId\` int NULL, UNIQUE INDEX \`REL_b94610e1c57e1b49a9753272f4\` (\`hotelId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`hotel\` ADD \`qrcodeId\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`hotel\` ADD  INDEX \`IDX_42d36d9bfd10cacbd026fca0e4\` (\`qrcodeId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`qrcode\` ADD CONSTRAINT \`FK_b94610e1c57e1b49a9753272f4d\` FOREIGN KEY (\`hotelId\`) REFERENCES \`hotel\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`hotel\` ADD CONSTRAINT \`FK_42d36d9bfd10cacbd026fca0e46\` FOREIGN KEY (\`qrcodeId\`) REFERENCES \`qrcode\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`account\` DROP FOREIGN KEY \`FK_aa6586a02b5985e17e3b85d4e5e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`account\` DROP FOREIGN KEY \`FK_77bf26eef8865441fb9bd53a364\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`hotel\` DROP FOREIGN KEY \`FK_42d36d9bfd10cacbd026fca0e46\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`qrcode\` DROP FOREIGN KEY \`FK_b94610e1c57e1b49a9753272f4d\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_aa6586a02b5985e17e3b85d4e5\` ON \`account\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_77bf26eef8865441fb9bd53a36\` ON \`account\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_42d36d9bfd10cacbd026fca0e4\` ON \`hotel\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`account\` DROP INDEX \`IDX_aa6586a02b5985e17e3b85d4e5\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`account\` DROP INDEX \`IDX_77bf26eef8865441fb9bd53a36\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`account\` ADD CONSTRAINT \`FK_aa6586a02b5985e17e3b85d4e5e\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`account\` ADD CONSTRAINT \`FK_77bf26eef8865441fb9bd53a364\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`hotel\` DROP INDEX \`IDX_42d36d9bfd10cacbd026fca0e4\``,
    );
    await queryRunner.query(`ALTER TABLE \`hotel\` DROP COLUMN \`qrcodeId\``);
    await queryRunner.query(
      `DROP INDEX \`REL_b94610e1c57e1b49a9753272f4\` ON \`qrcode\``,
    );
    await queryRunner.query(`DROP TABLE \`qrcode\``);
    await queryRunner.query(
      `CREATE INDEX \`REL_77bf26eef8865441fb9bd53a36\` ON \`account\` (\`roleId\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_77bf26eef8865441fb9bd53a36\` ON \`account\` (\`roleId\`)`,
    );
  }
}
