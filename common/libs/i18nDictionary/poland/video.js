define('poland:video', function(require, exports, module){
    var dictionary = {
        importVideo: 'Importuj filmy',/*不超过28个字符*/
        exportSuccess:"Pomyślnie wyeksportowano {0} filmów",
        exportFailed:"Eksportowanie {0} filmów powiodło się, nie udało się wyeksportować {1}:",
        promptDelete: 'Czy na pewno chcesz usunąć wybrane {0} filmy?',
        deleteFailed:"Usuwanie {0} filmów powiodło się, nie udało się usunąć {1}:",
        promptPlayTitle: 'Przygotowanie do odtworzenia filmu',
        promptPlay: 'Ładowanie',
        emptyVideoLabel: 'Brak filmów naurządzeniu!',
        gotoYouTubeLabel: 'Pobierz filmy',
        promptInvaildPath: 'Nieprawidłowa ścieżka!',
        playLabel: 'Odtwarzaj',
        promptImportTips: "System Android obsługuje wyłącznie formaty avi, 3gp, mp4 i m4v. Filmy importowane w innych formatach mogą nie być rozpoznawane.",
        promptFullDisk:"Brak wystarczającej ilości miejsca na dysku C. Przed odtworzeniem filmu zwolnij zajętą przestrzeń.",
    };
    return dictionary;
});
