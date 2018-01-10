<template>
 <div class="information">
    <el-tabs type="card">
      <!-- <el-tab-pane label="首页" name="first">首页</el-tab-pane> -->
      <el-tab-pane label="新页签名称" name="second">
          <div class="newTop">
            <p class="keyInput">
              <el-input
                  placeholder="请输入关键字"
                  icon="search"
                  v-model="searchInfor"
                  :on-icon-click="searchIn">
              </el-input>
            </p>
            <table-dialog v-for="item in cloneTableInfors" :tableInfors=item.tableMainData
              @deleteInfor="deleteInfors" @updateInfor="updateInfors"></table-dialog>
          </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="已打开标签页" name="third">已打开标签页</el-tab-pane> -->
      <!-- <el-tab-pane label="已打开标签页" name="fourth">已打开标签页</el-tab-pane> -->
    </el-tabs>   
  </div>
</template>
<script>
import tableDialog from './dialog.vue';
  export default {
    name: "information",
    data() {
      return {
        searchInfor:"",
        cloneTableInfors: [],
        clones:[],
        tableInfors:[
          { tableMainData:{
            titleInfor:"维度主信息",
             columns: [
              {flag:'code', label:"维度编码"},
              {flag:'name', label:"维度名称"},
              {flag:'assort', label:"维度分类"},
              {flag:'state', label:"状态"},
             ],
            tableData: [{
              id:11,
              code: '001',
              name: '张三',
              assort: '手续费比例',
              state:"启用"
             }, {
              id:22,
              code: '002',
              name: '手续费2',
              assort: '手续费比例2',
              state:"启用"
             }, {
              id:33,
              code: '003',
              name: '手续费3',
              assort: '手续费比例3',
              state:"启用"
            }]
          },
        },
        { tableMainData:{
           titleInfor:"维度主信息2",
           columns: [
            {flag:'code', label:"维度编码1"},
            {flag:'name', label:"维度名称1"},
            {flag:'assort', label:"维度分类1"},
            {flag:'state', label:"状态"},
           ],
           tableData: [{
              id:44,
              code: 'charge1',
              name: '手续费1',
              assort: '手续费比例1',
              state:"启用"
           }, {
              id:55,
              code: 'charge2',
              name: '张三',
              assort: '手续费比例2',
              state:"启用"
            }, {
              id:66,
              code: 'charge3',
              name: '手续费3',
              assort: '手续费比例3',
              state:"启用"
            }]
          },
        },
        { tableMainData:{
           titleInfor:"维度主信息3",
           columns: [
            {flag:'code', label:"维度编码1"},
            {flag:'name', label:"维度名称1"},
            {flag:'assort', label:"维度分类1"},
            {flag:'state', label:"状态"},
           ],
           tableData: [{
              id:7,
              code: 'charge11',
              name: '手续费11',
              assort: '手续费比例11',
              state:"启用"
           }, {
              id:8,
              code: 'charge22',
              name: '手续费22',
              assort: '手续费比例22',
              state:"启用"
            }, {
              id:9,
              code: 'charge33',
              name: '手续费33',
              assort: '手续费比例33',
              state:"启用"
            }]
          },
        },
        { tableMainData:{
           titleInfor:"维度主信息4",
           columns: [
            {flag:'code', label:"维度编码1"},
            {flag:'name', label:"维度名称1"},
            {flag:'assort', label:"维度分类1"},
            {flag:'state', label:"状态"},
           ],
           tableData: [{
              id:10,
              code: '1charge1',
              name: '1手续费1',
              assort: '1手续费比例1',
              state:"启用"
           }, {
              id:13,
              code: '1charge2',
              name: '张三',
              assort: '1手续费比例2',
              state:"启用"
            }, {
              id:14,
              code: '1charge3',
              name: '张三',
              assort: '1手续费比例3',
              state:"启用"
            }]
          },
        }],
      };
    },
    methods: {
      searchIn(){
        if(!this.searchInfor){
          return;
        }
        /* eslint-disable */
         var that = this;
         this.tableInfors.map(function(item,index){
            if(item.tableMainData.titleInfor===that.searchInfor){
                console.log("表头查询！");
                var clone=[];
                clone.push(item);
                //that.cloneTableInfors.push(item);
                that.cloneTableInfors=clone;
                console.log('表头表存入数组完毕');
            };
           
        return 1;
        });
      },
      deleteInfors(e){
        var that=this;
        this.cloneTableInfors.map(function(item){
          item.tableMainData.tableData.map(function(item1,index1){
            if(item1.id===e){
               item.tableMainData.tableData.splice(index1,1);
            }
          return 1;
          });
        return 1;
        });
      },
      updateInfors(tInfor,addInfor,flag,cid){
        if(flag===1){
          this.cloneTableInfors.map(function(item){
            if(item.tableMainData.titleInfor===tInfor){
              item.tableMainData.tableData.push(addInfor);
            }
          return 1;
          });
        }else{
           this.cloneTableInfors.map(function(item,index){
            if(item.tableMainData.titleInfor===tInfor){
              item.tableMainData.tableData.map(function(item4){
                if(item4.id===cid){
                    item4.code=addInfor.code;
                    item4.name=addInfor.name;
                    item4.assort=addInfor.assort;
                }
              });
            }
            return 1;
          });
          /* eslint-enable */
        }
      }
    
  },
  created(){
    var clone=[];
    clone.push(_.cloneDeep(this.tableInfors[0]));
    this.cloneTableInfors=_.cloneDeep(clone);
  },
  components:{tableDialog}
};
</script>
<style type="text/css">
  .newTop{
    margin:20px;
    margin-top: 10px;
  }
  .keyInput{
    margin-bottom: 20px;
    width: 300px;
  }
  .mainInfor{
    font-family: 'Arial-BoldMT', 'Arial Bold', 'Arial';
    font-weight: 700;
    font-size: 14px;
    font-style: normal;
    color: #393C3E;
    position: relative;
    top:15px;
    left: 0px;
  }
  .topList{
    margin-bottom:20px;
  }
  .buttons{
    overflow: hidden;
    margin-bottom:5px;
  }
  .newAdd{
    float: right;
    margin-right: 10px;
  }
  .groups{
     float: right;
  }
  .el-table--fit{
    margin-top:20px;
  }
  .influence{
    overflow: hidden;
    font-family: 'Arial-BoldMT', 'Arial Bold', 'Arial';
    font-weight: 700;
    font-size: 14px;
    font-style: normal;
    color: #393C3E;
  }
</style>
