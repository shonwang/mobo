define('cleanConfig', function(require, exports, module){
	var cleanList = {
        //浏览器缓存
            1001:{id:1001,name:"ieTemp",subcategory:101,category:1,index:1,display:1,type:1,isSubcateFlag:1},
            1002:{id:1002,name:"ieVisited",subcategory:102,category:1,index:1,display:0,type:1},
            1003:{id:1003,name:"ieCookie",subcategory:103,category:1,index:1,display:0,type:1,isSubcateFlag:0},
            1004:{id:1004,name:"ieAddress",subcategory:104,category:1,index:1,display:0,type:1,isSubcateFlag:0},
            1005:{id:1005,name:"ieIndexData",subcategory:105,category:1,index:1,display:0,type:1,isSubcateFlag:0},
            1006:{id:1006,name:"ieHistory",subcategory:106,category:1,index:1,display:0,type:1,isSubcateFlag:0},
            1007:{id:1007,name:"chromeHistory",subcategory:107,category:1,index:1,display:1,type:1,isSubcateFlag:1},
            1008:{id:1008,name:"firefoxHistory",subcategory:108,category:1,index:1,display:1,type:1,isSubcateFlag:1},
            1009:{id:1009,name:"iePwd",subcategory:109,category:1,index:1,display:0,type:1,isSubcateFlag:0},
            1010:{id:1010,name:"ieForm",subcategory:110,category:1,index:1,display:0,type:1,isSubcateFlag:0},
            1011:{id:1011,name:"chromePwd",subcategory:111,category:1,index:1,display:0,type:1,isSubcateFlag:0},
            1012:{id:1012,name:"chromeForm",subcategory:112,category:1,index:1,display:0,type:1,isSubcateFlag:0},
            1013:{id:1013,name:"firefoxPwd",subcategory:113,category:1,index:1,display:0,type:1,isSubcateFlag:0},
            1014:{id:1014,name:"firefoxForm",subcategory:114,category:1,index:1,display:0,type:1,isSubcateFlag:0},
            1015:{id:1015,name:"firefoxCookie",subcategory:115,category:1,index:1,display:0,type:1,isSubcateFlag:0},
            1016:{id:1016,name:"chromeCookie",subcategory:116,category:1,index:1,display:0,type:1,isSubcateFlag:0},
            
            
            
        // 系统使用痕迹清理
			2001:{id:2001,name:"rencentUseFile",subcategory:201,category:2,index:1,display:1,type:1,isSubcateFlag:1},//最近打开的文档历史记录
			2002:{id:2002,name:"gooleToolbar",subcategory:202,category:2,index:1,display:1,type:1,isSubcateFlag:1},//Google工具栏
			2003:{id:2003,name:"regAccessHistory",subcategory:203,category:2,index:1,display:1,type:1,isSubcateFlag:1},//程序注册表访问历史记录
			2004:{id:2004,name:"windowsSearchHistory",subcategory:204,category:2,index:1,display:1,type:1,isSubcateFlag:1},//Windows 搜索记录
			2005:{id:2005,name:"win7forward",subcategory:205,category:2,index:1,display:1,type:1,isSubcateFlag:1},//Windows 7 跳转列表
			2006:{id:2006,name:"winthumbCache",subcategory:206,category:2,index:1,display:1,type:1,isSubcateFlag:1},//Windows 画图历史纪录
			
			
		//第三方应用软件
			2028:{id:2028,name:"bitCometDld",subcategory:301,category:3,index:1,display:1,type:1,isSubcateFlag:1}, //  BitComet下载历史纪录
			2029:{id:2029,name:"kmPlayer",subcategory:302,category:3,index:1,display:1,type:1,isSubcateFlag:1}, //  KMPlayer
			2030:{id:2030,name:"skype",subcategory:303,category:3,index:1,display:1,type:1,isSubcateFlag:1},//  Skype
			2031:{id:2031,name:"line",subcategory:304,category:3,index:1,display:1,type:1,isSubcateFlag:1},//  Line
			2032:{id:2032,name:"facebook",subcategory:305,category:3,index:1,display:1,type:1,isSubcateFlag:1},//  Facebook
			2033:{id:2033,name:"vicMediaPlayer",subcategory:306,category:3,index:1,display:1,type:1,isSubcateFlag:1},//  VLC Media Player
			2034:{id:2034,name:"youtubeDown",subcategory:307,category:3,index:1,display:1,type:1,isSubcateFlag:1},//  YouTube Downloader
			2035:{id:2035,name:"mobogenie",subcategory:308,category:3,index:1,display:1,type:1,isSubcateFlag:1},//  Mobogenie
			/*10-21新增*/
			2036:{id:2036,name:"flashClean",subcategory:309,category:3,index:1,display:1,type:1,isSubcateFlag:1},// flash缓存
			2037:{id:2037,name:"appleLogClean",subcategory:310,category:3,index:1,display:1,type:1,isSubcateFlag:1},//  Apple 软件日志文件
			2038:{id:2038,name:"msseLogClean",subcategory:311,category:3,index:1,display:1,type:1,isSubcateFlag:1},// Microsoft Security Essentials日志
			
            
        //注册表
            4001:{id:4001,name:"regDll",subcategory:401,category:6,index:1,display:1,type:0,isSubcateFlag:1},
            4002:{id:4002,name:"regOpenSaveDlg",subcategory:402,category:6,index:1,display:1,type:0,isSubcateFlag:1},
            4003:{id:4003,name:"regExtHistory",subcategory:403,category:6,index:1,display:0,type:0,isSubcateFlag:1},
            4004:{id:4004,name:"regWinRar",subcategory:404,category:6,index:1,display:0,type:0,isSubcateFlag:1},
            4005:{id:4005,name:"regWinZip",subcategory:405,category:6,index:1,display:0,type:0,isSubcateFlag:1},
            4006:{id:4006,name:"regOffice",subcategory:406,category:6,index:1,display:0,type:0,isSubcateFlag:1},
            4007:{id:4007,name:"regStartMenu",subcategory:407,category:6,index:1,display:0,type:0,isSubcateFlag:1},
            4008:{id:4008,name:"regMuicache",subcategory:408,category:6,index:1,display:1,type:0,isSubcateFlag:1},            //缺失的MUI引用
            4009:{id:4009,name:"regHelp",subcategory:409,category:6,index:1,display:1,type:0,isSubcateFlag:1},             //无效的帮助文件
            4011:{id:4011,name:"regUninstall",subcategory:411,category:6,index:1,display:1,type:0,isSubcateFlag:1},             //安装信息残留项
            4012:{id:4012,name:"regFileAssoc",subcategory:412,category:6,index:1,display:0,type:0,isSubcateFlag:1},             //不完整的文件关联
            4013:{id:4013,name:"regCom",subcategory:413,category:6,index:1,display:1,type:0,isSubcateFlag:1},              //没有用的COM组件       
            
            4014:{id:4014,name:"regInvalidMenu",subcategory:414,category:6,index:1,display:0,type:1,isSubcateFlag:1},            //无效右键菜单
            4015:{id:4015,name:"regInvalidAppPath",subcategory:415,category:6,index:1,display:0,type:1,isSubcateFlag:1},            //无效的应用程序路径
            4016:{id:4016,name:"regInvalidFire",subcategory:416,category:6,index:1,display:0,type:1,isSubcateFlag:1},            //无效的防火墙
            4017:{id:4017,name:"regInvalidMui",subcategory:417,category:6,index:1,display:0,type:1,isSubcateFlag:0},             //无效MUI缓存
            4018:{id:4018,name:"regInvalidHelp",subcategory:418,category:6,index:1,display:0,type:1,isSubcateFlag:1},            //无效的帮助菜单
            4019:{id:4019,name:"regInvalidFont",subcategory:419,category:6,index:1,display:0,type:1,isSubcateFlag:1},            //无效的字为实现
            4020:{id:4020,name:"regInvalidInstall",subcategory:420,category:6,index:1,display:0,type:1,isSubcateFlag:1},            //无效的安装程序
            4021:{id:4021,name:"regInvalidUninstall",subcategory:421,category:6,index:1,display:0,type:1,isSubcateFlag:1},            //无效的卸载程序
            4022:{id:4022,name:"regInvalidStartMenu",subcategory:422,category:6,index:1,display:0,type:1,isSubcateFlag:1},            //无效的开始菜单
            4023:{id:4023,name:"regInvalidStartRun",subcategory:423,category:6,index:1,display:0,type:1,isSubcateFlag:1},            //无效的启动项目
            4024:{id:4024,name:"regFailActiveX",subcategory:424,category:6,index:1,display:0,type:1,isSubcateFlag:1},            //错误的ActiveX信息
            4025:{id:4025,name:"regFailClass",subcategory:425,category:6,index:1,display:0,type:1,isSubcateFlag:1},            //错误的类信息
            4026:{id:4026,name:"regRedundancy",subcategory:426,category:6,index:1,display:0,type:1,isSubcateFlag:1},  
            
			/*10-21新增注册表*/
			4027:{id:4027,name:"runDlg",subcategory:427,category:6,index:1,display:0,type:1,isSubcateFlag:1}, //"运行"对话框历史纪录
			4028:{id:4028,name:"visitedDir",subcategory:428,category:6,index:1,display:0,type:1,isSubcateFlag:1}, //最近运行程序的历史纪录
			4029:{id:4029,name:"openSaveHistory",subcategory:429,category:6,index:1,display:0,type:1,isSubcateFlag:1}, //文件打开与保存历史记录
			4030:{id:4030,name:"winAndSize",subcategory:430,category:6,index:1,display:0,type:1,isSubcateFlag:1}, //窗口位置与大小历史纪录
			4031:{id:4031,name:"rencentUseReg",subcategory:431,category:6,index:1,display:0,type:1,isSubcateFlag:1}, //最近打开的文档历史记录(注册表）
			4032:{id:4032,name:"fileExtHistory",subcategory:432,category:6,index:1,display:0,type:1,isSubcateFlag:1}, //文件扩展名历史记录
			4033:{id:4033,name:"recentProgHistory",subcategory:433,category:6,index:1,display:0,type:1,isSubcateFlag:1}, //最近打开程序历史记录
			4034:{id:4034,name:"noticeIconHistory",subcategory:434,category:6,index:1,display:0,type:1,isSubcateFlag:1}, //通知区域图标历史记录
			4035:{id:4035,name:"networkDrivesHistory",subcategory:435,category:6,index:1,display:0,type:1,isSubcateFlag:1}, //网络驱动器映射历史纪录 
			4036:{id:4036,name:"findComputerHistory",subcategory:436,category:6,index:1,display:0,type:1,isSubcateFlag:1}, //查找计算机历史纪录
			4037:{id:4037,name:"findDocumentHistory",subcategory:437,category:6,index:1,display:0,type:1,isSubcateFlag:1}, //查找文档历史纪录
			4038:{id:4038,name:"findPrinterHistory",subcategory:438,category:6,index:1,display:0,type:1,isSubcateFlag:1}, //查找打印机历史纪录
			4039:{id:4039,name:"regVisitePos",subcategory:439,category:6,index:1,display:0,type:1,isSubcateFlag:1}, //注册表编辑器最后访问的位置
			4040:{id:4040,name:"windowsRegHistory",subcategory:440,category:6,index:1,display:0,type:1,isSubcateFlag:1}, //Windows注册表流历史纪录
			4041:{id:4041,name:"netNearBy",subcategory:441,category:6,index:1,display:0,type:1,isSubcateFlag:1}, //Windows 网上邻居
		
			// 系统垃圾清理
			5001:{id:5001,name:"sysWinUpdate",subcategory:501,category:4,index:1,display:1,type:1,isSubcateFlag:1},//Windows自动更新数据库
			5002:{id:5002,name:"sysWinWinsxs",subcategory:502,category:4,index:1,display:1,type:1,isSubcateFlag:1},//Windows winSxs备份缓存
			5003:{id:5003,name:"sysWinIns",subcategory:503,category:4,index:1,display:1,type:1,isSubcateFlag:1},//Windows installer临时缓存
			5004:{id:5004,name:"sysIisLog",subcategory:504,category:4,index:1,display:1,type:1,isSubcateFlag:1},//IIS的日志文件
			5005:{id:5005,name:"sysCryptoapi",subcategory:505,category:4,index:1,display:1,type:1,isSubcateFlag:1},//Windows CryptoAPI 证书缓存
			5006:{id:5006,name:"sysDefender",subcategory:506,category:4,index:1,display:1,type:1,isSubcateFlag:1},//Windows Defender 扫描历史
			5007:{id:5007,name:"sysManifest",subcategory:507,category:4,index:1,display:1,type:1,isSubcateFlag:1},//Windows ManifestCache缓存
			5008:{id:5008,name:"sysWinSearch",subcategory:508,category:4,index:1,display:1,type:1,isSubcateFlag:1},//Windows Search日志
			5009:{id:5009,name:"sysErrorRepopt",subcategory:509,category:4,index:1,display:1,type:1,isSubcateFlag:1},//Windows 错误报告
			5010:{id:5010,name:"sysIconCache",subcategory:510,category:4,index:1,display:1,type:1,isSubcateFlag:1},//Windows 图标缓存
			5011:{id:5011,name:"sysPrefechFile",subcategory:511,category:4,index:1,display:1,type:1,isSubcateFlag:1},//Windows 预读取文件
			5012:{id:5012,name:"sysFontCache",subcategory:512,category:4,index:1,display:1,type:1,isSubcateFlag:1},//Windows 字体缓存文件
			5013:{id:5013,name:"sysSysLog",subcategory:513,category:4,index:1,display:1,type:1,isSubcateFlag:1},//Windows系统日志文件
			5014:{id:5014,name:"sysThumbCache",subcategory:514,category:4,index:1,display:1,type:1,isSubcateFlag:1},//缩略图缓存文件
			5015:{id:5015,name:"sysUpdatePatch",subcategory:515,category:4,index:1,display:1,type:1,isSubcateFlag:1},//系统自动更新时留下的补丁
			5016:{id:5016,name:"sysSystempFile",subcategory:516,category:4,index:1,display:1,type:1,isSubcateFlag:1},//系统临时文件
			5017:{id:5017,name:"sysDefender",subcategory:517,category:4,index:1,display:1,type:1,isSubcateFlag:1},//Windows Defender更新备份缓存
			5018:{id:5018,name:"sysWinOld",subcategory:518,category:4,index:1,display:1,type:1,isSubcateFlag:1},//Windows.Old 备份的文件
			5019:{id:5019,name:"sysInstalltemp",subcategory:519,category:4,index:1,display:1,type:1,isSubcateFlag:1},//Windows 安装临时文件
			5020:{id:5020,name:"sysDumpFile",subcategory:520,category:4,index:1,display:1,type:1,isSubcateFlag:1},//内存转储文件*/
            
            //回收站文件
            6001:{id:6001,name:"windowsTrash",subcategory:601,category:5,index:1,display:1,type:1,isSubcateFlag:1}//回收站
      }
       
      exports.cleanList = cleanList;     
});