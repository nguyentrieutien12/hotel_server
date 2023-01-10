import { IsNotEmpty } from 'class-validator';

export class CreateTreatmentDto {
  @IsNotEmpty()
  treatment_name: string;
  @IsNotEmpty()
  treatment_description: string;
  @IsNotEmpty()
  treatment_price: number;
  images: any;
}
