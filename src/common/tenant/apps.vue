<template>
  <div>
    <div class="title-header"><h2 class="name">我的应用</h2></div>
    <div class="apps-header">
      <el-button class="fr" type="primary" @click="back">返回</el-button>
    </div>
    <div class="app-detail">
      <div>
        <!--<div class="detail_header">-->
          <!--<span>交易类型</span>-->
          <!--<el-select v-model="value" clearable placeholder="请选择" class="selection">-->
            <!--<el-option-->
              <!--v-for="item in options"-->
              <!--:key="item.value"-->
              <!--:label="item.label"-->
              <!--:value="item.value">-->
            <!--</el-option>-->
          <!--</el-select>-->
          <!--<el-button type="primary">查询</el-button>-->
        <!--</div>-->
        <el-row style="margin-bottom: 20px;">
          <el-col :span="2" style="min-width: 50px;text-align: center">
            <span class="search-label">应用名称</span>
          </el-col>
          <el-col :span="3">
            <el-input type="text" v-model="appName" placeholder="请输入应用名称"></el-input>
          </el-col>
          <el-button type="primary" style="margin-left: 20px;" @click="search">查询</el-button>
        </el-row>

        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="merName"
            label="应用名称">
          </el-table-column>
          <el-table-column
            prop="expiredDate"
            label="到期时间">
          </el-table-column>
          <el-table-column
            label="我的评分">
            <template scope="scope">
              <el-rate
                v-if="scope.row.score"
                v-model="scope.row.score"
                disabled
                text-color="#ff9900"
                text-template="{value}">
              </el-rate>
              <el-button v-else type="primary" @click="handlejudge(scope.row.merId,scope.row.merName)">评价</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          small
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          style="float: right;margin-top: 10px;"
          :total="totalNum">
        </el-pagination>
      </div>
    </div>
    <!--评分弹出框-->
    <el-dialog
      title="对该应用进行评分"
      :visible.sync="dialogVisible"
      :show-close="false"
      size="small">
      <div class="dialog-box">
        <el-row style="margin-bottom: 20px;">
          <el-col :span="4" style="min-width: 50px">
          <span>
            应用名称：
          </span>
          </el-col>
          <el-col :span="20">
          <span>
           {{merName}}
          </span>
          </el-col>
        </el-row>
        <el-row style="margin-bottom: 20px;">
          <el-col :span="4">
            <span>
              评分：
            </span>
          </el-col>
          <el-col :span="20">
            <el-rate
              v-model="score"
              :allow-half="true"
              text-color="#ff9900"
              text-template="{value}">
            </el-rate>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <span>
              评价：
            </span>
          </el-col>
          <el-col :span="20">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="remark">
            </el-input>
          </el-col>
        </el-row>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="judge">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        appName: '',
        tableData: [],
        dialogVisible: false,
        merName: '',
        score: 5,
        remark: '',
        id: '',
        totalNum: 0,
        pageSize: 0,
      };
    },
    created() {
      this.request();
    },
    methods: {
      getCookie(cName) {
        let cStart;
        let cEnd;
        if (document.cookie.length > 0) {
          cStart = document.cookie.indexOf(cName + "=");
          if (cStart !== -1) {
            cStart = cStart + cName.length+1;
            cEnd = document.cookie.indexOf(";",cStart);
            if (cEnd === -1) {
              cEnd = document.cookie.length;
            }
            return decodeURIComponent(document.cookie.substring(cStart,cEnd));
          }
        }
        return "";
      },
      request(val) {
        const data = {
          page: 1,
          pageSize: 10,
          tenantId: this.getCookie('tenantid'),
//          tenantId: 'ddwidm4i',
          merName: this.appName                  //搜索条件
        };
        if (val) {
          data.page = val;
        }
        this.$http({
          url: '/ifbp-bop-web/user/postTenantOfMerchandise',
          data: data,
          method: 'post'
        }).then((res) => {
            console.log(res);
          if (res.data.success) {
            this.totalNum = res.data.data.totalCount;
            this.pageSize = res.data.data.pageSize;
            var vm = res.data.data.items;
            vm.forEach((v, i) => {
              vm[i].score = parseFloat(vm[i].score);
            });
            this.tableData = vm;
          } else {
            this.tableData = res.data.items;
          }
        }).catch(() => {
          this.$message({
            message: '接口调用失败',
            type: 'error'
          });
        });
      },
      handlejudge(id, name) {
        this.dialogVisible = true;
        this.merName = name;
        this.id = id;
        this.remark = '';
      },
      handleCurrentChange(val) {
        this.request(val);
      },
      judge() {
        const data = {
          tenantId: this.getCookie('tenantid'),
//          tenantId: 'ddwidm4i',
          score: this.score,
          remark: this.remark,
          merId: this.id
        };
        this.$http({
          url: '/ifbp-bop-web/user/postComment',
          data: data,
          method: 'post'
        }).then((res) => {
          if (res.data.success) {
            this.dialogVisible = false;
            this.$message({
              message: '评价成功！',
              type: 'success'
            });
            this.request();
          } else {
            this.dialogVisible = false;
            this.$message({
              message: '评价失败！',
              type: 'error'
            });
          }
        }).catch(() => {
          this.$message({
            message: '接口调用失败',
            type: 'error'
          });
        });
      },
      search() {
        this.request();
      },
      back() {
        this.$router.go(-1);
      }
    }
  };
</script>

<style scoped>
  .title-header {
    height: 26px;
    margin: 10px 15px 0;
    position: relative;
  }
  .apps-header{
    background: #FFF;
    margin: 10px;
    padding: 10px 20px;
    font-size: 18px;
    box-sizing: border-box;
  }
  .apps-header h3{
    display: inline-block;
  }
  .money{
    display: inline-block;
    font-size: 36px;
    width: 150px;
    text-align: center;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    vertical-align: bottom;
  }
  .apps-header img{
    font-size: 22px;
    margin-left: 25px;
    vertical-align: middle;
    cursor: pointer;
  }
  .app-detail{
    background: #ffffff;
    margin: 0 10px;
    padding: 20px 50px 50px;
    font-size: 14px;
  }
  .app-detail img{
    vertical-align: middle;
    margin-right: 10px;
  }
  .app-detail p{
    display: inline-block;
    margin: 25px 0 15px;
  }
  .detail_header{
    margin: 20px 0;
  }
  .selection{
    margin: 0 20px;
  }
  .app-detail .el-table,
  .app-detail .el-table th>.cell {
    text-align: center;
  }
  .app-detail .el-table{
    border-radius: 8px;
  }
  .dialog-box{
    max-width: 500px;
    margin:30px auto;
  }
</style>
