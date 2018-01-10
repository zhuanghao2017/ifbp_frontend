<template>
  <div class="container">
    <el-tabs type="card" class="index" v-model="tabActiveName" @tab-click="tabClick">
      <el-tab-pane style="margin-left: 20px;" label="首页" name="/index">
        <!-- welcome -->
        <el-row>
          <el-col :sm="8" :md="8" :lg="8">
            <card :cardStyle="{ padding: '0',
                                width: '100%',
                                height: '155px',
                                border: 'none',
                                borderRight: '1px dashed rgba(230, 234, 238, 1)'}">
              <div class="card-content" slot="media">
                <img style="width: 56px;height: 56px; float: left;margin: 20px; background-color: #EFF3F6; -webkit-border-radius: 56px;-moz-border-radius: 56px;border-radius: 56px;" src="../../assets/images/u4442.png" alt="">
                <p class="content-margin">Hi，{{username}}，欢迎你回来！</p>
                <p>{{companyName}}</p>
                <h6 class="datetime">{{datetime}}</h6>
              </div>
            </card>
          </el-col>
          <el-col :sm="8" :md="8" :lg="8">
            <card :cardStyle="{ padding: '0',
                                width: '100%',
                                height: '155px',
                                border: 'none' }">
              <div class="card-content" slot="media">
                <img style="width: 60px;height: 60px; float: left;margin: 0 20px; background-color: #EFF3F6; -webkit-border-radius: 60px;-moz-border-radius: 60px;border-radius: 60px;" src="../../assets/images/u9567.png" alt="">
                <p class="content-margin2"><span class="font30">265</span> 人</p>
                <p class="font14">当前个人用户</p>
              </div>
            </card>
          </el-col>
          <el-col :sm="8" :md="8" :lg="8">
            <card :cardStyle="{ padding: '0',
                                width: '100%',
                                height: '155px',
                                border: 'none' }">
              <div class="card-content" slot="media">
                <img style="width: 60px;height: 60px; float: left;margin: 0 20px; background-color: #EFF3F6; -webkit-border-radius: 60px;-moz-border-radius: 60px;border-radius: 60px;" src="../../assets/images/u9579.png" alt="">
                <p class="content-margin2"><span class="font30">1600</span> 人</p>
                <p class="font14">当前企业用户</p>
              </div>
            </card>
          </el-col>
        </el-row>

        <!-- tabs -->
        <el-tabs class="nav-business" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="昨天" name="first"></el-tab-pane>
          <el-tab-pane label="本周" name="second"></el-tab-pane>
          <el-tab-pane label="本月" name="third"></el-tab-pane>
          <ul class="day-business">
            <li><i>71</i>个<br>新增客户</li>
            <li><i>23</i>笔<br>新增投保单</li>
            <li><i>3</i>笔<br>新增保单</li>
            <li><span>0.00</span>元<br>总金额</li>
          </ul>
        </el-tabs>

        <!-- table -->
        <div style="position: relative; margin-top: 20px;">

          <el-tabs class="nav-business">
            <el-tab-pane label="代办任务">
              <el-table
                :data="tableData3"
                border
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                  label="状态"
                  prop="status"
                  width="55">
                </el-table-column>
                <el-table-column
                  label="主题"
                  prop="title"
                  width="120">
                  <!--<template scope="scope">{{ scope.row.date }}</template>-->
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="任务内容"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="地址"
                  show-overflow-tooltip>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="预警消息">预警消息</el-tab-pane>
            <el-tab-pane label="通知消息">通知消息</el-tab-pane>
          </el-tabs>

          <div style="position: absolute; top: -5px; right: 5px">
            <el-button-group>
              <el-button type="default" icon="pt-shuaxin"></el-button>
              <el-button type="default" icon="pt-gengduo"></el-button>
            </el-button-group>
          </div>

        </div>



      </el-tab-pane>

      <el-tab-pane v-for="(tab,index) in routeCards" :name="tab.path" :closable="true" style="margin-left: 20px;" :label="tab.label">
        <div :is="tab.component"></div>
      </el-tab-pane>
    </el-tabs>

    <!--customerRepay-->
    <customer-repay></customer-repay>
  </div>
</template>

<script>
  import Card from '../../components/card.vue'
  import test from '../../page/test/index.vue'
  import customerRepay from '../../components/customerRepay.vue'
  import menu from '../../../static/data/menuData.json'

  export default {
    data() {
      return {
        activeName: 'second',
        username: '李达康',
        companyName: '用友金融信息技术有限公司',
        datetime: new Date().toLocaleDateString(),
        tableData3: [{
          status: 1,
          title: '站内公告',
          content: 'xxx提交了单据XD1607001',
          name: '王晓新',
          date: '2016-05-02',
          type: '工作任务'
        }, {
          status: 1,
          title: '行业资讯',
          content: 'xxx提交了单据XD1607001',
          name: '李牧',
          date: '2016-05-02',
          type: '工作任务'
        }, {
          status: 1,
          title: '贷款合同',
          content: 'xxx提交了单据XD1607001',
          name: '张小娴',
          date: '2016-05-02',
          type: '工作任务'
        }, {
          status: 1,
          title: '内容',
          content: 'xxx提交了单据XD1607001',
          name: '李牧',
          date: '2016-05-02',
          type: '工作任务'
        }, {
          status: 1,
          title: '内容',
          content: 'xxx提交了单据XD1607001',
          name: '李牧',
          date: '2016-05-02',
          type: '工作任务'
        }],
        multipleSelection: [],
        routeCards:[],
        tabActiveName:'',
        map:[],
        list: this.menuList?this.menuList:menu.data
      };
    },
    props:['menuList'],
    components: {
      Card,customerRepay,test
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      tabClick(index){
          console.log(this);
        this.$parent.$router.push(this.tabActiveName);
      },
      getRouteMap(list){
        var tmp = {};
        var getChild = function(array){
          array.forEach((v) => {
            if(v.children){
              getChild(v.children);
            }else{
              tmp[v.value] = v;
            }
          });
        }
        getChild(list);
        return tmp;
      }
    },
    watch: {
      $route:function(to,from){
        if(to.params.id==='index'){
          this.tabActiveName='/index';
          return;
        }
        console.log(to.params)
        for(var tmp = 0;tmp<this.routeCards.length;tmp++){
          if(this.routeCards[tmp].path === this.map[to.params.id].path){
            this.tabActiveName = this.map[to.params.id].path;
            return;
          }
        }
        this.routeCards.push(this.map[to.params.id]);
        this.tabActiveName = this.map[to.params.id].path;
      }
    },
    created(){
      console.log(this.list);
      this.map = this.getRouteMap(this.list);
    }
  };
</script>

<style scoped>
  .content-margin{
    margin-top: 31.5px;
  }
  .content-margin2{
    margin-top: 51.5px;
    color: #71787E;
  }
  .card-content p{
    font-size: 16px;
    line-height: 2em;
    text-align: left;
  }
  .card-content .datetime{
    color: #9FA9BA;
    font-size: 14px;
    line-height: 2em;
    text-align: left;
    font-weight: 100;
  }
  .el-tabs__nav{
    margin-left: 20px!important;
  }
  /*.el-tabs__item{*/
    /*width: 61px;*/
    /*height: 40px;*/
  /*}*/
  .nav-business{
    color: #393C3E;
    font-size: 14px;
  }
  .nav-business .el-tabs__active-bar {
    background-color: #E60012;
    height: 2px;
  }

  .nav-business .el-tabs__item {
    padding: 0 24px;
    line-height: 31px;
    height: 31px;
  }

  .nav-business .is-active {
    color: #393C3E;
  }
  .nav-business .el-tabs__header{
    margin: 0;
  }
  .day-business{
    box-sizing: border-box;
    width: 1080px;
    height: 130px;
    margin-top: -12px;
    border: 1px solid  rgba(230, 234, 238, 1);
    border-top: none;
    list-style: none;
    padding: 24px 30px 30px;
    color: #71787E;
    margin-bottom: 0px;


  }
  .day-business i {
    font-style: normal;
    font-size: 30px;
    color: #393C3E;
  }
  .day-business li{
    text-align: center;
    display: inline-block;
    padding: 27px 50px;
    border-right: 1px solid  rgba(230, 234, 238, 1);
  }
  .day-business li:last-child{
    border-right: none;
  }
  .day-business span {
    font-size: 30px;
    color: #E60012;
  }

  .el-tabs > div{
    margin-left: 20px !important;
  }

  .font14{
    font-size: 14px!important;
    color: #71787E;
  }

  .font30{
    font-size: 30px!important;
    color: #71787E;
  }
</style>
No newline at end of file
