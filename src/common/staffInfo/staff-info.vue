<template>
  <div class="staff-info">
    <div class="title-header">
      <h2 class="name">员工信息</h2>
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
        <el-button type="primary" @click="goBack" style="float:right;margin-left:20px;">返回</el-button>
      </div>
    </div>

    <div id="advanced-search" :class="{hide: isHide}">
      <el-row>
        <el-col :span="2"><span class="search-label">用户编码:</span></el-col>
        <el-col :span="3">
          <el-input type="text" v-model="code" placeholder="请输入用户编码"></el-input>
        </el-col>
        <el-col :span="2"><span class="search-label"> 用户姓名:</span></el-col>
        <el-col :span="3">
          <el-input type="text" v-model="name" placeholder="请输入用户姓名"></el-input>
        </el-col>
        <el-col :span="2"><span class="search-label"> 手机:</span></el-col>
        <el-col :span="3">
          <el-input type="text" v-model="mobile" placeholder="请输入手机号码"></el-input>
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
      <el-template :pkTemp="pk_temp"
                   :hideTitle="true"
                   :show-button="showButton"
                   :img-url="imgUrl"
                   ref="detail"
                   @edit-table-row="editTableRow"
                   @delete-table-row="deleteTableRow"
                   @state-table-row="stateTableRow"
                   :isEdit="isEdit"
                   :templateValue="currentValue">

      </el-template>
      <!--pagination-->
      <input type="text" id="s" style="visibility: hidden">
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
//import template from './ui-template/src/template.vue';
  import json from './test.json';
  export default {
//  components: {
//   'ul-template': template
//  },
    data(){
      return {
        isHide: true,
        loading: false,
        tableData: '',
        columns: '',
        totalPages: '',
        totalElements: 0,
        currentPage: 1,
        size: 10,
        code: '',
        name: '',
        mobile: '',
        enablestate: '',
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
        isEdit: false,
        currentValue: '',
//        pk_temp: '088eaf0c-785b-4cff-98b9-151ce688db38',
        pk_temp: '8c0dd39e-cf17-4367-8dbc-d7e27af49cb6',
        delDialogVisible: false,
        delId:'',
        showButton: {
          width: 150,
          group: true,
          buttons: [
            {
              name: 'state',
              text: '',
              icon: 'pt-tuichu',
              content: '启用/停用',
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
        },
        imgUrl: '/ifbp-app-bd/bd/psn/psndoc/avatarImgDownLoad?avatar='
      };
    },
    created(){
      /**
       *   获取列表
       **/
      this.request();
      //隐藏组织结构
      if(document.getElementById("organization_page")){
        document.getElementById("organization_page").style.display = "none";


      }

    },
    mounted(){
      document.getElementById('s').remove();
    },
    methods: {
      /**
       *   获取列表请求
       **/
      request(n, s) {
        var extraParams = this.getExtraParam();
        this.loading = true;
        var url;
        var search = '&search_code=' + this.code + '&search_name=' + this.name + '&search_mobile=' + this.mobile + '&search_enablestate=' + this.enablestate + extraParams;
        if(n===undefined){
          url = '/ifbp-app-bd/bd/psn/psndoc/pageList?pn=1&ps=10&sortColumn=' + search;
        } else {
          url = '/ifbp-app-bd/bd/psn/psndoc/pageList?pn='+ n +'&ps=' + s + search;
        }
        this.$http({
          url: url,
          method: 'get',
          dataType: 'json'
        }).then((res) => {
          this.loading = false;
//          res = res.data.data;
          this.totalElements = res.data.data.totalElements ;       // 总条数
          this.size = res.data.data.size;                          // 每页的条数
          this.currentValue = res.data.data.content;
        }).catch(() => {
          this.$message({
            message: '列表获取失败',
            type: 'error'
          });
          this.currentValue = json.data.content;
        });
      },
      handleSizeChange(val) {
        this.request(1, val);
      },
      handleCurrentChange(val) {
        this.request(val, this.size);
      },
      getExtraParam() {
        var paramStr = window.location.href.split('?')[1];
        var extraStr;
        var params = {};
        var tmp;
        if (paramStr) {
          paramStr.split('&').forEach((singleParam) => {
            tmp = singleParam.split('=');
            params[tmp[0]] = tmp[1];
          });
          extraStr = params.search_pk_org ? '&search_pk_org=' + params.search_pk_org : '&search_pk_dept=' + params.search_pk_dept;
          if (!extraStr) {
            extraStr = '';
          }
        } else {
          extraStr = '';
        }
        return extraStr;
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
        location.hash = '/staff/add';
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
      editTableRow(row){
        location.hash = '/staff/detail/' + row.id;
      },
      deleteTableRow(row) {
        this.delDialogVisible = true;
        this.delId = row.id;
      },
      /**
       *  启用状态修改
       *  2（启用），3(停用)
       * */
      stateTableRow(row) {
        var state = row.enablestate === "2"?3:2;
        this.$http({
          url: '/ifbp-app-bd/bd/psn/psndoc/optUserState/' + row.id + '?state=' + state ,
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
            message: 'Network error',
            type: 'error'
          });
        });

      },
      deleteClick() {
        this.$http({
          url: '/ifbp-app-bd/bd/psn/psndoc/' + this.delId,
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
            message: 'Network error',
            type: 'error'
          });
        });
      },
      goBack() {
        window.history.back(-1);
        // this.$router.push("/index");
      },
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
  #advanced-search .el-col{
    text-align: center;
  }
  #advanced-search.hide{
    display: none;
    transition: all .5s ease;
  }
  #staff-list, #staff-detail{
    margin-top: 20px;
    background: #ffffff;
    position: relative;
    padding: 0 20px;
  }

  .search-label{
    line-height: 36px;
    font-size: 14px;
    margin-left: 10px;
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
   .legacy{
  padding-left:20px;
  padding-right:20px;
  }
</style>
