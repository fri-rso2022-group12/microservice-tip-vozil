import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { ModelVozila } from './model-vozila.entity';

@Injectable()
export class ModelVozilaService {
  constructor(
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
    return await this.modelVozilaRepository.findOneBy({ id: id });
  }

  async create(modelVozila: DeepPartial<ModelVozila>): Promise<void> {
    await this.modelVozilaRepository.insert(modelVozila);
  }

  async update(id: number, modelVozila: DeepPartial<ModelVozila>) {
    await this.modelVozilaRepository.update(id, modelVozila);
  }

  async delete(id: number): Promise<void> {
    await this.modelVozilaRepository.delete(id);
  }
}
