<template>
  <div class="list-panel">
    <div class="title-header">
      <h2 class="name">行业管理</h2>
    </div>
    <div id="btn">
      <div id="btn-option" class="button-container" v-if="isTplEdit === 'false'">
        <el-button type="primary" @click="addIndustryBtn" :disabled="btnEnable">新增</el-button>
        <el-button type="primary" @click="editIndustryBtn" :disabled="btnEnable">修改</el-button>
        <el-button type="warning" @click="delIndustryBtn" :disabled="btnEnable">删除</el-button>
      </div>
      <div id="btn-busi" class="button-container" v-if="isTplEdit === 'true'">
        <el-button type="primary" @click="confirmIndustryBtn">保存</el-button>
        <el-button type="primary" @click="cancelIndustryBtn">取消</el-button>
      </div>
    </div>
    <div class="content">
      <div id="industry-tree" class="content-left">
        <el-tree :data="data" :props="defaultProps" :highlight-current="true" @node-click="handleNodeClick" node-key="id" current-node-key="id"></el-tree>
      </div>
      <div id="industry-tpl" class="content-right">
        <el-template :pkTemp="pk_temp"
                     :tplCode="tplCode"
                     @change="changeHandle"
                     ref="tpl"
                     :isEdit="isTplEdit === 'true'"
                     :templateValue="currentValue">

        </el-template>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data() {
        return {
          data :[],
          defaultProps: {
            children: 'children',
            label: 'label'
          },
          selectedNode:'',
          isTplEdit:'false',
          pk_temp:'578e919e-dd90-4473-a011-4fd9a134b89c',
          currentValue:''
        };
    },
    created(){
      this.queryTree();
    },
    computed:{
        btnEnable:function() {
            return this.selectedNode == null || this.selectedNode === '';
        }
    },
    methods:{
      queryTree(){
        this.$http({
          url: '/ifbp-app-bd/common/industry/tree',
          method: 'get'
        }).then((res) => {
          if (res.data.success === true) {
            //alert(res.data.data);
            this.data = res.data.data;
          }
        });
      },
      addIndustryBtn(){
          this.isTplEdit = 'true';
      },
      editIndustryBtn(){
        this.isTplEdit = 'true';
      },
      delIndustryBtn(){},
      handleNodeClick(data){
          this.selectedNode = data.id;
          console.log(this.selectedNode);
          this.$http({
            url: '/ifbp-app-bd/common/industry/'+this.selectedNode,
            method: 'get'
          }).then((res) => {
              if (res.data.success === true) {
                this.currentValue = res.data.data;
              }
          });
      },
      confirmIndustryBtn(){},
      cancelIndustryBtn(){
          this.isTplEdit = 'false';
      },
      changeHandle(){}
    }
  };
</script>

<style>
  #industry-tree{
    margin-top: 20px;
  }
  .content{
    width:100%;
    height:100%;
  }
  .content-left{
    position:fixed;
    width:25%;
    margin-left:20px;
  }
  .content-right{
    position:fixed;
    width:60%;
    margin-left:26%;
  }
</style>
