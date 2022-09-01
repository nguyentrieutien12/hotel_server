import { IsNotEmpty } from 'class-validator';

export class CreateBodyRecoveryDto {
  @IsNotEmpty()
  body_recovery_name: string;
  @IsNotEmpty()
  body_recovery_description: string;
  @IsNotEmpty()
  video_url: string;
  @IsNotEmpty()
  images: [];
}
