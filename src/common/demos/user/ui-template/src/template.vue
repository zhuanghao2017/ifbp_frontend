<template>
  <div>
    <div class="title">{{forms.name?forms.name:forms.title}}</div>
    <yon-form @change="change" v-if="forms!=''" :isEdit="isEdit" v-for="form in formLayout" :data="form" :templateValue="templateValue"></yon-form>
  </div>
</template>

<script>

import form from './Form';
// import testData from './test.json';


/* eslint-disable no-new */
export default{
  name: 'ElTemplate',
  data() {
    return {
          forms: '',
          formLayout: ''
        };
  },
  methods: {
    parseColumnPanel: function(data) {
      var compts = [];
      var row = [];
      console.log(data);
      var layoutDetail;
      if(data.formLayout) {
        layoutDetail = data.formLayout.layoutDetail.layoutDetail;
      }else{
        layoutDetail = data.layoutDetail;
      }
      for (var i = 0;i < layoutDetail.length;i++) {
        if (layoutDetail[i].componentKey !== 'ColumnPanel') {
          row.push(layoutDetail[i]);
        } else {
          for (var j = 0;j < layoutDetail[i].layoutDetail.length;j++) {
            var tmp = layoutDetail[i].layoutDetail[j];
            while (tmp && (tmp.componentKey === 'ColumnPanel')) {
              tmp = tmp.layoutDetail[0];
            }
            if (tmp) {
              row.push(tmp);
            }
          }
        }
        compts.push({layoutDetail: row});
        row = [];
      }
      console.log(compts);
      return compts;
    },
    //  setValue: function(data) {
    //    this.templateValue = data;
    //  },
    // getValue: function() {
    //   return JSON.parse(JSON.stringify(this.templateValue));
    // },
    change: function(index, value) {
      console.log('change');
      this.$emit('change', index, value);
      //this.templateValue[index] = value;
    }
  },
  created: function() {
    var data = this.data;
    //var data = testData;
    this.formLayout = this.parseColumnPanel(data);
    this.forms = data.form ? data.form : data;
  },
  components: {
    'yon-form': form
  },
  props: ['data','isEdit', 'templateValue']
};
</script>

<style>
.title{
  text-align: center;
  font-size: 30px;
  padding-bottom: 20px;
  padding-top: 20px;
}
</style>

