# Structure du projet GameCollect Backend

## Architecture

```
gamecollect-backend/
├── config/
│   ├── database.js      # Configuration MySQL
│   └── config.js        # Configuration générale
├── controllers/
│   ├── authController.js      # Authentification
│   ├── gameController.js      # Gestion des jeux
│   ├── collectionController.js # Gestion des collections
│   ├── adminController.js     # Administration
│   └── userController.js      # Gestion des utilisateurs
├── middleware/
│   ├── auth.js          # Middleware d'authentification
│   ├── admin.js         # Middleware admin
│   ├── validation.js    # Validation des données
│   └── errorHandler.js  # Gestion des erreurs
├── models/
│   ├── User.js          # Modèle utilisateur
│   ├── Game.js          # Modèle jeu
│   ├── Collection.js    # Modèle collection
│   ├── Platform.js      # Modèle plateforme
│   └── Genre.js         # Modèle genre
├── routes/
│   ├── auth.js          # Routes d'authentification
│   ├── games.js         # Routes des jeux
│   ├── collections.js   # Routes des collections
│   ├── admin.js         # Routes d'administration
│   └── users.js         # Routes des utilisateurs
├── services/
│   ├── gameApiService.js # Service API externe
│   ├── authService.js   # Service d'authentification
│   └── logService.js    # Service de logging
├── utils/
│   ├── helpers.js       # Fonctions utilitaires
│   └── constants.js     # Constantes
├── app.js              # Configuration Express
├── server.js           # Point d'entrée
├── .env                # Variables d'environnement
├── .gitignore          # Fichiers ignorés par Git
└── README.md           # Documentation
```

## Prochaines étapes

1. Configurer la base de données dans `.env`
2. Implémenter la configuration de la base de données
3. Créer les modèles de données
4. Développer les contrôleurs
5. Définir les routes
6. Ajouter les middlewares de sécurité
7. Tester les endpoints
