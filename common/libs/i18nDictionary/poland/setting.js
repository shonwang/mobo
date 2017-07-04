define('poland:setting', function(require, exports, module){
    var dictionary = {
    	aboutMe:'O Mobogenie',/*不超过18个字符*/
		aboutMeVersion:'Wersja: {0}',/*不超过22个字符*/
		MGWebsite:'Strona internetowa:',/*不超过35个字符*/
		MGForums:'Fora:',/*不超过35个字符*/
		aboutMeLinkPolicy: 'Zasady zachowania prywatności',/*不超过35个字符*/
		aboutMeLinkEULA: 'Umowa licencyjna',/*不超过35个字符*/
		aboutMeLinkTOS: 'Warunki świadczenia usług',/*不超过35个字符*/
		aboutMeFootText: '©2014 Mobogenie.com. All Rights Reserved',/*不超过70个字符*/
		feedback:'Komentarze',
        fbFootText: 'Twoja opinia jest dla nas ważna!',/*不超过60个字符*/
        BtnSubmit: 'Prześlij',
        fbSuccessTitle: 'Dziękujemy za opinię!',/*不超过45个字符*/
        fbSuccessText: 'Pracownik naszego działu obsługi klienta skontaktuje się z Tobą możliwie jak najszybciej, więc prosimy o sprawdzanie poczty!',/*不超过150个字符*/
        
       
        setting: 'Ustawienia',/*不超过18个字符*/
        checkForUpdates: 'Sprawdź aktual.',/*不超过18个字符*/
        whatNew: 'Co nowego?',/*不超过18个字符*/
        ContactUs: 'Skontaktuj się',/*不超过18个字符*/
        
		generalLabel: 'Ogólne',/*不超过13个字符*/
		LocationsLabel: 'Lokalizacje',/*不超过13个字符*/
		AppllicationsLabel: 'Aplikacje',/*不超过13个字符*/
		remindersLabel: 'Przypomnienia',/*不超过13个字符*/
		Language: 'Język',/*不超过62个字符*/
		generalStartupTitle: 'Po uruchomieniu',/*不超过62个字符*/
		generalStartupText:'Automatycznie kontynuuj niedokończone zadania',/*不超过62个字符*/
		generalConnetTitle: 'Po podłączeniu urządzenia',/*不超过62个字符*/
		generalConnetText: 'Zawsze otwieraj Mobogenie',/*不超过62个字符*/
		generalConnetTextTwo: ' Automatycznie zainstaluj pobrane aplikacje',/*不超过62个字符*/
		generalCloseTitle: 'Po zamknięciu',/*不超过62个字符*/
		generalCloseText: ' Zminimalizuj klienta do zasobnika',/*不超过62个字符*/
		generalCloseTextTwo: 'Wyjdź z klienta',/*不超过62个字符*/
		generalCloseTextThree: 'Przypominaj mi za każdym razem',/*不超过62个字符*/
		generalUpdateTitle: 'Aktualizacja klienta',/*不超过62个字符*/
		generalUpdateText: 'Automatycznie zaktualizuj klienta do najnowszej wersji',/*不超过62个字符*/
		locationsResource: 'Pliki zasobów',/*不超过62个字符*/
		locationsBackup: 'Lokalizacja kopii zapasowej',/*不超过62个字符*/
		locationsScreen: 'Lokalizacja zrzutów ekranu',/*不超过62个字符*/
		locationsBtn: 'Przeglądaj',/*不超过12个字符*/
		appllicationsFileTitle: 'Skojarzenia plików',/*不超过62个字符*/
		appllicationsFileText: 'Sprawdź, czy pliki .apk są skojarzone z Mobogenie',/*不超过62个字符*/
        appllicationsLatestTitle: 'Automatycznie aktualizuj najnowsze aplikacje',
		appllicationsLatestText: 'Automatycznie pobieraj najnowsze aplikacje do aktualizacji',/*不超过62个字符*/
		appllicationsDefaultTitle: 'Domyślna lokalizacja instalowania',/*不超过62个字符*/
		appllicationsDefaultText: ' Automatycznie (jeśli instalacja nie powiedzie się na karcie SD, zostanie uruchomiona instalacja na urządzeniu)',/*不超过62个字符*/
		appllicationsDefaultTextTwo: 'Pamięć urządzenia',/*不超过62个字符*/
		appllicationsDefaultTextThree: 'Zewnętrzna karta SD (obsługuje tylko Android 2.2 i powyżej)',/*不超过62个字符*/
		remindersUpdateTitle: 'Aktualizacje aplikacji',/*不超过62个字符*/
		remindersUpdateText:'Przypomnij mi, aby aktualizować aplikacje co {0} dni',/*不超过62个字符*/
		remindersBackupText:'Przypomnij mi, aby utworzyć kopię zapas. urządzenia co {0} dni',/*不超过62个字符*/
		remindersUpdateTextTwo: 'Nigdy nie przypominaj',/*不超过62个字符*/
		remindersBackupTitle: 'Tworzenie kopii zapasowej',/*不超过62个字符*/
		remindersPopularTitle: 'Popularna aktywność',/*不超过62个字符*/
		remindersPopularText: 'Przypomnij, gdy dostępne są popularne działania lub promocje',
		/*5-24*/
		swicthSiteLabel:'Strona',
		/*5-26*/
		settingTip:"Menu",
		/*7-21*/
		fbModelName: 'Model urządzenia',
		fbOsVersion: 'Wersja systemu Android',
		
		/*7.22*/
		fbType9:"Inny",
		/*2014-9-9*/
		upload:"Przesyłanie",
		/*2014-9-11 新版反馈文案*/
		pleaseGory:"Kategoria problemu:",
		pleaseChoose:"Wybierz kategorię.",
		openUSB:"Otwórz debugowanie USB:",
		pleaseSele:"Wybierz...",
		whatUsb:"Czym jest debugowanie USB?",
		havaActive:"Czy  debugowanie USB jest włączone?",
		phoneModel:"Model telefonu:",
		pleaseEnter:"Wprowadź model telefonu.",
		modelOf:"Model telefonu, na którym występuje problem",
		email: "Adres e-mail:",
		enterEmail:"Wprowadź adres e-mail.",
		enterValid:"Wprowadź poprawny adres e-mail, aby zwiększyć jakość naszych usług",
		andVer:"Wersja systemu Android:",
		pleaseVer:"Wybierz wersję systemu Android.",
		corSystem:"Wprowadzenie poprawnej wersji systemu Android pozwoli dokładnie zidentyfikować problem.",
		socialAcc:"Konto na portalu społecznościowym:",
		selectMethod:"Wybór metody kontaktu",
		description:"Opis:",
		addAttach: "Dodaj załącznik",
		noFiles:"Brak plików",
		onlySupports:"Obsługiwane są wyłącznie pliki mniejsze niż 3MB.",
		whyNeed:"Dlaczego muszę włączyć funkcję debugowania USB?",
		debugRequired:"W celu pełnego połączenia systemu Android z komputerem stacjonarnym niezbędne jest uruchomienie funkcji debugowania USB. Aktywowanie funkcji debugowania USB pozwala szybciej połączyć telefon lub tablet z aplikacją Mobogenie.",
		openfun:"Jak uruchomić funkcję debugowania USB?",
		andLower:"Android 3.2 lub starszy",
		selectSet:"Wybierz [Ustawienia] z listy aplikacji, aby przejść do ustawień systemu.",
		selectApp: "Wybierz [Aplikacje].",
		
		selectDeve:"Wybierz [Dla deweloperów].",
		selectTap:"Wybierz [Debugowanie USB] i dotknij OK.",
		andFour: "Android 4.0 i 4.1",
		selectOpt:"Wybierz [Opcje programisty]",
		openOpt:"Otwórz [Opcje programisty] znajdujące się w górnej części.",
		checkTap:"Zaznacz [Debugowanie USB] i dotknij OK.",
		androidFour:"Android 4.2",
		tapIcon:"Dotknij ikonę [Ustawienia].",
		tapPhone:"Dotknij [O telefonie].",
		scrollBot: "Przewiń ekran do samego dołu, znajdź [Numer kompilacji] i dotknij tę ikonę kilka razy.",
		
		keepTap:"Dotknij i przytrzymaj tę ikonę do momentu aż pojawi się wiadomość \„Jesteś programistą!\”",
		goback:"Wróć do strony [Ustawienia], aby przeglądać [Opcje programisty]!",
		enterDeve:"Przejdź do zakładki [Opcje programisty] i dotknij [Debugowanie USB].",
		backDeve:"Wróć do zakładki [Opcje programisty] i upewnij się, że opcja [Debugowanie USB] jest zaznaczona.",
		connectCom:"Podłącz telefon do komputera i uruchom aplikację Mobogenie. <br/>Aplikacja Mobogenie zainstaluje na komputerze [Mobogenie Helper].<br/>Dotknij OK, gdy pojawią się powiadomienia dotyczące instalacji.",
		returnCon:"Powróć i kontynuuj",
		fbSuccessClose: 'Kontynuuj przeglądanie sklepu{0}',
		
		unableCon:"Nie można uzyskać połączenia z telefonem",
		proInstall:"Problem z zasobami",
		contactsText:"Kontakty i wiadomości tekstowe",
		slowPer:"Pokaż wydajność",
		unableRoot:"Nie można zrootować",
		stillWhen:"Nadal pojawia się MG, gdy żadne urządzenie nie jest podłączone",
		suggesNew:"Sugestie dotyczące nowych funkcji",
		usbOn: "Debugowanie USB wł.",
		usbOff: 'Debugowanie USB wył.',
		fbTextarea: "Chętnie zapoznajemy się z opiniami użytkowników!",
		errorFile:"nieprawidłowy format pliku",
		/*2014-11-07*/
		unableCon:"Nie udało się połączyć telefony za pomocą USB.",
		unableWifiCon:"Nie udało się połączyć telefony za pomocą Wi-Fi.",
    };
    return dictionary;
});
