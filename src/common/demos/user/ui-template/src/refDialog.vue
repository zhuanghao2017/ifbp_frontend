<template>
  <div class='container'>
  <el-input
  :placeholder="data.describe"
  v-model="value"
  v-show="true"
  size="small"
  v-bind:style="{width:data.width,display:'inline-block'}"
  :id="data.fieldId"
  :width="data.width"
  @click.native="showDialog"
  :readonly="true">
  </el-input>
	<refDialog 
  :dialogVisible="dialogVisible"
	treeDc="/tree.json"
	children="children"
          label="label"
          tableDc="/table.json"></refDialog>
  </div>
</template>
<script>

import refDialog from './ref';

export default {
  data() {
    return {
      data: {},
      value: '参照',
      dialogVisible: false
    };
  },
  components: {
    refDialog
  },
  methods: {
    showDialog: function() {
      console.log('showDialog');
      /* this.dialogVisible=false;
      this.$nextTick(() => {
        this.dialogVisible=true;
      });*/
      this.dialogVisible = true;
    }
  },
  created: function() {
    this.$on('closeDialog', () => {
      console.log('trigger');
      this.dialogVisible = false;
    });
  }
  // props:['data']
};
</script>
