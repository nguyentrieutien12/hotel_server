import { Test, TestingModule } from '@nestjs/testing';
import { SeftCaresController } from './seft_cares.controller';
import { SeftCaresService } from './seft_cares.service';

describe('SeftCaresController', () => {
  let controller: SeftCaresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeftCaresController],
      providers: [SeftCaresService],
    }).compile();

    controller = module.get<SeftCaresController>(SeftCaresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
