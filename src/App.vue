<template>
<div id="app">
  <!-- 头部导航 -->
  <!-- <div class="collapse-btn" :class="{collapseColor: collapse}" @click="changeNav">
    <i style="font-size: 30px;line-height: 70px;color: red" class="el-icon-pt-fenlei1"></i>
  </div> -->
  <header class="header" :class="themeColor">
    <el-row>
      <el-col :lg="12" :md="12" :sm="12" :xs="10" class="logo" style="min-width: 130px; position: absolute">
        <a href="/ifbp-mall"><img src="./assets/images/imfbp_logo_color.png" alt="Logo"></a>
        <a class="headerTitle">构建生态金融</a>
        <i class="el-icon-arrow-left shotcut" v-if="showBack" @click="goBack" title="返回"></i>
        <i class="el-icon-pt-shouye shotcut" @click="jumpTo('/index')" title="首页"></i>
        <i class="el-icon-pt-leimu shotcut" @click="jumpTo('/appArea')" title="应用中心"></i>
        <!-- <i class="el-icon-pt-leimu shotcut" @click="" title="磁贴"></i> -->
        <!-- <div class="title" style="line-height: 70px;font-size: 20px;display: inline-block;vertical-align: top;">互联网小微金融业务平台</div> -->
        <!-- <span class="topTitle">我的工作台</span> -->
      </el-col>
      <el-col :lg="0" :md="0" :sm="0" :xs="0" style="display: inline-block;">
        <headerMenu ref="headerMenu" :menuData="menuData"></headerMenu>
      </el-col>
      <el-col :lg="12" :md="12" :sm="12" :xs="14" class="person-set" style="min-width: 186px; position: absolute; right: 0">
        <el-user :username="username" msgcenter="messageCenter" :msgcount="unreadcnt" @logout="logout" :show-message="false" style="margin-right:15px;">
          <!-- <el-dropdown-item slot="item"><span @click="sysmgr">管理中心</span></el-dropdown-item> -->
          <!--             <li>
              <el-button type="text"
                         @click="openDialog"
                         style="font-size: 12px;display: inline-block;width: 100%;height: 70px;">
                <i v-if="!addCard" class="el-icon-plus topIco iconfont" style="color:black"></i>
                <i v-if="addCard" class="el-icon-close topIco iconfont" style="color:black"></i>
              </el-button>
            </li> -->
          <!--<li style="padding: 0 10px;">-->
          <!--<el-button @click="requestMenu(1)" v-if="style === 'ifr'" type="text"><span>切换风格</span></el-button>-->
          <!--<el-button @click="requestMenu()" v-if="style === 'tile'" type="text"><span>切换风格</span></el-button>-->
          <!--</li>-->
        </el-user>
      </el-col>
    </el-row>
  </header>

  <!-- 导航 -->
  <!-- <transition name="fade">
      <el-main-nav v-if="menuList"
                   :type="type"
                   :menuList="menuList"
                   :collapse="collapse"
                   :theme="themeColor">
      </el-main-nav>
    </transition> -->

  <main>
    <!-- 主内容区 -->
    <!-- <transition name="fade">
      <div id="main-left" :class="{collapse: collapse}">
        <el-main-nav v-if="menuList" :type="type" :menuList="menuList" :collapse="collapse" :theme="themeColor">
        </el-main-nav>
      </div>
    </transition> -->
    <div id="main-right" :class="{collapse: collapse}" :style="{overflow: $root.$router.path && $root.$router.path.indexOf('staff') > 0 ? 'hidden' : 'auto'}">
        <!-- 多页签代码 -->
        <!-- <el-tabs style="background-color: #fff;" v-model="editableTabsValue" type="card" closable @tab-click="handleTabClick" @tab-remove="handleTabRemove">
          <el-tab-pane
            v-for="(item, index) in editableTabs"
            :key="item.name"
            :label="item.label"
            :name="item.name"
            :data-path="item.path"
          >
          </el-tab-pane>
        </el-tabs> -->
        <transition name="fade">
          <!--<router-view v-if="menuList" :menuList="gList" class="view" style="display:flex;flex-direction: column;padding-bottom:100px"></router-view>-->
          <!-- <keep-alive> -->
            <router-view class="view" style="display:flex;flex-direction: column;padding-bottom:0px;height:100%; min-width: 320px;"></router-view>
          <!-- </keep-alive> -->
        </transition>
    </div>

  </main>

  <!--添加磁贴-->
  <!-- <el-side-dialog :show="addCard" :list="list"></el-side-dialog>
  <div class="chartClick" style="position:absolute;right:10px;bottom:10px;">
    <el-button type="primary" @click="showChart">聊天</el-button>
  </div>
  <iframe class="chartIframe" src="pages/im/index.html" width="100%" height="" v-if="chartShow" v-clickoutside="handleClickoutside"></iframe> -->

</div>
</template>

<script>
import Vue from 'vue';
import Router from 'vue-router';
import Element from 'ifbp-element';
import router from './router';
import nullRouter from './common/nullRouter.vue';
import './apps/common/css/index.css';
// import 'ifbp-element/lib/theme-default/index.css';
import 'assets/css/mainStyle.css';
import 'assets/css/pageStyle.css';
import 'assets/css/icon.css';
import {
  bus
} from 'bus.js';
import headerMenu from './common/header-menu/menu.vue';
import Clickoutside from 'ifbp-element/lib/utils/clickoutside';
//import sidebarjson from '../static/sidebar.json';

// 引入组件
window.Vue=Vue;
Vue.use(Element);
Vue.filter('time', value => new Date(parseInt(value, 10) * 1).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " "));
Vue.filter('time1', value => new Date(parseInt(value, 10) * 1).toLocaleString()
  .replace(/年|月/g, "-")
  .replace(/日/g, " ")
  .replace(/上午|下午/g, " "));

export default {
  name: 'app',
  data() {
    return {
      chartShow:false,
      unreadcnt: 0,
      active: true,
      style: 'ifr',
      type: 'click',
      collapse: 'false',
      headerFixed: true,
      leftFixed: true,
      addCard: false,
      resetShow: false,
      themeColor: '',
      menuList: [{
        id: '/index',
        name: '首页',
        icon: 'el-icon-pt-shouye'
      }],
      menuData: [],
      gList: [],
      username: '',
      intervalid1: '',
      list: [{
          src: require('./assets/images/1.png')
        },
        {
          src: require('./assets/images/2.png')
        },
        {
          src: require('./assets/images/1.png')
        },
        {
          src: require('./assets/images/3.png')
        },
        {
          src: require('./assets/images/2.png')
        },
        {
          src: require('./assets/images/3.png')
        }
      ],
      showMenu: false,
      showBack: false,
      editableTabsValue: '1',
      editableTabs: [],
      tabIndex: '1',
      allList: [{path:'/index', label: '首页'}, {path:'/appArea', label: '应用中心'}]
    };
  },
  components: {
    headerMenu,
  },
  directives: { Clickoutside },
  methods: {
    showChart(){
      this.chartShow = true;
    },
    handleClickoutside() {
      this.chartShow = false;
    },
    getCookie(cName) {
      let cStart;
      let cEnd;
      if (document.cookie.length > 0) {
        cStart = document.cookie.indexOf(cName + "=");
        if (cStart !== -1) {
          cStart = cStart + cName.length + 1;
          cEnd = document.cookie.indexOf(";", cStart);
          if (cEnd === -1) {
            cEnd = document.cookie.length;
          }
          return decodeURIComponent(document.cookie.substring(cStart, cEnd));
        }
      }
      return "";
    },
    openDialog() {
      this.addCard = !this.addCard;
    },
    changeNav() {
      this.collapse = !this.collapse;
    },
    sysmgr() {
      window.location.hash = 'sysmgr';
    },
    logout() {
      localStorage.removeItem('wbalone_isLogin');
      var protocol = window.location.protocol; // 协议
      var host = window.location.host; // ip+端口
      var currentUrl = protocol + '//' + host + window.ctxs.ap + '/'; // 当前URL
      var logoutUrl = this.getCookie("_A_P_logoutUrl") || ''; // 需要跳转的URL
      var serviceUrl = logoutUrl.replace(/"/g, '') + '?service=' + currentUrl;
      // var serviceUrl = window.location.href;
      window.location.href = window.ctxs.ap + '/logout?service=' + encodeURIComponent(serviceUrl);
    },
    requestMenu() {
      const url = window.ctxs.ap + '/appMGT/appCenter/allList?showway=apparea&areaId=&groupId=';
      window.appRouterArr = [];
      this.$http({
        url: url,
        method: 'get'
      }).then((res) => {
        if (res.data.msg === 'success') {
          var data = res.data.data;
          var arr = [];
          var successFun = (conf) => {
            var appKey;
            for(var key in conf){
              appKey = key;
            }
            var baseUrl = '/' + appKey;
            var appObj = conf[appKey];
            var routers = appObj.routers;

            for (var k = 0; k < routers.length; k++) {
              routers[k].BaseComponent = routers[k].component;
              routers[k].component = nullRouter;
            }
            var appRouter = new Router({
              routes: routers
            });
            window.appRouterArr.push(appRouter);

            appRouter.beforeEach((to, from, next) => {
              var matchPath = to.matched[0].path;
              var curPage;
              var curPageJs;
              var curPageCss;
              var requireMode;
              for (var j = 0; j < routers.length; j++) {
                if (routers[j].path === matchPath) {
                  curPage = routers[j].curPage;
                  requireMode = appKey + '^' + routers[j].BaseComponent;
                }
              }
              if (curPage && requireMode) {

                // curPageJs = curPage + '.js';
                // curPageCss = curPage + '.css';
                var cur = appObj[curPage];
                curPageJs = cur.js;
                curPageCss = cur.css;
                // var commonIndexJs = 'index.js';
                // var commonIndexCss = 'index.css';
                var commono = appObj.common;
                var commonIndexJs = commono.js;
                var commonIndexCss = commono.css;
                var module1 = baseUrl + '/pages/' + curPageJs;
                var module2 = 'css!' + baseUrl + '/pages/' + curPageCss;
                var module3 = baseUrl + '/common/' + commonIndexJs;
                var module4 = 'css!' + baseUrl + '/common/' + commonIndexCss;
                // window.requirejs.undef(module1)
                // window.requirejs.undef(module2)
                // window.requirejs.undef(module3)
                // window.requirejs.undef(module4)
                // window.require([module1, module2, module3, module4], () => {
                //   window.require([requireMode], (obj) => {
                //     router.addRoutes([{
                //       path: matchPath,
                //       component: Vue.extend(obj.default)
                //     }]);
                //     if (router.getMatchedComponents(to.path).length > 0) {
                //       router.push(to.fullPath);
                //     }
                //   });
                // });
                try{
                   window.require([module1, module2, module3, module4], () => {
                    window.require([requireMode], (obj) => {
                      router.addRoutes([{
                        path: matchPath,
                        component: Vue.extend(obj.default)
                      }]);
                      if (router.getMatchedComponents(to.path).length > 0) {
                        router.push(to.fullPath);
                      }
                    });
                  });
                }catch(e){
                   window.require([requireMode], (obj) => {
                    router.addRoutes([{
                      path: matchPath,
                      component: Vue.extend(obj.default)
                    }]);
                    if (router.getMatchedComponents(to.path).length > 0) {
                      router.push(to.fullPath);
                    }
                  });
                }

              }
              next(true);
            });
            if (window.notFoundPath) {
              appRouter.push(window.notFoundPath);
            }
          };
          if (Object.prototype.toString.call(data) === '[object Array]') {
            for (let i = 0; i < data.length; i++) {
              // arr.push({
              //   id: '/appArea_' + i,
              //   name: data[i] ? data[i].label : '',
              //   icon: data[i] ? data[i].areaIcon : ''
              // });
              // data[i].path = '/appArea_' + i;

              // if (data[i].value === '融资租赁') {
              //   data[i].areaKey = 'ifbp-fe';
              // } else {
              //   data[i].areaKey = 'webalone';
              // }
              // data[i].areaKey = 'fin_lease';
              if (data[i].areaKey && data[i].areaKey !== 'webalone') {
                var baseUrl = '/' + data[i].areaKey;
                var configUrl = baseUrl + "/config.js";
                $.ajax({
                  type: "get",
                  url: configUrl,
                  dataType: "json",
                  async: true,
                  success: successFun.bind(this)
                });
              }
            }
            this.menuData = data;
            /* 循环收集所有路由到一个allList数组里,后面对应mainHeaderTitle需要 */
            var self = this;
            this.allList = [{path:'/index', label: '首页'}, {path:'/appArea', label: '应用中心'}];
            if(data.length) {
              data.forEach((item) => {
                if(item.children && item.children.length) {
                  item.children.forEach((item1) => {
                    if(item1.children && item1.children.length) {
                      item1.children.forEach((item2) => {
                        self.allList.push(item2);
                      });
                    } else {
                      self.allList.push(item);
                    }
                  });
                }
              });
            }
            self.findTitleToReset(self.$route.fullPath, self.allList);
          }
          this.menuList = this.menuList.concat(arr);
        }
      });
    },
    requestMsg() {
      this.$http({
        url: '/ifbp-app-sm/sm/messageCenter/queryNum',
        method: 'get'
      }).then((res) => {
        if (res.data.success === true) {
          this.unreadcnt = res.data.data;
        }

      });
      // this.unreadcnt=json.data;
      // console.log(this.unreadcnt);
    },
    resize() {
      // var windowWidth = window.innerWidth ||
      //   ((document.body) && (document.body.clientWidth)); // 窗口宽度
      var windowHeight = window.innerHeight ||
        ((document.body) && (document.body.clientHeight)); // 窗口高度
      var headerHeight = document.querySelector("header.header").offsetHeight; // header高度
      var mainRightHeight = windowHeight - headerHeight; // #main-right 高度
      document.querySelector("#main-right").style.height = mainRightHeight + 'px'; // 为 main-right 设置高度

      // if (windowWidth < 900) {
      //   this.collapse = false;
      // } else {
      //   this.collapse = true;
      // }
    },
    hideMenuHandle() {

    },
    jumpTo(path) {
      this.$router.push(path);
    },
    goBack() {
      this.$router.go(-1);
    },
    handleTabClick(instance) {
      var path = instance.$el.getAttribute("data-path");
      this.$router.replace(path);
    },
    handleTabRemove(targetName) {
      /*console.log(targetName);
      var pos = (parseInt(targetName, 10)-1);
      this.editableTabs.splice(pos,1);*/

      if(this.editableTabs.length === 1) {
        return;
      }
      const tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
              this.$router.replace(nextTab.path);
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    },
    addEditableTabs(options) {
      this.editableTabs.push({
        path: options.path,
        label: options.label,
        name: this.tabIndex
      });
      this.editableTabsValue = this.tabIndex;
      this.tabIndex = (parseInt(this.tabIndex, 10)+1).toString();
    },
    slicePath(path) {
      var lastIndex = path.lastIndexOf("/");
      var newPath = '';
      if(lastIndex >0) {
        newPath = path.slice(0, lastIndex);
      }
      return newPath;
    },
    findTitleToReset(path, allList) {
      if(!path) {
        return;
      }
      var setted = false;
      // 每次路由跳转，设置对应的菜单标题
      for(var i = 0; i < allList.length; i++) {
        if(path.lastIndexOf("/") === 0) { // 对应/crm/personalInfo/add 按 /crm/crmList 的title
          if((allList[i].path.match(/\/\w+/) && allList[i].path.match(/\/\w+/)[0]) === path) {
            this.$refs.headerMenu.mainHeadTitle = allList[i].label;
            setted = true;
            break;
          }
        } else if (allList[i].path === path) { // 其他类型的直接判断是否相等
          this.$refs.headerMenu.mainHeadTitle = allList[i].label;
          setted = true;
          break;
        }
      }
      if(!setted) {
        // 递归查找
        this.findTitleToReset(this.slicePath(path), allList);
      }
    }
  },
  created() {
    this.$on('groupList', (hash) => {
      window.location.hash = hash;
    });
    this.$on('changeR', () => {
      this.resetShow = !this.resetShow;
    });
    bus.$on('selectTheme', (e) => {
      this.themeColor = e;
    });
    this.$on('closeSideDialog', () => {
      this.addCard = !this.addCard;
    });
    const localColor = localStorage.getItem('themeColor');
    this.themeColor = localColor;
    const username = this.getCookie('_A_P_userName');
    if (username.indexOf('%') > -1) {
      this.username = decodeURIComponent(username);
    } else {
      this.username = username;
    }
    this.requestMenu();
    this.requestMsg();
    this.intervalid1 = setInterval(() => {
      this.requestMsg();
    }, 120000);
  },
  mounted() {
    /* 页签代码 */
    /*var path = this.$router.history.pending.fullPath;
    var label = this.$router.history.pending.meta.title || '新页签';
    this.addEditableTabs({
      path: path,
      label: label
    });*/
    this.resize();
    window.addEventListener('resize', () => {
      this.resize();
    });
  },
  beforeDestroy() {
    clearInterval(this.intervalid1);
  },
  watch: {
    '$route'(val) {
      // 首页隐藏返回按钮
      if((val && val.fullPath) === '/index') {
        this.showBack = false;
      } else {
        this.showBack = true;
      }
      // 每次路由跳转，设置对应的菜单标题
      this.findTitleToReset(val.fullPath, this.allList);
    }
  }
};
</script>

<style scoped>
.header .person-set,
.header .logo {
  display: inline-block;
  vertical-align: top;
}
/*.header .logo {
    width: calc(100% - 123px);
    min-width: 400px;
  }
  .header .person-set {
    width: 123px;
  }*/
</style>

<style>
html {
  min-width: 320px;
  font-size: 16px;
}

body {
  overflow: hidden;
  /* position:absolute; */
  width: 100%;
  top: 0;
  bottom: 0;
  margin: 0;
}

#app {
  margin: 0 auto;
  font-family: "Microsoft Yahei", "Hiragino Sans GB", "Helvetica Neue", Helvetica, tahoma, arial, Verdana, sans-serif, "WenQuanYi Micro Hei", "\5B8B\4F53";
  position: relative;
  height: 100%;
  background-color: rgba(239, 243, 246, 1);
}

.chartIframe {
  position: fixed !important;
  bottom: 0;
  right:0;
  z-index: 100  !important;
  /*pointer-events：none;*/
  /*display: none;*/
}



/* reset element-ui*/

.h1,
.h2,
.h3,
.h4,
.h5,
.h6,
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Microsoft Yahei", "Hiragino Sans GB", "Helvetica Neue", Helvetica, tahoma, arial, Verdana, sans-serif, "WenQuanYi Micro Hei", "\5B8B\4F53";
}

.el-dropdown-menu {
  margin: 0!important;
}

.el-dropdown-link {
  display: inline-block;
  line-height: 70px;
}

.el-dropdown-link i {
  font-size: 22px;
  vertical-align: middle;
}

.index .el-tabs__header {
  padding-top: 6px!important;
}

.index>.el-tabs__header .el-tabs__nav-wrap {
  padding-left: 35px!important;
}

.index>.el-tabs__header .el-tabs__nav {
  border-bottom: 1px solid #ffffff!important;
}

.index .el-tabs__item {
  -webkit-border-radius: 0!important;
  -moz-border-radius: 0!important;
  border-radius: 0!important;
  height: 36px!important;
  line-height: 36px!important;
  padding: 0 13px!important;
  border-bottom: 1px solid #d1dbe5!important;
  margin-bottom: -1px;
}

.index>.el-tabs__header .el-tabs__item.is-active {
  color: #000!important;
  border-bottom: 1px solid #ffffff!important;
  font-weight: bold;
}

.side div.el-dialog {
  position: fixed;
  border-radius: 0;
  left: initial;
  right: 0;
  height: 100%;
  transform: translateX(0)!important;
  z-index: 999;
}





/* 头部导航 */

header.header {
  position: fixed;
  padding-top: 0;
  right: 0;
  z-index: 1000;
  /* width: calc(100% - 90px); */
  width: 100%;
  min-width: 190px;
  transition: all .5s ease;
  background-color: #FFFFFF;
  color: #71787E;
  /*box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);*/
  border-bottom: 2px solid rgba(230, 0, 18, 1);
  box-sizing: border-box;
}

header.header a,
header.header p {
  color: #71787E;
}

.header .logo {
  height: 70px;
  line-height: 70px;
  text-align: left;
  /* min-width: 160px; */
}
.header .headerTitle{
  font-size: 14px;
  font-family: inherit;
  color: rgb(0,0,0);
  text-decoration: none;
}

.header .logo>a {
  height: 70px;
  line-height: 70px;
  display: inline-block;
}

.header .logo img {
  vertical-align: middle;
  display: inline-block;
  margin-left: 10px !important;
  /*padding: 0 10px;*/
  height: 30px;
}

.header .topTitle {
  font-family: "Microsoft Yahei", "Hiragino Sans GB", "Helvetica Neue", Helvetica, tahoma, arial, Verdana, sans-serif, "WenQuanYi Micro Hei", "\5B8B\4F53";
  font-size: 18px;
  color: black;
  padding: 4px 0 4px 20px;
  border-left: 1px solid #71787E;
}

.header .person-set {
  float: right;
}

.header .shotcut {
  font-size: 16px;
  padding: 8px;
  border-radius: 20px;
  cursor: pointer;
}
.header .shotcut:hover {
  background-color: #e8e8e8;
}

header.header .logo > a+i{
  margin-left: 10px;
}

.collapse-btn {
  width: 90px;
  height: 70px;
  line-height: 70px;
  text-align: center;
  /*box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);*/
  border-bottom: 2px solid rgba(230, 0, 18, 1);
  background: #FFFFFF;
  position: fixed;
  transition: all .5s ease;
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
}

.collapse-btn:hover {
  cursor: pointer;
}





/* 主内容区 */

main {
  height: 100%;
  /* min-width: 1190px!important; */
  padding-top: 72px!important;
  box-sizing: border-box;
  background: #fff;
}

#main-right {
  width: calc(100%);
  background: #eeeff1;
  float: right;
  height: 100%;
  overflow: auto;
  border: 1px solid rgba(230, 234, 238, 1);
  border-left: none;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  transition: all .5s ease;

  overflow-scrolling: touch;
  -webkit-overflow-scrolling: touch;
}

#main-right.collapse {
  /* width: calc(100% - 90px); */
  width: 100%;
  background: #eeeff1;
  transition: all .5s ease;
  display: block;
}

#main-left {
  position: fixed;
  z-index: 1000;
  height: 100%;
  display: block;
  overflow-y: auto;
  width: 90px;
  float: left;
  top: 70px;
  left: -90px;
  transition: all .5s ease;
}

#main-left.collapse {
  transition: all .5s ease;
  left: 0;
  background: white;
}

.collapseColor {
  transition: all .5s ease;
  background: #eeeeee;
  background: white;
}

.collapseColor i {
  transition: all .5s ease;
  /*color: #ffffff!important;*/
}

.index>.el-tabs__header {
  z-index: 100;
  background: #ffffff;
  width: 100%;
  position: absolute;
}

.index>.el-tabs__content {
  overflow-y: scroll;
  height: 100%;
  max-height: 750px;
  margin-top: 42px;
}





/*主题颜色*/

header.default {
  background-color: #ffffff;
}

header.blue {
  background-color: #09ACF8;
}

header.green {
  background-color: #72C11C;
}

header.violet {
  background-color: #967ADC;
}

header.red {
  background-color: #E84C3D;
}

header.orange {
  background-color: #F39800;
}

header.blue .el-dropdown:hover {
  color: #099FE5;
  background: #099FE5;
}

header.green .el-dropdown:hover {
  color: #70A00A;
  background: #70A00A;
}

header.violet .el-dropdown:hover {
  color: #8A70CA;
  background: #8A70CA;
}

header.red .el-dropdown:hover {
  color: #D74537;
  background: #D74537;
}

header.orange .el-dropdown:hover {
  color: #DD8B02;
  background: #DD8B02;
}

header.blue .el-button--text:focus,
header.blue .el-button--text:hover {
  color: #099FE5;
}

header.blue .person-set button:hover {
  background: #099FE5;
}

header.green .el-button--text:focus,
header.green .el-button--text:hover {
  color: #70A00A;
}

header.green .person-set button:hover {
  background: #70A00A;
}

header.violet .el-button--text:focus,
header.violet .el-button--text:hover {
  color: #8A70CA;
}

header.violet .person-set button:hover {
  background: #8A70CA;
}

header.red .el-button--text:focus,
header.red .el-button--text:hover {
  color: #D74537;
}

header.red .person-set button:hover {
  background: #D74537;
}

header.orange .el-button--text:focus,
header.orange .el-button--text:hover {
  color: #DD8B02;
}

header.orange .person-set button:hover {
  background: #DD8B02;
}





/*  */

.router-link {
  display: inline-block;
  width: 100%;
  height: 100%;
  text-align: center;
  color: #475669;
  text-decoration: none;
}

.is-active .router-link {
  color: #20a0ff;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}

.list-enter,
.list-leave-active {
  opacity: 0;
  transform: translateY(30px);
}





/* 导航栏菜单选中效果 */

#app main .aside .is-active {
  color: #475669;
}





/* 卡片 */

.el-card {
  overflow: visible!important;
}

.formImg {
  width: 76px;
  height: 76px;
  float: left;
  margin-top: -16px;
  margin-right: 10px;
}





/*滚动条 start*/

 ::-webkit-scrollbar {
  width: 8px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.298039215686275);
}





/*定义滚动条轨道 内阴影+圆角*/

 ::-webkit-scrollbar-track {
  width: 8px;
  background: rgba(230, 234, 238, 0.9);
}





/*定义滑块 内阴影+圆角*/

 ::-webkit-scrollbar-thumb {
  width: 8px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.298039215686275);
}

 ::-webkit-scrollbar-thumb:hover {
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.298039215686275);
}

#main-right::-webkit-scrollbar {
  width: 0;
  height: 0;
}


</style>
