define('poland:myapp', function(require, exports, module){
    var dictionary = {
        installAppsLabel: 'Zainst. aplikacje',/*不超过18个字符*/
        moveToSdCardLabel: 'Przenieś na kartę SD',/*不超过30个字符*/
        tabAppLabel: 'Aplikacje',/*不超过24个字符*/
        tabUpdatesLabel: 'Aktualizacje',/*不超过24个字符*/
        tabSystemLabel: 'System',/*不超过24个字符*/
        moveLabel: 'Przenieś',
        
        appCurrentVersionLabel: 'Aktualna wersja:',/*不超过22个字符*/
        appLatestVersionLabel: 'Najnowsza wersja:',/*不超过22个字符*/
        appLocationLabel: 'Lokalizacja:',/*不超过20个字符*/
        appSizeColonLabel: 'Rozmiar:',/*不超过22个字符*/
        ratingColonLabel: 'Ocena:',
        
        likeColonLabel: 'Zobacz także...',/*不超过45个字符*/
        downloadsText: '{0} pobrań',
        updatingText: 'Aktualizowanie',/*不超过45个字符*/
        uninstallingText: 'Odinstal.',/*不超过12个字符*/
        installingText: 'Instalacja',
        sureUninstallTip: 'Czy na pewno chcesz odinstalować wybrane {0} aplikacji?',
        uninstalling: 'Trwa odinstalowanie. Nie należy odłączać urządzenia.',
        uninstallSuccessText: 'powiodło się',
        uninsatllFailed:"Pomyślnie odinstalowano {0} aplikacji, nie udało się odinstalować {1}:",
        
        exportSuccess:"Polyślnie wyeksportowano {0} aplikacje",
        exportFailed:"Eksportowanie {0} aplikacji powiodło się, nie udało się wyeksportować {1}:",
        
        systemMaskText: 'Możesz zarządzać aplikacjami systemowymi po przeprowadzeniu rootowania urządzenia.',
        systemMaskCtn: 'Usunięcie aplikacji systemowych zwolni do 156,3 MB miejsca.',
        searchResultTitle:'znaleziono {0} aplikacji',
        /*2014-5-26*/
        deviceTipText : "Pamięć urządzenia",
        sdCardTipText : "Karta SD",
        //06-03
        noapptext:'Brak aplikacji w urządzeniu.',
        noupdatetext:'Brak aplikacji do zaktualizowania w urządzeniu.',
        /*2014-6-18*/
        noappBtnText:'Pobierz aplikacje',
        //08-13
        moving: 'Trwa przenoszenie. Nie odłączaj urządzenia.',
        moveFailed:"Powiodło się przeniesienie {0} aplikacji, nie udało się przenieść {1}:",
        //08-19
        moveConfirm:"Aplikacje mogą przestać działać po przeniesieniu na kartę SD. Czy na pewno chcesz kontynuować?",
        //2014-10-14
        wifiUninstallTitle:"Zakończ proces dezinstalacji na telefonie."
    }
    return dictionary;
});
