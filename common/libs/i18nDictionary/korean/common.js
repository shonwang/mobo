define('korean:common', function(require, exports, module){
    var dictionary = {
        connectingText: '연결 중',/*不超过16个字符*/
        
        homeLabel: '홈',/*不超过14个字符*/
        appLabel: '앱',/*不超过14个字符*/
        gamesLabel: '게임',/*不超过14个字符*/
        ringtonesLabel: '벨소리',/*不超过14个字符*/
        wallPaperLabel: '배경화면',/*不超过14个字符*/
        youTubeLabel: 'YouTube',/*不超过14个字符*/
        moreLabel: '더보기',/*不超过14个字符*/
        toolsLabel: '툴킷',/*不超过14个字符*/
        safetyLabel: '보안',/*不超过14个字符*/
        contactLabel: '내 연락처',/*不超过14个字符*/
        smsLabel: '내 메시지',/*不超过14个字符*/
        myAppLabel: '내 앱',/*不超过14个字符*/
        myMusicLabel: '내 음악',/*不超过14个字符*/
        myPictureLabel: '내 사진',/*不超过14个字符*/
        myVideoLabel: '내 비디오',/*不超过14个字符*/
        Import:'가져오기',/*不超过16个字符*/
        Export:'내보내기',/*不超过16个字符*/
        Delete:'삭제',
        Refresh:'새로 고침',
        updateAllLabel: '모두 업데이트',/*不超过16个字符*/
        updateLabel: '업데이트',/*不超过12个字符*/
        uninstallLabel: '설치 제거',/*不超过16个字符*/
        deviceText: '기기',/*不超过12个字符*/
        phoneText: '폰',
        memoryText: '메모리',/*不超过12个字符*/
        installLabel: '설치',/*不超过12个字符*/
        sizeLabel: '크기',
        nameLabel: '이름',
        locationLabel: '위치',
        actionLabel: '작업',
        selectAllLabel: '모두 선택',/*不超过30个字符*/
        downloadAllLabel: '모두 다운로드',/*不超过24个字符*/
        downloadingText: '다운로드 중',/*不超过24个字符*/
        redownloadText: '다시 다운로드',
        downloadLabel: "다운로드",
        
        successText: '성공',
        installedInText: '{0}에 설치됨',/*不超过45个字符*/
        ImportingText: '가져오는 중',/*不超过55个字符*/
        setWallpaperFailed : '배경화면 설정 실패',
        importedInText: '{0}에 가져옴',/*不超过45个字符*/
        
        retryText: '다시 시도',/*不超过15个字符*/
        pauseText: '일시 중지',/*不超过15个字符*/
        continueText: '계속',/*不超过15个字符*/
        inProcessingTaskText: '진행 중',
        completedText: '완료됨',
        noTaskText: '진행 중인 작업 없음',/*不超过18个字符*/
        
        captureLabel: '캡처',/*不超过24个字符*/
        featureText: '필수 앱',/*不超过24个字符*/
        countTasksText: '{0}개 작업',/*不超过15个字符*/
        
        updateTipText: '이미 최신 버전의 앱이 {0}개 있습니다.',/*不超过65个字符*/
        rootTipText: '모바일 기기가 루팅되지 않았습니다. 루팅을 통해 원하는 모든 앱을 설치할 수 있습니다.',
        oneClickRootLabel: '원클릭 루팅',
        shareMobogenieText: 'Mobogenie 공유',/*不超过65个字符*/
        
        tipLabel: '팁',
        confirmLabel:'확인',
        okLabel : '확인',
        yesLabel : '예',
        cancelLabel:'취소',
        closeLabel : '닫기',
        failedLabel : '실패',
        exportSuccess:'내보내기 성공',
        
        headSignIn:'로그인',/*不超过11个字符*/
        connectAnother : 'Connect another device',
        deviceInfo: '기기 정보',/*不超过22个字符*/
        email:'이메일',
        /*add 2014-03-28*/
        promptInvaildPath:'잘못된 경로입니다.',
	   
	    connectDeviceVia:'폰을 연결하기만 하면 앱, 게임, 비디오 등 모든 종류의 무료 Android 콘텐츠를 설치할 수 있습니다. 혁신적인 모바일 기기 관리 서비스를 경험해 보세요.',
        connectNow:'지금 연결',
		
		downloadingDriver:'기기에 맞는 드라이버 다운로드 중 {0}',/*不超过50个字符*/
		installingDriverText:'기기에 맞는 드라이버 설치 중',/*不超过50个字符*/
		installingMG:'기기에 Mobogenie 설치 중',/*不超过50个字符*/
		connectedYourDeviceText: '연결됨',/*不超过50个字符*/
		disconnectYourDeviceText: '연결 해제',/*不超过50个字符*/

        searchResultText: '<span class="c-red">{0}</span>에 대해 검색하여 <span class="c-red">{1}</span>개의 결과를 찾았습니다. ',
        searchSeeAllLink: '전체 보기',
        openLabel: '폴더 열기',
        
        Exporting:"내보내기 진행 중입니다. 기기를 연결된 상태로 두십시오.",
        Deleting:"삭제가 진행 중입니다. 기기를 연결된 상태로 두십시오.",

        deviceMemoryLabel: "기기 메모리",
        sdCardLabel: "SD 카드 1",
        sdCardTwoLabel: "SD 카드 2",
        total: "총: ",/*不超过20个字符*/
        available: "사용 가능: ",/*不超过20个字符*/
        manage: "관리",
        
        installedText: '설치됨',/*不超过15个字符*/
        updateAppText: '업데이트',/*不超过12个字符*/
        installingAppText: '설치 중',/*不超过55个字符*/
        installText: '설치',/*不超过15个字符*/

        /*2014-05-13*/
       searchHolderMyApp:"로컬 앱 및 게임",
       searchHolderWallpaper:"배경화면",
       searchHolderRingtone:"벨소리",
       searchHolderAppGames:"앱/게임",
       noSdState:"기기에 SD 카드가 없습니다.",
       /*2014-5-26*/
       minTipText:"최소화",
       maxTipText:"최대화",
       exitTipText:"종료",
       returnTipText:"뒤로",
       retreatTipText:"전달",
       /*2014-5-27*/
       noLabel : '아니요',
       menuOpenLabel:"열기",
       //20140604
       bestPicksLabel: '강력 추천',
       actionFailed:'작업 실패',
       /*2014-06-09*/
      searchHolderYoutube:'YouTube URL 또는 키워드',
      screenshotSave:"스냅샷 저장 위치: ",
      screenshotText:"스냅샷",
      screenshotCheckPathTip: "항상 이 경로를 사용하여 스냅샷 저장",
      /*2014-06-10*/
      alwaysOpenClient:'기기 연결 시 항상 Mobogenie를 엽니다.',
      changeOpenClient:'이 설정은 언제든지 변경할 수 있습니다.',
      /*2014-06-18*/
      screenBlackTipText: "모바일 기기의 화면을 켜세요.",
      /*2014-06-30*/
     ebookLabel:"도서",
     myEbookLabel:"내 도서",
      /*2014-6-30修改*/
      connectDeviceText:'연결 중입니다. 기기를 연결된 상태로 두십시오.',
      openManageDevice:"기기가 인식되었습니다. Mobogenie를 열어 기기를 관리하고 콘텐츠를 무료로 다운로드하세요.",
      /*2014-07-18*/
     searchHolderEBook:"도서",
          /*2014-09-25*/
     rememberMarkLabel:"위치를 기록하기"
    };
    return dictionary;
});