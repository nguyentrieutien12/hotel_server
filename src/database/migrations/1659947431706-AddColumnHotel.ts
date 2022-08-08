import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnHotel1659947431706 implements MigrationInterface {
  name = 'AddColumnHotel1659947431706';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`hotel\` ADD \`hotel_address\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`hotel\` DROP COLUMN \`hotel_address\``,
    );
  }
}
