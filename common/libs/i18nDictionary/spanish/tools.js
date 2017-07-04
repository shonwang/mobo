define('spanish:tools', function(require, exports, module){
    var dictionary = {
		managementTool:'Herramientas de administración',
		backup:'Respaldo',/*不超过20个字符*/
		backupIntro:'Respalde todos sus datos del dispositivo Android en la PC.',/*不超过58个字符*/
		restore:'Restaurar',/*不超过20个字符*/
		restoreIntro:'Restaure los datos a partir de un respaldo anterior.',/*不超过58个字符*/
		fileManager:'Admin. de archivos',/*不超过20个字符*/
		fileManagerIntro:'Vea archivos y carpetas en el dispositivo.',/*不超过58个字符*/
		screenshot:'Capturas de pantalla',/*不超过20个字符*/
		screenshotIntro:'Tome capturas de pantalla de su teléfono.',/*不超过58个字符*/
		deviceInfoIntro:'Vea información detallada del dispositivo.',/*不超过58个字符*/
		installApp:'Instalar archivos',/*不超过20个字符*/
		installAppIntro:'Instale lotes de archivos apk en el dispositivo.',/*不超过58个字符*/
		advancedTool:'Herramientas avanzadas',
		root:'Rootear con un clic',/*不超过20个字符*/
		rootIntro:'Rootee el dispositivo para liberar espacio en la memoria.',//*不超过58个字符*/
		importOutlook:'Importar de Outlook',/*不超过20个字符*/
		importOutlookIntro:'Importe contactos de Outlook desde el PC al dispositivo Android.',/*不超过58个字符*/
		importSymbian:'Importar datos Symbian',/*不超过20个字符*/
		importSymbianIntro:'Importe contactos de Symbian al dispositivo Android.',/*不超过58个字符*/
		freeWifi:'Wi-Fi gratuito',/*不超过20个字符*/
		freeWifiIntro:'Comparta la red del dispositivo portátil con el dispositivo vía Wi-Fi.',/*不超过58个字符*/
		
		/*device info*/
		basicInfo:'Información básica',
		modelNumber:'Número de modelo:',/*不超过19个字符*/
		androidVer:'Versión de SO de Android:',/*不超过19个字符*/
		screenResoltion:'Resolución de pantalla:',/*不超过19个字符*/
		battery:'Batería:',/*不超过19个字符*/
		cpu:'CPU:',/*不超过19个字符*/
		ram:'RAM:',/*不超过19个字符*/
		memory:'Memoria:',/*不超过19个字符*/
		sdCard:'Tarjeta SD:',/*不超过19个字符*/
		isRooted:'Rooteado:',/*不超过19个字符*/
		hardwareInfo:'Información del Hardware',/*不超过19个字符*/
		imei:'IMEI:',/*不超过19个字符*/
		serialNumber:'Número de serie:',/*不超过19个字符*/
		imsi:'IMSI:',/*不超过19个字符*/
		macAddress:'Dirección MAC:',/*不超过19个字符*/
		basebandVer:'Versión de banda base:',/*不超过19个字符*/
		kernelVer:'Versión de kernel:',/*不超过19个字符*/
		copy:'Copiar',/*不超过8个字符*/
		copySuccess:'Copiado al portapapeles',
		unknownError: 'Error desconocido',
		unKnownText:'Se ha producido un error desconocido.',
		netWorkError:'Error de red',
		netWorkErrorText:'Revise su conexión de red.',
		/*2014-09-11*/
		pcCleanerLabel:"Limpiador de PC",
		scanOver:"¡Escaneo terminado! {0} Archivos basura y archivos de registro {1} se pueden limpiar.",
		cleanBtn:"Limpio",
		lessBrowser:"Basura de internet",
		lessHistory:"Residuos",
		lessCommonUes:'Software basura',
		lessSystem:'Sistema Basura',
		lessDelete:"Papelera de reciclaje",
		lessUsuse:"Registro Basura",
		selectedLess:"seleccionado",
		conScan:"Explorar otra vez",
		cleanText:"Ayuda para limpiar basura en internet, del sistema, software no deseado y más.",
		
		cleanFinish:"Limpieza terminada!",
		someFile:"Algunos archivos e inscripciones se eliminarán después de reiniciar el ordenador.",
		cleanOver:"{0} archivos basura y {1} archivos de registro se han limpiado!",
		wifiConNot:"Esta función no está disponible con conexión Wi-Fi.",
		/*2014-11-03*/
		cleanFinished:"Terminado",
		/*2014-11-03 wifi hotpot*/
		deviceConnectingList:"Conectar a {0}",
		startingWifiTitle:"Comenzar Wi-Fi gratis...",
		hasNoWIfiTitle:"Su PC no tiene Wi-Fi.",
		iHaveWifi:"Tengo Wi-Fi.",
		wifiNameLabel:"Nombre del Wi-Fi: ",
		wifiPasswordLabel:"Contraseña del Wi-Fi: ",
		speedLabel:"Velocidad",
		devicesConnectedTitle:"{0} dispositivos están conectados.",
		closeWifiLabel:"Cerrar Wi-Fi",
		deviceBlackList:"Blacklist",
		deviceBlackList2:"Blacklist {0}",
		moveOutBlackList:"Eliminar",
		downloadSpeedLabel:"Velocidad de descarga",
		uploadSpeedLabel:"Velocidad de subida",
		limitSpeedLabel:"Límite de velocidad",
		pleaseWriteNum:"Por favor ingrese de 1 a 12 caracteres, números o guiones bajos.",
		moboWifi:"Mobogenie Wi-Fi",
		setBlackValidateNextTime:"Blacklist tendrá efecto sólo después de reiniciar Wi-Fi.",
		//2014-11-12
		pleaseWriteDeviceNameValid:"Por favor ingrese de 1 a 12 caracteres.",
		
		//2014-11-14
		haveNoWifiAdapter:"No se detectó USB ni Wi-Fi",
		solutionLabel:"Soluciones",
		solutionPluginTitle:"Conecte el adaptador Wi-Fi para permitir el servicio gratuito de Wi-Fi.",
		solutionSwitchLaptop:"Cambie a un ordenador portátil."
    };
    return dictionary;
});
