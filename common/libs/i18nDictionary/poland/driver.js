define('poland:driver', function(require, exports, module){
    var dictionary = {
		badNetworkTitle:'Błąd połączenia z siecią. Sprawdź sieć.',/*不超过70个字符*/
		pictureGuide: 'Porady foto',/*不超过26个字符*/
		videoGuide: 'Porady wideo',/*不超过26个字符*/
		myVersion: 'Moja wersja sys. Android:',/*不超过26个字符*/
		debugFootText: 'Nadal nie możesz otworzyć debug. USB?',/*不超过40个字符*/
		oneClickSet: 'Ustaw kliknięciem',/*不超过30个字符*/
		tryConnectText: 'Spróbuj odł. i ponownie podł. przewód lub uruchom ponownie urządzenie.',/*不超过70个字符*/
		butBack: 'Wstecz',
		ContactSupport: 'Skontaktuj się z obsługą tech.',/*不超过30个字符*/
		allowDebugText: 'Naciśnij „OK”, kiedy wyświetli się pyt., czy zezwolić na debug. USB.',/*不超过70个字符*/
		allowDebugTip: "<i>1</i> Zaznacz tę opcję",/*不超过50个字符*/
		allowDebugOkTip: "<i>2</i> Dotknij <b>[OK]</b>",/*不超过50个字符*/
		butRetry: 'Nie widzisz tego okienka?',/*不超过60个字符*/
		butShowAgain: 'Wyświetl jeszcze raz',/*不超过25个字符*/
		stillNoSolove: 'Ciągle nie działa?',
        debugTipText: 'Pobierz {0} (12KB) na swoje urządzenie',/*不超过50个字符*/
        debugSetterContentText: ' [Debuger USB]',/*不超过20个字符*/
		orText: 'LUB',
		noSpaceHint: 'Brak miejsca na urządzeniu.',/*不超过60个字符*/
		noSpaceText: 'Mobogenie wymaga co najmniej {0} miejsca na dysku.',/*不超过50个字符*/
		needSpaceText: '10 MB',
		upSpaceText: 'Odinstaluj niektóre aplikacje, aby zwolnić trochę miejsca.',/*不超过60个字符*/
		butHaveSpace: 'Mam wystarczającą ilość miejsca',/*不超过32个字符*/
		connectFailedTitle:'Ojej. Podłączenie nie udało się.',
		connectFailedTryText: 'Spróbuj odłączyć urządzenie, a następnie podłącz je ponownie.',/*不超过90个字符*/
		connectFailedRestart: 'Uruchom ponownie Mobogenie.',/*不超过90个字符*/
		RestartDevice: 'Uruchom ponownie komputer i urządzenie.',/*不超过90个字符*/
		connectFailedText: 'Jeśli problem się utrzymuje, możesz zajrzeć do naszych często zadawanych pytań lub skontaktować się z nami.',/*不超过90个字符*/
		
		connectionGuide:'Instrukcja podłączania',
		driverUsbTitle: 'Podłącz urządzenie za pomocą kabla USB.',/*不超过50个字符*/
		driverUsbText: 'Po podłączeniu urządzenia będziesz mógł pobierać gry, aplikacje i inne materiały za darmo, a także zarządzać swoim urządzeniem.',
		
		AndroidLowDebugStep1: '<i>1</i> Dotknij <b>[Szuflada aplikacji]</b>',/*不超过60个字符*/
		AndroidLowDebugStep2: '<i>2</i> Dotknij <b>[Ustawienia]</b>',/*不超过60个字符*/
		AndroidLowDebugStep3: '<i>3</i> Dotknij <b>[Aplikacje]</b>',/*不超过60个字符*/
		AndroidLowDebugStep4: '<i>4</i> Dotknij <b>[Dla deweloperów]</b>',/*不超过60个字符*/
		AndroidLowDebugStep5: '<i>5</i> Zaznacz <b>[Debugowanie USB]</b>',/*不超过60个字符*/
		AndroidLowDebugStep6: '<i>6</i> Dotknij <b>[OK]</b>',/*不超过60个字符*/
		AndroidHighDebugStep3: '<i>3</i> Dotknij <b>[Opcje deweloperskie]</b>',/*不超过60个字符*/
		AndroidHigherDebugStep3: '<i>3</i> Dotknij <b>[O telefonie]</b>',/*不超过60个字符*/
		AndroidHigherDebugStep4: '<i>4</i> Dotknij <b>[Numer kompilacji]</b> kilkakrotnie',/*不超过60个字符*/
		AndroidHigherDebugStep5: '<i>5</i> Zostanie włączony tryb deweloperski',/*不超过60个字符*/
		AndroidHigherDebugStep6: '<i>6</i> Wróć i dotknij <b>[Opcje deweloperskie]</b>',/*不超过60个字符*/
		AndroidHigherDebugStep9: '<i>9</i> Zaznacz <b>[Zawsze zezwalaj z tego komputera]</b>',/*不超过60个字符*/
		
		SamsungHighDebugStep4: '<i>4</i> Zaznacz <b>[Opcje deweloperskie]</b>',/*不超过60个字符*/
		SamsungHigherDebugStep3: '<i>3</i> Dotknij <b>[Więcej]</b>',/*不超过60个字符*/
		SamsungHigherDebugStep4: '<i>4</i> Dotknij <b>[O urządzeniu]</b>',/*不超过60个字符*/
		
		driver1 :'<i>3</i> Dotknij <b>[o]</b>',
		driver2 :'<i>4</i> Dotknij <b>[informacje o oprogramowaniu]</b>',
		driver3 :'<i>8</i> Wybierz <b>[cofnij] </b>i dotknij<b>[Opcje dewelopera]</b>',
		driver4 :'<i>9</i> Sprawdź <b>[Nie pytaj mnie nigdy więcej]</b>',
		driver5 :'<i>2</i> Dotknij <b>[Ogólne]</b>',
		driver6 :'<i>10</i> Dotknij<b>[Tak]</b>',
		/*2014-6-12*/
		driver7:' Zaznacz <b>[Nie pokazuj komunikatu nigdy więcej]</b>',
		
		/*2014-7-3*/
		usbDebugServiceText:"W celu uzyskania pomocy można również skontaktować się z działem obsługi klienta",
		usbDebugCustomer:"Obsługa Klienta",
		usbDebugTitle: 'Aby zarządzać telefonem, otwórz menu debugowania USB',
		
		/*2014wifi*/
		driverUsbConnect: 'Połączenie USB',
		driverWifiConnect: 'Połączenie Wi-Fi',
		deviceBeen:"Wykryto urządzenia: {0}. Podłącz.",
		connectAnother:"Podłącz inne urządzenie",
		pleaseDownMg:"Pobierz program <b>Mobogenie Helper</b>.",
		alreadyHava:"Mam już program Mobogenie Helper",
		enterPass:"2.Wprowadź kod weryfikacyjny.",
		howtofind:"Jak znaleźć kod weryfikacyjny?",
		pleasePhoneOk:"Zaakceptuj połączenie urządzenia.",
		conncetionFailed:"Podłączenie nie powiodło się. Sprawdź następujące elementy ",
		phoneWifiOpen:"Sprawdź, czy opcja połączeń Wi-Fi jest włączona oraz czy urządzenie i komputer są podłączone do tej samej sieci LAN.",
		passwordOk:"Czy kod weryfikacyjny jest prawidłowy?",
		connectnix:"Podłączenie nie powiodło się. Urządzenie odrzuciło połączenie z komputerem.",
		
		contingDevice:"Trwa podłączanie urządzenia...",
		updatingHelp:"Trwa aktualizowanie Mobogenie Helper...",
		updateFailed:"Nie powiodła się aktualizacja Mobogenie!",
		alreadyCon:"Kabel USB został podłączony.",
		connectBtnText:"Podłącz",
		wifiScreen:"Uzyskanie dostępu do zrzutów ekranu z telefonu przez Wi-Fi jest niemożliwe.",
		
		//2014-10-14
		connectNoticeTitle: 'Podłącz do urządzenia.',
		helpisOpen:"Czy program Mobogenie Helper jest uruchomiony na Twoim telefonie?",
		//2014-10-20
		pleaseClick:"Po zainstalowaniu otwórz program Mobogenie Helper i kliknij przycisk poniżej, aby połączyć ponownie.",
		reConnectBtn:"Połącz ponownie",
		pleaseInstall:"Przesłano zaktualizowany program Mobogenie Helper. Zainstaluj go na swoim urządzeniu z systemem Android.",
		scanBlow:"Zeskanuj poniższy kod QR",
		downloadUsing:"Pobierz na swoje urządzenie, używając poniższego adresu URL",
		openHelpDevice:"1. Otwórz program Mobogenie Helper na swoim urządzeniu.",
		
		/*2014-11-07修改*/
		connectFailedText:"Połącz przez Wi-Fi.",
		waitLong:"Operacja trwa zbyt długo? Powiadom nas o tym!",
		alreadyHava:"Mam zainstalowana aplikację Mobogenie Helper na telefonie Dalej!",
		noHavaMobo:"Nie mam zainstalowanej aplikacji Mobogenie Helper na telefonie Zabierz mnie stąd!",
		tryConnectWifi:"Try connecting via Wi-Fi",
		/*2014-11-14增加*/
		driverWifiConnect:"Połączenie bezprzewodowe",
		havaOpenUsb:"Uruchomiona została funkcja USB.",
		usbConnectFailed:"Błąd połączenia USB",
		checkPhoneFailed: "Oprogramowanie blokuje połączenie telefonu z komputerem. Zamknij program i spróbuj ponownie.",
		closeReConnect: "Zamknij program i podłącz ponownie do {0}."
    };
    return dictionary;
});
