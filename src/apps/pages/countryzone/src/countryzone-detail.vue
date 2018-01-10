<template>
  <div class="list-panel">
    <div class="title-header">
      <h2 class="name">国家地区编辑</h2>
    </div>
    <!-- 国家地区档案 -->
    <div id="search-container">
      <div class="fl">
        <el-button type="primary" @click="save">保存</el-button>
      </div>
      <div class="fr">
        <el-button type="primary" @click="backInfo">返回</el-button>
      </div>
    </div>
    
    <div class="countryzone-detail">
      <ifbp-template ref="countryzone-form" :pkTemp="pk_country"
                     :tplData="tplData" :editFlag="editFlag"
      ></ifbp-template>
    </div>
  </div>
</template>
<script>
  import test from "../detailMockData.js";
  export default {
    data(){
      return {
        tplData: {
          countryzone: {},
          params: {
              code: 'CN'
          },
          rules: {
            code: [{required: true, message: '请输入编码', trigger: 'blur'}],
            name: [{required: true, message: '请输入名称', trigger: 'blur'}],
            codeth: [{required: true, message: '请输入三位代码', trigger: 'blur'}],
            pk_lang: [{required: true, message: '请输入语种', trigger: 'blur'}]
          }
        },
        editFlag: false,
        delDialogVisible: false,
        isHide: true,
        isNew: true,
        formData: {},
        currentPage: 1,
        pk_country: '097ec6c6-0bcd-4bd6-afb0-f785567cd99d',
        record_status: 'table',
        originalValue: '',
        currentValue: '',
        addressdocEdit: false,
        userEdit: false,
        recordEdit: true,
        showButton: {
          width: 150,
          group: true,
          buttons: [
            {
              name: 'edit',
              text: '',
              icon: 'edit'
            },
            {
              name: 'delete',
              text: '',
              icon: 'delete',
              type: 'danger'
            }
          ]
        }
      };
    },
    created() {
      if (this.$root.$router.currentRoute.params.id) {
        this.request();
      }
    },
    methods: {
      request() {
        this.$http({
          url: '/baseapp/countryzone/queryById/' + this.$root.$router.currentRoute.params.id,
          method: 'get',
        }).then((res) => {
          if (res.data.status === true) {
            this.$refs['countryzone-form'].setData('countryzone', res.data.data);
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        }).catch((e) => {
          debugger;
          console.error(e);
          this.$message({
            message: '操作异常',
            type: 'error'
          });
        });
      },
      // 返回list页面
      backInfo() {
        window.history.back(-1);
      },
      // 保存
      save(){
        this.$refs['countryzone-form'].comp.$refs['countryzone-form'].validate((valid) => {
          if (valid) {
            var data = this.$refs['countryzone-form'].comp.countryzone;
            this.$http({
              url: '/baseapp/countryzone/save',
              method: 'post',
              data: data,
              dataType: 'json'
            }).then((res) => {
              if (res.data.status === true) {
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
                location.hash = '/baseapp/countryzone/countryzone';
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                });
              }
            }).catch((e) => {
              console.error(e);
              this.$message({
                message: '国家地区保存失败',
                type: 'error'
              });
            });
          }
        });
      }
    }
  };

</script>
<style>
</style>
