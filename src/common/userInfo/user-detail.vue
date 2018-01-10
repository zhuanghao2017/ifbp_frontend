<template>
  <div class="list-panel">
    <div class="title-header">
      <h2 class="name">用户信息设置</h2>
    </div>
    <!-- 用户信息详情 -->
    <div id="search-container">
      <el-button type="primary" v-if="!staffEdit" @click="staffEdit = true;">修改</el-button>
      <el-button type="primary" v-if="staffEdit" @click="confirmStaff">保存</el-button>
      <el-button type="default" v-if="staffEdit" @click="cancalStaff">取消</el-button>
      <div class="fr">
        <el-button type="primary" @click="backInfo">返回</el-button>
      </div>
    </div>

    <div class="staff-detail">
      <div class="btn-location fl">
      </div>
      <div id="user-detail">
        <el-template :pkTemp="pk_user"
                     ref="detail_user"
                     @change="changeHandler"
                     :isEdit="staffEdit"
                     :templateValue="currentValueUser">

        </el-template>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        delDialogVisible: false,
        isHide: true,
        isNew: true,
        formData: {},
        currentPage: 1,
        pk_user: '59dd1f14-474d-413a-8adf-0958133e6ef3',
        originalValueUser: '',
        currentValueUser: '',
        staffEdit: false,
        userEdit: false,
      };
    },
    created(){
      this.request();
    },
    methods: {
      /**
       *   用户详情
       **/
      request() {
        //用户
        this.$http({
          url: '/ifbp-app-sm/sm/user/' + this.$root.$router.currentRoute.params.id,
          method: 'get'
        }).then((res) => {
          if (res.data.success) {
            this.originalValueUser = res.data.data;
            this.currentValueUser = JSON.parse(JSON.stringify(this.originalValueUser));
          } else {
            this.$message({
              message: res.data.data,
              type: 'error'
            });
          }
        });
      },
      /**
       *  一些控制页面状态的方法
       *  都在按钮上绑着
       **/
      // 返回list页面
      backInfo() {
        this.$router.go(-1);
      },
      // 详情变为可编辑态
      setUser() {
        this.userEdit = true;
//        this.currentValueUser.user_code
      },
      changeHandler(index){
        if (index.key === 'pk_base_doc') {
          this.currentValueUser.email = index.value[0].email;
          this.currentValueUser.mobile = index.value[0].mobile;
        }
      },
      /**
       *  修改用户信息
       *
       **/
      // 确认修改
      confirmStaff(){
       
        console.log(this.currentValue);
        this.$refs.detail_user.validate((valid) => {
          if(valid) {
            this.$http({
              url: '/ifbp-app-sm/sm/user/update',
              method: 'put',
              data: this.currentValueUser,
            }).then((res) => {
              if (res.data.success) {
                this.$message({
                  message: res.data.data,
                  type: 'success'
                });
                 this.staffEdit = false;
              } else {
                this.$message({
                  message: res.data.error.errorMessage,
                  type: 'error'
                });
              }
            });
          }else {
            // 验证失败
          }
        });
      },
      cancalStaff() {
        this.staffEdit = false;
        this.currentValueUser = JSON.parse(JSON.stringify(this.originalValueUser));
        this.templateValue = this.originalValueUser;
      },
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
  .staff-detail{
    margin-top: 20px;
    padding-right: 20px;
    padding-left: 20px;
    padding-bottom: 20px;
    background: #ffffff;
    position: relative;
  }
  /*.btn-location{*/
    /*position: absolute;*/
    /*left: 105px;*/
    /*top: 35px;*/
  /*}*/
  /*.btn-location2{*/
    /*position: absolute;*/
    /*top: 35px;*/
    /*left: 130px;*/
  /*}*/
  /*#user-detail .yon-uitemplate{*/
    /*margin-top: -20px;*/
  /*}*/
  /*#user-detail div.yon-title{*/
    /*display: none;*/
  /*}*/
</style>
