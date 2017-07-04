/**
 * @author liujintao
 */
define('hindi:fileManager', function(require, exports, module){
    var dictionary = {
        ImportFile: 'फ़ाइलें आयात करें',
        ImportDirectory: 'फ़ोल्डर आयात करें',
        sureDelete : "क्या आप वाकई चयनित फ़ाइलों/फ़ोल्डर्स को हटाना चाहते हैं?",
        
        exportingTitle:"निर्यात हो रहा है, कृपया डिवाइस को कनेक्टेड रखें",
        deletingTitle:"हटाया जा रहा है, कृपया डिवाइस को कनेक्टेड रखें",
        /*2014-07-26*/
        copingTitle:"कृपया डिवाइस को कनेक्टेड रखें",
        copySuccess:"फ़ाइलों की प्रतिलिपि बनाना सफल",
        sdCard:'SD कार्ड',
        extSdCard:'बाह्य SD कार्ड',
        pasteLabel:"चिपकाएँ",
        newFolder:"नया फ़ोल्डर",
        /*2014-08-04*/
       selectMultiInfo:"{0} फ़ोल्डर्स, {1} फ़ाइलें चयन की गई",
       selectDirectoryInfo:"{0} फ़ोल्डर्स, {1} फ़ाइलें ",
       sdCardUsage:"कुल: {0}, उपलब्ध: {1}",
       sizeLabel:"आकार: {0}",
       modifiedTime:"संशोधित समय: {0}",
       /*2014-08-08*/
       importingTitle:'आयात जारी है, फ़ोन कनेक्टेड रखें',
	   /*2014-08-11*/
       noSdCardNotice:'SD कार्ड पढ़ने में विफल, कृपया सुनिश्चित करें कि आपके डिवाइस पर SD कार्ड उपलब्ध है.',
       confirmFileReplace:'{0} पहले से मौजूद है. क्या आप वाकई इसे बदलना चाहते हैं?',
       /*2014-08-18*/
	   deleteFailed:"{0} फ़ाइलें / फ़ोल्डर सफलतापूर्वक डिलीट कर दिया,{1} डिलीट करने में विफल:",
       importFailed:"{0}  फ़ाइलें / फ़ोल्डर सफलतापूर्वक इम्पोर्ट कर दिया,{1} इम्पोर्ट करने में विफल:",
	   createFolderFailed:"फ़ोल्डर बनाने मै विफल",
       exportFailed:"{0}  फ़ाइलें / फ़ोल्डर सफलतापूर्वक एक्सपोर्ट कर दिया,{1} एक्सपोर्ट करने में विफल:",
       copyFailed:"{0}  फ़ाइलें / फ़ोल्डर सफलतापूर्वक कॉपी कर दिया,{1} कॉपी करने में विफल:",
       /*2014-08-21*/
      renameFailed:"नाम बदलने में विफल",
      spaceFailed:"विफल हुआ. अपर्याप्त स्थान.",
      nosdcontent:"यह फ़ोल्डर खाली है।",
       /*2014-09-11*/
       specailCharNotice:'निम्न वर्ण एक फ़ोल्डर नाम में अनुमति नहीं है: | / \ *?" <>',//重命名
       renameRepeatNotice:'फोल्डर नाम [{0}] पहले से ही मौजूद है. दूसरा नाम दर्ज करें.',//重命名已存在
       renameLabel:"नाम बदलने",
       openingTitle:'Opening. कृपया अपने डिवाइस को कनेक्ट करके रखें', 
       fileExtChangeNotice:'यदि आप फ़ाइल नाम एक्सटेंशन बदलते हैं, तो फ़ाइल अनुपयोगी हो सकती है. क्या आप वाकई इसे बदलता चाहते हैं?',//后缀变更
       openHeader:"फ़ाइल खोलें",
       openingFailed:"फ़ाइल खोलने में विफल रहा",    
       /*2014-10-15*/
      cMemoryLess:"Not enough space on the C drive. Please free up some space before opening videos, music etc."      
    };
    return dictionary;
});
