define('korean:video', function(require, exports, module){
    var dictionary = {
        importVideo: '비디오 가져오기',/*不超过28个字符*/
        exportSuccess:"{0}개의 비디오를 내보냈습니다.",
        exportFailed:"{0}개의 비디오 내보내기 성공, {1}개의 비디오 내보내기 실패:",
        promptDelete: '선택한 {0}개의 비디오를 삭제하시겠습니까?',
        deleteFailed:"{0}개의 비디오 삭제 성공, {1}개의 비디오 삭제 실패:",
        promptPlayTitle: '비디오 재생 준비 중',
        promptPlay: '로드 중...',
        emptyVideoLabel: '기기에 비디오가 없습니다.',
        gotoYouTubeLabel: '비디오 다운로드',
        promptInvaildPath: '잘못된 경로입니다.',
        playLabel: '재생',
        promptImportTips: "Android는 .avi, .3gp, .mp4, .m4v 형식만 지원합니다. 다른 형식으로 가져온 비디오는 시스템에서 인식되지 않을 수 있습니다.",
        promptFullDisk:"C드라이브 디스크 공간이 부족합니다. 우선 C드라이브 디스크를 정리한 다음에 다시 재생을 시도하세요",
    };
    return dictionary;
});