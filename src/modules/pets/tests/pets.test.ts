import axios from 'axios';
import { OverrideProperties } from 'type-fest';

import { startTestApp, stopTestApp } from '../../../../tests/app-setup.test';
import { PetDetails, PetListItem, PetRequestCreate, PetRequestUpdate } from '../dto/pets.types';
import { PetType } from '../entities/pet.entity';

type PetRequestCreateAsPlain = OverrideProperties<
  PetRequestCreate,
  { birthDate: string; type: string; deathDate?: string }
>;
type PetRequestUpdateAsPlain = OverrideProperties<
  PetRequestUpdate,
  { birthDate?: string; deathDate?: string }
>;

const newPetData: PetRequestCreateAsPlain = {
  name: 'Buddy Test',
  description: 'A friendly dog for testing',
  birthDate: '2020-01-15',
  type: PetType.DOG,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const updatedPetData: PetRequestUpdateAsPlain = {
  description: 'An even friendlier dog after update',
  birthDate: '2020-01-15',
  deathDate: '2025-06-15',
};

async function createAPet(apiBaseUrl: string | undefined, newPetData: PetRequestCreateAsPlain) {
  if (!apiBaseUrl) {
    throw new Error('API base URL is not defined');
  }
  try {
    const response = await axios.post<PetDetails>(apiBaseUrl, newPetData);
    expect(response.status).toBe(201);
    return response.data;
  } catch (error) {
    console.log('Error creating pet:', error);
    throw error;
  }
}

describe('Pets API (E2E)', () => {
  let petsEndpoint: string | undefined;

  beforeAll(async () => {
    const startResult = await startTestApp();
    const apiBaseUrl = `http://localhost:${startResult.port}`;
    petsEndpoint = `${apiBaseUrl}/pets`;
  });

  afterAll(async () => {
    await stopTestApp();
  });

  describe('POST /pets', () => {
    it('Should create a new pet', async () => {
      const pet = await createAPet(petsEndpoint, newPetData);
      expect(pet).toHaveProperty('id');
      expect(pet.name).toBe(newPetData.name);
      expect(pet.type).toBe(newPetData.type);
    });

    it('Should create a death pet', async () => {
      const deathPetData: PetRequestCreateAsPlain & { anExtraField: string } = {
        name: 'A death mouse',
        description: 'A deceased mouse for testing',
        birthDate: '2018-03-10',
        type: PetType.MOUSE,
        deathDate: '2023-02-11', // Date de décès
        anExtraField: 'This field should not be here and should be ignored',
      };
      const pet: PetDetails & { anExtraField?: string } = await createAPet(
        petsEndpoint,
        deathPetData,
      );
      expect(pet).toHaveProperty('id');
      expect(pet.name).toBe(deathPetData.name);
      expect(pet.type).toBe(deathPetData.type);
      expect(pet.deathDate).toBe(`${deathPetData.deathDate}T00:00:00.000Z`); // Vérifier que la date de décès est bien persistée
      /// TODO: Check age calculation
      /// expect(pet.ageInYears)...
      expect(pet.anExtraField).toBeUndefined(); // Vérifier que l'extra field n'est pas persisté
    });

    it('Should fail to create a pet with invalid data', async () => {
      const invalidPetData: PetRequestCreateAsPlain & { anExtraField: string } = {
        name: '',
        description: 'A pet with no name',
        birthDate: '2040-01-15',
        type: 'Invalid type',
        deathDate: '2035-06-15', // Date de décès future, et avant la date de naissance
        anExtraField: 'This field should not be here and should be ignored',
      };

      const creationPromise = createAPet(petsEndpoint, invalidPetData);
      await expect(creationPromise).rejects.toThrow();
      try {
        await creationPromise;
      } catch (error) {
        const isAxiosError = axios.isAxiosError(error);
        expect(isAxiosError).toBe(true);
        const axiosError = error as axios.AxiosError<{ message: string[] }>;
        expect(axiosError.response?.status).toBe(400);
        expect(axiosError.response?.data?.message).toContain('name should not be empty');
        expect(axiosError.response?.data?.message).toContain('birthDate must be a past date');
        expect(axiosError.response?.data?.message).toContain('deathDate must be after birthDate');
      }
    });
  });

  it('GET /pets/:id - should retrieve a specific pet', async () => {
    const pet = await createAPet(petsEndpoint, newPetData);

    const response = await axios.get<PetDetails>(`${petsEndpoint}/${pet.id}`);
    expect(response.status).toBe(200);
    expect(response.data.id).toBe(pet.id);
    expect(response.data.name).toBe(newPetData.name);
    expect(response.data.type).toBe(newPetData.type);
    // TODO: Check age calculation
    // expect(response.data.ageInYears)...
    expect((response.data as unknown as PetListItem).isAlive).toBe(undefined); // isAlive is not part of PetDetails
    expect(response.data.deathDate).toBe(undefined);
  });
});
