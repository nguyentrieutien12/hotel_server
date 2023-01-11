import { Test, TestingModule } from '@nestjs/testing';
import { SeftCaresService } from './seft_cares.service';

describe('SeftCaresService', () => {
  let service: SeftCaresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeftCaresService],
    }).compile();

    service = module.get<SeftCaresService>(SeftCaresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
