import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ModelVozila } from './model-vozila.entity';
import { ModelVozilaController } from './model-vozila.controller';
import { ModelVozilaService } from './model-vozila.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      ModelVozila,
    ]),
  ],
  providers: [ModelVozilaService],
  controllers: [ModelVozilaController]
})
export class ModelVozilaModule {}
