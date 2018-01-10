<template>
  <div class="org-add-dept">
    <div class="title-header">
      <h2 class="name">新增部门</h2>
    </div>
    <div class="button-container">
      <el-button type="primary" @click="confirm">保存</el-button>
      <el-button type="primary" class="fr" @click="cancel">返回</el-button>
    </div>
    <el-template :pkTemp="pk_temp" @change="changeHandle" @setEmptyKeys="setEmpty" ref="tpl" v-if="tplCode" :isEdit="isEdit" :templateValue="currentValue"></el-template>
    <!-- <uitemplate :pkTemp="pk_temp" :tplCode="tplCode" @change="changeHandle" @setEmptyKeys="setEmpty" ref="tpl" v-if="tplCode" :isEdit="isEdit" :templateValue="currentValue"></uitemplate> -->
  </div>
</template>

<script>
  // import uitemplate from './ui-template/src/template';

  export default{
    data() {
      return {
        // tplCode:{
        //   funcnode:'ifbp-oa-user-fun',
        //   nexuskey:'ifbp-oa-user'
        // },
        beanMap:{},
        beanMaps:{},
        tplCode:{
          funcnode: 'organization',
          nexuskey: 'org'
        },
        pk_temp: 'd0d2a4c4-3125-4b31-9c67-b5afe5052e2b',
        list: '',
        originalValue: '',
        currentValue: '',
        searchKey: '关键字',
        isEdit: true
      };
    },
    components:{
      // uitemplate:uitemplate
    },
    methods:{
      setEmpty(value){
        this.originalValue = value;
        this.originalValue.enablestate = '2';
        this.originalValue.beanMap = this.beanMap;
        if(this.beanMaps.orgtype === 1){
          this.originalValue.pk_org = this.beanMaps.id;
        } else if(this.beanMaps.orgtype === 2){
          this.originalValue.pk_fatherorg = this.beanMaps.id;
        }
        
        this.currentValue = JSON.parse(JSON.stringify(this.originalValue));
      },
      request(){
        this.originalValue = {};
        this.currentValue = JSON.parse(JSON.stringify(this.originalValue));
      },
      changeHandle(index, value){
        console.log(index, value);
      },
      set(){
        this.isEdit = true;
      },
      del(){

      },
      confirm(){
//        console.log(this.currentValue);
        this.$http({
          url: '/ifbp-app-bd/bd/org/dept/',
          method: 'post',
          data: this.currentValue
        }).then((res) => {
          if (res.data.success === true) {
//            alert('新增部门成功!');
            if (window.env === 'dev') {
              this.$message({
                message: '新增成功！',
                type: 'success'
              });
            }
            this.isEdit = false;
            this.$root.$router.push('/HR010003');
          } else {
//            alert(res.data.error.errorMessage);
            this.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            });
          }
        }).catch(() => {
          this.$message({
            message: '请求接口失败！',
            type: 'error'
          });
        });
      },
      cancel(){
        // this.$root.$router.push('/HR010003');
        this.$router.go(-1);
        //this.$refs.tpl.setValue(this.originalValue);
      }
    },
    created() {
      console.log(this.$route);
      $('#main-right').find('div#organization_page').css('display', 'none');
      //this.request();
      var beanMaps = JSON.parse(localStorage.getItem('beanMap'));
      this.beanMaps = beanMaps;
      if(beanMaps.orgtype === 2){
        this.beanMap = {
          pk_fatherorg_ref: {
            'beanMaps.id': {
                code: beanMaps.code,
                name: beanMaps.name,
                id: beanMaps.id,
              }
          }
        };
      } else if(beanMaps.orgtype === 1){
        this.beanMap = {
          pk_org_ref: {
            'beanMaps.id': {
                code: beanMaps.code,
                name: beanMaps.name,
                id: beanMaps.id,
              }
          }
        };
      }
      // this.beanMap = {
      //   pk_fatherorg_ref: {
      //     'beanMaps.id': {
      //         code: beanMaps.code,
      //         name: beanMaps.name,
      //         id: beanMaps.id,
      //       }
      //   }
      // };
      localStorage.clear();
    }
  };
</script>

<style scoped>
  .org-add-dept{
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
