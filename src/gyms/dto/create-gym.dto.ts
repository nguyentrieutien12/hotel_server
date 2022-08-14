import { IsEmpty, IsNotEmpty } from 'class-validator';

export class CreateGymDto {
  @IsNotEmpty()
  gym_name: string;
  @IsNotEmpty()
  gym_description: string;
  images: string[];
}
