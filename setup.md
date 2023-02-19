## Créer la db

```sudo -i -u postgres psql

CREATE ROLE surf WITH LOGIN PASSWORD 'surf';
CREATE DATABASE surf WITH OWNER surf;```

si on a oublié d'attribuer le OWNER lors de la création :
ALTER TABLE surf TO OWNER surf;

Mettre l'url de connexion dans le .env :

PG_URL = postgresql://surf:surf@localhost:5432/surf

## Installer les dépendances du projet
npm install

## Faire le seeding de la db
node create-table.js