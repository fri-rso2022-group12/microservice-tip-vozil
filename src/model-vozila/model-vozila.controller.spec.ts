import { Test, TestingModule } from '@nestjs/testing';
import { ModelVozilaController } from './model-vozila.controller';

describe('ModelVozilaController', () => {
  let controller: ModelVozilaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModelVozilaController],
    }).compile();

    controller = module.get<ModelVozilaController>(ModelVozilaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
