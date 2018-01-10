<template>
  <div class="list-panel">
    <div class="title-header">
      <h2 class="name">新增</h2>
    </div>
    <!--search-->
    <div id="search-container">
      <div class="fl">
        <el-button type="primary" @click="addUser">保存</el-button>
      </div>
      <div class="fr">
        <el-button type="primary" @click="backInfo">返回</el-button>
      </div>
    </div>

    <!-- 添加员工信息ui模板 -->
    <div id="staff-detail">
      <!-- 添加用户信息ui模板 -->
      <div id="user-detail">
        <el-template :pkTemp="pk_temp_user"
                     ref="detail_user"
                     @setEmptyKeys="setEmptyUser"
                     @change="changeHandler"
                     :isEdit="isEditUser"
                     :templateValue="currentValueUser">

        </el-template>
      </div>
    </div>



  </div>
</template>
<script>
//  import template from './ui-template/src/template.vue';
  export default {
    data(){
      return {
        pk_temp_user:'59dd1f14-474d-413a-8adf-0958133e6ef3',
        isEdit: true,
        originalValueUser: '',
        currentValueUser: '',
        isEditUser: true,
        user_code_tpl: {}
      };
    },
//    components: {uitemplate:template},
    methods: {
      /**
       *  添加用户
       *
       **/
      addUser() {
        this.$refs.detail_user.validate((valid) => {
          if(valid) {
            var url = '/ifbp-app-sm/sm/user/create';
            this.$http({
              url: url,
              method: 'POST',
              data: this.currentValueUser,
              dataType: 'json'
            }).then((res) => {
              if (res.data.success) {
                this.$message({
                  message: '恭喜你，添加成功！',
                  type: 'success'
                });
                location.hash = '/userInfo';
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
          }else {
            // 验证失败
          }
        });
      },
      setEmptyUser(value){
        this.originalValueUser = value;
        this.originalValueUser.base_doc_type = '0';
        this.originalValueUser.enablestate = '2';
        this.currentValueUser = JSON.parse(JSON.stringify(this.originalValueUser));
        this.user_code_tpl = this.getTemplateByCode('user_code');
        this.user_code_tpl.readOnly = false;
      },
      changeHandler(index){
        if (index.key === 'pk_base_doc') {
          this.currentValueUser.email = index.value[0].email;
          this.currentValueUser.mobile = index.value[0].mobile;
        }
      },
      /**
       *  一些控制页面状态的方法
       *  都在按钮上绑着
       **/
      // 返回list页面
      backInfo() {
//        location.hash = '/userInfo';
        this.$router.go(-1);
      },

      // get template data of special itemCode, to edit more than data of component
      getTemplateByCode(code) {
        var formlayout = this.$refs.detail_user.formLayout;// refname here
        var tpl;
        var components = [];
        formlayout.forEach((form) => {
          components = components.concat(form.layoutDetail);
        });
        for (var i=0;i<components.length;i++) {
          if (components[i].itemCode.split('.').pop() === code) {
            tpl = components[i];
            break;
          }
        }
        return tpl;
      },
    },
    watch: {
      currentValueUser: {
        deep: true,
        handler(value) {
          if (value.pk_base_doc === '') {
            this.currentValueUser.email = '';
            this.currentValueUser.mobile = '';
          }
        }
      }
    },
    created() {

    }
  };

</script>
<style>
  #search-container{
    height: 56px;
    padding: 10px 20px;
    background-color: #ffffff;
    border-bottom: 1px solid #e3e3e3;
  }
  #advanced-search{
    display: block;
    height: 56px;
    padding: 10px 20px;
    background-color: #ffffff;
    border-bottom: 1px solid #e3e3e3;
    position: relative;
  }
  #advanced-search.hide{
    display: none;
    transition: all .5s ease;
  }
  /*#user-detail .yon-uitemplate{*/
    /*margin-top: -20px;*/
  /*}*/
  /*#user-detail div.yon-title{*/
    /*display: none;*/
  /*}*/

</style>
