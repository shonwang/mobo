define('traditionalchinese:pcclean', function(require, exports, module){
    var dictionary = {
		//浏览器缓存
        ieTemp:"IE瀏覽器緩存",//临时文件夹"
        chromeHistory:"Chrome瀏覽器緩存",
        firefoxHistory:"Firefox瀏覽器緩存",
        
        //第三方应用软件
        bitCometDld:"BitComet下載記錄",
        
        kmPlayer:"KMPlayer",
        skype:"Skype",
        line:"Line",
        facebook:"Facebook",
        vicMediaPlayer:"VLC Media Player",
        youtubeDown:"YouTube Downloader",
        mobogenie:"Mobogenie",
        
        //注册表
        regInvalidStartMenu:"無效的開始功能表記錄",
        regInvalidMenu:"無效的右鍵選單",
        regMuicache:"無效的MUI引用",
        regHelp:"無效的幫助檔",
        regInvalidAppPath:"無效的應用程式路徑",
        regInvalidInstall:"軟體安裝殘留檔",
        regInvalidUninstall:"軟體解除安裝殘留檔",
        regFileAssoc:"無效的檔案關聯",
        regInvalidFont:"無效的字體",
        regInvalidStartRun:"無效的啟動項目",
        regDll:"多餘的動態連結程式庫",
        regCom:"無效的COM組件",
        
        regOpenSaveDlg:"打開通話記錄",
        regExtHistory:"無效的檔案類型操作記錄",
        regWinRar:"Winrar打開記錄",
        regWinZip:"Winzip打開記錄",
        regOffice:"Office打開記錄",
        regStartMenu:"無效的開始選單",
        regUninstall:"殘留的軟體卸載訊息",
        regInvalidFire:"無效的防火牆設定",
        regInvalidHelp:"無效的幫助選單",
        regFailActiveX:"無效的ActiveX訊息",
        regFailClass:"無效的類別訊息",
        regRedundancy:"殘餘訊息",
        
        //回收站文件
        windowsTrash:"Windows 回收筒 ",
        
        //痕迹清理
        rencentUseFile:"最近打開的文件歷史記錄(文件)",
        gooleToolbar:"Google工具檔",
        regAccessHistory:"登錄碼訪問歷史記錄",
        windowsSearchHistory:"Windows 搜尋記錄",
        win7forward:"Windows 7 跳轉列表",
        winthumbCache:" Windows 圖示歷史記錄",
        
        /*10月21新增*/
        //第三方應用軟體
        flashClean:"flash緩存",
        appleLogClean:"Apple 軟體日誌檔案",
        msseLogClean:"Microsoft Security Essentials日誌",
        //10-21新增登錄碼
		runDlg:"\"運行\"對話框歷史記錄",
		visitedDir:"最近運行程式的歷史記錄",
		openSaveHistory:"最近運行程式的歷史記錄",
		winAndSize:"窗口位置與大小歷史記錄",
		rencentUseReg:"最近開啟的文件檔歷史記錄(登錄碼)",
		fileExtHistory:"檔案副檔名歷史記錄",
		recentProgHistory:"最近開啟程式歷史記錄",
		noticeIconHistory:"通知區域圖標歷史記錄",
		networkDrivesHistory:"網絡驅動器映射歷史記錄 ",
		findComputerHistory:"尋找電腦歷史記錄",
		findDocumentHistory:"尋找文件檔歷史記錄",
		findPrinterHistory:"尋找印表機歷史記錄",
		regVisitePos:"登錄碼編輯器最後訪問的位置",
		windowsRegHistory:"Windows登錄碼歷史記錄",
		netNearBy:"Windows 網絡上的芳鄰",
        
		/*10-21新增*/
		// 系统垃圾清理
		sysWinUpdate:"Windows自動更新數據庫",
		sysWinWinsxs:"Windows winSxs備份緩存",
		sysWinIns:"Windows installer臨時緩存",
		sysIisLog:"IIS的日誌檔案",
		sysCryptoapi:"Windows CryptoAPI 認書緩存",
		sysDefender:"Windows Defender 掃描歷史",
		sysManifest:"Windows ManifestCache緩存",
		sysWinSearch:"Windows Search日誌",
		sysErrorRepopt:"Windows 異常報告",
		sysIconCache:"Windows 圖標緩存",
		sysPrefechFile:"Windows 預讀取檔案",
		sysFontCache:"Windows 字體緩存檔案",
		sysSysLog:"Windows系統日誌檔案",
		sysThumbCache:"縮圖緩存檔案",
		sysUpdatePatch:"系統自動更新時留下的補丁",
		sysSystempFile:"系統臨時檔案",
		sysDefender:"Windows Defender更新備份緩存",
		sysWinOld:"Windows.Old 備份的檔案",
		sysInstalltemp:"Windows 安裝臨時檔案",
		sysDumpFile:"記憶體轉存檔案",
		
    };
    return dictionary;
});