<style>

  .nofound .main{
    width: 1050px;
    height: 300px;
    background-color: #fff;
    position: relative;
  }

  .nofound .main .centerbox {
    width: 275px;
    height: 250px;
    position: absolute;
    left: 50%;
    right: 9;
    bottom: 0;
    top: 50%;
    margin-left: -50px;
    margin-top: -50px;
    z-index: 100;
  }
  .nofound .main .centerbox p{
    font-size: 22px;
    color: #393C3E;
    text-align: left;
    margin-bottom: 15px;
  }
  .nofound .main .centerbox li {
    list-style: none;
    float: left;
    font-size: 16px;
    color: #00A0E8;
  }
  .nofound .main .centerbox li:nth-child(2):before {
    margin-right: 5px;
    margin-left: 10px;
    content: '';
    font-family: 'icomoon', 'icomoon';

  }
  .nofound .main .centerbox li:nth-child(3):before {
    margin-right: 5px;
    margin-left: 30px;
    content: '';
    font-family: 'icomoon', 'icomoon';

  }
</style>
<template>
  <div class="nofound" style="padding-bottom: 0px;">
    <div class="main">
      <div class="centerbox">
        <img src="../assets/images/404/u10252.png" alt="" width="274"
             height="200">
        <p>亲~ 您访问的页面未找到！</p>
        <ul>
          <li>请联系:</li>
          <li>曲宁</li>
          <li>010-62432033</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
</script>
