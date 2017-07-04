/**
 * @author liujintao
 * @descript 多线程处理联系人相关的复杂逻辑处理，
 * 接受数据格式形如{
 *     todo :"something todo name",
 *     reqData:{the data source object todo}
 * },
 * 回调数据形如{
 *     action:"the response name for todo result",
 *      resData:{the data calculate result for response}
 * }
 * workerList now:
 * calGroups:计算联系人的分组信息，
 * parseSms ： 查找联系人列表对应的短信信息，并将短信以map形式返回，key为电话号
 * searchContact：搜索联系人，根据号码sContactNumber或者姓名sDisplayName进行搜索，
 *                         传入格式为{sContactNumber:"10086",sDisplayName:"China Mobile"},
 * filterContacts:accountName,groupId 根据accountName和groupId筛选联系人,groupId为0时筛选账号下所有，为负时，同为未分组
 */
onmessage = function(message) {
    var data_response = [];
    if (message.data.todo == "parseList") {
        var contactList = message.data;
        for (var i = 0; i < contactList.length; i++) {
            var item = contactList[i];
            var new_contact = {
                readOnly : item.isSim || false,
                sDisplayName : item.sDisplayName || "",
                sContactId : item.sContactId || "",
                sContactIcon : 'common/images/ico/default-avatar.png',
                sNote : item.sNote || "",
                sGroup:[],
                sContactNumber : item.sContactNumber || [],
                sContactEmail : item.sContactEmail || []
            };
            data_response.push(new_contact);
        }
        /*将处理结果返回*/
        postMessage({
            action : "parseList",
            list : data_response
        });
    } else if (message.data.todo == "calGroups") {
        /*计算group信息*/
        var contactList = message.data.contactList;
        /*账号信息*/
        var accountMap = message.data.accountMap;
        
        var groupMapTemp = {};
        var accountKeys = Object.keys(accountMap);
        
        for (var i = 0; i < accountKeys.length; i++) {
            if (accountKeys[i] == "all") {
                continue;
            }
            var groupList = accountMap[accountKeys[i]].groupList || [];
            /*分组基本信息*/
            for (var k = 0; k < groupList.length; k++) {
                //包含的联系人
                var contactIds = groupList[k].contactIds;

                contactIds&&contactIds.forEach(function(contactId) {
                    
                    if (groupMapTemp[contactId]) {//如果已经存在该countactId
                        groupMapTemp[contactId]["accountName"] = groupList[k].accountName;
                        groupMapTemp[contactId]["sGroup"].push({
                            groupId : groupList[k].groupId,
                            groupName : groupList[k].groupName
                        });
                    } else {
                        groupMapTemp[contactId] = {//如果不存在该countactId
                            "accountName" : groupList[k].accountName,
                            "sGroup" : [{
                                groupId : groupList[k].groupId,
                                groupName : groupList[k].groupName
                            }]
                        }
                    }
                });

            }
        }
        /*将处理结果返回*/
        postMessage({
            action : "calGoups",
            groupMap : groupMapTemp
        });
    } else if (message.data.todo == "parseSms") {
        /*短信映射表*/
        var smsMapTemp = {};
        var smsList = message.data.smsList||[];
        smsList.forEach(function(smsContactItem) {
            smsMapTemp[smsContactItem.sContactNumber] = smsContactItem;
        });

        /*将处理结果返回*/
        postMessage({
            action : "parseSms",
            smsMap : smsMapTemp
        });
    }else if(message.data.todo=="searchContact"){
        var resultTemp =[];
        var contactList = message.data.contactList;
        var sContactNumber = message.data.sContactNumber;
        var sDisplayName = message.data.sDisplayName;
        /*遍历数组*/
        contactList.forEach(function(contact){
            if(sContactNumber){
                var contactNumbers = contact.sContactNumber;
                if(contactNumbers&&contactNumbers.length>0){
                    for(var i=0;i<contactNumbers.length;i++){
                        if(contactNumbers[i].value==sContactNumber){
                            resultTemp.push(contact);
                            continue;
                        }
                    }                    
                }
            }else if(sDisplayName){
                if(contact.sDisplayName==sDisplayName){
                    resultTemp.push(contact);
                }
            }
        });
        
                /*将处理结果返回*/
        postMessage({
            action : "searchContact",
            contactList : resultTemp
        });
        
    }else if(message.data.todo=="filterContacts"){
        var contactList = message.data.contactList;
        var accountName = message.data.accountName;
        var groupId = message.data.groupId;
        
        console.log("worker中接到数据：");
        console.log("accountName:"+accountName);
        console.log("groupId:"+groupId);
        
        var resultTemp=[];
        
        contactList&&contactList.forEach(function(contact){
            
            if(contact.accountName==accountName){
                
                //如果没有传入groupId，取账号下所有联系人
                if(!groupId||groupId=="0"){
                    resultTemp.push(contact);
                }else{
                    
                    var sGroup = contact.sGroup;
                    sGroup&&sGroup.forEach(function(group){
                        if(group.groupId==groupId){
                            resultTemp.push(contact);
                        }
                    });
                }
            }
        });
        
        /*将处理结果返回*/
        postMessage({
            action : "filterContacts",
            contactList : resultTemp
        });
        
    }

}