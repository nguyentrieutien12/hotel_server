import { IsNotEmpty } from 'class-validator';

export class CreateFeedbackDto {
  @IsNotEmpty()
  feedback: string;
  @IsNotEmpty()
  rate: number;
}
