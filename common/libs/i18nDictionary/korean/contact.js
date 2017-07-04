define('korean:contact', function(require, exports, module){
    var dictionary = {
        sideLabel: '연락처',
        message: '메시지',
        music: '내 음악',
        photo: '내 사진',
        video: '내 비디오',
        backup: '백원 및 복원',
        ChangeIcon:'변경',
        MessageRecord:'메시지 기록',
        Note:'참고',
        Save:'저장',
        Edit:'편집',
        Cancel:'취소',
        inputhere:'여기 입력',
        ContactSelected:'<span class="contacts-count selectedNum f18">{0}</span> 개 연락처 선택됨',
        SendMessage:'메시지 보내기',
        Filter:'필터',
        AllContacts:'모든 연락처',
        AllGroups:'모든 그룹',
        NewContact:'새 연락처',
        ContactInfomation:'연락처 정보',
        //add 2014-03-24
        sureDeleteTitle:'선택한 {0}개 연락처를 삭제하시겠습니까?',
        deleteFailed:"삭제하지 못했습니다.",
        
        importingTitle:'가져오는 중입니다. 휴대폰을 연결된 상태로 두십시오',
        importHeader:"연락처 가져오기",
        
        exportSuccess:"{0}개 연락처를 내보냈습니다.",
        exportFailed:"내보내지 못했습니다.",
        
        addContactText:'연락처를 추가하고, 전화 번호를 검색하여 텍스트 메시지를 보내세요.',
        newContact: '새 연락처',
        writeMessage:'여기에 메시지를 입력하세요...',
        Mobile: '휴대폰',
        //add 2014-04-09
        deletingTitle:'삭제하는 중입니다. 휴대폰을 연결된 상태로 두십시오.',
        //2014-5-26
        addTipText:"추가",
        accountLabel:"계정: ",
        emptyContact:"휴대폰에 연락처가 없습니다.",
        //2014-05-29
        deleteTipText:"삭제",
        smsTipText:"SMS",
        
        importFailed:"연락처 가져오기 성공: {0}개, 가져오기 실패: {1}",
        exportHeader:"연락처 내보내기",
        exportAll:"모든 연락처 <em class='c-9'>({0})</em>",
        exportSelect:"선택한 연락처 <em class='c-9'>({0})</em>",
        //2014-06-03
        editgroup:"그룹 편집",
        notassigened:"지정되지 않음",
        saveFailed:'연락처를 저장하지 못했습니다. 나중에 다시 시도해 보세요.',
        //2014-06-11
        fileError:'실패함. 잘못된 vcf 파일',
        groupText:'그룹',
        /*2014-07-22*/
       contactPermissionNotice:"보안 앱에서 연락처 승인을 차단했을 수 있습니다. [승인 관리]에서 승인을 허용하십시오.",
       //2014-08-18 保存分组失败
       saveGroupFailed:'그룹 저장에 실패하였습니다. 잠시후에 다시 시도하세요 '
    };
    return dictionary;
});
