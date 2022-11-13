import { ApiProperty } from '@nestjs/swagger';

import * as Joi from 'joi';

export class UpdateProizvajalecDto {
  @ApiProperty({
    description: 'Ime proizvajalca',
    example: 'Skoda',
    required: false,
    type: String,
  })
  naziv: string;
}

export const UpdateProizvajalecSchema = Joi.object({
  naziv: Joi.string().min(1).max(255),
});
