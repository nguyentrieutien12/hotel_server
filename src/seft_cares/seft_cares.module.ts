import { Module } from '@nestjs/common';
import { SeftCaresService } from './seft_cares.service';
import { SeftCaresController } from './seft_cares.controller';

@Module({
  controllers: [SeftCaresController],
  providers: [SeftCaresService]
})
export class SeftCaresModule {}
