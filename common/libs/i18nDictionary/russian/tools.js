define('russian:tools', function(require, exports, module){
    var dictionary = {
		managementTool:'Инструменты управления',
		backup:'Резервная копия',/*不超过20个字符*/
		backupIntro:'Сохраните резервную копию файлов Android на компьютере.',/*不超过58个字符*/
		restore:'Восстановление',/*不超过20个字符*/
		restoreIntro:'Восстановите данные из предыдущей резервной копии.',/*不超过58个字符*/
		fileManager:'Диспетчер файлов',/*不超过20个字符*/
		fileManagerIntro:'Просмотр файлов и папок на устройстве.',/*不超过58个字符*/
		screenshot:'Снимки экрана',/*不超过20个字符*/
		screenshotIntro:'Делайте снимки экрана мобильного устройства.',/*不超过58个字符*/
		deviceInfoIntro:'Просматривайте подробные сведения об устройстве.',/*不超过58个字符*/
		installApp:'Установка прил./игр',/*不超过20个字符*/
		installAppIntro:'Пакетная установка файлов apk на устройство.',/*不超过58个字符*/
		advancedTool:'Расширенные инструменты',
		root:'Root одним нажатием',/*不超过20个字符*/
		rootIntro:'Получите права Root, чтобы освободить память устройства.',//*不超过58个字符*/
		importOutlook:'Импорт из Outlook',/*不超过20个字符*/
		importOutlookIntro:'Импорт контактов Outlook с ПК на устройство Android.',/*不超过58个字符*/
		importSymbian:'Импорт из Symbian',/*不超过20个字符*/
		importSymbianIntro:'Импорт контактов Symbian на устройство Android.',/*不超过58个字符*/
		freeWifi:'Бесплатный Wi-Fi',/*不超过20个字符*/
		freeWifiIntro:'Подключайтесь с устройства к сети ноутбука по Wi-Fi.',/*不超过58个字符*/
		
		/*device info*/
		basicInfo:'Основная информация',
		modelNumber:'Номер модели:',/*不超过19个字符*/
		androidVer:'Версия ОС Android:',/*不超过19个字符*/
		screenResoltion:'Разрешение экрана:',/*不超过19个字符*/
		battery:'Аккумулятор:',/*不超过19个字符*/
		cpu:'Процессор:',/*不超过19个字符*/
		ram:'Оперативная память:',/*不超过19个字符*/
		memory:'Память:',/*不超过19个字符*/
		sdCard:'SD-карта:',/*不超过19个字符*/
		isRooted:'Есть права Root:',/*不超过19个字符*/
		hardwareInfo:'Оборудование',/*不超过19个字符*/
		imei:'IMEI:',/*不超过19个字符*/
		serialNumber:'Серийный номер:',/*不超过19个字符*/
		imsi:'IMSI:',/*不超过19个字符*/
		macAddress:'MAC-адрес:',/*不超过19个字符*/
		basebandVer:'Версия Baseband:',/*不超过19个字符*/
		kernelVer:'Версия Kernel:',/*不超过19个字符*/
		copy:'копир.',/*不超过8个字符*/
		copySuccess:'Скопировано в буфер обмена',
		unknownError: 'Неизвестная ошибка',
		unKnownText:'Произошла неизвестная ошибка.',
		netWorkError:'Ошибка сети',
		netWorkErrorText:'Проверьте подключение к сети.',
		/*2014-09-11*/
		pcCleanerLabel:"ПК очистка",
		scanOver:"Сканирование завершено! {0} мусорных файлов и {1} файлов регистра возможно очистить",
		cleanBtn:"Очистить",
		lessBrowser:"Интернет мусор",
		lessHistory:"Мусор",
		lessCommonUes:'Мусор программ',
		lessSystem:'Мусор системы',
		lessDelete:"Корзина",
		lessUsuse:"Мусор регистра",
		selectedLess:"выбрано",
		conScan:"Сканировать еще раз",
		cleanText:"Помогает чистить мусор из интернета, приложений, системы и многое другое!",
		
		cleanFinish:"Очистка завершена!",
		someFile:"Некоторые файлы и записи в реестре будут удалены после перезагрузки вашего компьютера.",
		cleanOver:"{0} ненужных файлов и {1} файлов регистра было очищено!",
		wifiConNot:"Эта функция не доступна с включенным Wi-Fi.",
		
		/*2014-11-03*/
		cleanFinished:"Завершено",
		/*2014-11-03 wifi hotpot*/
		deviceConnectingList:"Подключен к {0}",
		startingWifiTitle:"Запускаем бесплатный Wi-Fi...",
		hasNoWIfiTitle:"У вашего ПК нет Wi-Fi.",
		iHaveWifi:"У меня есть Wi-Fi.",
		wifiNameLabel:"Имя Wi-Fi сети: ",
		wifiPasswordLabel:"Пароль Wi-Fi сети: ",
		speedLabel:"Скорость",
		devicesConnectedTitle:"{0} устройств подключено.",
		closeWifiLabel:"Закрыть Wi-Fi",
		deviceBlackList:"Черный список",
		deviceBlackList2:"В черном списке {0}",
		moveOutBlackList:"Удалить",
		downloadSpeedLabel:"Скорость скачивания",
		uploadSpeedLabel:"Скорость загрузки",
		limitSpeedLabel:"Ограничение скорости",
		pleaseWriteNum:"Пожалуйста, введите 1-12 букв, цифр или символов подчеркивания.",
		moboWifi:"Мободжини Wi-Fi",
		setBlackValidateNextTime:"Черный список будет активирован только после перезагрузки бесплатного Wi-Fi.",
			//2014-11-12
		pleaseWriteDeviceNameValid:"Пожалуйста используйте 1-12 символов.",
		
		//2014-11-14
		haveNoWifiAdapter:"Не обнаружено USB или Wi-Fi адаптера",
		solutionLabel:"Решения",
		solutionPluginTitle:"Подключите Wi-Fi адаптер, чтобы запустить бесплатное Wi-Fi обслуживание.",
		solutionSwitchLaptop:"Переключиться на ноутбук."
    };
    return dictionary;
});