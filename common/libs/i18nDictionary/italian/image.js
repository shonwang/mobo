define('italian:image', function(require, exports, module){
    var dictionary = {
    	importPicture: 'Importa foto',/*不超过28个字符*/
    	gallery: 'Raccolta',/*不超过24个字符*/
    	wallpapers: 'Sfondi',/*不超过24个字符*/
    	others:'Altri',/*不超过24个字符*/
    	date:'Data',
        sureDeleteText : "Eliminare le {0} foto selezionate?",
        deleteSuccessText: 'Operazione di eliminazione effettuata con successo',
        deleteFailed:"Operazione di eliminazione di {0} foto effettuata con successo, impossibile eliminare {1}:",
        setWallpaper: 'Imposta come sfondo',
        
        exportSuccess:"{0} foto esportate con successo.",
        exportFailed:"Operazione di esportazione di {0} foto effettuata con successo, impossibile esportare {1}:",
        setWallpaperSuccess: 'Operazione Imposta come sfondo effettuata con successo',
        setWallpaperFailed: 'Operazione Imposta come sfondo non riuscita',
       /*201405-27*/
        rotateLeftText:"Ruota a sinistra",
        rotateRightText:"Ruota a destra",
        noImagesText:"Nessuna immagine sul tuo dispositivo.",
        downloadImage:"Scarica sfondi",
        
        /*2014-07-16*/
        previewLabel:"Anteprima"
    };
    return dictionary;
});