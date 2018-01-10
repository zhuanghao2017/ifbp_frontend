<template>
<div class="mdlayout-page">
  <div class="mdlayout-page-header" style="text-align: center;">
      <div class="mdlayout-header-func">
        <i class="el-icon-arrow-left header-icon" style="display: inline-block;" @click="backInfo"></i>
      </div>
      <label>{{id ? "修改" : "新增"}}工作记录</label>
  </div>
  <div class="mdlayout-page-section">
      <div class="list-panel">

        <!-- 添加员工 工作信息ui模板 -->
        <el-template :pkTemp="pk_record_form"
                     ref="detail_record_form"
                     :isEdit="true"
                     @setEmptyKeys="setEmpty"
                     :templateValue="currentValue"
                     id="staff-edit-form"
                     :hideTitle="true">

        </el-template>
      </div>
  </div>
  <div class="mdlayout-page-footer">
    <el-button type="success" style="width:100%;height:100%;" class="mdlayout-footer-button" @click="addRecord">保存</el-button>
  </div>
</div>
</template>
<script>
  export default {
    data(){
      return {
        pk_record_form: 'c46eae82-90a2-4ea6-915d-4531317cf1fe',
        // pk_record_form: 'd3af71da-3ce5-4bb5-8999-e979dab18042',
        // pk_record_form: '91d507e3-a82c-4386-a9f0-a8fa7509a2a5', // 141
        originalValue: '',
        currentValue: '',
        id: this.$root.$router.currentRoute.params.id,
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
        // this.$http({
        //   url: '/ifbp-app-bd/bd/psn/psnjob/' + row.id,
        //   method: 'get'
        // }).then((res) => {
        //   if (res.data.success === true) {
        //     this.currentValue = res.data.data;
        //   } else {
        //     this.$message({
        //       message: res.data.error.errorMessage,
        //       type: 'error'
        //     });
        //   }
        // }).catch(() => {
        //   this.$message({
        //     message: '工作记录获取失败',
        //     type: 'error'
        //   });
        // });
        this.currentValue = this.$parent.selectChildRowData;
      },
      /**
       *  添加用户
       *
       **/
      addRecord() {
        this.$refs.detail_record_form.validate((valid) => {
          if(valid) {
            this.currentValue.pk_psndoc = this.$parent.selectRowId;
            if (this.id) {
              this.method = 'put';
              this.url = '/ifbp-app-bd/bd/psn/psnjob/update';
            } else {
              this.method = 'post';
              this.url = '/ifbp-app-bd/bd/psn/psnjob/create';
            }
            this.$http({
              url: this.url,
              method: this.method,
              data: this.currentValue
            }).then((res) => {
              if (res.data.success) {
                this.$message({
                  message: '修改成功！',
                  type: 'success'
                });
                this.isNew = false;
                this.$root.$router.go(-1);
              } else {
                this.$message({
                  message: res.data.error.errorMessage,
                  type: 'error'
                });
              }
            }).catch(() => {
              if (this.isNew) {
                this.$message({
                  message: '工作记录新增失败！',
                  type: 'error'
                });
              } else {
                this.$message({
                  message: '工作记录更新失败！',
                  type: 'error'
                });
              }
            });
          }else {
            // 验证失败
          }
        });

      },
      setEmpty(value){
        this.originalValue = value;
        this.currentValue = JSON.parse(JSON.stringify(this.originalValue));
      },
      /**
       *  一些控制页面状态的方法
       *  都在按钮上绑着
       **/
      // 返回detail页面
      backInfo() {
        this.reset();
        this.$router.go(-1);
      },
      reset() {
        this.currentValue = {};
      },
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
