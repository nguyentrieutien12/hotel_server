import { IsNotEmpty } from 'class-validator';

export class CreateWorkoutDto {
  @IsNotEmpty()
  workout_name: string;
  @IsNotEmpty()
  workout_description: string;
  @IsNotEmpty()
  workout_price: number;
  images: string[];
}
