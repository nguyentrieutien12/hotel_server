import { AccountsService } from './../accounts/accounts.service';
import { Injectable } from '@nestjs/common';
import { comparePassword } from 'src/helpers/password_compare.helper';
import { JwtService } from '@nestjs/jwt';
import { getRepository } from 'typeorm';
import { Account } from 'src/accounts/entities/account.entity';
@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountsService,
    private jwtService: JwtService,
  ) {}

  async validateAccount(email: string, pass: string): Promise<any> {
    try {
      const account = await getRepository(Account)
        .createQueryBuilder('account')
        .where({ email: email })
        .getOne();
      console.log(account);
      const isMatch = await comparePassword(pass, account.password);
      if (account && isMatch === true) {
        const { password, address, sex, ...result } = account;
        return result;
      }
      return null;
    } catch (error) {
      console.log(1);
    }
  }
  async login(account: any) {
    const payload = { username: account.username, id: account.id };
    return {
      access_token: this.jwtService.sign(payload),
      email: account.email,
    };
  }
}
