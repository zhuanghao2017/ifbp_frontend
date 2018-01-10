<template>
<div class="mdlayout-page">
  <div class="mdlayout-page-header" style="text-align: center;">
      <div class="mdlayout-header-func">
        <i class="el-icon-arrow-left header-icon" style="display: inline-block;" @click="backInfo"></i>
      </div>
      <label>员工信息</label>
  </div>
  <div class="mdlayout-page-section">
      <div class="list-panel">

        <!-- 添加员工信息ui模板 -->
        <div id="staff-detail">
          <el-template :pkTemp="pk_temp"
                      ref="detail"
                      @change="changeHandle"
                      @setEmptyKeys="setEmpty"
                      :isEdit="isEdit"
                      :templateValue="currentValue"
                      :hideTitle="true">

          </el-template>
        </div>
        <div class="staff-detail" v-if="isCreate">
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
  </div>
  <div class="mdlayout-page-footer">
    <el-button type="success" style="width:100%;height:100%;" class="mdlayout-footer-button" @click="addUser">保存</el-button>
  </div>

</div>
</template>
<script>

  export default {
    data(){
      return {
        pk_temp:'2cbf54d5-88c1-4849-8250-474ca316a8b9',
        originalValue: '',
        currentValue: '',
        isEdit: true,
        id: this.$root.$router.currentRoute.params.id,
        recordEdit: true,
        record_status: 'form',
        pk_staff: '2cbf54d5-88c1-4849-8250-474ca316a8b9',
        pk_record_form: 'c46eae82-90a2-4ea6-915d-4531317cf1fe',
        currentValueRecord: '',
        currentDate:{},
        isCreate: this.$route.fullPath === '/staff/add'
      };
    },
    created() {
      if(this.id) {
        this.requestDetailData();
      }
    },
    methods: {
      /*
      * 获取用户详情
       */
      requestDetailData() {
        //人员
        this.$http({
          url: '/ifbp-app-bd/bd/psn/psndoc/' + this.id,
          method: 'get'
        }).then((res) => {

          if (res.data.success) {
            if(res.data.data.avatar === null) {
              res.data.data.avatar = 'null';
            }
            this.originalValue = res.data.data;
            this.originalValue.avatar = res.data.data.avatar;
            this.currentValue = JSON.parse(JSON.stringify(this.originalValue));
          } else {
            this.$message({
              message: res.data.data,
              type: 'error'
            });
          }
        }).catch(() => {
          this.$message({
            message: '用户信息获取失败',
            type: 'error'
          });
        });
      },
      /**
       *  添加用户
       *
       **/
      addUser() {
        this.$refs.detail.validate((valid) => {
          if(valid) {
            if(this.isCreate) {
              this.$refs.detail_record_form.validate((validNext) => {
                if(validNext){
                  this.doSave();
                }
              });
            } else {
              this.doSave();
            }
          }
        });

      },

      doSave() {
        var url = this.isCreate ? '/ifbp-app-bd/bd/psn/psndoc/save' :
                                  '/ifbp-app-bd/bd/psn/psndoc/update';
        var data = this.isCreate ? {
                      psndoc: this.currentValue,
                      psnjob: this.currentValueRecord
                    } : this.currentValue;
        var method = this.isCreate ? 'POST' : 'PUT';

        this.$http({
          url: url,
          method: method,
          data: data,
          dataType: 'json'
        }).then((res) => {
          if (res.data.success) {
            this.$message({
              message: '恭喜你，添加成功！',
              type: 'success'
            });
            // location.hash = '/staff';
            if(this.isCreate) {
              var id = res.data.data && res.data.data.id;
              if(id) {
                this.$parent.request();
                this.$router.push("/staff/detail/"+id);
              } else {
                this.$router.go(-1);
              }
            } else {
              this.$parent.request();
              this.$router.go(-1);
            }
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
      },

      setEmpty(value){
        this.originalValue = value;
        this.currentValue = JSON.parse(JSON.stringify(this.originalValue));
      },

      setEmptyNext(value){
        this.originalValueRecord = value;
        this.currentValueRecord = JSON.parse(JSON.stringify(this.originalValueRecord));

        // this.currentDate.psnjob = JSON.parse(JSON.stringify(this.originalValueNext));
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
      changeHandle(){
//        this.currentValue[index] = value;
      },
//      changeHandleUser(index,value){
////        this.currentValue[index] = value;
//      },
    }
  };

</script>
<style scoped>
  .mdlayout-header-func i:hover {
    font-size: 22px;
    font-weight: bold;
    transition: .3s all;
  }
  .mdlayout-footer-button{
    width: 100%;
    height:100%;
    top: 0;
  }

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
