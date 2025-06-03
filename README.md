# GameCollect Backend

API Backend pour l'application de gestion de collection de jeux vidéo.

## Installation

1. Cloner le projet
2. Installer les dépendances : `npm install`
3. Configurer le fichier `.env`
4. Créer la base de données MySQL
5. Démarrer le serveur : `npm run dev`

## Scripts disponibles

- `npm start` : Démarre le serveur en production
- `npm run dev` : Démarre le serveur en mode développement avec nodemon

## Structure du projet

```
├── config/          # Configuration de la base de données et de l'app
├── controllers/     # Contrôleurs pour la logique métier
├── middleware/      # Middlewares personnalisés
├── models/          # Modèles de données
├── routes/          # Définition des routes
├── services/        # Services (API externe, authentification, etc.)
├── utils/           # Utilitaires et helpers
├── app.js          # Configuration de l'application Express
└── server.js       # Point d'entrée du serveur
```

## API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `POST /api/auth/logout` - Déconnexion

### Jeux
- `GET /api/games` - Liste des jeux
- `GET /api/games/search` - Rechercher des jeux
- `GET /api/games/:id` - Détails d'un jeu

### Collections
- `GET /api/collections` - Collections de l'utilisateur
- `POST /api/collections` - Créer une collection
- `PUT /api/collections/:id` - Modifier une collection
- `DELETE /api/collections/:id` - Supprimer une collection
- `POST /api/collections/:id/games` - Ajouter un jeu à une collection

### Administration
- `GET /api/admin/users` - Liste des utilisateurs
- `GET /api/admin/games` - Gestion des jeux
- `GET /api/admin/logs` - Logs d'activité
