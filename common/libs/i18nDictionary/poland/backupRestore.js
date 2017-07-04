define('poland:backupRestore', function(require, exports, module){
    var dictionary = {
        lastBackupLabel: 'Ostatnia kopia zapasowa: ',
        basicLabel: 'Podstawowy',
        advanceLabel: 'Zaawansowany',
        backupCompleted: 'Zakończono tworzenie kopii zapasowej',
        backupProcess: 'Trwa tworzenie kopii zapasowej... Nie odłączaj urządzenia.',
        viewBackup: 'Wyświetl kopię zapasową',
        finish: 'Zakończ',
        backtoLabel: "Miejsce docelowe tworzenia kopii zapasowych: ",
        changeLabel: "Zmień",
        contactLabel: "Kontakty",
        messageLabel: "Wiadomości",
        callRegordsLabel: "Historia połączeń",
        appLabel: "Aplikacje",
        picLabel: "Zdjęcia",
        musicLabel: "Muzyka",
        videoLabel: "Filmy",

        restoreProcess: 'Trwa przywracanie... Nie odłączaj urządzenia.',
        restoreLabel: "Przywracanie",
        nextLabel: "Dalej",
        closeLabel : "Zamknij",
        restoreFolder: "Przywróć z folderu własnego",
        selectLabel: "Wybierz plik do przywrócenia: ",
        previousLabel: "Wstecz",
        //20140531 - add by wangzhisong
        noBackupFile: "Nie znaleziono plików kopii zapasowej.",
        //20140623
        pushBackupLabel: "Aby zabezpieczyć swoje dane osobowe, utwórz kopię zapasową danych urządzenia.",
        //2014-7-25
        sureDialogText:"Aby zapobiec utracie danych, wykonywanie i przywracanie kopii zapasowych nie może być uruchamiane jednocześnie."
    };
    return dictionary;
});