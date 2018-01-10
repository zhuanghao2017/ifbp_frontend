<template>
  <div>
    <div class="title-header"><h2 class="name">我的账户</h2></div>
    <div class="account-money">
      <h3>账户编码：</h3>
      <span style="margin-right: 30px;">{{accountCode}}</span>
      <h3>账户金额：</h3>
      <span class="money" v-if="money.status === 'off'">{{money.number}}</span>
      <span class="money" v-if="money.status === 'on'">{{star}}</span>
      元
      <img v-if="money.status === 'on'" @click="money.status='off'" src="../../../static/img/eyes-open.png" alt="">
      <img v-else-if="money.status === 'off'" @click="money.status='on'" src="../../../static/img/eyes-close.png" alt="">
      <el-button class="fr" type="primary" @click="back" style="margin-top: 16px;">返回</el-button>
    </div>
    <div class="account-detail">
      <p>
        <img src="../../../static/img/record.png" alt="">
        交易记录
      </p>
      <input type="text" id="s" style="visibility: hidden">
      <div>
        <div class="detail_header">
          <span>交易类型</span>
          <el-select v-model="value" clearable placeholder="请选择" class="selection">
            <el-option
              v-for="item in options"
              :key="item.apiId"
              :label="item.flowType"
              :value="item.apiId">
            </el-option>
          </el-select>
          <el-button type="primary" @click="search">查询</el-button>
        </div>
        <el-table
          :data="tableData"
          border>
          <el-table-column
            prop="app_name"
            label="应用类型">
          </el-table-column>
          <el-table-column
            prop="flowType"
            label="交易类型">
          </el-table-column>
          <el-table-column
            label="交易金额">
            <template scope="scope">
              <span v-if="scope.row.flowMoney">
                {{scope.row.flowMoney}} 元
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="creationtime"
            label="交易时间">
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
  </div>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          apiId: '',
          flowType: '全部'
        }],
        tableData: [],
        value: '',
        money: {
          status: 'on',
          number: NaN
        },
        star: '*****',
        accountCode: NaN,
        accountMoney: NaN,
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
          var url = '/ifbp-bop-web/user/getBopUserAccount?page=1&pageSize=10&tenantId=' + this.getCookie('tenantid');
        if (val) {
          url = '/ifbp-bop-web/user/getBopUserAccount?page='+val+'&pageSize=10&tenantId=' + this.getCookie('tenantid');
        }
        this.$http({
          url: url,
          method: 'get'
        }).then((res) => {
          if (res.data.success) {
            this.accountCode = res.data.data.account.accountCode;
            this.money.number = res.data.data.account.accountMoney;
            this.totalNum = res.data.data.totalCount;
            this.pageSize = res.data.data.pageSize;
            this.tableData = res.data.data.items;
          } else {
            this.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            });
          }
        }).catch(() => {
          this.$message({
            message: '接口调用失败',
            type: 'error'
          });
        });
        this.$http({
          url: '/ifbp-bop-web/user/getFlowType?page=1&pageSize=100&tenantId=' + this.getCookie('tenantid'),
//          url: '/ifbp-bop-web/user/getFlowType?page=1&pageSize=100&tenantId=ddwidm4i',
          method: 'get'
        }).then((res) => {
          if (res.data.success) {
            this.options = this.options.concat(res.data.data.items);
          } else {
            this.$message({
              message: res.data.error.errorMessage,
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
        this.$http({
          url: '/ifbp-bop-web/user/getFlowByType?page=1&pageSize=10&tenantId=' + this.getCookie('tenantid') + '&apiId='+this.value,
//          url: '/ifbp-bop-web/user/getFlowByType?tenantId=ddwidm4i&apiId='+this.value,
          method: 'get'
        }).then((res) => {
          if (res.data.success) {
            this.totalNum = res.data.data.totalCount;
            this.pageSize = res.data.data.pageSize;
            this.tableData = res.data.data.items;
          } else {
            this.$message({
              message: res.data.error.errorMessage,
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
      handleCurrentChange(val) {
        this.request(val);
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
  .account-money{
    background: #FFF;
    margin: 10px;
    padding: 20px 50px;
    height: 100px;
    line-height: 60px;
    font-size: 18px;
    box-sizing: border-box;
  }
  .account-money h3{
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
  .account-money img{
    font-size: 22px;
    margin-left: 25px;
    vertical-align: middle;
    cursor: pointer;
  }
  .account-detail{
    background: #ffffff;
    margin: 0 10px;
    padding: 20px 50px 50px;
    font-size: 14px;
  }
  .account-detail img{
    vertical-align: middle;
    margin-right: 10px;
  }
  .account-detail p{
    display: inline-block;
    margin: 25px 0 15px;
  }
  .detail_header{
    margin: 20px 0;
  }
  .selection{
    margin: 0 20px;
  }
  .account-detail .el-table,
  .account-detail .el-table th>.cell {
    text-align: center;
  }
  .account-detail .el-table{
    border-radius: 8px;
  }
</style>
