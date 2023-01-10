import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { Match } from 'src/decorator/match.decorator';
import { Role } from 'src/roles/entities/role.entity';
export class UpdateAccountDto {
  @IsNotEmpty()
  username: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  sex: string;
  password?: string;
  @Match('password')
  comfirmPassword?: string;
  role: Role;
  image?: string = 'Nguyen Thanh Tung';
}
