import { Account } from './entities/account.entity';
import { getRepository } from 'typeorm';
import { ResetAccountDto } from './dto/reset-account.dto';
import { dirname, join } from 'path';
import { MailerService } from '@nestjs-modules/mailer';
import { AuthService } from './../auth/auth.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Request,
  Inject,
  forwardRef,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './../auth/constants';
import { hashPassword } from 'src/helpers/password_hash.helper';
@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    private jwtService: JwtService,
    private MailerService: MailerService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  // @Get('/reset-password')
  // async resetPassword(@Response() res) {
  //   return res.sendFile(__dirname + '/reset_password.html');
  // }
  @UseGuards(JwtAuthGuard)
  @Get('auth_token')
  getProfile(@Request() req) {
    return req.user;
  }
  @Post()
  // @UseInterceptors(FilesInterceptor('files', 300, { storage }))
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Body() createAccountDto: CreateAccountDto,
    // @UploadedFiles() files,
  ) {
    return await this.accountsService.create(createAccountDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  @Roles(Role.ADMIN)
  async findAll() {
    return await this.accountsService.findAll();
  }
  @Get(':email')
  async findOne(@Param('email') email: string) {
    return await this.accountsService.findOne(email);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(+id, updateAccountDto);
  }
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return await this.accountsService.remove(+id);
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    const result = await this.authService.login(req.user);
    return {
      ...result,
      statusCode: HttpStatus.ACCEPTED,
      message: 'Login Successfully!!',
    };
  }
  @Post('/send-email')
  async sendEmail(@Request() req) {
    try {
      const { email } = req.body;
      const token = this.jwtService.sign(
        { email },
        {
          expiresIn: '300s',
          secret: jwtConstants.reset_password,
        },
      );

      await this.MailerService.sendMail({
        to: email,
        from: 'tientrieu10111@gmail.com',
        subject: 'Welcome to Nice App! Confirm your Email',
        html: ` <a href="http://localhost:5173/confirm-password?email=${email}&token=${token}">Click To Change Password</a>`,
      });
      return {
        statusCode: HttpStatus.CREATED,
        message: `Send Email Successfully, Plese Open Your Email To Change Password !!!`,
      };
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/auth-token-reset_password/:token')
  async authTokenResetPassword(@Param('token') token: string) {
    try {
      const result = this.jwtService.verify(token, {
        secret: jwtConstants.reset_password,
      });
      if (result) {
        return {
          statusCode: HttpStatus.ACCEPTED,
        };
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    } catch (error) {
      console.log(error);
    }
  }
  @Post('/reset-password')
  @UsePipes(new ValidationPipe({ transform: true }))
  async resetPassword(@Body() resetAccountDto: ResetAccountDto) {
    try {
      const { password, comfirmPassword, email } = resetAccountDto;
      const pass = await hashPassword(password);
      const findAccount = await getRepository(Account)
        .createQueryBuilder('account')
        .where('email = :email', { email })
        .getOne();
      if (findAccount) {
        await getRepository(Account)
          .createQueryBuilder('account')
          .update()
          .set({ password: pass })
          .where('email = :email', { email })
          .execute();
        return {
          statusCode: HttpStatus.ACCEPTED,
          message: 'Update Password Successfully !',
        };
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Update Password Fail !',
      };
    } catch (error) {
      console.log(error);
    }
  }

  //   @Post('/profile/:id')
  //   @Roles(Role.ADMIN)
  //   getProfile(@Request() req) {
  //     console.log('hehe');
  //   }
}
