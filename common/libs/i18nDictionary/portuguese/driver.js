define('portuguese:driver', function(require, exports, module){
    var dictionary = {
		badNetworkTitle:'Conexão insatisfatória com a Internet. Verifique sua rede.',/*不超过70个字符*/
		pictureGuide: 'Guia de imagens',/*不超过26个字符*/
		videoGuide: 'Guia de vídeos',/*不超过26个字符*/
		myVersion: 'Minha versão do Android:',/*不超过26个字符*/
		debugFootText: 'Ainda não consegue abrir a Depuração de USB?',/*不超过40个字符*/
		oneClickSet: 'Configuração',/*不超过30个字符*/
		tryConnectText: 'Tente desconectar e reconectar o cabo ou reiniciar seu dispositivo.',/*不超过70个字符*/
		butBack: 'Voltar',
		ContactSupport: 'Entrar em contato com o suporte',/*不超过30个字符*/
		allowDebugText: 'Pressione "OK" quando perguntado se deseja permitir a depuração de USB.',/*不超过70个字符*/
		allowDebugTip: "<i>1</i> Marque essa opção",/*不超过50个字符*/
		allowDebugOkTip: "<i>2</i> Toque em <b>[OK]</b>",/*不超过50个字符*/
		butRetry: 'Não consegue ver essa janela pop-up?',/*不超过60个字符*/
		butShowAgain: 'Mostrar novamente',/*不超过25个字符*/
		stillNoSolove: 'Ainda não está funcionando?',
        debugTipText: 'Faça o download de {0} (12 KB) para o seu dispositivo',/*不超过50个字符*/
        debugSetterContentText: ' [Depurador de USB]',/*不超过20个字符*/
		orText: 'OU',
		noSpaceHint: 'Não há espaço de armazenamento suficiente em seu dispositivo.',/*不超过60个字符*/
		noSpaceText: 'O Mobogenie exige pelo menos {0} de espaço no disco.',/*不超过50个字符*/
		needSpaceText: '10 MB',
		upSpaceText: 'Desinstale alguns aplicativos para liberar espaço.',/*不超过60个字符*/
		butHaveSpace: 'Tenho espaço suficiente',/*不超过32个字符*/
		connectFailedTitle:'Ops. Falha na conexão.',
		connectFailedTryText: 'Tente disconectar e em seguida reconectar seu dispositivo.',/*不超过90个字符*/
		connectFailedRestart: 'Reiniciar Mobogenie.',/*不超过90个字符*/
		RestartDevice: 'Reiniciar seu PC e dispositivo.',/*不超过90个字符*/
		connectFailedText: 'Se eles não funcionarem, você pode ler nossas Perguntas frequentes ou nos informar seu problema.',/*不超过90个字符*/
		
		connectionGuide:'Guia de conexão',
		driverUsbTitle: 'Conecte seu dispositivo usando um cabo USB.',/*不超过50个字符*/
		driverUsbText: 'Após conectar seu dispositivo, você poderá fazer o download de jogos, aplicativos e muito mais gratuitamente, bem como gerenciar seu dispositivo.',
		
		AndroidLowDebugStep1: '<i>1</i> Toque em <b>[Bandeja de aplicativos]</b>',/*不超过60个字符*/
		AndroidLowDebugStep2: '<i>2</i> Toque em <b>[Configurações]</b>',/*不超过60个字符*/
		AndroidLowDebugStep3: '<i>3</i> Toque em <b>[Aplicativos]</b>',/*不超过60个字符*/
		AndroidLowDebugStep4: '<i>4</i> Toque em <b>[Desenvolvimento]</b>',/*不超过60个字符*/
		AndroidLowDebugStep5: '<i>5</i> Selecione <b>[Depuração de USB]</b>',/*不超过60个字符*/
		AndroidLowDebugStep6: '<i>6</i> Toque em <b>[OK]</b>',/*不超过60个字符*/
		AndroidHighDebugStep3: '<i>3</i> Toque em <b>[Opções do desenvolvedor]</b>',/*不超过60个字符*/
		AndroidHigherDebugStep3: '<i>3</i> Toque em <b>[Sobre o telefone]</b>',/*不超过60个字符*/
		AndroidHigherDebugStep4: '<i>4</i> Toque em <b>[Número do build]</b> várias vezes',/*不超过60个字符*/
		AndroidHigherDebugStep5: '<i>5</i> O modo de desenvolvedor será ativado',/*不超过60个字符*/
		AndroidHigherDebugStep6: '<i>6</i> Volte e toque em <b>[Opções do desenvolvedor]',/*不超过60个字符*/
		AndroidHigherDebugStep9: '<i>9</i> Selecione <b>[Sempre permitir deste computador]</b>',/*不超过60个字符*/
		
		SamsungHighDebugStep4: '<i>4</i> Selecione <b>[Opções do desenvolvedor]</b>',/*不超过60个字符*/
		SamsungHigherDebugStep3: '<i>3</i> Toque em <b>[Mais]</b>',/*不超过60个字符*/
		SamsungHigherDebugStep4: '<i>4</i> Toque em <b>[Sobre o dispositivo]</b>',/*不超过60个字符*/
		
		driver1 :'<i>3</i> Toque <b>em [Sobre]</b>',
		driver2 :'<i>4</i> Toque em <b>[Informações do software]</b>',
		driver3 :'<i>8</i>  Vá em <b>[anterior] </b> e toque em <b>[Opções do desenvolvedor]</b>',
		driver4 :'<i>9</i> Marcar <b>[Não perguntar novamente]</b>',
		driver5 :'<i>2</i> Toque em <b>[Geral]</b>',
		driver6 :'<i>10</i> Toque em <b>[Sim]</b>',
		/*2014-6-12*/
		driver7:' Verificar <b>[Não exibir novamente]</b>',
		
		/*2014-7-3*/
		usbDebugServiceText:"Você também pode entrar em contato com nosso serviço atendimento ao cliente",
		usbDebugCustomer:"Atendimento ao cliente",
		usbDebugTitle: 'Abra a depuração de USB para gerenciar seu dispositivo',
		
		/*2014wifi*/
		driverUsbConnect: 'Conexão USB ',
		deviceBeen:"{0} dispositivos foram detectados. Por favor, conecte-os. ",
		connectAnother:"Conecte outro dispositivo",
		pleaseDownMg:"Faça o download do <b>Mobogenie Helper</b> para o dispositivo. ",
		alreadyHava:"Eu já tenho um ajudante Mobogenie",
		enterPass:"2.Digite o código de verificação.",
		howtofind:"Como faço para encontrar o código de verificação?",
		pleasePhoneOk:"Por favor, aceite o pedido de conexão no seu aparelho!",
		conncetionFailed:"Falha na conexão. Por favor, verifique os seguintes itens: ",
		phoneWifiOpen:"Por favor verifique se o Wi-Fi está ligado e se o dispositivo está na mesma LAN que o PC. ",
		passwordOk:"É o código de verificação correto? ",
		connectnix:"Falha na conexão. O dispositivo recusou seu pedido de conexão ao PC!",
		
		contingDevice:"Conectando seu dispositivo...",
		updatingHelp:"Atualizando Ajuda do Mobogenie...",
		updateFailed:"Atualização do Mobogenie falhou!",
		alreadyCon:"Eu conectei meu cabo USB",
		connectBtnText:"Conectar",
		wifiScreen:"Impossível acessar capturas de tela do aparelho via Wi-Fi.",
		
		//2014-10-14
		connectNoticeTitle: 'Por favor conecte a seu dispositivo.',
		helpisOpen:"Mobogenie Helper está rodando em seu aparelho?",
		//2014-10-20
		pleaseClick:"Após instalação, abra Mobogenie Helper e toque no botão abaixo para reconectar.",
		reConnectBtn:"Re-Conectar",
		pleaseInstall:"Mobogenie Helper atualizado foi enviado. Por favor instale em seu dispositivo Android.",
		scanBlow:"Escaneie o código QR abaixo",
		downloadUsing:"Download usando a URL abaixo em seu dispositivo Android",
		openHelpDevice:"1. Abra o Mobogenie Helper em seu dispositivo Android.",
		
		/*2014-11-07修改*/
		connectFailedText:"Conecte via Wi-Fi.",
		waitLong:"Demorando muito? Conte para nós!",
		alreadyHava:"Eu não tenho o Mobogenie Helper no meu aparelho. Próximo!",
		noHavaMobo:"Eu não tenho o Mobogenie Helper no meu aparelho. Me leve de volta!",
		tryConnectWifi:"Try connecting via Wi-Fi",
		/*2014-11-14增加*/
		driverWifiConnect: 'Conexão sem Fio',
		havaOpenUsb:"Eu ativei a função USB.",
		usbConnectFailed:"Erro na conexão USB",
		checkPhoneFailed: "Um programa não está deixando seu aparelho conectar em seu PC. Por favor feche e tente novamente.",
		closeReConnect: "Feche este programa e reconecte ao {0}."
    };
    return dictionary;
});