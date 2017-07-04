define('portuguese:task', function(require, exports, module){
    var dictionary = {
         setingAsWallpaper: 'Definindo como papel de parede...',
        setingAsRingtone: 'Definindo como toque...',
        setRingtoneSuccess: 'Definição de toque bem-sucedida',
        setRingtoneFailed: 'Falha ao definir toque',
        
        insuficientSpace: 'Falha na instalação. Espaço insuficiente',
        noSdCard: 'Falha na instalação. Nenhum cartão SD',
        noSuchSourceFile: 'Falha na instalação. Esse arquivo não existe',
        inValidApkFile: 'Falha na instalação. Arquivo apk inválido',
        unknowSourceSetting: 'Falha na instalação. Verifique todas as "Fontes desconhecidas" em Configurações > Aplicativos',
        installPhoneMemory: 'Instale na memória',
        unknownError: 'Erro desconhecido',
        networkErrorText: 'Erro de rede',
        
        waitingText: 'Aguardando',/*不超过56个字符*/
        pausedText: 'Pausado',/*不超过24个字符*/
        installUnknownError: 'Falha na instalação. Erro desconhecido',
        downloadUnknownError: 'Falha de download. Erro desconhecido',
        
        adbConnectionError: 'Conectar dispositivo para instalação',
        
        importFileNotExistedText: 'Falha na importação. O arquivo não existe',
        importTransferErrorText: 'Falha na importação. Erro de transferência de arquivo',
        importInsufficientSpace: 'Falha na importação. Espaço insuficiente',
        importUnknownError: 'Falha na importação. Erro desconhecido',
        importUnConnectError: 'Conectar dispositivo para importação',
        importFailedNoSdCard: 'Falha na importação. Nenhum cartão SD',
        installSdkOlderError: 'Incompatível com seu dispositivo',
        installMismatchedCertificateError: 'Incompatibilidade de certificado do APK. Desinstale o aplicativo atual antes da instalação',
        
        transferringText: 'Transferindo',/*不超过55个字符*/
        settedText: 'Definido em {0}',
        importViaConnectText: 'Conectar dispositivo para importação',
        
        installFailedText: 'Falha na instalação',
        
        openFolder:'Abrir pasta de downloads',
        
        downloadInText: 'Baixado em {0}',
        reinstallText: 'Reinstalar',/*不超过15个字符*/
        noTaskText: 'Não há tarefas aqui.',
        /*6-04*/
        unknowSource2Setting: "Falha na instalação. Verifique \"Fontes desconhecidas\" em Configurações > Segurança.",
        
        unzipAppText:"Extraindo arquivos de dados",
        transferDataFile:"Transferindo arquivos de dados",
        unzipAppFailedText:"Falha ao extrair arquivos de dados",
        transferAppFailedText:"Falha ao transferir arquivos de dados",
        /*7-28*/
        hideTaskTip:"Ocultar",
        /*2014-09-25*/
        showInstallPopLabel:"Install",
        /*2014-10-14*/
        installOnDeviceText: 'Por favor complete a instalação em seu aparelho.',
         /*2014-10-16*/
        pleaseTapInstall:"Por favor Toque \"Instalar\" em seu dispositivo.",
        /*2014-11-10*/
        installSdCard: "Instalar em RAM",
        onlyInstallSdCard: "Este app só pode ser instalado na memória RAM de seu dispositivo.",
        
        /*2015-1-7yangtian*/
        insufficeient:"Pouco espaço em disco"
    };
    return dictionary;
});