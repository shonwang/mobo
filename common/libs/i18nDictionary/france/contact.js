define('france:contact', function(require, exports, module){
    var dictionary = {
        sideLabel: 'Contacts',
        message: 'Messages',
        music: 'Ma musique',
        photo: 'Mes images',
        video: 'Mes vidéos',
        backup: 'Sauvegarde et restauration',
        ChangeIcon:'Modifier',
        MessageRecord:'Journal des messages',
        Note:'Remarque',
        Save:'Enregistrer',
        Edit:'Modifier',
        Cancel:'Annuler',
        inputhere:'saisir ici',
        ContactSelected:'<span class="contacts-count selectedNum f18">{0}</span> Contacts sélectionnés',
        SendMessage:'Envoyer un message',
        Filter:'Filtre',
        AllContacts:'Tous les contacts',
        AllGroups:'Tous les groupes',
        NewContact:'Nouveau contact',
        ContactInfomation:'Informations de contact',
        //add 2014-03-24
        sureDeleteTitle:'Voulez-vous vraiment supprimer les {0} contacts sélectionnés ?',
        deleteFailed:"Échec de la suppression.",
        
        importingTitle:'Importation en cours, gardez le téléphone connecté',
        importHeader:"Importer le(s) contact(s)",
        
        exportSuccess:"{0} contacts exportés.",
        exportFailed:"Échec de l\'exportation.",
        
        addContactText:'Ajouter des contacts, rechercher dans le répertoire et envoyer des messages texte.',
        newContact: 'Nouveau contact',
        writeMessage:'Saisissez votre message ici...',
        Mobile: 'Mobile',
        //add 2014-04-09
        deletingTitle:'Suppression en cours, gardez le téléphone connecté',
        //2014-5-26
        addTipText:"Ajouter",
        accountLabel:"Compte : ",
        emptyContact:"Votre téléphone ne contient aucun contact",
        //2014-05-29
        deleteTipText:"Supprimer",
        smsTipText:"SMS",
        
        importFailed:"{0} contacts importés. Nombre de contacts non importés : {1}",
        exportHeader:"Exporter le(s) contact(s)",
        exportAll:"Tous les contacts <em class='c-9'>({0})</em>",
        exportSelect:"Contacts sélectionnés <em class='c-9'>({0})</em>",
        //2014-06-03
        editgroup:"Modifier le groupe",
        notassigened:"Non attribué(s)",
        saveFailed:'Échec de l\'enregistrement du contact. Réessayez ultérieurement.',
        //2014-06-11
        fileError:'Échec. Fichier au format vcf non valide',
        groupText:'Groupe',
        
        /*2014-07-22*/
       contactPermissionNotice:"Les autorisations de contact peuvent avoir été bloquées par une application de sécurité. Veuillez activer les autorisations dans [Gestion des autorisations]",
       //2014-08-18 保存分组失败
         saveGroupFailed:'Échec de l\'enregistrement du groupe. Réessayez ultérieurement.'
    };
    return dictionary;
});
