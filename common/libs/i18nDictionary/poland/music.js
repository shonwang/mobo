define('poland:music', function(require, exports, module){
    var dictionary = {
        ImportMusic: 'Importuj muzykę',/*不超过28个字符*/
        Artist:'Wykonawca',/*不超过20个字符*/
        Time:'Czas',/*不超过12个字符*/
        Format:'Format',/*不超过10个字符*/
        emptyMusicLabel:"Na urządzeniu nie ma utworów muzycznych.",/*不超过11个字符*/
        gotoRingtonesLabel: 'Pobierz dzwonki',/*不超过35个字符*/
        
        exportSuccess:"Pomyślnie wyeksportowano {0} plików muzycznych",
        exportFailed:"Pomyślnie wyeksportowano {0} plików muzycznych, nie udało się wyeksportować {1}:",
        
        sureDelete : "Czy na pewno chcesz usunąć wybrane {0} utworów?",
        deleteSuccess:"Usuwanie ukończone pomyślnie.",
        deleteFailed:"Pomyślnie usunięto {0} utworów, nie udało się usunąć {1}:",
        //add 2014-04-02
        setringtoneSuccess:'Pomyślnie ustawiono jako dzwonek',
        setsmsSuccess:'Pomyślnie ustawiono jako powiadomienie',
        setalarmSuccess:'Pomyślnie ustawiono jako alarm',
        setFailed:'Ustawienie nie powiodło się',
        //add 2014-04-16
        cancelringtone:'Pomyślnie anulowano dzwonek',
        cancelsetsms:'Pomyślnie anulowano powiadomienie',
        cancelsetalarm:'Pomyślnie anulowano alarm',
        //add 2014-04-28
        formaterror:"Ten format nie jest obsługiwany",
        //add 2014-05-14
        setasringtone:"Ustaw jako dzwonek",
        setasnotification:"Ustaw jako powiadomienie",
        setasalarm:"Ustaw jako alarm",
        /*2014-5-26*/
        stop:"Stop",
        /*2014-09-10*/
        musicnotexist:"Muzyka nie istnieje"
    };
    return dictionary;
});
