define('portuguese:video', function(require, exports, module){
    var dictionary = {
        importVideo: 'Importar vídeos',/*不超过28个字符*/
        exportSuccess:"Exportação de {0} vídeos bem-sucedida.",
        exportFailed:"Exportação de {0} vídeos bem-sucedida, falha ao exportar {1}:",
        promptDelete: 'Tem certeza de que deseja excluir os {0} vídeos selecionados?',
        deleteFailed:"Exclusão de {0} vídeos bem-sucedida, falha ao excluir {1}:",
        promptPlayTitle: 'Preparar vídeo em reprodução',
        promptPlay: 'Carregando...',
        emptyVideoLabel: 'Não há vídeos em seu dispositivo.',
        gotoYouTubeLabel: 'Download de vídeos',
        promptInvaildPath: 'Caminho inválido.',
        playLabel: 'Reproduzir',
        promptImportTips: "O Android só é compatível com os formatos .avi, .3gp, .mp4 e .m4v. Os vídeos importados em outros formatos podem não ser reconhecidos pelo sistema.",
        promptFullDisk:"Não há espaço suficiente no disco C. Libere algum espaço antes de tocar o vídeo.",
    };
    return dictionary;
});