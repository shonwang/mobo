define('russian:backupRestore', function(require, exports, module){
    var dictionary = {
        lastBackupLabel: 'Резервное копирование: ',
        basicLabel: 'Основные настройки',
        advanceLabel: 'Расширенные настройки',
        backupCompleted: 'Резервное копирование завершено',
        backupProcess: 'Выполняется резервное копирование... Не отключайте устройство.',
        viewBackup: 'Просмотр резервной копии',
        finish: 'Готово',
        backtoLabel: "Сохранить в: ",
        changeLabel: "Изменить",
        contactLabel: "Контакты",
        messageLabel: "Сообщения",
        callRegordsLabel: "Записи вызовов",
        appLabel: "Приложения",
        picLabel: "Изображения",
        musicLabel: "Музыка",
        videoLabel: "Видеоролики",

        restoreProcess: 'Выполняется восстановление... Не отключайте устройство.',
        restoreLabel: "Восстановление",
        nextLabel: "Далее",
        closeLabel : "Закрыть",
        restoreFolder: "Восстановить из пользовательской папки",
        selectLabel: "Выберите файл для восстановления: ",
        previousLabel: "Назад",
        //20140531 - add by wangzhisong
        noBackupFile: "Не найдено резервных файлов",
        //20140623
        pushBackupLabel: "Сделайте резервную копию, чтобы защитить личные данные.",
        //2014-7-25
        sureDialogText:"Чтобы предотвратить потерю данных, резервное копирование и восстановление не могут быть запущены одновременно."
    };
    return dictionary;
});