<template>
  <div class="list-panel">
    <div class="title-header">
      <h2 class="name">员工信息设置</h2>
    </div>
    <!--search-->
    <!-- 员工信息详情 -->
    <div id="search-container">
      <div class="fr">
        <el-button type="primary" @click="backInfo">返回</el-button>
      </div>
    </div>

    <div class="staff-detail">
      <div class="btn-location fl">
        <el-button type="primary" v-if="!staffEdit" icon="edit" @click="staffEdit = true;" size="mini"></el-button>
      </div>
      <el-template :pkTemp="pk_staff"
                   ref="detail"
                   :isEdit="staffEdit"
                   :templateValue="currentValue">

      </el-template>
      <div class="fr">
        <el-button type="primary" v-if="staffEdit" @click="confirmStaff">确定</el-button>
        <el-button type="default" v-if="staffEdit" @click="cancalStaff">取消</el-button>
      </div>
      <div style="clear: both"></div>
    </div>
<!--工作经历列表-->
    <div class="staff-detail">
      <div class="btn-location2 fl">
        <el-button type="primary" v-if="!recordEdit" @click="record_status = 'form';recordEdit = true;isNew=true;setEmptyCurrentValueRecord();" size="mini" icon="plus"></el-button>
      </div>
      <div>
        <el-template :pkTemp="pk_record"
                     v-if="record_status === 'table'"
                     :show-button="showButton"
                     ref="detail_record"
                     @edit-table-row="editTableRow"
                     @delete-table-row="deleteTableRow"
                     :isEdit="recordEdit"
                     :templateValue="recordCurrentValue">

        </el-template>
      </div>
      <div >
        <el-template :pkTemp="pk_record_form"
                      v-if="record_status === 'form'"
                     ref="detail_record_form"
                     :isEdit="recordEdit"
                     @setEmptyKeys="setEmpty"
                     :templateValue="currentValueRecord"
                     id="staff-edit-form">

        </el-template>
      </div>
      <div class="fr">
        <el-button type="primary" v-if="recordEdit && isNew" @click="newRecord">新增</el-button>
        <el-button type="primary" v-if="recordEdit && !isNew" @click="newRecord">修改</el-button>
        <!--<el-button type="default" v-if="recordEdit" @click="recordEdit = false;">取消</el-button>-->
        <el-button type="default" v-if="record_status === 'form'" @click="record_status = 'table';recordEdit = false;request">返回</el-button>
      </div>
      <div style="clear: both"></div>
    </div>

    <!-- 删除提示框 -->
    <el-dialog
      title="提示"
      v-model="delDialogVisible"
      :modal="true"
      size="tiny">
      <span>确认删除该条记录？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
//  import template from './ui-template/src/template.vue';
  export default {
//      components:{uitemplate:template},
    data(){
      return {
        delDialogVisible: false,
        isHide: true,
        isNew: true,
        formData: {},
        currentPage: 1,
        pk_staff: '2cbf54d5-88c1-4849-8250-474ca316a8b9',
        pk_record: 'eb798bab-d53e-4255-a24b-60e61d9883af',
        pk_record_form: 'c46eae82-90a2-4ea6-915d-4531317cf1fe',
        record_status: 'table',
        originalValue: '',
        currentValue: '',
        originalValueRecord: '',
        currentValueRecord: '',
        recordOriginalValue: '',
        recordCurrentValue: '',
        staffEdit: false,
        userEdit: false,
        recordEdit: false,
        showButton: {
          width: 150,
          group: true,
          buttons: [
            {
              name: 'edit',
              text: '',
              icon: 'edit',
              content: '编辑',
            },
            {
              name: 'delete',
              text: '',
              icon: 'delete',
              type: 'danger',
              content: '删除',
            }
          ]
        }
      };
    },
    created(){
      this.request();
    },
    methods: {
      /**
       *   单个用户详情
       **/
      request() {
          //人员
        this.$http({
          url: '/ifbp-app-bd/bd/psn/psndoc/' + this.$root.$router.currentRoute.params.id,
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
//              alert(res.data.data);
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
        //列表
        this.$http({
          url: '/ifbp-app-bd/bd/psn/psnjob/pageList?pn=1&ps=10&sortColumn=auto&pkPsndoc=' + this.$root.$router.currentRoute.params.id,
          method: 'get'
        }).then((res) => {
          if (res.data.success) {
            this.recordOriginalValue = res.data.data.content;
            this.recordCurrentValue = JSON.parse(JSON.stringify(this.recordOriginalValue));
          } else {
//            alert(res.data.data);
            this.$message({
              message: res.data.data,
              type: 'error'
            });
          }
        }).catch(() => {
          this.$message({
            message: '用户工作信息获取失败',
            type: 'error'
          });
        });
      },
      /**
       *  一些控制页面状态的方法
       *  都在按钮上绑着
       **/
      // 返回list页面
      backInfo() {
        window.history.back(-1);
      },
      // 详情变为可编辑态
      setStaff() {
        this.staffEdit = true;
      },
      setRecord() {
        this.recordEdit = true;
      },
      cancalStaff() {
        this.staffEdit = false;
        this.currentValue = JSON.parse(JSON.stringify(this.originalValue));
        this.templateValue = this.originalValue;
      },
      /**
       *  修改员工信息
       *
       **/
      // 确认修改
      confirmStaff(){

        console.log(this.currentValue);
        this.$refs.detail.validate((valid) => {
          if(valid) {
            this.$http({
              url: '/ifbp-app-bd/bd/psn/psndoc/update',
              method: 'put',
              data: this.currentValue,
            }).then((res) => {
              if (res.data.success) {
                this.$message({
                  message: res.data.data,
                  type: 'success'
                });
    //            this.originalValue = JSON.parse(JSON.stringify(this.currentValue));
                  this.staffEdit = false;
              } else {
                this.$message({
                  message: res.data.error.errorMessage,
                  type: 'error'
                });
              }
            }).catch(() => {
              this.$message({
                message: '用户信息更新失败',
                type: 'error'
              });
            });
          }else {
            // 验证失败
          }
        });

      },
      // 点击新增工作记录,清空表单
      setEmptyCurrentValueRecord() {
        this.currentValueRecord = JSON.parse(JSON.stringify(this.originalValueRecord));
        this.$nextTick(() => {
          $('.yon-uitemplate#staff-edit-form input').val('');
          $('.yon-uitemplate#staff-edit-form .el-checkbox__input').removeClass("is-checked");
        });
      },
      //新增工作记录
      newRecord(){
        this.$refs.detail_record_form.validate((valid) => {
          if(valid) {
            this.recordEdit = false;
            this.currentValueRecord.pk_psndoc = this.$root.$router.currentRoute.params.id;
            if (this.isNew) {
              this.method = 'post';
              this.url = '/ifbp-app-bd/bd/psn/psnjob/create';
            } else {
              this.method = 'put';
              this.url = '/ifbp-app-bd/bd/psn/psnjob/update';
            }
            this.$http({
              url: this.url,
              method: this.method,
              data: this.currentValueRecord
            }).then((res) => {
              if (res.data.success) {
                this.$message({
                  message: '成功',
                  type: 'success'
                });
                this.record_status = 'table';
                this.isNew = false;
                this.request();
              } else {
                this.recordEdit = true;
                this.$message({
                  message: res.data.error.errorMessage,
                  type: 'error'
                });
              }
            }).catch(() => {
              if (this.isNew) {
                this.$message({
                  message: '工作记录新增失败',
                  type: 'error'
                });
              } else {
                this.$message({
                  message: '工作记录更新失败',
                  type: 'error'
                });
              }
              this.record_status = 'table';
            });
          }else {
            // 验证失败
          }
        });
      },
      setEmpty(value){
        this.originalValueRecord = value;
        this.currentValueRecord = JSON.parse(JSON.stringify(this.originalValueRecord));
      },
      editTableRow(row, index){
        this.record_status = 'form';
        this.recordEdit = true;
        this.isNew = false;
        this.currentValueRecord = JSON.parse(JSON.stringify(row));
        console.log(index);
        // console.log('edit', row, index);
        // this.$http({
        //   url: '/ifbp-app-bd/bd/psn/psnjob/' + row.id,
        //   method: 'get'
        // }).then((res) => {
        //   if (res.data.success === true) {
        //     this.currentValueRecord = res.data.data;
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
      },
      deleteTableRow(row) {
        console.log('delete', row);
        this.delDialogVisible = true;
        this.delId = row.id;
      },
      deleteClick() {
        this.$http({
          url: '/ifbp-app-bd/bd/psn/psnjob/' + this.delId,
          method: 'delete'
        }).then((res) => {
          if (res.data.success === true) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.delDialogVisible = false;
            this.request();
          } else {
            this.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            });
          }
        }).catch(() => {
          this.$message({
            message: '删除接口调用失败',
            type: 'error'
          });
        });
      }
    }
  };

</script>
<style>
  .avatar {
    height: auto!important;
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
  .staff-detail{
    margin-top: 20px;
    padding: 0 20px;
    background: #ffffff;
    position: relative;
  }

  .btn-location{
    position: absolute;
    left: 85px;
    top: 15px;
  }
  .btn-location2{
    position: absolute;
    top: 15px;
    left: 120px;
  }
</style>
