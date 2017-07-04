define('korean:driver', function(require, exports, module){
    var dictionary = {
		badNetworkTitle:'네트워크에 연결되지 않았습니다. 네트워크를 확인하세요.',/*不超过70个字符*/
		pictureGuide: '그림 가이드',/*不超过26个字符*/
		videoGuide: '비디오 가이드',/*不超过26个字符*/
		myVersion: '내 Android 버전:',/*不超过26个字符*/
		debugFootText: '여전히 USB 디버깅을 열 수 없나요?',/*不超过40个字符*/
		oneClickSet: '원클릭 설정',/*不超过30个字符*/
		tryConnectText: '케이블을 뽑았다가 다시 연결하거나 기기를 다시 시작해 보세요.',/*不超过70个字符*/
		butBack: '뒤로',
		ContactSupport: '지원 문의',/*不超过30个字符*/
		allowDebugText: 'USB 디버깅을 허용할지 묻는 메시지가 나타나면 "확인"을 누릅니다.',/*不超过70个字符*/
		allowDebugTip: "<i>1</i> 이 옵션을 선택합니다.",/*不超过50个字符*/
		allowDebugOkTip: "<i>2</i> <b>[확인]</b>을 누릅니다.",/*不超过50个字符*/
		butRetry: '이 팝업이 보이지 않나요?',/*不超过60个字符*/
		butShowAgain: '다시 표시',/*不超过25个字符*/
		stillNoSolove: '여전히 작동하지 않나요?',
        debugTipText: '기기에 {0}(12KB) 다운로드',/*不超过50个字符*/
        debugSetterContentText: ' [USB 디버거]',/*不超过20个字符*/
		orText: '또는',
		noSpaceHint: '기기에 저장 공간이 충분하지 않습니다.',/*不超过60个字符*/
		noSpaceText: 'Mobogenie에는 최소 {0}의 디스크 공간이 필요합니다.',/*不超过50个字符*/
		needSpaceText: '10MB',
		upSpaceText: '일부 앱을 제거하여 여유 공간을 확보하세요.',/*不超过60个字符*/
		butHaveSpace: '충분한 공간이 있음',/*不超过32个字符*/
		connectFailedTitle:'죄송합니다. 연결하지 못했습니다.',
		connectFailedTryText: '기기 연결을 해제한 다음 다시 연결합니다.',/*不超过90个字符*/
		connectFailedRestart: 'Mobogenie를 다시 시작합니다.',/*不超过90个字符*/
		RestartDevice: 'PC 및 기기를 다시 시작합니다.',/*不超过90个字符*/
		connectFailedText: '여전히 작동하지 않을 경우 FAQ를 확인하거나 문제를 보고하시기 바랍니다.',/*不超过90个字符*/
		
		connectionGuide:'연결 가이드',
		driverUsbTitle: 'USB 케이블을 통해 기기를 연결하세요.',/*不超过50个字符*/
		driverUsbText: '기기를 연결하면 게임, 앱 및 기타 콘텐츠를 무료로 다운로드하고 기기를 관리할 수 있습니다.',
		
		AndroidLowDebugStep1: '<i>1</i> <b>[앱 서랍]</b>을 누릅니다.',/*不超过60个字符*/
		AndroidLowDebugStep2: '<i>2</i> <b>[설정]</b>을 누릅니다.',/*不超过60个字符*/
		AndroidLowDebugStep3: '<i>3</i> <b>[애플리케이션]</b>을 누릅니다.',/*不超过60个字符*/
		AndroidLowDebugStep4: '<i>4</i> <b>[개발]</b>을 누릅니다.',/*不超过60个字符*/
		AndroidLowDebugStep5: '<i>5</i> <b>[USB 디버깅]</b>을 선택합니다.',/*不超过60个字符*/
		AndroidLowDebugStep6: '<i>6</i> <b>[확인]</b>을 누릅니다.',/*不超过60个字符*/
		AndroidHighDebugStep3: '<i>3</i> <b>[개발자 옵션]</b>을 누릅니다.',/*不超过60个字符*/
		AndroidHigherDebugStep3: '<i>3</i> <b>[전화기 정보]</b>를 누릅니다.',/*不超过60个字符*/
		AndroidHigherDebugStep4: '<i>4</i> <b>[빌드 번호]</b>를 여러 번 누릅니다.',/*不超过60个字符*/
		AndroidHigherDebugStep5: '<i>5</i> 개발자 모드가 활성화됩니다.',/*不超过60个字符*/
		AndroidHigherDebugStep6: '<i>6</i> 뒤로 이동하고 <b>[개발자 옵션]을 누릅니다.',/*不超过60个字符*/
		AndroidHigherDebugStep9: '<i>9</i> <b>[이 컴퓨터에서 항상 허용]</b>을 선택합니다.',/*不超过60个字符*/
		
		SamsungHighDebugStep4: '<i>4</i> <b>[개발자 옵션]</b>을 선택합니다.',/*不超过60个字符*/
		SamsungHigherDebugStep3: '<i>3</i> <b>[더 보기]</b>를 누릅니다.',/*不超过60个字符*/
		SamsungHigherDebugStep4: '<i>4</i> <b>[기기 정보]</b>를 누릅니다.',/*不超过60个字符*/
		
		driver1 :'<i>3</i> <b>[정보]</b>를 누릅니다.',
		driver2 :'<i>4</i> <b>[소프트웨어 정보]</b>를 누릅니다.',
		driver3 :'<i>8</i> <b>[뒤로]</b> 이동하고 <b>[개발자 옵션]</b>을 누릅니다.',
		driver4 :'<i>9</i> <b>[다시 묻지 않음]</b>을 선택합니다.',
		driver5 :'<i>2</i> <b>[일반]</b>을 누릅니다.',
		driver6 :'<i>10</i> <b>[예]</b>를 누릅니다.',
		/*2014-6-12*/
		driver7:' <b>[다시 표시 안 함]</b>을 선택합니다.',
		
		/*2014-7-3*/
		usbDebugServiceText:"현지 고객 서비스 센터로 전화하여 지원을 요청할 수도 있습니다.",
		usbDebugCustomer:"고객 서비스",
		usbDebugTitle: '폰을 관리하려면 USB 디버깅을 여십시오.',
		
		/*2014wifi*/
		driverUsbConnect: 'USB 연결',
		driverWifiConnect: 'Wi-Fi 연결',
		deviceBeen:"{0}개 디바이스가 검측되였습니다.연결하세요.",
		connectAnother:"다른 디바이스를 연결",
		pleaseDownMg:"<b>Mobogenie Helper</b> 를 디바이스에 다운로드하세요.",
		alreadyHava:"Mobogenie Helper를 이미 설치하였음",
		enterPass:"2.인증 코드 입력",
		howtofind:"인증 코드를 어떻게 찾나요?",
		pleasePhoneOk:"디바이스에서 PC의 연결 요구를 접수하세요!",
		conncetionFailed:"연결실패. 아래 항목이 정확한지 체크하세요:",
		phoneWifiOpen:"Wi-Fi가 열린 상태인지,PC와 같은 LAN에 있는지를 확인하세요.",
		passwordOk:"인증 코드가 정확합니까?",
		connectnix:"연결 실패. 디바이스가 PC의 연결 요구를 거부하였습니다!",
		
		contingDevice:"설비 연결 중...",
		updatingHelp:"Mobogenie Helper업데이트 중",
		updateFailed:"Mobogenie 업데이트가 실패했습니다!",
		alreadyCon:"데이터 케이블을 연결했습니다",
		connectBtnText:"연결",
		wifiScreen:"WIFI연결중은 스크린샷을 획득할 수 없습니다",
		
		//2014-10-14
		connectNoticeTitle: '설비를 연결하십시오',
		helpisOpen:"핸드폰에 설치된 Mobogenie Helper이 운행중인지",
		//2014-10-20
		pleaseClick:"설치 완성후 핸드폰에서 Mobogenie Helper을 다시 시작하십시오. 그리고 이하의 버턴으로 설비를 다시 연결하십시오.",
		reConnectBtn:"다시 연셜",
		pleaseInstall:"업그레이드 패키지를 보내드렸습니다. 설비에서 새 버전Mobogenie Helper을 설치하십시오.",
		scanBlow:"아래 큐알코드로 다운로드 하십시오",
		downloadUsing:"핸드폰 브라우저에서 아래 주소를 입력해 다운로드 하십시오在",
		openHelpDevice:"1. 설비에서 Mobogenie Helper을 열기.",
		
		/*2014-11-07修改*/
		connectFailedText:"Wi-Fi로 연결하기.",
		waitLong:"너무 느립니까? 알려주세요!",
		alreadyHava:"Mobogenie Helper가 설치되였습니다. 다음!",
		noHavaMobo:"Mobogenie Helper가 설치되지 않았습니다. 돌아가기!",
		tryConnectWifi:"Try connecting via Wi-Fi",
		/*2014-11-14增加*/
		driverWifiConnect: '무선 연결',
		havaOpenUsb:"USB 기능을 활성화했습니다.",
		usbConnectFailed:"USB 연결 에러",
		checkPhoneFailed: "운행중인 프로그램이 폰과 PC의 연결을 차단하고 있습니다. 프로그램을 닫고 다시 시도하십시오.",
		closeReConnect: "프로그램을 닫고 다시{0}에 연결하기."
    };
    return dictionary;
});