define('spanish:image', function(require, exports, module){
    var dictionary = {
    	importPicture: 'Importar imagen',/*不超过28个字符*/
    	gallery: 'Galería',/*不超过24个字符*/
    	wallpapers: 'Wallpapers',/*不超过24个字符*/
    	others:'Otros',/*不超过24个字符*/
    	date:'Fecha',
        sureDeleteText : "¿Está seguro que desea eliminar {0} imágene(s) seleccionada(s)?",
        deleteSuccessText: 'Eliminación exitosa',
        deleteFailed:"Éxito al eliminar {0} imágenes, error al eliminar {1}:",
        setWallpaper: 'Establecer como fondo de pantalla',
        
        exportSuccess:"{0}  imagen(es) exportada(s) exitosamente.",
        exportFailed:"Éxito al exportar {0} imágenes, error al exportar {1}:",
        setWallpaperSuccess: 'Éxito al establecer como wallpaper',
        setWallpaperFailed: 'Error al establecer como wallpaper',
        /*201405-27*/
        rotateLeftText:"Girar a la izquierda",
        rotateRightText:"Girar a la derecha",
        noImagesText:"No hay imágenes en el dispositivo.",
        downloadImage:"Descargar fondos de pantalla",
        
        /*2014-07-16*/
        previewLabel:"Ver"
    };
    return dictionary;
});
