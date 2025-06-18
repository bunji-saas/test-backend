import { setTimeout } from 'node:timers/promises';

import { Injectable, NotFoundException } from '@nestjs/common';

import { PetRequestCreate } from './dto/pets.types';
import { PetEntity, PetType } from './entities/pet.entity';

@Injectable()
export class PetsRepository {
  private readonly simulatedDelayMs = 50;

  private readonly pets: PetEntity[] = [];
  private nextId = 1;

  private async simulateDelay(): Promise<void> {
    return await setTimeout(this.simulatedDelayMs * Math.random());
  }

  private findPetAtIndexOrThrow(id: number): number {
    const index = this.pets.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Pet with ID #${id} not found in repository`);
    }
    return index;
  }

  async init(): Promise<void> {
    await this.create({
      name: 'Buddy',
      description: 'A friendly golden retriever',
      birthDate: new Date('2018-01-01'),
      type: PetType.DOG,
      deathDate: new Date('2023-01-01'),
    });
    await this.create({
      name: 'Whiskers',
      description: 'A curious tabby cat',
      birthDate: new Date('2019-05-15'),
      type: PetType.CAT,
    });
  }

  async create(createPetDto: PetRequestCreate): Promise<PetEntity> {
    await this.simulateDelay();
    const newPet: PetEntity = {
      id: this.nextId++,
      name: createPetDto.name,
      description: createPetDto.description,
      birthDate: createPetDto.birthDate,
      type: createPetDto.type,
      deathDate: createPetDto.deathDate,
    };
    this.pets.push(newPet);
    return newPet;
  }

  async findOne(id: number): Promise<PetEntity> {
    await this.simulateDelay();
    const petIndex = this.findPetAtIndexOrThrow(id);
    return this.pets[petIndex];
  }
}
