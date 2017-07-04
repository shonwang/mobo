define('chinese:pcclean', function(require, exports, module){
    var dictionary = {
		//浏览器缓存
        ieTemp:"IE浏览器缓存",//临时文件夹"
        chromeHistory:"Chrome浏览器缓存",
        firefoxHistory:"Firefox浏览器缓存",
        
        ieVisited:"访问网址记录",
        ieAddress:"地址栏",
        ieHistory:"Internet Explorer 历史记录",
        iePwd:"Internet Explorer 自动保存的密码",
        ieForm:"Internet Explorer 自动保存的表单",
        chromePwd:"Chrome  自动保存的密码",
        chromeForm:"Chrome  自动保存的表单",
        firefoxPwd:"Firefox 自动保存的密码",
        firefoxForm:"Firefox 自动保存的表单",
        
        //痕迹清理
        windowsTemp:"Windows使用痕迹",//Windows临时文件夹
        
        runDlg:"\"运行\"对话框历史纪录",
        visitedDir:"最近运行程序的历史纪录",
        openSaveHistory:"文件打开与保存历史记录",
        winAndSize:"窗口位置与大小历史纪录",
        rencentUseReg:"最近打开的文档历史记录(注册表)",
        rencentUseFile:"最近打开的文档历史记录(文件)",
        fileExtHistory:"文件扩展名历史记录",
        recentProgHistory:"最近打开程序历史记录",
        noticeIconHistory:"通知区域图标历史记录",
        networkDrivesHistory:"网络驱动器映射历史纪录 ",
        findComputerHistory:"查找计算机历史纪录",
        findDocumentHistory:"查找文档历史纪录",
        findPrinterHistory:"查找打印机历史纪录",
        windowsLog:"Windows日志文件",   
        regVisitePos:"注册表编辑器最后访问的位置 ",
        windowsRegHistory:"Windows注册表流历史纪录",
        gooleToolbar:"Google工具栏",
        regAccessHistory:"程序注册表访问历史记录",
        windowMemoryDump:"Windows内存转存文件",
        clipBoard:"Windows 剪贴板",
        windowsSearchHistory:"Windows 搜索记录",
        netNearBy:"Windows 网上邻居",
        win7forward:"Windows 7 跳转列表",
        winlivesearch:"Windows Live工具条搜索记录",
        winthumbCache:" Windows 画图历史纪录",
        invalidStartMenuLink:"无效的开始菜单快捷方式",
        invalidDesktopLink:"无效的桌面快捷方式",
        invalidDir:"无用的目录<未实现,未定义>",
        scanExtension:"根据扩展名进行扫描",
        
        //第三方应用软件
        bitCometDld:"BitComet下载历史纪录",
        
        kmPlayer:"KMPlayer",
        skype:"Skype",
        line:"Line",
        facebook:"Facebook",
        vicMediaPlayer:"VLC Media Player",
        youtubeDown:"YouTube Downloader",
        mobogenie:"Mobogenie",
        
        //注册表
        regInvalidStartMenu:"无效的开始菜单记录",
        regInvalidMenu:"无效的右键菜单",
        regMuicache:"无效的MUI引用",
        regHelp:"无效的帮助文件",
        regInvalidAppPath:"无效的应用程序路径",
        regInvalidInstall:"残留的软件安装信息",
        regInvalidUninstall:"残留的软件卸载信息",
        regFileAssoc:"无效的文件关联",
        regInvalidFont:"无效的字体",
        regInvalidStartRun:"无效的启动项目",
        regDll:"冗余的动态链接库",
        regCom:"无效的COM组件",
        
        regOpenSaveDlg:"打开对话框历史记录",
        regExtHistory:"无效的文件类型操作记录",
        regWinRar:"Winrar打开历史记录",
        regWinZip:"Winzip打开历史记录",
        regOffice:"Office打开历史记录",
        regStartMenu:"无效的开始菜单",
        regUninstall:"残留的软件卸载信息",
        regInvalidFire:"无效的防火墙设置",
        regInvalidHelp:"无效的帮助菜单",
        regFailActiveX:"无效的ActiveX信息",
        regFailClass:"无效的类信息",
        regRedundancy:"冗余信息",
         
        //回收站文件
        windowsTrash:"Windows 回收站 ",
        garbageRecycle:"回收站文件",
		
    };
    return dictionary;
});