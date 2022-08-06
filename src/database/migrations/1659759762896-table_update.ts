import { MigrationInterface, QueryRunner } from 'typeorm';

export class tableUpdate1659759762896 implements MigrationInterface {
  name = 'tableUpdate1659759762896';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`treatment\` DROP COLUMN \`treament_email\``,
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
      `ALTER TABLE \`account\` ADD CONSTRAINT \`FK_77bf26eef8865441fb9bd53a364\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`treatment\` ADD \`treament_email\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`REL_77bf26eef8865441fb9bd53a36\` ON \`account\` (\`roleId\`)`,
    );
  }
}
