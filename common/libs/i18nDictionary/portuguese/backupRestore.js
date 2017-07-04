define('portuguese:backupRestore', function(require, exports, module){
    var dictionary = {
        lastBackupLabel: 'Último backup: ',
        basicLabel: 'Básico',
        advanceLabel: 'Avançar',
        backupCompleted: 'Backup concluído',
        backupProcess: 'Backup em andamento... Mantenha o dispositivo conectado.',
        viewBackup: 'Ver backup',
        finish: 'Concluir',
        backtoLabel: "Backup para: ",
        changeLabel: "Alterar",
        contactLabel: "Contatos",
        messageLabel: "Mensagens",
        callRegordsLabel: "Registros",
        appLabel: "Aplicativos",
        picLabel: "Fotos",
        musicLabel: "Músicas",
        videoLabel: "Vídeos",

        restoreProcess: 'Restauração em andamento... Mantenha o dispositivo conectado.',
        restoreLabel: "Restaurar",
        nextLabel: "Próximo",
        closeLabel : "Fechar",
        restoreFolder: "Restauração a partir de pasta personalizada",
        selectLabel: "Selecione um arquivo para restaurar: ",
        previousLabel: "Anterior",
         //20140531 - add by wangzhisong
        noBackupFile: "Não foram encontrados arquivos de backup.",
        //20140623
        pushBackupLabel: "Faça o backup de seu dispositivo para garantir a segurança de suas informações pessoais.",
        //2014-7-25
        sureDialogText:"Para prevenir a perda de dados, o backup e a recuperação não podem ser realizados ao mesmo tempo."
    };
    return dictionary;
});