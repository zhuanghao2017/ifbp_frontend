<template>
  <div class="org-add">
    <div class="title-header">
      <h2 class="name">新增组织</h2>
    </div>
    <div class="button-container">
      <el-button type="primary" @click="confirm">保存</el-button>
      <el-button type="primary" class="fr" @click="cancel">返回</el-button>
    </div>
    <el-template 
      :pkTemp="pk_temp" 
      @change="changeHandle" 
      @setEmptyKeys="function(v){setEmpty(v,'')}" 
      ref="tpl" 
      v-if="tplCode" 
      :isEdit="isEdit" 
      :templateValue="currentValue">
    </el-template>
    <div class="bank-record">
      <el-row>
        <el-col class="child-title-left" :span="24">
          银行账户<i class="el-icon-plus" @click="addBankRow"></i>
        </el-col>
        <!-- <el-col class="child-title-right" :span="12">
          <i class="el-icon-setting" @click="editTableColumns('bank-record')"></i>
        </el-col> -->
      </el-row>
      <el-template 
        :pkTemp="bank_pk_temp"
        :isEdit="false"
        :hide-title="true"
        :templateValue="bankCurrentValue"
        :show-button="showBankButton"
        @serEmptyKeys="function(v){setEmpty(v,'bank')}"
        @check-table-row="checkTableRow"
        @edit-table-row="editTableRow"
        @delete-table-row="deleteTableRow">
      </el-template>
      <el-dialog
          title="增加银行账户"
          v-model="showBankForm"
          size="large">
          <el-template
              :pkTemp="bank_form_pk_temp"
              :hide-title="true"
              :isEdit="isEditBankForm"
              ref="bank-record-form"
              :table-style="tableStyle"
              :templateValue="bankRecordCurrentValue"
              @setEmptyKeys="function(v){setEmpty(v,'bank-record')}">
          </el-template>
          <div class="fr editBank" v-if="!isEditBankForm">
            <el-button @click="showBankForm = false">返 回</el-button>
            <el-button  type="primary" @click="isEditBankForm = true">编 辑</el-button>
          </div>
          <span v-else slot="footer" class="dialog-footer">
            <el-button @click="showBankForm = false">取 消</el-button>
            <el-button type="primary" @click="addBankForm">确 定</el-button>
          </span>
            </el-dialog>
    </div>
    
     
    <!-- <uitemplate :pkTemp="pk_temp" :tplCode="tplCode" @change="changeHandle" @setEmptyKeys="setEmpty" ref="tpl" v-if="tplCode" :isEdit="isEdit" :templateValue="currentValue"></uitemplate> -->
  </div>
</template>

<script>
  // import uitemplate from './ui-template/src/template';

  export default{
    data() {
      return {
        orgId:'', //组织的id
        isCreate: false, //主表是否已经保存
        isEditBankForm: false, //是否是编辑状态
        showBankForm: false, //显示银行账户表单
        isAddBankForm:false,
        fatherId:'',
        beanMap:{},
        beanMaps:{},
        tableStyle: {
          'max-height': '1000px'
        },
        tplCode:{
          funcnode: 'organization',
          nexuskey: 'org'
        },
        pk_temp: '4b14af86-4781-43b9-aa7a-6be9b1f0c60b',
        bank_pk_temp:'061a9474-a0a0-4edf-a419-1e37c6303d6a',
        bank_form_pk_temp:'09d8aacc-9917-4a06-8cd0-06409be75b10',
        list: '',
        originalValue: '',
        currentValue: '',
        bankOriginalValue: '',
        bankCurrentValue: '',
        bankRecordOriginalValue: '',
        bankRecordCurrentValue: '',
        searchKey: '关键字',
        isEdit: true,
        //银行账户的最后一列的操作按钮
        showBankButton: {
          width: 110,
          group: true,
          buttons: [
            {
              name: 'check',
              text: '',
              icon: 'search',
              content: '查看',
            },{
              name: 'edit',
              text: '',
              icon: 'edit',
              content: '编辑',
            },{
              name: 'delete',
              text: '',
              icon: 'delete',
              content: '删除',
            }
          ]
        }
      };
    },
    components:{
       // uitemplate:uitemplate
    },
    methods:{
      //点击新增银行账户按钮
      addBankRow() {
        if (!this.isCreate) {
          this.$message('请先新增并保存主表数据');
          return;
        }
        this.isAddBankForm = true;
        this.isEditBankForm = true;
        this.showBankForm = true;
        // var currentBankRow = JSON.parse(JSON.stringify(this.emptyListItem['bank-record']));
        // this.$set(this.currentValue,'bank-record-form',currentBankRow);
      },
      //请求组织银行信息
      requestBankValues(){
        this.getOrgId();
        this.$http({
          url:'/ifbp-app-bd/bd/org/corp/bankList?id='+this.orgId,
          type:'get'
        }).then((res) => {
          if(res.data.success === true){
            this.bankCurrentValue = res.data.data;
          }
        }).catch(() => {
          this.$message.error('请求银行信息失败');
        });
      },
      
       //点击新增银行账户按钮
      addBankForm () {
        const self = this;
        var submitData = JSON.parse(JSON.stringify(self.bankRecordCurrentValue));
        if(this.isAddBankForm){
          self.$http({
            url: '/ifbp-app-bd/bd/org/corp/addBank?id='+self.orgId,
            method: 'post',
            dataType: 'json',
            data: submitData,
          }).then((res) => {
            if(res.data.success === true){
              self.bankCurrentValue.push(res.data.data);
                self.$message({
                message:'保存成功',
              });
              self.showBankForm = false;
            } else {
              self.$message({
                message: '保存失败！',
                type: 'error'
              });
            }
          }).catch(() => {
            self.$message({
              message: '请求出错！',
              type: 'error'
            });
          });
        }else{
          self.$http({
                  url: '/ifbp-app-bd/bd/bank/accbas/',
                  method: 'post',
                  dataType: 'json',
                  data: submitData,
                }).then((res) => {
                  if(res.data.success === true) {
                     self.$set(self.bankCurrentValue,self.bankRowId,res.data.data);
                      self.$message({
                        message:'修改成功',
                      });
                    self.showBankForm = false;
                  } else {
                    self.$message({
                      message: '保存失败！',
                      type: 'error'
                    });
                  }
                }).catch(() => {
                  self.$message({
                    message: '请求出错！',
                    type: 'error'
                  });
                });
        }
        
      },
      //点击银行账户查看按钮
      checkTableRow (row) {
        var bankRecordForm = JSON.parse(JSON.stringify(row));
        this.showBankForm = true;
        this.isEditBankForm = false;
        this.bankRecordCurrentValue = bankRecordForm;
        // this.$set(this.currentValue,'bank-record-form',bankRecordForm);
      },
      //点击银行账户编辑按钮
      editTableRow (row,index) {
        var bankRecordForm = JSON.parse(JSON.stringify(row));
        this.isAddBankForm = false;
        this.showBankForm = true;
        this.isEditBankForm = true;
        this.bankRowId = index;
        this.bankRecordCurrentValue = bankRecordForm;
        // this.$set(this.currentValue,'bank-record-form',bankRecordForm);
      },
      //点击银行账户删除数据
      deleteTableRow (row,index) {
        const self = this;
        self.$confirm('是否删除当前记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$http({
            url: '/ifbp-app-bd/bd/org/corp/deleteBank?id=' + row.pk_bankaccbas,
            method: 'DELETE',
          }).then((res) => {
            if (res.data.success === true) {
              self.bankCurrentValue.splice(index,1);
              // self.bankOriginalValue.splice(index,1);
              self.$message('删除成功');
            } else {
              self.$message('删除失败');
            }
            }).catch(() => {
              self.$message('删除失败');
            });
        }).catch(() => {
          self.$message('已取消删除');
        });
      },
    
      getOrgId(){
        var url = window.location.href;
        var orgId = url.split('?')[1].split('&')[0].split('=')[1];
        this.orgId = orgId;
      },
      //设置空值
      // setEmptyKey(value) {
      //   this.bankOriginalValue = value;
      //   this.bankCurrentValue = JSON.parse(JSON.stringify(this.bankOriginalValue));
      // },
      setEmpty(value,flag){
        if(flag === 'bank'){
          this.bankOriginalValue = value;
          this.bankCurrentValue = JSON.parse(JSON.stringify(this.bankOriginalValue));
        }else if(flag === 'bank-record'){
          this.bankRecordOriginalValue = value;
          this.bankRecordCurrentValue = JSON.parse(JSON.stringify(this.bankRecordOriginalValue));
        }else{
          // var tmp = value;
          // tmp.pk_fatherorg = '用友金融';
           this.originalValue = value;
           this.originalValue.enablestate = '2';
           this.originalValue.beanMap = this.beanMap;
          // this.originalValue.pk_org = this.fatherId;
          //this.$set(this.originalValue,'beanMap',this.beanMap);
          this.originalValue.pk_fatherorg = this.beanMaps.id;
          this.currentValue = JSON.parse(JSON.stringify(this.originalValue));
          console.log(this.currentValue);
        }       
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
        this.$http({
          url: '/ifbp-app-bd/bd/org/corp/',
          method: 'post',
          data: this.currentValue
        }).then((res) => {
          if (res.data.success === true) {
            this.isCreate = true;
            if (window.env === 'dev') {
              this.$message({
                message: '新增成功！',
                type: 'success'
              });
            }
            this.isEdit = false;
            this.$root.$router.push('/HR010003');
          } else {
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
      $('#main-right').find('div#organization_page').css('display', 'none');
      this.requestBankValues();
      var beanMaps = JSON.parse(localStorage.getItem('beanMap'));
      this.beanMaps = beanMaps;
      this.beanMap = {
        pk_fatherorg_ref: {
          'beanMaps.id': {
              code: beanMaps.code,
              name: beanMaps.name,
              id: beanMaps.id,
            }
        }
      };
      localStorage.clear();
    }
  };
</script>

<style scoped>
  .org-add{
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
  .bank-record{
    background-color: #ffffff;
    margin: 0 20px;
  }
  .child-title-left{
    margin-top:20px;
    margin-left:40px;
    font-size:18px;
  }
</style>
<style>
.org-add .el-table .cell, .el-table th>div{
  padding-right:0px;
}
</style>
