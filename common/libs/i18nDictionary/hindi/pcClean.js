define('hindi:pcclean', function(require, exports, module){
    var dictionary = {
		//浏览器缓存
        ieTemp:"IE कैश",//临时文件夹"
        chromeHistory:"Chrome कैश",
        firefoxHistory:"Firefox कैश",
        
        //第三方应用软件
        bitCometDld:"BitComet डाउनलोड रिकॉर्ड",
        
        kmPlayer:"KMPlayer",
        skype:"Skype",
        line:"Line",
        facebook:"Facebook",
        vicMediaPlayer:"VLC Media Player",
        youtubeDown:"YouTube Downloader",
        mobogenie:"Mobogenie",
        
        //注册表
        regInvalidStartMenu:"अमान्य प्रारंभ मेनू रिकॉर्ड",
        regInvalidMenu:"अमान्य प्रसंग मेनू प्रविष्टियाँ",
        regMuicache:"अमान्य MUI संदर्भ फ़ाइलें",
        regHelp:"अमान्य मदद फ़ाइलें",
        regInvalidAppPath:"अमान्य एप्लिकेशन पथ",
        regInvalidInstall:"सॉफ़्टवेयर इंस्टॉलेशन रेसिडुअल",
        regInvalidUninstall:"सॉफ़्टवेयर अनइंस्टॉलेशन रेसिडुअल",
        regFileAssoc:"अमान्य फ़ाइल संबद्धता",
        regInvalidFont:"अमान्य फ़ॉन्ट",
        regInvalidStartRun:"अमान्य स्टार्टअप प्रविष्टियाँ",
        regDll:"रिडंडेंट DLL",
        regCom:"अमान्य COM घटक",
        
        regOpenSaveDlg:"डायलॉग खुलने के रिकॉर्ड",
        regExtHistory:"अमान्य फ़ाइल प्रकार खुलने के रिकॉर्ड",        
        regWinRar:"Winrar खुलने के रिकॉर्ड",
        regWinZip:"Winzip खुलने के रिकॉर्ड",
        regOffice:"Office खुलने के रिकॉर्ड",
        regStartMenu:"अमान्य प्रारंभ मेनू प्रविष्टियां",
        regUninstall:"अनावश्यक अनइंस्टॉलेशन जानकारी",
        regInvalidFire:"अमान्य फ़ायरवॉल सेटिंग",
        regInvalidHelp:"अमान्य सहायता मेनू प्रविष्टियां",
        regFailActiveX:"अमान्य ActiveX जानकारी",
        regFailClass:"अमान्य श्रेणी जानकारी",
        regRedundancy:"अतिरिक्त जानकारी",
        
        //回收站文件
        windowsTrash:"रिसाइकलिंग बिन",
        
        //痕迹清理
        rencentUseFile:"हाल ही में खोली गई फ़ाइलें (फ़ाइल)",
        gooleToolbar:"Google टूल बार",
        regAccessHistory:"रजिस्ट्री एक्सेस इतिहास",
        windowsSearchHistory:"खोज रिकॉर्ड",
        win7forward:"Windows 7 जंप लिस्ट",
        winthumbCache:"Windows थंबनेल संचय",
        
        /*10月21新增*/
        //第三方应用软件
        flashClean:"फ़्लैश संचय",
        appleLogClean:"Apple सॉफ़्टवेयर लॉग फ़ाइलें",
        msseLogClean:"Microsoft Security Essentials लॉग",
        //10-21新增注册表
		runDlg:"\"Run\" डायलॉग बॉक्स इतिहास",
		visitedDir:"हाल ही में चलाए गए प्रोग्राम",
		openSaveHistory:"हाल ही में चलाए गए प्रोग्राम",
		winAndSize:"Window स्थिति और आकार इतिहास",
		rencentUseReg:"हाल ही में खोली गई फ़ाइलें (रजिस्ट्री)",
		fileExtHistory:"फ़ाइल एक्सटेंशन इतिहास",
		recentProgHistory:"हाल ही में खोला गया प्रोग्राम इतिहास",
		noticeIconHistory:"सूचना क्षेत्र आइकन इतिहास",
		networkDrivesHistory:"नेटवर्क ड्राइव मैपिंग इतिहास",
		findComputerHistory:"कंप्यूटर खोज इतिहास",
		findDocumentHistory:"फ़ाइल खोज इतिहास",
		findPrinterHistory:"प्रिंटर खोज इतिहास",
		regVisitePos:"Last Regedit Access",
		windowsRegHistory:"Windows रजिस्ट्री इतिहास",
		netNearBy:"नेटवर्क स्थान",
        
		/*10-21新增*/
		// 系统垃圾清理
		sysWinUpdate:"Windows स्वतः अपडेट डेटाबेस",
		sysWinWinsxs:"Windows WinSxS बैकअप संचय",
		sysWinIns:"Windows Installer Temp संचय",
		sysIisLog:"IIS लॉग फ़ाइलें",
		sysCryptoapi:"Windows CryptoAPI प्रमाणपत्र संचय",
		sysDefender:"Windows Defender स्कैन इतिहास",
		sysManifest:"Windows मेनिफ़ेस्ट संचय",
		sysWinSearch:"Windows खोज लॉग",
		sysErrorRepopt:"Windows त्रुटि रिपोर्ट",
		sysIconCache:"Windows आइकन संचय",
		sysPrefechFile:"Windows प्रिफ़ेच फ़ाइलें",
		sysFontCache:"Windows फ़ॉन्ट संचय",
		sysSysLog:"Windows सिस्टम लॉग फ़ाइलें",
		sysThumbCache:"थंबनेल संचय",
		sysUpdatePatch:"सिस्टम स्वतः-अपडेट पैचेस",
		sysSystempFile:"System Temp फ़ाइलें",
		sysDefender:"Windows Defender अपडेट बैकअप संचय",
		sysWinOld:"Windows.Old बैकअप फ़ाइलें",
		sysInstalltemp:"Windows Installation Temp फ़ाइलें",
		sysDumpFile:"मेमोरी डम्प फ़ाइलें",
		
    };
    return dictionary;
});