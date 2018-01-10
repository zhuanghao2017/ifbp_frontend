<template>
  <div>
    <div class="title-header"><h2 class="name">我的订单</h2></div>
    <div class="apps-header">
      <el-button class="fr" type="primary" @click="back">返回</el-button>
    </div>
    <div class="orderlist-detail">
      <div>
        <div class="detail_header">
          <el-row>
            <input type="text" id="s" style="visibility: hidden">
            <el-col :span="1">
              <span class="search-label">订单状态</span>
            </el-col>
            <el-col :span="3">
              <el-select v-model="listValue" clearable placeholder="请选择" class="selection">
                <el-option
                  v-for="item in listStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="1">
              <span class="search-label">开通状态</span>
            </el-col>
            <el-col :span="3">
              <el-select v-model="openValue" clearable placeholder="请选择" class="selection">
                <el-option
                  v-for="item in openStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>
        <div class="search-box">
          <el-row>
            <el-col :span="1"><span class="search-label">订 单 号</span></el-col>
            <el-col :span="3">
              <el-input type="text" v-model="orderNo" placeholder="请输入订单号"></el-input>
            </el-col>
            <el-col :span="1"><span class="search-label">应用名称</span></el-col>
            <el-col :span="3">
              <el-input type="text" v-model="merName" placeholder="请输入应用名称"></el-input>
            </el-col>
            <el-col :span="1"><span class="search-label">采 购 方</span></el-col>
            <el-col :span="3">
              <el-input type="text" v-model="provider" placeholder="请输入采购方"></el-input>
            </el-col>
            <el-col :span="1"><span class="search-label">下单时间</span></el-col>
            <el-col :span="3">
              <el-date-picker
                v-model="creationtime"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-col>
            <div>
              <el-button type="primary" @click="request()">查询</el-button>
            </div>
          </el-row>
        </div>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="orderFormNo"
            label="订单号">
          </el-table-column>
          <el-table-column
            prop="merName"
            label="商品名称">
          </el-table-column>
          <el-table-column
            prop="salesFormat"
            label="销售规格">
          </el-table-column>
          <el-table-column
            prop="price"
            label="价格">
          </el-table-column>
          <el-table-column
            prop="provider"
            label="提供商">
          </el-table-column>
          <el-table-column
            prop="creationtime"
            label="下单时间">
          </el-table-column>
          <el-table-column
            prop="listStatus"
            label="订单状态">
          </el-table-column>
          <el-table-column
            prop="openStatus"
            label="开通状态">
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
        <!--<el-pagination-->
          <!--small-->
          <!--layout="prev, pager, next"-->
          <!--style="float: right;margin-top: 10px;"-->
          <!--:total="totalNum"-->
          <!--:page-size="pageSize">-->
        <!--</el-pagination>-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        listStatus: [
            {
              value: '',
              label: '全部'
            }, {
              value: '0',
              label: '未付款'
            }, {
              value: '1',
              label: '已付款'
            }, {
              value: '2',
              label: '已退款'
            }, {
              value: '3',
              label: '已失效'
            }
        ],
        openStatus: [
            {
              value: '',
              label: '全部'
            }, {
              value: '0',
              label: '未开通'
            }, {
              value: '1',
              label: '已开通'
            }
        ],
        tableData: [],
        value: '',
        listValue: '',
        openValue: '',
        totalNum: 0,
        pageSize: 0,
        orderNo: '',
        merName: '',
        provider: '',
        creationtime: '',
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
      back() {
        this.$router.go(-1);
      },
      request (val){
        var data = {
          tenantId: this.getCookie('tenantid'),
          page: "1",
          pageSize: "10",
          orderNo: this.orderNo,
          merName: this.merName,
          creationtime: this.creationtime,
          provider: this.provider,
          listStatus: this.listValue,
          openStatus: this.openValue,
        };
        if (val) {
          data.page = val;
        }
        this.$http({
          url: '/ifbp-bop-web/trade/getTenantOrdersForWorkbanch',
          method: 'post',
          data: data
        }).then((res) => {
          if (res.data.success) {
            this.totalNum = res.data.data.totalCount;
            this.pageSize = res.data.data.pageSize;
            var tem = res.data.data.items;
            tem.forEach((v, i) => {
              var vm = v;
              switch (vm.listStatus) {
                case '0':
                  vm.listStatus = '未付款';
                  break;
                case '1':
                  vm.listStatus = '已付款';
                  break;
                case '2':
                  vm.listStatus = '已退款';
                  break;
                case '3':
                  vm.listStatus = '已失效';
                  break;
                default:
                  break;
              }
              switch (vm.openStatus) {
                case '0':
                  vm.openStatus = '未开通';
                  break;
                case '1':
                  vm.openStatus = '已开通';
                  break;
                default:
                  break;
              }
              switch (vm.timeLimit) {
                case '0-0-7':
                  tem[i].salesFormat = vm.sptName + '/1周/' + vm.payPrice + '元';
                  break;
                case '0-0-14':
                  tem[i].salesFormat = vm.sptName + '/2周/' + vm.payPrice + '元';
                  break;
                case '0-1-0':
                  tem[i].salesFormat = vm.sptName + '/1个月/' + vm.payPrice + '元';
                  break;
                case '0-3-0':
                  tem[i].salesFormat = vm.sptName + '/3个月/' + vm.payPrice + '元';
                  break;
                case '0-6-0':
                  tem[i].salesFormat = vm.sptName + '/半年/' + vm.payPrice + '元';
                  break;
                case '1-0-0':
                  tem[i].salesFormat = vm.sptName + '/1年/' + vm.payPrice + '元';
                  break;
                case '2-0-0':
                  tem[i].salesFormat = vm.sptName + '/2年/' + vm.payPrice + '元';
                  break;
                case '3-0-0':
                  tem[i].salesFormat = vm.sptName + '/3年/' + vm.payPrice + '元';
                  break;
                case '4-0-0':
                  tem[i].salesFormat = vm.sptName + '/4年/' + vm.payPrice + '元';
                  break;
                default:
                  break;
              }
            });
            this.tableData = tem;
          } else {
            this.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            });
          }
        }).catch(() => {
          this.$message({
            message: '列表获取失败',
            type: 'error'
          });
        });
      },
      handleCurrentChange(val) {
        this.request(val);
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
    padding: 10px 20px;
    font-size: 18px;
    box-sizing: border-box;
    overflow: hidden;
    margin: 10px 10px 0;
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
    margin-left: 25px;
    vertical-align: bottom;
  }
  .account-money img{
    font-size: 22px;
    margin-left: 25px;
    vertical-align: middle;
  }
  .orderlist-detail{
    background: #ffffff;
    margin: 10px;
    padding: 20px 30px 30px;
    font-size: 14px;
  }
  .search-label{
    font-size: 14px;
    margin: 0;
  }
  .orderlist-detail img{
    vertical-align: middle;
    margin-right: 10px;
  }
  .orderlist-detail p{
    display: inline-block;
    margin: 25px 0 15px;
  }
  .orderlist-detail .el-col-1{
    width: 8.16667%;
    text-align: center;
  }
  .detail_header, .search-box{
    margin: 20px 0;
  }
  .selection{
    margin: 0 10.5px;
  }
  .search-box .el-col-3 {
    padding: 0 10.5px;
  }
  .search-box .el-date-editor.el-input {
    width: 100%;
  }
  .el-table,
  .el-table th>.cell {
    text-align: center;
  }
  .el-table{
    border-radius: 8px;
  }
  /*.el-input{*/
    /*width: 200px;*/
  /*}*/
</style>
