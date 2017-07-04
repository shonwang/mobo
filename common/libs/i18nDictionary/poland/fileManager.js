/**
 * @author liujintao
 */
define('poland:fileManager', function(require, exports, module){
    var dictionary = {
        ImportFile: 'Importuj pliki',
        ImportDirectory: 'Importuj folder',
        sureDelete : "Czy na pewno chcesz usunąć wybrane pliki/foldery?",
        
        exportingTitle:"Eksportowanie, nie odłączaj urządzenia",
        deletingTitle:"Usuwanie, nie odłączaj urządzenia",
        /*2014-07-26*/
        copingTitle:"nie odłączaj urządzenia",
        copySuccess:"Kopiowanie plików zakończone",
        sdCard:'Karta SD',
        extSdCard:'Zewnętrzna karta SD',
        pasteLabel:"Wklej",
        newFolder:"Nowy folder",
        /*2014-08-04*/
       selectMultiInfo:"Wybrano {0} folderów, {1} plików",
       selectDirectoryInfo:"{0} folderów, {1} plików ",
       sdCardUsage:"Suma: {0}, Dostępne: {1}",
       sizeLabel:"Rozmiar: {0}",
       modifiedTime:"Modyfikacja: {0}",
       /*2014-08-08*/
       importingTitle:'Trwa importowanie, nie odłączaj telefonu.',
	   /*2014-08-11*/
       noSdCardNotice:'Nie można odczytać karty SD. Upewnij się, że karta SD w urządzeniu jest dostępna.',
       confirmFileReplace:'{0} już istnieje. Czy na pewno chcesz to zastąpić?',
       /*2014-08-18*/
      deleteFailed:"Powiodło się usunięcie {0} plików/folderów, nie udało się usunąć {1}:",
       importFailed:"Powiodło się importowanie {0} plików/folderów, nie udało się zaimportować {1}:",
	   createFolderFailed:"Utworzenie folderu nie powiodło się",
       exportFailed:"Powiodło się eksportowanie {0} plików/folderów, nie udało się wyeksportować {1}:",
       copyFailed:"Powiodło się kopiowanie {0} plików/folderów, nie udało się skopiować {1}:",
       /*2014-08-21*/
      renameFailed:"Nie udało się zmienić nazwy",
      spaceFailed:"Nie powiodło się. Niewystarczająca ilość miejsca.",
      nosdcontent:"Ten folder jest pusty.",
       /*2014-09-11*/
       specailCharNotice:'W nazwie folderu nie można umieszczać następujących znaków: |/\:*?"<>',//重命名
       renameRepeatNotice:'Istnieje już folder o nazwie [{0}]. Wpisz inną nazwę.',//重命名已存在
       renameLabel:"Zmień nazwę",
       openingTitle:'Otwieranie. Nie odłączaj urządzenia', 
       fileExtChangeNotice:'Jeżeli zmienisz rozszerzenie pliku, jego odczyt może stać się niemożliwy. Czy na pewno chcesz je zmienić?',//后缀变更
       openHeader:"Otwórz plik",
       openingFailed:"Nie udało się otworzyć pliku",   
       /*2014-10-15*/
      cMemoryLess:"Zbyt mało wolnego miejsca na dysku C. Zwolnij trochę miejsca przed uruchomieniem filmów, muzyki itp."      
    };
    return dictionary;
});