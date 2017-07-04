define('france:music', function(require, exports, module){
    var dictionary = {
        ImportMusic: 'Importer une musique',/*不超过28个字符*/
        Artist:'Artiste',/*不超过20个字符*/
        Time:'Durée',/*不超过12个字符*/
        Format:'Format',/*不超过10个字符*/
        emptyMusicLabel:"Il n\'y a pas de musique sur votre appareil .",/*不超过11个字符*/
        gotoRingtonesLabel: 'Télécharger des sonneries',/*不超过35个字符*/
        
        exportSuccess:"{0} pistes exportées avec succès .",
        exportFailed:"{0} pistes exportées, {1} échecs :",
        
        sureDelete : "Voulez-vous vraiment supprimer les {0} pistes sélectionnées ?",
        deleteSuccess:"Suppression réussie.",
        deleteFailed:"{0} pistes supprimées, {1} échecs :",
        //add 2014-04-02
        setringtoneSuccess:'Définie comme sonnerie',
        setsmsSuccess:'Définie comme notification',
        setalarmSuccess:'Définie comme alarme',
        setFailed:'Échec de la définition',
        //add 2014-04-16
        cancelringtone:'Annulation sonnerie réussie',
        cancelsetsms:'Annulation notification réussie',
        cancelsetalarm:'Annulation alarme réussie',
        //add 2014-04-28
        formaterror:"Format non pris en charge",
        //add 2014-05-14
        setasringtone:"Définir comme sonnerie",
        setasnotification:"Définir comme notification",
        setasalarm:"Définir comme alarme",
        /*2014-5-26*/
        stop:"Arrêter",
        /*2014-09-10*/
       musicnotexist:"Musique introuvable"
    };
    return dictionary;
});
