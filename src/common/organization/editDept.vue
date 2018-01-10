<template>
  <div class="org-edit-dept">
    <div class="title-header">
      <h2 class="name">部门编辑</h2>
    </div>
    <div class="button-container">
      <el-button type="primary" v-if="!isEdit" @click="set">修改</el-button>
      <el-button type="primary" v-if="isEdit" @click="confirm">保存</el-button>
      <el-button v-if="isEdit" @click="cancel">取消</el-button>
      <!--<el-button v-if="!isEdit" @click="del">删除</el-button>-->
      <el-button class="fr" type="primary" @click="back">返回</el-button>
    </div>
    <el-template :pkTemp="pk_temp"
                 @change="changeHandle"
                 ref="tpl"
                 :isEdit="isEdit"
                 :templateValue="currentValue">

    </el-template>
    <!--  <uitemplate :pkTemp="pk_temp" :tplCode="tplCode" @change="changeHandle" ref="tpl" v-if="tplCode" :isEdit="isEdit" :templateValue="currentValue"></uitemplate> -->
  </div>
</template>

<script>

  export default{
    data() {
      return {
        pk_temp: 'd0d2a4c4-3125-4b31-9c67-b5afe5052e2b',
        list: '',
        originalValue: '',
        currentValue: '',
        isEdit: true
      };
    },
    components:{
      // uitemplate:uitemplate
    },
    methods:{
      request(){
        this.$http({
//        url: '/ifbp-app-bd/bd/org/org/' + this.$root.$route.params.id +
//        '?type=' + this.$root.$route.params.type,
          url: '/ifbp-app-bd/bd/org/dept/' + this.$root.$route.params.id,
          method: 'get'
        }).then((res) => {
//          this.currentValue = '';
          this.originalValue = res.data.data;
          this.currentValue = JSON.parse(JSON.stringify(this.originalValue));

          //this.$refs.tpl.setValue(this.currentValue);
        }).catch(() => {
          this.$message({
            message: '获取部门信息失败！',
            type: 'error'
          });
        });
      },
      changeHandle(index, value){
        console.log(index, value);
        //this.currentValue[index] = value;
      },
      set(){
        this.isEdit = true;
      },
//      del(){
//        this.$http({
////          url:'/ifbp-app-bd/bd/org/org/' + this.$root.$route.params.id +
////          '?type=' + this.$root.$route.params.type,
//          url: '/ifbp-app-bd/bd/org/dept/' + this.$root.$route.params.id,
//          method: 'delete'
//        }).then((v) => {
//          if (v.data.success === true) {
////            alert('删除成功');
//            if (window.env === 'dev') {
//              this.$message({
//                message: '删除成功！',
//                type: 'success'
//              });
//            }
//            location.hash = '/HR010003';
//          } else {
////            alert(v.data.error.errorMessage);
//            this.$message({
//              message: v.data.error.errorMessage,
//              type: 'error'
//            });
//          }
//        }).catch(() => {
//          this.$message({
//            message: '删除接口调用失败！',
//            type: 'error'
//          });
//        });
//      },
      confirm(){
        this.$refs.tpl.validate((valid) => {
          if(valid) {
            this.$http({
              url: '/ifbp-app-bd/bd/org/dept/',
              method: 'put',
              data: this.currentValue
            }).then((v) => {
              if (v.data.success === true) {
    //            alert('修改成功');
                if (window.env === 'dev') {
                  this.$message({
                    message: '修改成功！',
                    type: 'success'
                  });
                }
                this.isEdit = false;
                this.originalValue = JSON.parse(JSON.stringify(this.currentValue));
              } else {
                this.$message({
                  message: v.data.error.errorMessage,
                  type: 'error'
                });
                this.currentValue = JSON.parse(JSON.stringify(this.originalValue));
    //            alert(v.data.error.errorMessage);
              }
            }).catch(() => {
              this.$message({
                message: '修改接口调用失败！',
                type: 'error'
              });
              this.currentValue = JSON.parse(JSON.stringify(this.originalValue));
            });
          } else {
            // 验证失败
          }
        });
      },
      cancel(){
        this.isEdit = false;
        this.currentValue = JSON.parse(JSON.stringify(this.originalValue));
        //this.$refs.tpl.setValue(this.originalValue);
      },
      back(){
        window.history.back(-1);
      }
    },
    created() {
      console.log(this.$route);
      $('#main-right').find('div#organization_page').css('display', 'none');
      this.request();
    }
  };
</script>

<style scoped>
  .org-edit-dept{
    padding: 20px 30px;
  }
  .button-container{
    border-bottom: 1px solid #EEEFF1;
    height: 56px;
    margin: 10px 20px 0 20px;
    padding: 10px 20px;
    background-color: #FFF
  }
  .yon-uitemplate {
    margin: 20px;
    padding: 0 20px;
  }
</style>
