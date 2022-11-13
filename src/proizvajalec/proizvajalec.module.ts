import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Proizvajalec } from './proizvajalec.entity';
import { ProizvajalecController } from './proizvajalec.controller';
import { ProizvajalecService } from './proizvajalec.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Proizvajalec,
    ]),
  ],
  providers: [
    ProizvajalecService,
  ],
  controllers: [
    ProizvajalecController,
  ],
})
export class ProizvajalecModule {}
