export enum PetType {
  CAT = 'cat',
  DOG = 'dog',
  MOUSE = 'mouse',
}

export class PetEntity {
  id: number;
  name: string;
  description: string;
  birthDate: Date;
  type: PetType;
  deathDate?: Date;
}
