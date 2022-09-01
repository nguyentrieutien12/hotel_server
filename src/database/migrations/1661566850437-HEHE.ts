import { MigrationInterface, QueryRunner } from 'typeorm';

export class HEHE1661566850437 implements MigrationInterface {
  name = 'HEHE1661566850437';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`recommend\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NOT NULL, \`spaId\` int NULL, \`restaurantId\` int NULL, \`gymId\` int NULL, \`bodyRecoveryId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`recommend\` ADD CONSTRAINT \`FK_f50fce4ef63a82671fc9500e7b0\` FOREIGN KEY (\`spaId\`) REFERENCES \`spa\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`recommend\` ADD CONSTRAINT \`FK_fd655cd50add8037e0c7084bb98\` FOREIGN KEY (\`restaurantId\`) REFERENCES \`restaurant\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`recommend\` ADD CONSTRAINT \`FK_c29c2d5bac104ad890670e0babc\` FOREIGN KEY (\`gymId\`) REFERENCES \`gym\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`recommend\` ADD CONSTRAINT \`FK_40e75431e44176bd630e533d6f5\` FOREIGN KEY (\`bodyRecoveryId\`) REFERENCES \`body_recovery\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`video\` DROP FOREIGN KEY \`FK_cc21f2512092fe2305a84d2f98d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`body_recovery\` DROP FOREIGN KEY \`FK_c44e69b32a905592d73db4c5339\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`recommend\` DROP FOREIGN KEY \`FK_40e75431e44176bd630e533d6f5\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`recommend\` DROP FOREIGN KEY \`FK_c29c2d5bac104ad890670e0babc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`recommend\` DROP FOREIGN KEY \`FK_fd655cd50add8037e0c7084bb98\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`recommend\` DROP FOREIGN KEY \`FK_f50fce4ef63a82671fc9500e7b0\``,
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
    await queryRunner.query(`DROP TABLE \`recommend\``);
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
