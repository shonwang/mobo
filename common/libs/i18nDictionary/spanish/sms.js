define('spanish:sms', function(require, exports, module){
    var dictionary = {
         sendTo: 'Enviar a',
        characters: 'caracteres',
        pressCE: 'Presione Ctrl+Intro para enviar',
        writeMessage: 'Escriba aquí el mensaje.',
        send: 'Enviar',
        allGroup: 'Todos los grupos',
        selectAll: 'Seleccionar todos',
        removeAll: 'Quitar todos',
        emptyInfo:'Envíe un mensaje de texto a su amigo.',
        newMessage: 'Nuevo mensaje',
        msgSelected: '{0} Mensaje(s) seleccionado(s)',
        promptDelete: '¿Está seguro de que desea eliminar las {0} sesiones seleccionadas ({1} mensajes)?',
        importLable: "Importar",
        exportLabel: "Exportar",
        deleteLabel: "Eliminar",
        refreshLabel: "Actualizar",
        addContact: "Agregar contacto",
        editContact: "Editar contacto",
        loadMore: "Cargar más",
        /*2014-5-30*/
       	contacts: ' {0} contacto(s) seleccionado(s)',
        contactName:"Nombre del contacto o número de teléfono",

        selectedMsgLabel: "Mensajes seleccionados ({0})",
        allMsgLabel: "Todos los mensajes ({0})",

        exportSuccess:"Se exportaron exitosamente {0} mensajes.",
        exportFailed:"Se exportaron exitosamente {0} mensajes, error al exportar {1}:",
        /*2014-5-31*/
        deleteFailed:"Se borraron satisfactoriamente {0} mensajes, fallaron {1}: ",
        /*2014-6-18*/
        markasRead:"Marcar como leído",
        /*2014-07-22*/
       smsPermissionNotice:"Puede que una aplicación de seguridad haya bloqueado los permisos para SMS. Conceda permisos en [Administración de permisos]",
       emptySMS:"No hay mensajes en el dispositivo.",
    };
    return dictionary;
});
