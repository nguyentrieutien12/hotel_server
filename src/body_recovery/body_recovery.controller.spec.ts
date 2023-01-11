import { Test, TestingModule } from '@nestjs/testing';
import { BodyRecoveryController } from './body_recovery.controller';
import { BodyRecoveryService } from './body_recovery.service';

describe('BodyRecoveryController', () => {
  let controller: BodyRecoveryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BodyRecoveryController],
      providers: [BodyRecoveryService],
    }).compile();

    controller = module.get<BodyRecoveryController>(BodyRecoveryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
