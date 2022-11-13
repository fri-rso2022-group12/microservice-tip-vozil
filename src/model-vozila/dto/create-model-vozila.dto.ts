import { ApiProperty } from '@nestjs/swagger';

import * as Joi from 'joi';

export class CreateModelVozilaDto {
  @ApiProperty({
    description: 'Naziv modela vozila',
    example: 'Oktavia',
    required: true,
    type: String,
  })
  naziv: string;

  @ApiProperty({
    description: 'Tip vozila',
    default: null,
    example: 'E',
    enum: ['B', 'D', 'E', 'P'],
    maxLength: 1,
    minLength: 1,
    nullable: true,
    required: false,
    type: String,
  })
  tip?: string | null;

  @ApiProperty({
    description: 'Kapaciteta goriva/energije avtomobila',
    example: 10,
    nullable: true,
    required: false,
    type: Number,
  })
  kapaciteta?: number | null;

  @ApiProperty({
    description: 'Število sedežev v vozilu',
    example: 5,
    nullable: true,
    required: false,
    type: Number,
  })
  stSedezev?: number | null;

  @ApiProperty({
    description: 'ID proizvajalca',
    example: 1,
    nullable: true,
    required: false,
    type: Number,
  })
  proizvajalecId?: number | null;
}

export const CreateModelVozilaSchema = Joi.object({
  id: Joi.any().strip(),
  naziv: Joi.string().min(1).required(),
  tip: Joi.string().max(1).min(1).allow(null, 'B', 'D', 'E', 'P'),
  kapaciteta: Joi.number().min(0).allow(null),
  stSedezev: Joi.number().min(0).allow(null),
  proizvajalecId: Joi.number().min(0).allow(null),

  dateCreated: Joi.any().strip(),
  dateUpdated: Joi.any().strip(),
  proizvajalec: Joi.any().strip(),
});
