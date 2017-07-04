define('portuguese:tools', function(require, exports, module){
    var dictionary = {
		managementTool:'Ferramentas de gerenciamento',
		backup:'Backup',/*不超过20个字符*/
		backupIntro:'Faça backup no PC de seus dados do Android.',/*不超过58个字符*/
		restore:'Restaurar',/*不超过20个字符*/
		restoreIntro:'Restaure dados de um backup anterior.',/*不超过58个字符*/
		fileManager:'Gerenc. de arquivos',/*不超过20个字符*/
		fileManagerIntro:'Visualize arquivos e pastas em seu dispositivo.',/*不超过58个字符*/
		screenshot:'Capturas de tela',/*不超过20个字符*/
		screenshotIntro:'Faça capturas da tela do seu celular.',/*不超过58个字符*/
		deviceInfoIntro:'Visualize informações detalhadas do seu dispositivo.',/*不超过58个字符*/
		installApp:'Instalar jogo/app',/*不超过20个字符*/
		installAppIntro:'Instalar arquivos apk em lote para o seu dispositivo.',/*不超过58个字符*/
		advancedTool:'Ferramentas avançadas',
		root:'Consolid. 1 clique',/*不超过20个字符*/
		rootIntro:'Consolide seu dispositivo para liberar mais memória.',//*不超过58个字符*/
		importOutlook:'Importar do Outlook',/*不超过20个字符*/
		importOutlookIntro:'Importar contatos do Outlook do PC para o Android.',/*不超过58个字符*/
		importSymbian:'Importar do Symbian',/*不超过20个字符*/
		importSymbianIntro:'Importar contatos do Symbian para seu dispositivo Android.',/*不超过58个字符*/
		freeWifi:'Liberar Wi-Fi',/*不超过20个字符*/
		freeWifiIntro:'Compartilhar rede do laptop com o dispositivo via Wi-Fi.',/*不超过58个字符*/
		
		/*device info*/
		basicInfo:'Informações básicas',
		modelNumber:'Número do modelo:',/*不超过19个字符*/
		androidVer:'Versão SO Android:',/*不超过19个字符*/
		screenResoltion:'Resolução da tela:',/*不超过19个字符*/
		battery:'Bateria:',/*不超过19个字符*/
		cpu:'CPU:',/*不超过19个字符*/
		ram:'RAM:',/*不超过19个字符*/
		memory:'Memória:',/*不超过19个字符*/
		sdCard:'Cartão SD:',/*不超过19个字符*/
		isRooted:'Consolidado:',/*不超过19个字符*/
		hardwareInfo:'Info. de hardware',/*不超过19个字符*/
		imei:'IMEI:',/*不超过19个字符*/
		serialNumber:'Número de série:',/*不超过19个字符*/
		imsi:'IMSI:',/*不超过19个字符*/
		macAddress:'Endereço MAC:',/*不超过19个字符*/
		basebandVer:'Versão banda base:',/*不超过19个字符*/
		kernelVer:'Versão Kernel:',/*不超过19个字符*/
		copy:'Copiar',/*不超过8个字符*/
		copySuccess:'Copiado para a área de transferência',
		unknownError: 'Erro desconhecido',
		unKnownText:'Ocorreu um erro desconhecido.',
		netWorkError:'Erro de rede',
		netWorkErrorText:'Verifique sua conexão com a rede.',
		/*2014-09-11*/
		pcCleanerLabel:"PC Cleaner",
		scanOver:"Scan completo! {0} arquivos inúteis a {1} arquivos de registro podem ser limpos.",
		cleanBtn:"Limpar",
		lessBrowser:"Arquivos inúteis de Internet",
		lessHistory:"Resíduos",
		lessCommonUes:'Arquivos inúteis de Software',
		lessSystem:'Arquivos inúteis de Sistema',
		lessDelete:"Lixeira",
		lessUsuse:"Arquivos inúteis de Registro",
		selectedLess:"selecionados",
		conScan:"Digitalizar novamente",
		cleanText:"Ajuda a limpar Arquivos inúteis de internet, sistema, software, e muito mais!",
		
		cleanFinish:"Limpeza concluída!",
		someFile:"Alguns arquivos e entradas de registro serão deletadas após reiniciar o computador.",
		cleanOver:"{0} Arquivos inúteis e {1} arquivos de registro foram limpos!",
		wifiConNot:"Esta função não está disponível com Wi-Fi.",
		
		/*2014-11-03*/
			cleanFinished:"Finalizado",
		/*2014-11-03 wifi hotpot*/
		deviceConnectingList:"Conectado ao {0}",
		startingWifiTitle:"Iniciando Wi-Fi gratuito...",
		hasNoWIfiTitle:"Seu PC não possui Wi-Fi.",
		iHaveWifi:"Não tenho Wi-Fi.",
		wifiNameLabel:"Nome Wi-Fi: ",
		wifiPasswordLabel:"Senha Wi-Fi: ",
		speedLabel:"Velocidade",
		devicesConnectedTitle:"{0} dispositivos estão conectados.",
		closeWifiLabel:"Fechar Wi-Fi",
		deviceBlackList:"Lista negra",
		deviceBlackList2:"Lista negra {0}",
		moveOutBlackList:"Remover",
		downloadSpeedLabel:"Velocidade do Download",
		uploadSpeedLabel:"Velocidade do Upload",
		limitSpeedLabel:"Limimte de Velocidade",
		pleaseWriteNum:"Por favor entre com 1-12 letras, números ou símbolos.",
		moboWifi:"Mobogenie Wi-Fi",
		setBlackValidateNextTime:"Lista negra terá efeito apenas depois que você restaurar o Wi-Fi gratuito.",
		//2014-11-12
		pleaseWriteDeviceNameValid:"Por favor entre com 1-12 caracteres.",
		
		//2014-11-14
		haveNoWifiAdapter:"Sem adaptador USB Wi-Fi detectado",
		solutionLabel:"Soluções",
		solutionPluginTitle:"Plug no adaptador Wi-Fi para habiitar o serviço Wi-Fi.",
		solutionSwitchLaptop:"Mude para laptop."
    };
    return dictionary;
});