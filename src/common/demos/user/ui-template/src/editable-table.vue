<template>
<div>
  <el-table class="rule_table" :data="tableData" border :style="s_tableStyle">
    <el-table-column
      :prop="columns[0].param"
      :label="columns[0].name"
      :width="columns[0].width">
    </el-table-column>
    <el-table-column
      v-for="(item, index) in columns.slice(1)"
      :label="item.name"
      :width="item.width"
      :key="index">
      <template scope="scope">
        <div class="tdValue" @click.self="tdClick(scope, item.param, $event)">{{scope.row[item.param]}}</div>
        <el-search-select :value="value" :options="item.options" @selected="selected" style="display: none; position: relative;" v-if="item.options!==undefined"></el-search-select>
        <input type='text' id='_editable' @blur="inputBlur(scope, item, $event)" @keydown.enter.prevent="inputBlur(scope, item, $event)" :value="scope.row[item.param]">
      </template>
    </el-table-column>
  </el-table>
</div>
</template>
<script>
import _ from 'lodash';
export default {
  name: 'ElEditableTable',
  props: ['tableData', 'columns', 'tableStyle'],
  data() {
    return {
      value: '',
      s_tableStyle: {},
      selectVisible: false,
      copyTableData: [],
      changedValue: {
        id: -1,
        param: ''
      }
    };
  },
  methods: {
    setChangedValue(id, param) {
      this.changedValue.id = id;
      this.changedValue.param = param;
    },
    tdClick(scope, param, e) {
      const target = e.currentTarget;
      target.style.display = 'none';
      target.nextElementSibling.style.display = 'block';
      if (target.nextElementSibling.tagName === 'INPUT' || target.nextElementSibling.tagName === 'input') {
        e.target.nextElementSibling.focus();
      } else {
        const inputs = e.target.nextElementSibling.getElementsByTagName('input');
        if (inputs.length > 0) {
          inputs[0].focus();
        }
      }
      this.selectVisible = true;
      this.value = scope.row[param];
      this.setChangedValue(scope.row.id, param);
    },
    inputBlur(scope, item, e) {
      var target = e.target;
      target.style.display = 'none';
      target.previousElementSibling.style.display = 'block';
      // scope.row[item.param] = target.value;
      this.emitChange(target.value);
    },
    /*eslint no-param-reassign: ["error", { "props": false }]*/
    selected(selectedOption, el) {
      el.style.display = 'none';
      el.previousElementSibling.style.display = 'block';
      this.emitChange(selectedOption);
    },
    emitChange(val) {
      this.$emit('onChange', this.changedValue.id, this.changedValue.param, val);
    }
    /* eslint-enable */
  },
  created() {
    if (this.tableStyle !== undefined) {
      _.assign(this.s_tableStyle, this.tableStyle);
    }
    this.copyTableData = _.cloneDeep(this.tableData);
  }
};
</script>
<style>
.rule_table {
  overflow: visible!important;
}
.rule_table.el-table .cell{
  overflow: visible!important;
}
.rule_table.el-table .el-table__body-wrapper{
  overflow: visible!important;
}
td .cell{ position: relative; }
#_editable{border: 1px solid #bfcbd9;outline: none;height:100%;width:100%;box-sizing:border-box; height:28px;font-size:12px;border-radius:4px;display:none}
</style>
