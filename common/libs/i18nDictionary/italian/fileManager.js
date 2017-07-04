/**
 * @author liujintao
 */
define('italian:fileManager', function(require, exports, module){
    var dictionary = {
        ImportFile: 'Importa file',
        ImportDirectory: 'Importa cartella',
        sureDelete : "Eliminare i file/cartelle selezionati?",
        
        exportingTitle:"Esportazione in corso. Mantenere il dispositivo collegato",
        deletingTitle:"Eliminazione in corso. Mantenere il dispositivo collegato",
        /*2014-07-26*/
        copingTitle:"mantenere il dispositivo collegato",
        copySuccess:"File copiati correttamente",
        sdCard:'Scheda SD',
        extSdCard:'Scheda SD esterna',
        pasteLabel:"Incolla",
        newFolder:"Nuova cartella",
        /*2014-08-04*/
       selectMultiInfo:"{0} cartelle, {1} file selezionati",
       selectDirectoryInfo:"{0} cartelle, {1} file ",
       sdCardUsage:"Totale: {0}, disponibile: {1}",
       sizeLabel:"Dimensioni: {0}",
       modifiedTime:"Data modifica: {0}",
       /*2014-08-08*/
       importingTitle:'Importazione in corso, tenere il telefono collegato',
	   /*2014-08-11*/
       noSdCardNotice:'Impossibile leggere la scheda SD. Assicurarsi che la scheda sia disponibile sul dispositivo.',
       confirmFileReplace:'{0} già esistente. Sostituirlo?',
       /*2014-08-18*/
      deleteFailed:"{0} file/cartelle sono state eliminate correttamente. Impossibile eliminare {1}:",
       importFailed:"{0} file/cartelle sono state importate correttamente. Impossibile importare {1}:",
	   createFolderFailed:"Creazione cartella non riuscita",
       exportFailed:"{0} file/cartelle esportate correttamente. Impossibile esportare {1}:",
       copyFailed:"{0} file/cartelle sono state copiate correttamente. Impossibile copiare {1}:",
       /*2014-08-21*/
      renameFailed:"Impossibile rinominare",
      spaceFailed:"Operazione non riuscita. Spazio insufficiente.",
      nosdcontent:"Questa cartella è vuota.",
       /*2014-09-11*/
       specailCharNotice:'Non è consentito utilizzare i caratteri seguenti per denominare una cartella: |/\:*?"<>',//重命名
       renameRepeatNotice:'Esiste già una cartella denominata [{0}]. Immettere un altro nome.',//重命名已存在
       renameLabel:"Rinomina",
       openingTitle:'Apertura in corso. Mantenere il dispositivo collegato', 
       fileExtChangeNotice:'Se viene modificata l\'estensione del nome di un file, il file potrebbe diventare inutilizzabile. Modificarla?',//后缀变更
       openHeader:"Apri file",
       openingFailed:"Impossibile aprire il file",        
       /*2014-10-15*/
      cMemoryLess:"Spazio insufficiente sull'unità C. Liberare spazio prima di riprodurre video, musica ecc."      
    };
    return dictionary;
});