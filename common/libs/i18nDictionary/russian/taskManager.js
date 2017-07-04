define('russian:task', function(require, exports, module){
    var dictionary = {
        setingAsWallpaper: 'Установить как обои...',
        setingAsRingtone: 'Установить как мелодию звонка...',
        setRingtoneSuccess: 'Установлена мелодия звонка',
        setRingtoneFailed: 'Не удалось установить мелодию звонка',
        
        insuficientSpace: 'Сбой установки. Недостаточно места',
        noSdCard: 'Сбой установки. Отсутствует SD-карта',
        noSuchSourceFile: 'Сбой установки. Файл отсутствует',
        inValidApkFile: 'Сбой установки. Сбой.<br/>Недопустимы файл АРК',
        unknowSourceSetting: 'Сбой установки. Включите "Неизвестные источники" в разделе Настройки > Приложения',
        installPhoneMemory: 'Установите в память устройства',
        unknownError: 'Неизвестная ошибка',
        networkErrorText: 'Ошибка сети',
        
        waitingText: 'Ожидание',/*不超过56个字符*/
        pausedText: 'Пауза',/*不超过24个字符*/
        installUnknownError: 'Сбой установки. Неизвестная ошибка',
        downloadUnknownError: 'Сбой загрузки. Неизвестная ошибка',
        
        adbConnectionError: 'Подключите устройство для установки',
        
        importFileNotExistedText: 'Сбой импорта. Файл не существует',
        importTransferErrorText: 'Сбой импорта. Ошибка передачи файлов',
        importInsufficientSpace: 'Сбой импорта. Недостаточно места',
        importUnknownError: 'Сбой импорта. Неизвестная ошибка',
        importUnConnectError: 'Подключите устройство для импорта',
        importFailedNoSdCard: 'Сбой импорта. Отсутствует SD-карта',
        installSdkOlderError: 'Несовместимо с вашим устройством',
        installMismatchedCertificateError: 'Несоответствие сертификатов APK. Удалите существующее приложение перед установкой',
        
        transferringText: 'Выполняется передача',/*不超过55个字符*/
        settedText: 'Установлено в {0}',
        importViaConnectText: 'Подключите устройство для импорта',
        
        installFailedText: 'Сбой установки',
        
        openFolder:'Открыть папку загрузок',
        
        downloadInText: 'Загружено в {0}',
        reinstallText: 'Переустановить',/*不超过15个字符*/
        noTaskText: 'Задачи отсутствуют.',
        /*6-04*/
        unknowSource2Setting: "Сбой установки. Включите \"Неизвестные источники\" в разделе Настройки > Безопасность",
        
        unzipAppText:"Извлечение файла данных",
        transferDataFile:"Передача файла данных",
        unzipAppFailedText:"Сбой извлечения файла данных",
        transferAppFailedText:"Сбой передачи файла данных",
        /*7-28*/
        hideTaskTip:"Скрыть",
        /*2014-09-25*/
        showInstallPopLabel:"Install",
        /*2014-10-14*/
        installOnDeviceText: 'Пожалуйста, завершите установку на вашем устройстве.',
         /*2014-10-16*/
        pleaseTapInstall:"Пожалуйста, кликните \"Установить\" на вашем устройстве.",
        /*2014-11-10*/
        installSdCard: "Установить в память телефона",
        onlyInstallSdCard: "Это приложение может быть установлено только в память вашего телефона.",
        
        /*2015-1-7yangtian*/
        insufficeient:"Недостаточно места на диске"
    };
    return dictionary;
});