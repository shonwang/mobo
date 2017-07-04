define('korean:music', function(require, exports, module){
    var dictionary = {
        ImportMusic: '음악 가져오기',/*不超过28个字符*/
        Artist:'아티스트',/*不超过20个字符*/
        Time:'시간',/*不超过12个字符*/
        Format:'형식',/*不超过10个字符*/
        emptyMusicLabel:"기기에 음악이 없습니다.",/*不超过11个字符*/
        gotoRingtonesLabel: '벨소리 다운로드',/*不超过35个字符*/
        
        exportSuccess:"{0}개의 음악을 내보냈습니다.",
        exportFailed:"{0}개의 음악 내보내기 성공, {1}개의 음악 내보내기 실패:",
        
        sureDelete : "선택한 {0}개의 음악을 삭제하시겠습니까?",
        deleteSuccess:"삭제했습니다.",
        deleteFailed:"{0}개의 음악 삭제 성공, {1}개의 음악 삭제 실패:",
        //add 2014-04-02
        setringtoneSuccess:'벨소리로 설정 성공',
        setsmsSuccess:'알림음으로 설정 성공',
        setalarmSuccess:'알람음으로 설정 성공',
        setFailed:'설정 실패',
        //add 2014-04-16
        cancelringtone:'벨소리 설정 취소 성공',
        cancelsetsms:'알림음 설정 취소 성공',
        cancelsetalarm:'알람음 설정 취소 성공',
        //add 2014-04-28
        formaterror:"이 형식은 지원되지 않습니다.",
        //add 2014-05-14
        setasringtone:"벨소리로 설정",
        setasnotification:"알림음으로 설정",
        setasalarm:"알람음으로 설정",
        /*2014-5-26*/
        stop:"중지",
        /*2014-09-10*/
       musicnotexist:"음악이 존재하지 않습니다"
    };
    return dictionary;
});
