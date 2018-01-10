<template>
  <div class="list-panel">
    <div class="title-header">
      <h2 class="name">用户管理</h2>
    </div>
    <!--search-->
    <div id="search-container">
      <div class="fl">
        <el-button type="primary" class="legacy" @click="addUserBtn">新增</el-button>

      </div>
      <div class="fr">
        <el-button type="text" @click="showSearch">
          高级搜索
          <i class="el-icon-arrow-down" v-if="this.isHide"></i>
          <i class="el-icon-arrow-up" v-if="!this.isHide"></i>
        </el-button>
        <el-button type="primary" @click="backButton">返回</el-button>
      </div>
    </div>

    <div id="advanced-search" :class="{hide: isHide}">
      <el-row>
        <el-col :span="2"><span class="search-label">登录账号:</span></el-col>
        <el-col :span="3">
          <el-input type="text" v-model="user_code" placeholder="请输入登录账号"></el-input>
        </el-col>
        <el-col :span="2"><span class="search-label">用户名称:</span></el-col>
        <el-col :span="3">
          <el-input type="text" v-model="user_name" placeholder="请输入用户名称"></el-input>
        </el-col>
        <el-col :span="2"><span class="search-label">身份类型:</span></el-col>
        <el-col :span="3">
          <el-select v-model="userType">
            <el-option
              v-for="item in search_type"
              :label="item.label"
              :value="item.value">

            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2"><span class="search-label"> 启用状态:</span></el-col>
        <el-col :span="4">
          <el-select id="s-state" v-model="enablestate">
            <el-option
              v-for="item in search_options"
              :label="item.label"
              :value="item.value">

            </el-option>
          </el-select>
        </el-col>
        <div class="fr">
          <el-button @click="search">搜索</el-button>
        </div>
      </el-row>
    </div>

    <!-- 用户信息列表 -->
    <div id="staff-list">
      <!--list-->
      <!--<yon-list :tableData="tableData" :columns="columns" v-if='tableData.length' :loading="loading"></yon-list>-->
      <el-template :pkTemp="pk_temp"
                   :hideTitle="true"
                   :show-button="showButton"
                   ref="detail"
                   @edit-table-row="editTableRow"
                   @delete-table-row="deleteTableRow"
                   @state-table-row="stateTableRow"
                   @reset-table-row="resetTableRow"
                   :isEdit="isEdit"
                   :templateValue="currentValue">

      </el-template>
      <!--pagination-->
      <input type="text" id="p" style="visibility: hidden">
      <el-pagination
        id="staff-pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalElements">
      </el-pagination>
    </div>
    <el-dialog
      title="提示"
      v-model="delDialogVisible"
      :modal="true"
      size="tiny">
      <span>确认删除该用户？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
//  import list from './editList';
//  import json from './test.json';
  export default {
    data(){
      return {
        isHide: true,
        loading: false,
        tableData: '',
        columns: '',
        totalPages: '',
        totalElements: 0,
        size: 0,
        formData: {},
        currentPage: 0,
        isEdit: false,
        currentValue: '',
//        pk_temp: 'fc327bae-e418-4bbd-aa20-457a03e8b5b0',
        pk_temp: 'bd99a034-f876-4aba-b0f9-b7f6f2bb36f3',
        delDialogVisible: false,
        delId:'',
        user_code:'',
        user_name:'',
        userType: '',
        enablestate: '',
        search_type: [{
          label: '全部',
          value: ''
        },{
          label: '员工',
          value: 0
        },{
          label: '客户',
          value: 1
        },{
          label: '供应商',
          value: 2
        },{
          label: '审计',
          value: 3
        },{
          label: '外部系统',
          value: 4
        },{
          label: '开发者',
          value: 5
        }],
        search_options: [{
          label: '全部',
          value: ''
        },{
          label: '未启用',
          value: 1
        },{
          label: '已启用',
          value: 2
        },{
          label: '已停用',
          value: 3
        }],
        showButton: {
          width: 190,
          group: true,
          buttons: [
            {
              name: 'state',
              text: '',
              icon: 'pt-tuichu',
              content: '启用/停用',
            },
            {
              name: 'reset',
              text: '',
              icon: 'pt-shuaxin',
              content: '管理员重置密码',
            },
            {
              name: 'edit',
              text: '',
              icon: 'search',
              content: '查看',
            },
            {
              name: 'delete',
              text: '',
              icon: 'delete',
              type: 'danger',
              content: '删除',
            }
          ]
        }
      };
    },
    created(){
      /**
       *   获取列表
       **/
      this.request();
      /**
       *   修改用户状态
       **/
      this.$on('staffState', (id,state) => {
        this.loading = true;
        this.$http({
          url: window.ctxs.ap + '/user/optUserState/' + id + '?state=' + state,
          method: 'get'
        }).then((res) => {
          if (res.data.success === true) {
            document.getElementById('p').remove();
            this.loading = false;
            this.request();
          }
        });
      });
      //隐藏组织结构
      if(document.getElementById("organization_page")){
        document.getElementById("organization_page").style.display = "none";
      }

    },
    methods: {
      /**
       *   获取列表请求
       **/
      request(n, s) {
        this.loading = true;
        var url;
        var search = '&search_user_code=' + this.user_code + '&search_user_name=' + this.user_name + '&search_base_doc_type=' + this.userType + '&search_enablestate=' + this.enablestate;
        if(n===undefined){
          url = '/ifbp-app-sm/sm/user/pageList?pn=1&ps=10&sortColumn='+search;
        } else {
          url = '/ifbp-app-sm/sm/user/pageList?pn='+ n +'&ps='+s+search;
        }
        this.$http({
          url: url,
          method: 'get',
          dataType: 'json'
        }).then((res) => {
          this.loading = false;
//          res = res.data.data;
//          this.tableData = res.content;
          this.totalElements = res.data.data.totalElements ;       // 总条数
          this.size = res.data.data.size;                          // 每页的条数
          this.currentValue = res.data.data.content;
        }).catch(() => {
//          this.currentValue = json.data.content;
          this.$message({
            message: '用户信息获取失败',
            type: 'error'
          });
        });
      },
      backButton() {
        this.$router.go(-1);
      },
      handleSizeChange(val) {
        this.request(1, val);
      },
      handleCurrentChange(val) {
        this.request(val, this.size);
      },
      /**
       *  一些控制页面状态的方法
       *  都在按钮上绑着
       **/

      // 高级搜索
      showSearch() {
        this.isHide = !this.isHide;
      },
      search() {
        this.request();
      },
      // 跳转到添加用户页面
      addUserBtn() {
        location.hash = '/userInfo/add';
        this.isEdit = true;
        this.currentValue = {};
      },
      setEmpty(value){
        this.originalValue = value;
        this.currentValue = JSON.parse(JSON.stringify(this.originalValue));
      },
//      changeHandle(index,value){
////        this.currentValue[index] = value;
//      },
      resetTableRow(row){
        this.$http({
          url: '/ifbp-app-sm/sm/user/adminResetPwd?id=' + row.id ,
          method: 'get'
        }).then((res) => {
          if (res.data.success === true) {
              this.$message({
                message: '密码重置成功',
                type: 'success'
              });
          } else {
            this.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            });
          }
        }).catch(() => {
          this.$message({
            message: '密码重置失败',
            type: 'error'
          });
        });
      },
      editTableRow(row, index){
        console.log('edit', row, index);
        location.hash = '/userInfo/detail/' + row.id;
      },
      deleteTableRow(row) {
        console.log('delete', row);
        this.delDialogVisible = true;
        this.delId = row.id;
      },
      stateTableRow(row) {
        var state = row.enablestate === "2"?3:2;
        console.log(state);
        this.$http({
          url: '/ifbp-app-sm/sm/user/optUserState/' + row.id + '?state=' + state ,
          method: 'get'
        }).then((res) => {
          if (res.data.success === true) {
            if (state === 2){
              this.$message({
                message: '启用成功',
                type: 'success'
              });
            } else {
              this.$message({
                message: '停用成功',
                type: 'warning'
              });
            }
            this.request();
          } else {
            this.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            });
          }
        }).catch(() => {
          this.$message({
            message: '接口调用失败！',
            type: 'error'
          });
        });
      },
      deleteClick() {
        this.$http({
          url: '/ifbp-app-sm/sm/user/' + this.delId,
          method: 'delete'
        }).then((res) => {
          if (res.data.success === true) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.delDialogVisible = false;
            this.request();
          } else {
            this.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            });
          }
        }).catch(() => {
          this.$message({
            message: '删除失败',
            type: 'error'
          });
        });
      }
    }
  };

</script>
<style>
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
  #staff-list, #staff-detail{
    margin-top: 20px;
    background: #ffffff;
    position: relative;
  }
  #advanced-search .el-col{
    text-align: center;
  }
  #staff-list .yon-uitemplate {
    margin: 20px 0;
  }

  /* 重置表格字体及表头背景，参考友人才 */
  #staff-list .el-table__header th{
    font-size: 15px;
    font-weight: 400;
    color: #333;
  }
  #staff-list .el-table__body .cell{
    font-size: 13px;
    font-weight: normal;
    color: #333;
  }
  #staff-list .el-table thead tr, #staff-list .el-table thead tr th {
    background-color: #eee;
  }
  #staff-list .el-table__footer-wrapper thead div, #staff-list .el-table__header-wrapper thead div {
    background-color: #eee;
    color: #333;
  }

    /* 重置分页组件样式 */
  input.el-pagination__editor{
    height: 28px;
  }
  .el-pager li.active{
    background-color: #1BAEDE;
    border-color: #1BAEDE;
  }
  .el-select-dropdown__item.selected{
    background-color: #1BAEDE;
  }
  .el-select-dropdown__item.selected.hover{
    background-color: #00A5E3;
  }
  .el-pagination .btn-prev{
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  .el-pagination .btn-next{
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .el-pagination span.el-pagination__total,
  .el-pagination__sizes .el-input .el-input__inner,
  .el-pagination span.el-pagination__jump{
    font-size: 12px;
  }
  .el-pagination .el-select .el-input{
    width: 100px;
  }
</style>
