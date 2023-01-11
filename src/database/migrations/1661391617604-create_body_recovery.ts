import { MigrationInterface, QueryRunner } from 'typeorm';

export class createBodyRecovery1661391617604 implements MigrationInterface {
  name = 'createBodyRecovery1661391617604';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`recovery\` (\`id\` int NOT NULL AUTO_INCREMENT, \`recovery_name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`body_recovery\` (\`id\` int NOT NULL AUTO_INCREMENT, \`body_recovery_name\` varchar(255) NOT NULL, \`body_recovery_description\` varchar(255) NOT NULL, \`recoveryId\` int NULL, INDEX \`REL_c44e69b32a905592d73db4c533\` (\`recoveryId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`video\` (\`id\` int NOT NULL AUTO_INCREMENT, \`video_url\` varchar(255) NOT NULL, \`bodyRecoveryId\` int NULL, INDEX \`REL_cc21f2512092fe2305a84d2f98\` (\`bodyRecoveryId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`image\` ADD \`bodyRecoveryId\` int NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE \`body_recovery\` ADD CONSTRAINT \`FK_c44e69b32a905592d73db4c5339\` FOREIGN KEY (\`recoveryId\`) REFERENCES \`recovery\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`image\` ADD CONSTRAINT \`FK_a9a51908b81589d0151c6380221\` FOREIGN KEY (\`bodyRecoveryId\`) REFERENCES \`body_recovery\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`video\` ADD CONSTRAINT \`FK_cc21f2512092fe2305a84d2f98d\` FOREIGN KEY (\`bodyRecoveryId\`) REFERENCES \`body_recovery\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
