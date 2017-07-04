define('spanish:setting', function(require, exports, module){
    var dictionary = {
    	aboutMe:'Acerca de Mobogenie',/*不超过18个字符*/
		aboutMeVersion:'Versión: {0}',/*不超过22个字符*/
		MGWebsite:'Sitio web:',/*不超过35个字符*/
		MGForums:'Foros:',/*不超过35个字符*/
		aboutMeLinkPolicy: 'Política de privacidad',/*不超过35个字符*/
		aboutMeLinkEULA: 'EULA',/*不超过35个字符*/
		aboutMeLinkTOS: 'Términos de servicio',/*不超过35个字符*/
		aboutMeFootText: '©2014 Mobogenie.com. All Rights Reserved',/*不超过70个字符*/
		feedback:'Comentarios',
        fbEmailFormatFailed: 'Correo electrónico inválido',/*不超过60个字符*/
        BtnSubmit: 'Enviar',
        fbSuccessTitle: 'Gracias por sus comentarios.',/*不超过45个字符*/
        fbSuccessText: 'Nuestro equipo de servicio al cliente le contactará a la mayor brevedad posible, así que procure revisar su bandeja de entrada.',/*不超过150个字符*/
        
       
        setting: 'Configuración',/*不超过18个字符*/
        checkForUpdates: 'Buscar actualizaciones',/*不超过18个字符*/
        whatNew: '¿Qué hay de nuevo?',/*不超过18个字符*/
        ContactUs: 'Contáctenos',/*不超过18个字符*/
        
		generalLabel: 'General',/*不超过13个字符*/
		LocationsLabel: 'Ubicaciones',/*不超过13个字符*/
		AppllicationsLabel: 'Aplicaciones',/*不超过13个字符*/
		remindersLabel: 'Recordatorios',/*不超过13个字符*/
		Language: 'Idioma',/*不超过62个字符*/
		generalStartupTitle: 'En el arranque',/*不超过62个字符*/
		generalStartupText:'Continuar automáticamente las tareas pendientes',/*不超过62个字符*/
		generalConnetTitle: 'Al conectarse un dispositivo',/*不超过62个字符*/
		generalConnetText: 'Abrir siempre Mobogenie',/*不超过62个字符*/
		generalConnetTextTwo: ' Instalar automáticamente aplicaciones descargadas',/*不超过62个字符*/
		generalCloseTitle: 'Al cerrar',/*不超过62个字符*/
		generalCloseText: ' Minimizar el cliente a la bandeja',/*不超过62个字符*/
		generalCloseTextTwo: 'Salir del cliente',/*不超过62个字符*/
		generalCloseTextThree: 'Recordarme cada vez',/*不超过62个字符*/
		generalUpdateTitle: 'Actualización del cliente',/*不超过62个字符*/
		generalUpdateText: 'Actualizar el cliente automáticamente a la versión más reciente',/*不超过62个字符*/
		locationsResource: 'Descarga de recursos',/*不超过62个字符*/
		locationsBackup: 'Ubicación de respaldo',/*不超过62个字符*/
		locationsScreen: 'Ubicación de las capturas de pantalla',/*不超过62个字符*/
		locationsBtn: 'Examinar...',/*不超过12个字符*/
		appllicationsFileTitle: 'Asociación de archivos',/*不超过62个字符*/
		appllicationsFileText: 'Verificar si los archivos .apk están asociados a Mobogenie',/*不超过62个字符*/
        appllicationsLatestTitle: 'Actualizar a las aplicaciones más recientes',
		appllicationsLatestText: 'Descargar automáticamente las aplicaciones actualizables más recientes',/*不超过62个字符*/
		appllicationsDefaultTitle: 'Ubicación predeterminada de instalación',/*不超过62个字符*/
		appllicationsDefaultText: ' Automático (si no se instala correctamente en tarjeta SD, se instalará en el dispositivo).',/*不超过62个字符*/
		appllicationsDefaultTextTwo: 'Memoria del dispositivo',/*不超过62个字符*/
		appllicationsDefaultTextThree: 'Tarjeta SD externa (solo es compatible con Android 2.2 y superior).',/*不超过62个字符*/
		remindersUpdateTitle: 'Actualizaciones de aplicaciones',/*不超过62个字符*/
		remindersUpdateText:'Recordarme actualizar las aplicaciones cada {0} días',/*不超过62个字符*/
		remindersBackupText:'Recordarme realizar una copia de seguridad del dispositivo cada {0} días',/*不超过62个字符*/
		remindersUpdateTextTwo: 'No volver a recordarme',/*不超过62个字符*/
		remindersBackupTitle: 'Respaldo',/*不超过62个字符*/
		remindersPopularTitle: 'Actividades populares',/*不超过62个字符*/
		remindersPopularText: 'Recordarme si existen actividades populares o promociones disponibles',
		/*5-24*/
		swicthSiteLabel:'Sitio',
		/*5-26*/
		settingTip:"Menú",
		/*7-21*/
		fbModelName: 'Modelo dispositivo',
		fbOsVersion: 'Versión de Android',
		
		/*7.22*/
		fbType9:"Otros",
		/*2014-9-9*/
		upload:"Subir",
		/*2014-9-11 新版反馈文案*/
		pleaseGory:"Problema Categoría:",
		pleaseChoose:"Por favor cambie de categoría.",
		openUSB:"Abra Depuración USB:",
		pleaseSele:"Por favor seleccione...",
		whatUsb:"¿Qué es Depuración USB?",
		havaActive:"¿Tengo actividado Depuración USB?",
		phoneModel:"Modelo del teléfono:",
		pleaseEnter:"Por favor introduzca el modelo de su teléfono.",
		modelOf:" El modelo de teléfono tiene un problema ",
		email: "Email:",
		enterEmail:"Por favor introduzca su email.",
		enterValid:" Por favor, introduzca una dirección de email válida para ayudarlo a servirle mejor",
		andVer:"Versión Android:",
		pleaseVer:"Por favor cambie la version Android.",
		corSystem:" Una versión correcta del sistema nos ayudará a identificar con precisión su problema.",
		socialAcc:"Cuenta de Social:",
		selectMethod:" Seleccione un método por el cual podemos comunicarnos con usted",
		description:"Descripción:",
		addAttach: "Agregar Archivo Adjunto",
		noFiles:"No existen archivos",
		onlySupports:" Sólo es compatible con archivos de menos de 3MB.",
		whyNeed:"¿Por qué necesito activar la función de depuración USB?",
		debugRequired:"Se requiere la depuración USB para que el sistema Android conecte correctamente a su PC. Activar Depuración USB permite que el teléfono o la tableta se conecte a Mobogenie más rápido.",
		openfun:"¿Cómo se abre la función de depuración USB?",
		andLower:"Android 3.2 o menor",
		selectSet:"Seleccione [Configuración] en la lista de aplicaciones para entrar en el menú del sistema.",
		selectApp: "Seleccione [Aplicaciones].",
		
		selectDeve:"Seleccione [Desarrollo].",
		selectTap:"Seleccione [Depuración USB] y de OK.",
		andFour: "Android 4.0 y 4.1",
		selectOpt:"Seleccione [Opciones de desarrollador].",
		openOpt:"Abra [Opciones de desarrollador]  en la parte superior.",
		checkTap:"Compruebe [Depuración USB] y elija OK.",
		androidFour:"Android 4.2",
		tapIcon:"Escoja [Configuración] ícono.",
		tapPhone:"Toque [Acerca del Teléfono].",
		scrollBot: "Desplácese hasta la parte inferior de la pantalla, encuentre [Número de compilación], y pulse varias veces.",
		
		keepTap:"Siga tocando hasta que aparezca el mensaje \"Ahora eres un desarrollador!\"",
		goback:" Volver a la pantalla [Ajustes] página para ver [Opciones Desarrollador]!",
		enterDeve:"Ingrese [Opciones de Desarrollador] y pulse  [Depuración USB].",
		backDeve:" Regrese a [Opciones de desarrollador] y asegúrese de que [Depuración USB] esté marcada.",
		connectCom:" Conecte el teléfono al ordenador y abra Mobogenie. <br/>Mobogenie instalará [Mobogenie Helper] en su computadora.<br/>Pulse OK cuando las notificaciones de instalación pop-up.",
		returnCon:" Retorno y Continuar",
		fbSuccessClose: 'Continúe navegando por la tienda {0}',
		
		unableCon:"No se puede conectar a mi teléfono",
		proInstall:"Problemas con los recursos",
		contactsText:"Contactos y mensajes de texto",
		slowPer:"rendimiento lento",
		unableRoot:"Incapaz de raíz",
		stillWhen:"MG todavía aparece cuando conecto mi dispositivo ",
		suggesNew:"Sugerencias para nuevas funciones",
		usbOn: "Depuración USB encendido",
		usbOff: ' Depuración USB apagado',
		fbTextarea: "Siempre estamos dispuestos a escuchar",
		errorFile:"formato de archivo incorrecto ",
		/*2014-11-07*/
		unableCon:"No se puede conectar a su teléfono a través de USB.",
		unableWifiCon:"No se puede conectar a su teléfono a través de Wi-Fi.",
    };
    return dictionary;
});
