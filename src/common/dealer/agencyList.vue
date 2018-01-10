<template>
<div id="agencyList">
  <div class="title-header">
    <h2 class="name">{{title}}</h2>
  </div>

  <div id="search-container">
    <div class="fl">
      <el-button type="primary" class="legacy" @click="addDealer">新增</el-button>
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
      <el-col :span="3"><span class="search-label"> 供应商名称:</span></el-col>
      <el-col :span="4">
        <el-input type="text" v-model="searchStr.name" placeholder="请输入供应商名称"></el-input>
      </el-col>
      <div class="fr">
        <el-button @click="search">搜索</el-button>
      </div>
    </el-row>
  </div>

  <div class="content_main">
    <el-template
        :sortable="true"
        :isEdit="true"
        :pkTemp="pkTemp"
        :template-value="currentValue"
        :showButton="showButton"
        :hideTitle="true"
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
</div>
</template>
<script>
// import template from '../userInfo/ui-template/src/template.vue';
export default {
  data() {
    return {
      title: '供应商管理',
      filter: {
        keywords: '',
      },
      pkTemp: '1764ae8b-69d7-4dc1-bde3-5a73586542a7',
      currentValue: '',
      page: {
        total: 0,
        index: 1,
        size: 10,
      },
      isHide: true,
      searchStr: {
        name: ''
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
    };
  },
  methods: {
    addDealer(){
      this.$router.push('/dealer/agency/add');
    },
    showSearch() {
      this.isHide = !this.isHide;
    },
    search() {
      this.getData();
    },
    getData() {
      const vm = this;
      const submitData = {
        pageSize: this.page.size,
        pageIndex: this.page.index-1,
      };

      if (this.searchStr.name) {
        submitData.search_like_name = this.searchStr.name.trim();
      }
      this.currentValue = [];
      $.ajax({
        url: '/ifbp-app-bd/bd/supplier/list',
        type: 'get',
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
    // 点击查询按钮触发
    searchClick(keywords) {
      console.log('searchClick',keywords);
      this.getData();
    },
    inputChange(keywords) {
      console.log('inputChange',keywords);
    },
    // 点击编辑
    editTableRow(row) {
      this.$router.push('/dealer/agency/' + row.id);
    },
    // 点击删除
    deleteTableRow(row, index) {
      const self = this;
      this.$confirm('是否删除当前记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: '/ifbp-app-bd/bd/supplier/' + row.id,
          method: 'delete',
        }).then((res) => {
          if(res.data.success === true) {
            if (window.env === 'dev') {
              console.log('delete successfully');
              this.$message('删除成功');
            }
            this.currentValue.splice(index, 1);
          } else {
            this.$message('删除失败');
          }
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
      // window.history.back(-1);
      this.$router.push('/appArea_0');
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
  #agencyList {
    padding: 20px 30px;
    margin-bottom: 30px;
  }
  .search-header {
    /*height: 50px;*/
    padding: 6px 20px;
    background-color: #ffffff;
    border-bottom: 1px solid #e3e3e3;
    margin-bottom: 6px;
  }
  .search-header .searchBox {
    width: 40%;
    min-width: 300px;
    float: right;
    margin-right: 20px;
  }
  #agencyList .content_main {
    background-color: #ffffff;
    min-height: 350px;
    padding-bottom: 20px;
    margin-top: 20px;
  }
  #agencyList .yon-uitemplate {
    margin: 20px;
  }

  /* 重置表格字体及表头背景，参考友人才 */
  #agencyList .el-table__header th{
    font-size: 15px;
    font-weight: 400;
    color: #333;
  }
  #agencyList .el-table__body .cell{
    font-size: 13px;
    font-weight: normal;
    color: #333;
  }
  #agencyList .el-table thead tr, #agencyList .el-table thead tr th {
    background-color: #eee;
  }
  #agencyList .el-table__footer-wrapper thead div, #agencyList .el-table__header-wrapper thead div {
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
  .legacy{
  padding-left:20px;
  padding-right:20px;
  }
</style>
