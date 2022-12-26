import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { ModelVozila } from '../model-vozila/model-vozila.entity';

@ObjectType()
@Entity()
export class Proizvajalec {
  @Field(type => Int)
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Field()
  @Column()
  naziv: string;

  @Field()
  @CreateDateColumn()
  dateCreated: string;

  @Field()
  @UpdateDateColumn()
  dateUpdated: string;

  @OneToMany(type => ModelVozila, modelVozila => modelVozila.proizvajalec)
  modeliVozil: ModelVozila[];
}
