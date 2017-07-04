//扩展Date format方法
Date.prototype.format = function(fmt) { 
  var o = { 
     "M+" : this.getMonth()+1,                 //月份 
     "d+" : this.getDate(),                    //日 
     "h+" : this.getHours(),                   //小时 
     "m+" : this.getMinutes(),                 //分 
     "s+" : this.getSeconds(),                 //秒 
     "q+" : Math.floor((this.getMonth()+3)/3), //季度 
     "S"  : this.getMilliseconds()             //毫秒 
  }; 
  
  if(/(y+)/.test(fmt)) 
      fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  for(var k in o) 
      if(new RegExp("("+ k +")").test(fmt)) 
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
  return fmt; 
};

//获取所在列表的屏幕数据
var getPictureInList = function(index, rows, columns, threadList){
    //当前遍历到的索引
    
    var maxCount = Math.ceil(rows * columns);
    var dataList = [];
    
    var threadIndex = 0;
    var threadDataIndex = 0;
    
    
    var curIndex = -1;
    var preIndex = -1;
    
    for(var i=0; i < threadList.length; i++){
        //会话列表
        var pictureList = threadList[i].list;
         
        //会话列表占用的行数
        var threadRows = Math.ceil(pictureList.length / columns);
        
        console.log('curindex---------------');
        
        curIndex  += threadRows;
        
        console.log(threadRows);
        console.log(index);
        console.log(curIndex);
        console.log(preIndex);
        
        if(curIndex >= index){
            var diff = index - preIndex - 1;//相差的索引个数
            threadIndex = i; 
            threadDataIndex = diff * columns;
            break;
        }else{
            preIndex += threadRows;
        }
    }
    
    console.log('index==========');
    console.log(threadIndex);
    console.log(threadDataIndex);
    
    
    var totalCount = 0;
    for(var j=threadIndex; j < threadList.length; j++){
        var thread = threadList[j];
        var sliceThreadList;
        
        if(j === threadIndex){
            sliceThreadList = thread.list.slice(threadDataIndex, threadDataIndex + maxCount);
            thread.list = sliceThreadList;
            dataList.push(thread);
            totalCount += sliceThreadList.length;
        }else{
            sliceThreadList = thread.list.slice(0,  maxCount - totalCount);
            thread.list = sliceThreadList;
            
            dataList.push(thread);
            totalCount += sliceThreadList.length;
        }
        if(totalCount >= maxCount){
            break;
        }
    }
    return dataList;
};
/*将列表转为年月日格式数组*/
var convertListToThreadStructure = function(list){
    var latestYearMonth;//最新的年月
    var convertList = [];
    var tempMap = {};
    
    var date = new Date();
    
    var ids = [];
        
    list.forEach(function( item ){
        date.setTime(parseInt(item.sPictureDate));//当前图片的日期
        var ym = date.format('yyyy-MM');
        var curDate = new Date();
        var curYm = curDate.format('yyyy-MM');
        
        ids.push(item.id);
        
        if(curYm == ym){
            latestYearMonth = latestYearMonth || ym;//当前最新年月
        }
        
        item.timestamp = ym;
        
        if(latestYearMonth == ym){
            var latestYmd = date.format('yyyy-MM-dd');
            
            if(!tempMap[latestYmd]){
                tempMap[latestYmd] = {
                    strong: date.format('dd'),
                    second: date.format('/MM/yyyy'),
                    threadId: date.format('dd/MM'),
                    isLatest: true,
                    list: []
                };
            }
            tempMap[latestYmd].list.push(item);
            
            if(convertList.indexOf(tempMap[latestYmd]) == -1){
                convertList.push(tempMap[latestYmd]);
            }
            
        }else{
            tempMap[ym] = tempMap[ym] || {
                strong: date.format('MM'),
                second: date.format('/yyyy'),
                isLatest: false,
                threadId: date.format('dd/MM/yyyy'),
                list: []
            };
            tempMap[ym].list.push(item);
            
            if(convertList.indexOf(tempMap[ym]) == -1){
                convertList.push(tempMap[ym]);
            }
        }
    });
    
    convertList.forEach(function(thread){
        thread.count = thread.list.length;
    });
    
    return {
        convertList: convertList,
        ids: ids,
        originList: list
    };
};

onmessage = function(ev){
    var data = JSON.parse(ev.data);
    //解析列表的
    if(data.action == 'parselist'){
        var list = data.list;
        
        //按时间降序排列
        list.sort(function(a, b){
            a.sPictureDate = parseInt(a.sPictureDate);
            b.sPictureDate = parseInt(b.sPictureDate);
            
            return b.sPictureDate - a.sPictureDate;
        });
        
        var cvt = convertListToThreadStructure(list);
        
        var response = {
            action: data.action,
            result: cvt.convertList,
            ids: cvt.ids,
            originList: cvt.originList
        };
        postMessage(response);
        
    //屏幕数据处理    
    }else if(data.action == 'getScreenData'){
        var list = getPictureInList(data.index, data.rows, data.columns, data.dataList);
        postMessage({
            action: data.action,
            result: list
        }); 
    //遍历已经选择的数据
    }else if(data.action == 'iterateCheckedListData'){
        var checkedIds = data.checkedIdList;
        var dataList = data.dataList;
        
        var checkedDataList = [];
        checkedIds.forEach(function(id){
            for(var i=0; i < dataList.length; i++){
                var list = dataList[i].list;
                for(var j=0; j < list.length; j++){
                    if(list[j].id == id){
                        checkedDataList.push(list[j]);
                        break;
                    }
                }
            }
        });
        postMessage({
            action: data.action,
            result: checkedDataList
        }); 
    }else if(data.action === 'deletePicture'){
        var dataList = data.dataList;
        for(var i=0; i < dataList.length; i++){
            var list = dataList[i].list;
            for(var j=0; j < list.length; j++){
                if(list[j].id == data.id){
                    list.splice(j, 1);
                    j--;
                    dataList[i].count--;
                }
            }
            if(list.length === 0){
                dataList.splice(i,1);
                i--;
            }
        }
        postMessage({
            action: data.action,
            result: dataList
        }); 
    }
};