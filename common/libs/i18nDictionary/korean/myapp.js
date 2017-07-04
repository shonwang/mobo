define('korean:myapp', function(require, exports, module){
    var dictionary = {
         installAppsLabel: '앱 설치',/*不超过18个字符*/
        moveToSdCardLabel: 'SD 카드로 이동',/*不超过30个字符*/
        tabAppLabel: '앱',/*不超过24个字符*/
        tabUpdatesLabel: '업데이트',/*不超过24个字符*/
        tabSystemLabel: '시스템',/*不超过24个字符*/
        moveLabel: '이동',
        
        appCurrentVersionLabel: '현재 버전:',/*不超过22个字符*/
        appLatestVersionLabel: '최신 버전:',/*不超过22个字符*/
        appLocationLabel: '위치:',/*不超过20个字符*/
        appSizeColonLabel: '크기:',/*不超过22个字符*/
        ratingColonLabel: '평가:',
        
        likeColonLabel: '추천 앱...',/*不超过45个字符*/
        downloadsText: '{0} 다운로드',
        updatingText: '업데이트 중',/*不超过45个字符*/
        uninstallingText: '제거 중',/*不超过12个字符*/
        installingText: '설치 중',
        sureUninstallTip: '선택한 {0}개의 앱을 제거하시겠습니까?',
        uninstalling: '제거가 진행 중입니다. 기기를 연결된 상태로 두십시오.',
        uninstallSuccessText: '성공',
        uninsatllFailed:"{0}개의 앱 제거 성공, {1}개의 앱 제거 실패:",
        
        exportSuccess:"{0}개의 앱을 내보냈습니다.",
        exportFailed:"{0}개의 앱 내보내기 성공, {1}개의 앱 내보내기 실패:",
        
        systemMaskText: '기기를 루팅한 후 시스템 앱을 관리할 수 있습니다.',
        systemMaskCtn: '시스템 앱을 지우면 최대 156.3MB의 여유 공간이 확보됩니다.',
        searchResultTitle:'{0}개의 앱을 찾았습니다.',
        /*2014-5-26*/
        deviceTipText : "기기 메모리",
        sdCardTipText : "SD 카드",
        //06-03
        noapptext:'기기에 앱이 없습니다.',
        noupdatetext:'기기에 업데이트할 수 있는 앱이 없습니다.',
        /*2014-6-18*/
        noappBtnText:'앱 다운로드',
        //08-13
        moving: '이동중이니 설비를 중단하지 마세요',
        moveFailed:"{0}개 앱 이동 성공，실패 {1}개：",
        //08-19
        moveConfirm:"앱을 SD카드로 이동하면 앱을 사용하지 못할수 있습니다. 계속 이동하시겠습니까?",
        //2014-10-14
        wifiUninstallTitle:"핸드폰에서 삭제 조작을 하십시오"
    }
    return dictionary;
});