import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { Match } from 'src/decorator/match.decorator';
import { Role } from 'src/roles/entities/role.entity';
export class CreateAccountDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  @Match('password')
  passwordConfirm: string;
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  sex: string;
  role: Role;
  image?: string = 'Nguyen Thanh Tung';
}
