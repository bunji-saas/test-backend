import { Logger, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

import { AppController } from './app.controller';
import { PetsModule } from './modules/pets/pets.module';

@Module({
  imports: [PetsModule],
  controllers: [AppController],
  providers: [
    Logger,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        transformOptions: {
          exposeDefaultValues: true,
          excludeExtraneousValues: true,
        },
      }),
    },
  ],
})
export class AppModule {}
