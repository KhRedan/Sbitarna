Application Sbitarna:
une plateforme web permettant d'optimiser la gestion d'un hopital, notre plateforme se compose en 2 parties:
- La possibilité de réserver une consultation de chez sois et donc éviter l'encombrement.
- Une gestion complete des ressources médicales et humaine(médicale : tout est noté en base de données ce qui rend le vol difficile ; humaine : l'optimisation du temps des médecins et pharmaciens en automatisant les réservations et l'ecriture des ordonnances).

Notre projet se compose de 2 parties de codes intégrés:
- une partie front située au dossier sbitarnaClient.
- les autres parties du code sont le backend de l'application


Nous avons pensé a vous et pour vous éviter d'installer l'application nous avons hebergé notre application sur le lien suivant : http://51.75.253.157:9001/
pour executer notre code il faut :
  1- Cloner notre répositoire git(git clone).
  2-Installer un serveur MYSQL(WAMP ou XAMPP).
  3-Créer une base de données et importer le fichier Sbitarna.sql.
  4- Ouvrir un terminal dans le dossier où vous avez cloné notre répositoire.
  5- utiliser la commande npm install pour installer les paquets dont notre code dépend.
  6- creer un fichier ".env" et ajouter le contenu suivant:
    PORT=9001
    DB_HOST="localhost"
    DB_USER="root"a changer par votre utilisateur de base de données (par defaut "root")
    DB_PASSWORD="password" a changer par votre mot de passe de base de données (par defaut "")
    DB_DATABASE="sbitarna"
    NODE_ENV="production"

  7- ouvrir un terminal dans le dossier sbitarnaClient et refaite l'étape 5.
  8-revenir sur le dossier de base.
  9- executer la commande "npm start"
  10- visiter l'url "localhost:9001"
  
  nous avons essayé de faire une gestion complete d'un hopital contenant au moins pour un prototype:
    -Pour tout le monde:
      1- fonctionnalité se connecter(faite)
      2- Tout Tableau dans notre plateforme peut être trié suivant son contenue(faite)
    -Pour les patients:
      1- fonctionnalité Réserver (qu'on n'a pas pu faire à temps) (nous avons esperé faire une reservation dynamique avec l'affichage des heurs disponible pour faire le choix)
      2- fonctionnalité voir mes consultations (faite)
      3- fonctionnalité annuler une consultations (faite)
      4- fonctionnalité voir mes ordonnances (faite)
      5- fonctionnalité inscription (faite)
    -Pour les docteurs:
      1- fonctionnalité voir mes consultations (faite)
      2- foncionnalité marquer une consultation comme faite (faite)
      3- fonctionnalité ecrire une ordonnance (qu'on n'a pas pu faire à temps)
    -Pour les pharmaciens:
      1- Regarder le stock (faite)
      2- Ajouter un medicament(faite)
      3- Ajouter un nouvel arrivage au medicament (faite)
      4- Vendre des médicaments appartir du numéro de l'ordonnance (faite)
    -Pour les administrateurs:
      1- regarder le stock de la pharmacie (faite)
      2- regarder toutes les consultations(faite)
      3- regarder la liste des patients(faite)
      4- fonctionnalité supprimer un patient(faite)
      5- regarder la liste des docteurs(faite)
      6- fonctionnalité supprimer un docteurs(faite)
      7- regarder la liste des pharmaciens(faite)
      8- fonctionnalité supprimer un pharmacien(faite)
      9- fonctionnalité ajouter un employé (pharmacien docteur administrateur) (faite)
      La version finale de notre application doit gérer tout personnel dans l'hopital dans une prochaine version nous ajouterons la securité les infirmiers la disponibilité des machines, ect...
