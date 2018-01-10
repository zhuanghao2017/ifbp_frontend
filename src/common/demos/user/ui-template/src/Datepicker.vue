<template>
  <el-date-picker
      v-model="value"
      type="date"
      :placeholder="holder"
      :format="format"
      @change="changeHandle"
      :picker-options="pickerOptions0">
  </el-date-picker>
</template>

<script>
  export default {
    data() {
      var holder = '年-月-日'; // this.data.format=='YYYY-MM-DD'?
      return {
        holder: holder,
        format: '',
        pickerOptions0: {},
        value: ''
      };
    },
    methods:{
      changeHandle(v){
        this.value = v;
      }
    },
    props: ['data','templateValue','isEdit']
  };
</script>
