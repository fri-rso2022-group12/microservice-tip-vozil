import { Body, Controller, Delete, Get, NotFoundException, Post, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse, ApiTags } from '@nestjs/swagger';

import { CreateProizvajalecDto, CreateProizvajalecSchema } from './dto/create-proizvajalec.dto';
import { JoiValidationPipe } from '../common/pipes/joi-validation.pipe';
import { Proizvajalec } from './proizvajalec.entity';
import { ProizvajalecService } from './proizvajalec.service';
import { UpdateProizvajalecDto, UpdateProizvajalecSchema } from './dto/update-proizvajalec.dto';

@ApiTags('proizvajalec')
@ApiBadRequestResponse({ description: 'Bad request' })
@ApiForbiddenResponse({ description: 'Ni ustreznih dovoljenj' })
@ApiUnauthorizedResponse({ description: 'Dostop dovoljen zgolj prijavljenim osebam' })
@Controller('proizvajalec')
export class ProizvajalecController {
  constructor(
    private readonly proizvajalecService: ProizvajalecService,
  ) {}
  
  @Get()
  @ApiOperation({ description: 'Pridobi vse proizvajalce' })
  @ApiOkResponse()
  async getAll(): Promise<Proizvajalec[]> {
    return await this.proizvajalecService.getAll();
  }

  @Get(':id')
  @ApiOperation({ description: 'Pridobi proizvajalca z določenim identifikatorjem' })
  @ApiNotFoundResponse({ description: 'Prozvajalec ne obstaja '})
  @ApiOkResponse()
  async getById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Proizvajalec> {
    const proizvajalec = await this.proizvajalecService.getById(id);
    if (!proizvajalec)
      throw new NotFoundException();

    return proizvajalec;
  }

  @Post()
  @ApiOperation({ description: 'Ustvari novega proizvajalca' })
  @ApiCreatedResponse()
  async create(
    @Body(new JoiValidationPipe(CreateProizvajalecSchema)) proizvajalec: CreateProizvajalecDto
  ): Promise<void> {
    await this.proizvajalecService.create(proizvajalec);
  }

  @Patch(':id')
  @ApiOperation({ description: 'Posodobi obstoječega prizvajalca' })
  @ApiOkResponse()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new JoiValidationPipe(UpdateProizvajalecSchema)) proizvajalec: UpdateProizvajalecDto
  ): Promise<void> {
    await this.proizvajalecService.update(id, proizvajalec);
  }

  @Delete(':id')
  @ApiOperation({ description: 'Izbriši proizvajalca' })
  @ApiOkResponse()
  async delete(
    @Param('id', ParseIntPipe) id: number
  ) {
    await this.proizvajalecService.delete(id);
  }
}
