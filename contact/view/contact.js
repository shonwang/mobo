define("UIContactView", function(require, exports, module) {
    var app = require('app');
    var $ = require('jquery');
    var _ = require('underscore');
    var SuperGrid = require('grid');
    var Window = require("UIWindow");
    var UIMenu = require("UIMenu");
    var apiNames = require('APINames');
    var UIDialog = require('UIDialog');
    var globalConfig = require("globalConfig");
    var utils = require('utils');

    /*grid model*/
    var GridModel = require("gridModel");

    var ContactDetailPanel = require("ContactDetailPanel");
    var contactModel = require("contactModel");
    var connection = require('connectionMgr');
    //进度条组件
    var ProgressWindow = require("ProgressPanel");
    var SMSModel = require("smsModel");
    
    var LoadingPic = require("loading");
    /*国际化字典工具*/
    var i18nDi = require('I18NDI');

    var NameView = app.ViewBase.extend({
        module : module,
        init : function(model) {
            this.model = model;
        },
        render : function(target) {
            var tpl = this.getTpl("tpl-contact-list-item");
            var dom = target.find(".contact-list-item");
            if (dom.length == 0) {
                dom = $(_.template(tpl, {
                    data : this.model.data
                }));
                target.html(dom);
                dom = target.find(".contact-list-item");
            }
            dom.find(".icon").attr("src", this.model.data.sContactIcon || 'common/images/ico/default-avatar.png');
            dom.find(".displayName").html(this.model.data.sDisplayName);
            var numberStr = "";
            var me = this;
            if (this.model.data.sContactNumber&&this.model.data.sContactNumber.length>0) {
                $.each(this.model.data.sContactNumber, function(index, item) {
                    if (index == me.model.data.sContactNumber.length - 1) {
                        numberStr += item.value;
                    } else {
                        numberStr += item.value + ",&nbsp;";
                    }
                });
            } else if (this.model.data.sContactEmail) {
                $.each(this.model.data.sContactEmail, function(index, item) {
                    if (index == me.model.data.sContactEmail.length - 1) {
                        numberStr += item.value;
                    } else {
                        numberStr += item.value + ",&nbsp;";
                    }
                });
            }
            dom.find(".sContactNumber").html(numberStr);

        }
    });
    var tabs={
        SEARCH:"search",
        NORMAL:"normal"
    };
    /*快速添加联系人*/
    var ContactQuickAddView = app.ViewBase.extend({
        module : module,
        events : {
            'click -> .contact-quick-add-content .button-save' : 'onSave'
            //'keyup -> .contact-quick-add-content input' : 'checkValidate'
        },
        init : function(opts) {
            this.el = $(opts.el);
            this.render(this.el);
        },
        render : function(target) {
            var quickAddDom = target.find(".contact-quick-add-content");
            if (quickAddDom.length < 1) {
                var tpl = _.template(this.getTpl('tpl-contact-right-panel-add'), {
                    I18N : i18nDi
                });
                $(target).html(tpl);
            }
        },
        checkValidate : function(event) {
            var input = $(".contact-quick-add-content input");
            var checkOk = true;
            for(var i=0;i<input.length;i++){
                var item = input[i];
                if (item.checkValidity()) {
                    $(item).removeClass("err-input");
                } else {
                    $(item).focus();
                    checkOk = false;
                    return checkOk;
                }
            }
            return checkOk;
        },
        onSave : function() {
            var me = this;
            var sDisplayName = this.el.find("input[name=displayName]").val();
            var phone = this.el.find("input[name=phone]").val();
            var email = this.el.find("input[name=email]").val();
            var collection = new contactModel.Collection();
            if (!me.checkValidate()) {
                return;
            }
            if(!(collection.request&&collection.responsed)){
				return;
			}
            this.el.find(".button-save").attr("disabled", "disabled");
            this.el.find("input").attr("disabled", "disabled");

            var accountMap = collection.getAccountMap();
            var accountName = collection.defaultAccount;
            var submitModel = _.extend({}, {
                accountName : accountName || "phone",
                sDisplayName : sDisplayName,
                sContactIcon : "",
            });
            if (email) {
                submitModel.sContactEmail = [{
                    label : 0,
                    typeId : 0,
                    typeName : 'email',
                    value : email
                }];
            }
            if (phone) {
                submitModel.sContactNumber = [{
                    label : 0,
                    typeId : 0,
                    typeName : "phone",
                    value : phone
                }];
            }
            collection.addContact(submitModel, function(ret) {
                me.el.find("input").removeAttr("disabled");
                me.el.find("input[name=displayName]").val("");
                me.el.find("input[name=phone]").val("");
                me.el.find("input[name=email]").val("");
                me.el.find(".button-save").removeAttr("disabled");

                var status = null;
                /*弹窗提示失败*/
                if (!ret.result) {
                    status = 0;
                    if (ret.code == -4) {
                        content = i18nDi.fillDomText("driver.noSpaceHint");
                    } else {
                        content = i18nDi.fillDomText("contact.saveFailed");
                    }
                    var pp = new UIDialog({
                        buttonKey : 2, //双按钮，2有ok按钮,3 yes cancel 双按钮
                        content : content,
                        title : i18nDi.fillDomText('common.actionFailed')
                    });
                    pp.show();
                } else {
                    status = 1;
                    me.trigger("savedOk", ret);
                }
                //*********************************************************
                //20140924
                var logObject = {
                    page: "mycontacts_home",
                    module: "rightarea",
                    action: "easynew",
                    status: status
                }
                utils.sendNewLog("1000120", logObject);
                //********************************************************* 
            }); 
        }
    });
    var ContactView = app.ViewBase.extend({
        module : module,
        events : {
            'click -> .g-toolbar .btn-new' : 'onNew',
            'click -> .g-toolbar .btn-delete' : 'onDelete',
            'click -> .g-toolbar .btn-import' : 'onImport',
            'click -> .g-grid-search .btn-clear-search' : 'onClearSearch'
        },
        init : function(opts) {

            this.el = $(_.template(this.getTpl('tpl-contact-main'), {
                I18N : i18nDi
            }));

            this.el.appendTo($('#' + opts.pageId));
            this.collection = opts.collection;
            this.gridCollection=new GridModel.Collection();
            this.collection.on("fetch_ok",function(){
                console.log("联系人获取完毕");
                me.gridCollection.clear();
                me.collection.list.forEach(function(contactData){
                    me.gridCollection.push(new contactModel.Model(contactData));
                });  
                me.gridCollection.trigger("update");  
            });
/*liujintao add change contactCollection 2014-10-17 start*/
    this.collection.on('update', function(obj){
        if(obj&&obj.type=="add"&&obj.model){  //增
            console.log(obj.model);
            var newModel=new contactModel.Model(obj.model.data);
            me.gridCollection.push(newModel);
            me.gridCollection.setModeltoFirst(newModel);
        }else if(obj&&obj.type=="remove"&&obj.ids){
            obj.ids.forEach(function(contactId){  //删
                var modelDel=me.gridCollection.getModelById("genie_contact_"+contactId);
                modelDel&&me.gridCollection.remove(modelDel);
            });
        }else if(obj&&obj.type=="modify"&&obj.model){//改
            me.gridCollection.getModelById("genie_contact_"+obj.model.data.sContactId).data=obj.model.data;
        }
    });
/*liujintao add change contactCollection 2014-10-17 end*/            
            this.tab=tabs.NORMAL;
            var listContainer = this.el.find('.list');
            this.detailPanel = this.el.find(".right .g-contact-detail-panel");
            this.quickAddPanel = this.el.find(".right .g-contact-panel-quick-add");
            var me = this;
            this.emptyState = this.el.find(".g-image-contact-empty"); 
            /*快速添加联系人panel*/
            var quickAddView = new ContactQuickAddView({
                el : this.quickAddPanel
            });
            this.allCheckboxPxy = this.el.find('.chkbox-all');
            this.grid = new SuperGrid({
                container : listContainer,
                model : [{
                    type : 'checkbox',
                    width : 54
                }, {
                    name : 'sDisplayName',
                    label : "",
                    type : 'view',
                    width : 'flex',
                    view : NameView
                }],
                showLabel : false,
                rowHeight : 68,
                checboxDelegate : this.allCheckboxPxy,
                collection : this.gridCollection
            });
            this.exportMenu = new UIMenu({
                list : [{
                    index : 1,
                    label : i18nDi.fillDomText('contact.exportSelect'),
                    type : 'checkbox',
                    value : 'select'
                }, {
                    index : 2,
                    label : i18nDi.fillDomText('contact.exportAll'),
                    type : 'checkbox',
                    value : 'all'
                }],
                autoDestroy:true
            });
            this.exportMenu.decorate(this.el.find('.g-toolbar .btn-export'));
            this.exportMenu.addClass("g-menu-export");
            this.exportMenu.on(UIMenu.SELECT, function(item) {
                if (item.value == 'select') {
                    me.onExport('select');
                } else {
                    me.onExport('all');
                }
            });
            this.checkNav();
            if (!this.detailPanelView) {
                this.detailPanelView = new ContactDetailPanel({
                    el : this.detailPanel
                });
            }

            /*监听多选移除事件*/
            this.detailPanelView.on(ContactDetailPanel.HANDLER_NAMES.cancelSelected, function(model) {
                me.grid.collection.setSelected(model.getId(), false);
                me.grid.collection.trigger("update");
                console.log("取消的model",model);
                var selectedIds = Object.keys(me.grid.collection.getSelectedMap());
                if (selectedIds.length == 1) {
                    me.showDetail(me.grid.collection.getModelById(selectedIds[0]));
                } else if (selectedIds.length == 0) {
                    me.quickAddPanel.removeClass("w-layout-hidden").addClass("w-layout-show");
                    me.detailPanel.addClass("w-layout-hidden").removeClass("w-layout-show");
                }
                me.checkNav();
            });
            this.detailPanelView.on(ContactDetailPanel.HANDLER_NAMES.clearAllSelected, function() {
                me.grid.setAllSelect(false);
                me.grid.collection.trigger("update");
                me.quickAddPanel.removeClass("w-layout-hidden").addClass("w-layout-show");
                me.detailPanel.addClass("w-layout-hidden").removeClass("w-layout-show");
                me.checkNav();
            });
            this.detailPanelView.on(ContactDetailPanel.HANDLER_NAMES.savedOk, function(res) {
                me.grid.collection.clearSelected();
                me.grid.collection.setSelected(res.model.getId(), true);
                me.grid.collection.trigger("update");
                me.quickAddPanel.addClass("w-layout-hidden").removeClass("w-layout-show");
                me.detailPanel.removeClass("w-layout-hidden").addClass("w-layout-show");
                me.showDetail(res.model);
                me.checkNav();
            });
            quickAddView.on("savedOk", function(res) {
                me.grid.collection.clearSelected();
                me.grid.collection.setSelected(res.model.getId(), true);
                me.grid.collection.trigger("update");
                me.quickAddPanel.addClass("w-layout-hidden").removeClass("w-layout-show");
                me.detailPanel.removeClass("w-layout-hidden").addClass("w-layout-show");
                me.showDetail(res.model);
                me.checkNav();
            });
            this.detailPanelView.on(ContactDetailPanel.HANDLER_NAMES.canceled, function() {
                var selectedIds = Object.keys(me.grid.collection.getSelectedMap());
                if (selectedIds.length == 1) {
                    me.showDetail(me.grid.collection.getModelById(selectedIds[0]));
                } else if (selectedIds.length == 0) {
                    me.quickAddPanel.removeClass("w-layout-hidden").addClass("w-layout-show");
                    me.detailPanel.addClass("w-layout-hidden").removeClass("w-layout-show");
                }
            });
            this.grid.on(SuperGrid.ROW_SELECTED, function(model) {
                me.quickAddPanel.addClass("w-layout-hidden").removeClass("w-layout-show");
                me.detailPanel.removeClass("w-layout-hidden").addClass("w-layout-show");
                var selectedIds = Object.keys(me.grid.collection.getSelectedMap());
                if (selectedIds.length == 1) {//选中的长度为一
                    me.showDetail(model);
                } else if (selectedIds.length > 1) {
                    me.detailPanelView.onBatchSelected("add", model);
                }
                me.checkNav();
            });
            this.grid.on(SuperGrid.ROW_UNSELECTED, function(model) {
                me.quickAddPanel.addClass("w-layout-hidden").removeClass("w-layout-show");
                me.detailPanel.removeClass("w-layout-hidden").addClass("w-layout-show");
                var selectedIds = Object.keys(me.grid.collection.getSelectedMap());
                if (selectedIds.length == 1) {//选中的长度为一
                    me.showDetail(me.grid.collection.getModelById(selectedIds[0]));
                } else if (selectedIds.length > 1) {
                    me.detailPanelView.onBatchSelected("delete", model);
                } else {
                    me.detailPanel.addClass("w-layout-hidden").removeClass("w-layout-show");
                    me.quickAddPanel.removeClass("w-layout-hidden").addClass("w-layout-show");
                }
                me.checkNav();
            });
            this.grid.on(SuperGrid.ROW_SELECTED_ALL, function(selected) {
                me.quickAddPanel.addClass("w-layout-hidden").removeClass("w-layout-show");
                me.detailPanel.removeClass("w-layout-hidden").addClass("w-layout-show");
                var selectedIds = Object.keys(me.grid.collection.getSelectedMap());
                if (selectedIds.length > 0 && selected) {
                    me.quickAddPanel.addClass("w-layout-hidden").removeClass("w-layout-show");
                    me.detailPanel.removeClass("w-layout-hidden").addClass("w-layout-show");
                   if(me.tab==tabs.SEARCH){
                        me.detailPanelView.onBatchSelectedAll(true,me.searchCollection);   
                   }else{
                       me.detailPanelView.onBatchSelectedAll(true,me.grid.collection);
                   }
                } else {
                    me.quickAddPanel.removeClass("w-layout-hidden").addClass("w-layout-show");
                    me.detailPanel.addClass("w-layout-hidden").removeClass("w-layout-show");
                    me.detailPanelView.onBatchSelectedAll(false);
                }
                me.checkNav();
            });

            this.loading = new LoadingPic();
            this.loading.render(this.el.find(".g-content .loading-box"));
            this.loading.show();
            
            this.currentGroupId=0;
            
                     
            me.decorateAccountMenu();
            
            this.grid.collection.on("update", function() {
                if (me.collection.requested == true && me.collection.responsed == true) {
                     me.loading.hide();

                     me.updateAccountMenu();
                     me.decorateGroupMenu(me.currentAccountName); 
                    if (me.grid.collection.models.length < 1) {
                        me.el.find(".g-empty-state").show();
                        me.el.find(".g-content .list").addClass("g-page-hide").removeClass("g-page-show");
                    } else {
                        me.el.find(".g-empty-state").hide();
                        me.el.find(".g-content .list").removeClass("g-page-hide").addClass("g-page-show");
                    }
                    me.checkNav();
                } else if(me.searchCollection){
                    me.loading.hide();
                }else{
                    me.el.find(".g-empty-state").hide();
                    me.loading.show();
                }

            });
           me.collection.on("fetch_group_ok",function(){
               console.log("计算分组结束=========================");
           });
            if (me.collection.requested == true && me.collection.responsed == true) {
                me.onRefresh();
            }
            var curHash = app.getCurHashParas();
            app.eventCenter.on(curHash.module + curHash.action, $.proxy(this.onRefresh, this));
            app.eventCenter.on(curHash.module + curHash.action + "entersearch", $.proxy(this.onMultiSearch, this));
            app.eventCenter.on(curHash.module + curHash.action + "clearsearch", $.proxy(this.onClearSearch, this));
            var header = $(_.template(this.getTpl("tpl-search-header"), {
                I18N : i18nDi
            }));
            this.el.find(".list").prepend(header);
            this.currentAccountName = (curHash.pageState && curHash.pageState.accountName) || 'all';
        },
        updateExportMenuList : function() {
            var me = this;
            var selIds = Object.keys(me.grid.collection.getSelectedMap());
            var list = [{
                index : 1,
                label : i18nDi.fillDomText('contact.exportSelect', selIds.length),
                type : selIds.length > 0 ? 'checkbox' : 'label',
                value : 'select'
            }, {
                index : 2,
                label : i18nDi.fillDomText('contact.exportAll', me.grid.collection.models.length),
                type : 'checkbox',
                value : 'all'
            }];
            this.exportMenu.updateList(list);
        },
        onRefresh : function() {
            if(this.tab==tabs.SEARCH){
                app.eventCenter.trigger('research');
            }else{
                this.onClearSearch();
                this.tab=tabs.NORMAL;
                this.currentAccountName="all";
                this.currentGroupId = 0
                this.grid.setCollection(this.gridCollection);
                this.gridCollection.clear();
                this.emptyState&&this.emptyState.hide();
                this.loading.show();
                this.collection.refresh();
                this.grid.setAllSelect(false);                
            }
        },
        onNew : function() {
            var me = this;
            var modelData = {
                sContactId : "", //修改用sContactId,删除用sContactIds,为空时表示新建
                sDisplayName : "",
                sContactIcon : "",
                sComments : "",
                sContactNumber : [],
                sContactEmail : []
            };
            if (!this.detailPanelView) {
                this.detailPanelView = new ContactDetailPanel({
                    el : this.detailPanel,
                    model : modelData
                });
            }
			me.grid.collection.clearSelected();
            me.grid.collection.trigger("update");

            me.quickAddPanel.addClass("w-layout-hidden").removeClass("w-layout-show");
            me.detailPanel.removeClass("w-layout-hidden").addClass("w-layout-show");
            this.detailPanelView.onNew(modelData);

            //*********************************************************
            //20140924
            var logObject = {
                page: "mycontacts_home",
                module: "menu",
                action: "newcontact"
            }
            utils.sendNewLog("1000120", logObject);
            //*********************************************************  
        },
        onImport : function() {
            var me = this;

            app.dal.request({
                action : apiNames.REQ_POPUP_SYSTEM_DIALOG,
                paras : {
                    MultiSel : 1,
                    MediaType : '*',
                    Filter : '(*.vcf)|*.vcf'
                },
                callback : function(res) {
                    if(!connection.isConnect()){
                        return;
                    }
                    if (res.status != 1) {
                        return;
                    } else if (res.info && res.info.list) {
                      for(var i=0;i<res.info.list.length;i++){
                            if(res.info.list[i].status!=1){
                                /*
                                var pp = new UIDialog({
                                    buttonKey : 2, //双按钮，2有ok按钮,3 yes cancel 双按钮
                                    content : i18nDi.fillDomText("task.importFileNotExistedText"),
                                    title : i18nDi.fillDomText('common.Import')
                                });
                                pp.show(); */                               
                                return;
                            }
                        }
                        var progressWindow = new ProgressWindow({
                            freshOnly : false,
                            header : "contact.importHeader",
                            doingTitle : "contact.importingTitle",
                            successTitle : "common.exportSuccess",
                            cancelAble : true,
                            autoDestroy : 3
                        });
                        progressWindow.on("ready", function() {
                            var successCounter = 0;
                            var failedCounter = 0;
                            res.info.list.forEach(function(file) {
                                me.collection.off("doing").on("doing", function(index, total, id, success) {
                          console.log("当前导入索引："+index);
                                    if (success) {
                                        successCounter++;
                                    } else {
                                        failedCounter++;
                                    }
                                    progressWindow.doProgress(index, total, id, success);
                                    if (index == total) {
                                        if (failedCounter != 0) {
                                            progressWindow.setFailedTitle(i18nDi.fillDomText('contact.importFailed', successCounter, failedCounter));
                                        }else{
                                            progressWindow.showFreshBar();
                                        }
                                        
                                        //*********************************************************
                                        //20140924
                                        var logObject = {
                                            page: "mycontacts_home",
                                            module: "menu",
                                            action: "import_result",
                                            successnum: successCounter,
                                            failnum: failedCounter
                                        }
                                        utils.sendNewLog("1000120", logObject);
                                        //*********************************************************  
                                        setTimeout(function() {
                                            me.onRefresh();
                                        }, 1000);
                                    }
                                });
                                me.collection.importContacts(file.path, function(ret) {
								/*内存不足*/
                                    if (ret.code == -4) {
                                        progressWindow.setFailedTitle(i18nDi.fillDomText('driver.noSpaceHint'));
                                        progressWindow.doProgress(1, 1, '-1', false);
                                        return;
								/*空文件*/
                                    }else if(ret.code==-5){
                                        progressWindow.setFailedTitle(i18nDi.fillDomText('contact.fileError'));
                                        progressWindow.doProgress(1, 1, '-1', false);
                                        return;
								/*传入总数*/
                                    }else if(ret.code==-6&&ret.info){
                                        progressWindow.setTotal(ret.info.count);
										return;
								/*文件无效*/		
                                    }else if(ret.code==-7){
                                        progressWindow.setFailedTitle(i18nDi.fillDomText('contact.fileError'));
                                        progressWindow.doProgress(1, 1, '-1', false); 
										return;
								/*其他错误*/
                                    }
                                });
                            });
                        });
                        progressWindow.on("cancel",function(data){
                            app.dal.request({
                                action:apiNames.REQ_STOP_IMPORT_CONTACT,
                                callback:function(res){
                                    if(res.status==1){
                                        setTimeout(function(){
                                             me.onRefresh();
                                        },1000);
                                    }
                                }
                            });
                        });
                        progressWindow.open();
                    }
                }
            });

            //*********************************************************
            //20140924
            var logObject = {
                page: "mycontacts_home",
                module: "menu",
                action: "import"
            }
            utils.sendNewLog("1000120", logObject);
            //*********************************************************  
        },
        onExport : function(type) {
            var me = this;
            var sContactIds = [];
            var successList = [];
            var failedList = [];
            if (type == "select") {
                var selectedIds = Object.keys(this.grid.collection.getSelectedMap());
                _.each(selectedIds, function(id) {
                    sContactIds.push(me.grid.collection.getModelById(id).get("sContactId"));
                });
            } else {
                var selectedIds = Object.keys(this.grid.collection.getModelMap());
                _.each(selectedIds, function(id) {
                    sContactIds.push(me.grid.collection.getModelById(id).get("sContactId"));
                });
            }

            var total = sContactIds.length;
            var time = new Date();
            var fileName = "genie_contacts_" + (time.getMonth() + 1) + "-" + time.getDate() + "-" + time.getHours() + "-" + time.getMinutes() + "-" + time.getSeconds() + ".vcf";
            var path = fileName;
            
            app.dal.request({
                action : apiNames.REQ_POPUP_SYSTEM_DIALOG,
                paras : {
                    DialogType : "save",
                    Ext : ".vcf",
                    MediaType : '*',
                    Filter : '(*.vcf)|*.vcf',
                    FileName:path
                },
                callback : function(ret) {
                    if(!connection.isConnect()){
                        return;
                    }
                    if (ret.status !== 1) {//失败或者取消
                        return;
                    } else {
                        var progressWindow = new ProgressWindow({
                            freshOnly : false,
                            autoDestroy : 1,
                            header : "contact.exportHeader",
                            doingTitle : "common.Exporting",
                            failedTitle : "contact.exportFailed",
                            openPath : ret.info.path,
                            cancelAble : false,
                            total : total
                        });

                        progressWindow.on("ready", function() {
                            var count = 0;
                            /*取到保存位置的文件夹*/
                            me.collection.exportContacts(sContactIds, ret.info.path, function(res) {
                                count++;
                                if (res.status == 1) {
                                    successList.push({
                                        id : res.info.contactId,
                                        localPath : res.info.path
                                    });
                                } else {
                                    failedList.push(res.info.contactId);
                                }
                                if (count == total && failedList.length > 0) {
                                    progressWindow.setFailedTitle(i18nDi.fillDomText('contact.exportFailed'));
                                } else if (count == total) {
                                    progressWindow.setSuccessTitle(i18nDi.fillDomText('contact.exportSuccess', total));
                                    progressWindow.setSuccessList(successList);
                                }
                                //*********************************************************
                                //20140924
                                if (count == total){
                                    var logObject = {
                                        page: "mycontacts_home",
                                        module: "menu",
                                        action: "export_result",
                                        successnum: successList.length,
                                        failnum: failedList.length
                                    }
                                    utils.sendNewLog("1000120", logObject);
                                }
                                //*********************************************************  
                                progressWindow.doProgress(count, total, res.info.contactId, res.status == 1 ? true : false);
                            });
                        });
                        progressWindow.open();
                    }
                }
            });

            //*********************************************************
            //20140924
            var logObject = {
                page: "mycontacts_home",
                module: "menu",
                action: "export",
                totalnum: total
            }
            utils.sendNewLog("1000120", logObject);
            //*********************************************************  
        },
        updateAccountMenu:function(){
            var me = this;
            var accountMap = this.collection.getAccountMap();
            var accountMenuList = this.collection.getAccountMenuList();
            accountMenuList.unshift({
                accountName : "all",
                value : "all",
                label : i18nDi.fillDomText('contact.AllContacts'),
                index : 0,
                checked : me.currentAccountName=="all" ? true : false,
                type : "checkbox"
            });
            accountMenuList = _.map(accountMenuList, function(accountItem) {
                return {
                    index : accountItem.index,
                    value : accountItem.value,
                    label : accountItem.label,
                    type : accountItem.type,
                    checked : accountItem.value == me.currentAccountName ? true : false
                }
            });       
            me.accountMenu.updateList(accountMenuList);     
        },
        decorateAccountMenu : function() {
            var me = this;
            console.log("当前账号：========================"+me.currentAccountName);
            var accountMap = this.collection.getAccountMap();
            var accountMenuList = this.collection.getAccountMenuList();
            accountMenuList.unshift({
                accountName : "all",
                value : "all",
                label : i18nDi.fillDomText('contact.AllContacts'),
                index : 0,
                checked : me.currentAccountName=="all" ? true : false,
                type : "checkbox"
            });
            accountMenuList = _.map(accountMenuList, function(accountItem) {
                return {
                    index : accountItem.index,
                    value : accountItem.value,
                    label : accountItem.label,
                    type : accountItem.type,
                    checked : accountItem.value == me.currentAccountName ? true : false
                }
            });
            if (me.accountMenu) {
                me.accountMenu.updateList(accountMenuList);
            } else {
                this.accountMenu = new UIMenu({
                    list : accountMenuList,
                    ani:true,
                    duration:100,
                    rightOffsetX : "100",
                    autoDestroy:true
                });
                this.accountMenu.decorate(this.el.find('.g-toolbar .btn-location'));
                this.accountMenu.addClass("g-menu-account-filter");
                this.accountMenu.on(UIMenu.SELECT, function(item) {

                var curHash = app.getCurHashParas();
                if (curHash.pageState.accountName != item.value) {
                    
                    me.currentAccountName = item.value;
                    me.currentGroupId = 0;
                    me.decorateGroupMenu(item.value);

                    if (item.value == "all" || item.value == "") {
                        me.onRefresh();
                    } else {
                        me.collection.queryContacts(me.currentAccountName, me.currentGroupId, function(res) {
                            me.grid.collection.clear();
                            _.each(res, function(res_item) {
                                var model = new contactModel.Model(res_item);
                                me.grid.collection.push(model);
                            });
                            me.grid.collection.trigger("update");
                            
                        });
                       
                    }
                    
                    app.navigate({
                        module : curHash.module,
                        action : curHash.action,
                        pageState : {
                            accountName : item.value
                        }
                    });
                }
            });                
            }

        },
        decorateGroupMenu : function(accountName) {
            var me = this;
            var groupsMenuList = [];
            groupsMenuList = me.collection.getGroupMenuList(accountName, true);
            groupsMenuList = [{
                index : 0,
                value : 0,
                accountName : accountName,
                label : i18nDi.fillDomText('contact.AllGroups'),
                type : 'checkbox',
                checked : (me.currentGroupId == 0) ? true : false
            }].concat(groupsMenuList);

            for (var i = 0; i < groupsMenuList.length; i++) {
                groupsMenuList[i].checked = (me.currentGroupId == groupsMenuList[i].value) ? true : false;
            }

             groupsMenuList = groupsMenuList.concat({
             index : "-999",
             accountName : accountName,
             value : "edit",
             label : i18nDi.fillDomText('contact.editgroup')
             });
            if (me.groupMenu) {
                me.groupMenu.destroy();
            }
            me.groupMenu = new UIMenu({
                list : groupsMenuList,
                rightOffsetX : "2",
                autoDestroy:true
            });

            me.groupMenu.decorate(me.el.find('.g-toolbar .btn-group'));
            me.groupMenu.addClass("g-menu-group-filter");
            me.groupMenu.off(UIMenu.SELECT).on(UIMenu.SELECT, function(item) {
                me.currentGroupId = item.value;
                if (item.value == "edit") {
                    me.onEditGroup(item.accountName);
                } else if(item.accountName=="all"||item.accountName==""){
                    me.onRefresh();
                }else{
                    me.collection.queryContacts(item.accountName, item.value, function(res) {
                        me.gridCollection.clear();
                        _.each(res, function(res_item) {
                            var model = new contactModel.Model(res_item);
                            me.gridCollection.push(model);
                        });
                        me.gridCollection.trigger("update");
                        me.decorateGroupMenu(accountName);
                        console.log("contactCollection====================================",me.collection);
                    });
                }
            })
        },
        onDelete : function() {
            var me = this;
            var modelSelectedIds = Object.keys(this.grid.collection.getSelectedMap());
            var submitModel = _.extend({}, {
                sContactIds : []
            });
            /*弹窗确认*/
            var pp = new UIDialog({
                buttonKey : 3, //双按钮，2有ok按钮,3 yes cancel 双按钮
                content : i18nDi.fillDomText("contact.sureDeleteTitle", modelSelectedIds.length),
                title : i18nDi.fillDomText('common.Delete')
            });
            pp.show();
            _.each(modelSelectedIds, function(modelId) {
                submitModel.sContactIds.push(me.grid.collection.getModelById(modelId).get("sContactId"));
            });
            var counter = 0;
            failedList = [];
            pp.on('yes', function() {
                 var seperator = modelSelectedIds.length>500?50:10;
                var progressWindow = new ProgressWindow({
                    header : "common.Delete",
                    doingTitle : "common.Deleting",
                    failedTitle : "contact.deleteFailed",
                    total : modelSelectedIds.length,
                    freshOnly : modelSelectedIds.length == 1 ? true : false,
                    autoDestroy : 3,
                    cancelAble : true
                });
                progressWindow.on("cancel", function() {
                    app.dal.request({
                        action:apiNames.REQ_STOP_DELETE_CONTACT,
                        callback:function(res){
                            console.log("取消删除联系人",res);
                            setTimeout(function(){
                                me.grid.collection.trigger("update");
                            },500);
                        }
                    });
                    me.grid.collection.trigger("update");
                });
                progressWindow.on("ready", function() {
                    /*进度和结果显示*/
                    me.collection.off("doing").on("doing", function(current, total, curData, success) {
                        console.log("当前删除索引："+current);
                        if (!success) {
                            failedList.push(curData);
                        } else {
                            var curModel = me.grid.collection.getModelById("genie_contact_" + curData);
                            if (curModel) {
                                try{
                                    me.detailPanelView.onBatchSelected("remove",curModel);    
                                }catch(e){
                                    
                                }
                                me.grid.collection.remove(curModel,{trigger: false});
                            }
                            if(current%seperator==0||current==total||total-current<10){
                                me.grid.collection.trigger("update");
                            }
                        }
                        progressWindow.doProgress(current, total, curData, success);
                    });
                    me.collection.deleteContacts(submitModel, function(response) {
                        me.loading.hide();
                        me.checkNav();
                    });
                });

                progressWindow.open();

                me.quickAddPanel.removeClass("w-layout-hidden").addClass("w-layout-show");
                me.detailPanel.addClass("w-layout-hidden").removeClass("w-layout-show");
            });
        },
        showDetail : function(model) {
            var me = this;
            me.grid.collection.setSelected(model.getId(), true);
            if (!this.detailPanelView) {
                this.detailPanelView = new ContactDetailPanel({
                    el : this.detailPanel,
                    model : model
                });
            }
            this.detailPanelView.onSingleSelected(model);
        },
        onRemoveMoreSelected : function(model) {
            this.detailPanelView.onRemoveSelected(model);
            this.checkNav();
        },
        checkNav : function() {
            var modelSelectedIds = Object.keys(this.grid.collection.getSelectedMap());
            var toolbar = this.el.find(".g-toolbar");
            if (modelSelectedIds.length == 0) {
                toolbar.find(".btn-delete").attr("disabled", "disabled");
            } else {
                toolbar.find(".btn-delete").removeAttr("disabled");
            }
            if (this.grid.collection.models.length > 0) {
                toolbar.find(".btn-export").removeAttr("disabled");
            } else {
                toolbar.find(".btn-export").attr("disabled", "disabled");
            }
            this.updateExportMenuList();
        },
        onMultiSearch : function(searchResult) {
            var me = this;
            this.tab=tabs.SEARCH;
            me.detailPanelView.onBatchSelectedAll(false);
            var keyword = searchResult.key;
            if (!this.searchCollection) {
                this.searchCollection = new GridModel.Collection();
            }
            this.searchCollection.clear();
            this.grid.setCollection(me.searchCollection);
            this.grid.collection.clearSelected();    
            this.grid.collection.trigger("update");
            if (searchResult.info) {
                searchResult.info.forEach(function(item) {
                    keyword = item.keyInfo[0].keyword;
                    if (item.sContactId) {
                        me.searchCollection.push(new contactModel.Model(me.collection.getModelById("genie_contact_" + item.sContactId).data));
                        me.detailPanelView.onBatchSelected("add", me.collection.getModelById("genie_contact_" + item.sContactId));
                    }
                });
            }
            this.el.find(".list").addClass("g-grid-search-box");
            this.el.find(".g-grid-search").css("display", "-webkit-box");
            
            me.searchCollection.trigger("update");
            
         //  me.searchCollection.off("update", me.updateHandler);
            me.updateHandler = function() {
                me.el.find(".g-grid-search .static").html(i18nDi.fillDomText('common.searchResultText', keyword, me.searchCollection.models.length));
                me.loading.hide();
            }
            this.el.find(".g-grid-search .static").html(i18nDi.fillDomText('common.searchResultText', keyword, me.searchCollection.models.length));
            me.searchCollection.on("update", me.updateHandler);

            me.checkNav();
        },
        onClearSearch : function() {
            this.grid.setCollection(this.gridCollection);
            this.grid.collection.clearSelected();    
            this.tab=tabs.NORMAL;
            this.el.find(".g-grid-search").hide();
            this.el.find(".list").removeClass("g-grid-search-box");
            this.grid.collection.trigger("update");
             this.quickAddPanel&&this.quickAddPanel.removeClass("w-layout-hidden").addClass("w-layout-show");
             this.detailPanel&&this.detailPanel.addClass("w-layout-hidden").removeClass("w-layout-show");
        },
        redirect : function(hash) {
            var me = this;
            console.log("redirect 进入联系人================");
            console.log(hash);
            //加入是搜索联系人进入
            if (hash.pageState && hash.pageState.searchType && hash.pageState.searchType == "2" && hash.pageState.multiple == "0") {
                me.grid.collection.clearSelected();
                var model = this.grid.collection.getModelById("genie_contact_" + hash.pageState.data);
                me.grid.collection.setSelected("genie_contact_" + hash.pageState.data, true);
                
                var index = this.grid.collection.models.indexOf(model);
                this.grid.scrollToIndex(index);
                me.quickAddPanel.addClass("w-layout-hidden").removeClass("w-layout-show");
                me.detailPanel.removeClass("w-layout-hidden").addClass("w-layout-show");
                me.showDetail(model);
                me.grid.collection.trigger("update");
                me.checkNav();
            } else if (hash.pageState && hash.pageState.vt && (hash.pageState.vt == "add" || hash.pageState.vt == "edit")) {
                var data = JSON.parse(hash.pageState.data);
                if (!this.detailPanelView) {
                    this.detailPanelView = new ContactDetailPanel({
                        el : this.detailPanel,
                        model : JSON.parse(hash.pageState.data)
                    });
                }
                me.grid.collection.clearSelected();
                me.grid.collection.trigger("update");
                me.quickAddPanel.addClass("w-layout-hidden").removeClass("w-layout-show");
                me.detailPanel.removeClass("w-layout-hidden").addClass("w-layout-show");
                if (hash.pageState.vt == "add") {
                    this.detailPanelView.onNew(JSON.parse(hash.pageState.data));
                } else if (hash.pageState.vt == "edit") {
                    me.collection.searchContact({
                        sContactNumber : JSON.parse(hash.pageState.data).sContactNumber[0].value
                    }, function(searchResult) {
                        if (searchResult.length > 0) {
                            var model = me.collection.getModelById("genie_contact_" + searchResult[0].sContactId)||searchResult[0];
                            console.log("查找要编辑的联系人：",model);
                            me.detailPanelView.onEdit(model);
                            hash.pageState.accountName = me.defaultAccountName;
                            hash.pageState.data = {};
                        }
                    });
                }
                var ctrsKeys = Object.keys(globalConfig.ctrConfig);
                ctrsKeys.forEach(function(key) {
                    if (globalConfig.ctrConfig[key].module == "contact") {
                        globalConfig.ctrConfig[key].pageState = {
                            accountName : "all"
                        };
                    }
                });
            }
        },
        /*分组操作*/
        onEditGroup : function(accountName) {
            if (!accountName || accountName == "all") {
                accountName = 'phone';
            }
            var groups = (this.collection.getAccountMap()[accountName] && this.collection.getAccountMap()[accountName].groupList) || [];
            var win = new app.PopupPanel({
                Model : 1,
                Width : 400,
                Height : 340,
                DragWindowHeight : 30,
                Parame : {
                },
                Path : 'groupEditor.html',
            });
            win.open();
            var me = this;
            var opened =true;
            win.on("message", function(msg) {   
                console.log("接收到消息=========");
                console.log(msg);
                if (msg.result) {
                    setTimeout(function() {
                        me.onRefresh();
                    }, 500);
                }else if(msg.ready){
                    
                    connection.on('connection', function(){
                        if(!connection.isConnect()&&opened){
                            win.sendMessage({
                                    todo:"unconnect"
                             }); 
                             opened = false;
                        }               
                    });
                    win.sendMessage({
                            todo:"initData",
                            accountName : accountName,
                            groupList : groups,
                            accountMap : me.collection.getAccountMap()
                     });                     
                }
            });
        }
    });

    return ContactView;
});
