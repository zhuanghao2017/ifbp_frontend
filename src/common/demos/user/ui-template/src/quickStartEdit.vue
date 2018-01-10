<template>
    <el-dialog :title="editRowIndex > -1 ? '编辑修改' : '新增创建'" v-model="s_editFormVisible" size="small">
        <el-form-component :form="form" @onSubmit="onSubmit" @onCancel="onCancel"></el-form-component>
    </el-dialog>
</template>
<script>
  export default {
    data() {
      return {
        s_editFormVisible: false
      };
    },
    props: ['form', 'editFormVisible', 'editRowIndex'],
    methods: {
      onSubmit(data) {
        this.s_editFormVisible = false;
        this.$emit('onSubmit', data);
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
  };
</script>
<style>
    .line{
        text-align: center;
    }
</style>
