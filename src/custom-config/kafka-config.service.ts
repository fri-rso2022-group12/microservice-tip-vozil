import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProvider, ClientsModuleOptionsFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class KafkaConfigService implements ClientsModuleOptionsFactory {
  
  constructor(
    private readonly configService: ConfigService,
  ) {}

  createClientOptions(): ClientProvider | Promise<ClientProvider> {
    return {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [this.configService.get<string>('KAFKA_BROKER')],
        },
        consumer: {
          groupId: 'rso-ms-tip-vozil',
        }
      }
    }
  }
}
