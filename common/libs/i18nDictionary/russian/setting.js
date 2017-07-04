define('russian:setting', function(require, exports, module){
    var dictionary = {
    	aboutMe:'О Mobogenie',/*不超过18个字符*/
		aboutMeVersion:'Версия: {0}',/*不超过22个字符*/
		MGWebsite:'Веб-сайт:',/*不超过35个字符*/
		MGForums:'Форумы:',/*不超过35个字符*/
		aboutMeLinkPolicy: 'Политика конфиденциальности',/*不超过35个字符*/
		aboutMeLinkEULA: 'Лицензионное соглашение',/*不超过35个字符*/
		aboutMeLinkTOS: 'Условия предоставления услуг',/*不超过35个字符*/
		aboutMeFootText: '©2014 Mobogenie.com. All Rights Reserved',/*不超过70个字符*/
		feedback:'Обратная связь',
        fbEmailFormatFailed: 'Недопустимый адрес электронной почты',/*不超过60个字符*/
        BtnSubmit: 'Отправить',
        fbSuccessTitle: 'Благодарим за отзыв.',/*不超过45个字符*/
        fbSuccessText: 'Специалисты нашей службы по работе с клиентами свяжутся с вами в кратчайшие сроки. Не забывайте проверять входящие письма.',/*不超过150个字符*/
        
       
        setting: 'Параметры',/*不超过18个字符*/
        checkForUpdates: 'Проверить обновления',/*不超过18个字符*/
        whatNew: 'Что нового?',/*不超过18个字符*/
        ContactUs: 'Контакты',/*不超过18个字符*/
        
		generalLabel: 'Общие положения',/*不超过13个字符*/
		LocationsLabel: 'Местополож- ения',/*不超过13个字符*/
		AppllicationsLabel: 'Приложения',/*不超过13个字符*/
		remindersLabel: 'Напоминания',/*不超过13个字符*/
		Language: 'Язык',/*不超过62个字符*/
		generalStartupTitle: 'Автозапуск',/*不超过62个字符*/
		generalStartupText:'Автоматическое продолжение незавершенных задач',/*不超过62个字符*/
		generalConnetTitle: 'При подключении устройства',/*不超过62个字符*/
		generalConnetText: 'Всегда открывать Mobogenie',/*不超过62个字符*/
		generalConnetTextTwo: ' Автоматическая установка загруженных приложений',/*不超过62个字符*/
		generalCloseTitle: 'При закрытии',/*不超过62个字符*/
		generalCloseText: ' Свернуть клиент в панель задач',/*不超过62个字符*/
		generalCloseTextTwo: 'Выйти из клиента',/*不超过62个字符*/
		generalCloseTextThree: 'Напоминать каждый раз',/*不超过62个字符*/
		generalUpdateTitle: 'Обновление клиента',/*不超过62个字符*/
		generalUpdateText: 'Автоматически обновлять клиента до последней версии',/*不超过62个字符*/
		locationsResource: 'Загрузки ресурсов',/*不超过62个字符*/
		locationsBackup: 'Место хранения резервной копии',/*不超过62个字符*/
		locationsScreen: 'Место хранения снимков экрана',/*不超过62个字符*/
		locationsBtn: 'Обзор...',/*不超过12个字符*/
		appllicationsFileTitle: 'Сопоставление файлов',/*不超过62个字符*/
		appllicationsFileText: 'Проверьте сопоставление файлов .apk с Mobogenie',/*不超过62个字符*/
        appllicationsLatestTitle: 'Автообновление последних приложений',
		appllicationsLatestText: 'Загружать последние обновления приложений автоматически',/*不超过62个字符*/
		appllicationsDefaultTitle: 'Место установки по умолчанию',/*不超过62个字符*/
		appllicationsDefaultText: ' Автоматически (при ошибке установки на SD-карту будет установлено на устройство).',/*不超过62个字符*/
		appllicationsDefaultTextTwo: 'Память устройства.',/*不超过62个字符*/
		appllicationsDefaultTextThree: 'Внешняя SD-карта (поддерживается только в Android 2.2 и выше).',/*不超过62个字符*/
		remindersUpdateTitle: 'Обновления приложений',/*不超过62个字符*/
		remindersUpdateText:'Напоминать об обновлении приложений каждые {0} дн.',/*不超过62个字符*/
		remindersBackupText:'Напоминать о резервном копировании устройства каждые {0} дн.',/*不超过62个字符*/
		remindersUpdateTextTwo: 'Не напоминать',/*不超过62个字符*/
		remindersBackupTitle: 'Резервная копия',/*不超过62个字符*/
		remindersPopularTitle: 'Популярные действия',/*不超过62个字符*/
		remindersPopularText: 'Напоминать о популярных действиях и промоакциях',
		/*5-24*/
		swicthSiteLabel:'Сайт',
		/*5-26*/
		settingTip:"Меню",
		/*7-21*/
		fbModelName: 'Модель устройства:',
		fbOsVersion: 'Версия Android:',
		
		/*7.22*/
		fbType9:"Другое",
		/*2014-9-9*/
		upload:"Загрузить",
		/*2014-9-11 ж–°з‰€еЏЌй¦€ж–‡жЎ€*/
		pleaseGory:"Категория проблемы:",
		pleaseChoose:"Пожалуйста, выберите категорию.",
		openUSB:"Открыть USB отладку:",
		pleaseSele:"Пожалуйста, выберите...",
		whatUsb:"Что такое USB отладка?",
		havaActive:"Активирован ли режим USB отладки?",
		phoneModel:"Модель телефона:",
		pleaseEnter:"Пожалуйста, укажите модель вашего телефона.",
		modelOf:"Модель телефона с проблемой",
		email: "Электронная почта:",
		enterEmail:"Пожалуйста, укажите адрес электронной почты.",
		enterValid:"Пожалуйста, укажите действительный адрес электронной почты, чтобы мы могли связаться с вами.",
		andVer:"Версия Android:",
		pleaseVer:"Пожалуйста, выберите версию Android.",
		corSystem:"Правильно указанная версия системы поможет нам точнее определить вашу проблему.",
		socialAcc:"Аккаунт соцсети:",
		selectMethod:"Выберите способ связи с вами",
		description:"Описание:",
		addAttach: "Присоединить файлы",
		noFiles:"Нет файлов",
		onlySupports:"Можно загрузить файлы размером не больше 3 Мб.",
		whyNeed:"Зачем мне нужно включать режима USB отладки?",
		debugRequired:"В системе Android режим USB отладки требуется для полноценного подключения устройства к ПК. Включенный режим USB отладки позволяет телефону и планшету быстрее подключаться к Mobogenie.",
		openfun:"Как мне включить режим USB отладки?",
		andLower:"Android 3.2 или ниже",
		selectSet:"Выберите [Настройки] в списке приложений, чтобы войти в системное меню.",
		selectApp: "Выберите [Приложения].",
		
		selectDeve:"Выберите [Для разработчиков].",
		selectTap:"Выберите [Отладка по USB] и нажмите OK.",
		andFour: "Android 4.0 и 4.1",
		selectOpt:"Выберите [Для разработчиков].",
		openOpt:"Откройте [Настройки разработчиков] наверху.",
		checkTap:"Нажмите [Отладка по USB] и нажмите OK.",
		androidFour:"Android 4.2",
		tapIcon:"Нажмите на иконку [Настройки].",
		tapPhone:"Нажмите [О телефоне].",
		scrollBot: "Прокрутите вниз до конца, найдите [Номер сборки], и нажмите несколько раз.",
		
		keepTap:"Нажимайте пока не увидите сообщение \"Теперь вы разработчик!\"",
		goback:"Вернитесь в раздел [Настроек] и найдите [Для разработчиков]!",
		enterDeve:"Войдите в раздел [Для разработчиков] и нажмите[Отладка по USB].",
		backDeve:"Вернитесь в раздел [Настройки разработчиков] и убедитесь, что [Отладка по USB] выбрана.",
		connectCom:"Подключите ваш телефон к компьютеру и откройте Mobogenie. <br/>Mobogenie установит [Помощник Mobogenie] на ваш компьютер.<br/>Нажмите OK, когда появится сообщение об установке приложения.",
		returnCon:"Вернуться и продолжить",
		fbSuccessClose: 'Продолжить просмотр магазина{0}',
		
		unableCon:"Не могу подключиться к моему телефону",
		proInstall:"Проблемы с ресурсом",
		contactsText:"Контакты и текстовые сообщения",
		slowPer:"Низкая производительность",
		unableRoot:"Не получается получить root",
		stillWhen:"MG выводит уведомления, даже когда телефон не подключен",
		suggesNew:"Предложение новой функции",
		usbOn: "USB отладка включена",
		usbOff: 'USB отладка выключена',
		fbTextarea: "Мы всегда рады вам!",
		errorFile:"неверный формат файла",
		/*2014-11-07*/
		unableCon:"Не могу подключиться к твоему смартфону через USB.",
		unableWifiCon:"Не могу подключиться к твоему смартфону через Wi-Fi.",
    };
    return dictionary;
});