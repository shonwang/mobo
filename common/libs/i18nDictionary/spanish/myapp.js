define('spanish:myapp', function(require, exports, module){
    var dictionary = {
        installAppsLabel: 'Instalar aplicaciones',/*不超过18个字符*/
        moveToSdCardLabel: 'Mover a tarjeta SD',/*不超过30个字符*/
        tabAppLabel: 'Aplicaciones',/*不超过24个字符*/
        tabUpdatesLabel: 'Actualizaciones',/*不超过24个字符*/
        tabSystemLabel: 'Sistema',/*不超过24个字符*/
        moveLabel: 'Mover',
        
        appCurrentVersionLabel: 'Versión actual:',/*不超过22个字符*/
        appLatestVersionLabel: 'Versión más reciente:',/*不超过22个字符*/
        appLocationLabel: 'Ubicación:',/*不超过20个字符*/
        appSizeColonLabel: 'Tamaño:',/*不超过22个字符*/
        ratingColonLabel: 'Calificación:',
        
        likeColonLabel: 'Es posible que también le guste...',/*不超过45个字符*/
        downloadsText: '{0} descargas',
        updatingText: 'Actualizando',/*不超过45个字符*/
        uninstallingText: 'Desinstalando',/*不超过12个字符*/
        installingText: 'Instalando',
        sureUninstallTip: '¿Está seguro que desea desinstalar {0} aplicación(es) seleccionada(s)?',
        uninstalling: 'Desinstalación en curso. Mantenga el dispositivo conectado.',
        uninstallSuccessText: 'Correctamente',
        uninsatllFailed:"Éxito al desinstalar {0} aplicaciones, error al desinstalar {1}:",
        
        exportSuccess:"{0} aplicaciones se exportaron correctamente.",
        exportFailed:"Éxito al exportar {0} aplicaciones, error al exportar {1}:",
        
        systemMaskText: 'Puede administrar las aplicaciones del sistema después de rootear el dispositivo.',
        systemMaskCtn: 'Eliminar las aplicaciones del sistema liberará 156.3 MB de espacio.',
        searchResultTitle:'encontramos {0} aplicación(es)',
        /*2014-5-26*/
        deviceTipText : "Memoria del dispositivo",
        sdCardTipText : "Tarjeta SD",
        //06-03
        noapptext:'No hay aplicaciones en el dispositivo.',
        noupdatetext:'No hay aplicaciones actualizables en el dispositivo.',
        /*2014-6-18*/
        noappBtnText:'Descargar aplicaciones',
        //08-13
        moving: 'Movimiento en proceso. Mantenga el dispositivo conectado.',
        moveFailed:"Se movieron {0} aplicaciones correctamente; error al mover {1}:",
        //08-19
        moveConfirm:"Algunas aplicaciones podrían no funcionar si las trasladas a la tarjeta SD. ¿Quieres continuar?",
        //2014-10-14
        wifiUninstallTitle:"Por favor, complete la desinstalación en su teléfono."
    }
    return dictionary;
});
