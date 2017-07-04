define('russian:common', function(require, exports, module){
    var dictionary = {
        connectingText: 'Подключение',/*不超过16个字符*/
        
        homeLabel: 'Главная',/*不超过14个字符*/
        appLabel: 'Приложения',/*不超过14个字符*/
        gamesLabel: 'Игры',/*不超过14个字符*/
        ringtonesLabel: 'Мелодии',/*不超过14个字符*/
        wallPaperLabel: 'Обои',/*不超过14个字符*/
        youTubeLabel: 'YouTube',/*不超过14个字符*/
        moreLabel: 'Еще',/*不超过14个字符*/
        toolsLabel: 'Инструменты',/*不超过14个字符*/
        safetyLabel: 'Безопасность',/*不超过14个字符*/
        contactLabel: 'Мои контакты',/*不超过14个字符*/
        smsLabel: 'Мои сообщения',/*不超过14个字符*/
        myAppLabel: 'Мои приложения',/*不超过14个字符*/
        myMusicLabel: 'Моя музыка',/*不超过14个字符*/
        myPictureLabel: 'Мои изображения',/*不超过14个字符*/
        myVideoLabel: 'Мои видеоролики',/*不超过14个字符*/
        Import:'Импорт',/*不超过16个字符*/
        Export:'Экспорт',/*不超过16个字符*/
        Delete:'Удалить',
        Refresh:'Обновить',
        updateAllLabel: 'Обновить все',/*不超过16个字符*/
        updateLabel: 'Обновить',/*不超过12个字符*/
        uninstallLabel: 'Удалить',/*不超过16个字符*/
        deviceText: 'Устройство',/*不超过12个字符*/
        phoneText: 'Телефон',
        memoryText: 'Память',/*不超过12个字符*/
        installLabel: 'Установка',/*不超过12个字符*/
        sizeLabel: 'Размер',
        nameLabel: 'Имя',
        locationLabel: 'Место',
        actionLabel: 'Действие',
        selectAllLabel: 'Выбрать все',/*不超过30个字符*/
        downloadAllLabel: 'Загрузить все',/*不超过24个字符*/
        downloadingText: 'Загрузка',/*不超过24个字符*/
        redownloadText: 'Загрузить повторно',
        downloadLabel: "Загрузить",
        
        successText: 'Успешно',
        installedInText: 'Установлено в {0}',/*不超过45个字符*/
        ImportingText: 'Выполняется импорт',/*不超过55个字符*/
        setWallpaperFailed: 'Не удалось установить обои',
        importedInText: 'Импортировано в {0}',/*不超过45个字符*/
        
        retryText: 'Повторить',/*不超过15个字符*/
        pauseText: 'Пауза',/*不超过15个字符*/
        continueText: 'Продолжить',/*不超过15个字符*/
        inProcessingTaskText: 'Выполняется',
        completedText: 'Завершено',
        noTaskText: 'Нет выполняющихся задач',/*不超过18个字符*/
        
        captureLabel: 'Съемка',/*不超过24个字符*/
        featureText: 'Необходимые',/*不超过24个字符*/
        countTasksText: 'Задачи: {0}',/*不超过15个字符*/
        
        updateTipText: 'Последние версии приложений ({0}) уже загружены.',/*不超过65个字符*/
        rootTipText: 'Для вашего устройства не получены права администратора. Получение прав администратора позволит устанавливать любые приложения.',
        oneClickRootLabel: 'Root одним нажатием',
        shareMobogenieText: 'Поделиться Mobogenie в',/*不超过65个字符*/
        
        tipLabel: 'Совет',
        confirmLabel:'Подтв.',
        okLabel : 'OK',
        yesLabel : 'Да',
        cancelLabel:'Отмена',
        closeLabel : 'Закрыть',
        failedLabel : 'сбой',
        exportSuccess:'Экспортировано',
        
        headSignIn:'Вход',/*不超过11个字符*/
        /*connectAnother : 'Подключить другое устройство',*/
        deviceInfo: 'Об устройстве',/*不超过22个字符*/
        email:'Электронная почта',
        /*add 2014-03-28*/
        promptInvaildPath:'Недопустимый путь.',
	   
	    connectDeviceVia:'Просто подключите свой телефон, чтобы бесплатно установить приложения, игры, видео и любой другой контент на Андроид, а также воспользуйтесь революционной службой управления устройством.',
        connectNow:'Подключить сейчас',
		
		downloadingDriver:'Выполняется загрузка драйвера для вашего устройства {0}',/*不超过50个字符*/
		installingDriverText:'Выполняется установка драйвера для вашего устройства',/*不超过50个字符*/
		installingMG:'Выполняется установка Mobogenie на ваше устройство',/*不超过50个字符*/
		connectedYourDeviceText: 'Подключено',/*不超过50个字符*/
		disconnectYourDeviceText: 'Отключить',/*不超过50个字符*/

        searchResultText: 'Поиск <span class="c-red">{0}</span>, найдено результатов: <span class="c-red">{1}</span> ',
        searchSeeAllLink: 'Посмотреть все',
        openLabel: 'Открыть папку',
        
        Exporting:"Выполняется экспорт. Не отключайте устройство.",
        Deleting:"Выполняется удаление. Не отключайте устройство.",

        deviceMemoryLabel: "Память устройства",
        sdCardLabel: "SD-карта 1",
        sdCardTwoLabel: "SD-карта 2",
        total: "Всего: ",/*不超过20个字符*/
        available: "Доступно: ",/*不超过20个字符*/
        manage: "Управление",
        
        installedText: 'Установлено',/*不超过15个字符*/
        updateAppText: 'Обновить',/*不超过12个字符*/
        installingAppText: 'Установка',/*不超过55个字符*/
        installText: 'Установка',/*不超过15个字符*/

        /*2014-05-13*/
       searchHolderMyApp:"Локальные игры и приложения",
       searchHolderWallpaper:"Обои",
       searchHolderRingtone:"Мелодии",
       searchHolderAppGames:"Приложения/игры",
       noSdState:"На Вашем устройстве не найдено SD-карт .",
       /*2014-5-26*/
       minTipText:"Свернуть",
       maxTipText:"Развернуть",
       exitTipText:"Выйти",
       returnTipText:"Назад",
       retreatTipText:"Переслать",
       /*2014-5-27*/
       noLabel : 'Нет',
       menuOpenLabel:"Открыть",
       //20140604
       bestPicksLabel: 'Наилучшие подборки',
       actionFailed:'Ошибка выполнения',
       /*2014-06-09*/
      searchHolderYoutube:'URL или ключевые слова YouTube ',
      screenshotSave:"Снимок необходимо сохранить в: ",
      screenshotText:"Снимки",
      screenshotCheckPathTip: "Всегда используйте этот путь для сохранения снимков",
      /*2014-06-10*/
      alwaysOpenClient:'При подключении устройства всегда открывайте Mobogenie.',
      changeOpenClient:'Вы всегда можете это поменять в настройках.',
      /*2014-06-18*/
      screenBlackTipText: "Увеличьте яркость экрана мобильного устройства",
      /*2014-06-30*/
     ebookLabel:"Книги",
     myEbookLabel:"Мои книги",
      /*2014-6-30修改*/
      connectDeviceText:'Подключение. Не отключайте устройство.',
      openManageDevice:"Обнаружено устройство. Откройте Mobogenie, чтобы управлять устройством и загружать бесплатный контент.",
      /*2014-07-18*/
     searchHolderEBook:"Книги",
          /*2014-09-25*/
    rememberMarkLabel:"Запомнить настройки"
    };
    return dictionary;
});