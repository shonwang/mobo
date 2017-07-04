define('russian:image', function(require, exports, module){
    var dictionary = {
    	importPicture: 'Импорт изображения',/*不超过28个字符*/
    	gallery: 'Галерея',/*不超过24个字符*/
    	wallpapers: 'Обои',/*不超过24个字符*/
    	others:'Другое',/*不超过24个字符*/
    	date:'Дата',
        sureDeleteText : "Действительно удалить выбранные изображения ({0})?",
        deleteSuccessText: 'Успешно удалено',
        deleteFailed:"Удалены изображения: {0}, ошибка удаления {1}:",
        setWallpaper: 'Установить как обои',
        
        exportSuccess:"Экспортированы изображения: {0}.",
        exportFailed:"Экспортированы изображения: {0}, ошибка экспорта {1}:",
        setWallpaperSuccess: 'Установлено как обои',
        setWallpaperFailed: 'Не удалось установить обои',
        /*201405-27*/
        rotateLeftText:"Повернуть влево",
        rotateRightText:"Повернуть вправо",
        noImagesText:"На Вашем устройстве нет изображений.",
        downloadImage:"Загрузить обои",
        
        /*2014-07-16*/
        previewLabel:"Просмотр"
    };
    return dictionary;
});