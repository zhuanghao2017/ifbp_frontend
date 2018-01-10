<template>
  <div class="list-panel">
    <div>
      <div class="title-header">
        <h2 class="name">报价审批</h2>
      </div>
      <!--search-->
      <div id="search-container">
      <!--     <el-steps :space="200" :active="2" finish-status="success">
            <el-step title="提交" description="张杰 2017年10月12日 12:20:10"></el-step>
            <el-step title="批准 同意" description="李明 2017年10月12日 12:20:10"></el-step>
            <el-step title="批准" description="总裁办 2017年10月12日 12:20:10"></el-step>
          </el-steps> -->
        <!--   <el-steps :space="100" direction="vertical" :active="1">
            <el-step title="步骤 1" description="这是一段很长很长很长的描述性文字"></el-step>
            <el-step title="步骤 2"></el-step>
            <el-step title="步骤 3"></el-step>
          </el-steps> -->
          <div class="step">
            <strong>name</strong>
            <div class="submissionTime">2017年10月12日 12:20:10</div>
            <p><span>审批</span><em>同意</em></p>
            <div class="status"><span></span><em></em></div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
      };
    },
    created(){
       var that=this;
       this.$http({
          url: '/wbalone/appMGT/appCenter/allList?showway=apparea&areaId=&groupId=',
          method: 'get',
          dataType: 'json'
        }).then((res) => {
          console.log(res.data.data[0].children);
          that.data=res.data.data[0].children;
          that.findList(res.data.data[0].children);
          console.log(that.result);
        }).catch(() => {
          that.$message({
            message: '列表获取失败',
            type: 'error'
          });
        });
    },
    methods: {
    },
    components: {
      
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
  .step .status span{
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: blue;
  }
  .step .status em{
    display: inline-block;
    height: 5px;
    width: 50px;
    background: red;
  }
</style>
