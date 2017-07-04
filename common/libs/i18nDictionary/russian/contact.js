define('russian:contact', function(require, exports, module){
    var dictionary = {
        sideLabel: 'Контакты',
        message: 'Сообщения',
        music: 'Моя музыка',
        photo: 'Мои фотографии',
        video: 'Мои видео',
        backup: 'Резервная копия и восстановление',
        ChangeIcon:'Измен.',
        MessageRecord:'Запись сообщения',
        Note:'Примечан.',
        Save:'Сохранить',
        Edit:'Редактировать',
        Cancel:'Отмена',
        inputhere:'введите здесь',
        ContactSelected:'Выбрано контактов <span class="contacts-count selectedNum f18">{0}</span>:',
        SendMessage:'Отправить сообщение',
        Filter:'Фильтр',
        AllContacts:'Все контакты',
        AllGroups:'Все группы',
        NewContact:'Новый контакт',
        ContactInfomation:'Информация о контакте',
        //add 2014-03-24
        sureDeleteTitle:'Действительно удалить выбранные контакты ({0})?',
        deleteFailed:"Ошибка удаления.",
        
        importingTitle:'Выполняется импорт, не отключайте телефон',
        importHeader:"Импорт контактов",
        
        exportSuccess:"Экспортированы контакты: {0}.",
        exportFailed:"Ошибка экспорта.",
        
        addContactText:'Добавление контактов, поиск в телефонной книге и отправка сообщений.',
        newContact: 'Новый контакт',
        writeMessage:'Введите сообщение здесь...',
        Mobile: 'Мобильный',
        //add 2014-04-09
        deletingTitle:'Выполняется удаление, не отключайте телефон',
        //2014-5-26
        addTipText:"Добавить",
        accountLabel:"Учетная запись: ",
        emptyContact:"В телефоне нет контактов",
        //2014-05-29
        deleteTipText:"Удалить",
        smsTipText:"SMS",
        
        importFailed:"Импорт {0} контактов успешно завершен,не удалось импортировать {1}",
        exportHeader:"Экспорт контакта (ов)",
        exportAll:"Все контакты <em class='c-9'>({0})</em>",
        exportSelect:"Выбранные контакты <em class='c-9'>({0})</em>",
        //2014-06-03
        editgroup:"Редактировать группу",
        notassigened:"Не зарегистрировано",
        saveFailed:'Не удалось сохранить контакт Повторите попытку позже.',
        //2014-06-11
        fileError:'Сбой. Недопустимый файл vcf',
        groupText:'Группа',
        
        /*2014-07-22*/
       contactPermissionNotice:"Разрешения контактов могли быть заблокированы приложением безопасности. Установите разрешения в разделе [Управление разрешениями]",
       //2014-08-18 保存分组失败
       saveGroupFailed:'Не удалось сохранить группу. Попробуйте позже.'
    };
    return dictionary;
});
