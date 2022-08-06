import { IsEmail, isNotEmpty, IsNotEmpty } from 'class-validator';
export class CreateSpaDto {
  @IsNotEmpty()
  spa_name: string;
  @IsNotEmpty()
  @IsEmail()
  spa_description: string;
  @IsNotEmpty()
  hotel_id: number;
}
