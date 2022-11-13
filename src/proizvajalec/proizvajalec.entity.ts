import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { ModelVozila } from '../model-vozila/model-vozila.entity';

@Entity()
export class Proizvajalec {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column()
  naziv: string;

  @CreateDateColumn()
  dateCreated: string;

  @UpdateDateColumn()
  dateUpdated: string;

  @OneToMany(type => ModelVozila, modelVozila => modelVozila.proizvajalec)
  modeliVozil: ModelVozila[];
}
