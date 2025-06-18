# pet-shop

# Test instructions

> See [instructions here](./TEST_INSTRUCTIONS.md)

# Installation

1. Clone the repository:
   ```
   git clone https://github.com/bunji-saas/test-backend.git
   ```
2. Navigate to the project directory:
   ```
   cd backend-test
   ```
3. Install the dependencies:
   ```
   yarn install
   ```

# Useful commands

- `yarn dev`
- `yarn nest g resource` (need some modifications after generation)

# Development

## Watch mode

```bash
 yarn start:dev
# OR
 yarn dev
```

## No Watch

```bash
 yarn start
```

# Production mode

```bash
 yarn start:prod
```

Run tests

# Unit tests

```bash
 yarn test
```

# API Description

L'API gère les opérations CRUD pour les animaux de compagnie.

## Endpoints Pets

### `POST /pets`

Crée un nouvel animal de compagnie.

- **Corps de la requête:** `PetRequestCreate`
  - `name`: `string` (obligatoire) - Le nom de l'animal.
  - `description`: `string` (obligatoire) - Une description de l'animal.
  - `birthDate`: `Date` (obligatoire) - La date de naissance de l'animal (format YYYY-MM-DD).
  - `type`: `PetType` (obligatoire) - Le type d'animal (par exemple, 'Chien', 'Chat'). Les valeurs possibles sont définies dans l'enum `PetType`.
  - `deathDate`: `Date` (optionnel) - La date de décès de l'animal (format YYYY-MM-DD).

### `GET /pets`

Récupère une liste paginée de tous les animaux de compagnie.
Renvoie un objet `PaginationResult` qui contient une liste de `PetListItem`.

- **Paramètres de requête (`PaginationQueryParams`):**
  - `page`: `number` (optionnel) - Le numéro de la page.
  - `pageSize`: `number` (optionnel) - Le nombre d'éléments par page.

### `GET /pets/:id`

Récupère les détails d'un animal de compagnie spécifique par son ID.
Renvoie un objet `PetDetails`.

- **Paramètres de chemin:**
  - `id`: `number` (obligatoire) - L'ID de l'animal à récupérer.

### `PATCH /pets/:id`

Met à jour partiellement les informations d'un animal de compagnie existant par son ID.

- **Paramètres de chemin:**
  - `id`: `number` (obligatoire) - L'ID de l'animal à mettre à jour.
- **Corps de la requête:** `PetRequestUpdate` (tous les champs sont optionnels)
  - `name`: `string` - Le nom de l'animal.
  - `description`: `string` - Une description de l'animal.
  - `birthDate`: `Date` - La date de naissance de l'animal (format YYYY-MM-DD).
  - `type`: `PetType` - Le type d'animal.
  - `deathDate`: `Date` - La date de décès de l'animal (format YYYY-MM-DD).

### `DELETE /pets/:id`

Supprime un animal de compagnie par son ID.

- **Paramètres de chemin:**
  - `id`: `number` (obligatoire) - L'ID de l'animal à supprimer.
