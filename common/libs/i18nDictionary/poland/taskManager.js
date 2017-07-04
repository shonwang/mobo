define('poland:task', function(require, exports, module){
    var dictionary = {
        setingAsWallpaper: 'Ustawianie jako tapeta...',
        setingAsRingtone: 'Ustawianie jako dzwonek...',
        setRingtoneSuccess: 'Ustawianie dzwonka powiodło się',
        setRingtoneFailed: 'Ustawianie dzwonka nie powiodło się',
        
        insuficientSpace: 'Instalacja nie powiodła się. Niewystarczająca ilość miejsca',
        noSdCard: 'Instalacja nie powiodła się. Brak karty SD',
        noSuchSourceFile: 'Instalacja nie powiodła się. Plik nie istnieje',
        inValidApkFile: 'Instalacja nie powiodła się. Nieprawidłowy plik .apk',
        unknowSourceSetting: 'Instalacja nie powiodła się. W menu Ustawienia > Aplikacje zaznacz „Nieznane źródła”',
        installPhoneMemory: 'Zainstaluj do pamięci',
        unknownError: 'Nieznany błąd',
        networkErrorText: 'Błąd sieci',
        
        waitingText: 'Oczekuje',/*不超过56个字符*/
        pausedText: 'Wstrzymano',/*不超过24个字符*/
        installUnknownError: 'Instalacja nie powiodła się. Nieznany błąd',
        downloadUnknownError: 'Pobieranie nie powiodło się. Nieznany błąd',
        
        adbConnectionError: 'Podłącz urządzenie, aby przenieść',
        
        importFileNotExistedText: 'Importowanie nie powiodło się. Plik nie istnieje',
        importTransferErrorText: 'Importowanie nie powiodło się. Błąd transferu pliku',
        importInsufficientSpace: 'Importowanie nie powiodło się. Niewystarczająca ilość miejsca',
        importUnknownError: 'Importowanie nie powiodło się. Nieznany błąd',
        importUnConnectError: 'Podłącz urządzenie, aby przenieść',
        importFailedNoSdCard: 'Importowanie nie powiodło się. Brak karty SD',
        installSdkOlderError: 'Niezgodność z urządzeniem',
        installMismatchedCertificateError: 'Niezgodność certyfikatu APK. Proszę odinstalować bieżącą aplikację przez przeprowadzeniem instalacji',
        
        transferringText: 'Przesyłanie',/*不超过55个字符*/
        settedText: 'Ustaw w {0}',
        importViaConnectText: 'Podłącz urządzenie, aby przenieść',
        
        installFailedText: 'Instalacja nie powiodła się',
        
        openFolder:'Otwórz folder pobierania',
        
        downloadInText: 'Pobrano {0}',
        reinstallText: 'Instaluj ponow.',/*不超过15个字符*/
        noTaskText: 'Nie ma tutaj żadnych zadań.',
        /*6-04*/
        unknowSource2Setting: "Instalacja nie powiodła się. Sprawdź pozycję „nieznane źródła” w menu Ustawienia > Zabezpieczenia",
        
        unzipAppText:"Trwa wypakowywanie pliku danych",
  		transferDataFile:"Trwa przenoszenie pliku danych",
  		unzipAppFailedText:"Wypakowywanie pliku danych nie powiodło się",
  		transferAppFailedText:"Przenoszenie pliku danych nie powiodło się",
        /*7-28*/
        hideTaskTip:"Ukryj",
        /*2014-09-25*/
        showInstallPopLabel:"Install",
        /*2014-10-14*/
        installOnDeviceText: 'Zakończ proces instalacji na urządzeniu.',
         /*2014-10-16*/
        pleaseTapInstall:"Kliknij w urządzeniu opcję „Zainstaluj”.",
        /*2014-11-10*/
        installSdCard: "Zainstaluj w pamięci RAM",
        onlyInstallSdCard: "Aplikacja może zostać zainstalowana wyłącznie w pamięci RAM.",
        
        /*2015-1-7yangtian*/
        insufficeient:"Mała ilość miejsca na dysku"
       
    };
    return dictionary;
});
