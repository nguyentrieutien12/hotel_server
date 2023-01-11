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
      console.log(error);
      
      throw new HttpException('Create Account Fail !', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Account[] | undefined> {
    return await getRepository(Account)
      .createQueryBuilder('account')
      .leftJoinAndSelect('account.role', 'role')
      .orderBy('account.id', 'DESC')
      .getMany();
  }
  async findOne(email: string): Promise<Account | undefined> {
    return await getRepository(Account)
      .createQueryBuilder('account')
      .leftJoinAndSelect('account.role', 'role')
      .where('account.email = :email', { email })
      .getOne();
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    let newUpdateAccount = {};
    if (updateAccountDto.password) {
      updateAccountDto.password = await hashPassword(updateAccountDto.password);
      var { username, email, address, sex, password, role } = updateAccountDto;
      newUpdateAccount = { username, email, address, sex, password, role };
    } else {
      var { username, email, address, sex, role } = updateAccountDto;
      newUpdateAccount = { username, email, address, sex, role };
    }

    try {
      await getRepository(Account)
        .createQueryBuilder('account')
        .update()
        .set(newUpdateAccount)
        .where('id = :id', { id })
        .execute();
      return {
        message: 'Update Account Successfully !',
        statusCode: HttpStatus.ACCEPTED,
      };
    } catch (error) {
      console.log(error);
      return {
        message: 'Update Account Fail !',
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async remove(id: number) {
    try {
      await getRepository(Account)
        .createQueryBuilder('account')
        .delete()
        .where('id = :id', { id })
        .execute();

      return {
        message: 'Delete Account SuccessFully !',
        statusCode: HttpStatus.ACCEPTED,
      };
    } catch (error) {
      return {
        message: 'Delete Account Fail !',
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }
}
