<template>
  <div class="list-panel">
    <div v-show="curShow">
      <div class="title-header">
        <h2 class="name">参数定义-租户</h2>
      </div>
      <!--search-->
      <div id="search-container">
       <!--  <div class="fl">
          <el-button type="primary" class="legacy" >新增</el-button>
        </div> -->
        <div class="fr">
          <el-button type="text" @click="showSearch">
            高级搜索
            <i class="el-icon-arrow-down" v-if="this.isHide"></i>
            <i class="el-icon-arrow-up" v-if="!this.isHide"></i>
          </el-button>
          <el-button type="primary" @click="goBack" style="float:right;margin-left:20px;">返回</el-button>
        </div>
      </div>
       <!-- 高级搜索 -->
      <div id="advanced-search" :class="{hide: isHide}">
          <el-row>
            <el-col :span="2"><span class="search-label">参数编码:</span></el-col>
            <el-col :span="3">
              <el-input type="text" v-model="userCode" placeholder="请输入用户编码"></el-input>
            </el-col>
            <el-col :span="2"><span class="search-label">参数名称:</span></el-col>
            <el-col :span="3">
              <el-input type="text" v-model="userName" placeholder="请输入用户姓名"></el-input>
            </el-col>
            <el-button type="primary" @click="search" style="margin-left: 30px;">搜索</el-button>
          </el-row>
      </div>

        <div style="margin-top: 10px;">
          <!-- 侧边菜单 -->
          <div class="subnav fl" style="background: #fff">
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"  :highlight-current=true node-key="id"></el-tree>
          </div>
          <!-- 列表 -->
          <div class="contentList fl">
            <!-- <div class="addList">
              <el-button type="primary" @click="addBtn" class="addBtn">新增</el-button>
            </div> -->
              <div id="staff-list">
                <el-row type="flex" justify="center">
                  <el-col :span="24">
                    <el-table
                      :data="tableData"
                      empty-text="暂无数据……"
                      border
                      height="400"
                      style="text-align: center;width: 100%"
                      >
                      <el-table-column
                        prop="initcode"
                        label="参数编码"
                        header-align="center">
                      </el-table-column>
                      <el-table-column
                        prop="initname"
                        label="参数名称"
                        header-align="center">
                      </el-table-column>
                      <el-table-column
                        prop="valuelist"
                        label="取值范围"
                        header-align="center">
                      </el-table-column>
                      <el-table-column
                        label="参数值"
                        header-align="center"
                        prop="value">
                        <template scope="scope">
                          <span>{{scope.row.value}}</span>
                          <el-button type="text" icon="edit" @click="checkValue(scope)"></el-button>
                          <!-- <el-select v-model="enumsSelect" v-if="isEnums">
                            <el-option
                              v-for="item in enums"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                          <el-input v-else>{{this.value}}</el-input> -->
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-col>
                </el-row>
              </div>
              
              <!-- 分页 -->
              <div style="background: #fff;padding-bottom: 10px;">
                <div class="block" style="text-align: right;">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="40">
                  </el-pagination>
                </div>
            </div>
          </div>
        </div>
    </div>
    <el-dialog
      title="修改参数值"
      :visible="showSetValue"
      size="tiny"
      :before-close="handleClose">
      <div>
        <el-input v-if="showSetValueList" v-model="textValue">{{textValue}}</el-input>
        <el-select v-else v-model="valueListSelect" placeholder="请选择参数值">
            <el-option
              v-for="item in valueList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showSetValue = false">取 消</el-button>
        <el-button type="primary" @click="submitValue">确 定</el-button>
      </span>
    </el-dialog>

  <!-- <!-- 对话框 -->
    <el-dialog title="参数值修改" v-model="dialogFormVisible" size="tiny">
      <el-form :model="form">
        <el-form-item v-show="dialogShow" label="参数值" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off" class="textInput"></el-input>
        </el-form-item>
        <el-form-item v-show="!dialogShow" label="参数值" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择参数值">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateDialog">确 定</el-button>
      </div>
    </el-dialog> -->

  </div>
</template>
<script>
import parameterize from './parameterize.vue';
  export default {
    data(){
      return {
        valueListSelect:'',
        textValue: '',//文本类型
        valueList:[], //枚举类型
        scope:'',
        showSetValue:false,
        isEnums:false, //判断是否是枚举
        enumsSelect: '', //默认选中的枚举
        areaId:'',
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        dialogShow: true,
        curList: {},
        curId: '',
        categories: '',
        result: [],
        enablestate: '',
        currentPage4: 1,
        userCode: '',
        userName: '',
        curShow: true,
        thatShow: {
          isShow: false,
          search:{
            categories:''
          }
        },
        isHide: true,
        tableData:[],
        data1: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        data: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      };
    },
    created(){
       var that=this;
       this.$http({
          url: '/wbalone/appMGT/findAllApps',
          method: 'get',
          dataType: 'json'
        }).then((res) => {
          var resData = JSON.parse(JSON.stringify(res.data.data));
          for(var i=0;i<resData.length;i++){
            var length = resData[i].children.length;
            for(var j=0; j<length;j++){
            delete resData[i].children[j].children;
            }
          }
          that.data=resData;
        }).catch(() => {
          that.$message({
            message: '列表获取失败',
            type: 'error'
          });
        });
    },
    methods: {
      checkValue(scope){
        this.showSetValue = true;
        this.scope = scope;
        if(scope.row.paratype === '枚举'){
          this.valueList = scope.row.valuelist.split(',');
          this.showSetValueList = false;
        }else{
          // this.textValue = scope.row.valuelist;
          this.showSetValueList = true;
        }
      },
      submitValue(){
        var that = this;
        var submitData = this.scope.row;
        if(this.scope.row.paratype === '枚举'){
          that.$set(submitData,'value',that.valueListSelect);
        } else {
          that.$set(submitData, 'value', that.textValue);
        }
          this.$http({
            url: '/ifbp-app-sm/sm/tenantparatemp/update',
            method: 'put',
            dataType: 'json',
            data:submitData
          }).then((res) => {
            if(res.data.success === true){
              that.showSetValue = false;
              that.$message('修改成功');
            }else{
              that.showSetValue = true;
            }   
          }).catch(() => {
            that.$message({
              message: '修改失败',
              type: 'error'
            });
          });
      },
       handleClose(done) {
        this.$confirm('确认关闭？').then(() => {
            done();
            this.showSetValue = false;
          }).catch(() => {});
      },
      editBtn(scope){
        this.curList=this.tableData[scope.$index];
        console.log(this.curList);
        this.form.region='';
        if(this.curList.paratype === "枚举"){
          var arr =this.curList.valueRange.split(",");
          console.log(arr);
          var curArr=[];
          arr.forEach((item) => {
            var obj ={};
            obj.value=item;
            obj.label=item;
            curArr.push(obj);
          });
          this.options=curArr;
          this.dialogShow=false;
        }else{
          this.form.name=this.curList.parameterValues;
          this.dialogShow=true;
        }
        this.dialogFormVisible=true;
      },
      findList(arr, value) {
        var that=this;
        arr.forEach((v) => {
          // console.log(v)
            that.result[v.value] = (that.result[value] ?that.result[value] + '/': '') + v.label;
            if(v.children&&v.children.length > 0) {
              that.findList(v.children, v.value);
            }
        });
      },
      updateDialog(){
        this.dialogFormVisible=false;
      },
      changeShow(e) {
        this.curShow = e;
      },
      deleteClick: function(scope) {
          var that = this;
          this.$http({
            url: '/ifbp-app-sm/sm/paratemp/delete/'+this.tableData[scope.$index].pk_sysinittemp,
            method: 'post',
            dataType: 'json'
          }).then((res) => {
            console.log(res);
          }).catch(() => {
            that.$message({
              message: '删除失败',
              type: 'error'
            });
          });
      },
      searchClick: function(scope) {
        var that=this;
        this.curShow = false;
        this.thatShow.isShow = true;
        this.thatShow.add = true;
        this.$http({
            url: '/ifbp-app-sm/sm/paratemp/get/'+this.tableData[scope.$index].pk_sysinittemp,
            method: 'get',
            dataType: 'json'
          }).then((res) => {
            var v=res.data.data;
            var curObj={};
              curObj.parameterCoding=v.initcode;
              curObj.parameterType=v.valuetype?'枚举':'文本';
              curObj.parameterName=v.initname;
              curObj.valueRange=v.valuelist;
              curObj.pk_sysinittemp=v.pk_sysinittemp;
              curObj.parameterValues=v.value;
              curObj.isShow=v.showflag;
              curObj.remark=v.remark;
              curObj.categories=that.categories;
              curObj.app_code=that.curId;
              that.thatShow.search=curObj;
              // console.log(curObj)
          }).catch(() => {
            that.$message({
              message: '查看详情失败',
              type: 'error'
            });
          });
      },
      goBack(){
        window.history.back(-1);
      },
      addBtn() {
        // console.log(this.thatShow)
        this.curShow = false;
        this.thatShow.isShow = false;
        this.thatShow.add = false;
        this.thatShow.search={};
        console.log(this.thatShow);
        this.thatShow.search.categories = this.categories;
        this.thatShow.search.app_code = this.curId;
      },
      showSearch() {
        this.isHide = !this.isHide;
      },
      search() {
        var that = this;
        this.$http({
              url: '/ifbp-app-sm/sm/tenantparatemp/query?like_initcode='+this.userCode+'&like_initname='+this.userName,
              method: 'get',
              dataType: 'json'
            }).then((res) => {
              that.tableData = res.data.data;
            }).catch(() => {
              that.$message({
                message: res.data.error.errorMessage,
                type: 'error'
              });
            });
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleNodeClick(data) {
        this.categories=this.result[data.value];
        var that=this;
        if(data.id){
          this.$http({
              url: '/ifbp-app-sm/sm/tenantparatemp/pageList?pn=&ps=&search_app_code='+data.id,
              method: 'get'
            }).then((res) => {
              if(res.data.success === true){
                that.tableData = res.data.data.content;
              }
            }).catch(() => {
              that.$message({
                message: '列表获取失败',
                type: 'error'
              });
            });
        }
      },
      request(n, s) {
        var url;
        var search = '&search_code=' + this.code + '&search_name=' + this.name + '&search_mobile=' + this.mobile + '&search_enablestate=' + this.enablestate;
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
          var data = res.data.data;
          console.log(data);
          // this.totalElements = res.data.data.totalElements ;       // 总条数
          // this.size = res.data.data.size;                          // 每页的条数
          // this.currentValue = res.data.data.content;
        }).catch(() => {
          this.$message({
            message: '列表获取失败',
            type: 'error'
          });
          this.currentValue = json.data.content;
        });
      }
    },
    components: {
      parameterize:  parameterize,
    },
  };
</script>
<style scoped>
  #search-container{
    height: 56px;
    padding: 10px 20px;
    background-color: #ffffff;
    border-bottom: 1px solid #e3e3e3;
  }
  .subnav{
    width:15%;
    height: 480px;
    overflow-x: hidden;
    margin-right: 10px;
    /*background: red;*/
  }
  .contentList{
    /*background: blue;*/
    /*height: 500px;*/
    width: 84%;
  }
  .el-submenu{
    /*width: 210px!important;*/
    min-height: 36px!important;
  }
  .el-menu-item{
    /*width: 210px!important;*/
    width: 100%;
    height: 36px!important;
    line-height: 36px!important;
    /*border:none!important;*/
    text-align: left;
    text-indent: 2em;
  }
  .el-submenu__title{
    text-indent: 2em!important;
  }
  .addList{
    height: 46px;
    background: #fff;
    position: relative;
  }
  .addBtn{
    height: 40px;
    position: absolute;
    right: 12px;
    top: 50%;
    margin-top: -20px;
  }
  #staff-list{
    margin-top: 0px;
    padding-top: 20px;
    padding-bottom: 20px;
    /*height: 400px;
    overflow-x: hidden;*/
  }
  .el-tree{
    border: 1px solid transparent;
  }
  .el-tree-node__content{
    padding-left: 10px!important;
  }
  .textInput{
    width: 48%;
  }
</style>
