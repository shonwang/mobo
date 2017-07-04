﻿define('chinese:setting', function(require, exports, module){
    var dictionary = {
    	aboutMe:'关于 Mobogenie',
		aboutMeVersion:'版本: {0}',
		MGWebsite:'网站：',
		MGForums:'论坛：',
		aboutMeLinkPolicy: '隐私政策',
		aboutMeLinkEULA: '用户许可协议',
		aboutMeLinkTOS: '服务条款',
		aboutMeFootText: '©2014 Mobogenie.com版权所有',
		feedback:'反馈',
        fbFootText: '您的反馈对我们非常重要！',
        fbTextareaFailed: '请输入反馈内容！',
        fbNameFailed: '请输入姓名！',
        fbEmailFailed: '请输入电子邮件！',
        fbEmailFormatFailed: '无效的电子邮件！',
        fbSelectType:"请选择一个反馈类型！",
        BtnSubmit: '提交',
        fbSuccessTitle: '感谢您的反馈！',/*不超过45个字符*/
        fbSuccessText: '我们的客户服务人员会尽快给您回复，所以请确保您的联系方式可用。',/*不超过150个字符*/
        fbSuccessClose: '关闭{0}',
        setting: '设置',
        checkForUpdates: '检查更新',
        whatNew: '新特性',
        ContactUs: '联系我们',
        
		generalLabel: '常规设置',
		LocationsLabel: '目录设置',
		AppllicationsLabel: '应用相关',
		remindersLabel: '提醒设置',
		Language: '语言',
		generalStartupTitle: '启动程序时',
		generalStartupText:'自动继续未完成的任务',
		generalConnetTitle: '检测有手机连接时',
		generalConnetText: '始终打开Mobogenie',
		generalConnetTextTwo: ' 自动安装已下载的应用程序',
		generalCloseTitle: '关闭客户端时',
		generalCloseText: '最小化客户端到系统托盘',
		generalCloseTextTwo: '直接退出客户端',
		generalCloseTextThree: '每次提醒我',
		generalUpdateTitle: '客户端更新',
		generalUpdateText: '自动更新客户端至最新版本',
		locationsResource: '下载文件目录',
		locationsBackup: '备份文件目录',
		locationsScreen: '截屏图片目录',
		locationsBtn: '浏览',
		appllicationsFileTitle: '文件关联',
		appllicationsFileText: '每次启动时始终检查是否关联APK文件',
        appllicationsLatestTitle: '自动更新至最新的应用程序',
		appllicationsLatestText: '自动下载最新的可更新应用程序',
		appllicationsDefaultTitle: '默认安装位置',
		appllicationsDefaultText: ' 自动（如果安装到SD卡上失败，则安装到手机内存）',
		appllicationsDefaultTextTwo: '手机内存',
		appllicationsDefaultTextThree: '外置SD卡（仅支持Android 2.2及以上）',
		remindersUpdateTitle: '应用程序更新',
		remindersUpdateText:'每{0}天提醒我有可更新的应用程序',
		remindersBackupText:'每{0}天提醒我备份我的设备数据',
		remindersUpdateTextTwo: '永远不要提醒我',
		remindersBackupTitle: '备份',
		remindersPopularTitle: '推送活动',
		remindersPopularText: '如果有新的活动提醒我',
		/*5-24*/
		swicthSiteLabel:'站点',
		/*5-26*/
		settingTip:"菜单",
		/*7-21*/
		fbModelName: '设备型号',
		fbOsVersion: 'Android系统版本',
		/*7.22*/
		fbType1:"Can't activate debugging.",
		fbType2:"Failed to install driver.",
		fbType3:"Can't connect my device.",
		fbType4:"Slow downloads.",
		fbType5:"Unable to root my phone.",
		fbType6:"Low quality resources.",
		fbType7:"I didn't install this app.",
		fbType8:"Suggestions",
		fbType9:"Other",
		fbTextarea: "Describe your problem:",
		fbTypePrompt1:"Describe your problem. For example, \"I don\'t know how to activate USB debugging\".",
		fbTypePrompt2:"Have you activated USB debugging? If so, tell us your phone model and Android version. We'll try our best to solve the problem for you.",
		fbTypePrompt3:"Describe your problem and tell us your phone model and Android version.",
		fbTypePrompt4:"Which particular resources are downloading slowly? Have you experienced any other problems?",
		fbTypePrompt5:"What's the problem? Examples: low quality resources, unable to download resources, unable to install, etc.",
		fbTypePrompt6:"Mobogenie was automatically downloaded while I was visiting a website. The website address is: ",
		fbTypePrompt7:"Tell us your suggestions. Examples: I don't like this function, I want these resources, or any other suggestions.",
		fbTypePrompt8:"Talk to us, and we'll try our best to meet your requirements.",
		/*2014-9-9*/
		upload:"Upload"
    };
    return dictionary;
});