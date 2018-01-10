<template>
<div>
  <div class="divBox">
    <el-row :gutter="20" class="filterBox" type="flex" justify="center">
      <el-col :span="11">
        <el-form :inline="true">
          <el-form-item label="性别">
            <el-select v-model="filter.sex" size="small" style="width:100px" placeholder="请选择">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="createClick" size="small" style="width:60px">添加</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="7">
        <el-search-form class="searchBox" :keywords="filter.keywords" @searchClick="searchClick" @inputChange="inputChange"></el-search-form>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
        <el-table
          v-loading.body="loading"
          :data="tableData"
          empty-text="暂无数据……"
          border
          stripe
          max-height="400"
          style="text-align: center;width:1000px;">
          
          <el-table-column
            v-for="(item,index) in columns"
            :prop="item.flag"
            :label="item.name"
            :width="item.width">
            <template scope="scope" :item="item">
              <div v-if="item.flag==='sex'">
                <span v-if="scope.row.sex===1 || scope.row.sex==='1'">男</span>
                <span v-else>女</span>
              </div>
              <div v-else>
                <span>{{scope.row[item.flag]}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="operate"
            label="操作"
            fixed="right"
            width="100">
            <template scope="scope">
            <el-button-group>
              <el-button @click="editClick(scope)" type="primary" icon="edit" size="small"></el-button>
              <el-button @click="deleteClick(scope)" type="primary" icon="delete" size="small"></el-button>
            </el-button-group>
            </template>
          </el-table-column>
        </el-table>
    </el-row>
    <el-row class="pagination" type="flex" justify="center">
      <el-col :span="25">
        <!--分页begin-->
        <el-pagination class="pg"
          :current-page="pages.cur_page"
          :page-sizes="[5, 10, 20, 50, 100]"
          :page-size="pages.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pages.total_rows"
          @size-change="pageSizeChange"
          @current-change="pageCurrentChange">
        </el-pagination>
        <!--分页end-->
      </el-col>
    </el-row>
    <quickStartEdit :form="editForm" :editRowIndex="editRowIndex" @onSubmit="save" :editFormVisible="editFormVisible" @changeVisible="changeEditFormVisible"></quickStartEdit>
  </div>

</div>

</template>
<script>
import 'lodash';
import quickStartEdit from './quickStartEdit';
export default {
  data() {
    return {
      tableData: [],
      copyTableData: [],
      columns:[],
      old_columns: [
        {
          flag: 'name',
          name: '姓名',
          width: 130,
        },
        {
          flag: 'sex',
          name: '性别',
          width: 70,
        },
        {
          flag: 'age',
          name: '年龄',
          width: 70,
        },
        {
          flag: 'phone',
          name: '手机',
          width: 140,
        },
        {
          flag: 'telephone',
          name: '固定电话',
          width: 140,
        },
        {
          flag: 'email',
          name: '邮箱',
          width: 140,
        },
        {
          flag: 'address',
          name: '地址',
          width: 200,
        },
      ],
      filter: {
        sex: '',
        keywords: '',
      },
      pages: {
        total_rows: 0,
        size: 10, // 页大小
        curPage: 1, // 当前页
        totalPages: 0,
      },
      editFormVisible: false,
      //editFormData: [],
      editRowIndex: -1,
      loading: false,
      editForm: {    // edit表单
        formData: [],
        settingData: [],
        // formStyle 可选
        formStyle: {
          simpleColumn: true,         // 是否按单列显示，false表示按两列显示
          showButtons: true, // 是否显示底部保存和取消按钮，false表示不显示保存取消按钮
          styleObject: {      // 自定义form表单的样式
            width: '500px',
            margin: '0 auto',
          },
        },
      }
    };
  },
  props:['data', 'templateValue'],
  methods: {
    transCoding: function(str) {
      let str2 = '';
      str2 = str.replace(/(\\u)(\w{1,4})/gi,(str3) => {
          return (String.fromCharCode(parseInt((escape(str3).replace(/(%5Cu)(\w{1,4})/g,"$2")),16)));
      });
      str2 = str.replace(/(&#x)(\w{1,4});/gi,(str3) => {
          return String.fromCharCode(parseInt(escape(str3).replace(/(%26%23x)(\w{1,4})(%3B)/g,"$2"),16));
      });
      str2 = str.replace(/(&#)(\d{1,6});/gi,(str3) => {
          return String.fromCharCode(parseInt(escape(str3).replace(/(%26%23)(\d{1,6})(%3B)/g,"$2"),10));
      });
      return str2;
    },
    getData: function() {
      const vm = this;
      vm.tableData = [];
      this.loading = true;
      vm.$http.post('/ifbp-demo-user/user/getEdu',{pk_user:'f56f187f-6afa-4649-b6d2-d0567c71071d'})
        .then((re) => {
          let msg = '';
          if (re.data.success === 'success'){
            let metaData = {};
            if (re.data.detailMsg && re.data.detailMsg.data){
              metaData = re.data.detailMsg.data;
            }
            vm.tableData = (metaData.content instanceof Array) ? metaData.content : [];
            vm.pages.total_rows = metaData.totalElements;
            vm.pages.totalPages = metaData.totalPages;
            vm.pages.size = metaData.size;
            vm.pages.curPage = metaData.number;
            vm.copyTableData = _.cloneDeep(vm.tableData);
            this.loading = false;
          } else {
            if (re.data.success === 'fail_global') {
              msg = this.transCoding(re.data.message);
            } else if (re.data.success === 'fail_field') {
              console.log('error detailMsg:', re.data.detailMsg);
            }

            vm.$message({
              type: 'error',
              message: msg !=='' ? msg : '获取数据出错，请重试！'
            });

            this.loading = false;
          }
        })
        .catch(() => {
          vm.$message({
            type: 'error',
            message: '获取数据出错!'
          });
          this.loading = false;
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
    filterData: function() {
      // 按条件过滤本地数据
       const vm = this;
      /*eslint arrow-body-style: ["warn", "always"]*/
      return this.copyTableData.filter((item) => {
        return (typeof item.sex === 'string' ? item.sex : '').indexOf(vm.filter.sex) > -1 ||
               (typeof item.name === 'string' ? item.name : '').indexOf(vm.filter.keywords) > -1;
      });
    },
    selectAll: function(e) {
      console.log(e);
    },
    select: function(e) {
      console.log(e);
    },
    searchClick: function(keywords) {
      console.log(keywords);
      this.getData();
      //调用api从后台获取查询数据
    },
    inputChange: function(keywords) {
      this.filter.keywords = keywords;
    },
    createClick: function () {
      this.editRowIndex = -1;
      console.log('createClick..');
      this.editFormVisible = true;
      const self = this;
      this.editForm.formData.forEach((item, index) => {   // 重置formData的value
        self.editForm.formData[index].value = '';
      });
      console.log("createclick..", this.editForm.formData);
    },
    editClick: function(scope) {
      console.log(scope);
      this.editRowIndex = scope.$index;
      this.editFormVisible = true;
      const rowData = this.getDataItem(this.editRowIndex);
      const self = this;
      //const rowData = this.getDataItemById(scope.row.uId);
      this.editForm.formData.forEach((item, index) => {   // 重置formData的value
        self.editForm.formData[index].value = rowData[item.key];
      });
      console.log("editclick..", this.editForm.formData);
    },
    setEditFormData() {

    },
    save: function(formData) {
      const vm = this;
      var tmp = JSON.parse(JSON.stringify(this.templateValue));
      if (this.editRowIndex > -1) {
        const formData2 = _.cloneDeep(formData);  
        var tmpArray = this.tableData.slice(0);    
        formData2.pk_user = this.tableData[this.editRowIndex].pk_user;
        tmpArray[this.editRowIndex] = formData2;
        tmp.id_eduentity = tmpArray;
        console.log(this.tableData);
        vm.$http.post('/ifbp-demo-user/user/save', [tmp])
          .then((re) => {
            let msg = '';
            console.log(re);
            if (re.data.success === 'success'){
              vm.tableData.splice(vm.editRowIndex, 1, formData);
              vm.$message({
                type: 'info',
                message: '修改成功！',
              });
            } else {
              if (re.data.success === 'fail_global') {
                msg = this.transCoding(re.data.message);
              } else if (re.data.success === 'fail_field') {
                console.log('error detailMsg:', re.data.detailMsg);
              }
              vm.$message({
                type: 'error',
                message: msg !=='' ? msg : '修改失败！'
              });
            }
          })
          .catch(() => {
            vm.$message({
              type: 'info',
              message: '修改失败！',
            });
          });
      } else {
        tmp.id_eduentity = [formData].concat(this.tableData);
        vm.$http.post('/ifbp-demo-user/user/save',[tmp])
          .then((re) => {
            let msg = '';
            if (re.data.success === 'success'){
              vm.tableData.unshift(formData);
              vm.$message({
                type: 'info',
                message: '添加成功！'
              });
            } else {
              if (re.data.success === 'fail_global') {
                msg = this.transCoding(re.data.message);
              } else if (re.data.success === 'fail_field') {
                console.log('error detailMsg:', re.data.detailMsg);
              }
              vm.$message({
                type: 'error',
                message: msg !=='' ? msg : '添加失败！'
              });
            }
          })
          .catch(() => {
            vm.$message({
              type: 'info',
              message: '添加失败！'
            });
          });
      }
    },
    deleteClick: function(scope) {
      const vm = this;
      this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
          vm.$http.post('/ifbp-demo-user/user/del',[scope.row])
          .then((re) => {
            let msg = '';
            if (re.data.success === 'success'){
              vm.tableData.splice(scope.$index,1);
              vm.$message({
                type: 'success',
                message: '删除成功!'
              });
            } else {
              if (re.data.success === 'fail_global') {
                msg = this.transCoding(re.data.message);
              } else if (re.data.success === 'fail_field') {
                console.log('error detailMsg:', re.data.detailMsg);
              }
              vm.$message({
                type: 'error',
                message: msg !=='' ? msg : '删除失败！'
              });
            }
          }).catch(() => {
            vm.$message({
              type: 'error',
              message: '删除失败！'
            });
          });
      }).catch(() => {
          vm.$message({
            type: 'info',
            message: '已取消删除！'
          });
      });
    },
    pageSizeChange: function() {

    },
    pageCurrentChange: function() {

    },
    changeEditFormVisible: function(val) {
      this.editFormVisible = val;
    },
    getcolumns(){
      var tmp = [];
      var tmpform = [];
      var tmpSetting = [];
      this.data.layoutDetail.forEach((v) => {
        tmp.push({
          flag: v.itemCode.split('.').pop(),
          name: v.title,
          width: v.width ? v.width : 130
        });
        tmpform.push({
          key: v.itemCode.split('.').pop(),
          value: ''
        });
        tmpSetting.push({
            label: v.title, // 左边字段名
            el: 'input',                // 右边元素
            placeholder: '请输入',       // 默认显示提示信息
            required: false,              // 是否必填
          },);
      });
      this.columns = tmp;
      this.editForm.formData = tmpform;
      this.editForm.settingData = tmpSetting;
    }
  },
  watch: {
    filter:{
      handler: function () {
        this.tableData = this.filterData();
      },
      deep: true,
    },
  },
  created: function(){
    this.getcolumns();
    this.getData();
  },
  components: {
    quickStartEdit,
  },
};
</script>
<style>
.filterBox, .pagination { margin:20px 0; }
.divBox { margin-bottom: 50px }
.searchBox{ padding-top: 3px }
</style>
