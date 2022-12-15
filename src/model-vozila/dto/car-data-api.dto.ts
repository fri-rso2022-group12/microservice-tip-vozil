import { ApiProperty } from '@nestjs/swagger';

export class CarDataAPIDto {
  @ApiProperty({
    description: 'Identifikator izdelave modela avtomobila',
    example: 10,
    required: true,
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'Leto začetka proizvodnja izdelave modela avtomobila',
    example: 2007,
    required: true,
    type: Number,
  })
  year: number;

  @ApiProperty({
    description: 'Ime proizvajalca',
    example: 'Audi',
    required: true,
    type: String,
  })
  make: string;

  @ApiProperty({
    description: 'Naziv modela vozila',
    example: 'A3',
    required: true,
    type: String,
  })
  model: string;
}
