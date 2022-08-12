import { IsNotEmpty } from 'class-validator';

export class CreateRestaurantDto {
  @IsNotEmpty()
  restaurant_name: string;
  @IsNotEmpty()
  restaurant_description: string;
  images: string[];
}
