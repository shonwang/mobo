define('france:backupRestore', function(require, exports, module){
    var dictionary = {
        lastBackupLabel: 'Dernière sauvegarde : ',
        basicLabel: 'Basique',
        advanceLabel: 'Avancée',
        backupCompleted: 'Sauvegarde terminée',
        backupProcess: 'Sauvegarde en cours... Ne déconnectez pas votre appareil.',
        viewBackup: 'Afficher la sauvegarde',
        finish: 'Terminer',
        backtoLabel: "Sauvegarder vers : ",
        changeLabel: "Modifier",
        contactLabel: "Contacts",
        messageLabel: "Messages",
        callRegordsLabel: "Journal d\'appels",
        appLabel: "Applications",
        picLabel: "Images",
        musicLabel: "Musique",
        videoLabel: "Vidéos",

        restoreProcess: 'Restauration en cours... Ne déconnectez pas votre appareil.',
        restoreLabel: "Restaurer",
        nextLabel: "Suivant",
        closeLabel : "Fermer",
        restoreFolder: "Restaurer à partir du dossier personnalisé",
        selectLabel: "Sélectionnez un fichier à restaurer : ",
        previousLabel: "Précédent",
        //20140531 - add by wangzhisong
        noBackupFile: "Aucun fichier de sauvegarde trouvé.",
        //20140623
        pushBackupLabel: "Sauvegardez votre périphérique dès maintenant pour sécuriser vos informations personnelles.",
        //2014-7-25
        sureDialogText:"Pour éviter toute perte de données, il est impossible d\'effectuer une sauvegarde et une restauration simultanément."
    };
    return dictionary;
});