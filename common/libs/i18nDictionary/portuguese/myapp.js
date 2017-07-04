define('portuguese:myapp', function(require, exports, module){
    var dictionary = {
       installAppsLabel: 'Instalar aplicativos',/*不超过18个字符*/
        moveToSdCardLabel: 'Mover para cartão SD',/*不超过30个字符*/
        tabAppLabel: 'Aplicativos',/*不超过24个字符*/
        tabUpdatesLabel: 'Atualizações',/*不超过24个字符*/
        tabSystemLabel: 'Sistema',/*不超过24个字符*/
        moveLabel: 'Mover',
        
        appCurrentVersionLabel: 'Versão atual:',/*不超过22个字符*/
        appLatestVersionLabel: 'Última versão:',/*不超过22个字符*/
        appLocationLabel: 'Local.:',/*不超过20个字符*/
        appSizeColonLabel: 'Tamanho:',/*不超过22个字符*/
        ratingColonLabel: 'Avaliação:',
        
        likeColonLabel: 'Você também pode se interessar por...',/*不超过45个字符*/
        downloadsText: '{0} downloads',
        updatingText: 'Atualizando',/*不超过45个字符*/
        uninstallingText: 'Desinstalando',/*不超过12个字符*/
        installingText: 'Instalando',
        sureUninstallTip: 'Tem certeza de que deseja desinstalar o(s) {0} aplicativo(s) selecionado(s)?',
        uninstalling: 'Desinstalação em andamento. Mantenha seu dispositivo conectado.',
        uninstallSuccessText: 'Êxito',
        uninsatllFailed:"Desinstalação de {0} aplicativo(s) bem-sucedida, falha ao desinstalar {1}:",
        
        exportSuccess:"Exportação de {0} aplicativos bem-sucedida.",
        exportFailed:"Exportação de {0} aplicativos bem-sucedida, falha ao exportar {1}:",
        
        systemMaskText: 'Você pode gerenciar os aplicativos do seu sistema após consolidar seu dispositivo.',
        systemMaskCtn: 'A exclusão dos aplicativos do seu sistema irá liberar até 156,3 MB de espaço.',
        searchResultTitle:'encontramos {0} aplicativo(s)',
        /*2014-5-26*/
        deviceTipText : "Memória do dispositivo",
        sdCardTipText : "Cartão SD",
        //06-03
        noapptext:'Não há aplicativos no seu dispositivo.',
        noupdatetext:'Não há aplicativos a serem atualizados no seu dispositivo.',
        /*2014-6-18*/
        noappBtnText:'Download de aplicativos',
        //08-13
        moving: 'Mover em processo. Por favor mantenha seu dispositivo conectado.',
        moveFailed:"Movidos {0} apps com sucesso, falha em mover {1}:",
        //08-19
        moveConfirm:"Apps podem não funcionar depois de serem movidos para o Cartão SD. Tem certeza que deseja continuar?",
        //2014-10-14
        wifiUninstallTitle:"Por favor complete a desinstalação em seu aparelho."
    }
    return dictionary;
});