<template>
  <div class="list-panel">
    <div v-show="curShow">
      <div class="title-header">
        <h2 class="name">参数定义-系统管理员</h2>
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
            <el-col :span="2"><span class="search-label"> 是否显示:</span></el-col>
            <el-col :span="4">
              <el-select id="s-state" v-model="enablestate">
                <el-option
                  v-for="item in search_options"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <div>
              <el-button type="primary" @click="search">搜索</el-button>
            </div>
          </el-row>
      </div>

        <div style="margin-top: 10px;">
          <!-- 侧边菜单 -->
          <div class="subnav fl" style="background: #fff">
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"  :highlight-current=true node-key="id"></el-tree>
          </div>
          <!-- 列表 -->
          <div class="contentList fl">
            <div class="addList">
              <el-button type="primary" @click="addBtn" class="addBtn">新增</el-button>
            </div>
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
                        prop="value"
                        label="参数值"
                        header-align="center">
                      </el-table-column>
                       <el-table-column
                        prop="showflag"
                        label="是否显示"
                        header-align="center">
                      </el-table-column>
                      <!--  <el-table-column
                        prop="pk_sysinittemp"
                        label="id"
                        header-align="center" v-show="false">
                      </el-table-column> -->
                      <el-table-column
                        prop="operate"
                        label="操作"
                        width="150"
                        header-align="center">
                        <template scope="scope">
                          <el-button-group>
                            <el-button @click="searchClick(scope)" type="primary" icon="search" size="small"></el-button>
                            <el-button type="primary" icon="delete" size="small" style="margin-left:10px"  @click="deleteClick(scope)"></el-button>
                          </el-button-group>
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
    <parameterize v-show="!curShow" :thatShow='thatShow' @addBackData='getAddBackData' @curShow='changeShow'></parameterize>
  </div>
</template>
<script>
import parameterize from './parameterize.vue';
  export default {
    data(){
      return {
        areaId:'',
        curId: '',
        categories: '',
        result: [],
        search_options: [{
          label: '全部',
          value: ''
        },{
          label: '是',
          value: '是'
        },{
          label: '否',
          value: '否'
        }],
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
        addBackData:'',
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
        }
      };
    },
    created(){
       var that=this;
       this.$http({
          url: '/wbalone/appMGT/findAllApps',
          // http://testap.imfbp.com/wbalone/appMGT/findAllApps
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
          that.findList(resData);
          this.areaId = res.data.data[0].areaId;
        }).catch(() => {
          that.$message({
            message: '列表获取失败',
            type: 'error'
          });
        });
    },
    methods: {
      getAddBackData(e){
        this.tableData = e;
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
            if(res.data.success === true){
              that.tableData.splice(scope.$index,1);
               that.$message({
               message: '删除成功',
               type: 'success'
              });
            }

          }).catch(() => {
            that.$message({
              message: '删除失败',
              type: 'error'
            });
          });
      },
      searchClick: function(scope) {
        var that=this;
        // console.log(this.tableData[scope.$index].pk_sysinittemp);
        this.curShow = false;
        this.thatShow.isShow = true;
        this.thatShow.add = true;
        this.$http({
            url: '/ifbp-app-sm/sm/paratemp/get/'+this.tableData[scope.$index].pk_sysinittemp,
            method: 'get',
            dataType: 'json'
          }).then((res) => {
            // console.log("得到数据")
            // console.log(res.data.data.remark)
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
              that.$set(that.thatShow,'search',curObj);
              // console.log(curObj)
          }).catch(() => {
            that.$message({
              message: '查看详情失败',
              type: 'error'
            });
          });
      },
      goBack(){
        alert(1);
      },
      addBtn() {
        // console.log(this.thatShow)
        this.thatShow.isShow = false;
        this.thatShow.add = false;
        this.thatShow.search={};
        console.log(this.thatShow);
        this.thatShow.search.categories = this.categories;
        this.thatShow.search.app_code = this.curId || this.areaId;
        this.curShow = false;
        // if(this.categories.split("/")[1]){
        //   this.curShow = false;
        // }else{
        //    this.$message({
        //       message: '请选择所属应用',
        //       type: 'error'
        //   });
        // }
      },
      showSearch() {
        this.isHide = !this.isHide;
      },
      search() {
        var that = this;
        this.$http({
              url: '/ifbp-app-sm/sm/paratemp/query?like_initcode='+this.userCode+'&like_initname='+this.userName+'&like_showflag='+this.enablestate,
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
        // console.log(node);
        // e.stopPropagation();
        this.categories=this.result[data.value];
        var that=this;
        var curId=data.id;
        this.curId=curId;
        this.areaId = data.areaId;
        var submitId = this.curId || this.areaId;
        if(submitId){
          this.$http({
              url: '/ifbp-app-sm/sm/paratemp/pageList?pn=&ps=&search_app_code='+submitId,
              method: 'get',
              dataType: 'json'
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
    height: 528px;
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
    margin-top: 10px;
    padding-top: 10px;
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
</style>
<style>
#advanced-search .el-col{
  line-height:33px;
}
</style>

