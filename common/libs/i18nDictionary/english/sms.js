define('english:sms', function(require, exports, module){
    var dictionary = {
        sendTo: 'Send to',
        characters: 'character(s)',
        pressCE: 'Press Ctrl+Enter to send',
        writeMessage: 'Write message here.',
        send: 'Send',
        allGroup: 'All Group',
        selectAll: 'Select All',
        removeAll: 'Remove All',
        emptyInfo:'Send a text message to your friend.',
        newMessage: 'New Message',
        msgSelected: '{0} Message(s) Selected',
        promptDelete: 'Are you sure you want to delete selected {0} sessions ({1} messages)?',
        importLable: "Import",
        exportLabel: "Export",
        deleteLabel: "Delete",
        refreshLabel: "Refresh",
        addContact: "Add Contact",
        editContact: "Edit Contact",
        loadMore: "Load more",
        /*2014-5-30*/
       	contacts: '{0} contact(s) selected',
        contactName:"Contact name or phone number",

        selectedMsgLabel: "Selected messages ({0})",
        allMsgLabel: "All messages ({0})",

        exportSuccess:"Exported {0} messages successful.",
        exportFailed:"Export {0} messages successful, failed to export {1}: ",
        /*2014-5-31*/
        deleteFailed:"Delete {0} messages successful, failed to delete {1}: ",
        /*2014-6-18*/
        markasRead:"Mark as read",
        /*2014-07-22*/
       smsPermissionNotice:"SMS permissions may have been blocked by a security application. Please allow permissions in [Permission Management]",
       emptySMS:"There are no messages on your device.",
    };
    return dictionary;
});
