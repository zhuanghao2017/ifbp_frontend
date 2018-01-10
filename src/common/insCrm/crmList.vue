<template>
<div id="insCustomerList">
  <div class="title-header">
    <h2 class="name">{{title}}</h2>
  </div>

  <div id="search-container">
    <div class="fl">
      <el-button type="primary" @click="addEnterprise(0)">添加客户</el-button>
      <!-- <el-button type="primary" @click="addEnterprise(2)">添加企业客户</el-button> -->
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
      <el-col :span="3"><span class="search-label">客户名称:</span></el-col>
      <el-col :span="4">
        <el-input type="text" v-model="searchStr.name" placeholder="请输入客户名称"></el-input>
      </el-col>
      <div class="fr">
        <el-button @click="search">搜索</el-button>
      </div>
    </el-row>
  </div>

  <div class="content_main">
    <el-template
        :sortable="true"
        :pkTemp="pkTemp"
        :template-value="currentValue"
        :show-type="'index'"
        :showButton="showButton"
        :show-border="false"
        :hideTitle="true"
        :table-style="tableStyle"
        @edit-table-row="editTableRow"
        @delete-table-row="deleteTableRow"
        >
    </el-template>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.index"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        style="text-align: right;margin:0 20px;"
        v-if="page.total>0">
    </el-pagination>
  </div>
  <el-dialog title="请选择客户类型" size="tiny" v-model="addEnterpriseVisible" style="text-align:center;">
    <el-button type="success" size="large" @click="addEnterprise(1)">个人客户</el-button>
    <el-button type="info" size="large" @click="addEnterprise(2)">企业客户</el-button>
  </el-dialog>
</div>
</template>
<script>
export default {
  data() {
    return {
      title: '客户管理',
      filter: {
        keywords: '',
      },
      addEnterpriseVisible: false,
      pkTemp: 'c300406c-9dfe-4c43-ab60-cfa83c4993c0', // 客户列表_保险
      currentValue: '',
      isHide: true,
      searchStr: {
        name: ''
      },
      page: {
        total: 0,
        index: 1,
        size: 10,
      },
      showButton: {
        width: 100,
        group: true,
        buttons: [
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
            content: '删除',
          }
        ]
      },
      tableStyle: {
        'max-height': '800px',
      }
    };
  },
  methods: {
    getData() {
      const vm = this;
      const submitData = {
        pageSize: this.page.size,
        pageIndex: this.page.index-1,
      };
      if(this.searchStr.name) {
        submitData.search_like_name = this.searchStr.name.trim();
      }
      $.ajax({
        url: '/ifbp-app-bd/ac/list',
        type: 'GET',
        dataType: "json",
        data: submitData,
        success: function(res) {
          if(res.success === true) {
            vm.currentValue = res.data.content;
            vm.setPage.call(vm, res.data);
            if (window.env === 'dev') {
              vm.$message('获取数据成功！');
            }
          } else {
            vm.$message('获取数据失败！');
          }
        },
        error: function() {
          vm.$message('请求出错！');
        }
      });
    },
    addEnterprise(type) {
      if(!type) {
        this.addEnterpriseVisible = true;
      } else if(type === 1) {
        this.$router.push('/insCrm/personalInfo/add');
      } else if(type === 2) {
        this.$router.push('/insCrm/enterpriseInfo/add');
      }
    },
    //点击查询按钮触发
    search() {
      this.getData();
    },
    showSearch() {
      this.isHide = !this.isHide;
    },
    inputChange(keywords) {
      console.log('inputChange',keywords);
    },
    // 点击编辑
    editTableRow(row) {
      if(row.type === 1 || row.type === "1") { // 企业客户
        this.$router.push('/insCrm/enterpriseInfo/' + row.id);
      } else if(row.type === 2 || row.type === "2") { // 个人客户
        this.$router.push('/insCrm/personalInfo/' + row.id);
      } else {
        this.$message({type: 'info',message: '未找到ID！'});
      }
    },
    // 点击删除
    deleteTableRow(row, index) {
      const self = this;
      this.$confirm('是否删除当前记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var url = '';
        if(row.type === 1 || row.type === "1") {
          url = '/ifbp-app-bd/bd/customer/enterprise/'+row.id;
        } else if(row.type === 2 || row.type === "2") {
          url = '/ifbp-app-bd/bd/customer/personal/'+row.id;
        } else {
          self.$message({type: 'info',message: '未找到ID！'});
          return;
        }
        self.$http({
          url: url,
          method: 'DELETE',
        }).then((res) => {
          if(res.data.success === true){
            self.currentValue.splice(index, 1);
            self.$set(self.page, 'total', (self.page.total-1));
            if (window.env === 'dev') {
              self.$message({type: 'success',message: '删除成功!'});
            }
          } else {
            self.$message({type: 'error',message: '删除失败!'});
          }
        }).catch(() => {
          self.$message({type: 'error',message: '请求出错!'});
        });
      }).catch(() => {
        self.$message({type: 'info',message: '已取消删除'});
      });
    },
    // 分页
    handleSizeChange(val) {
      this.page.size = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.page.index = val;
      this.getData();
    },
    setPage(data) {
      this.page.total = data.totalElements;
      this.page.size = data.size;
    },
    goBack() {
      window.history.back(-1);
    },
  },
  created() {
    this.getData();
  },
  mounted() {

  },
};
</script>
<style>
  #insCustomerList {
    padding: 20px 30px;
    margin-bottom: 30px;
  }
  /*#insCustomerList .title-header{*/
    /*height: 56px;*/
    /*padding: 10px 20px;*/
    /*background-color: #ffffff;*/
    /*border-bottom: 1px solid #e3e3e3;*/
    /*margin-bottom: 6px;*/
  /*}*/
  /*#insCustomerList .title-header h2 {*/
    /*font-size: 18px;*/
    /*font-weight: bold;*/
  /*}*/
  .search-header {
    padding: 5px 20px;
    background-color: #ffffff;
    border-bottom: 1px solid #e3e3e3;
    margin-bottom: 6px;
  }
  .searchBox {
    width: 40%;
    min-width: 300px;
    float: right;
    margin-right: 20px;
  }
  #insCustomerList .content_main {
    background-color: #ffffff;
    /*min-height: 350px;*/
    padding-bottom: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  #insCustomerList .yon-uitemplate {
    margin: 20px;
  }

  /* 重置表格字体及表头背景，参考友人才 */
  #insCustomerList .el-table__header th{
    font-size: 15px;
    font-weight: 400;
    color: #333;
  }
  #insCustomerList .el-table__body .cell{
    font-size: 13px;
    font-weight: normal;
    color: #333;
  }
  #insCustomerList .el-table thead tr, #insCustomerList .el-table thead tr th {
    background-color: #eee;
  }
  #insCustomerList .el-table__footer-wrapper thead div, #insCustomerList .el-table__header-wrapper thead div {
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
