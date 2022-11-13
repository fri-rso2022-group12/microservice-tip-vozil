import { Test, TestingModule } from '@nestjs/testing';
import { ModelVozilaService } from './model-vozila.service';

describe('ModelVozilaService', () => {
  let service: ModelVozilaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModelVozilaService],
    }).compile();

    service = module.get<ModelVozilaService>(ModelVozilaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
