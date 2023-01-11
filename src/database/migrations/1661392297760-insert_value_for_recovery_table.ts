import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertValueForRecoveryTable1661392297760
  implements MigrationInterface
{
  name = 'insertValueForRecoveryTable1661392297760';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO recovery(\`id\`, \`recovery_name\`) VALUES (1,'nutrition')`,
    );
    await queryRunner.query(
      `INSERT INTO recovery(\`id\`, \`recovery_name\`) VALUES (2,'acupressure')`,
    );
    await queryRunner.query(
      `INSERT INTO recovery(\`id\`, \`recovery_name\`) VALUES (3,'qigong')`,
    );
    await queryRunner.query(
      `INSERT INTO recovery(\`id\`, \`recovery_name\`) VALUES (4,'breathwork')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`account\` DROP FOREIGN KEY \`FK_77bf26eef8865441fb9bd53a364\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_77bf26eef8865441fb9bd53a36\` ON \`account\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`account\` DROP INDEX \`IDX_77bf26eef8865441fb9bd53a36\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`account\` ADD CONSTRAINT \`FK_77bf26eef8865441fb9bd53a364\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `CREATE INDEX \`REL_77bf26eef8865441fb9bd53a36\` ON \`account\` (\`roleId\`)`,
    );
  }
}
