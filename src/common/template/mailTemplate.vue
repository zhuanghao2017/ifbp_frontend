<template>
<div class="mail">
  <div class="header">
    <img class="logo" src="../../assets/images/imfbp_logo_color.png">
    <p>
      <span style="color:#71787E;">如果您无法正常阅读邮件内容，请</span>
      <a href="#" target="_blank">点击查看</a>
    </p>
  </div>
  <div class="mailContent">
    <div class="helloMessage">
        <p><span class="text">尊敬的用户，您好：</span></p>
        <br>
        <p><span class="text">您的订单状态为已交付，可以正常使用。</span></p>
        <p><span class="text">访问路径：<a href="http://service.imfbp.com/" target="_blank">http://service.imfbp.com/</a>，登录账号为当前租户账号。</span></p>
    </div>
    <div class="dashed"><img src="../../assets/images/border_dashed.png"></div>
    <div class="formTable">
      <p class="font_default label"><span>订单信息</span></p>
      <!--<mailTable :tableData="tableData" :tableStyle="{ width:'600px' }"></mailTable>-->
      <el-email-table :tableData="tableData" :tableStyle="{ width:'600px' }"></el-email-table>
    </div>
    <div class="dashed"><img src="../../assets/images/border_dashed.png"></div>
    <div class="recommend">
      <p class="font_default label"><span>链融云向您推荐：</span></p>
        <el-tile title="小贷业务" :cardStyle="{cursor: 'pointer' }">
          <div class="" slot="media">
          <a href=""><img src="../../assets/images/u280.png" style="width: 90%;" alt="" /></a>
          </div>
        </el-tile>
        <el-tile title="保理业务" :cardStyle="{cursor: 'pointer' }">
          <div class="" slot="media">
          <a href=""><img src="../../assets/images/u254.png" style="width: 90%;" alt="" /></a>
          </div>
        </el-tile>
        <el-tile title="融资租赁" :cardStyle="{cursor: 'pointer' }">
          <div class="" slot="media">
          <a href=""><img src="../../assets/images/u272.png" style="width: 90%;" alt="" /></a>
          </div>
        </el-tile>
        <el-tile title="P2P网贷" :cardStyle="{cursor: 'pointer' }">
          <div class="" slot="media">
          <a href=""><img src="../../assets/images/u294.png" style="width: 90%;" alt="" /></a>
          </div>
        </el-tile>
        <el-tile title="私募基金" :cardStyle="{cursor: 'pointer' }">
          <div class="" slot="media">
          <a href=""><img src="../../assets/images/u276.png" style="width: 90%;" alt="" /></a>
          </div>
        </el-tile>
        <el-tile title="融资担保" :cardStyle="{cursor: 'pointer' }">
          <div class="" slot="media">
          <a href=""><img src="../../assets/images/u270.png" style="width: 90%;" alt="" /></a>
          </div>
        </el-tile>
        <el-tile title="查看更多" :cardStyle="{cursor: 'pointer' }">
          <div class="" slot="media">
          <a href=""><img src="../../assets/images/u262.png" style="width: 90%;" alt="" /></a>
          </div>
        </el-tile>
    </div>
    <div class="footer" >
      <span>Copyright ©2013-2016imfbp.com. All Rights Reserved. 用友金融版权</span>
    </div>
  </div>

</div>
</template>
<script>

export default {
  name: 'mailTemplate',
  data() {
    return {
      tableData: [
        {key: '单号', value: '1001'},
        {key: '商品名称', value: '篮球'},
        {key: '价格', value: '120.00'},
        {key: '订单日期', value: '2017-03-01'},
        {key: '付款方式', value: '在线支付'},
        {key: '收货地址', value: '北京市海淀区西北旺镇'},
      ],
    };
  }
};
</script>
<style>
/*.font_default{ font-family: 'ArialMT', 'Arial'; color: #333333; font-weight: 400; font-style: normal; line-height: normal;}*/
.mail{ width: 700px; background-color: white; margin:0 auto; box-sizing: border-box; border:1px solid rgba(206, 208, 218, 1); }
.mail .header{ width: 660px; height: 30px; padding: 20px 0; margin: 0 20px; box-shadow:none; border-bottom: solid 2px; border-color: rgba(229, 1, 19, 1); }
.mail .header img.logo{ width:101px; height:30px; float: left; margin-left: 10px; }
.mail .header p{ height: 16px; float: right; margin: 7px 0; }
.text{ font-size: 14px; font-weight: 700; line-height: normal; }
.mail a{ color:#00A5E3; text-decoration: none; }
.mailContent{ width: 600px; margin: 0 50px; position: relative; }
.helloMessage{ padding: 30px 0 23px 0; }
.dashed{ height: 1px; width: inherit; }
.dashed img{ height: 2px; width: inherit; position: absolute; }
.formTable{ padding: 23px 0 40px 0; }
.label{ /*font-size: 14px; color: #393C3E;*/ padding-bottom: 14px; }
.recommend{ padding: 23px 0 120px 0; }
.recommend .card{ margin: 0; padding: 0px; width: 85px; }
.footer { width: 698px; height: 45px; line-height: 45px; position: absolute; left: -50px; text-align: center; font-size: 13px; color: #71787E; background-color: #EFF3F6; }
</style>
