import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateHotelDto {
  @IsNotEmpty()
  hotel_name: string;
  @IsNotEmpty()
  @IsEmail()
  hotel_email: string;
  @IsNotEmpty()
  images: string;
}
