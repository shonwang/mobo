define('spanish:driver', function(require, exports, module){
    var dictionary = {
		badNetworkTitle:'Error en la conexión a Internet. Revise su red.',/*不超过70个字符*/
		pictureGuide: 'Guía de imagen',/*不超过26个字符*/
		videoGuide: 'Guía de video',/*不超过26个字符*/
		myVersion: 'Mi versión de Android:',/*不超过26个字符*/
		debugFootText: '¿Aún no puede iniciar la depuración USB?',/*不超过40个字符*/
		oneClickSet: 'Configuración con un clic',/*不超过30个字符*/
		tryConnectText: 'Intente desconectar y volver a conectar el cable o reiniciar el dispositivo.',/*不超过70个字符*/
		butBack: 'Atrás',
		ContactSupport: 'Contacte a Soporte',/*不超过30个字符*/
		allowDebugText: 'Presione "OK" cuando se le pregunte si desea permitir la depuración USB.',/*不超过70个字符*/
		allowDebugTip: "<i>1</i> Marque esta opción",/*不超过50个字符*/
		allowDebugOkTip: "<i>2</i> Toque <b>[OK]</b>",/*不超过50个字符*/
		butRetry: '¿No puede ver este mensaje emergente?',/*不超过60个字符*/
		butShowAgain: 'Mostrar de nuevo',/*不超过25个字符*/
		stillNoSolove: '¿Aún no funciona?',
        debugTipText: 'Descargue {0} (12KB) al dispositivo',/*不超过50个字符*/
        debugSetterContentText: ' [Depurador USB]',/*不超过20个字符*/
		orText: 'O',
		noSpaceHint: 'No hay suficiente espacio en el dispositivo.',/*不超过60个字符*/
		noSpaceText: 'Mobogenie requiere al menos {0} de espacio en el disco.',/*不超过50个字符*/
		needSpaceText: '10 MB',
		upSpaceText: 'Desinstale algunas aplicaciones para liberar espacio.',/*不超过60个字符*/
		butHaveSpace: 'Tengo suficiente espacio',/*不超过32个字符*/
		connectFailedTitle:'¡Ups! Error de conexión.',
		connectFailedTryText: 'Intente desconectar y reconectar el dispositivo.',/*不超过90个字符*/
		connectFailedRestart: 'Reinicie Mobogenie.',/*不超过90个字符*/
		RestartDevice: 'Reinicie la PC y el dispositivo.',/*不超过90个字符*/
		connectFailedText: 'Si estos pasos no funcionan, puede leer las Preguntas Frecuentes o contarnos acerca de su problema.',/*不超过90个字符*/
		
		connectionGuide:'Guía de conexión',
		driverUsbTitle: 'Conecte su dispositivo mediante un cable USB.',/*不超过50个字符*/
		driverUsbText: 'Después de conectar el dispositivo, será capaz de descargar juegos, aplicaciones y mucho más de forma gratuita, así como administrar el dispositivo.',
		
		AndroidLowDebugStep1: '<i>1</i> Toque <b>[Cajón de aplicaciones]</b>',/*不超过60个字符*/
		AndroidLowDebugStep2: '<i>2</i> Toque <b>[Configuración]</b>',/*不超过60个字符*/
		AndroidLowDebugStep3: '<i>3</i> Toque <b>[Aplicaciones]</b>',/*不超过60个字符*/
		AndroidLowDebugStep4: '<i>4</i> Toque <b>[Desarrollo]</b>',/*不超过60个字符*/
		AndroidLowDebugStep5: '<i>5</i> Marque <b>[Depuración USB]</b>',/*不超过60个字符*/
		AndroidLowDebugStep6: '<i>6</i> Toque <b>[OK]</b>',/*不超过60个字符*/
		AndroidHighDebugStep3: '<i>3</i> Toque <b>[Opciones de desarrollador]</b>',/*不超过60个字符*/
		AndroidHigherDebugStep3: '<i>3</i> Toque <b>[Acerca del teléfono]</b>',/*不超过60个字符*/
		AndroidHigherDebugStep4: '<i>4</i> Toque <b>[Número de versión]</b> en varias ocasiones',/*不超过60个字符*/
		AndroidHigherDebugStep5: '<i>5</i> Se activará el modo de desarrollador',/*不超过60个字符*/
		AndroidHigherDebugStep6: '<i>6</i> Vuelva y toque <b>[Opciones de desarrollador]</b>',/*不超过60个字符*/
		AndroidHigherDebugStep9: '<i>9</i> Marque <b>[Permitir siempre desde este computador]</b>',/*不超过60个字符*/
		
		SamsungHighDebugStep4: '<i>4</i> Marque <b>[Opciones de desarrollador]</b>',/*不超过60个字符*/
		SamsungHigherDebugStep3: '<i>3</i> Toque <b>[Más]</b>',/*不超过60个字符*/
		SamsungHigherDebugStep4: '<i>4</i> Toque <b>[Acerca del dispositivo]</b>',/*不超过60个字符*/
		
		driver1 :'<i>3</i> Toque <b>[Acerca]</b>',
		driver2 :'<i>4</i> Toque <b>[Info. del software]</b>',
		driver3 :'<i>8</i> <b>[vuelva] </b>y toque <b>[Opciones de desarrollador]</b>',
		driver4 :'<i>9</i> Presione <b>[No vuelva a preguntarme]</b>',
		driver5 :'<i>2</i> Toque <b>[General]</b>',
		driver6 :'<i>10</i> Toque <b>[Sí]</b>',
		/*2014-6-12*/
		driver7:' Presione <b>[No mostrar de nuevo]</b>',
		
		/*2014-7-3*/
		usbDebugServiceText:"También puede llamar a nuestro servicio local de atención al cliente para conseguir ayuda",
		usbDebugCustomer:"Servicio de atención al cliente",
		usbDebugTitle: 'Abra la depuración USB para administrar su teléfono.',
		
		/*2014wifi*/
		driverUsbConnect: 'Conexión USB',
		deviceBeen:"{0} dispositivos se han detectado. Por favor conecte.",
		connectAnother:"Conecte otro dispositivo.",
		pleaseDownMg:"Por favor, descargue <b>Mobogenie Helper</b> en su dispositivo.",
		alreadyHava:"Ya tengo Mobogenie Helper",
		enterPass:"2.Ingrese el código de verificación.",
		howtofind:"¿Cómo puedo encontrar el código de verificación?",
		pleasePhoneOk:"Por favor, acepta la solicitud de conexión a su dispositivo.",
		conncetionFailed:"La conexión ha fallado. Por favor, consulte los siguientes artículos:",
		phoneWifiOpen:"Por favor, compruebe si Wi-Fi está encendido y si el dispositivo está en la misma LAN que el PC.",
		passwordOk:"¿Es el código de verificación correcta?",
		connectnix:"La conexión ha fallado. El dispositivo negó su solicitud de conexión a la PC.",
		
		contingDevice:"Conectando su dispositivo...",
		updatingHelp:"Actualizando el asistente Mobogenie...",
		updateFailed:"La actualización de Mobogenie falló!",
		alreadyCon:"He conectado el cable de USB.",
		connectBtnText:"Conectar",
		wifiScreen:"No se puede capturar la pantalla del teléfono a través de Wi-Fi.",
		
		//2014-10-14
		connectNoticeTitle: 'Por favor,conecte a su dispositivo.',
		helpisOpen:"¿Mobogenie ayudante ejecuta en su teléfono?",
		//2014-10-20
		pleaseClick:"Una vez instalado, abra Mobogenie Helper y haga clic en el botón de abajo para reconectar.",
		reConnectBtn:"Reconectar",
		pleaseInstall:"Mobogenie Helper ha enviado la actualización. Por favor, instale en su dispositivo Android.",
		scanBlow:"Escanee el siguiente código QR",
		downloadUsing:"Descargue en su dispositivo Android, usando la URL de abajo ",
		openHelpDevice:"1. Abra Mobogenie Helper en su dispositivo Android.",
		
		/*2014-11-07修改*/
		connectFailedText:"Conectar vía Wi-Fi.",
		waitLong:"¿Está tomando demasiado tiempo? ¡Cuéntanos!",
		alreadyHava:"Tengo Mobogenie Helper en mi teléfono. Siguiente!",
		noHavaMobo:"No tengo Mobogenie Helper en mi teléfono. ¡Llévame de vuelta!",
		tryConnectWifi:"Try connecting via Wi-Fi",
		/*2014-11-14增加*/
		driverWifiConnect: 'Wireless Connection',
		havaOpenUsb:"Ha activado la función USB.",
		usbConnectFailed:"Error de conexión del USB",
		checkPhoneFailed: "Un programa está impidiendo que el teléfono se conecte a su PC. Por favor, ciérrelo y vuelva a intentarlo.",
		closeReConnect: "Cierre este programa y vuelva a conectarse a {0}."
    };
    return dictionary;
});
