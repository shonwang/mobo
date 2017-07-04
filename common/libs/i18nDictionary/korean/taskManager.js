define('korean:task', function(require, exports, module){
    var dictionary = {
        setingAsWallpaper: '배경화면으로 설정 중...',
        setingAsRingtone: '벨소리로 설정 중...',
        setRingtoneSuccess: '벨소리 설정 성공',
        setRingtoneFailed: '벨소리 설정 실패',
        
        insuficientSpace: '설치하지 못했습니다. 공간 부족',
        noSdCard: '설치하지 못했습니다. SD 카드 없음',
        noSuchSourceFile: '설치하지 못했습니다. 해당 파일 없음',
        inValidApkFile: '설치하지 못했습니다. 잘못된 apk 파일',
        unknowSourceSetting: '설치하지 못했습니다. 설정 > 애플리케이션에서 "알 수 없는 소스"를 선택하세요.',
        installPhoneMemory: '메모리에 설치하세요.',
        unknownError: '알 수 없는 오류',
        networkErrorText: '네트워크 오류',
        
        waitingText: '대기 중',/*不超过56个字符*/
        pausedText: '일시 중지됨',/*不超过24个字符*/
        installUnknownError: '설치하지 못했습니다. 알 수 없는 오류',
        downloadUnknownError: '다운로드하지 못했습니다. 알 수 없는 오류',
        
        adbConnectionError: '설치할 기기를 연결하세요.',
        
        importFileNotExistedText: '가져오지 못했습니다. 파일이 존재하지 않음',
        importTransferErrorText: '가져오지 못했습니다. 파일 전송 오류',
        importInsufficientSpace: '가져오지 못했습니다. 공간 부족',
        importUnknownError: '가져오지 못했습니다. 알 수 없는 오류',
        importUnConnectError: '가져올 기기를 연결하세요.',
        importFailedNoSdCard: '가져오지 못했습니다. SD 카드 없음',
        installSdkOlderError: '이 기기와 호환되지 않음',
        installMismatchedCertificateError: 'APK 인증서가 일치하지 않습니다. 설치 전에 현재 앱을 제거하세요.',
        
        transferringText: '전송 중',/*不超过55个字符*/
        settedText: '{0}에 설정됨',
        importViaConnectText: '가져올 기기를 연결하세요.',
        
        installFailedText: '설치하지 못했습니다.',
        
        openFolder:'다운로드 폴더 열기',
        
        downloadInText: '{0}에 다운로드됨',
        reinstallText: '다시 설치',/*不超过15个字符*/
        noTaskText: '여기에 작업이 없습니다.',
        /*6-04*/
        unknowSource2Setting: "설치하지 못했습니다. 설정 > 보안에서 \"알 수 없는 소스\"를 선택하세요.",
        
        unzipAppText:"데이터 파일 추출 중",
        transferDataFile:"데이터 파일 전송 중",
        unzipAppFailedText:"데이터 파일을 추출하지 못했습니다.",
        transferAppFailedText:"데이터 파일을 전송하지 못했습니다.",
        /*7-28*/
        hideTaskTip:"숨기기",
        /*2014-09-25*/
        showInstallPopLabel:"Install",
        /*2014-10-14*/
        installOnDeviceText: '설비에서 설치를 완성하십시로',
         /*2014-10-16*/
        pleaseTapInstall:"설비에서 '설치'를 클릭하십시오",
        /*2014-11-10*/
        installSdCard: "RAM에 설치하기",
        onlyInstallSdCard: "본 앱은 RAM에서 만 설치 가능합니다.",
       /*2015-1-7yangtian*/
        insufficeient:"디스크 공간 부족"
    };
    return dictionary;
});