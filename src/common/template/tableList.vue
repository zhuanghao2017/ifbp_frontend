<template>
<div>
  <div class="divBox">
    <el-row :gutter="20" class="filterBox" type="flex" justify="center">
      <el-col :span="11">
        <el-form :inline="true">
          <el-form-item label="性别">
            <el-select v-model="filter.sex" size="small" style="width:100px" placeholder="请选择">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="缺勤">
            <el-select v-model="filter.isAbsence" size="small" style="width:100px" placeholder="请选择">
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="createClick" size="small" style="width:60px">添加</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="7">
        <!--<searchForm class="searchBox" :keywords="filter.keywords" @searchClick="searchClick" @inputChange="inputChange"></searchForm>-->
        <el-search-form class="searchBox" :keywords="filter.keywords" @searchClick="searchClick" @inputChange="inputChange"></el-search-form>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="25">
        <el-table
          :data="tableData"
          empty-text="暂无数据……"
          border
          stripe
          height="400"
          style="text-align: center">
          <el-table-column
            v-for="item in items"
            :prop="item.flag"
            :label="item.name"
            :width="item.width">
          </el-table-column>
          <el-table-column
            prop="operate"
            label="操作"
            width="100">
            <template scope="scope">
            <el-button-group>
              <el-button @click="editClick(scope)" type="primary" icon="edit" size="small"></el-button>
              <el-button @click="deleteClick(scope)" type="primary" icon="delete" size="small"></el-button>
            </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row class="pagination" type="flex" justify="center">
      <el-col :span="25">
        <!--分页begin-->
        <el-pagination class="pg"
          :current-page="filter.cur_page"
          :page-sizes="[5, 10, 20, 50, 100]"
          :page-size="filter.per_page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total_rows"
          @size-change="pageSizeChange"
          @current-change="pageCurrentChange">
        </el-pagination>
        <!--分页end-->
      </el-col>
    </el-row>
    <!--<editForm :formData="editFormData" :editRowIndex="editRowIndex" @onSubmit="onSubmit" :editFormVisible="editFormVisible" @changeVisible="changeEditFormVisible"></editForm>-->
    <el-edit-form :formData="editFormData" :editRowIndex="editRowIndex" @onSubmit="onSubmit" :editFormVisible="editFormVisible" @changeVisible="changeEditFormVisible"></el-edit-form>
  </div>

  <div class="divBox">
    <el-row type="flex" justify="center">
      <el-col :span="25">
        <el-table
          :data="tableData"
          empty-text="暂无数据……"
          border
          stripe
          height="400"
          style="text-align: center">
          <el-table-column
            sortable
            v-for="item in items"
            :prop="item.flag"
            :label="item.name"
            :width="item.width">
          </el-table-column>
          <el-table-column
            prop="operate"
            label="操作"
            width="100">
            <template scope="scope">
            <el-button-group>
              <el-button @click="editClick(scope)" type="primary" icon="edit" size="small"></el-button>
              <el-button type="primary" icon="delete" size="small"></el-button>
            </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>



  <div>
    <el-row type="flex" justify="center">
      <el-col :span="25">
        <el-table
          :data="tableData"
          empty-text="暂无数据……"
          border
          stripe
          height="400"
          style="text-align: center"
          @select-all="selectAll"
          @select="select">
          <el-table-column type="selection">
          </el-table-column>
          <el-table-column
            sortable
            v-for="item in items"
            :prop="item.flag"
            :label="item.name"
            :width="item.width">
          </el-table-column>
          <el-table-column
            prop="operate"
            label="操作"
            width="100">
            <template scope="scope">
            <el-button-group>
              <el-button @click="editClick(scope)" type="primary" icon="edit" size="small"></el-button>
              <el-button type="primary" icon="delete" size="small"></el-button>
            </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>



</div>

</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      copyTableData: [],
      //total_rows: 0,
      items: [
        {
          flag: 'uId',
          name: '工号',
          width: 100,
        },
        {
          flag: 'name',
          name: '姓名',
          width: 100,
        },
        {
          flag: 'sex',
          name: '性别',
          width: 100,
        },
        {
          flag: 'startTime',
          name: '上班打卡时间',
          width: 200,
        },
        {
          flag: 'endTime',
          name: '下班打卡时间',
          width: 200,
        },
        {
          flag: 'isAbsence',
          name: '缺勤',
          width: 100,
        },
      ],
      filter: {
        per_page: 10, //页大小
        page: 1, // 当前页
        sex: '',
        isAbsence: '',
        keywords: '',
      },
      editFormVisible: false,
      editFormData: [],
      editRowIndex: -1,
    };
  },
  methods: {
    getData: function() {
      const vm = this;
      vm.tableData = [];
      $.ajax({
        type: 'get',
        dataType: "json",
        url: 'static/usersInfoData.js',
        success: function(re){
          vm.tableData = re.usersInfoData;
          vm.addIsAbsenced();
          vm.copyTableData = $.extend(true, [], vm.tableData);
        }
      });
    },
    getDataItem: function(index) {
      return this.tableData[index];
    },
    // getDataItemById: function(id) {
    //   for(let i=0; i<this.tableData.length; i++){
    //     if(this.tableData[i].uId === id) {
    //       return this.tableData[i];
    //     }
    //   }
    //   return {};
    // },
    /*eslint-disable*/
    filterData: function() {

      // 按条件过滤本地数据
      const vm = this;
      return this.copyTableData.filter(function(item, index) {
        return item.sex.indexOf(vm.filter.sex) > -1 && item.isAbsence.indexOf(vm.filter.isAbsence) > -1 && (item.name.indexOf(vm.filter.keywords) > -1 || item.uId.toString().indexOf(vm.filter.keywords) > -1);
      });
    },
    addIsAbsenced: function() {
      for(let i=0; i < this.tableData.length; i++){
        // 判断每个user是否缺勤
        if(this.tableData[i].startTime && this.tableData[i].endTime){
          this.tableData[i].isAbsence = '否';
        } else {
          this.tableData[i].isAbsence = '是';
        }
      }
    },
    selectAll: function(e) {
      console.log(e);
    },
    select: function(e) {
      console.log(e);
    },
    searchClick: function(keywords) {
      //调用api从后台获取查询数据
    },
    inputChange: function(keywords) {
      this.filter.keywords = keywords;
    },
    createClick: function () {
      // body...
      this.editRowIndex = -1;
      const createFormData = {
        uId: '',
        sex: '',
        name: '',
        startTime: '',
        endTime: '',
      };
      console.log('createClick..');
      this.editFormVisible = true;
      this.editFormData = createFormData;
    },
    editClick: function(scope) {
      this.editRowIndex = scope.$index;
      this.editFormVisible = true;
      const rowData = this.getDataItem(this.editRowIndex);
      //const rowData = this.getDataItemById(scope.row.uId);
      this.editFormData = $.extend(true, {}, rowData);
    },
    onSubmit: function(formData) {
        if(this.editRowIndex > -1){
          this.tableData.splice(this.editRowIndex, 1, formData);
        } else {
          this.tableData.push(formData);
        }
    },
    deleteClick: function(scope) {
      this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData.splice(scope.$index,1);
          if (window.env === 'dev') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    pageSizeChange: function() {

    },
    pageCurrentChange: function() {

    },
    changeEditFormVisible: function(val) {
      this.editFormVisible = val;
    }
  },
  watch: {
    filter:{
      handler: function (val, oldVal) {
        console.log('filter watch...');
        this.tableData = this.filterData();
      },
      deep: true,
    },
    tableData: {
      handler: function() {
        this.addIsAbsenced();
      },
      deep: true,
    },
  },
  computed: {
    total_rows: function() {
      return this.tableData.length;
    },
  },
  created: function(){
    this.getData();
  }
}
</script>
<style>
.filterBox, .pagination { margin:20px 0; }
.divBox { margin-bottom: 50px }
.searchBox{ padding-top: 3px }
</style>
