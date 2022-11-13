import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Proizvajalec } from '../proizvajalec/proizvajalec.entity';

@Entity()
export class ModelVozila {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column()
  naziv: string;

  @Column({ type: 'char', length: 1, nullable: true })
  tip: string; // B - bencin, D - diesel, P - plin, E - elektrika

  @Column({ type: 'float', nullable: true, unsigned: true })
  kapaciteta: number;

  @Column({ nullable: true, unsigned: true })
  stSedezev: number | null;

  @CreateDateColumn()
  dateCreated: string;

  @UpdateDateColumn()
  dateUpdated: string;

  @Column({ unsigned: true, nullable: true })
  proizvajalecId: number;

  @ManyToOne(type => Proizvajalec, proizvajalec => proizvajalec.modeliVozil, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  proizvajalec: Proizvajalec;
}
