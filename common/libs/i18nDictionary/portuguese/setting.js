define('portuguese:setting', function(require, exports, module){
    var dictionary = {
    	aboutMe:'Sobre o Mobogenie',/*不超过18个字符*/
		aboutMeVersion:'Versão: {0}',/*不超过22个字符*/
		MGWebsite:'Site:',/*不超过35个字符*/
		MGForums:'Fóruns:',/*不超过35个字符*/
		aboutMeLinkPolicy: 'Política de privacidade',/*不超过35个字符*/
		aboutMeLinkEULA: 'EULA',/*不超过35个字符*/
		aboutMeLinkTOS: 'Termos de serviço',/*不超过35个字符*/
		aboutMeFootText: '©2014 Mobogenie.com. All Rights Reserved',/*不超过70个字符*/
		feedback:'Feedback',
        fbEmailFormatFailed: 'E-mail inválido',/*不超过60个字符*/
        BtnSubmit: 'Enviar',
        fbSuccessTitle: 'Obrigado por seus comentários.',/*不超过45个字符*/
        fbSuccessText: 'Nossa equipe de atendimento ao cliente entrará em contato com você o mais rápido possível, portanto, certifique-se de verificar sua caixa de entrada.',/*不超过150个字符*/
        
       
        setting: 'Configurações',/*不超过18个字符*/
        checkForUpdates: 'Verificar se há atualizações',/*不超过18个字符*/
        whatNew: 'Quais são as novidades?',/*不超过18个字符*/
        ContactUs: 'Contato',/*不超过18个字符*/
        
		generalLabel: 'Geral',/*不超过13个字符*/
		LocationsLabel: 'Locais',/*不超过13个字符*/
		AppllicationsLabel: 'Aplicativos',/*不超过13个字符*/
		remindersLabel: 'Lembretes',/*不超过13个字符*/
		Language: 'Idioma',/*不超过62个字符*/
		generalStartupTitle: 'Na inicialização',/*不超过62个字符*/
		generalStartupText:'Continuar tarefas não concluídas automaticamente',/*不超过62个字符*/
		generalConnetTitle: 'Conexão no dispositivo',/*不超过62个字符*/
		generalConnetText: 'Sempre abrir o Mobogenie',/*不超过62个字符*/
		generalConnetTextTwo: ' Instalar aplicativos baixados automaticamente',/*不超过62个字符*/
		generalCloseTitle: 'Ao fechar',/*不超过62个字符*/
		generalCloseText: ' Minimizar cliente para a bandeja',/*不超过62个字符*/
		generalCloseTextTwo: 'Sair do cliente',/*不超过62个字符*/
		generalCloseTextThree: 'Lembre-me a cada',/*不超过62个字符*/
		generalUpdateTitle: 'Atualização do cliente',/*不超过62个字符*/
		generalUpdateText: 'Atualização automática do cliente para a última versão',/*不超过62个字符*/
		locationsResource: 'Downloads de recursos',/*不超过62个字符*/
		locationsBackup: 'Fazer backup de local',/*不超过62个字符*/
		locationsScreen: 'Local das capturas de tela',/*不超过62个字符*/
		locationsBtn: 'Procurar...',/*不超过12个字符*/
		appllicationsFileTitle: 'Associação de arquivo',/*不超过62个字符*/
		appllicationsFileText: 'Verifique se os arquivos .apk estão associados ao Mobogenie',/*不超过62个字符*/
        appllicationsLatestTitle: 'Atualizar automaticamente últimos aplicativos',
		appllicationsLatestText: 'Fazer download dos últimos aplicativos atualizáveis automaticamente',/*不超过62个字符*/
		appllicationsDefaultTitle: 'Local de instalação padrão',/*不超过62个字符*/
		appllicationsDefaultText: ' Automático (se não for possível instalar no cartão SD, será instalado no dispositivo.)',/*不超过62个字符*/
		appllicationsDefaultTextTwo: 'Memória do dispositivo',/*不超过62个字符*/
		appllicationsDefaultTextThree: 'Cartão SD externo (somente suporta Android 2.2 e superior.)',/*不超过62个字符*/
		remindersUpdateTitle: 'Atualizações do aplicativo',/*不超过62个字符*/
		remindersUpdateText:'Lembre-me de atualizar os aplicativos a cada {0} dias',/*不超过62个字符*/
		remindersBackupText:'Lembre-me de fazer backup do meu dispositivo a cada {0} dias',/*不超过62个字符*/
		remindersUpdateTextTwo: 'Nunca me lembre',/*不超过62个字符*/
		remindersBackupTitle: 'Backup',/*不超过62个字符*/
		remindersPopularTitle: 'Atividades populares',/*不超过62个字符*/
		remindersPopularText: 'Lembre-me quando atividades ou promoções populares estiverem disponíveis',
		/*5-24*/
		swicthSiteLabel:'Site',
		/*5-26*/
		settingTip:"Menu",
		/*7-21*/
		fbType9:"Outro",
		fbTextarea: "Descreva seu problema:",
		fbTypePrompt1:"Descreva seu problema. Por exemplo, \"não sei como ativar a depuração via USB\".",
		fbTypePrompt2:"Como ativo a depuração via USB? Se for esse o caso, diga-nos seu modelo de telefone e versão do Android. Tentaremos o máximo para resolver seu problema.",
		fbType9:"Outro",
		/*2014-9-9*/
		upload:"Upload",
		/*2014-9-11 新版反馈文案*/
		pleaseGory:"Problema na Categoria:",
		pleaseChoose:"Por favor escolha uma categoria.",
		openUSB:"Abrir USB Debugging:",
		pleaseSele:"Por favor selecione...",
		whatUsb:"O que é USB Debugging?",
		havaActive:"Você já ativou o USB Debugging?",
		phoneModel:"Modelo do celular:",
		pleaseEnter:"Por favor, entre com seu modelo de celular.",
		modelOf:"O modelo do celular com problema",
		email: "E-mail:",
		enterEmail:"Por favor entre com seu endereço de e-mail.",
		enterValid:"Por favor, entre com um endereço de e-mail válido para nos ajudar a atendê-lo melhor",
		andVer:"Versão do Android:",
		pleaseVer:"Por favor escolha a versão do seu Android.",
		corSystem:"Uma versão de sistema correta nos ajudará a identificar seu problema de forma acurada.",
		socialAcc:"Conta Social:",
		selectMethod:"Seleciione um método pelo qual poderemos contatar você",
		description:"Descrição:",
		addAttach: "Adicionar Anexos",
		noFiles:"Sem arquivos",
		onlySupports:"Apenas suporta arquivos menores que 3 MB.",
		whyNeed:"Por que eu preciso ativar a função USB Debugging?",
		debugRequired:"USB Debugging é requerida para o sistema Android conectar-se completamente em seu PC. Ativar o USB Debugging permite que seu celular ou tablet conecte ao Mobogenie mais rapidamente.",
		openfun:"Como eu abro a função USB Debugging?",
		andLower:"Android 3.2 ou inferior",
		selectSet:"Selecione [Configurações] na lista de app para entrar no menu do sistema.",
		selectApp: "Selecione [Apps].",
		
		selectDeve:"Selecione [Desenvolvimento].",
		selectTap:"Selecione [USB Debugging] e toque em OK.",
		andFour: "Android 4.0 e 4.1",
		selectOpt:"Selecione [Opções de Desenvolvedor].",
		openOpt:"Abrir [Opções de Desenvolvedor]  no topo.",
		checkTap:"Checar [USB Debugging] e tocar em OK.",
		androidFour:"Android 4.2",
		tapIcon:"Toque no ícone [Configurações].",
		tapPhone:"Toque [Sobre o Celular].",
		scrollBot: "Vá até a parte inferior da tela, encontre [Número de Fabricação] e toque nele várias vezes.",
		
		keepTap:"Continue tocando até ver a mensagem \"Você agora é um desenvolvedor!\"",
		goback:"Volte para a página [Configurações] para visualizar [Opções de Desenvolvedor]!",
		enterDeve:"Entrar em [Opções de Desenvolvedor] e toque em [USB Debugging].",
		backDeve:"Volte em [Opções de Desenvolvedor] e tenha certeza que [USB Debugging] está checado.",
		connectCom:"Conecte seu celular ao computador e abra o Mobogenie. <br/> Mobogenie irá instalar [Mobogenie Helper] para o seu computador. <br/> Toque em OK quando as notificações de instalação aparecerem.",
		returnCon:"Retornar e Continuar",
		fbSuccessClose: 'Continuar a surfar nas lojas{0}',
		
		unableCon:"Impossível conectar ao meu dispositivo",
		proInstall:"Problemas com recursos",
		contactsText:"Contatos e mensagens de texto",
		slowPer:"Performance lenta",
		unableRoot:"Impossível de fazer o Root",
		stillWhen:"MG ainda aparece quando não há dispositivo conectado",
		suggesNew:"Sugestões para novas funções",
		usbOn: "USB Debugging Ligado",
		usbOff: 'USB Debugging Desligado',
		fbTextarea: "Nós sempre nos alegramos em ouvi-lo!",
		errorFile:"Formato de arquivo incorreto",
		/*2014-11-07*/
		unableCon:"Impossível conectar seu aparelho via USB.",
		unableWifiCon:"Impossível conectar seu aparelho via Wi-Fi.",
		
    };
    return dictionary;
});