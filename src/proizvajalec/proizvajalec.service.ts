import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { Proizvajalec } from './proizvajalec.entity';

@Injectable()
export class ProizvajalecService {
  constructor(
    @InjectRepository(Proizvajalec)
    private readonly proizvajalecRepository: Repository<Proizvajalec>,
  ) {}

  async getAll(): Promise<Proizvajalec[]> {
    return await this.proizvajalecRepository.find();
  }

  async getById(id: number): Promise<Proizvajalec> {
    return this.proizvajalecRepository.findOneBy({ id: id });
  }

  async create(proizvajalec: DeepPartial<Proizvajalec>): Promise<void> {
    await this.proizvajalecRepository.insert(proizvajalec);
  }

  async update(id: number, proizvajalec: DeepPartial<Proizvajalec>): Promise<void> {
    await this.proizvajalecRepository.update(id, proizvajalec);
  }

  async delete(id: number): Promise<void> {
    await this.proizvajalecRepository.delete(id);
  }
}
