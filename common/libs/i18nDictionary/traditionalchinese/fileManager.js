/**
 * @author liujintao
 */
define('traditionalchinese:fileManager', function(require, exports, module){
    var dictionary = {
        ImportFile: '匯入檔案',
        ImportDirectory: '匯入資料夾',
        sureDelete : "您確定要刪除已選取的檔案嗎吗？",
        
        exportingTitle:"正在匯出檔案，請不要中斷您的設備連線！",
        deletingTitle:"正在刪除檔案，請不要中斷您的設備連線",
        /*2014-07-26*/
        copingTitle:"請不要中斷您的設備連線",
        copySuccess:"檔案複製成功",
        sdCard:'SD卡',
        extSdCard:'外置SD卡',
        pasteLabel:"貼上",
        newFolder:"新增資料夾",
        /*2014-08-04*/
       selectMultiInfo:"已選取 {0} 個資料夾和 {1} 個檔案",
       selectDirectoryInfo:"{0}個資料夾, {1}個檔案 ",
       sdCardUsage:"總計：{0}, 可用：{1}",
       sizeLabel:"檔案大小: {0}",
       modifiedTime:"修改時間: {0}",
       /*2014-08-08*/
       importingTitle:'正在匯入，請不要中斷您的設備連線',
       /*2014-08-11*/
       noSdCardNotice:"無法讀取SD卡，請確認您設備的SD卡是否可用",
	   confirmFileReplace:'{0}已存在，確定要取代嗎？',
	    /*2014-08-11*/
       deleteFailed:"刪除 {0} 個檔案/資料夾成功， {1} 個失敗:",
       importFailed:"匯入 {0} 個檔案/資料夾成功， {1} 個失敗:",
	   createFolderFailed:"新增資料夾失敗",
       exportFailed:"匯出 {0} 個檔案/資料夾成功， {1} 個失敗:",
       copyFailed:"複製 {0} 個檔案/資料夾成功， {1} 個失敗:",
       /*2014-08-21*/
      renameFailed:"重新命名失敗",
      spaceFailed:"失敗， 空間不足。",
      nosdcontent:"該資料夾是空的",
       /*2014-09-11*/
       specailCharNotice:'檔案名不能包含下列任何字元|/\:*?"<>',//重命名
       renameRepeatNotice:'該目錄下已存在名為[{0}]的資料夾，請輸入其他名稱。',//重命名已存在
       renameLabel:"重新命名",
       openingTitle:'開啟中。請保持您的裝置連線。', 
       fileExtChangeNotice:'若您更改副檔名，檔案可能無法正常使用。您確定要變更嗎？',//后缀变更
       openHeader:"開啟檔案",
       openingFailed:"開啟檔案失敗",        
       /*2014-10-15*/
       cMemoryLess:"磁碟 C 剩餘空間不足，請先清理磁碟 C 再開啟（影片、音樂等）"         
    };
    return dictionary;
});