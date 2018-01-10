<template>
  <div class="list-panel">
    <div class="title-header">
      <h2 class="name">新增</h2>
    </div>
    <!--search-->
    <div id="search-container">
      <div class="fl">
        <el-button type="primary" @click="addUser">保存</el-button>
        <!-- <el-button type="primary" @click="reset">取消</el-button> -->
      </div>
      <div class="fr">
        <el-button type="primary" @click="backInfo">返回</el-button>
      </div>
    </div>

    <!-- 添加员工信息ui模板 -->
    <div id="staff-detail">
      <el-template :pkTemp="pk_temp"
                  ref="detail"
                  @change="changeHandle"
                  @setEmptyKeys="setEmpty"
                  :isEdit="isEdit"
                  :templateValue="currentValue">
      </el-template>
    </div>


    <!--工作经历列表-->
    <div class="staff-detail">
      <div class="btn-location2 fl">
        <el-button type="primary" v-if="!recordEdit" @click="record_status = 'form';recordEdit = true;isNew=true;" size="mini" icon="plus"></el-button>
      </div>
      <div v-show="record_status === 'form'">
        <el-template :pkTemp="pk_record_form"
                     ref="detail_record_form"
                     :isEdit="recordEdit"
                     @setEmptyKeys="setEmptyNext"
                     :templateValue="currentValueRecord"
                     id="staff-edit-form">
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
        pk_temp:'2cbf54d5-88c1-4849-8250-474ca316a8b9',
        originalValue: '',
        currentValue: '',
        isEdit: true,
        recordEdit: true,
        record_status: 'form',
        pk_staff: '2cbf54d5-88c1-4849-8250-474ca316a8b9',
        pk_record_form: 'c46eae82-90a2-4ea6-915d-4531317cf1fe',
        currentValueRecord: '',
        currentDate:{},
      };
    },
//    components: {uitemplate:template},
    methods: {
      /**
       *  添加用户
       *
       **/
      addUser() {
        this.$refs.detail.validate((valid) => {
          if(valid) {
           this.$refs.detail_record_form.validate((validNext) => {
              if(validNext){
                  var url = '/ifbp-app-bd/bd/psn/psndoc/save';
                  this.$http({
                    url: url,
                    method: 'POST',
                    data: {
                      psndoc: this.currentValue,
                      psnjob: this.currentValueRecord
                    },
                    dataType: 'json'
                  }).then((res) => {
                    if (res.data.success) {
                      this.$message({
                        message: '恭喜你，添加成功！',
                        type: 'success'
                      });
                      // location.hash = '/staff';
                      this.$router.push("/staff");
                    } else {
                    //alert(res.data.error.errorMessage);
                      this.$message({
                        message: res.data.error.errorMessage,
                        type: 'error'
                      });
                    }

                  }).catch(() => {
                     //this.currentValue = json.data.content;
                  });
              }
            });
          }
        });

      },
      setEmpty(value){
        this.originalValue = value;
        this.originalValue.idtype = '0';
        this.originalValue.enablestate = '2';
        this.currentValue = JSON.parse(JSON.stringify(this.originalValue));
      },
      setEmptyNext(value){
        this.originalValueRecord = value;
        this.originalValueRecord.ismainjob = '主职';
        this.currentValueRecord = JSON.parse(JSON.stringify(this.originalValueRecord));
      },
      /**
       *  一些控制页面状态的方法
       *  都在按钮上绑着
       **/
      // 返回list页面
      backInfo() {
//        location.hash = '/staff';
          this.$router.go(-1);
      },
      reset() {
        this.currentValue = {};
        this.currentValueRecord = {};
      },
      changeHandle(){
//        this.currentValue[index] = value;
      },
//      changeHandleUser(index,value){
////        this.currentValue[index] = value;
//      },
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
  #staff-pagination{
    float: right;
    /*margin: -20px 20px 0;*/
  }

</style>
