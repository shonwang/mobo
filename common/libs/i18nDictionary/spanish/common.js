define('spanish:common', function(require, exports, module){
    var dictionary = {
        connectingText: 'Conectando',/*不超过16个字符*/
        
        homeLabel: 'Inicio',/*不超过14个字符*/
        appLabel: 'Aplicaciones',/*不超过14个字符*/
        gamesLabel: 'Juegos',/*不超过14个字符*/
        ringtonesLabel: 'Tonos de llamada',/*不超过14个字符*/
        wallPaperLabel: 'Wallpaper',/*不超过14个字符*/
        youTubeLabel: 'YouTube',/*不超过14个字符*/
        moreLabel: 'Más',/*不超过14个字符*/
        toolsLabel: 'Herramientas',/*不超过14个字符*/
        safetyLabel: 'Seguridad',/*不超过14个字符*/
        contactLabel: 'Mis Contactos',/*不超过14个字符*/
        smsLabel: 'Mis Mensajes',/*不超过14个字符*/
        myAppLabel: 'Mis Apps',/*不超过14个字符*/
        myMusicLabel: 'Mi Música',/*不超过14个字符*/
        myPictureLabel: 'Mis Imágenes',/*不超过14个字符*/
        myVideoLabel: 'Mis Videos',/*不超过14个字符*/
        Import:'Importar',/*不超过16个字符*/
        Export:'Exportar',/*不超过16个字符*/
        Delete:'Eliminar',
        Refresh:'Actualizar',
        updateAllLabel: 'Actualizar',/*不超过16个字符*/
        updateLabel: 'Actualizar',/*不超过12个字符*/
        uninstallLabel: 'Desinstalar',/*不超过16个字符*/
        deviceText: 'Dispositivo',/*不超过12个字符*/
        phoneText: 'Teléfono',
        memoryText: 'Memoria',/*不超过12个字符*/
        installLabel: 'Instalar',/*不超过12个字符*/
        sizeLabel: 'Tamaño',
        nameLabel: 'Nombre',
        locationLabel: 'Ubicación',
        actionLabel: 'Acción',
        selectAllLabel: 'Seleccionar todos',/*不超过30个字符*/
        downloadAllLabel: 'Descargar todos',/*不超过24个字符*/
        downloadingText: 'Descargando',/*不超过24个字符*/
        redownloadText: 'Volver a descargar',
        downloadLabel: "Descargar",
        
        successText: 'Correctamente',
        installedInText: 'Instalado en {0}',/*不超过45个字符*/
        ImportingText: 'Importando',/*不超过55个字符*/
        setWallpaperFailed: 'Error al establecer wallpaper',
        importedInText: 'Importado en {0}',/*不超过45个字符*/
        retryText: 'Reintentar',/*不超过15个字符*/
        pauseText: 'Pausar',/*不超过15个字符*/
        continueText: 'Continuar',/*不超过15个字符*/
        inProcessingTaskText: 'En proceso',
        completedText: 'Completado',
        noTaskText: 'No hay tareas',/*不超过18个字符*/
        
        captureLabel: 'Capturar',/*不超过24个字符*/
        featureText: 'Imprescindibles',/*不超过24个字符*/
        countTasksText: '{0} tareas',/*不超过15个字符*/
        
        updateTipText: 'Ya tiene la versión más reciente para {0} aplicaciones.',/*不超过65个字符*/
        rootTipText: 'Su dispositivo móvil no está rooteado. Al rootearlo podrá instalar cualquier aplicación que desee.',
        oneClickRootLabel: 'Rootear con un clic',
        shareMobogenieText: 'Comparte Mobogenie en',/*不超过65个字符*/
        
        tipLabel: 'Consejo',
        confirmLabel:'Sí',
        okLabel : 'OK',
        yesLabel : 'Sí',
        cancelLabel:'No',
        closeLabel : 'Cerrar',
        failedLabel : 'error',
        exportSuccess:'Éxito en la exportación',
        
        headSignIn:'Ingresar',/*不超过11个字符*/
        /*connectAnother : 'Conectar otro dispositivo',*/
        deviceInfo: 'Acerca del dispositivo',/*不超过22个字符*/
        email:'Correo electrónico',
        /*add 2014-03-28*/
        promptInvaildPath:'Ruta inválida.',
	   
	    connectDeviceVia:'Simplemente conecte el teléfono para instalar aplicaciones, juegos, videos y todo tipo de contenidos gratuitos de Android, y ábrale la puerta a un revolucionario servicio de administración de dispositivos móviles.',
        connectNow:'Conectar ahora',
		
		downloadingDriver:'Descargando controlador para el dispositivo {0}',/*不超过50个字符*/
		installingDriverText:'Instalando controlador para el dispositivo',/*不超过50个字符*/
		installingMG:'Instalando Mobogenie en el dispositivo',/*不超过50个字符*/
		connectedYourDeviceText: 'Conectado',/*不超过50个字符*/
		disconnectYourDeviceText: 'Desconectado',/*不超过50个字符*/

        searchResultText: 'Buscar <span class="c-red">{0}</span>, se encontraron <span class="c-red">{1}</span> resultado(s) ',
        searchSeeAllLink: 'Ver todo',
        openLabel: 'Abrir carpeta',
        
        Exporting:"Exportación en curso. Mantenga el dispositivo conectado.",
        Deleting:"Eliminación en curso. Mantenga el dispositivo conectado.",

        deviceMemoryLabel: "Memoria del dispositivo",
        sdCardLabel: "Tarjeta SD 1",
        sdCardTwoLabel: "Tarjeta SD 2",
        total: "Total: ",/*不超过20个字符*/
        available: "Disponible: ",/*不超过20个字符*/
        manage: "Administrar",
        
        installedText: 'Instaladas',/*不超过15个字符*/
        updateAppText: 'Actualizar',/*不超过12个字符*/
        installingAppText: 'Instalando',/*不超过55个字符*/
        installText: 'Instalar',/*不超过15个字符*/

        /*2014-05-13*/
       searchHolderMyApp:"Aplicaciones y juegos locales",
       searchHolderWallpaper:"Wallpaper",
       searchHolderRingtone:"Tono de llamada",
       searchHolderAppGames:"Aplicaciones/Juegos",
       noSdState:"No hay una tarjeta SD en el dispositivo.",
       /*2014-5-26*/
       minTipText:"Minimizar",
       maxTipText:"Maximizar",
       exitTipText:"Salir",
       returnTipText:"Atrás",
       retreatTipText:"Adelante",
       /*2014-5-27*/
       noLabel : 'No',
       menuOpenLabel:"Abrir",
       //20140604
       bestPicksLabel: 'Más seleccionados',
       actionFailed:'Falló la acción',
       /*2014-06-09*/
      searchHolderYoutube:'URL de YouTube o Palabras claves',
      screenshotSave:"La foto instantánea se guardó en: ",
      screenshotText:"Foto instantánea",
      screenshotCheckPathTip: "Siempre usar esta ruta para guardar fotos instantáneas",
      /*2014-06-10*/
      alwaysOpenClient:'Siempre abrir Mobogenie al conectar el dispositivo.',
      changeOpenClient:'Puede cambiar esto en Configuración en cualquier momento.',
      /*2014-06-18*/
      screenBlackTipText: "Por favor, encienda la pantalla del dispositivo móvil",
      /*2014-06-30*/
     ebookLabel:"Libros",
     myEbookLabel:"Mis libros",
      /*2014-6-30修改*/
      connectDeviceText:'Conectando. Mantenga el dispositivo conectado.',
      openManageDevice:"Se detectó un dispositivo. Abra Mobogenie para administrar su dispositivo y descargar contenido gratuito.",
      /*2014-07-18*/
     searchHolderEBook:"Libros",
          /*2014-09-25*/
    rememberMarkLabel:"Recordar las configuraciones"
    };
    return dictionary;
});
