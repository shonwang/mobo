define('france:myapp', function(require, exports, module){
    var dictionary = {
        installAppsLabel: 'Installer applis',/*不超过18个字符*/
        moveToSdCardLabel: 'Déplacer vers la carte SD',/*不超过30个字符*/
        tabAppLabel: 'Applis',/*不超过24个字符*/
        tabUpdatesLabel: 'Mises à j.',/*不超过24个字符*/
        tabSystemLabel: 'Système',/*不超过24个字符*/
        moveLabel: 'Déplacer',
        
        appCurrentVersionLabel: 'Version actuelle :',/*不超过22个字符*/
        appLatestVersionLabel: 'Dernière version :',/*不超过22个字符*/
        appLocationLabel: 'Emplacement :',/*不超过20个字符*/
        appSizeColonLabel: 'Taille :',/*不超过22个字符*/
        ratingColonLabel: 'Note :',
        
        likeColonLabel: 'Vous aimerez aussi...',/*不超过45个字符*/
        downloadsText: '{0} téléchargements',
        updatingText: 'Mise à jour en cours',/*不超过45个字符*/
        uninstallingText: 'Désinst.',/*不超过12个字符*/
        installingText: 'Installat.',
        sureUninstallTip: 'Voulez-vous vraiment désinstaller les {0} applications sélectionnées ?',
        uninstalling: 'Désinstallation en cours. Ne déconnectez pas votre appareil.',
        uninstallSuccessText: 'Action réussie',
        uninsatllFailed:"{0} application(s) désinstallée(s), {1} échecs :",
        
        exportSuccess:"{0} applications exportées.",
        exportFailed:"{0} applications exportées, {1} échecs :",
        
        systemMaskText: 'Vous pouvez gérer vos applications système après avoir rooté votre appareil.',
        systemMaskCtn: 'Effacer vos applications système peut libérer jusqu\'à 156,3 Mo d\'espace.',
        searchResultTitle:'{0} application(s) trouvée(s)',
        /*2014-5-26*/
        deviceTipText : "Mémoire de l\'appareil",
        sdCardTipText : "Carte SD",
        //06-03
        noapptext:'Il n\'y a pas d\'application sur votre appareil.',
        noupdatetext:'Il n\'y a pas d\'application proposant une mise à jour sur votre appareil.',
        /*2014-6-18*/
        noappBtnText:'Télécharger des applications',
        //08-13
        moving: 'Déplacement en cours. Ne déconnectez pas votre appareil.',
        moveFailed:"{0} applications déplacées, {1} non déplacées",
        //08-19
        moveConfirm:"Les applications risquent de ne pas fonctionner après avoir été déplacées vers la carte SD. Voulez-vous vraiment continuer ?",
        //2014-10-14
        wifiUninstallTitle:"Terminez la désinstallation sur votre téléphone."
    }
    return dictionary;
});