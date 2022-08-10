import {MigrationInterface, QueryRunner} from "typeorm";

export class addContrainsToImages1660102394853 implements MigrationInterface {
    name = 'addContrainsToImages1660102394853'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`role_name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`account\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`sex\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`roleId\` int NULL, INDEX \`REL_77bf26eef8865441fb9bd53a36\` (\`roleId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`dish\` (\`id\` int NOT NULL AUTO_INCREMENT, \`dishe_name\` varchar(255) NOT NULL, \`dishe_description\` varchar(255) NOT NULL, \`dishe_price\` int NOT NULL, \`restaurantId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`restaurant\` (\`id\` int NOT NULL AUTO_INCREMENT, \`restaurant_name\` varchar(255) NOT NULL, \`restaurant_description\` varchar(255) NOT NULL, \`hotelId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`treatment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`treament_name\` varchar(255) NOT NULL, \`treament_description\` varchar(255) NOT NULL, \`treament_price\` int NOT NULL, \`spaId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`spa\` (\`id\` int NOT NULL AUTO_INCREMENT, \`hotel_name\` varchar(255) NOT NULL, \`hotel_description\` varchar(255) NOT NULL, \`hotelId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workout\` (\`id\` int NOT NULL AUTO_INCREMENT, \`workout_name\` varchar(255) NOT NULL, \`workout_description\` varchar(255) NOT NULL, \`workout_price\` int NOT NULL, \`gymId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`gym\` (\`id\` int NOT NULL AUTO_INCREMENT, \`gym_name\` varchar(255) NOT NULL, \`gym_description\` varchar(255) NOT NULL, \`hotelId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`seft_care\` (\`id\` int NOT NULL AUTO_INCREMENT, \`seftcare_name\` varchar(255) NOT NULL, \`seftcare_description\` varchar(255) NOT NULL, \`seftcare_price\` int NOT NULL, \`hotelId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`hotel\` (\`id\` int NOT NULL AUTO_INCREMENT, \`hotel_name\` varchar(255) NOT NULL, \`hotel_email\` varchar(255) NOT NULL, \`hotel_address\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`image\` (\`id\` int NOT NULL AUTO_INCREMENT, \`image_url\` varchar(255) NOT NULL, \`hotelId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`qrcode\` (\`id\` int NOT NULL AUTO_INCREMENT, \`qr_link\` text NOT NULL, \`hotelId\` int NULL, UNIQUE INDEX \`REL_b94610e1c57e1b49a9753272f4\` (\`hotelId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`account\` ADD CONSTRAINT \`FK_77bf26eef8865441fb9bd53a364\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`dish\` ADD CONSTRAINT \`FK_3bf1369e81b12358ba268f7f689\` FOREIGN KEY (\`restaurantId\`) REFERENCES \`restaurant\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`restaurant\` ADD CONSTRAINT \`FK_ae8702c59b842d2a596fc07591f\` FOREIGN KEY (\`hotelId\`) REFERENCES \`hotel\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`treatment\` ADD CONSTRAINT \`FK_da75d9b6a87a95e539f4aa98786\` FOREIGN KEY (\`spaId\`) REFERENCES \`spa\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`spa\` ADD CONSTRAINT \`FK_218c86e789cf957ba51af2dbfbb\` FOREIGN KEY (\`hotelId\`) REFERENCES \`hotel\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`workout\` ADD CONSTRAINT \`FK_ea12fe4aba1f0e9db86c86adae6\` FOREIGN KEY (\`gymId\`) REFERENCES \`gym\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`gym\` ADD CONSTRAINT \`FK_9d2894bdc0d2f9fd0afca7e069d\` FOREIGN KEY (\`hotelId\`) REFERENCES \`hotel\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`seft_care\` ADD CONSTRAINT \`FK_570d989b7d75b459b95d8d67221\` FOREIGN KEY (\`hotelId\`) REFERENCES \`hotel\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`image\` ADD CONSTRAINT \`FK_2420fe1ea864ea120915bf8b6c7\` FOREIGN KEY (\`hotelId\`) REFERENCES \`hotel\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`qrcode\` ADD CONSTRAINT \`FK_b94610e1c57e1b49a9753272f4d\` FOREIGN KEY (\`hotelId\`) REFERENCES \`hotel\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`qrcode\` DROP FOREIGN KEY \`FK_b94610e1c57e1b49a9753272f4d\``);
        await queryRunner.query(`ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_2420fe1ea864ea120915bf8b6c7\``);
        await queryRunner.query(`ALTER TABLE \`seft_care\` DROP FOREIGN KEY \`FK_570d989b7d75b459b95d8d67221\``);
        await queryRunner.query(`ALTER TABLE \`gym\` DROP FOREIGN KEY \`FK_9d2894bdc0d2f9fd0afca7e069d\``);
        await queryRunner.query(`ALTER TABLE \`workout\` DROP FOREIGN KEY \`FK_ea12fe4aba1f0e9db86c86adae6\``);
        await queryRunner.query(`ALTER TABLE \`spa\` DROP FOREIGN KEY \`FK_218c86e789cf957ba51af2dbfbb\``);
        await queryRunner.query(`ALTER TABLE \`treatment\` DROP FOREIGN KEY \`FK_da75d9b6a87a95e539f4aa98786\``);
        await queryRunner.query(`ALTER TABLE \`restaurant\` DROP FOREIGN KEY \`FK_ae8702c59b842d2a596fc07591f\``);
        await queryRunner.query(`ALTER TABLE \`dish\` DROP FOREIGN KEY \`FK_3bf1369e81b12358ba268f7f689\``);
        await queryRunner.query(`ALTER TABLE \`account\` DROP FOREIGN KEY \`FK_77bf26eef8865441fb9bd53a364\``);
        await queryRunner.query(`DROP INDEX \`REL_b94610e1c57e1b49a9753272f4\` ON \`qrcode\``);
        await queryRunner.query(`DROP TABLE \`qrcode\``);
        await queryRunner.query(`DROP TABLE \`image\``);
        await queryRunner.query(`DROP TABLE \`hotel\``);
        await queryRunner.query(`DROP TABLE \`seft_care\``);
        await queryRunner.query(`DROP TABLE \`gym\``);
        await queryRunner.query(`DROP TABLE \`workout\``);
        await queryRunner.query(`DROP TABLE \`spa\``);
        await queryRunner.query(`DROP TABLE \`treatment\``);
        await queryRunner.query(`DROP TABLE \`restaurant\``);
        await queryRunner.query(`DROP TABLE \`dish\``);
        await queryRunner.query(`DROP INDEX \`REL_77bf26eef8865441fb9bd53a36\` ON \`account\``);
        await queryRunner.query(`DROP TABLE \`account\``);
        await queryRunner.query(`DROP TABLE \`role\``);
    }

}
