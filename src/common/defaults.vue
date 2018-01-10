<style>

  .default .main{
    width: 1050px;
    height: 300px;
    background: #fff;
    position: relative;
  }
  .default .main .centerbox {
    width: 190px;
    height: 175px;
    text-align: center;
    position: absolute;
    left: 50%;
    right: 9;
    bottom: 0;
    top: 50%;
    margin-left: -50px;
    margin-top: -50px;
    z-index: 100;
  }
  .default .main .centerbox p{
    font-size: 14px;
    color: #71787E;
    text-align: center;
    margin-bottom: 20px;
  }

  .default .main .centerbox p:nth-child(2) {
    margin-top: 10px;
    margin-bottom: 0px;
  }


</style>
<template>
  <div class="default" style="padding-bottom: 0px;">
    <div class="main">
      <div class="centerbox">
        <img src="../assets/images/default/u10201.png" alt="" width="150"
             height="125">
        <p>你还没有设置资讯分类哦~</p>
        <p>快去点击新增按钮进行设置吧~</p>
        <el-button type="primary">+新增</el-button>
      </div>
    </div>
  </div>
</template>
<script>
</script>
