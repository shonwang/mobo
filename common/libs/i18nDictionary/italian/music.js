define('italian:music', function(require, exports, module){
    var dictionary = {
        ImportMusic: 'Importa musica',/*不超过28个字符*/
        Artist:'Artista',/*不超过20个字符*/
        Time:'Ora',/*不超过12个字符*/
        Format:'Formato',/*不超过10个字符*/
        emptyMusicLabel:"Nessun brano musicale sul dispositivo.",/*不超过11个字符*/
        gotoRingtonesLabel: 'Scarica suonerie',/*不超过35个字符*/
        
        exportSuccess:"{0} brani musicali esportati con successo.",
        exportFailed:"Operazione di esportazione di {0} brani musicali effettuata con successo, impossibile esportare {1}:",
        
        sureDelete : "Eliminare i {0} brani musicali selezionati?",
        deleteSuccess:"Operazione di eliminazione effettuata con successo.",
        deleteFailed:"L'operazione di eliminazione di {0} brani musicali effettuata con successo, impossibile eliminare {1}:",
        //add 2014-04-02
        setringtoneSuccess:'Operazione Imposta come suoneria effettuata con successo',
        setsmsSuccess:'Operazione Imposta come notifica effettuata con successo',
        setalarmSuccess:'Operazione Imposta come allarme effettuata con successo',
        setFailed:'Impostazione non effettuata con successo',
        //add 2014-04-16
        cancelringtone:'Operazione Annulla suoneria effettuata con successo',
        cancelsetsms:'Operazione Annulla notifica effettuata con successo',
        cancelsetalarm:'Operazione Annulla allarme effettuata con successo',
        //add 2014-04-28
        formaterror:"Questo formato non è supportato",
        //add 2014-05-14
        setasringtone:"Imposta come suoneria",
        setasnotification:"Imposta come notifica",
        setasalarm:"Imposta come allarme",
        /*2014-5-26*/
        stop:"Interrompi",
        /*2014-09-10*/
       musicnotexist:"Musica non esistente"
    };
    return dictionary;
});
