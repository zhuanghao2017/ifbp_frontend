<template>
<div style="background-color: #fff;">
  <div style="height: 100%;">
    <div class="mdlayout-master" style="float: left; height: 100%; transform: translate3d(0px, 0px, 0px); transition: all 300ms; position: relative;z-index: 5;">
      <div class="mdlayout-page">
        <div class="mdlayout-page-header">
            <label class="text-center">员工信息列表</label>
        </div>
        <div class="mdlayout-page-section">
            <div class="mdlayout-search-box">
              <el-input
                placeholder="按姓名搜索……"
                icon="search"
                v-model="name"
                size="small"
                :on-icon-click="handleSearchIconClick"
                @keyup.enter.native="handleSearchIconClick">
              </el-input>
            </div>
            <el-table
                :data="tableData"
                :show-header="false"
                :highlight-current-row="true"
                @row-click="listItemClick"
                :adaptive-mobile="false"
                v-loading.body="loading"
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
            </el-table>
        </div>
        <div class="mdlayout-page-footer">

        </div>
      </div>
    </div>
    <div class="mdlayout-detail" style="height: 100%; overflow: hidden; position: relative;">
          <transition :name="transitionName">
            <router-view class="child-view">

            </router-view>
          </transition>
    </div>
  </div>
</div>
</template>
<script>
//  import template from './ui-template/src/template.vue';
  import json from './test.json';
  export default {
//      components:{uitemplate:template},
    data(){
      return {
        id: this.$root.$router.currentRoute.params.id,
        // mdlayout-page 列表数据
        code: '',
        name: '',
        mobile: '',
        enablestate: '',
        tableData: [],
        searchStr: '',
        transitionName: 'slide-left',
        selectRowId: '',
        selectChildRowData: {},
        pn: 1,
        loading: false,
        noMoreData: false
      };
    },
    created(){
      this.request();
    },
    mounted() {
      var listEl = document.querySelector(".mdlayout-page-section");
      // 监听左侧list滚动条的位置，实现滚动分页加载
      listEl.addEventListener("scroll", () => {
        if(this.loading || this.noMoreData) {
          return;
        }
        var scrollTop = listEl.scrollTop;
        var clientHeight = listEl.clientHeight;
        var scrollHeight = listEl.scrollHeight;
        var toButtom = scrollHeight - scrollTop - clientHeight;
        if(toButtom === 0) {
          this.pn = this.pn + 1;
          this.requestListData(10, () => {
            // 修复moreData加载成功后，滚动条仍停留在最底部的问题
            listEl.scrollTop = scrollTop;
          });
        }
      });
    },
    watch: {
      '$route'(val) {
        // 修复路由直接输入/staff右侧出现空白页的bug
        if(val.fullPath === '/staff' || val.fullPath === '/staff/') {
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
      // 初次加载数据
      request() {
        var callback = () => {
          if(this.tableData[0]) {
            if(this.id) {
              this.selectRowId = this.id;
            } else {
              this.selectRowId = this.tableData[0].id;
              this.$router.replace('/staff/detail/' + this.tableData[0].id);
            }
            this.$nextTick(() => {
              var trEl = document.querySelector(".mdlayout-master .el-table .el-table__body tr");
              if(this.id) {
                this.tableData.forEach((item, index) => {
                  if(item.id === this.id) {
                    trEl = document.querySelectorAll(".mdlayout-master .el-table .el-table__body tr")[index];
                  }
                });
              }
              if(trEl && trEl.className.indexOf("current-row") < 0){
                trEl.className += " current-row";
              }
            });
          }
        };
        this.initParams();
        this.requestListData(15, callback);
        // this.requestDetailData();
      },
      /**
      *   获取列表请求
      **/
      requestListData(ps, cb) {
        var url;
        var search = '&search_code=' + this.code + '&search_name=' + this.name + '&search_mobile=' + this.mobile + '&search_enablestate=' + this.enablestate;
          url = '/ifbp-app-bd/bd/psn/psndoc/pageList?pn=' + this.pn +'&ps=' + ps + search;
        this.loading = true;
        this.$http({
          url: url,
          method: 'get',
          dataType: 'json'
        }).then((res) => {
          var content = (res.data.data && res.data.data.content) || [];
          if(content.length) {
            // 当首次加载数据的时候，清空列表，通过ps为15来判断
            if(ps === 15) {
              this.tableData = [];
            }
            this.tableData = this.tableData.concat(content);
          } else {
            this.noMoreData = true;
          }
          this.$nextTick(() => {
            this.loading = false;
            if(cb && typeof cb === 'function') {
              cb();
            }
          });
        }).catch(() => {
          this.$message({
            message: '列表获取失败',
            type: 'error'
          });
          this.tableData = json.data.content;
          this.loading = false;
        });
      },

      // 点击左侧边栏搜索框
      handleSearchIconClick() {
        this.initParams();
        this.requestListData(15);
      },
      initParams() {
        this.noMoreData = false;
        this.loading = false;
        this.pn = 1;
      },
      // 点击mdlayout-master的一项
      listItemClick(row) {
        this.selectRowId = row.id;
        this.hideMdlayoutMasterList();
        this.$router.push('/staff/detail/' + row.id);
      },
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
      // show mdlayout-master
      showMdlayoutMasterList() {
        var mdlayoutMasterEl = document.querySelector(".mdlayout-master");
        if(mdlayoutMasterEl) {
          mdlayoutMasterEl.style.left = "0";
        }
      },
      // show mdlayout-master
      hideMdlayoutMasterList() {
        var mdlayoutMasterEl = document.querySelector(".mdlayout-master");
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
  .mdlayout-master {
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
  .mdlayout-master.hideLeft {
    margin-left: -320px;
  }

  /* 分屏自适应左侧list-panel */

  .mdlayout-page {
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
  .mdlayout-page-header {
    height: 4rem;
    border-bottom: 1px solid #cccccc;
    background: #fff;
    position: relative;
  }
  .mdlayout-page-header label {
    color: #333;
    line-height: 4rem;
    font-size: 1.4rem;
    width: 100%;
    font-weight: bold;
  }
  .text-center {
    text-align: center;
  }
  .mdlayout-page-section {
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
  .mdlayout-page-header .header-title {
    line-height: 4rem;
    padding-left: 40px;
    font-size: 14px;
    font-weight: bold;
  }
  .mdlayout-page-header .header-btn {
    line-height: 4rem;
    float: right;
    padding-right: 10px;
    list-style: none;
  }
  .mdlayout-page-header .header-btn > li {
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
  .mdlayout-page-footer {
    z-index: 2;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 4rem;
    width: 100%;
    border-top: 1px solid #cccccc;
    background-color: #fff;
  }
  .mdlayout-page .secondColumn {
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
