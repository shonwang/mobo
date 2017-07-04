define('poland:tools', function(require, exports, module){
    var dictionary = {
		managementTool:'Narzędzia zarządzania',
		backup:'Kopia zapasowa',/*不超过20个字符*/
		backupIntro:'Utwórz na komputerze kopię zapasową wszystkich danych urządzenia Android.',/*不超过58个字符*/
		restore:'Przywracanie',/*不超过20个字符*/
		restoreIntro:'Przywróć dane z poprzedniej kopii zapasowej.',/*不超过58个字符*/
		fileManager:'Menedżer plików',/*不超过20个字符*/
		fileManagerIntro:'Przeglądaj pliki i foldery na urządzeniu.',/*不超过58个字符*/
		screenshot:'Zrzuty ekranu',/*不超过20个字符*/
		screenshotIntro:'Wykonuj zrzuty ekranu urządzenia.',/*不超过58个字符*/
		deviceInfoIntro:'Wyświetl szczegółowe informacje o urządzeniu.',/*不超过58个字符*/
		installApp:'Instalacja plików',/*不超过20个字符*/
		installAppIntro:'Zainstaluj pliki .apk na urządzeniu.',/*不超过58个字符*/
		advancedTool:'Narzędzia zaawansowane',
		root:'Rootowanie jednym kliknięciem',/*不超过20个字符*/
		rootIntro:'Wykonaj rootowanie urządzenia, aby zwolnić więcej pamięci.',//*不超过58个字符*/
		importOutlook:'Importowanie danych programu Outlook',/*不超过20个字符*/
		importOutlookIntro:'Zaimportuj kontakty programu Outlook z komputera do urządzenia Android.',/*不超过58个字符*/
		importSymbian:'Importowanie danych systemu Symbian',/*不超过20个字符*/
		importSymbianIntro:'Zaimportuj kontakty systemu Symbian do urządzenia Android.',/*不超过58个字符*/
		freeWifi:'Bezpłatna sieć Wi-Fi',/*不超过20个字符*/
		freeWifiIntro:'Udostępnij sieć laptopa urządzeniu za pośrednictwem Wi-Fi.',/*不超过58个字符*/
		
		/*device info*/
		basicInfo:'Podstawowe informacje',
		modelNumber:'Numer modelu:',/*不超过19个字符*/
		androidVer:'Wersja systemu Android:',/*不超过19个字符*/
		screenResoltion:'Rozdzielczość ekranu:',/*不超过19个字符*/
		battery:'Bateria:',/*不超过19个字符*/
		cpu:'Procesor:',/*不超过19个字符*/
		ram:'RAM:',/*不超过19个字符*/
		memory:'Pamięć:',/*不超过19个字符*/
		sdCard:'Karta SD:',/*不超过19个字符*/
		isRooted:'Zrootowane:',/*不超过19个字符*/
		hardwareInfo:'Informacje o sprzęcie',/*不超过19个字符*/
		imei:'IMEI:',/*不超过19个字符*/
		serialNumber:'Numer seryjny:',/*不超过19个字符*/
		imsi:'IMSI:',/*不超过19个字符*/
		macAddress:'Adres MAC:',/*不超过19个字符*/
		basebandVer:'Wersja pasma podstawowego:',/*不超过19个字符*/
		kernelVer:'Wersja jądra:',/*不超过19个字符*/
		copy:'Kopiuj',/*不超过8个字符*/
		copySuccess:'Skopiowano do schowka',
		unknownError: 'Nieznany błąd',
		unKnownText:'Wystąpił nieznany błąd.',
		netWorkError:'Błąd sieci',
		netWorkErrorText:'Proszę sprawdzić połączenie z siecią.',
		/*2014-09-11*/
		pcCleanerLabel:"Oczyszczanie komputera",
		scanOver:"Skanowanie zakończone. Pliki-śmieci {0} i pliki rejestru {1} mogą zostać wyczyszczone.",
		cleanBtn:"Wyczyść",
		lessBrowser:"Niepotrzebne pliki internetowe",
		lessHistory:"Pozostałości",
		lessCommonUes:'Niepożądane oprogramowanie',
		lessSystem:'Niepotrzebne pliki systemowe',
		lessDelete:"Kosz",
		lessUsuse:"Niepotrzebna zawartość rejestru",
		selectedLess:"Wybrano",
		conScan:"Skanuj ponownie",
		cleanText:"Pomaga w oczyszczaniu urządzenia z niepożądanych plików z internetu, systemowych plików-śmieci, niepożądanego oprogramowania i nie tylko!",
		
		cleanFinish:"Czyszczenie zakończone!",
		someFile:"Niektóre pliki i wpisy rejestru zostaną usunięte po ponownym uruchomieniu komputera.",
		cleanOver:"Wyczyszczono {0} plików śmieci oraz {1} plików rejestru!",
		wifiConNot:"Ta funkcja jest niedostępna podczas łączenia z siecią Wi-Fi.",
		
		/*2014-11-03*/
		cleanFinished:"Ukończono",
		/*2014-11-03 wifi hotpot*/
		deviceConnectingList:"Podłączono do {0}",
		startingWifiTitle:"Trwa uruchamianie bezpłatnego połączenia z siecią Wi-Fi...",
		hasNoWIfiTitle:"Komputer nie obsługuje Wi-Fi.",
		iHaveWifi:"Mam sieć Wi-Fi.",
		wifiNameLabel:"Nazwa sieci Wi-Fi: ",
		wifiPasswordLabel:"Hasło do sieci Wi-Fi: ",
		speedLabel:"Szybkość",
		devicesConnectedTitle:"{0} urządzenia podłączone.",
		closeWifiLabel:"Wyłącz Wi-Fi",
		deviceBlackList:"Czarna lista",
		deviceBlackList2:"Czarna lista {0}",
		moveOutBlackList:"Usuń",
		downloadSpeedLabel:"Szybkość pobierania",
		uploadSpeedLabel:"Szybkość wysyłania",
		limitSpeedLabel:"Limit szybkości",
		pleaseWriteNum:"Wprowadź od 1 do 12 liter, cyfr lub znaków podkreślenia.",
		moboWifi:"Mobogenie Wi-Fi",
		setBlackValidateNextTime:"Czarna lista zostanie uruchomiona tylko po ponownym uruchomieniu bezpłatnego Wi-Fi.",
		//2014-11-12
		pleaseWriteDeviceNameValid:"Wprowadź od 1 do 12 znaków.",
		
		//2014-11-14
		haveNoWifiAdapter:"Nie wykryto adaptera USB Wi-Fi",
		solutionLabel:"Rozwiązania",
		solutionPluginTitle:"Podłącz wtyczkę adaptera Wi-Fi aby uruchomić usługę Wi-Fi.",
		solutionSwitchLaptop:"Przełącz na laptopa."
    };
    return dictionary;
});
