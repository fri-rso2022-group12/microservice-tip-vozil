import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrometheusModule } from "@willsoto/nestjs-prometheus";
import { ConsulModule } from 'nestjs-consul';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { ConsulConfigService } from './custom-config/consul-config.service';
import { CustomConfigModule } from './custom-config/custom-config.module';
import { DatabaseConfigService } from './custom-config/database-config.service';
import { HealthModule } from './health/health.module';
import { HttpLoggingInterceptor } from './http-logging.interceptor';
import { MaintenanceMiddleware } from './maintenance.middleware';
import { ModelVozilaModule } from './model-vozila/model-vozila.module';
import { ProizvajalecModule } from './proizvajalec/proizvajalec.module';

@Module({
  imports: [
    CustomConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [CustomConfigModule],
      useExisting: DatabaseConfigService,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(__dirname, 'shema.gql'),
      installSubscriptionHandlers: true,
      sortSchema: true,
    }),
    HealthModule,
    PrometheusModule.register(),
    ConsulModule.forRootAsync({
      imports: [CustomConfigModule],
      inject: [ConsulConfigService],
      useFactory: async (consulConfigService: ConsulConfigService) => {
				return consulConfigService.getConfig();
			},
    }),
    ModelVozilaModule,
    ProizvajalecModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpLoggingInterceptor,
    },
    AppResolver,
    AppService, 
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MaintenanceMiddleware)
      .exclude('health/(.*)')
      .forRoutes('*');
  }
}
