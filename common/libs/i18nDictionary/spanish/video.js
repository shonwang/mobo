define('spanish:video', function(require, exports, module){
    var dictionary = {
        importVideo: 'Importar videos',/*不超过28个字符*/
        exportSuccess:"{0} video(s) exportado(s) correctamente.",
        exportFailed:"Éxito al exportar {0} videos, error al exportar {1}:",
        promptDelete: '¿Seguro desea eliminar {0} video(s) seleccionado(s)?',
        deleteFailed:"Éxito al eliminar {0} videos, error al eliminar {1}:",
        promptPlayTitle: 'Preparando la reproducción del video',
        promptPlay: 'Cargando...',
        emptyVideoLabel: 'No hay videos en el dispositivo.',
        gotoYouTubeLabel: 'Descargar videos',
        promptInvaildPath: 'Ruta inválida.',
        playLabel: 'Reproducir',
        promptImportTips: "Android solo es compatible con formatos .avi, .3gp, .mp4, y .m4v El sistema podría no reconocer videos importados en otros formatos.",
        promptFullDisk:" No hay suficiente espacio en el disco C. Por favor, libere espacio antes de la reproducci�n del video.",
    };
    return dictionary;
});
