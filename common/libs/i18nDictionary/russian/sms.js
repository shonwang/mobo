define('russian:sms', function(require, exports, module){
    var dictionary = {
        sendTo: 'Кому',
        characters: 'символ(ов)',
        pressCE: 'Нажмите Ctrl+Enter для отправки',
        writeMessage: 'Введите сообщение здесь.',
        send: 'Отправить',
        allGroup: 'Вся группа',
        selectAll: 'Выбрать все',
        removeAll: 'Удалить все',
        emptyInfo:'Отправить сообщение другу.',
        newMessage: 'Новое сообщение',
        msgSelected: 'Выбрано сообщений: {0}',
        promptDelete: 'Действительно удалить выбранные сеансы ({0}) — сообщений: {1}?',
        importLable: "Импорт",
        exportLabel: "Экспорт",
        deleteLabel: "Удалить",
        refreshLabel: "Обновить",
        addContact: "Добавить контакт",
        editContact: "Редактировать контакт",
        loadMore: "Загрузить еще",
        /*2014-5-30*/
       	contacts: 'Выбрано контактов: {0}',
        contactName:"Имя контакта или номер телефона",

        selectedMsgLabel: "Выбранные сообщения ({0})",
        allMsgLabel: "Все сообщения ({0})",

        exportSuccess:"Экспортированы сообщения: {0}.",
        exportFailed:"Экспортированы сообщения: {0}, ошибка экспорта {1}:",
        /*2014-5-31*/
        deleteFailed:"Сообщений {0} успешно удалены, не удалосб удалить {1}: ",
        /*2014-6-18*/
        markasRead:"Отметить как прочитанное",
        /*2014-07-22*/
       smsPermissionNotice:"Разрешения SMS могли быть заблокированы приложением безопасности. Установите разрешения в разделе [Управление разрешениями]",
       emptySMS:"На устройстве нет сообщений.",
    };
    return dictionary;
});
