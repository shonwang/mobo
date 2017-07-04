define('poland:common', function(require, exports, module){
    var dictionary = {
        connectingText: 'Łączenie',/*不超过16个字符*/
        
        homeLabel: 'Strona gł.',/*不超过14个字符*/
        appLabel: 'Aplikacje',/*不超过14个字符*/
        gamesLabel: 'Gry',/*不超过14个字符*/
        ringtonesLabel: 'Dzwonki',/*不超过14个字符*/
        wallPaperLabel: 'Tapety',/*不超过14个字符*/
        youTubeLabel: 'YouTube',/*不超过14个字符*/
        moreLabel: 'Więcej',/*不超过14个字符*/
        toolsLabel: 'Zest. narzędzi',/*不超过14个字符*/
        safetyLabel: 'Bezpieczeństwo',/*不超过14个字符*/
        contactLabel: 'Moje kontakty',/*不超过14个字符*/
        smsLabel: 'Moje wiadom.',/*不超过14个字符*/
        myAppLabel: 'Moje aplikacje',/*不超过14个字符*/
        myMusicLabel: 'Moja muzyka',/*不超过14个字符*/
        myPictureLabel: 'Moje zdjęcia',/*不超过14个字符*/
        myVideoLabel: 'Moje filmy',/*不超过14个字符*/
        Import:'Importuj',/*不超过16个字符*/
        Export:'Eksportuj',/*不超过16个字符*/
        Delete:'Usuń',
        Refresh:'Odśwież',
        updateAllLabel: 'Aktual. wszystko',/*不超过16个字符*/
        updateLabel: 'Aktualizuj',/*不超过12个字符*/
        uninstallLabel: 'Odinstaluj',/*不超过16个字符*/
        deviceText: 'Urządzenie',/*不超过12个字符*/
        phoneText: 'Telefon',
        memoryText: 'Pamięć',/*不超过12个字符*/
        installLabel: 'Zainstaluj',/*不超过12个字符*/
        sizeLabel: 'Rozmiar',
        nameLabel: 'Nazwa',
        locationLabel: 'Lokalizacja',
        actionLabel: 'Akcja',
        selectAllLabel: 'Wybierz wszystkie',/*不超过30个字符*/
        downloadAllLabel: 'Pobierz wszystko',/*不超过24个字符*/
        downloadingText: 'Pobieranie',/*不超过24个字符*/
        redownloadText: 'Pobierz ponownie',
        downloadLabel: "Pobierz",
        
        successText: 'powiodło się',
        installedInText: 'Zainstalowano w {0}',/*不超过45个字符*/
        ImportingText: 'Importowanie',/*不超过55个字符*/
        setWallpaperSucess: 'Set wallpaper succeed',
        importedInText: 'Zaimportowano w {0}',/*不超过45个字符*/
        retryText: 'Ponów',/*不超过15个字符*/
        pauseText: 'Wstrzymaj',/*不超过15个字符*/
        continueText: 'Kontynuuj',/*不超过15个字符*/
        inProcessingTaskText: 'W toku',
        completedText: 'Zakończone',
        noTaskText: 'Brak zadań w toku',/*不超过18个字符*/
        
        captureLabel: 'Zrób zdjęcie',/*不超过24个字符*/
        featureText: 'Najlepsze',/*不超过24个字符*/
        countTasksText: '{0} zad.',/*不超过15个字符*/
        
        updateTipText: 'Masz już najnowszą wersję {0} aplikacji.',/*不超过65个字符*/
        rootTipText: 'Urządzenie mobilne nie zostało zrootowane. Rootowanie pozwoli zainstalować dowolną aplikację.',
        oneClickRootLabel: 'Rootowanie jednym kliknięciem',
        shareMobogenieText: 'Udostępnij Mobogenie na',/*不超过65个字符*/
        
        tipLabel: 'Wskazówka',
        confirmLabel:'Potwierdź',
        okLabel : 'OK',
        yesLabel : 'Tak',
        cancelLabel:'Anuluj',
        closeLabel : 'Zamknij',
        failedLabel : 'niepowodzenie',
        exportSuccess:'Eksportowanie ukończone pomyślnie',
        
        headSignIn:'Zaloguj się',/*不超过11个字符*/
        /*connectAnother : 'Podłącz inne urządzenie',*/
        deviceInfo: 'O urządzeniu',/*不超过22个字符*/
        email:'E-mail',
        /*add 2014-03-28*/
        promptInvaildPath:'Nieprawidłowa ścieżka.',
	   
	    connectDeviceVia:'Wystarczy podłączyć telefon, aby zainstalować aplikacje, gry, filmy i różnego rodzaju bezpłatne materiały na system Android. Powitaj rewolucyjną usługę zarządzania urządzeniami mobilnymi.',
        connectNow:'Podłącz teraz',
		
		downloadingDriver:'Pobieranie sterownika urządzenia {0}',/*不超过50个字符*/
		installingDriverText:'Instalowanie sterownika urządzenia',/*不超过50个字符*/
		installingMG:'Instalowanie Mobogenie w urządzeniu',/*不超过50个字符*/
		connectedYourDeviceText: 'Podłączono',/*不超过50个字符*/
		disconnectYourDeviceText: 'Rozłącz',/*不超过50个字符*/

        searchResultText: 'Wyszukaj <span class="c-red">{0}</span>, znaleziono <span class="c-red">{1}</span> wyników ',
        searchSeeAllLink: 'Zobacz wszystko',
        openLabel: 'Otwórz folder',
        
        Exporting:"Trwa eksportowanie. Nie odłączaj urządzenia.",
        Deleting:"Trwa usuwanie. Nie należy odłączać urządzenia.",

        deviceMemoryLabel: "Pamięć urządzenia",
        sdCardLabel: "Karta SD 1",
        sdCardTwoLabel: "Karta SD 2",
        total: "Suma: ",/*不超过20个字符*/
        available: "Dostępne: ",/*不超过20个字符*/
        manage: "Zarządzanie",
        
        installedText: 'Zainstalowano',/*不超过15个字符*/
        updateAppText: 'Aktualizuj',/*不超过12个字符*/
        installingAppText: 'Instalacja',/*不超过55个字符*/
        installText: 'Zainstaluj',/*不超过15个字符*/

        /*2014-05-13*/
       searchHolderMyApp:"Lokalne aplikacje i gry",
       searchHolderWallpaper:"Tapety",
       searchHolderRingtone:"Dzwonki",
       searchHolderAppGames:"Aplikacje/gry",
       noSdState:"Brak karty pamięci SD w urządzeniu.",
       /*2014-5-26*/
       minTipText:"Zminimalizuj",
       maxTipText:"Zmaksymalizuj",
       exitTipText:"Wyjście",
       returnTipText:"Wstecz",
       retreatTipText:"Dalej",
       /*2014-5-27*/
       noLabel : 'Nie',
       menuOpenLabel:"Otwórz",
       //20140604
       bestPicksLabel: 'Najlepsze aplikacje',
       actionFailed:'Działanie nie powiodło się',
       /*2014-06-09*/
      searchHolderYoutube:'Adres URL serwisu YouTube lub słowa kluczowe',
      screenshotSave:"Zrzut danych zapisany w: ",
      screenshotText:"Zrzut danych",
      screenshotCheckPathTip: "Należy zawsze używać tej ścieżki do zapisywania zrzutów danych",
      /*2014-06-10*/
      alwaysOpenClient:'Otwieraj Mobogenie zawsze po podłączeniu do urządzenia.',
      changeOpenClient:'Zmiana tej opcji jest możliwa w każdej chwili, po przejściu do Ustawień.',
      /*2014-06-18*/
      screenBlackTipText: "Włącz podświetlenie ekranu urządzenia przenośnego",
      /*2014-06-30*/
     ebookLabel:"Książki",
     myEbookLabel:"Moje książki",
      /*2014-6-30修改*/
      connectDeviceText:'Trwa łączenie. Nie odłączaj urządzenia.',
      openManageDevice:"Urządzenie zostało wykryte. Uruchom aplikację Mobogenie, aby zarządzać urządzeniem i pobierać darmowe treści.",
      /*2014-07-18*/
     searchHolderEBook:"Książki",
          /*2014-09-25*/
    rememberMarkLabel:"Zapamiętaj ustawienia"
    };
    return dictionary;
});
