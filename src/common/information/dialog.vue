<template>
  <div class="dialog">
      <div>
        <el-dialog title="添加/修改" v-model="dialogVisible" size="tiny">
          <el-form-component :form="form" @onSubmit="onSubmit" @onCancel="onCancel"></el-form-component>
        </el-dialog>
        <el-dialog v-model="dialogTitle" size="tiny">
          <span>{{hini}}</span> 
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogTitle = false">取 消</el-button>
            <el-button type="primary" @click="dialogTitle = false;hini='请选择要操作的项！'">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <span class="mainInfor">{{this.tableInfors.titleInfor}}</span>
      <div class="buttons">
          <el-button-group class="groups">
            <el-button type="button" @click="updateInfor">修改</el-button>
            <el-button @click="deleteInfor">删除</el-button>
            <el-button @click="stopUseInfor">停用</el-button>
            <el-button @click="startUseInfor">启用</el-button>
          </el-button-group>
          <el-button type="primary" class="newAdd" @click="addInfor">新增</el-button>
      </div>
      <div class="topList">
        <el-table
          :data="tableInfors.tableData"
          border
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange" >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            v-for="item in (tableInfors.columns)"
            :prop="item.flag"
            :label="item.label"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>
  </div>
</template>
<script>
//import formComponent from './form-component/src/form-component.vue';
  export default{
    data(){
      return{
        isUpdate:false,
        current:"",
        hini:"请选择要操作的项！",
        index:'',
        item:{},
        cloneTableInfors:[],
        dialogVisible: false,
        dialogTitle:false,
        multipleSelection: [],
        form: {
          formData: [
            { key: 'inputCode', value: '' },
            { key: 'inputName', value: '' },
            { key: 'inputSort', value: '' },
          ],
          settingData: [
            {
              label: '维度编码',            // 左边字段名
              el: 'input',                 // 右边元素
              type: 'string',              // input时的元素类型
              prepend: '',                // input时内部左边的文字
              placeholder: '请输入',       // 默认显示提示信息
              required: true,              // 是否必填
            },
            {
              label: '维度名称',  // 左边字段名
              el: 'input',                // 右边元素
              type: 'string',             // input时的元素类型
              prepend: '',               // input时内部左边的文字
              placeholder: '请输入',      // 默认显示提示信息
              required: true,             // 是否必填
            },
            {
              label: '维度分类',  // 左边字段名
              el: 'input',                // 右边元素
              type: 'string',             // input时的元素类型
              prepend: '',              // input时内部左边的文字
              placeholder: '请输入',      // 默认显示提示信息
              required: true,             // 是否必填
            },
          ],
          // formStyle 可选
          formStyle: {
            simpleColumn: false,         // 是否按单列显示，false表示按两列显示
            showButtons: true, // 是否显示底部保存和取消按钮，false表示不显示保存取消按钮
            styleObject: {      // 自定义form表单的样式
              width: '500px',
              margin: '0 auto',
            },
          },
        }
      };
    },
    methods: {
      //选择项目
      handleSelectionChange(val) {
        this.current=JSON.stringify(val);
        this.multipleSelection = val;
      },
      //弹出框取消按钮
      onCancel(){
        this.dialogVisible=false;
      },
      //弹出框确定按钮
      onSubmit() {
        this.referInfor();
      },
      findIndex(){
          const that=this;
          /* eslint-disable */
          let cid=JSON.parse(this.current)[0]['id'];
          this.tableInfors.tableData.map(function(item,index){
            if(item.id===cid){
                that.item=item;
                that.index=index;
            }
            return 1;
          });
          /* eslint-enable */
           return cid;
      },
      //删除按钮
      deleteInfor(){
        if(this.multipleSelection.length){
            const cid=this.findIndex();
            this.$emit('deleteInfor',cid);
        }else{
          this.dialogTitle=true;
        }
      },
      //停用按钮
      stopUseInfor(){
        if(this.multipleSelection.length){
            this.findIndex();
            this.item.state="停用";  
        }else{
          this.dialogTitle=true;
        }
      },
      //启用按钮
      startUseInfor(){
        if(this.multipleSelection.length){
            this.findIndex();
            this.item.state="启用";  
        }else{
          this.dialogTitle=true;
        }
      },
      //新增按钮弹出对话框
      addInfor(){
          if(!this.multipleSelection.length){
            this.dialogVisible=true;
          }else{
            return 1;
          }
          return 1;
      },
      //修改按钮弹出对话框
      updateInfor(){
       if(!this.multipleSelection.length){
          this.dialogTitle=true;
        }else{
          const that=this;
         /* eslint-disable */
          let cid=JSON.parse(this.current)[0]['id'];
          this.tableInfors.tableData.map(function(item){
            if(item.id===cid){
              that.form.formData[0].value=item.code;
              that.form.formData[1].value=item.name;
              that.form.formData[2].value=item.assort;
            }
           return 1;
         });
          /* eslint-enable */
          this.dialogVisible=true;
        }
      },
      //弹出框确定按钮判断插入还是修改
      referInfor(){
        if(!this.multipleSelection.length){
            if(this.form.formData[0].value
              &&this.form.formData[1].value
              &&this.form.formData[2].value){
              const id=+new Date();
              const flag=1;
              const cid=0;
              const tInfor=this.tableInfors.titleInfor;
              const addInfor={
                id:id,
                code: this.form.formData[0].value,
                name: this.form.formData[1].value,
                assort:this.form.formData[2].value,
                state:"启用"
              };
              this.$emit('updateInfor',tInfor,addInfor,flag,cid);
            }else{
              this.hini="信息未填完整,请重新填写！";
              this.dialogTitle=true;
            }
        }else{
              const flag=2;
              const tInfor=this.tableInfors.titleInfor;
              const cid=this.findIndex();
              const addInfor={
                code: this.form.formData[0].value,
                name: this.form.formData[1].value,
                assort:this.form.formData[2].value
              };
              this.$emit('updateInfor',tInfor,addInfor,flag,cid);
        }
        this.dialogVisible=false;
      },
    },
    props:['tableInfors'],
  };
</script>
<style></style>
