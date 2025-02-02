import { Test, TestingModule } from '@nestjs/testing';
import { NcoreService } from './ncore.service';

describe('NcoreService', () => {
  let service: NcoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NcoreService],
    }).compile();

    service = module.get<NcoreService>(NcoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
