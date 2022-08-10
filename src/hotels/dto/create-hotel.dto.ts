import { Image } from 'src/image/entities/image.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateHotelDto {
  @IsNotEmpty()
  hotel_name: string;
  @IsEmail()
  @IsNotEmpty()
  hotel_email: string;
  @IsNotEmpty()
  hotel_address: string;
  @IsNotEmpty()
  images: any[];
}
