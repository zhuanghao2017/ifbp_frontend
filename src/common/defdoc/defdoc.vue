<template>
  <div class="list-panel">
    <div class="title-header">
      <h2 class="name">自定义档案分类</h2>
    </div>
    <!--search-->
    <div id="search-container">
      <div class="fl">
        <el-button type="primary" class="legacy" @click="createClick">新增</el-button>
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
        <el-col :span="2"><span class="search-label">编码/名称:</span></el-col>
        <el-col :span="3">
          <el-input type="text" v-model="type_code" placeholder="请输入编码/名称"></el-input>
        </el-col>
        <div class="fr">
          <el-button @click="search">搜索</el-button>
        </div>
      </el-row>
    </div>
    <!-- 用户信息列表 -->
    <div id="staff-list">
      <el-table ref="multipleTable" :data="tableData" border style="width: 100%;margin:20px 0;" @row-click="check">
        <el-table-column prop="type_code" label="编码">
        </el-table-column>
        <el-table-column prop="bu_id" label="业务编码">
          <!-- <template scope="scope">
            <div class="check-link">{{scope.row.type_name}}</div>
          </template> -->
        </el-table-column>
        <el-table-column prop="type_name" label="名称">
          <!-- <template scope="scope">
            <div class="check-link">{{scope.row.type_name}}</div>
          </template> -->
        </el-table-column>
        <el-table-column prop="is_preset" label="系统预置">
          <template scope="scope">
            <div>{{scope.row.is_preset===true? "是":"否"}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="type_desc" label="描述">
        </el-table-column>
        <el-table-column prop="operate" label="操作" width="150">
          <template scope="scope">
            <el-button-group>
              <!-- <el-button @click="check(scope)" type="text"  size="small" title="查询">查询</el-button> -->
              <el-button @click="editClick(scope)" type="text" size="small" title="编辑">编辑</el-button>
              <el-button @click="deleteClick(scope)" v-if="!scope.row.is_preset" type="text"  size="small" title="删除">删除</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <!--pagination-->
      <input type="text" id="p" style="visibility: hidden">
      <el-pagination
        id="staff-pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalElements">
      </el-pagination>
    </div>
    <el-dialog
      title="提示"
      v-model="delDialogVisible"
      :modal="true"
      size="tiny">
      <span>确认删除？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteFun">确 定</el-button>
      </span>
    </el-dialog>
    <div>
      <editForm :formData="editFormData"  @onSubmit="onSubmit" :editRowIndex="editRowIndex" :editFormVisible="editFormVisible" @changeVisible="changeEditFormVisible"></editForm>
    </div>
  </div>
</template>
<script>
  // import test from "../mock.js";
  import editForm from './defdocEdit.vue';
  export default {
    data() {
      return {
        isEdit: false,
        isHide: true,
        delDialogVisible: false,
        tableData: [],
        currentPage: 1,
        totalElements: 0,
        pageSize: 10,
        type_code: '',
        editFormData: [],
        editRowIndex: -1,
        editFormVisible: false
      };
    },
    created() {
      /**
       *   获取列表
       **/
      this.request();
    },
    components:{
       editForm,
    },
    methods: {
      /**
       *   获取列表请求
       **/
      request() {
        console.log('queryStr:' + this.type_code);
        console.log('currentPage:' + this.currentPage);
        console.log('pageSize:' + this.pageSize);
        var url =  '/ifbp-app-sm-defdoc-web/defdoclist/page';
        var data = {
          // searchParams: {
          //   searchMap:{
          //     keyword:this.type_code,
          //   }
          // },
          pageNum: this.currentPage -1,
          pageSize: this.pageSize
        };

        this.$http({
          url: url,
          method: 'post',
          data: data,
          dataType: 'json'
        }).then((res) => {
          this.tableData=res.data.data.content;
          this.totalElements = res.data.data.totalElements ;       // 总条数
          this.pageSize = res.data.data.size;                          // 每页的条数
        }).catch(() => {
          this.$message({
            message: '档案信息获取失败',
            type: 'error'
          });
        });
      },
      // 跳转到新增页面
      createClick:function(){
        this.editRowIndex = -1;
        const crateFormData ={
          type_code:'',
          type_name:'',
          type_desc:''
        };
        this.editFormVisible = true;
        this.editFormData = crateFormData;
      },
      // 高级搜索
      showSearch() {
        this.isHide = !this.isHide;
      },
      // 搜索按钮
      search() {
        this.request();
      },
      // 返回按钮
      backButton() {
        this.$router.go(-1);
      },
      getDataItem: function(index) {
        return this.tableData[index];
      },
      // 行查看按钮
      check: function(row , event) {
        // debugger;
        // location.hash = '/defdoc/detail/' + scope.row.id + '/' + scope.row.type_name;
        if (event.target.parentElement.className.indexOf("el-button--text") < 0) {
          location.hash = '/defdoc/detail/' + row.id + '/'  + row.type_name + '/' + row.bu_id;
        }

      },
      // 行编辑按钮
      editClick: function(scope) {
        // debugger;
        this.editRowIndex = scope.$index;
        this.editFormVisible = true;
        const rowData = this.getDataItem(this.editRowIndex);
        this.editFormData = $.extend(true, {}, rowData);
      },
      // 行删除按钮
      deleteClick: function(scope) {
        this.delDialogVisible = true;
        this.delId = scope.row.id;
      },
      // 删除确定按钮
      deleteFun: function(){
        var url = '/ifbp-app-sm-defdoc-web/defdoclist/deleteById';
        var data = this.delId;
        this.$http({
          url: url,
          method: 'post',
          data: data,
          dataType: 'json',
          headers:{
            'Content-Type':'application/json'
          }
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
      },

      handleSizeChange(val) {
        this.currentPage = 1;
        this.pageSize = val;
        this.request();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.request();
      },

      onSubmit: function(formData) {
        if(this.editRowIndex > -1){
          this.tableData.splice(this.editRowIndex, 1, formData);
        } else {
          this.tableData.push(formData);
        }
      },
      changeEditFormVisible: function(val) {
        this.editFormVisible = val;
      },
    }
  };
</script>
<style>

</style>
