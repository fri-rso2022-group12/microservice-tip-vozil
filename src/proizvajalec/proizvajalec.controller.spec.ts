import { Test, TestingModule } from '@nestjs/testing';
import { ProizvajalecController } from './proizvajalec.controller';

describe('ProizvajalecController', () => {
  let controller: ProizvajalecController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProizvajalecController],
    }).compile();

    controller = module.get<ProizvajalecController>(ProizvajalecController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
