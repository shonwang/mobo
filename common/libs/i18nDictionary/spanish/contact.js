define('spanish:contact', function(require, exports, module){
    var dictionary = {
        sideLabel: 'Contactos',
        message: 'Mensajes',
        music: 'Mi Música',
        photo: 'Mis Fotos',
        video: 'Mis Videos',
        backup: 'Copia de seguridad y restauración',
        ChangeIcon:'Cambiar',
        MessageRecord:'Registro de mensajes',
        Note:'Nota',
        Save:'Guardar',
        Edit:'Editar',
        Cancel:'Cancelar',
        inputhere:'Escribir aquí',
        ContactSelected:'<span class="contacts-count selectedNum f18">{0}</span> Contactos seleccionados',
        SendMessage:'Enviar mensaje',
        Filter:'Filtro',
        AllContacts:'Todos los contactos',
        AllGroups:'Todos los grupos',
        NewContact:'Nuevo contacto',
        ContactInfomation:'Información del contacto',
        //add 2014-03-24
        sureDeleteTitle:'¿Está seguro que desea eliminar los {0} contactos seleccionados?',
        deleteFailed:"Error al eliminar.",
        
        importingTitle:'Importación en curso, mantenga el teléfono conectado',
        importHeader:"Importar contacto(s)",
        
        exportSuccess:"Se exportaron exitosamente {0} contactos.",
        exportFailed:"Error al exportar.",
        
        addContactText:'Agregue contactos, busque en agenda telefónica y envíe mensajes de texto.',
        newContact: 'Nuevo contacto',
        writeMessage:'Escriba aquí su mensaje...',
        Mobile: 'Móvil',
        //add 2014-04-09
        deletingTitle:'Eliminación en curso, mantenga el teléfono conectado',
        //2014-5-26
        addTipText:"Agregar",
        accountLabel:"Cuenta: ",
        emptyContact:"Señor usuario, no tiene contactos en su teléfono.",
        //2014-05-29
        deleteTipText:"Eliminar",
        smsTipText:"SMS",
        
        importSuccess:"Imported {0} contacts successful.",
        importFailed:"Se importaron satisfactoriamente {0} contactos, fallaron {1}",
        exportHeader:"Exportar contacto(s)",
        exportAll:"Todos <em class='c-9'>({0})</em>",
        exportSelect:"Seleccionados <em class='c-9'>({0})</em>",
        //2014-06-03
        editgroup:"Editar grupo",
        notassigened:"No asignados",
        saveFailed:'Falló guardar el contacto. Vuelva a intentarlo.',
        //2014-06-11
        fileError:'Error. Archivo vcf inválido',
        groupText:'Grupo',
        
        /*2014-07-22*/
       contactPermissionNotice:"Puede que una aplicación de seguridad haya bloqueado los permisos para Contactos. Conceda permisos en [Administración de permisos]",
       //2014-08-18 保存分组失败
         saveGroupFailed:'Error al guardar grupo. Vuelva a intentarlo.'
    };
    return dictionary;
});
