/**
 * @author liujintao
 */
define("ContactDetailPanel", function(require, exports, module) {
    var app = require('app');
    var $ = require('jquery');
    var _ = require('underscore');
    /*联系人model*/
    var contactModel = require('contactModel');
    /*短信model*/
    var SMSModel = require("smsModel");
    /*短信会话组件*/
    var UIChatBox = require("UIChatBox");
    /*通用表格*/
    var SuperGrid = require("grid");
    /*grid model*/
    var GridModel = require("gridModel");
    /*下拉菜单组件*/
    var UIMenu = require("UIMenu");
    
    var UIDialog = require('UIDialog');
    /*国际化字典工具*/
    var i18nDi = require('I18NDI');
    var apiNames = require('APINames');
    var utils = require("utils");

    var MultiItemView = app.ViewBase.extend({
        module : module,
        init : function(model) {
            this.model = model;
        },
        render : function(target) {
            var tpl = this.getTpl("tpl-contact-right-contact-multi-selected-item");
            var dom = target.find(".selected-contact-item[data-id=" + this.model.id + "]");
            if (dom.length == 0) {
                dom = $(_.template(tpl, {
                    model : this.model,
                    I18N : i18nDi
                }));
                $(target).html(dom);
            }
            if (!this.model.data.sContactNumber) {
                return;
            } else {
                var numberStr = "";
                for (var i = 0; i < this.model.data.sContactNumber.length; i++) {
                    if (i === this.model.data.sContactNumber.length - 1) {
                        numberStr += this.model.data.sContactNumber[i].value;
                    } else {
                        numberStr += this.model.data.sContactNumber[i].value + ", ";
                    }
                }
                dom.find(".phone").text(numberStr);
            }
            dom.attr("data-id", this.model.id);
            dom.find(".name").text(this.model.data.sDisplayName);
            dom.find(".icon").attr("src", this.model.data.sContactIcon || 'common/images/ico/default-avatar.png');
        }
    });

    var HANDLER_NAMES = {
        savedOk : "savedOk",
        savedError : "savedError",
        canceled : "cancel",
        cancelSelected : "cancelSelected",
        clearAllSelected : "clearAll"
    };

    var ContactDetailPanel = app.ViewBase.extend({
        module : module,
        events : {
            "click -> .contact-basic-info-ctn .btn-edit" : "onEditHandler",
            'click -> .contact-detail-edit-container .btn-dlg-save' : 'save',
            'click -> .contact-detail-edit-container .btn-dlg-cancel' : 'cancel',
            'mouseenter -> .contact-detail-edit-container .icon-container' : "showChangeIcon",
            'mouseleave -> .contact-detail-edit-container .icon-container' : "hideChangeIcon",
            'click -> .icon-container' : "changeIcon",
            'click -> .add-item-btn' : 'addNumberItem',
            'click -> .delete-item-btn' : 'deleteNumberItem',
            'click -> .contact-detail-multi-selected-ctn .btn-uncheck' : "onRemoveHandler",
            'click -> .contact-detail-multi-selected-ctn .clearAllSelected' : 'onClearAllSelectedHandler',
            'click -> .contact-detail-multi-selected-ctn .btn-send-batch' : "goToSendBatchMessage",
            'click -> .ico-sms' : "onSendSmsQuickHandler"
        },
        init : function(opts) {
            this.el = $(opts.el);
            this.model = opts.model || {};
            this.phoneTypes = contactModel.getPhoneTypes();
            this.emailTypes = contactModel.getEmailTypes();
            this.contactCollection = new contactModel.Collection();
            this.render(this.el);
        },
        render : function(target) {
            var tpl = this.getTpl("tpl-contact-detail-panel");
            var me = this;

            $(target).html(_.template(tpl, {
                data : this.model,
                I18N : i18nDi,
            }));
            /*多选数据*/
            this.muiltSelectedCollection = new GridModel.Collection();
            /*多选表格*/
            this.multiSelectGrid = new SuperGrid({
                container : this.el.find(".multi-selected-ul-wraper"),
                model : [{
                    name : '',
                    label : "",
                    type : 'view',
                    width : 'flex',
                    view : MultiItemView
                }],
                showLabel : false,
                rowHeight : 44,
                checboxDelegate : null,
                collection : this.muiltSelectedCollection
            });
        },
        showChangeIcon:function(){
              this.el.find(".contact-detail-edit-container .icon-container .mask").show();
        },
        hideChangeIcon:function(){
              this.el.find(".contact-detail-edit-container .icon-container .mask").hide();
        },
        changeIcon : function() {
            var me = this;
            app.dal.request({
                action : apiNames.REQ_POPUP_SYSTEM_DIALOG,
                paras : {
                    MultiSel : 0,
                    MediaType : 'image',
                    Filter : '(*.gif; *.jpeg; *.jpg; *.png;)|*.gif; *.jpeg; *.jpg; *.png; '
                },
                callback : function(res) {
                    if (res.status != 1) {
                        return;
                    } else if (res.info && res.info.list) {
                        res.info.list.forEach(function(file) {
                            me.el.find(".contact-detail-edit-container .icon-container img[name=icon]").attr("src", file.path);
                            me.el.find(".contact-detail-edit-container .icon-container img[name=icon]").attr("changed", true);
                        });
                    }
                }
            });
        },
        addNumberItem : function(event) {
            var me = this;
            var $num_item;
            var typeList = [];
            if ($(event.target).parents(".number_item").find("[name=typename]").attr("value").toLowerCase() == "email") {
                $num_item = $(_.template(this.getTpl("tpl-new-contact-email-item"), {
                    I18N : i18nDi
                }));
                typeList = me.emailTypes;
            } else {
                $num_item = $(_.template(this.getTpl("tpl-new-contact-number-item"), {
                    I18N : i18nDi
                }));
                typeList = me.phoneTypes;
            }

            $num_item.insertAfter($(event.target).parents(".number_item"));

            var new_number_menu = new UIMenu({
                list : typeList,
                autoDestroy:true
            });
            new_number_menu.decorate($num_item.find('[name=typename]'));
            new_number_menu.addClass("phone-type-menu");
            new_number_menu.on(UIMenu.SELECT, function(item) {
                new_number_menu.target.attr("value", item.value);
                new_number_menu.target.find(".name_sp").html(item.label);
            });
            /*绑定销毁事件*/
            $num_item.delegate(".delete-item-btn", "click", function(ev) {
                $num_item.remove();
                new_number_menu.off(UIMenu.SELECT);
                new_number_menu = undefined;
                $num_item.undelegate();
            });
            this.el.find(".contact-detail-edit-container .delete-item-btn").attr("i18n-Key", "contact.deleteTipText");
            utils.tooltip.attach(this.el.find(".contact-detail-edit-container .delete-item-btn"));
        },
        /*删除页面原有的默认item*/
        deleteNumberItem : function(event) {
            var $num_item = $(event.target).parents(".number_item");
            $num_item.undelegate();
            $num_item.remove();
        },
        onEditHandler : function(event) {
            console.log("Edit Handler");
            var modelId = $(this.el).find("input[name=modelId]").val();
            var collection = this.contactCollection;
            var model = collection.getModelById(modelId);
            this.onEdit(model);
            this.el.find(".contact-detail-edit-container .delete-item-btn").attr("i18n-Key", "contact.deleteTipText");
            utils.tooltip.attach(this.el.find(".contact-detail-edit-container .delete-item-btn"));

            //*********************************************************
            //20140924
            var logObject = {
                page: "mycontacts_home",
                module: "rightarea",
                action: "edit"
            }
            utils.sendNewLog("1000120", logObject);
            //********************************************************* 
        },
        onSendSmsQuickHandler : function(event) {
            var curNumber = $(event.target).parents(".number_item").find(".phone").text();
            var sContactId = $(event.target).parents(".contact-basic-info-ctn").find("input[name=modelId]").attr("value");
            var sDisplayName = this.contactCollection.getModelById(sContactId).get("sDisplayName");
            app.navigate({
                module : 'sms',
                action : 'sms',
                pageState : {
                    vt : "multiSender",
                    content : JSON.stringify([{
                        phoneNumber : curNumber,
                        sDisplayName:sDisplayName,
                        sendBody : ""
                    }])
                }
            }, {
                cache : false
            });
        },
        /*编辑联系人*/
        onEdit : function(model) {
            var me = this;
            var tpl = this.getTpl("tpl-contact-right-panel-edit");
           var phoneTypes = [{
                index : 0,
                label : i18nDi.fillDomText("contact.Mobile"),
                value : "mobile"
            }, {
                index : 1,
                label : i18nDi.fillDomText("common.phoneText"),
                value : "phone"
            }];
          var emailTypes=[{
            index : 2,
            label : i18nDi.fillDomText("common.email"),
            value : "Email"
            }];
            var dom = _.template(tpl, {
                data : model.data || model,
                phoneTypes : phoneTypes,
                emailTypes : emailTypes,
                I18N : i18nDi
            });

            $(this.el).find(".contact-right-edit-or-new-ctn").html(dom).removeClass("w-layout-hidden").addClass("w-layout-show");
            $(this.el).find(".contact-right-edit-or-new-ctn").siblings(".contact-detail-single-selected-ctn").addClass("w-layout-hidden").removeClass("w-layout-show");
            $(this.el).find(".contact-right-edit-or-new-ctn").siblings(".contact-detail-multi-selected-ctn").addClass("g-page-hide").removeClass("g-page-show");
            
            this.el.find("input[name=operation]").val("1");

            var groupsMenuList = me.contactCollection.getGroupMenuList(model.accountName||model.get("accountName"));
            groupsMenuList = _.filter(groupsMenuList, function(group) {
                return group.value >= 0;
            });
            var sGroup = model.sGroup||model.get("sGroup")||[];
            groupsMenuList = _.map(groupsMenuList,function(group){
                sGroup&&sGroup.forEach(function(curGroup){
                    if(curGroup.groupId==group.value){
                        group.checked = true;
                    }
                });
                return group;
            });
            var groupMenu = null;
            groupMenu = new UIMenu({
                list : groupsMenuList,
                multiCheck : true,
                autoDestroy:true
            });
            groupMenu.decorate(this.el.find(".contact-right-edit-or-new-ctn [name=group]"));
            groupMenu.addClass('g-menu-group-edit');
            groupMenu.off(UIMenu.MULTI_CHANGE).on(UIMenu.MULTI_CHANGE, function(selItems){
                var groupIds = [];
                for (var i = 0; i < selItems.length; i++) {
                    groupIds.push(selItems[i].value);
                }
                groupMenu.target.attr("value", groupIds.toString());
            });

            var number_items = $(this.el).find(".contact-right-edit-or-new-ctn .number_item");
            var typeList = [];
            _.each(number_items, function(item) {
            var phoneTypes = [{
                index : 0,
                label : i18nDi.fillDomText("contact.Mobile"),
                value : "mobile"
              }, {
                index : 1,
                label : i18nDi.fillDomText("common.phoneText"),
                value : "phone"
             }];
          var emailTypes=[{
            index : 2,
            label : i18nDi.fillDomText("common.email"),
            value : "Email"
            }];
                if ($(item).find("input[name=data]").attr("type") == "email") {
                    typeList = emailTypes;
                } else {
                    typeList = phoneTypes;
                }

                var new_number_menu = new UIMenu({
                    list : typeList,
                    autoDestroy:true
                });
                new_number_menu.decorate($(item).find('[name=typename]'));
                new_number_menu.addClass("phone-type-menu");
                new_number_menu.on(UIMenu.SELECT, function(number_item) {
                    new_number_menu.target.attr("value", number_item.value);
                    new_number_menu.target.find(".name_sp").html(number_item.label);
                });
                /*绑定销毁事件*/
                $(item).delegate(".delete-item-btn", "click", function(ev) {
                    $(item).remove();
                    new_number_menu.off(UIMenu.SELECT);
                    new_number_menu = undefined;
                    $(item).undelegate();
                });
            });
            me.el.find(".contact-detail-edit-container .add-item-btn").attr("i18n-Key", "contact.addTipText");
            utils.tooltip.attach(me.el.find(".contact-detail-edit-container .add-item-btn"));
        },
        /*新建联系人面板*/
        onNew : function(model) {
            var tpl = this.getTpl("tpl-contact-right-panel-edit");
            var me = this;
            var phoneTypes = [{
                index : 0,
                label : i18nDi.fillDomText("contact.Mobile"),
                value : "mobile"
            }, {
                index : 1,
                label : i18nDi.fillDomText("common.phoneText"),
                value : "phone"
            }];
          var emailTypes=[{
            index : 2,
            label : i18nDi.fillDomText("common.email"),
            value : "Email"
            }];
            var dom = _.template(tpl, {
                data : model.data || model || {},
                phoneTypes : phoneTypes,
                emailTypes : emailTypes,
                I18N : i18nDi
            });
            $(this.el).find(".contact-right-edit-or-new-ctn").html(dom).removeClass("w-layout-hidden").addClass("w-layout-show");
            $(this.el).find(".contact-right-edit-or-new-ctn").siblings(".contact-detail-single-selected-ctn").addClass("w-layout-hidden").removeClass("w-layout-show");
            $(this.el).find(".contact-right-edit-or-new-ctn").siblings(".contact-detail-multi-selected-ctn").addClass("g-page-hide").removeClass("g-page-show");
            this.el.find("input[name=operation]").val("2");

            var groupsMenuList = me.contactCollection.getGroupMenuList("phone");
            groupsMenuList = _.filter(groupsMenuList, function(group) {
                return group.value >= 0;
            });
            var groupMenu = null;
            groupMenu = new UIMenu({
                list : groupsMenuList,
                multiCheck : true,
                autoDestroy:true
            });
            groupMenu.decorate(this.el.find(".contact-right-edit-or-new-ctn [name=group]"));
            groupMenu.addClass('g-menu-group-edit');
            groupMenu.off(UIMenu.MULTI_CHANGE).on(UIMenu.MULTI_CHANGE, function(selItems) {
                var groupIds = [];
                for (var i = 0; i < selItems.length; i++) {
                    groupIds.push(selItems[i].value);
                }
                groupMenu.target.attr("value", groupIds.toString());
            });

            var number_items = $(this.el).find(".contact-right-edit-or-new-ctn .number_item");
            var typeList = [];
            _.each(number_items, function(item) {
            var phoneTypes = [{
                index : 0,
                label : i18nDi.fillDomText("contact.Mobile"),
                value : "mobile"
            }, {
                index : 1,
                label : i18nDi.fillDomText("common.phoneText"),
                value : "phone"
            }];
          var emailTypes=[{
            index : 2,
            label : i18nDi.fillDomText("common.email"),
            value : "Email"
            }];
                if ($(item).find("input[name=data]").attr("type") == "email") {
                    typeList = emailTypes;
                } else {
                    typeList = phoneTypes;
                }
                var new_number_menu = new UIMenu({
                    list : typeList,
                    autoDestroy:true
                });
                new_number_menu.decorate($(item).find('[name=typename]'));
                new_number_menu.addClass("phone-type-menu");
                new_number_menu.on(UIMenu.SELECT, function(item) {
                    new_number_menu.target.attr("value", item.value);
                    new_number_menu.target.find(".name_sp").html(item.label);
                });
                /*绑定销毁事件*/
                $(item).delegate(".delete-item-btn", "click", function(ev) {
                    $(item).remove();
                    new_number_menu.off(UIMenu.SELECT);
                    new_number_menu = undefined;
                    $(item).undelegate();
                });

            });
            me.el.find(".contact-detail-edit-container .add-item-btn").attr("i18n-Key", "contact.addTipText");
            utils.tooltip.attach(me.el.find(".contact-detail-edit-container .add-item-btn"));
            utils.placeholder(me.el.find(".contact-detail-edit-container input[name='displayName']"),i18nDi.fillDomText('common.nameLabel'));
        },
        onBatchSelected : function(type, model) {
            if (type == "add") {
                if (!this.muiltSelectedCollection.getModelById(model.getId())) {
                    this.muiltSelectedCollection.push(model);
                }
            } else {
                this.muiltSelectedCollection.remove(this.muiltSelectedCollection.getModelById(model.getId()));
            }
             this.multiSelectGrid.collection.trigger("update");
            console.log(this.muiltSelectedCollection);
           
            /*多选表格*/
            var multiSelectContainer = $(".contact-detail-multi-selected-ctn");
            multiSelectContainer.find(".contacts-count").text(Object.keys(this.muiltSelectedCollection.getModelMap()).length);
            multiSelectContainer.addClass("g-page-show").removeClass("g-page-hide");
            multiSelectContainer.siblings(".contact-detail-single-selected-ctn,.contact-right-edit-or-new-ctn").addClass("w-layout-hidden").removeClass("w-layout-show");
        },
        onBatchSelectedAll : function(selected,curCollection) {
            var me = this;

            var multiSelectContainer = $(".contact-detail-multi-selected-ctn");
            me.muiltSelectedCollection.clear();
            if (selected) {
                var modelMap = (curCollection&&curCollection.getModelMap())||this.contactCollection.getModelMap();
                /*全选*/
                $.each(modelMap, function(index, modelItem) {
                    if (!me.muiltSelectedCollection.getModelById(modelItem.getId())) {
                        me.muiltSelectedCollection.push(modelItem);
                    }
                });
                me.muiltSelectedCollection.setSelectedAll(true);
                me.muiltSelectedCollection.trigger("update");
                multiSelectContainer.find(".contacts-count").text(me.muiltSelectedCollection.models.length);
                multiSelectContainer.removeClass("g-page-hide").addClass("g-page-show");
                multiSelectContainer.siblings().addClass("w-layout-hidden").removeClass("w-layout-show");
            } else {
                me.muiltSelectedCollection.trigger("update");
                multiSelectContainer.find(".contacts-count").text(Object.keys(this.muiltSelectedCollection.getModelMap()).length);
                multiSelectContainer.addClass("g-page-hide").removeClass("w-layout-show");
            }

        },
        /*删除一个多选项时*/
        onRemoveHandler : function(event) {
            var modelId = $(event.target).parents(".selected-contact-item").attr("data-id");
            var multiSelectContainer = $(".contact-detail-multi-selected-ctn");
            $(event.target).parents(".selected-contact-item").remove();
            var model = this.muiltSelectedCollection.getModelById(modelId);
            this.muiltSelectedCollection.remove(model);
            multiSelectContainer.find(".contacts-count").text(Object.keys(this.muiltSelectedCollection.getModelMap()).length);
            this.trigger(HANDLER_NAMES.cancelSelected, model);
            event.stopPropagation();
        },
        /*跳转至群发短信，vt ：视图类型（multiSender群发，simpleSender单发），content:"{jsonstr}"  收信人号码,内容等参数*/
        goToSendBatchMessage : function() {
            var models = this.muiltSelectedCollection.getModelMap();
            var numbers = [];
            var numberTemp=[];//去重所用
            $.each(models, function(index, item) {
                if (item.data.sContactNumber) {
                    for (var i = 0; i < item.data.sContactNumber.length; i++) {
                        if (item.data.sContactNumber[i].value&&numberTemp.indexOf(item.data.sContactNumber[i].value.replace(/\s/g,''))<0) {
                            numbers.push({sDisplayName:item.data.sDisplayName,phoneNumber: item.data.sContactNumber[i].value.replace(/\s/g,'')});
                            numberTemp.push(item.data.sContactNumber[i].value.replace(/\s/g,''));
                        }
                    }
                }
            });
            app.navigate({
                module : 'sms',
                action : 'sms',
                pageState : {
                    vt : "multiSender",
                    content : JSON.stringify(numbers)
                }
            }, {
                cache : false
            });
        },
        /*清除多选*/
        onClearAllSelectedHandler : function() {
            var me = this;
            this.muiltSelectedCollection.clear();
            me.trigger(HANDLER_NAMES.clearAllSelected);
        },
        /*联系人详情*/
        onSingleSelected : function(model) {

            var tpl = this.getTpl("tpl-contact-right-single-selected");
            var collection = this.contactCollection;
            var selectedIds = Object.keys(collection.getSelectedMap());
            if (!model) {
                model = collection.getModelById(selectedIds[0]);
            }

            var dom = _.template(tpl, {
                model : model,
                I18N : i18nDi
            });
            /*清空多选记录*/
            this.muiltSelectedCollection.clear();
            this.muiltSelectedCollection.push(model);
            this.muiltSelectedCollection.setSelected(model.getId(), true);
            this.muiltSelectedCollection.trigger("update");

            this.el.find(".contact-detail-single-selected-ctn").html(dom).removeClass("w-layout-hidden");
            this.el.find(".contact-detail-single-selected-ctn").siblings(".contact-right-edit-or-new-ctn").addClass("w-layout-hidden").removeClass("w-layout-show");
            this.el.find(".contact-detail-single-selected-ctn").siblings(".contact-detail-multi-selected-ctn").addClass("g-page-hide").removeClass("g-page-show");
            
            this.el.find(".contact-detail-content-info .ico-sms").attr("i18n-Key", "contact.smsTipText");
            utils.tooltip.attach(this.el.find(".contact-detail-content-info .ico-sms"));
        },
        /*修改或者添加的保存事件*/
        save : function() {
            if (this.checkContactValidate()) {
                var $ctn = this.el.find(".contact-detail-edit-container");
                $ctn.find(".btn-dlg-save").attr("disabled", "disabled");
                $ctn.find("input").attr("disabled", "disabled");
                $ctn.find("textarea").attr("disabled", "disabled");
                var accountName = this.el.find("input[name=accountName]").val();
                var operation = this.el.find("input[name=operation]");
                var displayName = $ctn.find("input[name=displayName]");
                var iconChanged = $ctn.find("img[name=icon]").attr("changed");
                var icon = $ctn.find("img[name=icon]").attr("src");
                var note = $ctn.find("textarea[name=comments]");
                var email = $ctn.find("input[name=email]");
                var groupStrArray = $ctn.find("[name=group]").attr("value").split(',');
                
                
                var group = [];
                groupStrArray.forEach(function(groupStr) {
                    if (groupStr != -1&&groupStr!="") {
                        group.push(Number(groupStr));
                    }
                });
                var id = $ctn.find("input[name=id]");
                var number = [];
                var email = [];
                var nums = $ctn.find(".number_item");
                $.each(nums, function(index, item) {
                    if ($(item).find("input[name=data]").val()) {
                        if ($(item).find("[name=typename]").attr("value").toLowerCase() == "email") {
                            var emailLength = email.length;
                            email.push({
                                label : emailLength + 1,
                                typeId : emailLength + 1,
                                typeName : $(item).find("[name=typename]").attr("value") == undefined ? "Email" + emailLength : $(item).find("[name=typename]").attr("value"),
                                value : $(item).find("input[name=data]").val()
                            });
                        } else {
                            var numberLength = number.length;
                            number.push({
                                label : numberLength + 1,
                                typeId : numberLength + 1,
                                typeName : $(item).find("[name=typename]").attr("value") == undefined ? "mobile" : $(item).find("[name=typename]").attr("value"),
                                value : $(item).find("input[name=data]").val()
                            });
                        }
                    }
                });

                var collection = this.contactCollection;
                var submitModel = _.extend({}, {
                    sDisplayName : displayName.val(),
                    sContactId : Number(id.val()),
                    sNote : note.val(),
                    sContactNumber : number,
                    sContactEmail : email
                });
                if (iconChanged) {
                    submitModel=_.extend(submitModel,{sContactIcon: icon});
                }
                if (group.length > 0) {
                    submitModel=_.extend(submitModel,{groupIds: group});
                }
                console.log(submitModel);
                var me = this;
                var dlgOpt = {
                    buttonKey : 2, //双按钮，2有ok按钮,3 yes cancel 双按钮
                    content : i18nDi.fillDomText('contact.saveFailed'),
                    title : i18nDi.fillDomText('common.actionFailed')
                };
                if (operation.val() == "1") {/*更新*/
                    console.log("调用更新联系人");
                    collection.updateContact(submitModel, function(ret) {
                        var status = null;
                        if (!ret.result) {
                            status = 0;
                            if (ret.code == -4) {
                                dlgOpt.content = i18nDi.fillDomText("driver.noSpaceHint");
                            } else {
                                dlgOpt.content = i18nDi.fillDomText("contact.saveFailed");
                            }
                            var pp = new UIDialog(dlgOpt);
                            pp.show();
                        } else {
                            status = 1;
                            $(me.el).find(".contact-detail-single-selected-ctn").removeClass("w-layout-hidden");
                            $(me.el).find(".contact-right-edit").hide();
                            $(me.el).find(".contact-detail-single-selected-ctn").find("input[name=displayName]").val(ret.sDisplayName);
                            $(me.el).find(".contact-detail-single-selected-ctn").find("textarea[name=note]").val(ret.sNote);
                            me.trigger(HANDLER_NAMES.savedOk, ret);
                        }

                        //*********************************************************
                        //20140924
                        var logObject = {
                            page: "mycontacts_home",
                            module: "rightarea",
                            action: "edit_result",
                            status: status
                        }
                        utils.sendNewLog("1000120", logObject);
                        //********************************************************* 

                        $ctn.find(".btn-dlg-save").removeAttr("disabled");
                        $ctn.find("input").removeAttr("disabled");
                        $ctn.find("textarea").removeAttr("disabled");
                    });
                } else if (operation.val() == "2") {
                    delete submitModel.sContactId;
                    collection.addContact(submitModel, function(ret) {
                        displayName.val("");
                        icon = "";
                        note.val("");
                        $ctn.find("input[name=data]").val("");

                        $ctn.find(".btn-dlg-save").removeAttr("disabled");
                        var status = null;
                        if (!ret.result) {
                            status = 0;
                            if (ret.code == -4) {
                                dlgOpt.content = i18nDi.fillDomText("driver.noSpaceHint");
                            } else {
                                dlgOpt.content = i18nDi.fillDomText("contact.saveFailed");
                            }
                            var pp = new UIDialog(dlgOpt);
                            pp.show();
                        } else {
                            status = 1;
                            me.trigger(HANDLER_NAMES.savedOk, ret);
                        }

                        //*********************************************************
                        //20140924
                        var logObject = {
                            page: "mycontacts_home",
                            module: "rightarea",
                            action: "fullnew",
                            status: status
                        }
                        utils.sendNewLog("1000120", logObject);
                        //********************************************************* 
                        $ctn.find("input").removeAttr("disabled");
                        $ctn.find("textarea").removeAttr("disabled");
                    });
                }
            }
        },
        checkContactValidate : function(event) {
            var ctn = this.el.find(".contact-detail-edit-container");
            var name = ctn.find("input[name=displayName]")[0];
            var dataInput = ctn.find("input,textarea");
            var checkOk = true;
            for(var i=0;i<dataInput.length;i++){
                var item = dataInput[i];
                if (!item.checkValidity()){
                    checkOk = false;
                    $(item).focus();
                    return checkOk;
                } else {
                    $(item).removeClass("err-input");
                }
            }
            return checkOk;
        },
        setModel : function(model) {
            this.model = model;
            this.model.trigger("change");
        },
        cancel : function() {
            var me = this;
            me.trigger(HANDLER_NAMES.canceled);
        },
        closeHandler : function() {
            $(this.el).find(".contact-detail-single-selected-ctn").removeClass("w-layout-hidden");
            $(this.el).find(".contact-right-edit").hide();
        }
    });
    ContactDetailPanel.HANDLER_NAMES = HANDLER_NAMES;
    return ContactDetailPanel;
});
