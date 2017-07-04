define('korean:setting', function(require, exports, module){
    var dictionary = {
    	aboutMe:'Mobogenie 정보',/*不超过18个字符*/
		aboutMeVersion:'버전: {0}',/*不超过22个字符*/
		MGWebsite:'웹 사이트:',/*不超过35个字符*/
		MGForums:'포럼:',/*不超过35个字符*/
		aboutMeLinkPolicy: '개인정보 취급방침',/*不超过35个字符*/
		aboutMeLinkEULA: 'EULA',/*不超过35个字符*/
		aboutMeLinkTOS: '서비스 약관',/*不超过35个字符*/
		aboutMeFootText: '©2014 Mobogenie.com. All Rights Reserved',/*不超过70个字符*/
		feedback:'피드백',
        fbFootText: '여러분의 피드백은 소중합니다.',/*不超过60个字符*/
        BtnSubmit: '보내기',
        fbSuccessTitle: '피드백을 보내 주셔서 감사합니다.',/*不超过45个字符*/
        fbSuccessText: '고객 서비스 담당자가 가능한 신속하게 답장을 보내 드릴 예정이니 받은 편지함을 확인해 주세요.',/*不超过150个字符*/
        
       
        setting: '설정',/*不超过18个字符*/
        checkForUpdates: '업데이트 확인',/*不超过18个字符*/
        whatNew: '새로운 기능',/*不超过18个字符*/
        ContactUs: '연락처',/*不超过18个字符*/
        
		generalLabel: '일반',/*不超过13个字符*/
		LocationsLabel: '위치',/*不超过13个字符*/
		AppllicationsLabel: '앱',/*不超过13个字符*/
		remindersLabel: '미리 알림',/*不超过13个字符*/
		Language: '언어',/*不超过62个字符*/
		generalStartupTitle: '시작 시',/*不超过62个字符*/
		generalStartupText:'완료되지 않은 작업을 자동으로 재개',/*不超过62个字符*/
		generalConnetTitle: '기기 연결 시',/*不超过62个字符*/
		generalConnetText: '항상 Mobogenie 열기',/*不超过62个字符*/
		generalConnetTextTwo: ' 다운로드한 앱 자동으로 설치',/*不超过62个字符*/
		generalCloseTitle: '닫을 시',/*不超过62个字符*/
		generalCloseText: ' 트레이로 클라이언트 최소화',/*不超过62个字符*/
		generalCloseTextTwo: '클라이언트 종료',/*不超过62个字符*/
		generalCloseTextThree: '매 시간 알림',/*不超过62个字符*/
		generalUpdateTitle: '클라이언트 업데이트',/*不超过62个字符*/
		generalUpdateText: '최신 버전으로 클라이언트 자동 업데이트',/*不超过62个字符*/
		locationsResource: '리소스 다운로드',/*不超过62个字符*/
		locationsBackup: '백업 위치',/*不超过62个字符*/
		locationsScreen: '스크린샷 위치',/*不超过62个字符*/
		locationsBtn: '찾아보기...',/*不超过12个字符*/
		appllicationsFileTitle: '파일 연결',/*不超过62个字符*/
		appllicationsFileText: '.apk 파일이 Mobogenie와 연결되어 있는지 확인',/*不超过62个字符*/
        appllicationsLatestTitle: '최신 앱 자동 업데이트',
		appllicationsLatestText: '최신 업데이트 가능한 앱 자동으로 다운로드',/*不超过62个字符*/
		appllicationsDefaultTitle: '기본 설치 위치',/*不超过62个字符*/
		appllicationsDefaultText: ' 자동(SD 카드에 설치하지 못할 경우 기기에 설치합니다.)',/*不超过62个字符*/
		appllicationsDefaultTextTwo: '기기 메모리',/*不超过62个字符*/
		appllicationsDefaultTextThree: '외부 SD 카드(Android 2.2 이상만 지원합니다.)',/*不超过62个字符*/
		remindersUpdateTitle: '앱 업데이트',/*不超过62个字符*/
		remindersUpdateText:'{0}일마다 앱을 업데이트하도록 알림',/*不超过62个字符*/
		remindersBackupText:'{0}일마다 기기를 백업하도록 알림',/*不超过62个字符*/
		remindersUpdateTextTwo: '다시 알리지 않음',/*不超过62个字符*/
		remindersBackupTitle: '백업',/*不超过62个字符*/
		remindersPopularTitle: '인기 있는 활동',/*不超过62个字符*/
		remindersPopularText: '인기 있는 활동 또는 프로모션이 있는 경우 알림',
		/*5-24*/
		swicthSiteLabel:'사이트',
		/*5-26*/
		settingTip:"메뉴",
		/*7-21*/
		fbModelName: '설비 모델',
		fbOsVersion: '안드로이드 버전',
		
		/*7.22*/
		fbType9:"기타",
		/*2014-9-9*/
		upload:"업로드",
		/*2014-9-11 新版反馈文案*/
		pleaseGory:"문제 유형:",
		pleaseChoose:"유형을 선택하세요.",
		openUSB:"Open USB 디버깅 열기:",
		pleaseSele:"선택하세요...",
		whatUsb:"USB 디버깅이란?",
		havaActive:"SB 디버깅을 활성화 시켰습니까?",
		phoneModel:"폰 모델",
		pleaseEnter:"폰 모델을 입력하세요.",
		modelOf:"폰 모델에 문제가 있습니다",
		email: "이메일:",
		enterEmail:"이메일 주소를 입력하세요.",
		enterValid:"더욱 좋은 서비스를 제공해 드리기 위해 유효한 이메일 주소를 입력하세요",
		andVer:"Android 버전:",
		pleaseVer:"Android 버전을 선택하세요.",
		corSystem:"정확한 시스템 버전은 정확한 문제 인식에 도움이 됩니다.",
		socialAcc:"소셜 어카운트:",
		selectMethod:"연락 방식를 선택하세요",
		description:"설명:",
		addAttach: "첨부하기",
		noFiles:"파일이 없습니다",
		onlySupports:"3MB이하의 파일만 지원합니다.",
		whyNeed:"USB 디버깅 기능은 왜 사용해야 됩니까?",
		debugRequired:"Android 시스템과 PC의 완전한 연결을 위해 USB디버깅은 필수입니다. USB디버깅을 활성화하면 휴대폰이나 태블릿 컴퓨터가 Mobogenie로 연결할 때 더욱.",
		openfun:"USB 디버깅 기능은 어떻게 엽니까?",
		andLower:"Android 3.2 나 그 이하",
		selectSet:"앱 목록에서 [설정]을 선택하고 시스템 메뉴로 들어가기.",
		selectApp: " [애플리케이션]을 선택.",
		
		selectDeve:"[개발]을 선택.",
		selectTap:"[USB 디버깅]을 선택하고 OK에 탭하기.",
		andFour: "Android 4.0 및 4.1",
		selectOpt:"[개발자 옵션]을 선택.",
		openOpt:"위에 있는 [개발자 옵션]을 열기.",
		checkTap:"[USB 디버깅]을 체크하고 OK를 탭하기.",
		androidFour:"Android 4.2",
		tapIcon:"[설정] 아이콘에 탭하기.",
		tapPhone:"[About Phone]을 탭하기.",
		scrollBot: "스크린 맨 아래로 스크롤하고, [빌드 번호]를 찾으시면 몇 번 탭하세요.",
		
		keepTap:"계속 탭하면 다음 메시지가 나올겁니다 \"개발자가 되셨습니다!\"",
		goback:"[설정]으로 돌아가시면 [개발자 옵션]이 보이게 될겁니다!",
		enterDeve:"[개발자 옵션]에 들어가서 [USB 디버깅]을 선택.",
		backDeve:"[개발자 옵션]으로 돌아가 [USB 디버깅]이 체크했는지를 확인.",
		connectCom:"폰과 컴퓨터를 연결하고 Mobogenie를 열기. <br/>Mobogenie가 컴퓨터에서 [Mobogenie Helper]를 설치할 겁니다.<br/>설치 알림이 뜨면 OK를 탭하세요.",
		returnCon:"돌아가여 계속",
		fbSuccessClose: '상점 계속 브라우징하기{0}',
		
		unableCon:"폰과 연결이 안 됩니다",
		proInstall:"리소스에 문제가 있습니다",
		contactsText:"연락처와 메시지",
		slowPer:"느린 성능",
		unableRoot:"루트 불가",
		stillWhen:"장치가 연결이 안 된 상채에서도 MG가 뜬다",
		suggesNew:"새로운 기능에 관한 의견",
		usbOn: "USB 디버깅 온",
		usbOff: 'USB 디버깅 오프',
		fbTextarea: "언제 든지 환영합니다!",
		errorFile:"부정확한 파일 포맷",
		/*2014-11-07*/
		unableCon:"USB로 폰과 연결이 안 됩니다.",
		unableWifiCon:"Wi-Fi로 폰과 연결이 안 됩니다.",

    };
    return dictionary;
});