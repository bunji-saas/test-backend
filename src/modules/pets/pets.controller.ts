import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { PetRequestCreate } from './dto/pets.types';
import { PetsService } from './pets.service';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  async create(@Body() createPetDto: PetRequestCreate) {
    return await this.petsService.create(createPetDto);
  }

  // TODO
  // @Get()
  // async find(
  //   @Query() paginationQuery: PaginationQueryParams,
  // ): Promise<PaginationResult<PetListItem>> {
  // }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.petsService.findOne(id);
  }

  // TODO
  // @Patch

  // TODO
  // @Delete
}
