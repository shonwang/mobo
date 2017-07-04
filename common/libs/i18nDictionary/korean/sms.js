define('korean:sms', function(require, exports, module){
    var dictionary = {
        sendTo: '받는 사람',
        characters: '자',
        pressCE: 'Ctrl+Enter를 사용하여 보내기',
        writeMessage: '여기에 메시지를 입력하세요.',
        send: '보내기',
        allGroup: '모든 그룹',
        selectAll: '모두 선택',
        removeAll: '모두 제거',
        emptyInfo:'친구에게 텍스트 메시지를 보내세요.',
        newMessage: '새 메시지',
        msgSelected: '{0} 개 메시지 선택됨',
        promptDelete: '선택한 {0}개 세션({1}개 메시지)을 삭제하시겠습니까?',
        importLable: "가져오기",
        exportLabel: "내보내기",
        deleteLabel: "삭제",
        refreshLabel: "새로 고침",
        addContact: "연락처 추가",
        editContact: "연락처 편집",
        loadMore: "더 보기",
        /*2014-5-30*/
       	contacts: '{0} 개 연락처 선택됨',
        contactName:"연락처 이름 또는 전화 번호",

        selectedMsgLabel: "선택한 메시지({0})",
        allMsgLabel: "모든 메시지({0})",

        exportSuccess:"{0}개 메시지를 내보냈습니다.",
        exportFailed:"{0}개 메시지 내보내기 성공, {1}개 메시지 내보내기 실패:",
        /*2014-5-31*/
        deleteFailed:"{0}개 메시지 삭제 성공, {1}개 메시지 삭제 실패: ",
        /*2014-6-18*/
        markasRead:"읽은 상태로 표시",
        /*2014-07-22*/
       smsPermissionNotice:"보안 앱에서 SMS 승인을 차단했을 수 있습니다. [승인 관리]에서 승인을 허용하십시오.",
       emptySMS:"기기에 메시지가 없습니다.",
    };
    return dictionary;
});
