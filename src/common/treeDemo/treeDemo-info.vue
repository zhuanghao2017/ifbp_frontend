<template>
<div style="background-color: #fff;">
  <div class="tree-mdlayout-master" style="float: left; height: 100%; transform: translate3d(0px, 0px, 0px); transition: all 300ms; position: relative;z-index: 5;">
    <div class="tree-mdlayout-page">
      <div class="tree-mdlayout-page-header">
          <label class="text-center">树表列表</label>
      </div>
      <div class="tree-mdlayout-page-section">
          <!-- <div class="mdlayout-search-box">
            <el-input
              placeholder="按姓名搜索……"
              icon="search"
              v-model="name"
              size="small"
              :on-icon-click="handleSearchIconClick"
              @keyup.enter.native="handleSearchIconClick">
            </el-input>
          </div> -->
          <!-- <el-table
              :data="tableData"
              :show-header="false"
              :highlight-current-row="true"
              @row-click="listItemClick"
              :adaptive-mobile="false"
              >
            <el-table-column>
                <template scope="scope">
                  <p>
                    <span style="font-weight: 600; color: #333; display: inline-block;">{{scope.row.name}}</span>
                    <span style="font-weight: 600; color: #f37800; display: inline-block;float: right;">{{scope.row.sex === "1" ? '男' : '女'}}</span>
                  </p>
                  <p style="font-size: 12px;">{{scope.row.id_num}}</p>
                </template>
            </el-table-column>
          </el-table> -->
          <el-tree id="treeDemo" :data="treeDemoData" :props="defaultProps" @node-click="handleNodeClick($event)" :default-expand-all="true"></el-tree>

      </div>
      <div class="tree-mdlayout-page-footer">

      </div>
    </div>
  </div>
  <div class="tree-mdlayout-detail" style="height: 100%; overflow: hidden; position: relative;">
        <transition :name="transitionName">
          <router-view class="child-view">

          </router-view>
        </transition>
  </div>
</div>
</template>
<script>
//  import template from './ui-template/src/template.vue';
  // import json from './test.json';
  import treeDemoJson from './treeDemo.json';
  export default {
//      components:{uitemplate:template},
    data(){
      return {
        id: this.$root.$router.currentRoute.params.id,
        // tree-mdlayout-page 列表数据
        code: '',
        name: '',
        mobile: '',
        enablestate: '',
        tableData: [],
        treeDemoData: [],
        searchStr: '',
        transitionName: 'slide-left',
        selectRowId: '',
        selectChildRowData: {},
        defaultProps:{
          children: 'children',
          label: 'name'
        }
      };
    },
    created(){
      this.request();
    },
    watch: {
      '$route'(val) {
        // 修复路由直接输入/staff右侧出现空白页的bug
        if(val.fullPath === '/treeDemo' || val.fullPath === '/treeDemo/') {
          this.request();
        }
      }
    },
    beforeRouteUpdate (to, from, next) {
      const isBack = this.$router.isBack;
      if (isBack) {
        this.transitionName = 'slide-right';
      } else {
        this.transitionName = 'slide-left';
      }
      this.$router.isBack = false;
      next();
    },
    methods: {
      handleNodeClick($e){
        // debugger;
        // console.log($e);
        if($e.children && ($e.children !== 'undefined')) {
          return ;
        }
        // debugger;
        this.selectRowId = $e.id;
        // debugger;
        this.hideMdlayoutMasterList();
        this.$router.push('/treeDemo/detail/' + $e.id);
      },
      // 初次加载数据
      request() {
        this.requestListData();
        // this.requestDetailData();
      },
      /**
      *   获取列表请求
      **/
      requestListData() {
        // debugger;
        var treeValue;
        var treeDemoItem;
        this.treeDemoData = treeDemoJson.data;
        // console.log(this.treeDemoData[0]);
        function b (treeDemoData) {
          // debugger;

          if (treeDemoData.length > 0 && treeDemoData[0].children &&
            treeDemoData[0].children.length > 0) {

            b(treeDemoData[0].children);
            // console.log(treeDemoData.children);
          } else {
            // debugger;
            treeValue= treeDemoData[0];
          }
          return treeValue;
          // return
        }
        treeDemoItem = b(this.treeDemoData);
        this.selectRowId = treeDemoItem.id;
        this.$router.push('/treeDemo/detail/' + treeDemoItem.id);
        // this.$nextTick(() => {
        //   var treeDemoChildren = $("#treeDemo .el-tree .el-tree-node")[0].querySelectorAll
        // (".el-tree-node__content + .el-tree-node__children")[1].parentNode;
        //   treeDemoChildren.className += " active";
        // });

      },
      // 点击左侧边栏搜索框
      handleSearchIconClick() {
        this.requestListData();
      },
      // 点击tree-mdlayout-master的一项
      // listItemClick(row) {
      //   this.selectRowId = row.id;
      //   this.hideMdlayoutMasterList();
      //   this.$router.push('/treeDemo/detail/' + row.id);
      // },
      // 删除选中主表
      deleteTableRow() {
        this.$confirm('是否删除当前记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: '/ifbp-app-bd/bd/psn/psndoc/' + this.selectRowId,
            method: 'delete'
          }).then((res) => {
            if (res.data.success === true) {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.request();
            } else {
              this.$message({
                message: res.data.error.errorMessage,
                type: 'error'
              });
            }
          }).catch(() => {
            this.$message({
              message: 'Network error',
              type: 'error'
            });
          });
        });
      },
      // show tree-mdlayout-master
      showMdlayoutMasterList() {
        var mdlayoutMasterEl = document.querySelector(".tree-mdlayout-master");
        if(mdlayoutMasterEl) {
          mdlayoutMasterEl.style.left = "0";
        }
      },
      // show tree-mdlayout-master
      hideMdlayoutMasterList() {
        var mdlayoutMasterEl = document.querySelector(".tree-mdlayout-master");
        var windowWidth = window.innerWidth ||
                          ((document.body) && (document.body.clientWidth)); // 窗口宽度
        if(mdlayoutMasterEl && windowWidth < 768) {
          mdlayoutMasterEl.style.left = "-320px";
        }
      },
    }
  };

</script>
<style scoped>
  .tree-mdlayout-master {
    width: 320px;
    border-right: 1px solid #dddddd;
    background: none repeat scroll 0 0 #f7f7f7;
    box-shadow: 1px 0 10px rgba(0,0,0,0.15);
    -webkit-box-shadow: 1px 0 10px rgba(0,0,0,0.15);
    -moz-box-shadow: 1px 0 10px rgba(0,0,0,0.15);
    border-right: 1px solid rgba(0,0,0,0.15);
    background-clip: padding-box;
    -webkit-background-clip: padding-box;
    -ms-background-clip: padding-box;
    -moz-background-clip: padding-box;
  }
  .tree-mdlayout-master.hideLeft {
    margin-left: -320px;
  }

  /* 分屏自适应左侧list-panel */

  .tree-mdlayout-page {
    position: absolute;
    left: 0px;
    transform: translate3d(0px, 0px, 0px);
    height: 100%;
    width: 100%;
    transition: all 300ms;
  }
  .mdlayout-search-box {
    width: 80%;
    margin: 6px auto;
  }
  .tree-mdlayout-page-header {
    height: 4rem;
    border-bottom: 1px solid #cccccc;
    background: #fff;
    position: relative;
  }
  .tree-mdlayout-page-header label {
    color: #333;
    line-height: 4rem;
    font-size: 1.4rem;
    width: 100%;
    font-weight: bold;
  }
  .text-center {
    text-align: center;
  }
  .tree-mdlayout-page-section {
    background: #fff;
    padding: 0px;
    top: 4rem;
    left: 0;
    bottom: 4rem;
    position: absolute;
    overflow-x: hidden;
    overflow-y: auto;
    overflow-scrolling:touch;
    -webkit-overflow-scrolling:touch;
    height: auto;
    width: 100%;
  }
  .tree-mdlayout-page-header .header-title {
    line-height: 4rem;
    padding-left: 40px;
    font-size: 14px;
    font-weight: bold;
  }
  .tree-mdlayout-page-header .header-btn {
    line-height: 4rem;
    float: right;
    padding-right: 10px;
    list-style: none;
  }
  .tree-mdlayout-page-header .header-btn > li {
    float: left;
    line-height: 4rem;
    width: 40px;
    font-size: 16pt;
    cursor: pointer;
  }
  .header-icon {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    cursor: pointer;
    font-size: 18px;
    padding: 0 5px;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .tree-mdlayout-page-footer {
    z-index: 2;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 4rem;
    width: 100%;
    border-top: 1px solid #cccccc;
    background-color: #fff;
  }
  .tree-mdlayout-page .secondColumn {
    vertical-align: top;
  }
  .footer-btn {
    line-height: 4rem;
    list-style: none;
    padding-left: 0px;
    position: absolute;
    left: 0px;
    right: 0px;
    top: 4rem;
  }
  .footer-btn > li {
    float: left;
    line-height: 4rem;
    cursor: pointer;
    text-align: center;
    border-width: 1px;
    border-style: solid;
    border-color: #E0DFE3;
    color: #000;
  }
  .el-table-selected-row {
    background-color: #4F8EDC !important;
  }

  .child-view {
    position: absolute;
    width:100%;
    transition: all .3s ;
  }
  .slide-left-enter, .slide-right-leave-active {
    /*opacity: 0;*/
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    /*opacity: 0;*/
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100%, 0);
  }

</style>
