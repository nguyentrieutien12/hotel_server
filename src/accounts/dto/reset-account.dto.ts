import { IsNotEmpty } from 'class-validator';
import { Match } from 'src/decorator/match.decorator';
export class ResetAccountDto {
  @IsNotEmpty()
  password: string;
  email: string;
  @Match('password')
  @IsNotEmpty()
  comfirmPassword: string;
}
