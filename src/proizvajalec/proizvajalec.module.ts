import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Proizvajalec } from './proizvajalec.entity';
import { ProizvajalecController } from './proizvajalec.controller';
import { ProizvajalecResolver } from './proizvajalec.resolver';
import { ProizvajalecService } from './proizvajalec.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Proizvajalec,
    ]),
  ],
  providers: [
    ProizvajalecResolver,
    ProizvajalecService,
  ],
  controllers: [
    ProizvajalecController,
  ],
})
export class ProizvajalecModule {}
