import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hashPassword } from 'src/helpers/password_hash.helper';
import { getRepository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';
@Injectable()
export class AccountsService {
  async create(createAccountDto: CreateAccountDto) {
    try {
      const { email } = createAccountDto;
      const account = await this.findOne(email);
      if (account) {
        return {
          message: 'Account already exists in the system, please re-register!',
          statusCode: HttpStatus.BAD_REQUEST,
        };
      }
      createAccountDto.password = await hashPassword(createAccountDto.password);
      await getRepository(Account).save(createAccountDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Create Account Successfully !',
      };
    } catch (error) {
      throw new HttpException('Create Account Fail !', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Account[] | undefined> {
    return await getRepository(Account)
      .createQueryBuilder('account')
      .innerJoinAndSelect('account.role', 'role')
      .getMany();
  }
  async findOne(email: string): Promise<Account | undefined> {
    return await getRepository(Account)
      .createQueryBuilder('account')
      .leftJoinAndSelect('account.role', 'role')
      .where('account.email = :email', { email })
      .getOne();
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
