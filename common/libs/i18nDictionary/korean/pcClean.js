define('korean:pcclean', function(require, exports, module){
    var dictionary = {
		//浏览器缓存
        ieTemp:"IE 캐시",//临时文件夹"
        chromeHistory:"Chrome 캐시",
        firefoxHistory:"Firefox 캐시",
        
        //第三方应用软件
        bitCometDld:"BitComet 다운로드 히스토리",
        
        kmPlayer:"KMPlayer",
        skype:"Skype",
        line:"Line",
        facebook:"Facebook",
        vicMediaPlayer:"VLC Media Player",
        youtubeDown:"YouTube Downloader",
        mobogenie:"Mobogenie",
        
        //注册表
        regInvalidStartMenu:"무효 시작 메뉴 기록",
        regInvalidMenu:"무효 콘텍스트 메뉴 ",
        regMuicache:"무효 MUI 레퍼런스 파일",
        regHelp:"무효 도움 파일",
        regInvalidAppPath:"무효 앱 경로",
        regInvalidInstall:"잔류 소프트웨어 설치 정보",
        regInvalidUninstall:"잔류 소프트웨어 삭제 정보",
        regFileAssoc:"무효 파일 결합",
        regInvalidFont:"무효 폰트",
        regInvalidStartRun:"무효 스타트업",
        regDll:"중복 DLL",
        regCom:"무효 COM 구성 부품",
        
        regOpenSaveDlg:"대화창 실행 히스토리",
        regExtHistory:"무효 파일유형 조작 기록",
        regWinRar:"Winrar 실행 히스토리",
        regWinZip:"Winzip 실행 히스토리",
        regOffice:"Office 실행 히스토리",
        regStartMenu:"무효 시작 메뉴",
        regUninstall:"남아 있는 소프트웨어 제거 정보",
        regInvalidFire:"무효 방화벽 설치",
        regInvalidHelp:"무효 도움 메뉴",
        regFailActiveX:"무효 ActiveX 정보",
        regFailClass:"인식 불가능한 정보",
        regRedundancy:"중복 정보",
        
        //回收站文件
        windowsTrash:"Windows 휴지통 ",
        
        //痕迹清理
        rencentUseFile:"최근 열린 파일 히스토리(파일)",
        gooleToolbar:"Google 툴바",
        regAccessHistory:"프로스램 레지스트리 방문 히스토리",
        windowsSearchHistory:"Windows 검색 기록",
        win7forward:"Windows 7 점프 목록",
        winthumbCache:" Windows 그림판 히스토리",
        
        /*10月21新增*/
        //第三方应用软件
        flashClean:"flash 캐시",
        appleLogClean:"Apple 소프트웨어 로그 파일",
        msseLogClean:"Microsoft Security Essentials 로그",
        //10-21新增注册表
		runDlg:"\"실행\"대화창 히스토리",
		visitedDir:"최근 실행 프로그램 히스토리",
		openSaveHistory:"최근 실행 프로그램 히스토리",
		winAndSize:"창 위치 및 사이즈 히스토리",
		rencentUseReg:"최근 열린 파일 히스토리(레지스트리)",
		fileExtHistory:"파일 확장명 히스토리",
		recentProgHistory:"최근 실행 프로그램 히스토리",
		noticeIconHistory:"알림 구역 아이콘 히스토리",
		networkDrivesHistory:"네트워크 드라이브 매핑 히스토리 ",
		findComputerHistory:"컴퓨터 검색 히스토리",
		findDocumentHistory:"파일 검색 히스토리",
		findPrinterHistory:"프린터 검색 히스토리",
		regVisitePos:"레지스트리 편집기 최후 방문 위치",
		windowsRegHistory:"Windows 레지스트리 플로우 히스토리",
		netNearBy:"Windows 네트워크 환경",
        
		/*10-21新增*/
		// 系统垃圾清理
		sysWinUpdate:"Windows 자동 업데이트 데이터 베이스",
		sysWinWinsxs:"Windows winSxs 백업 캐시",
		sysWinIns:"Windows installer 캐시",
		sysIisLog:"IIS 로그 파일",
		sysCryptoapi:"Windows CryptoAPI 인증 캐시",
		sysDefender:"Windows Defender 스캔 히스토리",
		sysManifest:"Windows ManifestCache 캐시",
		sysWinSearch:"Windows Search 로그",
		sysErrorRepopt:"Windows 에러 리포트",
		sysIconCache:"Windows 아이콘 캐시",
		sysPrefechFile:"Windows 프리페치 파일",
		sysFontCache:"Windows 폰트 캐시 파일",
		sysSysLog:"Windows 시스템 로그 파일",
		sysThumbCache:"섬네일 캐시 파일",
		sysUpdatePatch:"시스템 자동 업데이트 시 생성한 패치",
		sysSystempFile:"시스템 임시 파일",
		sysDefender:"Windows Defender 업데이트 백업 캐시",
		sysWinOld:"Windows.Old 백업 파일",
		sysInstalltemp:"Windows 설치 임시 파일",
		sysDumpFile:"메모리덤프 파일",
        
		
    };
    return dictionary;
});