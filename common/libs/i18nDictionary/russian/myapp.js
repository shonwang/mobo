define('russian:myapp', function(require, exports, module){
    var dictionary = {
        installAppsLabel: 'Установить приложения',/*不超过18个字符*/
        moveToSdCardLabel: 'Переместить на SD-карту',/*不超过30个字符*/
        tabAppLabel: 'Приложения',/*不超过24个字符*/
        tabUpdatesLabel: 'Обновления',/*不超过24个字符*/
        tabSystemLabel: 'Система',/*不超过24个字符*/
        moveLabel: 'Переместить',
        
        appCurrentVersionLabel: 'Текущая версия:',/*不超过22个字符*/
        appLatestVersionLabel: 'Последняя версия:',/*不超过22个字符*/
        appLocationLabel: 'Место:',/*不超过20个字符*/
        appSizeColonLabel: 'Размер:',/*不超过22个字符*/
        ratingColonLabel: 'Рейтинг:',
        
        likeColonLabel: 'Вам может понравиться...',/*不超过45个字符*/
        downloadsText: 'Загрузок: {0}',
        updatingText: 'Идет обновление',/*不超过45个字符*/
        uninstallingText: 'Удаление',/*不超过12个字符*/
        installingText: 'Установка',
        sureUninstallTip: 'Действительно удалить выбранные приложения ({0})?',
        uninstalling: 'Выполняется удаление. Не отключайте устройство.',
        uninstallSuccessText: 'Успешно',
        uninsatllFailed:"Удалены приложения: {0}, ошибка удаления {1}:",
        
        exportSuccess:"Экспортированы приложения: {0}.",
        exportFailed:"Экспортированы приложения: {0}, ошибка экспорта {1}:",
        
        systemMaskText: 'Управлять системными приложениями можно после получения прав администратора.',
        systemMaskCtn: 'Очистка системных приложений освободит 156,3?МБ памяти.',
        searchResultTitle:'найдено приложений: {0}',
        /*2014-5-26*/
        deviceTipText : "Память устройства",
        sdCardTipText : "SD-карта",
        //06-03
        noapptext:'На Вашем устройстве нет приложений.',
        noupdatetext:'На Вашем устройстве нет обновлений приложений.',
        /*2014-6-18*/
        noappBtnText:'Загрузка приложений',
        //08-13
        moving: 'Происходит перенос. Не отключайте своё устройство',
        moveFailed:"Перенесено {0} приложений, не удалось перенести {1}:",

        //08-19
        moveConfirm:"Приложения могут не работать после перемещения на SD-карту. Вы уверены что хотите продолжить?",
        //2014-10-14
        wifiUninstallTitle:"Пожалуйста, завершите процесс удаления на вашем телефоне."
    }
    return dictionary;
});