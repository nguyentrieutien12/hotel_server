import { MigrationInterface, QueryRunner } from 'typeorm';

export class addEamil1662476705187 implements MigrationInterface {
  name = 'addEamil1662476705187';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`time\` varchar(255) NOT NULL, \`hotelId\` int NULL, \`treatmentId\` int NULL, \`dishId\` int NULL, \`workoutId\` int NULL, \`emailId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_9a7d7b198f413b24c3d0a850e98\` FOREIGN KEY (\`hotelId\`) REFERENCES \`hotel\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_c0cd5ccfc8f87f01fda5f60d425\` FOREIGN KEY (\`treatmentId\`) REFERENCES \`treatment\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_977a720b2e5040835dfa5a12284\` FOREIGN KEY (\`dishId\`) REFERENCES \`dish\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_efca872c25132553f0326c62630\` FOREIGN KEY (\`workoutId\`) REFERENCES \`workout\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_94e5e2a9d40d2ab0795b03e41b0\` FOREIGN KEY (\`emailId\`) REFERENCES \`account\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`video\` DROP FOREIGN KEY \`FK_cc21f2512092fe2305a84d2f98d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_94e5e2a9d40d2ab0795b03e41b0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_efca872c25132553f0326c62630\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_977a720b2e5040835dfa5a12284\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_c0cd5ccfc8f87f01fda5f60d425\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_9a7d7b198f413b24c3d0a850e98\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`body_recovery\` DROP FOREIGN KEY \`FK_c44e69b32a905592d73db4c5339\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`account\` DROP FOREIGN KEY \`FK_77bf26eef8865441fb9bd53a364\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_cc21f2512092fe2305a84d2f98\` ON \`video\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_c44e69b32a905592d73db4c533\` ON \`body_recovery\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_77bf26eef8865441fb9bd53a36\` ON \`account\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`video\` DROP INDEX \`IDX_cc21f2512092fe2305a84d2f98\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`video\` ADD CONSTRAINT \`FK_cc21f2512092fe2305a84d2f98d\` FOREIGN KEY (\`bodyRecoveryId\`) REFERENCES \`body_recovery\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`body_recovery\` DROP INDEX \`IDX_c44e69b32a905592d73db4c533\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`body_recovery\` ADD CONSTRAINT \`FK_c44e69b32a905592d73db4c5339\` FOREIGN KEY (\`recoveryId\`) REFERENCES \`recovery\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`account\` DROP INDEX \`IDX_77bf26eef8865441fb9bd53a36\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`account\` ADD CONSTRAINT \`FK_77bf26eef8865441fb9bd53a364\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(`DROP TABLE \`order\``);
    await queryRunner.query(
      `CREATE INDEX \`REL_cc21f2512092fe2305a84d2f98\` ON \`video\` (\`bodyRecoveryId\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`REL_c44e69b32a905592d73db4c533\` ON \`body_recovery\` (\`recoveryId\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`REL_77bf26eef8865441fb9bd53a36\` ON \`account\` (\`roleId\`)`,
    );
  }
}
