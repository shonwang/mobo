define('portuguese:pcclean', function(require, exports, module){
    var dictionary = {
		//浏览器缓存
        ieTemp:"Cache do IE",//临时文件夹"
        chromeHistory:"Cache do Chrome",
        firefoxHistory:"Cache do Firefox",
        
        //第三方应用软件
        bitCometDld:"BitComet download records",
        
        kmPlayer:"KMPlayer",
        skype:"Skype",
        line:"Line",
        facebook:"Facebook",
        vicMediaPlayer:"VLC Media Player",
        youtubeDown:"YouTube Downloader",
        mobogenie:"Mobogenie",
        
        //注册表
        regInvalidStartMenu:"Registros inválidos do Menu Iniciar",
        regInvalidMenu:"Entradas de menu de contexto inválido",
        regMuicache:"Arquivos de referência MUI inválidos",
        regHelp:"Arquivos de Ajuda inválidos",
        regInvalidAppPath:"Caminhos para Aplicativos inválidos",
        regInvalidInstall:"Resíduos de Instalação de Software",
        regInvalidUninstall:"Resíduos de desinstalação de Softwares",
        regFileAssoc:"Associações de arquivos inválidas",
        regInvalidFont:"Fontes inválidas",
        regInvalidStartRun:"Entradas de inicialização inválidas",
        regDll:"DLL redundantes",
        regCom:"Componentes COM inválidos",
        
        regOpenSaveDlg:"Registro de abertura de Diálogo",
        regExtHistory:"Tipo de Registro de abertura de arquivo Inválido",
        regWinRar:"Registro de abertura do Winrar",
        regWinZip:" Registro de abertura do Winzip",
        regOffice:" Registro de abertura do Office",
        regStartMenu:"Entradas do Menu Inicial Inválidas",
        regUninstall:"Informações de desinstalação redundantes",
        regInvalidFire:"Definições de firewall Inválidas",
        regInvalidHelp:"Entradas de Menu de Ajuda Inválidas ",
        regFailActiveX:"Informações de ActiveX Inválidas ",
        regFailClass:"Informações de categoria Inválidas",
        regRedundancy:"Informações redundantes",
        
        //回收站文件
        windowsTrash:"Lixeira",
        
        //痕迹清理
        rencentUseFile:"Arquivos Abertos Recentemente (File)",
        gooleToolbar:"Google Tool Bar",
        regAccessHistory:"Registros de Históricos de Acesso",
        windowsSearchHistory:"Registros de Busca",
        win7forward:"Lista Windows 7",
        winthumbCache:"Cache de imagens Windows",
        
        /*10月21新增*/
        //第三方应用软件
        flashClean:"Cache de Flash",
        appleLogClean:"Log de Arquivos de Softwares da Apple",
        msseLogClean:"Log de Microsoft Security Essentials",
        //10-21新增注册表
		runDlg:"\"Run\" Histórico de Diálogo",
		visitedDir:"Programas Recentemente Abertos",
		openSaveHistory:"Recently Run Programs",
		winAndSize:"Posição do Windows e Histórico de Tamanho",
		rencentUseReg:"Arquivos Recentemente Abertos (Registry)",
		fileExtHistory:"Histórico de Extensão de Arquivos",
		recentProgHistory:"Histórico de Programas Recentemente Abertos",
		noticeIconHistory:"Histórico de Notificações",
		networkDrivesHistory:"Histórico Unidade de Mapeamento de Rede",
		findComputerHistory:"Histórico de Busca",
		findDocumentHistory:"Histórico de Busca de Arquivo",
		findPrinterHistory:"Histórico de Busca de Impressão",
		regVisitePos:"Último Acesso ao Regedit",
		windowsRegHistory:"Histórico de Registro do Windows",
		netNearBy:"Lugares de Rede",
        
		/*10-21新增*/
		// 系统垃圾清理
		sysWinUpdate:"Base de Dados automaticamente atualizável do Windows",
		sysWinWinsxs:"Cache Backup Windows WinSxS",
		sysWinIns:"Cache Temporário de Windows Installer",
		sysIisLog:"Arquivos de Log IIS",
		sysCryptoapi:"Cache do Windows CryptoAPI Certificate",
		sysDefender:"Histórico do Windows Defender Scan",
		sysManifest:"Cache de Windows Manifest",
		sysWinSearch:"Logs do Windows Search",
		sysErrorRepopt:"Reports do Windows Error",
		sysIconCache:"Windows Icon Cache",
		sysPrefechFile:"Windows Prefetch Files",
		sysFontCache:"Windows Font Cache",
		sysSysLog:"Windows System Log Files",
		sysThumbCache:"Thumbnail Cache",
		sysUpdatePatch:"System Auto-update Patches",
		sysSystempFile:"System Temp Files",
		sysDefender:"Windows Defender Update Backup Cache",
		sysWinOld:"Windows.Old Backup Files",
		sysInstalltemp:"Windows Installation Temp Files",
		sysDumpFile:"Memory Dump Files",
		
    };
    return dictionary;
});