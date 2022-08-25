import { Test, TestingModule } from '@nestjs/testing';
import { BodyRecoveryService } from './body_recovery.service';

describe('BodyRecoveryService', () => {
  let service: BodyRecoveryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BodyRecoveryService],
    }).compile();

    service = module.get<BodyRecoveryService>(BodyRecoveryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
