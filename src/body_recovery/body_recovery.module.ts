import { Module } from '@nestjs/common';
import { BodyRecoveryService } from './body_recovery.service';
import { BodyRecoveryController } from './body_recovery.controller';

@Module({
  controllers: [BodyRecoveryController],
  providers: [BodyRecoveryService]
})
export class BodyRecoveryModule {}
