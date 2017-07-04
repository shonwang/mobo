/**
 * @author liujintao
 */
define('english:fileManager', function(require, exports, module){
    var dictionary = {
        ImportFile: 'Import Files',
        ImportDirectory: 'Import Folder',
        sureDelete : "Are you sure you want to delete selected files/folders?",
        
        exportingTitle:"Exporting, please keep device connected",
        deletingTitle:"Deleting, please keep device connected",
        /*2014-07-26*/
        copingTitle:"please keep device connected",
        copySuccess:"Copy the files success",
        sdCard:'SD Card',
        extSdCard:'External SD Card',
        pasteLabel:"Paste",
        newFolder:"New Folder",
        /*2014-08-04*/
       selectMultiInfo:"{0} Folders, {1} Files selected",
       selectDirectoryInfo:"{0} Folders, {1} Files ",
       sdCardUsage:"Total: {0}, Avaliable: {1}",
       sizeLabel:"Size: {0}",
       modifiedTime:"Modified Time: {0}",
       /*2014-08-08*/
       importingTitle:'Importing in process, keep phone connected',
	   /*2014-08-11*/
       noSdCardNotice:'Failed to read SD Card, please make sure SD Card on your device is available.',
       confirmFileReplace:'{0} already exists. Are you sure you want to replace it?',
       /*2014-08-18*/
       deleteFailed:"Delete {0} files successful,failed to delete {1}:",
       importFailed:"Import {0} files successful,failed to import {1}:",
       createFolderFailed:"Create folder failed",
       exportFailed:"Export {0} files successful,failed to export {1}:",
       copyFailed:"Copy {0} files successful,failed to copy {1}:",
       /*2014-08-21*/
       renameFailed:"Rename failed",
       spaceFailed:"Failed. Insufficient space.",
       
       nosdcontent:"This folder is empty.",
       /*2014-09-11*/
       openingTitle:'Opening. Please keep your device connected', 
       specailCharNotice:'The following characters are not allowed in a folder name: |/\:*?"<>',//重命名
       renameRepeatNotice:'A folder named [{0}] already exists. Please enter another name.',//重命名已存在
       renameLabel:"Rename",
       fileExtChangeNotice:'If you change a file name extension, the file may become unusable. Are you sure you want to change it?',//后缀变更
       openHeader:"Open File",
       openingFailed:"Failed to open file",
       /*2014-10-15*/
      cMemoryLess:"Not enough space on the C drive. Please free up some space before opening videos, music etc."      
    };
    return dictionary;
});