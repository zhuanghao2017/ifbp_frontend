<template>
<div class="tree-mdlayout-page" id="treedemo-detail-page">
  <div class="tree-mdlayout-page-header">
      <div class="tree-mdlayout-header-func">
        <i class="el-icon-pt-fenlei1 header-icon" id="expandbtn" @click="showMdlayoutMasterList"></i>
      </div>
      <span class="header-title" data-bind="text:settlement.ref('djbm')()">树表信息-{{currentValue && currentValue.name}}</span>
      <ul class="header-btn">
        <el-tooltip content="新建树表信息" placement="top">
          <i class="header-icon el-icon-plus" @click="createTreeDemo"></i>
        </el-tooltip>
        <el-tooltip content="编辑树表信息" placement="top">
          <i class="header-icon el-icon-pt-bianji" @click="editTreeDemo"></i>
        </el-tooltip>
        <el-tooltip content="删除树表信息" placement="top">
          <i class="header-icon el-icon-delete" @click="deleteTreeDemo"></i>
        </el-tooltip>
      </ul>
  </div>
  <div class="tree-mdlayout-page-section">
    <div class="treedemo-detail">
      <el-template :pkTemp="pk_staff"
                   ref="detail"
                   :isEdit="false"
                   :templateValue="currentValue"
                   :hideTitle="true">
      </el-template>
    </div>
    <!--工作经历列表-->
    <div class="treedemo-detail">
        <el-template :pkTemp="pk_record"
                     ref="detail_record"
                     :isEdit="false"
                     :templateValue="recordCurrentValue"
                     :highlight-current-row="true"
                     @row-click="function(index, row){childTableRowClick(row)}">

        </el-template>
    </div>
    <div class="treedemo-detail">
        <el-template :pkTemp="pk_record"
                     ref="detail_record"
                     :isEdit="false"
                     :templateValue="recordCurrentValue"
                     :highlight-current-row="true"
                     @row-click="function(index, row){childTableRowClick(row)}">

        </el-template>
    </div>
  </div>
  <div class="tree-mdlayout-page-footer">
    <ul class="footer-btn" id="detailBtns">
      <li :style="{width: (recordCurrentValue && recordCurrentValue.length && recordSelectRowId) ? '33.3%' : '100%'}" @click="newChildItem">新增记录</li>
      <li style="width: 33.3%;" @click="editChildItem" v-if="recordCurrentValue && recordCurrentValue.length && recordSelectRowId">修改记录</li>
      <li style="width: 33.3%;" @click="deleteChildItem" v-if="recordCurrentValue && recordCurrentValue.length && recordSelectRowId">删除记录</li>
    </ul>
  </div>
</div>
</template>
<script>
// import uitemplate from '../../../../../../1/ifbp-element/packages/ui-template/src/template.vue';
  // import json from './test.json';
  export default {
    // components: {
    //  uitemplate,
    // },
    data(){
      return {
        pk_staff: '2cbf54d5-88c1-4849-8250-474ca316a8b9',
        // pk_staff: 'c9b437c4-c42e-4e71-af71-8e8f7c71bef9',
        // pk_staff: 'bb443266-2961-4311-92c6-afe858aadd37', // 141
        pk_record: 'eb798bab-d53e-4255-a24b-60e61d9883af',
        originalValue: '',
        currentValue: '',
        recordOriginalValue: '',
        recordCurrentValue: '',
        recordSelectRowId: '',

        // tree-mdlayout-page 列表数据
        code: '',
        name: '',
        mobile: '',
        enablestate: '',
        tableData: [],
        searchStr: '',
      };
    },
    created(){
      this.request();
    },
    mounted() {
      var thisEl = document.querySelector("#treedemo-detail-page");
      if(thisEl) {
        var vm = this;
        // 点击detail页面隐藏左侧列表
        thisEl.addEventListener("click", () => {
          vm.$parent.hideMdlayoutMasterList();
        });
      }
    },
    watch: {
      '$route'() { // 当路由变化时，重新加载用户详情数据
        this.requestDetailData();
      }
    },
    methods: {
      // 初次加载数据
      request() {
        this.requestDetailData();
      },
      /**
       *   单个用户详情
       **/
      requestDetailData() {
        //人员
        this.$http({
          url: '/ifbp-app-bd/bd/psn/psndoc/' + this.$root.$router.currentRoute.params.id,
          method: 'get'
        }).then((res) => {
          if (res.data.success) {
            if(res.data.data.avatar === null) {
              res.data.data.avatar = 'null';
            }
            this.originalValue = res.data.data;
            this.originalValue.avatar = res.data.data.avatar;
            this.currentValue = JSON.parse(JSON.stringify(this.originalValue));
          } else {
            this.$message({
              message: res.data.data,
              type: 'error'
            });
          }
        }).catch(() => {
          this.$message({
            message: '用户信息获取失败',
            type: 'error'
          });
        });
        //列表
        this.$http({
          url: '/ifbp-app-bd/bd/psn/psnjob/pageList?pn=1&ps=10&sortColumn=auto&pkPsndoc=' + this.$root.$router.currentRoute.params.id,
          method: 'get'
        }).then((res) => {
          if (res.data.success) {
            this.recordOriginalValue = res.data.data.content;
            this.recordCurrentValue = JSON.parse(JSON.stringify(this.recordOriginalValue));
          } else {
            this.$message({
              message: res.data.data,
              type: 'error'
            });
          }
        }).catch(() => {
          this.$message({
            message: '用户工作信息获取失败',
            type: 'error'
          });
        });
      },

      // 子表点击某一行
      childTableRowClick(row) {
        // document.querySelector("#detailBtns").style.top = "0"; // 显示底部菜单
        this.$parent.selectChildRowData = row; // 将子表该行数据存放到父组件staff-info中
        this.recordSelectRowId = row.id; // 记录子表当前选中行的id，删除会用
      },
      // 创建员工信息
      createTreeDemo() {
        this.$router.push("/treeDemo/add");
      },
      // 编辑员工信息
      editTreeDemo() {
        // debugger;
        var id = this.$parent.selectRowId;
        this.$router.push("/treeDemo/edit/" + id);
      },
      // 删除员工信息
      deleteTreeDemo() {
        this.$parent.deleteTableRow();
      },
      // 点击创建工作记录为子表添加数据
      newChildItem() {
        this.$router.push("/treeDemo/addRecord");
      },
      // 点击编辑工作记录子表某行数据
      editChildItem() {
        this.$router.push("/treeDemo/editRecord/" + this.$parent.selectRowId);
      },
      // 点击删除工作记录子表某行数据
      deleteChildItem() {
        this.$confirm('是否删除当前记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: '/ifbp-app-bd/bd/psn/psnjob/' + this.recordSelectRowId,
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
              message: '删除接口调用失败',
              type: 'error'
            });
          });
        });
      },
      showMdlayoutMasterList(e) {
        e.preventDefault();
        e.stopPropagation();
        this.$parent.showMdlayoutMasterList();
      }
    }
  };

</script>
<style>
  .avatar {
    height: auto!important;
  }
  #search-container{
    height: 56px;
    padding: 10px 20px;
    background-color: #ffffff;
    border-bottom: 1px solid #e3e3e3;
  }
  #advanced-search{
    display: block;
    height: 56px;
    padding: 10px 20px;
    background-color: #ffffff;
    border-bottom: 1px solid #e3e3e3;
    position: relative;
  }
  #advanced-search.hide{
    display: none;
    transition: all .5s ease;
  }

  .btn-location{
    position: absolute;
    left: 85px;
    top: 15px;
  }
  .btn-location2{
    position: absolute;
    top: 15px;
    left: 120px;
  }
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

  /* 分屏自适应左侧list-panel */

  .tree-mdlayout-page {
    position: absolute;
    left: 0px;
    transform: translate3d(0px, 0px, 0px);
    height: 100%;
    width: 100%;
    transition: all 300ms;
  }
  .tree-mdlayout-search-box {
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
    overflow: auto;
/*     overflow-scrolling:touch;
-webkit-overflow-scrolling:touch; */
    height: auto;
    width: 100%;
  }
  .tree-mdlayout-page-header .header-title {
    line-height: 4rem;
    padding-left: 50px;
    font-size: 14px;
    font-weight: bold;
  }
  .tree-mdlayout-header-func {
    position: absolute;
    left: 0.5rem;
    top: 0.25rem;
    font-size: 1rem;
  }
  .tree-mdlayout-header-func i {
    padding: 0.75rem 0.5rem;
    font-size: 2.2rem;
    display: none;
    font-weight: bold;
    position: absolute;
    transition: .3s all;
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
    /* top: 4rem; */
    top: 0px;
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

</style>
