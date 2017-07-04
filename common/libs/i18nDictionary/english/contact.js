define('english:contact', function(require, exports, module){
    var dictionary = {
        sideLabel: 'Contacts',
        message: 'Messages',
        music: 'My Music',
        photo: 'My Photo',
        video: 'My Video',
        backup: 'Backup&Restore',
        ChangeIcon:'Change',
        MessageRecord:'Message Record',
        Note:'Note',
        Save:'Save',
        Edit:'Edit',
        Cancel:'Cancel',
        inputhere:'input here',
        ContactSelected:'<span class="contacts-count selectedNum f18">{0}</span> Contacts Selected',
        SendMessage:'Send Message',
        Filter:'Filter',
        AllContacts:'All Contacts',
        AllGroups:'All Groups',
        NewContact:'New Contact',
        ContactInfomation:'Contact Infomation',
        //add 2014-03-24
        sureDeleteTitle:'Are you sure you want to delete selected {0} contacts?',
        deleteFailed:"Failed to delete.",
        
        importingTitle:'Importing in process, keep phone connected',
        importHeader:"Import Contact(s)",
        
        
        exportSuccess:"Exported {0} contacts successful.",
        exportFailed:"Failed to export.",
        
        addContactText:'Add contacts, search phone book and send text messages. ',
        newContact: 'New Contact',
        writeMessage:'Wirte your message here...',
        Mobile: "Mobile",
        //add 2014-04-09
        deletingTitle:'Delete in process, keep phone connected',
        //2014-5-26
        addTipText:"New",
        accountLabel:"Account : ",
        emptyContact:"There are no contacts on your device.",
        //2014-05-29
        deleteTipText:"Delete",
        smsTipText:"Send Message",
        
        importFailed:"Import {0} contacts successful,failed to import {1}",
        exportHeader:"Export Contact(s)",
        exportAll:"All contacts <em class='c-9'>({0})</em>",
        exportSelect:"Selected contacts <em class='c-9'>({0})</em>",
        //2014-06-03
        editgroup:"Edit Group",
        notassigened:"Not Assigened",
        saveFailed:'Failed to save contact. Please try later.',
        //2014-06-11
        fileError:'Failed. Invalid vcf file',
        groupText:'Group',
        
        /*2014-07-22*/
       contactPermissionNotice:"Contact permissions may have been blocked by a security application. Please allow permissions in [Permission Management]",
       //2014-08-18 保存分组失败
       saveGroupFailed:'Failed to save group. Please try later.',
    };
    return dictionary;
});
