import { Args, Resolver, Query } from '@nestjs/graphql';

import { Proizvajalec } from './proizvajalec.entity';
import { ProizvajalecService } from './proizvajalec.service';

@Resolver(of => Proizvajalec)
export class ProizvajalecResolver {
  constructor(
    private readonly proizvajalecService: ProizvajalecService,
  ) {}

  @Query(returns => [Proizvajalec], { name: 'proizvajalec_getAll' })
  async getAll(): Promise<Proizvajalec[]> {
    return await this.proizvajalecService.getAll();
  }


  @Query(returns => Proizvajalec, { name: 'proizvajalec_getById' })
  async getById(
    @Args('id') id: number
  ): Promise<Proizvajalec> {
    const proizvajalec = await this.proizvajalecService.getById(id);
    return proizvajalec;
  }
}
