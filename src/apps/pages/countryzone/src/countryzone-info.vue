<template>
  <div class="list-panel">
    <!--节点title-->
    <div class="title-header">
      <h2 class="name">国家地区</h2>
    </div>
    <!--按钮区域-->
    <div id="search-container">
      <div class="fl">
        <el-button type="primary" @click="add">新增</el-button>
      </div>
      <div class="fr">
        <el-button type="text" @click="showSearch">
          高级搜索
          <i class="el-icon-arrow-down" v-if="this.isHide"></i>
          <i class="el-icon-arrow-up" v-if="!this.isHide"></i>
        </el-button>
        <el-button type="primary" @click="goBack">返回</el-button>
      </div>
    </div>
    <!--高级搜索区域-->
    <div id="advanced-search" :class="{hide: isHide}">
      <el-row>
        <el-col :span="2"><span class="search-label">编码:</span></el-col>
        <el-col :span="3">
          <el-input type="text" v-model="code" placeholder="请输入编码"></el-input>
        </el-col>
        <el-col :span="2"><span class="search-label">名称:</span></el-col>
        <el-col :span="3">
          <el-input type="text" v-model="name" placeholder="请输入名称"></el-input>
        </el-col>
        <div class="fr">
          <el-button @click="search">搜索</el-button>
        </div>
      </el-row>
    </div>

    <!-- 国家地区列表 -->
    <div id="countryzone-list">
      <ifbp-template ref="countryzone-table"
                     :pkTemp="pk_temp"
                     :tplData="tplData"
                     :tplResetFun="tplResetFun"
                     :tplMethods="tplMethods"
                     :tplId="tplId"
      >
      </ifbp-template>
      <!--分页组件-->
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
    <!--删除确认Dialog-->
    <el-dialog
      title="提示"
      v-model="delDialogVisible"
      :modal="true"
      size="tiny">
      <span>确认删除该记录？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import test from "../infoMockData.js";
  export default {
    data(){
      return {
        countryzone: [],
        isHide: true,
        tplId: 'testId',
        tplData: {
          countryzone: [],
        },
        tplMethods: {
          deleteClick: function (scope) {
            this.parentComp.delDialogVisible = true;
            this.delId = scope.row.type_name;
          },
          editClick: function (scope) {
            location.hash = '/baseapp/countryzone/edit/' + scope.row.pk_country;
          },
        },
        tplResetFun: function ($node) {
          var $table = this.getNodeBy_Id($node, '0rghzhgwpd5');
          var indexHtml = this.getTableIndexHtml();

          var operateArr = [
            {
              title: "编辑",
              click: "editClick",
              icon: "edit"
            },
            {
              title: '删除',
              click: 'deleteClick',
              icon: 'delete'
            }
          ]
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.prepend(indexHtml);
          $table.append(operateHtml);
          return $node[0].outerHTML;
        },
        columns: '',
        totalPages: '',
        totalElements: 0,
        currentPage: 1,
        size: 10,
        code: '',
        name: '',
        isEdit: false,
        currentValue: '',
        pk_temp: '65049071-517c-4231-9788-e9e334897674',
        delDialogVisible: false,
        delId: '',
      };
    },
    created(){
      // 获取列表
      this.request();
    },
    methods: {
      // 获取列表请求
      request(n, s) {
        var url;
        var search = '&search_code=' + this.code + '&search_name=' + this.name;
        if (n === undefined) {
          url = '/baseapp/countryzone/pageList?pn=1&ps=10&sortColumn=' + search;
        } else {
          url = '/baseapp/countryzone/pageList?pn=' + n + '&ps=' + s + search;
        }
        var _this = this;
        this.$http({
          url: url,
          method: 'get',
          dataType: 'json'
        }).then((res) => {
          _this.totalElements = res.data.data.totalElements;       // 总条数
          _this.size = res.data.data.size;                          // 每页的条数
          _this.$refs['countryzone-table'].setData('countryzone', res.data.data.content);
        }).catch((e) => {
          console.error(e);
          this.$message({
            message: '列表获取失败',
            type: 'error'
          });
        });
      },
      handleSizeChange(val) {
        this.request(1, val);
      },
      handleCurrentChange(val) {
        this.request(val, this.size);
      },
      // 高级搜索
      showSearch() {
        this.isHide = !this.isHide;
      },
      search() {
        this.request();
      },
      // 跳转到添加国家地区新增页面
      add() {
        location.hash = '/baseapp/countryzone/add';
      },
      deleteClick() {
        this.$http({
          url: '/baseapp/countryzone/delete/' + this.delId,
          method: 'post'
        }).then((res) => {
          if (res.data.status === true) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.request();
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
          this.delDialogVisible = false;
        }).catch((e) => {
          console.error(e);
          this.$message({
            message: '发生异常',
            type: 'error'
          });
        });
      },
      goBack() {
        window.history.back(-1);
      }
    }
  };

</script>
<style>
</style>
