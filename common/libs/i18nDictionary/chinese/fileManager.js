/**
 * @author liujintao
 */
define('chinese:fileManager', function(require, exports, module){
    var dictionary = {
        ImportFile: '导入文件',
        ImportDirectory: '导入文件夹',
        sureDelete : "您确定要删除已选中的文件吗？",
        
        exportingTitle:"正在导出文件，请不要断开您的设备！",
        deletingTitle:"正在删除文件，请不要断开您的设备",
        /*2014-07-26*/
        copingTitle:"请不要断开您的设备",
        copySuccess:"复制文件成功",
        sdCard:'SD卡',
        extSdCard:'外置SD卡',
        pasteLabel:"粘贴",
        newFolder:"新建文件夹",
        /*2014-08-04*/
       selectMultiInfo:"选中 {0} 个文件夹, {1} 个文件",
       selectDirectoryInfo:"共 {0} 个文件夹, {1} 个文件 ",
       sdCardUsage:"总计：{0}, 可用：{1}",
       sizeLabel:"文件大小: {0}",
       modifiedTime:"修改时间: {0}",
       /*2014-08-08*/
       importingTitle:'正在导入，请不要断开您的设备',
       /*2014-08-11*/
       noSdCardNotice:'读取SD卡失败，请确认您设备中的SD卡是否可用。',
       confirmFileReplace:'{0} 已经存在，请确认是否替换？',
       /*2014-08-18*/
       deleteFailed:"Delete {0} files successful,failed to delete {1}:",
       importFailed:"Import {0} files successful,failed to import {1}:",
       createFolderFailed:"Create folder failed",
       exportFailed:"Export {0} files successful,failed to export {1}:",
       copyFailed:"Copy {0} files successful,failed to copy {1}:",
       /*2014-08-21*/
      renameFailed:"Rename failed",
      nosdcontent:"There are no files in the folder."
    };
    return dictionary;
});