define('spanish:task', function(require, exports, module){
    var dictionary = {
        setingAsWallpaper: 'Estableciendo como wallpaper...',
        setingAsRingtone: 'Estableciendo como tono de llamada...',
        setRingtoneSuccess: 'Tono de llamada establecido con éxito',
        setRingtoneFailed: 'Error al establecer tono de llamada',
        
        insuficientSpace: 'Error de instalación. Espacio insuficiente',
        noSdCard: 'Error de instalación. No hay tarjeta SD',
        noSuchSourceFile: 'Error de instalación. No existe el archivo',
        inValidApkFile: 'Error de instalación. Archivo apk no válido',
        unknowSourceSetting: 'Error de instalación. Verifique "Fuentes desconocidas" en Configuración > Aplicaciones',
        installPhoneMemory: 'Instalar en la memoria',
        unknownError: 'Error desconocido',
        networkErrorText: 'Error de red',
        
        waitingText: 'En espera',/*不超过56个字符*/
        pausedText: 'En pausa',/*不超过24个字符*/
        installUnknownError: 'Error de instalación. Error desconocido',
        downloadUnknownError: 'Falló la descarga. Error desconocido',
        
        adbConnectionError: 'Conecte el dispositivo para instalar',
        
        importFileNotExistedText: 'Error en la importación. El archivo no existe',
        importTransferErrorText: 'Error en la importación. Error de trasferencia del archivo',
        importInsufficientSpace: 'Error en la importación. Espacio insuficiente',
        importUnknownError: 'Error en la importación. Error desconocido',
        importUnConnectError: 'Conecte el dispositivo para importar',
        importFailedNoSdCard: 'Error en la importación. No hay tarjeta SD',
        installSdkOlderError: 'No es compatible con el dispositivo',
        installMismatchedCertificateError: 'El certificado APK no coincide. Desinstale la aplicación actual antes de instalar',
        
        transferringText: 'Transfiriendo',/*不超过55个字符*/
        settedText: 'Establecido en {0}',
        importViaConnectText: 'Conecte el dispositivo para importar',
        
        installFailedText: 'Error de instalación',
        
        openFolder:'Abrir carpeta de descargas',
        
        downloadInText: 'Descargado en {0}',
        reinstallText: 'Reinstalar',/*不超过15个字符*/
        noTaskText: 'No hay tareas.',
        /*6-04*/
        unknowSource2Setting: "Falló la instalación. Verifique \"Fuentes desconocidas\" en Configuración > Seguridad",
       
        unzipAppText:"Extrayendo archivo de datos",
        transferDataFile:"Transfiriendo archivo de datos",
        unzipAppFailedText:"Falló extraer el archivo de datos",
        transferAppFailedText:"Falló transferir el archivo de datos",
        /*7-28*/
        hideTaskTip:"Ocultar",
        /*2014-09-25*/
        showInstallPopLabel:"Install",
        /*2014-10-14*/
        installOnDeviceText: 'Por favor complete la instalación en su dispositivo.',
         /*2014-10-16*/
        pleaseTapInstall:"Por favor  haga clic en \"Instalar\" en su dispositivo.",
        /*2014-11-10*/
        installSdCard: "Instalar en RAM",
        onlyInstallSdCard: "Esta aplicación sólo se puede instalar en la memoria RAM del dispositivo.",
        
        /*2015-1-7yangtian*/
        insufficeient:"Poco espacio en disco"
    };
    return dictionary;
});
