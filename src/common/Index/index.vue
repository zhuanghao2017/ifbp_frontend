<template>
  <div class="" id="content" style="height:100%">
    <img id="wel" class="begin_img" src="../../assets/images/begin.png" alt="" v-if="noWgt">
   <!--  <el-tabs type="card" class="index"
             @tab-click="tabClick"
             closable
             @tab-remove="removeTab"
             v-model="tabActiveName">
      <el-tab-pane style="margin-left: 20px;" :closable="valueFalse" label="首页">

        <img class="begin_img" src="../../assets/images/begin.png" alt="">

      </el-tab-pane>

      <el-tab-pane v-for="(tab,index) in routeCards"
                   :name="tab.path"
                   :closable="valueTrue"
                   style="margin-left: 20px;"
                   :label="tab.label">

        <legacy></legacy>

      </el-tab-pane>
    </el-tabs> -->
      <div id="wdgPage" v-if="!noWgt">
          <div class="u-container-fluid u-widget-bg" id="firstPage">
              <div class="u-row bg-grey-50">
                  <div class="u-col-12">
                      <div class="wb-tab" data-bind="foreach:pagesData" style="display: none;">
                          <a data-bind="click:$root.navPage,text:name" class="u-tabs__tab wbactive">首页</a>
                      </div>
                  </div>
                  <div class="u-col-12">
                       <div id="widgetBox"></div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
  import newLabel from './new-label.vue';
  import test from './test.vue';
  // import menu from './menuData.json';
  import aaa from '../baseservice/index.vue';
  import tableListPage from '../template/add_page1.vue';
  import legacy from '../legacy.vue';

  export default {
    data() {
      return {
        activeName: 'second',
        valueTrue: true,
        valueFalse: false,
        username: '李达康',
        companyName: '用友金融信息技术有限公司',
        datetime: new Date().toLocaleDateString(),
        tableData3: [{
          status: 1,
          title: '站内公告',
          content: 'xxx提交了单据XD1607001',
          name: '王晓新',
          date: '2016-05-02',
          type: '工作任务'
        }, {
          status: 1,
          title: '行业资讯',
          content: 'xxx提交了单据XD1607001',
          name: '李牧',
          date: '2016-05-02',
          type: '工作任务'
        }, {
          status: 1,
          title: '贷款合同',
          content: 'xxx提交了单据XD1607001',
          name: '张小娴',
          date: '2016-05-02',
          type: '工作任务'
        }, {
          status: 1,
          title: '内容',
          content: 'xxx提交了单据XD1607001',
          name: '李牧',
          date: '2016-05-02',
          type: '工作任务'
        }, {
          status: 1,
          title: '内容',
          content: 'xxx提交了单据XD1607001',
          name: '李牧',
          date: '2016-05-02',
          type: '工作任务'
        }],
        multipleSelection: [],
        routeCards:[],
        tabActiveName:'',
        map:[],
        list: this.menuList,
        noWgt: true,
      };
    },
    props:['menuList'],
    components: {
      newLabel,test,aaa,tableListPage,legacy
    },
    methods: {
     getCookie(cName) {
      let cStart;
      let cEnd;
      if (document.cookie.length > 0) {
        cStart = document.cookie.indexOf(cName + "=");
        if (cStart !== -1) {
          cStart = cStart + cName.length+1;
          cEnd = document.cookie.indexOf(";",cStart);
          if (cEnd === -1) {
            cEnd = document.cookie.length;
          }
          return unescape(document.cookie.substring(cStart,cEnd));
        }
      }
      return "";
    },

      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      tabClick(){
        console.log(this);
        this.$parent.$router.push(this.tabActiveName);
      },
      getRouteMap(list){
        var tmp = {};
        var getChild = function(array){
          array.forEach((v) => {
            if(v.children){
              getChild(v.children);
            }else{
              tmp[v.path] = v;
            }
          });
        };
        getChild(list);
        return tmp;
      },
      removeTab(targetName) {
        const tabs = this.routeCards;
        var activeName = this.tabActiveName;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.path === targetName) {
              const nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.path;
              }
            }
          });
        }

        this.tabActiveName = activeName;
        this.routeCards = tabs.filter(tab => tab.path !== targetName);
        this.$parent.$router.push(this.tabActiveName);
      },

    },
    watch: {
      $route:function(to){
          console.log(to);
        if(to.path==='/index'){
          this.tabActiveName='/index';
          return;
        }
        for(var tmp = 0;tmp<this.routeCards.length;tmp++){
          if(this.routeCards[tmp].path === to.fullPath){
            this.tabActiveName = to.fullPath;
            return;
          }
        }
        if (!!this.map[to.fullPath].component){
          this.routeCards.push(this.map[to.fullPath]);
          this.tabActiveName = to.fullPath;
        }

      }
    },
    created(){
      // console.log(this.list);
      // this.map = this.getRouteMap(this.list);
      // if (this.map[this.$route.path]) {
      //   this.tabActiveName = this.$route.path;
      //   this.routeCards.push(this.map[this.$route.path]);
      // }
      this.getWidgets = this.$http({
        url: window.ctxs.ap + '/appmenumgr/indexQuery',
        method: 'get'
      });
      console.log(this.routeCards);
    },
    mounted(){
      this.getWidgets.then((res) => {
        if (res.data.status === 1) {
          var pages = res.data.data;
          if (pages.length > 0) {
            this.noWgt = false;
            $('#wdgPage').css('display','block');
            $('#wel').css('display','none');

            requirejs(['pages/default/index.js'],(a) => {
              console.log(a);
              window.msgbaseUrl = '/iuap-saas-message-center/';
              if (a&&a.init) {
                a.init($("#wdgPage")[0], {data: pages});
              }
            });
          } else {
            this.noWgt = true;
            $('#wdgPage').css('display','none');
            $('#wel').css('display','block');
          }
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch(() => {

      });
      $('#main-right').attr('is-reload','');
      //隐藏组织结构
      $('#main-right').find('div#organization_page').css('display','none');

    }
  };
</script>

<style scoped>
  .content-margin{
    margin-top: 31.5px;
  }
  .content-margin2{
    margin-top: 51.5px;
    color: #71787E;
  }
  .card-content p{
    font-size: 16px;
    line-height: 2em;
    text-align: left;
  }
  .card-content .datetime{
    color: #9FA9BA;
    font-size: 14px;
    line-height: 2em;
    text-align: left;
    font-weight: 100;
  }
  .el-tabs__nav{
    margin-left: 20px!important;
  }
  .nav-business{
    color: #393C3E;
    font-size: 14px;
  }
  .nav-business .el-tabs__active-bar {
    background-color: #E60012;
    height: 2px;
  }

  .nav-business .el-tabs__item {
    padding: 0 24px;
    line-height: 31px;
    height: 31px;
  }

  .nav-business .is-active {
    color: #393C3E;
  }
  .nav-business .el-tabs__header{
    margin: 0;
  }
  .day-business{
    box-sizing: border-box;
    width: 1080px;
    height: 130px;
    margin-top: -12px;
    border: 1px solid  rgba(230, 234, 238, 1);
    border-top: none;
    list-style: none;
    padding: 24px 30px 30px;
    color: #71787E;
    margin-bottom: 0;


  }
  .day-business i {
    font-style: normal;
    font-size: 30px;
    color: #393C3E;
  }
  .day-business li{
    text-align: center;
    display: inline-block;
    padding: 27px 50px;
    border-right: 1px solid  rgba(230, 234, 238, 1);
  }
  .day-business li:last-child{
    border-right: none;
  }
  .day-business span {
    font-size: 30px;
    color: #E60012;
  }

  .el-tabs > div{
    margin-left: 20px !important;
  }

  .font14{
    font-size: 14px!important;
    color: #71787E;
  }

  .font30{
    font-size: 30px!important;
    color: #71787E;
  }

  .begin_img{
    display: block;
    margin: 50px auto;
  }
</style>
