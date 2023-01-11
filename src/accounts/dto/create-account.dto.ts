import { Image } from 'src/image/entities/image.entity';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { Match } from 'src/decorator/match.decorator';
import { Role } from 'src/roles/entities/role.entity';
export class CreateAccountDto {
  @IsNotEmpty()
  username: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  sex: string;
  @IsNotEmpty()
  password: string;
  @Match('password')
  comfirmPassword: string;
  role: Role;
  image?: any = 'Nguyen Thanh Tung';
}
