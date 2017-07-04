/**
 * @author liujintao
 */
define('spanish:fileManager', function(require, exports, module){
    var dictionary = {
        ImportFile: 'Importar archivos',
        ImportDirectory: 'Importar carpeta',
        sureDelete : "¿Está seguro que desea eliminar los archivos/carpetas seleccionados?",
        
        exportingTitle:"Exportando. Mantenga el dispositivo conectado",
        deletingTitle:"Eliminando. Mantenga el dispositivo conectado",
        /*2014-07-26*/
        copingTitle:"mantenga el dispositivo conectado",
        copySuccess:"Copiar archivos",
        sdCard:'Tarjeta SD',
        extSdCard:'Tarjeta SD externa',
        pasteLabel:"Pegar",
        newFolder:"Nueva carpeta",
        /*2014-08-04*/
       selectMultiInfo:"{0} carpetas, {1} archivos seleccionados",
       selectDirectoryInfo:"{0} carpetas, {1} archivos ",
       sdCardUsage:"Total: {0}, disponible: {1}",
       sizeLabel:"Tamaño: {0}",
       modifiedTime:"Hora de modificación: {0}",
       /*2014-08-08*/
       importingTitle:'Importación en curso. Mantenga el teléfono conectado',
	   /*2014-08-11*/
       noSdCardNotice:'No se pudo leer la tarjeta SD. Asegúrese de que la tarjeta SD esté disponible en el dispositivo.',
       confirmFileReplace:'{0} ya existe. ¿Está seguro de que desea reemplazarlo?',
       /*2014-08-18*/
       deleteFailed:"Se eliminaron {0} archivos/carpetas correctamente; error al eliminar {1}:",
       importFailed:"Se importaron {0} archivos/carpetas correctamente; error al importar {1}:",
	   createFolderFailed:"No se pudo crear la carpeta",
       exportFailed:"Se exportaron {0} archivos/carpetas correctamente; error al exportar {1}:",
       copyFailed:"Se copiaron {0} archivos/carpetas correctamente; error al copiar {1}:",
       /*2014-08-21*/
       renameFailed:"Error al renombrar",
       spaceFailed:"Error. Espacio insuficiente.",
       nosdcontent:"Esta carpeta está vacía.",
       /*2014-09-11*/
       specailCharNotice:'Los siguientes caracteres no están permitidos en un nombre de carpeta',//重命名
       renameRepeatNotice:'Una carpeta llamada [{0}] ya existe. Por favor, introduzca otro nombre.',//重命名已存在
       renameLabel:"Renombrar",
       openingTitle:' Abriendo. Por favor, mantenga el dispositivo conectado', 
	   fileExtChangeNotice:'Si cambia una extensión de nombre de archivo, el archivo puede quedarse inutilizable. ¿Seguro que quieres cambiarlo?',//后缀变更
	   openHeader:"Abrir archivo",
	   openingFailed:"Fracasar de abrir el archivo",
       /*2014-10-15*/
       cMemoryLess:"No hay suficiente espacio en la unidad C. Por favor, libere algunos espacios antes de abrir vídeos, música, etc"      
    };
    return dictionary;
});