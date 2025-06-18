import { PartialType } from '@nestjs/mapped-types';
import { Expose, Transform } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, MaxDate } from 'class-validator';

import { transformDate } from '../../shared/date-parser.transformer';
import { IsDateAfter } from '../../shared/is-date-after.validator';
import { PetEntity, PetType } from '../entities/pet.entity';

export class PetDetails implements PetEntity {
  id: number;
  name: string;
  description: string;
  birthDate: Date;
  type: PetEntity['type'];
  deathDate?: Date;
  ageInYears: number;
}

export class PetListItem implements Partial<PetDetails> {
  id: number;
  name: string;
  type: PetEntity['type'];
  birthDate: Date;
  ageInYears: number;
  isAlive: boolean;
}

export class PetRequestCreate {
  @IsString()
  @IsNotEmpty()
  @Expose()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  description: string;

  @Transform(transformDate)
  @IsDate()
  @MaxDate(() => new Date(), { message: 'birthDate must be a past date' })
  @Expose()
  birthDate: Date;

  @IsEnum(PetType)
  @Expose()
  type: PetType;

  @Transform(transformDate)
  @IsDate()
  @IsDateAfter('birthDate')
  @IsOptional()
  @Expose()
  deathDate?: Date;
}

export class PetRequestUpdate extends PartialType(PetRequestCreate) {}
