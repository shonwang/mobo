define('korean:backupRestore', function(require, exports, module){
    var dictionary = {
        lastBackupLabel: '마지막 백업: ',
        basicLabel: '기본',
        advanceLabel: '고급',
        backupCompleted: '백업 완료됨',
        backupProcess: '백업 진행 중... 기기를 연결된 상태로 두십시오.',
        viewBackup: '백업 보기',
        finish: '완료',
        backtoLabel: "백업 위치: ",
        changeLabel: "변경",
        contactLabel: "연락처",
        messageLabel: "메시지",
        callRegordsLabel: "통화 기록",
        appLabel: "앱",
        picLabel: "사진",
        musicLabel: "음악",
        videoLabel: "동영상",

        restoreProcess: '복원 진행 중... 기기를 연결된 상태로 두십시오.',
        restoreLabel: "복원",
        nextLabel: "다음",
        closeLabel : "닫기",
        restoreFolder: "사용자 지정 폴더에서 복원",
        selectLabel: "복원할 파일 선택: ",
        previousLabel: "이전",
        //20140531 - add by wangzhisong
        noBackupFile: "백업 파일이 없습니다.",
        //20140623
        pushBackupLabel: "지금 기기를 백업하여 개인정보를 안전하게 보호하세요.",
        //2014-7-25
        sureDialogText:"데이터 손실을 막기 위해 백업과 복원은 동시에 수행될 수 없습니다."
    };
    return dictionary;
});