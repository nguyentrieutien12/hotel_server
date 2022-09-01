import { PartialType } from '@nestjs/mapped-types';
import { CreateBodyRecoveryDto } from './create-body_recovery.dto';

export class UpdateBodyRecoveryDto extends PartialType(CreateBodyRecoveryDto) {}
