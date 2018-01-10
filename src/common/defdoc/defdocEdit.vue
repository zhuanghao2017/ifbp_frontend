<template>
 <div>
  <el-dialog :title="editRowIndex > -1 ? '修改自定义档案分类' : '新增自定义档案分类'" v-model="s_editFormVisible" size="tiny">
    <el-form ref="formData" :model="formData" :rules="rules" label-width="100px">
      <el-form-item label="编码" prop="type_code">
        <el-input v-model="formData.type_code"></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="type_name">
        <el-input v-model="formData.type_name"></el-input>
      </el-form-item>
      <el-form-item label="业务编码" prop="bu_id">
        <el-input v-model="formData.bu_id"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="type_desc">
        <el-input type="textarea" v-model="formData.type_desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">完成</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
 </div>
</template>
<script>
export default {
    name: 'editForm',
    data() {
      return {
        rules:{
          type_code:[
            {required: true, message: '请输入编码', trigger: 'blur' },
            {max: 30, message: '长度最多 30 个字符', trigger: 'blur' }
          ],
          type_name:[
            {required: true, message: '请输入名称', trigger: 'blur' },
            {max: 200, message: '长度最多 200 个字符', trigger: 'blur' }
          ],
          type_desc:[
            {max: 500, message: '长度最多 500 个字符', trigger: 'blur' }
          ]
        },
        s_editFormVisible: false
      };
    },
    props: ['formData','editFormVisible', 'editRowIndex'],
    methods: {
      onSubmit() {
        this.$refs.formData.validate((valid) => {
          if (valid) {
            this.s_editFormVisible = false;

            var url = '/ifbp-app-sm-defdoc-web/defdoclist/create';
            if(this.formData.id){
              url = '/ifbp-app-sm-defdoc-web/defdoclist/update';
            }
            this.$http({
              url: url,
              method: 'post',
              data: this.formData,
              dataType: 'json',
            }).then((res) => {
              if (res) {
                if(res.data.success){
                  this.formData = res.data.data;
                  this.$emit('onSubmit', this.formData);
                }else{
                  this.$message({
                    message: res.data.error.errorMessage,
                    type: 'error'
                  });
                }

              }
            }).catch(() => {
              this.$message({
                message: '保存失败',
                type: 'error'
              });
            });
          }
        });
      },
      onCancel() {
        this.s_editFormVisible = false;
      },
    },

    watch: {
      editFormVisible: function(value) {
        this.s_editFormVisible = value;
      },
      s_editFormVisible: function(value) {
        this.$emit('changeVisible', value);
      },
    },
    created: function() {

    },

};
</script>
<style>

</style>
