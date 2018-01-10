<template>
  <el-select v-if="isEdit" v-model="templateValue[code]" placeholder="请选择">
    <el-option
      v-for="item in data.options"
      :label="item.name"
      :value="item.selectKey">
    </el-option>
  </el-select>
  <span
  class="label"
  v-else>
  {{label}}
  </span>
</template>

<script>
  export default {
    data() {     
      var code = this.data.itemCode ? this.data.itemCode.split('.').pop() : '';
      return {
        code:code
      };
    },
    computed: {
      label(){
        var tmp;
        for(var i=0;i<this.data.options.length;i++) {
          if(this.data.options[i].selectKey === this.templateValue[this.code]){
            tmp = this.data.options[i].name;
            break;
          }
        }
        return tmp;
      }
    },
    props: ['data', 'templateValue','isEdit'],
    created(){

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
