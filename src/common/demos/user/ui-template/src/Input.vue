<template>
<el-input
  v-if="isEdit"
  :placeholder="data.describe"
  :type="type"
  v-model="templateValue[code]"
  v-show="data.isDisplay==true"
  @keyup.native="handleInput"
  size="small"
  v-bind:style="{width:data.width,display:'inline-block'}"
  :id="data.fieldId"
  :width='data.width'
  :readonly="data.readOnly">
</el-input>
<span
  class="label"
  v-else>
  {{templateValue[code]}}
</span>
</template>
<script>
export default {
  data() {
    var code = this.data.itemCode ? this.data.itemCode.split('.').pop() : '';
    console.log(code,this.templateValue);
    return {
      type: this.data.componentKey === 'TextArea' ? 'textarea' : 'text',
      code: code
    };
  },
  props: ['data', 'templateValue','isEdit'],
  methods: {
    handleInput: function() {
      var value = this.templateValue[this.code];
      if (this.data.componentKey === 'NumberComponent') {
        value = value.split('').filter(v => !(v > '9' || v < '0')).join('');
      }
      this.$emit('change', this.code, value);
    }
  },
  // watch:{
  //   code(a,b){
  //     console.log(a,b);
  //     this.value = this.templateValue[this.code];
  //   }
  // },
  created: function() {
    
  }
};
</script>
<style scoped>
  span.label{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
</style>
