<template>
 <el-row>
    <el-form :model="data2" :label-width="labelWidth" :inline="true">
      <el-form-item v-for="layout in data2.layoutDetail"  :label="layout.componentKey!=='GroupTable'? layout.title:''" v-if="layout.isDisplay">
        <div @change="change" :is="map[layout.componentKey]" :isEdit="isEdit" :data="layout" :templateValue="templateValue"></div>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
import select from './Select';
import input from './Input' ;
import datepicker from './Datepicker';
import table from './Table';
import ref from './refDialog';
import grid from './grid';

export default {
  name:'tplForm',
  data() {
    var width = '200px';
    var isInline = true;
        
    return {
      labelWidth: width,
      isInline: isInline,
      map: {
        Select: 'yon-select',
        Text: 'yon-input',
        Money: 'yon-input',
        NumberComponent: 'yon-input',
        TextArea: 'yon-input',
        DateComponent: 'yon-datepicker',
        TableLayout: 'yon-table',
        ImageComponent: 'yon-image',
        Reference: 'yon-ref',
        //Grid: 'tplForm',
        Grid: 'yon-grid',
        DataTable: 'tplForm',
        GroupTable: 'ElTemplate'
      }
    };
  },
  methods: {
    change: function(index, value) {
      this.$emit('change', index, value);
    }
  },
  computed: {
    data2: function() {
      console.log(this.data);
      return this.data;
    }
  },
  props: ['data', 'templateValue','isEdit'],
  components: {
    'yon-select': select,
    'yon-input': input,
    // 'yon-label':label,
    'yon-datepicker': datepicker,
    'yon-table': table,
    'yon-ref': ref,
    'yon-grid': grid
  }
};

</script>

