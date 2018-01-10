<style>

  .default .main{
    width: 1050px;
    height: 300px;
    background: #fff;
    position: relative;
  }
  .default .main .centerbox {
    width: 230px;
    height: 175px;
    text-align: center;
    position: absolute;
    left: 50%;
    right: 9px;
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
    padding-bottom: 10px;
    }



</style>
<template>
  <div class="default" style="padding-bottom: 0px;">
    <div class="main">
      <div class="centerbox">
        <img src="../assets/images/operation/u10848.png" alt="" width="150"
             height="125">
        <p>系统正在升级维护中，请稍后试用。</p>
        <el-button>返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
</script>
