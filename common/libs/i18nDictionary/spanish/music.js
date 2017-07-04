define('spanish:music', function(require, exports, module){
    var dictionary = {
        ImportMusic: 'Importar música',/*不超过28个字符*/
        Artist:'Artista',/*不超过20个字符*/
        Time:'Duración',/*不超过12个字符*/
        Format:'Formato',/*不超过10个字符*/
        emptyMusicLabel:"No hay música en el dispositivo.",/*不超过11个字符*/
        gotoRingtonesLabel: 'Descargue tonos de llamada',/*不超过35个字符*/
        
        exportSuccess:"{0} canciones exportadas correctamente.",
        exportFailed:"Éxito al exportar {0} canciones, error al exportar {1}:",
        
        sureDelete : "¿Está seguro de que desea eliminar {0} canciones seleccionadas?",
        deleteSuccess:"Eliminación exitosa.",
        deleteFailed:"Éxito al eliminar {0} canciones, error al eliminar {1}:",
        //add 2014-04-02
        setringtoneSuccess:'Éxito al establecer como tono de llamada',
        setsmsSuccess:'Éxito al establecer como notificación',
        setalarmSuccess:'Éxito al establecer como alarma',
        setFailed:'Error al establecer',
        //add 2014-04-16
        cancelringtone:'Éxito al cancelar tono de llamada',
        cancelsetsms:'Éxito al cancelar notificación',
        cancelsetalarm:'Éxito al cancelar alarma',
        //add 2014-04-28
        formaterror:"Este formato no es compatible",
        //add 2014-05-14
        setasringtone:"Establecer como tono de llamada",
        setasnotification:"Establecer como notificación",
        setasalarm:"Establecer como alarma",
        /*2014-5-26*/
        stop:"Detener",
        /*2014-09-10*/
        musicnotexist:"Múica no existe"
    };
    return dictionary;
});
