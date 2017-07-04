define('korean:image', function(require, exports, module){
    var dictionary = {
    	importPicture: '사진 가져오기',/*不超过28个字符*/
    	gallery: '갤러리',/*不超过24个字符*/
    	wallpapers: '배경화면',/*不超过24个字符*/
    	others:'기타',/*不超过24个字符*/
    	date:'날짜',
        sureDeleteText : "선택한 {0}개의 사진을 삭제하시겠습니까?",
        deleteSuccessText: '삭제 성공',
        deleteFailed:"{0}개의 사진 삭제 성공, {1}개의 사진 삭제 실패:",
        setWallpaper: '배경화면으로 설정',
        
        exportSuccess:"{0}개의 사진을 내보냈습니다.",
        exportFailed:"{0}개의 사진 내보내기 성공, {1}개의 사진 내보내기 실패:",
        setWallpaperSuccess: '배경화면으로 설정했습니다.',
        setWallpaperFailed: '배경화면으로 설정하지 못했습니다.',
        /*201405-27*/
        rotateLeftText:"왼쪽으로 회전",
        rotateRightText:"오른쪽으로 회전",
        noImagesText:"기기에 이미지가 없습니다.",
        downloadImage:"배경화면 다운로드",
        /*2014-07-16*/
        previewLabel:"미리보기"
    };
    return dictionary;
});