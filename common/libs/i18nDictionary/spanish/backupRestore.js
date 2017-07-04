define('spanish:backupRestore', function(require, exports, module){
    var dictionary = {
         lastBackupLabel: 'Última copia de seguridad: ',
        basicLabel: 'Básico',
        advanceLabel: 'Avanzada',
        backupCompleted: 'Copia de seguridad terminada',
        backupProcess: 'Copia de seguridad en curso... Mantenga el dispositivo conectado.',
        viewBackup: 'Ver copia de seguridad',
        finish: 'Terminar',
        backtoLabel: "Respaldar en: ",
        changeLabel: "Cambiar",
        contactLabel: "Contactos",
        messageLabel: "Mensajes",
        callRegordsLabel: "Registro de llamadas",
        appLabel: "Aplicaciones",
        picLabel: "Imágenes",
        musicLabel: "Música",
        videoLabel: "Videos",

        restoreProcess: 'Restauración en curso... Mantenga el dispositivo conectado.',
        restoreLabel: "Restaurar",
        nextLabel: "Siguiente",
        closeLabel : "Cerrar",
        restoreFolder: "Restaurar desde una carpeta personalizada",
        selectLabel: "Seleccione un archivo para restaurar: ",
        previousLabel: "Anterior",
        //20140531 - add by wangzhisong
        noBackupFile: "No existen archivos de respaldo.",
        //20140623
        pushBackupLabel: "Respalde su dispositivo ahora para asegurar su información personal.",
        //2014-7-25
        sureDialogText:"Para evitar pérdida de datos, no pueden utilizarse simultáneamente las funciones de respaldo y restauración."
    };
    return dictionary;
});