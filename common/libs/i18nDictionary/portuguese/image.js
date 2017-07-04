define('portuguese:image', function(require, exports, module){
    var dictionary = {
    	importPicture: 'Importar imagem',/*不超过28个字符*/
    	gallery: 'Galeria',/*不超过24个字符*/
    	wallpapers: 'Papéis de parede',/*不超过24个字符*/
    	others:'Outros',/*不超过24个字符*/
    	date:'Data',
        sureDeleteText : "Tem certeza de que deseja excluir as {0} imagens selecionadas?",
        deleteSuccessText: 'Exclusão bem-sucedida',
        deleteFailed:"Exclusão de {0} imagens bem-sucedida, falha ao excluir {1}:",
        setWallpaper: 'Definir como papel de parede',
        
        exportSuccess:"Exportação de {0} imagens bem-sucedida.",
        exportFailed:"Exportação de {0} imagens bem-sucedida, falha ao exportar {1}:",
        setWallpaperSuccess: 'Definição como papel de parede bem-sucedida',
        setWallpaperFailed: 'Falha na definição como papel de parede',
        /*201405-27*/
        rotateLeftText:"Girar para a esquerda",
        rotateRightText:"Girar para a direita",
        noImagesText:"Não há imagens no seu dispositivo.",
        downloadImage:"Baixar papéis de parede",
        
        /*2014-07-16*/
        previewLabel:"Visualizar"
    };
    return dictionary;
});