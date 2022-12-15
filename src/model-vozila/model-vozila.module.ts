import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomConfigModule } from '../custom-config/custom-config.module';
import { HttpConfigService } from '../custom-config/http-config.service';
import { ModelVozila } from './model-vozila.entity';
import { ModelVozilaController } from './model-vozila.controller';
import { ModelVozilaService } from './model-vozila.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [CustomConfigModule],
      useExisting: HttpConfigService,
    }),
    TypeOrmModule.forFeature([
      ModelVozila,
    ]),
  ],
  providers: [ModelVozilaService],
  controllers: [ModelVozilaController]
})
export class ModelVozilaModule {}
