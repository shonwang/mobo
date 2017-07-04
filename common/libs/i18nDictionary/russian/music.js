define('russian:music', function(require, exports, module){
    var dictionary = {
        ImportMusic: 'Импорт музыки',/*不超过28个字符*/
        Artist:'Исполнитель',/*不超过20个字符*/
        Time:'Время',/*不超过12个字符*/
        Format:'Формат',/*不超过10个字符*/
        emptyMusicLabel:"На устройстве нет музыки.",/*不超过11个字符*/
        gotoRingtonesLabel: 'Загрузка мелодий',/*不超过35个字符*/
        
        exportSuccess:"Экспортирована музыка: {0}.",
        exportFailed:"Экспортирована музыка: {0}, ошибка экспорта {1}:",
        
        sureDelete : "Действительно удалить выбранную музыку ({0})?",
        deleteSuccess:"Успешно удалено.",
        deleteFailed:"Удалена музыка: {0}, ошибка удаления {1}:",
        //add 2014-04-02
        setringtoneSuccess:'Установлено как мелодия звонка',
        setsmsSuccess:'Установлено как мелодия уведомления',
        setalarmSuccess:'Установлено как мелодия будильника',
        setFailed:'Не удалось установить',
        //add 2014-04-16
        cancelringtone:'Мелодия звонка отменена',
        cancelsetsms:'Мелодия уведомления отменена',
        cancelsetalarm:'Мелодия будильника отменена',
        //add 2014-04-28
        formaterror:"Этот формат не поддерживается",
        //add 2014-05-14
        setasringtone:"Установить как сигнал вызова",
        setasnotification:"Установить как мелодию уведомления",
        setasalarm:"Установить как мелодию будильника",
        /*2014-5-26*/
        stop:"Остановить",
        /*2014-09-10*/
       musicnotexist:"Музыка не найдена"
    };
    return dictionary;
});
