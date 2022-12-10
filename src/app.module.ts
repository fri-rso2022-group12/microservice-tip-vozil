import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrometheusModule } from "@willsoto/nestjs-prometheus";

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomConfigModule } from './custom-config/custom-config.module';
import { DatabaseConfigService } from './custom-config/database-config.service';
import { HealthModule } from './health/health.module';
import { ModelVozilaModule } from './model-vozila/model-vozila.module';
import { ProizvajalecModule } from './proizvajalec/proizvajalec.module';

@Module({
  imports: [
    CustomConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [CustomConfigModule],
      useExisting: DatabaseConfigService,
    }),
    HealthModule,
    PrometheusModule.register(),
    ModelVozilaModule,
    ProizvajalecModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
