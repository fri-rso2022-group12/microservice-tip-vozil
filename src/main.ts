import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import * as fs from 'fs';
import helmet from 'helmet';
import { join } from 'path';

import { AppModule } from './app.module';

function getAppVersion(): string {
  if (fs.existsSync('package.json')) {
    try {
      const pkg = JSON.parse(fs.readFileSync('package.json').toLocaleString());
      return pkg.version || 'unknown';
    } catch {
      return 'unknown';
    }
  }
  return 'unknown';
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Get configuration
  const docPath = configService.get<string>('DOC_PATH');
  const enableDocs = configService.get<boolean>('DOCS');
  const globalPrefix = configService.get<string>('GLOBAL_PREFIX');
  const kafkaBroker = configService.get<string>('KAFKA_BROKER');
  const port = configService.get<number>('PORT');

  // REST global prefix
  if (globalPrefix)
    app.setGlobalPrefix(globalPrefix);

  // gRPC
  const gRPC = await app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      //port: port + 1,
      url: `localhost:${port + 1}`,
      package: 'rsomstipvozil',
      protoPath: join(__dirname, 'app.proto'),
    }
  });

  // Kafka
  const kafka = await app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [kafkaBroker],
      },
      consumer: {
        groupId: 'rso-ms-tip-vozil-model-vozila',
      }
    }
  });

  // Middlewares
  app.use(compression());
  app.use(helmet({
    contentSecurityPolicy: false,
  }));
  app.enableCors();
  app.enableShutdownHooks();

  // API documentation
  if (enableDocs) {
    const docConfig = new DocumentBuilder()
      .setTitle('Tip vozil')
      .setDescription('Tip vozil API description')
      .setVersion(getAppVersion())
      .addTag('health', 'Health')
      .addTag('model-vozila', 'Model vozila')
      .addTag('proizvajalec', 'Proizvajalec')
      .build();
    const document = SwaggerModule.createDocument(app, docConfig);
    SwaggerModule.setup(docPath, app, document);
  }

  await app.startAllMicroservices();
  await app.listen(port);
}
bootstrap();
