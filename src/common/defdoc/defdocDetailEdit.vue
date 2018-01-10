<template>
 <div>
  <el-dialog :title="editRowIndex > -1 ? '修改自定义档案' : '新增自定义档案'" v-model="s_editFormVisible" size="tiny">
    <el-template  :pkTemp="pk_temp"
                  ref="formData"
                  :rules= "rules"
                  :hideTitle="true"
                  :isEdit="true"
                  :refQueryParams="refQueryParams"
                  :templateValue="formData">
    </el-template>
    <el-button-group>
      <el-button type="primary" @click="onSubmit">完成</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-button-group>
  </el-dialog>
 </div>
</template>
<script>
export default {
    name: 'editForm',
    data() {
      return {
        hrPath: '/hrsrv',
        pk_temp: '17b1ef3b-bfd8-4426-a47a-cba3b2f30897',
        rules:{
          doc_code:[
            {required: true, message: '请输入编码', trigger: 'blur' },
            {max: 50, message: '长度最多 50 个字符', trigger: 'blur' }
          ],
          doc_name:[
            {required: true, message: '请输入名称', trigger: 'blur' },
            {max: 200, message: '长度最多 200 个字符', trigger: 'blur' }
          ],
          shortname:[
            {max: 200, message: '长度最多 200 个字符', trigger: 'blur' }
          ],
          doc_desc:[
            {max: 500, message: '长度最多 500 个字符', trigger: 'blur' }
          ]
        },
        s_editFormVisible: false
      };
    },
    props: ['formData','editFormVisible', 'editRowIndex', 'refQueryParams'],
    methods: {
      onSubmit() {
        this.$refs.formData.validate((valid) => {
          if (valid) {
            this.s_editFormVisible = false;
            var url = '/ifbp-app-sm-defdoc-web/defdoc/create';
            if(this.formData.id){
              url = '/ifbp-app-sm-defdoc-web/defdoc/update';
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

