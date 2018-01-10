require([
    'bdtpl',
    'dialog',
    'dialogmin',
    'customEvent' ,
    'text!./apworkbench/js/appAuth/tmpl/rolelist.html',
    'text!./apworkbench/js/appAuth/tmpl/roletable.html' ,
    'text!./apworkbench/js/appAuth/tmpl/appstable.html'
], function () {

    var baidu = require('bdtpl');
    var customEvent = require('customEvent');
    var dialog = require('dialog');
    var dialogmin = require('dialogmin');


    var layout = baidu.template(require('text!./apworkbench/js/appAuth/tmpl/rolelist.html'));
    var roletable = baidu.template(require('text!./apworkbench/js/appAuth/tmpl/roletable.html'));
    var appstable = baidu.template(require('text!./apworkbench/js/appAuth/tmpl/appstable.html'));

    var getRoleListUrl = "./roleMGT/listWithPaging";
    var appListByRoleId = "./rolemgr/appListByRoleId";

    var $wrap = $("#appAuth");
    var rolePN = 1;
    $wrap.empty().append(layout({}));

    var $rolebox = $wrap.find(".role");
    var $wbox = $wrap.find("#applist");

    initpage();
    function initpage() {
        //
        if (getUrlParam("pn")) {
            updateRoleList(getUrlParam("pn"));
            rolePN=parseInt(getUrlParam("pn"));
        }else{
            updateRoleList();
        }
        addEvent();
    }

    //更新角色列表
    function updateRoleList(pn) {
        $.ajax({
            url: getRoleListUrl,
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify({"pn": pn || "1"}),
            contentType: 'application/json',
            success: function (result) {
                if (result.status == 1) {
                    $rolebox.empty().append(roletable({data: result.data, pn: pn || "1"}));
                    if (getUrlParam("roleId")) {
                        $wrap.find('tr[data-roleid=' + getUrlParam("roleId") + ']').trigger("click");
                    } else {
                        $wrap.find('tr[data-roleid]:first').trigger("click");
                    }
                } else {
                    result.msg ? alert(result.msg) : '';
                }
            },
            error: function (e) {
                alert(e.message || "网络请求失败");
            }
        });
    }

    //更新小应用列表
    function updateAppsList(wid) {
        $.ajax({
            url: appListByRoleId,
            data: JSON.stringify({"ROLEID": wid}),
            dataType: "json",
            cache: false,
            type: "post",
            contentType: "application/json",
            success: function (res) {

                if (res.status) {
                    $wbox.empty().append(appstable({data: res.data}))
                } else {
                    console.log("XHR Error: " + appListByRoleId);
                    return  alert(res.msg ? res.msg : "");
                }

            },
            error: function (res) {
                console.log(res ? "Error:" + res : "");
                dialog({
                    title: "提示",
                    content: "widget列表显示失败！",
                    cancel: false,
                    ok: function () {
                    }
                }).show();
            }
        });
    }

    //事件监听
    function addEvent() {
        $wrap.on("click", "#role_tbody tr", function (e) { //加载对应角色的数据
            e.stopPropagation();
            e.preventDefault();
            var s_id = $(this).data("roleid");
            updateAppsList(s_id);
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
        })
            .on("click", "#role_tbody button.auth", function (e) { //加载对应角色的数据
                e.stopPropagation();
                e.preventDefault();
                var r_id = $(this).parent().parent().data("roleid");
                var pageurl =  "/wbalone/data:layout/auth_after_rolemgr?roleId=" + r_id+"&pn="+rolePN.toString();
                window._roleId = r_id;
                window._pn = rolePN.toString();
                window.loadPage(pageurl);
                //window.location.href = "#manage/auth_after_rolemgr?roleId=" + r_id+"&pn="+rolePN.toString();
            });
        $wrap.on("click", ".role .lastP,.role .nextP", function (e) {
            e.stopPropagation();
            e.preventDefault();
            if ($(this).hasClass('lastP')) {
                //pn--
                rolePN--;
            }
            if ($(this).hasClass('nextP')) {
                //pn++
                rolePN++;
            }
            updateRoleList(rolePN.toString());
        });
    }

    //获取url中的参数
    function getUrlParam(name) {
        var aQuery = window.location.href.split("?");//取得Get参数
        var aGET = {};
        if (aQuery.length > 1) {
            var aBuf = aQuery[1].split("&");
            for (var i = 0, iLoop = aBuf.length; i < iLoop; i++) {
                var aTmp = aBuf[i].split("=");//分离key与Value
                aGET[aTmp[0]] = aTmp[1];
            }
        }
        return  aGET[name];
    }
});
