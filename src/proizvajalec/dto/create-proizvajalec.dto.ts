import { ApiProperty } from '@nestjs/swagger';

import * as Joi from 'joi';

export class CreateProizvajalecDto {
  @ApiProperty({
    description: 'Ime proizvajalca',
    example: 'Skoda',
    required: true,
    type: String,
  })
  naziv: string;
}

export const CreateProizvajalecSchema = Joi.object({
  naziv: Joi.string().min(1).max(255).required(),
});
