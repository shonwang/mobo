define('korean:tools', function(require, exports, module){
    var dictionary = {
		managementTool:'관리 도구',
		backup:'백업',/*不超过20个字符*/
		backupIntro:'모든 Android 기기 데이터를 PC로 백업합니다.',/*不超过58个字符*/
		restore:'복원',/*不超过20个字符*/
		restoreIntro:'이전 백업에서 데이터를 복원합니다.',/*不超过58个字符*/
		fileManager:'파일 관리자',/*不超过20个字符*/
		fileManagerIntro:'기기에 있는 파일 및 폴더를 봅니다.',/*不超过58个字符*/
		screenshot:'스크린샷',/*不超过20个字符*/
		screenshotIntro:'모바일 화면의 스크린샷을 찍습니다.',/*不超过58个字符*/
		deviceInfoIntro:'자세한 기기 정보를 봅니다.',/*不超过58个字符*/
		installApp:'앱/게임 파일 설치',/*不超过20个字符*/
		installAppIntro:'apk 파일을 기기에 일괄 설치합니다.',/*不超过58个字符*/
		advancedTool:'고급 도구',
		root:'원클릭 루팅',/*不超过20个字符*/
		rootIntro:'기기를 루팅하여 더 많은 메모리를 확보합니다.',//*不超过58个字符*/
		importOutlook:'Outlook 데이터 가져오기',/*不超过20个字符*/
		importOutlookIntro:'Outlook 연락처를 PC에서 Android 기기로 가져옵니다.',/*不超过58个字符*/
		importSymbian:'Symbian 데이터 가져오기',/*不超过20个字符*/
		importSymbianIntro:'Symbian 연락처를 Android 기기로 가져옵니다.',/*不超过58个字符*/
		freeWifi:'무료 Wi-Fi',/*不超过20个字符*/
		freeWifiIntro:'Wi-Fi를 통해 노트북 네트워크를 기기와 공유합니다.',/*不超过58个字符*/
		
		/*device info*/
		basicInfo:'기본 정보',
		modelNumber:'모델 번호:',/*不超过19个字符*/
		androidVer:'Android OS 버전:',/*不超过19个字符*/
		screenResoltion:'화면 해상도:',/*不超过19个字符*/
		battery:'배터리:',/*不超过19个字符*/
		cpu:'CPU:',/*不超过19个字符*/
		ram:'RAM:',/*不超过19个字符*/
		memory:'메모리:',/*不超过19个字符*/
		sdCard:'SD 카드',/*不超过19个字符*/
		isRooted:'루팅됨:',/*不超过19个字符*/
		hardwareInfo:'하드웨어 정보',/*不超过19个字符*/
		imei:'IMEI:',/*不超过19个字符*/
		serialNumber:'일련 번호:',/*不超过19个字符*/
		imsi:'IMSI:',/*不超过19个字符*/
		macAddress:'MAC 주소:',/*不超过19个字符*/
		basebandVer:'기저대역 버전:',/*不超过19个字符*/
		kernelVer:'커널 버전:',/*不超过19个字符*/
		copy:'복사',/*不超过8个字符*/
		copySuccess:'클립보드에 복사됨',
		unknownError: '알 수 없는 오류',
		unKnownText:'알 수 없는 오류가 발생했습니다.',
		netWorkError:'네트워크 오류',
		netWorkErrorText:'네트워크 연결을 확인하세요.',
		/*2014-09-11*/
		pcCleanerLabel:"PC 정리",
		scanOver:"스캔 완료. {0}개 불필요 파일과 {1}개 레지스트리 파일을 삭제할수 있습니다.",
		cleanBtn:"정리",
		lessBrowser:"인터넷 찌꺼기",
		lessHistory:"사용흔적",
		lessCommonUes:'소프트웨어 찌꺼기',
		lessSystem:'시스템 찌꺼기',
		lessDelete:"휴지통",
		lessUsuse:"레지스트리 찌꺼기",
		selectedLess:"선택했습니다",
		conScan:"다시 스캔",
		cleanText:"인터넷 찌꺼기,시스템 찌꺼기,소프트웨어 찌꺼기 등을 정리할수 있게 한다!",
		
		cleanFinish:"정리가 완료되였습니다",
		someFile:"일부 파일과 레지스트리는 다시시작 후에 삭제가 됩니다.",
		cleanOver:"쓸모없는 파일 {0}건과 레지스트리 {1}건을 삭제했습니다!",
		wifiConNot:"현재 본 기능은 Wi-Fi 환경에서 사용할 수 없습니다.",
		/*2014-11-03*/
		cleanFinished:"완료",
		/*2014-11-03 wifi hotpot*/
		deviceConnectingList:"{0}로 연결",
		startingWifiTitle:"무료 Wi-Fi 시작중...",
		hasNoWIfiTitle:"PC에 연결된 Wi-Fi가 없습니다.",
		iHaveWifi:"Wi-Fi 없습니다.",
		wifiNameLabel:"Wi-Fi 이름: ",
		wifiPasswordLabel:"Wi-Fi 암호: ",
		speedLabel:"속도",
		devicesConnectedTitle:"{0} 장치가 연결 됐습니다.",
		closeWifiLabel:"Wi-Fi 닫기",
		deviceBlackList:"블랙리스트",
		deviceBlackList2:"블랙리스트 {0}",
		moveOutBlackList:"삭제",
		downloadSpeedLabel:"다운로드 속도",
		uploadSpeedLabel:"업로드 속도",
		limitSpeedLabel:"속도 제한",
		pleaseWriteNum:"1-12 자리의 영문자, 숫자, 밑줄을 입력하세요.",
		moboWifi:"Mobogenie Wi-Fi",
		setBlackValidateNextTime:"블랙리스트는 Free Wi-Fi를 다시 시작한 후에야 시행됩니다 .",
		//2014-11-12
		pleaseWriteDeviceNameValid:"1-12 글자를 입력하세요.",
		
		//2014-11-14
		haveNoWifiAdapter:"발견된 USB Wi-Fi 어댑터가 없습니다.",
		solutionLabel:"해결책",
		solutionPluginTitle:"Wi-Fi 어댑터를 켜고 무료 Wi-Fi 서비스를 사용하기.",
		solutionSwitchLaptop:"랩톱으로 전환."
    };
    return dictionary;
});