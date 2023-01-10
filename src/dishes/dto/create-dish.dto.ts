import { IsNotEmpty } from 'class-validator';

export class CreateDishDto {
  @IsNotEmpty()
  dishe_name: string;
  @IsNotEmpty()
  dishe_description: string;
  @IsNotEmpty()
  dishe_price: number;
  images: any[];
}
