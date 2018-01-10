<template>
<div>
<div class="group">
  <div class="title-header"><h2 class="name">创建公司管理员</h2></div>
  <div class="apps-header">
    <el-button type="primary" class="backbutton" @click="backButton">返回</el-button>
  </div>
  <div class="form-box">
    <el-form :label-position="labelPosition" label-width="80px" :model="form">
      <el-form-item label="公司编码">
        <span>*</span>
        <el-input v-model="form.gcode" placeholder="YF10011"></el-input>
      </el-form-item>
      <el-form-item label="公司名称">
        <span>*</span>
        <el-input v-model="form.gname" placeholder="用友金融"></el-input>
      </el-form-item>
      <el-form-item label="登录账号">
        <span>*</span>
        <el-input v-model="form.phone" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="登录密码">
        <span>*</span>
        <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="validate">立即创建</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>

</div>
</div>
</template>
<script>
  export default {
    data() {
      return {
        labelPosition: 'right',
        form: {
          gcode: '',
          gname: '',
          phone: '',
          password: '123456'
        }
      };
    },
    methods: {
      backButton() {
        this.$router.go(-1);
      },
      validate(){
        const reg = /^1\d{10}$/;
        if (this.form.gcode === '' || this.form.gname === '' || this.form.phone === '' || this.form.password === '') {
          this.$message({
            message: '必填项不能为空',
            type: 'error'
          });
        } else if (!reg.test(this.form.phone)){
          this.$message({
            message: '请填写正确手机号码',
            type: 'error'
          });
        } else {
          this.submitForm();
        }
      },
      submitForm() {
        this.$http({
          url: '/ifbp-app-sm/sm/user/initGroup?groupCode=' + this.form.gcode
          + '&groupName=' + this.form.gname
          + '&userCode=' + this.form.phone
          + '&password=' + this.form.password,
          method: 'get'
        }).then((res) => {
          if (res.data.success === true) {
            if (window.env === 'dev') {
              this.$message({
                message: '添加成功',
                type: 'success'
              });
            }
          } else {
            this.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            });
          }
        }).catch(() => {
          this.$message({
            message: '接口调用失败！',
            type: 'error'
          });
        });
      },
      resetForm() {
        this.form = {
          gcode: '',
          gname: '',
          phone: '',
          password: ''
        };
      }
    }
  };
</script>
<style scoped>
  .el-form{
      width: 500px;
      margin: 50px;
  }
  .group span{
    color: red;
    position: absolute;
    left: -9px;
  }
  .group {
    padding: 10px;
  }
  .backbutton{
    float:right;
    width: 80px;
  }
  .form-box{
    background: #ffffff;
    width: 100%;
    padding:10px;
    margin-top:10px;
  }
  .apps-header{
    background: #FFF;
    padding: 10px 20px;
    font-size: 18px;
    box-sizing: border-box;
    overflow: hidden;
  }
</style>
