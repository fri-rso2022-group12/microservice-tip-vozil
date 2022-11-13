import { Test, TestingModule } from '@nestjs/testing';
import { ProizvajalecService } from './proizvajalec.service';

describe('ProizvajalecService', () => {
  let service: ProizvajalecService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProizvajalecService],
    }).compile();

    service = module.get<ProizvajalecService>(ProizvajalecService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
