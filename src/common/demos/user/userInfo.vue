<template>
  <div>
    <div>
      <el-button @click="set">修改</el-button>
      <el-button v-if="isEdit" @click="confirm">确定</el-button>
      <el-button v-if="isEdit" @click="cancel">取消</el-button>
      <el-button @click="del">删除</el-button>
    </div>
    <el-template :tplCode="tplCode" @change="changeHandle" ref="tpl" v-if="tplCode" :isEdit="isEdit" :templateValue="currentValue"></el-template>
    <!-- <uitemplate :tplCode="tplCode" @change="changeHandle" ref="tpl" v-if="tplCode" :isEdit="isEdit" :templateValue="currentValue"></uitemplate> -->
  </div>
</template>

<script>
  //import uitemplate from './ui-template/src/template';

  export default{
    data() {
      return {
        tplCode:{
          funcnode:'ifbp-demo-user-fun',
          nexuskey:'ifbp-demo-user'
        },
        list:'',
        originalValue:'',
        currentValue:'',
        searchKey:'关键字',
        isEdit: false
      };
    },
    components:{
     //  uitemplate:uitemplate
    },
    methods:{
      request(){

        this.$http({
          url:'/ifbp-demo-user/user/getUser',
          method:'post',
          data:{pk_user:'98ca62e8-a82f-48b2-9b35-f2b268d11143'}
        }).then((res) => {
          console.log(res);
          if(res.data.success === 'success') {
            console.log(this);
            this.originalValue = res.data.detailMsg.data;
            this.currentValue = JSON.parse(JSON.stringify(this.originalValue));
            //this.$refs.tpl.setValue(this.currentValue);
          }else{
            this.$message('error');
          }

        });
      },
      changeHandle(index,value){
        console.log(index,value);
        this.currentValue[index] = value;
      },
      set(){
        this.isEdit = true;
      },
      del(){

      },
      confirm(){
        console.log(this.currentValue);
        this.$http({
          url:'/ifbp-demo-user/user/save',
          method: 'post',
          data: [this.currentValue]
        }).then(() => {
          this.isEdit = false;
          this.originalValue = JSON.parse(JSON.stringify(this.currentValue));
        });


      },
      cancel(){
        this.isEdit = false;
        this.currentValue = JSON.parse(JSON.stringify(this.originalValue));
        //this.$refs.tpl.setValue(this.originalValue);
      }
    },
    created() {
      this.request();
    }
  };
</script>
