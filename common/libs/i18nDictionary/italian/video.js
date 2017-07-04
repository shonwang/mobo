define('italian:video', function(require, exports, module){
    var dictionary = {
        importVideo: 'Importa video',/*不超过28个字符*/
        exportSuccess:"{0} video esportati con successo.",
        exportFailed:"Operazione di esportazione di {0} video effettuata con successo, impossibile esportare {1}:",
        promptDelete: 'Eliminare i {0} video selezionati?',
        deleteFailed:"Operazione di eliminazione di {0} video effettuata con successo, impossibile eliminare {1}:",
        promptPlayTitle: 'Prepara la riproduzione video',
        promptPlay: 'Caricamento in corso...',
        emptyVideoLabel: 'Nessun video sul tuo dispositivo.',
        gotoYouTubeLabel: 'Scarica video',
        promptInvaildPath: 'Percorso non valido.',
        playLabel: 'Riproduci',
        promptImportTips: "Android supporta solo i formati .avi, .3gp, .mp4 e .m4v. I video importati in altri formati potrebbero non essere riconosciuti dal sistema.",
        promptFullDisk:"Spazio insufficiente nell'unità C. Liberare spazio prima di riprodurre il video.",
    };
    return dictionary;
});