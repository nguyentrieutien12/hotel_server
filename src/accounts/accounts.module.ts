import { jwtConstants } from './../auth/constants';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [AccountsController],
  providers: [AccountsService, AuthService],
  exports: [AccountsService],
})
export class AccountsModule {}
