import { PartialType } from '@nestjs/mapped-types';
import { CreateSeftCareDto } from './create-seft_care.dto';

export class UpdateSeftCareDto extends PartialType(CreateSeftCareDto) {}
