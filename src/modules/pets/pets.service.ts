import { Injectable } from '@nestjs/common';

import { PetDetails, PetRequestCreate } from './dto/pets.types';
import { PetEntity } from './entities/pet.entity';
import { PetsRepository } from './pets.repository';

@Injectable()
export class PetsService {
  constructor(private readonly petsRepository: PetsRepository) {}

  private mapToPetDetails(petEntity: PetEntity): PetDetails {
    return {
      id: petEntity.id,
      name: petEntity.name,
      description: petEntity.description,
      birthDate: petEntity.birthDate,
      type: petEntity.type,
      deathDate: petEntity.deathDate,
      ageInYears: 1, // TODO: Calculate age
    };
  }

  async create(createPetDto: PetRequestCreate): Promise<PetDetails> {
    const newPetEntity = await this.petsRepository.create(createPetDto);
    return this.mapToPetDetails(newPetEntity);
  }

  async findOne(id: number): Promise<PetDetails> {
    const petEntity = await this.petsRepository.findOne(id);
    return this.mapToPetDetails(petEntity);
  }
}
