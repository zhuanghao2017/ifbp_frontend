<template>
  <div class="list-panel">
    <div>
      <div class="title-header">
        <h2 class="name">参数定义</h2>
      </div>
      <div style="margin-top: 10px;overflow: hidden;">
        <div class="contentList fl">
          <div class="btnList">
            <div class="leftBtns">
              <el-button type="primary" class="saveBtn" @click="submitForm('ruleForm')" v-if="!this.thatShow.isShow">保存</el-button>
              <el-button type="primary" class="cancelBtn" @click="resetForm('ruleForm')" v-if="!this.thatShow.isShow">取消</el-button>
              <el-button type="primary" class="cancelBtn" @click="modification()" v-if="this.thatShow.isShow">修改</el-button>
            </div>
            <el-button type="primary" @click="goBack" class="addBtn">返回</el-button>
          </div>
        </div>
      </div>
    </div>
    <div style="position: relative; width: 100%; background: #fff;margin-top: 10px;border: 1px solid transparent">
      <div class="formList">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="所属模块" prop="module">
              <div>{{this.thatShow.search.categories}}</div>
              <!-- <el-input v-model="ruleForm.module" v-if="!this.thatShow.isShow"></el-input> -->
            </el-form-item>
            <el-form-item label="参数编码" prop="parameterCoding">
              <div v-if="this.thatShow.isShow">{{this.thatShow.search.parameterCoding}}</div>
              <el-input v-model="ruleForm.parameterCoding" v-if="!this.thatShow.isShow"></el-input>
            </el-form-item>
             <el-form-item label="参数名称" prop="parameterName">
              <div v-if="this.thatShow.isShow">{{this.thatShow.search.parameterName}}</div>
              <el-input v-model="ruleForm.parameterName" v-if="!this.thatShow.isShow"></el-input>
            </el-form-item>
             <el-form-item label="参数类型" prop="parameterType">
                <div v-if="this.thatShow.isShow">{{this.thatShow.search.parameterType}}</div>
                <el-radio-group v-model="ruleForm.parameterType" v-if="!this.thatShow.isShow" @change="radioTypeChange">
                  <el-radio label="枚举"></el-radio>
                  <el-radio label="文本"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="取值范围" prop="valueRange">
              <div v-if="this.thatShow.isShow">{{this.thatShow.search.valueRange}}</div>
              <el-input v-model="ruleForm.valueRange" v-if="!this.thatShow.isShow" :placeholder="showPlaceholder"></el-input>
            </el-form-item>
             <el-form-item label="参数值" prop="parameterValues">
              <div v-if="this.thatShow.isShow">{{this.thatShow.search.parameterValues}}</div>
              <el-input v-model="ruleForm.parameterValues" v-if="!this.thatShow.isShow"></el-input>
            </el-form-item>
            <el-form-item label="是否显示" prop="isShow">
              <div v-if="this.thatShow.isShow">{{this.thatShow.search.isShow}}</div>
              <el-select v-model="ruleForm.isShow" placeholder="请选择" v-if="!this.thatShow.isShow">
                <el-option label="是" value="是"></el-option>
                <el-option label="否" value="否"></el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="备注" prop="remark">
                <div v-if="this.thatShow.isShow">{{this.thatShow.search.remark}}</div>
                <el-input type="textarea" v-model="ruleForm.remark" v-if="!this.thatShow.isShow"></el-input>
            </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
     components: {

     },
    data(){
      // var validType = (rule,value,callback) => {
      //   if(value === ''){
      //     callback(new Error('请输入取值范围'));
      //   }
      //   // else if (value.split('，').length === 0){
      //   //   callback(new Error('枚举类型需要以“，”分割'));
      //   // } else{
      //   //   callback();
      //   // }      
      // };
      return {
        typeRadio: '枚举',
        showPlaceholder:'枚举类型以“,”分割。例：是,否',
        data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        ruleForm: {
          module: "",
          parameterCoding: "",
          parameterName: "",
          parameterType: "枚举",
          valueRange: "",
          parameterValues: "",
          isShow: "是",
          remark: ""
        },
       
        rules: {
          module: [
            { message: '请输入活动名称', trigger: 'blur' },
          ],
          parameterCoding: [
            { required: true, message: '请输入参数编码', trigger: 'blur' },
          ],
          parameterName: [
            { required: true, message: '请输入参数规则', trigger: 'blur' },
          ],
          parameterType: [
            { required: true, message: '请选择参数类型', trigger: 'change' }
          ],
          // valueRange: [
          //   { required: true, validator: validType, trigger: 'blur'}
          // ],
          parameterValues: [
            { required: true, message: '请输入参数值', trigger: 'blur' },
          ],
          isShow: [
            { required: true, message: '请选择是否', trigger: 'change' }
          ],
        }
      };
    },
    created(){
      // alert(1)
    },
    mounted(){

    },
    props: ['thatShow'],
    methods: {
      radioTypeChange() {
        if(this.ruleForm.parameterType === '枚举'){
          this.showPlaceholder = '枚举类型值之间以“,”分割。例：是,否';
        } else{
          this.showPlaceholder = '请输入文本格式的参数范围';
        }
      },
      getCheckedNodes() {
        console.log(this.$refs.tree.getCheckedNodes());
      },
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys());
      },
      setCheckedNodes() {
        this.$refs.tree.setCheckedNodes([{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 9,
          label: '三级 1-1-1'
        }]);
      },
      setCheckedKeys() {
        this.$refs.tree.setCheckedKeys([3]);
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      },
      goBack(){
        console.log(this.thatShow);
        this.$emit('curShow','false');
        this.ruleForm = {
          module: "",
          parameterCoding: "",
          parameterName: "",
          parameterType: "枚举",
          valueRange: "",
          parameterValues: "",
          isShow: "是",
          remark: ""
        };
        this.$http({
              url: '/ifbp-app-sm/sm/paratemp/pageList?pn=&ps=&search_app_code='+this.thatShow.search.app_code,
              method: 'get',
              dataType: 'json'
            }).then((res) => {
              if(res.data.success === true){
                var addBackData = res.data.data.content;
                this.$emit('addBackData',addBackData);
              }
            }).catch(() => {
              that.$message({
                message: '列表获取失败',
                type: 'error'
              });
            });
      },
      submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // var type = this.ruleForm.parameterType;
              // var value = this.ruleForm.valueRange;
              // var isRightTypeValue = false;
              // debugger;
              // if(type === '枚举' && value.split(',').length === 0){
              //   this.$message('枚举类型需要以“，”分割');
              //   isRightTypeValue = false;
              // } else if(type === '文本') {
              //   isRightTypeValue = true;
              // }
              if(!this.thatShow.add){
                  this.$http({
                    url: '/ifbp-app-sm/sm/paratemp/add',
                    method: 'post',
                    data: {
                  initcode:this.ruleForm.parameterCoding,
                  initname:this.ruleForm.parameterName,
                  paratype:this.ruleForm.parameterType,
                  valuelist:this.ruleForm.valueRange,
                  value:this.ruleForm.parameterValues,
                  showflag:this.ruleForm.isShow,
                  remark:this.ruleForm.remark,
                  app_code:this.thatShow.search.app_code
                 },
                  }).then((res) => {
                    if(res.data.success === true){
                      this.$message({
                      message: '添加成功',
                      type: 'success'
                    });
                    this.thatShow.isShow = true;
                    } else {
                      this.$message({
                        message: res.data.error.errorMessage,
                        type: 'error'
                      });
                      this.thatShow.isShow = false;
                    }

                  }).catch(() => {
                    this.$message({
                      message: 'Network error',
                      type: 'error'
                    });
                    this.thatShow.isShow = false;
                  });
                }else{
                  // var serachobj=
                  // console.log(serachobj);
                  this.$http({
                    url: '/ifbp-app-sm/sm/paratemp/modify',
                    method: 'put',
                    data: {
                    pk_sysinittemp:this.thatShow.search.pk_sysinittemp,
                    initcode:this.ruleForm.parameterCoding,
                    initname:this.ruleForm.parameterName,
                    paratype:this.ruleForm.parameterType,
                    valuelist:this.ruleForm.valueRange,
                    value:this.ruleForm.parameterValues,
                    showflag:this.ruleForm.isShow,
                    remark:this.ruleForm.remark,
                    app_code:this.thatShow.search.app_code
                  },
                  }).then((res) => {
                    console.log(res);
                    if(res.data.success === true){
                      this.$message({
                      message: '修改成功',
                      type: 'success'
                    });
                    this.thatShow.isShow = true;
                    }
                  }).catch(() => {
                    this.$message({
                      message: 'Network error',
                      type: 'error'
                    });
                    this.thatShow.isShow = false;
                  });
                }
            // this.thatShow.search.categories=this.ruleForm.module;
            this.thatShow.search.parameterCoding=this.ruleForm.parameterCoding;
            this.thatShow.search.parameterName=this.ruleForm.parameterName;
            this.thatShow.search.parameterType=this.ruleForm.parameterType;
            this.thatShow.search.valueRange=this.ruleForm.valueRange;
            this.thatShow.search.parameterValues=this.ruleForm.parameterValues;
            this.thatShow.search.isShow=this.ruleForm.isShow;
            this.thatShow.search.remark=this.ruleForm.remark;
          } else {
            console.log('error submit!!');
            return false;
          }
          return true;
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      modification(){
        // if(!this.ruleForm.module){
          this.ruleForm.module=this.thatShow.search.categories;
          this.ruleForm.parameterCoding=this.thatShow.search.parameterCoding;
          this.ruleForm.parameterName=this.thatShow.search.parameterName;
          this.ruleForm.parameterType=this.thatShow.search.parameterType;
          this.ruleForm.valueRange=this.thatShow.search.valueRange;
          this.ruleForm.parameterValues=this.thatShow.search.parameterValues;
          this.ruleForm.isShow=this.thatShow.search.isShow;
          this.ruleForm.remark=this.thatShow.search.remark;
        // }
        this.thatShow.isShow=false;
      }
    }
  };
</script>
<style scoped>
  #search-container{
    height: 56px;
    padding: 10px 20px;
    background-color: #ffffff;
    border-bottom: 1px solid #e3e3e3;
  }
  .contentList{
    width: 100%;
  }
  .btnList{
    height: 46px;
    background: #fff;
    position: relative;
  }
  .addBtn{
    height: 40px;
    position: absolute;
    right: 12px;
    top: 50%;
    margin-top: -20px;
  }
  .formList{
    width: 60%;
    margin-top: 20px;
    margin-left: 10%;
  }
  .el-input{
    width: 50%;
  }
  .el-textarea{
    width: 50%;
  }
  .leftBtns{
    height: 40px;
    position: absolute;
    left: 12px;
    top: 50%;
    margin-top: -20px;
  }
</style>
