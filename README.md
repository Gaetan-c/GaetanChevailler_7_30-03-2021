# GaetanChevailler_7_30-03-2021
Projet 7 : création d'un réseau social d'entreprise

Prérequis avant clonage du dépôt : Node js, MySQL et Vue/CLI.

1 - Télécharger le dépôt.
Ouvrir l'invite de commande et faire "npm install".

2 - Ouvrir le read.me en mode edit (= dans l'éditeur de code) pour garder la mise en page indentée d'origine.

3 - Créer un dossier config avec un document config.json du type :

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

4 - Remplacer les valeurs par les vôtre

5 - Dans le même dossier config, créer un document config.env:
dans celui-ci écrivez TOKEN_SECRET = ici entrez une clef secrète aléatoire. 

6 - sur la ligne de commande globale : faire 'sequelize db:create && sequelize db:migrate' pour créer la BDD.

7 - Pour lancer le serveur :
sur le terminal du backend : Lancer le server avec 'npm start'. (Si cela ne fonctionne pas, faire un 'npm install' sur le backend)
sur le terminal du frontend : Lancer le front Vue avec 'npm run serve', il vous indiquera l'url hôte. (Si cela ne fonctionne pas, refaire un 'npm install' sur le frontend)


ATTENTION : pour se connecter à l'application:
X - une adresse mail valide (x@x.xxx)
X - un nom sans caractère spécial, chiffre ou espace
X - un password avec 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial parmi 8 caractères minnimum !




