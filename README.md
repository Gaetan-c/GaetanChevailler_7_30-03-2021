# GaetanChevailler_7_30-03-2021
Projet 7 : création d'un réseau social d'entreprise

créer un fichier config avec un document config.json du type :

{
  "development": {
    "username": "votre username",
    "password": "votre mot de passe",
    "database": "nom de votre database",
    "host": "URL de l'host ou localhost",
    "dialect": "mysql",
    "operatorsAliases": 0,
    "timezone": "+00:00 (pour la France)"
  },
  "test": {
    "username": "votre username",
    "password": "votre mot de passe",
    "database": "nom de votre database",
    "host": "URL de l'host ou localhost",
    "dialect": "mysql",
    "operatorsAliases": 0,
    "timezone": "+00:00 (pour la France)"
  },
  "production": {
    "username": "votre username",
    "password": "votre mot de passe",
    "database": "nom de votre database",
    "host": "URL de l'host ou localhost",
    "dialect": "mysql",
    "operatorsAliases": 0,
    "timezone": "+00:00 (pour la France)"
  }
},
dans le même dossier config, créer un document config.env:
dans celui-ci écrivez TOKEN_SECRET = ici entrez une clef secrète aléatoire. 

sur le backend : lancer le server avec 'npm start',
sur le front : lancer le front Vue avec 'npm run serve', il vous indiquera l'url hôte.









