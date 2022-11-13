import { Body, Controller, Delete, Get, NotFoundException, Post, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse, ApiTags } from '@nestjs/swagger';

import { CreateModelVozilaDto, CreateModelVozilaSchema } from './dto/create-model-vozila.dto';
import { JoiValidationPipe } from '../common/pipes/joi-validation.pipe';
import { ModelVozila } from './model-vozila.entity';
import { ModelVozilaService } from './model-vozila.service';
import { UpdateModelVozilaDto, UpdateModelVozilaSchema } from './dto/update-model-vozila.dto';

@ApiTags('model-vozila')
@ApiBadRequestResponse({ description: 'Bad request' })
@ApiForbiddenResponse({ description: 'Ni ustreznih dovoljenj' })
@ApiUnauthorizedResponse({ description: 'Dostop dovoljen zgolj prijavljenim osebam' })
@Controller('model-vozila')
export class ModelVozilaController {
  constructor(
    private readonly modelVozilaService: ModelVozilaService,
  ) {}

  @Get()
  @ApiOperation({ description: 'Pridobe vse modele vozil' })
  @ApiOkResponse()
  async getAll(): Promise<ModelVozila[]> {
    return await this.modelVozilaService.getAll();
  }

  @Get('proizvajalec/:proizvajalecId')
  @ApiOperation({ description: 'Pridobi vse modele vozil, ki jih proizvaja določen proizvajalec' })
  @ApiOkResponse()
  async getByProizvajalecId(
    @Param('proizvajalecId', ParseIntPipe) id: number,
  ): Promise<ModelVozila[]> {
    return await this.modelVozilaService.getByProizvajalecId(id);
  }

  @Get(':id')
  @ApiOperation({ description: 'Pridobi model vozila z določenim identifikatorjem' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ModelVozila> {
    const modelVozila = await this.modelVozilaService.getById(id);
    if (!modelVozila)
      throw new NotFoundException();
    return modelVozila;
  }

  @Post()
  @ApiOperation({ description: 'Ustvari nov model vozila' })
  @ApiCreatedResponse()
  async create(
    @Body(new JoiValidationPipe(CreateModelVozilaSchema)) modelVozila: CreateModelVozilaDto,
  ): Promise<void> {
    await this.modelVozilaService.create(modelVozila);
  }

  @Patch(':id')
  @ApiOperation({ description: 'Posodobi obstoječ model vozila' })
  @ApiOkResponse()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new JoiValidationPipe(UpdateModelVozilaSchema)) modelVozila: UpdateModelVozilaDto,
  ): Promise<void> {
    await this.modelVozilaService.update(id, modelVozila);
  }

  @Delete(':id')
  @ApiOperation({ description: 'Izbriši model vozila' })
  @ApiOkResponse()
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.modelVozilaService.delete(id);
  }
}
