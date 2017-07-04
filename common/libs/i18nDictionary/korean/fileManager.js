/**
 * @author liujintao
 */
define('korean:fileManager', function(require, exports, module){
    var dictionary = {
         ImportFile: '파일 임포트',
        ImportDirectory: '디렉토리 임포트',
        sureDelete : "선택된 파일을 삭제하겠습니까?",
        
        exportingTitle:"엑스포트중이니 디바이스를 중단하지 마세요！",
        deletingTitle:"삭제중이니 디바이스를 중단하지 마세요",
        /*2014-07-26*/
        copingTitle:" 바이스를 중단하지 마세요",
        copySuccess:"파일 복사 성공",
        sdCard:'SD카드',
        extSdCard:'외부 SD카드',
        pasteLabel:"붙여넣기",
        newFolder:"새 폴더",
        /*2014-08-04*/
       selectMultiInfo:" {0}개 디렉토리와 {1}개 파일을 선택",
       selectDirectoryInfo:"{0}개 디렉토리, {1}개 파일 ",
       sdCardUsage:"도합：{0}, 사용가능：{1}",
       sizeLabel:"파일 크기: {0}",
       modifiedTime:"수정 시간: {0}",
       /*2014-08-08*/
       importingTitle:'임포트중이니 디바이스를 중단하지 마세요',
       /*2014-08-11*/
       noSdCardNotice:" SD카드 식별이 되지 않습니다. SD카드가 사용가능한지 확인하세요",
	   confirmFileReplace:'{0} 존재합니다.교체하시겠습니까？',
	   deleteFailed:"{0} 개 파일/디렉토리 삭제 성공，실패 {1} 개:",
       importFailed:"{0} 개 파일/디렉토리 임포트 성공，실패 {1} 개:",
	   createFolderFailed:"디렉토리 생성 실패",
       exportFailed:"{0} 개 파일/디렉토리 엑스포트 성공，실패 {1} 개:",
       copyFailed:"{0} 개 파일/디렉토리 복제 성공，실패 {1} 개:",
       /*2014-08-21*/
      renameFailed:"리네임 실패",
      spaceFailed:"실패함. 공간 부족.",
      nosdcontent:"빈 폴더입니다.",
       /*2014-09-11*/
       specailCharNotice:'폴더명에 |/\:*?"<>등 부호가 있으면 안됩니다.',//重命名
       renameRepeatNotice:'[{0}]란 폴더가 이미 존재합니다. 다른 이름을 입력하세요.',//重命名已存在
       renameLabel:"리네임",
       openingTitle:'열고 있습니다. 장치를 연결된 상테로 유지하세요', 
       fileExtChangeNotice:'확장파일명을 바꾸면 파일이 사용할 수 없게 될 수 있습니다. 그래도 바꾸시겠습니까?',//后缀变更
       openHeader:"파일 열기",
       openingFailed:"파일 열기가 실패했습니다",   
       /*2014-10-15*/
      cMemoryLess:"디스크 C에 남은 공간이 부족합니다. 정리한 다음에 다시 시도하십시오(비디오, 음악등)"    
    };
    return dictionary;
});