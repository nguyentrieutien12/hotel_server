<<<<<<< HEAD
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
  phone_number: string;
  @IsNotEmpty()
  sex: string;
  password?: string;
  @Match('password')
  comfirmPassword?: string;
  role: Role;
  image?: string = 'Nguyen Thanh Tung';
}
=======
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
>>>>>>> a0289d6687ac0ef1ce860a35c4ad4fc74d5b88c7
