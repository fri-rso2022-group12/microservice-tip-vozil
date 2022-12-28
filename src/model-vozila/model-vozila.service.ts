import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { DeepPartial, Repository } from 'typeorm';

import { CarDataAPIDto } from './dto/car-data-api.dto';
import { ModelVozila } from './model-vozila.entity';

@Injectable()
export class ModelVozilaService {
  private readonly logger: Logger = new Logger(ModelVozilaService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @Inject('KAFKA_BROKER')
    private readonly kafkaClient: ClientKafka,
    @InjectRepository(ModelVozila)
    private readonly modelVozilaRepository: Repository<ModelVozila>,
  ) {}

  async getAll(): Promise<ModelVozila[]> {
    return await this.modelVozilaRepository.find({ relations: ['proizvajalec'] });
  }

  async getByProizvajalecId(id: number): Promise<ModelVozila[]> {
    return await this.modelVozilaRepository.findBy({ proizvajalecId: id });
  }

  async getById(id: number): Promise<ModelVozila> {
    return await await this.modelVozilaRepository.findOne({ where: { id: id }, relations: ['proizvajalec']});
  }

  async getIzdelaveById(id: number): Promise<CarDataAPIDto[]> {
    const modelVozila = await this.getById(id);
    if (!modelVozila)
      return null;
    
    // Usage of external API
    const data = await firstValueFrom(this.httpService.get(`https://${this.configService.get<string>('RAPIDAPI_HOST')}/cars`, {
      headers: {
        'X-RapidAPI-Key': this.configService.get<string>('RAPIDAPI_KEY'),
        'X-RapidAPI-Host': this.configService.get<string>('RAPIDAPI_HOST'),
      },
      params: {
        limit: '10',
        page: '0',
        make: modelVozila.proizvajalec.naziv,
        model: modelVozila.naziv,
      }
    }));
    
    return data.data;
  }

  async create(modelVozila: DeepPartial<ModelVozila>): Promise<void> {
    await this.modelVozilaRepository.insert(modelVozila);
  }

  async update(id: number, modelVozila: DeepPartial<ModelVozila>) {
    await this.modelVozilaRepository.update(id, modelVozila);
  }

  async delete(id: number): Promise<void> {
    await this.modelVozilaRepository.delete(id);

    this.logger.debug('KAFKA: BEFORE');
    this.kafkaClient.emit('model-vozila.deleted', { id: id });
    this.logger.debug('KAFKA: AFTER');
  }
}
