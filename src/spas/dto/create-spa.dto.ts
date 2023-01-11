import { IsEmail, isNotEmpty, IsNotEmpty } from 'class-validator';
export class CreateSpaDto {
  @IsNotEmpty()
  spa_name: string;
  @IsNotEmpty()
  spa_description: string;
  @IsNotEmpty()
  hotel: any;
  @IsNotEmpty()
  images: any;
}
