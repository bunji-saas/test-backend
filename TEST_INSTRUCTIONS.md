# Instructions du test technique

## Temps de réalisation : 1 h 30 min

- 10 min de prise en main autonome
- 5 min d'échange pour vérifier la compréhension du test
- 1 heure de réalisation
- 15 min de débriefing

## Pré-requis

- Tu auras besoin de Node.js version 22, de yarn et de git
- Un IDE pourra te faire gagner du temps
- Tu es libre d'utiliser les outils de ton choix
- Tu peux ajouter des dépendances si tu le souhaites s'il te semble nécessaire d'en ajouter

## Contexte

On cherche à manager des animaux de compagnie via une API REST et un CRUD classique.
L'app est en Nest.js mais la connaissance de ce framework n'est pas nécessaire pour réaliser le test.

⚠ Les données sont stockées en mémoire, il n'y a pas de base de données dans le cadre de ce test.

## Point d'attentions pris en compte dans l'évaluation

- Clean code
- Gestion des erreurs
- Découpage du code selon le pattern controller/service/repository
- Comprendre ce qui te semble important dans la réalisation d'une API REST

## Instructions

- [ ] Cloner ce repo git afin d'y apporter des modifications.
- [ ] Identifier et compléter les trous à compléter dans le code
  - [ ] Les trous sont marqués par `// TODO`
  - [ ] Aller au-delà de des lignes marquées par `// TODO` et compléter/modifier ce qu'il te semble nécessaire
  - [ ] Tu peux ajouter des commentaires pour expliquer tes choix
  - [ ] Compléter les tests, tu as des exemples dans le dossier `test` qui peuvent te faire gagner du temps
- [ ] Décrire la table Postgres que tu utiliserais pour stocker les données, en expliquant le choix des types retenus
  - [ ] Compléter le fichier `db.sql` dans le dossier `src/modules/pets` pour la création de la table
  - [ ] Compléter le fichier `db.sql` dans le dossier `src/modules/pets` pour la création de l'index

**Bonus :**

- [ ] Ajoute un endpoint pour récupérer le nombre d'animaux de compagnie par type
