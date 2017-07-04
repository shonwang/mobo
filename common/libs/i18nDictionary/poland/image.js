define('poland:image', function(require, exports, module){
    var dictionary = {
    	importPicture: 'Importuj zdjęcie',/*不超过28个字符*/
    	gallery: 'Galeria',/*不超过24个字符*/
    	wallpapers: 'Tapety',/*不超过24个字符*/
    	others:'Inne',/*不超过24个字符*/
    	date:'Data',
        sureDeleteText : "Czy na pewno chcesz usunąć wybrane {0} zdjęć?",
        deleteSuccessText: 'Usuwanie powiodło się',
        deleteFailed:"Usuwanie {0} zdjęć powiodło się, nie udało się usunąć {1}:",
        setWallpaper: 'Ustaw jako tapetę',
        
        exportSuccess:"Pomyślnie wyeksportowano {0} zdj.",
        exportFailed:"Eksportowanie {0} zdjęć powiodło się, nie udało się wyeksportować {1}:",
        setWallpaperSuccess: 'Pomyślnie ustawiono jako tapetę',
        setWallpaperFailed: 'Nie można ustawić jako tapetę',
        /*201405-27*/
        rotateLeftText:"Obróć w lewo",
        rotateRightText:"Obróć w prawo",
        noImagesText:"Brak zdjęć w urządzeniu.",
        downloadImage:"Pobierz tapety",
        
        /*2014-07-16*/
        previewLabel:"Zobacz"
    };
    return dictionary;
});
