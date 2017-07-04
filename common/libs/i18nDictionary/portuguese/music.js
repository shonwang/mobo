define('portuguese:music', function(require, exports, module){
    var dictionary = {
        ImportMusic: 'Importar música',/*不超过28个字符*/
        Artist:'Artista',/*不超过20个字符*/
        Time:'Hora',/*不超过12个字符*/
        Format:'Formato',/*不超过10个字符*/
        emptyMusicLabel:"Não há música em seu dispositivo.",/*不超过11个字符*/
        gotoRingtonesLabel: 'Download de toques',/*不超过35个字符*/
        
        exportSuccess:"Exportação de {0} músicas bem-sucedida.",
        exportFailed:"Exportação de {0} músicas bem-sucedida, falha ao exportar {1}:",
        
        sureDelete : "Tem certeza de que deseja excluir as {0} músicas selecionadas?",
        deleteSuccess:"Exclusão bem-sucedida.",
        deleteFailed:"Exclusão de {0} músicas bem-sucedida, falha ao excluir {1}:",
        //add 2014-04-02
        setringtoneSuccess:'Definição como toque bem-sucedida',
        setsmsSuccess:'Definição como notificação bem-sucedida',
        setalarmSuccess:'Definição como alarme bem-sucedida',
        setFailed:'Falha ao definir',
        //add 2014-04-16
        cancelringtone:'Cancelamento do toque bem-sucedido',
        cancelsetsms:'Cancelamento da notificação bem-sucedido',
        cancelsetalarm:'Cancelamento do alarme bem-sucedido',
        //add 2014-04-28
        formaterror:"Este formato não é compatível",
        //add 2014-05-14
        setasringtone:"Configurar como toque",
        setasnotification:"Definir como notificação",
        setasalarm:"Definir como alarme",
        /*2014-5-26*/
        stop:"Parar",
        /*2014-09-10*/
       musicnotexist:"Múica não existe"
    };
    return dictionary;
});
