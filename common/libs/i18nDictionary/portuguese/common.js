define('portuguese:common', function(require, exports, module){
    var dictionary = {
        connectingText: 'Conectando',/*不超过16个字符*/
        
        homeLabel: 'Início',/*不超过14个字符*/
        appLabel: 'Aplicativos',/*不超过14个字符*/
        gamesLabel: 'Jogos',/*不超过14个字符*/
        ringtonesLabel: 'Toques',/*不超过14个字符*/
        wallPaperLabel: 'Papéis de parede',/*不超过14个字符*/
        youTubeLabel: 'YouTube',/*不超过14个字符*/
        moreLabel: 'Mais',/*不超过14个字符*/
        toolsLabel: 'Kits de ferramentas',/*不超过14个字符*/
        safetyLabel: 'Segurança',/*不超过14个字符*/
        contactLabel: 'Meus contatos',/*不超过14个字符*/
        smsLabel: 'Minhas mensagens',/*不超过14个字符*/
        myAppLabel: 'Meus aplicativos',/*不超过14个字符*/
        myMusicLabel: 'Minha música',/*不超过14个字符*/
        myPictureLabel: 'Minhas imagens',/*不超过14个字符*/
        myVideoLabel: 'Meus vídeos',/*不超过14个字符*/
        Import:'Importar',/*不超过16个字符*/
        Export:'Exportar',/*不超过16个字符*/
        Delete:'Excluir',
        Refresh:'Atualizar',
        updateAllLabel: 'Atualizar tudo',/*不超过16个字符*/
        updateLabel: 'Atualizar',/*不超过12个字符*/
        uninstallLabel: 'Desinstalar',/*不超过16个字符*/
        deviceText: 'Dispositivo',/*不超过12个字符*/
        phoneText: 'Telefone',
        memoryText: 'Memória',/*不超过12个字符*/
        installLabel: 'Instalar',/*不超过12个字符*/
        sizeLabel: 'Tamanho',
        nameLabel: 'Nome',
        locationLabel: 'Local',
        actionLabel: 'Ação',
        selectAllLabel: 'Selecionar tudo',/*不超过30个字符*/
        downloadAllLabel: 'Baixar tudo',/*不超过24个字符*/
        downloadingText: 'Baixando',/*不超过24个字符*/
        redownloadText: 'Refazer o download',
        downloadLabel: "Download",
        
        successText: 'Êxito',
        installedInText: 'Instalado em {0}',/*不超过45个字符*/
        ImportingText: 'Importando',/*不超过55个字符*/
        setWallpaperFailed: 'Falha ao definir papel de parede',
        importedInText: 'Importado em {0}',/*不超过45个字符*/
        
        retryText: 'Tentar novamente',/*不超过15个字符*/
        pauseText: 'Pausa',/*不超过15个字符*/
        continueText: 'Continuar',/*不超过15个字符*/
        inProcessingTaskText: 'Em andamento',
        completedText: 'Concluído',
        noTaskText: 'Nenhuma tarefa em andamento',/*不超过18个字符*/
        
        captureLabel: 'Capturar',/*不超过24个字符*/
        featureText: 'Itens obrigatórios',/*不超过24个字符*/
        countTasksText: '{0} tarefa(s)',/*不超过15个字符*/
        
        updateTipText: 'Você já tem a versão mais recente dos {0} aplicativos.',/*不超过65个字符*/
        rootTipText: 'Seu dispositivo móvel não foi consolidado. A consolidação permitirá que você instale qualquer aplicativo que desejar.',
        oneClickRootLabel: 'Consolid. 1 clique',
        shareMobogenieText: 'Compartilhar Mobogenie em',/*不超过65个字符*/
        
        tipLabel: 'Dica',
        confirmLabel:'Sim',
        okLabel : 'OK',
        yesLabel : 'Sim',
        cancelLabel:'Cancelar',
        closeLabel : 'Fechar',
        failedLabel : 'falhou',
        exportSuccess:'Exportação bem-sucedida',
        
        headSignIn:'Entrar',/*不超过11个字符*/
        /*connectAnother : 'Conectar com outro dispositivo',*/
        deviceInfo: 'Sobre o dispositivo',/*不超过22个字符*/
        email:'E-mail',
        /*add 2014-03-28*/
        promptInvaildPath:'Caminho inválido.',
	   
	    connectDeviceVia:'Simplesmente conecte seu telefone para instalar aplicativos, jogos, vídeos e todo tipo de conteúdo Android gratuito, e abra as portas para um revolucionário serviço de gerenciamento móvel.',
        connectNow:'Conectar agora',
		
		downloadingDriver:'Fazendo download do driver para o seu dispositivo {0}',/*不超过50个字符*/
		installingDriverText:'Instalando o driver para o seu dispositivo',/*不超过50个字符*/
		installingMG:'Instalando o Mobogenie para o seu dispositivo',/*不超过50个字符*/
		connectedYourDeviceText: 'Conectado',/*不超过50个字符*/
		disconnectYourDeviceText: 'Desconectado',/*不超过50个字符*/

        searchResultText: 'Pesquisa por <span class="c-red">{0}</span>, <span class="c-red">{1}</span> resultado(s) encontrado(s) ',
        searchSeeAllLink: 'Ver todos',
        openLabel: 'Abrir pasta',
        
        Exporting:"Exportação em andamento. Mantenha seu dispositivo conectado.",
        Deleting:"Exclusão em andamento. Mantenha seu dispositivo conectado.",

        deviceMemoryLabel: "Memória do dispositivo",
        sdCardLabel: "Cartão SD 1",
        sdCardTwoLabel: "Cartão SD 2",
        total: "Total: ",/*不超过20个字符*/
        available: "Disponível: ",/*不超过20个字符*/
        manage: "Gerenciar",
        
        installedText: 'Instalado',/*不超过15个字符*/
        updateAppText: 'Atualizar',/*不超过12个字符*/
        installingAppText: 'Instalando',/*不超过55个字符*/
        installText: 'Instalar',/*不超过15个字符*/

        /*2014-05-13*/
       searchHolderMyApp:"Aplicativos e jogos locais",
       searchHolderWallpaper:"Papéis de parede",
       searchHolderRingtone:"Toques",
       searchHolderAppGames:"Aplicativos/jogos",
       noSdState:"Não foi encontrado nenhum cartão SD no seu dispositivo.",
       /*2014-5-26*/
       minTipText:"Minimizar",
       maxTipText:"Maximizar",
       exitTipText:"Sair",
       returnTipText:"Voltar",
       retreatTipText:"Encaminhar",
       /*2014-5-27*/
       noLabel : 'Não',
       menuOpenLabel:"Abrir",
       //20140604
       bestPicksLabel: 'Melhores escolhas',
       actionFailed:'Falha na ação',
       /*2014-06-09*/
      searchHolderYoutube:'URL do YouTube ou Palavras-chave',
      screenshotSave:"A captura foi salva em: ",
      screenshotText:"Captura",
      screenshotCheckPathTip: "Sempre use este caminho para salvar capturas",
      /*2014-06-10*/
      alwaysOpenClient:'Sempre abra a conexão Mobogenie no Dispositivo.',
      changeOpenClient:'Você pode alterar isto nas Configurações a qualquer momento.',
      /*2014-06-18*/
      screenBlackTipText: "Acenda a tela do seu dispositivo móvel",
      /*2014-06-30*/
     ebookLabel:"Livros",
     myEbookLabel:"Meus livros",
      /*2014-6-30修改*/
      connectDeviceText:'Conectando. Mantenha seu dispositivo conectado.',
      openManageDevice:"Um dispositivo foi detectado. Abra o Mobogenie para gerenciar seu dispositivo e faça o download de conteúdo grátis.",
      /*2014-07-18*/
     searchHolderEBook:"Livros",
          /*2014-09-25*/
      rememberMarkLabel:" Salvar configurações"
    };
    return dictionary;
});