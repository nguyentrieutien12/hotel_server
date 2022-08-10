import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { CreateHotelDto } from './create-hotel.dto';

export class UpdateHotelDto {
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
