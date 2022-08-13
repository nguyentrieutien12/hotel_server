import { MigrationInterface, QueryRunner } from 'typeorm';

export class ABC1660364981301 implements MigrationInterface {
  name = 'ABC1660364981301';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`image\` ADD \`dishId\` int NULL`);

    await queryRunner.query(
      `ALTER TABLE \`image\` ADD CONSTRAINT \`FK_957641b298c67cc692d1f69884a\` FOREIGN KEY (\`dishId\`) REFERENCES \`dish\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`qrcode\` DROP FOREIGN KEY \`FK_b94610e1c57e1b49a9753272f4d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`dish\` DROP FOREIGN KEY \`FK_3bf1369e81b12358ba268f7f689\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_957641b298c67cc692d1f69884a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`restaurant\` DROP FOREIGN KEY \`FK_ae8702c59b842d2a596fc07591f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`seft_care\` DROP FOREIGN KEY \`FK_570d989b7d75b459b95d8d67221\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`gym\` DROP FOREIGN KEY \`FK_9d2894bdc0d2f9fd0afca7e069d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`workout\` DROP FOREIGN KEY \`FK_ea12fe4aba1f0e9db86c86adae6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa\` DROP FOREIGN KEY \`FK_218c86e789cf957ba51af2dbfbb\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`treatment\` DROP FOREIGN KEY \`FK_da75d9b6a87a95e539f4aa98786\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`account\` DROP FOREIGN KEY \`FK_77bf26eef8865441fb9bd53a364\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_77bf26eef8865441fb9bd53a36\` ON \`account\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`account\` DROP INDEX \`IDX_77bf26eef8865441fb9bd53a36\``,
    );
    await queryRunner.query(`ALTER TABLE \`image\` DROP COLUMN \`dishId\``);
    await queryRunner.query(
      `CREATE INDEX \`REL_77bf26eef8865441fb9bd53a36\` ON \`account\` (\`roleId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`qrcode\` ADD CONSTRAINT \`FK_b94610e1c57e1b49a9753272f4d\` FOREIGN KEY (\`hotelId\`) REFERENCES \`hotel\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`dish\` ADD CONSTRAINT \`FK_3bf1369e81b12358ba268f7f689\` FOREIGN KEY (\`restaurantId\`) REFERENCES \`restaurant\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`restaurant\` ADD CONSTRAINT \`FK_ae8702c59b842d2a596fc07591f\` FOREIGN KEY (\`hotelId\`) REFERENCES \`hotel\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`seft_care\` ADD CONSTRAINT \`FK_570d989b7d75b459b95d8d67221\` FOREIGN KEY (\`hotelId\`) REFERENCES \`hotel\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`gym\` ADD CONSTRAINT \`FK_9d2894bdc0d2f9fd0afca7e069d\` FOREIGN KEY (\`hotelId\`) REFERENCES \`hotel\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`workout\` ADD CONSTRAINT \`FK_ea12fe4aba1f0e9db86c86adae6\` FOREIGN KEY (\`gymId\`) REFERENCES \`gym\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa\` ADD CONSTRAINT \`FK_218c86e789cf957ba51af2dbfbb\` FOREIGN KEY (\`hotelId\`) REFERENCES \`hotel\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`treatment\` ADD CONSTRAINT \`FK_da75d9b6a87a95e539f4aa98786\` FOREIGN KEY (\`spaId\`) REFERENCES \`spa\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`account\` ADD CONSTRAINT \`FK_77bf26eef8865441fb9bd53a364\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
