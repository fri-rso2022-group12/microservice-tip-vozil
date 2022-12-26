import { Test, TestingModule } from '@nestjs/testing';
import { ProizvajalecResolver } from './proizvajalec.resolver';

describe('ProizvajalecResolver', () => {
  let resolver: ProizvajalecResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProizvajalecResolver],
    }).compile();

    resolver = module.get<ProizvajalecResolver>(ProizvajalecResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
