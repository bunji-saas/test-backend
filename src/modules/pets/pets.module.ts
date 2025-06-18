import { Module } from '@nestjs/common';

import { PetsController } from './pets.controller';
import { PetsRepository } from './pets.repository';
import { PetsService } from './pets.service';

@Module({
  controllers: [PetsController],
  providers: [
    PetsService,
    {
      provide: PetsRepository,
      useFactory: async () => {
        const repository = new PetsRepository();
        await repository.init();
        return repository;
      },
    },
  ],
})
export class PetsModule {}
