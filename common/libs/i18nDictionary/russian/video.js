define('russian:video', function(require, exports, module){
    var dictionary = {
        importVideo: 'Импорт видеофайлов',/*不超过28个字符*/
        exportSuccess:"Экспортированы видеофайлы: {0}.",
        exportFailed:"Экспортированы видеофайлы: {0}, ошибка экспорта {1}:",
        promptDelete: 'Действительно удалить выбранные видеофайлы ({0})?',
        deleteFailed:"Удалены видеофайлы: {0}, ошибка удаления {1}:",
        promptPlayTitle: 'Подготовка воспроизведения видео',
        promptPlay: 'Загрузка...',
        emptyVideoLabel: 'На устройстве нет видеофайлов.',
        gotoYouTubeLabel: 'Загрузка видеороликов',
        promptInvaildPath: 'Недопустимый путь.',
        playLabel: 'Воспроизвести',
        promptImportTips: "Android поддерж. только форматы .avi, .3gp, .mp4, and .mp4v. Видеофайлы, импортир. в другом формате, могут быть нераспознаны системой.",
        promptFullDisk:"Não há espaço suficiente no disco C. Libere algum espaço antes de tocar o vídeo.",
    };
    return dictionary;
});