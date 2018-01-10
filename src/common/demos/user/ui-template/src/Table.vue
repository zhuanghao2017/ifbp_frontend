<template>
  <table :style="{width:tableWidth+'px',overflow:'scroll'}">
    <tbody>
      <tr v-for="rowItems in table">
        <td v-for="item in rowItems" v-if="item.isDisplay===true" style="width:250px">
          <fieldset :fieldname="item.fieldId">
          <div v-if="item.titleLayout==='field-hoz'" class="billitem-label-content norequired-div-hoz" :title="item.title" style="display:inline-block">
            <label class="label-hoz"  :for="item.fieldId" v-bind:style="{height:'36px'}">
              
               {{item.title}}
              
              <span>:</span>
            </label>
            </div>
            <div v-else class="billitem-label-content norequired-div-vertical" :title="item.title" style="display:block">
            <label  :for="item.fieldId" v-bind:style="{height:'36px'}">
              
               {{item.title}}
              
              <span>:</span>
            </label>
            </div>
            <div style="width:50%;display:inline-block"><div @change="change" :isEdit="isEdit" :is="map[item.componentKey]" :data="item" :templateValue="templateValue"></div></div>
          </fieldset>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import select from './Select';
import input from './Input';
import datepicker from './Datepicker';
import ref from './refDialog';
export default{
    data() {
      // var display=this.data.titleLayout==='field-hoz'?'block':'inline-block';
      return {
        display: 'block',
        map: {
          Select: 'yon-select',
          Label: 'yon-label',
          Text: 'yon-input',
          Money: 'yon-input',
          NumberComponent: 'yon-input',
          TextArea: 'yon-input',
          DateComponent: 'yon-datepicker',
          ImageComponent: 'yon-image',
          Reference: 'yon-ref'
        }
      };
    },
    props: ['data', 'templateValue','isEdit'],
    methods: {
        removeBlank: function() {
            var table = [];
            var maxcols = 0;
            var tmp = [];
            var dump = '';
            var count = 0;
            for (var row = 0;row < this.data.rows;row++) {
                for (var col = 0;col < this.data.cols;col++) {
                    count = row * this.data.cols;
                    dump = this.data.layoutDetail[count + col].layoutDetail;
                    if (dump.length > 0) {
                      tmp.push(dump[0]);
                    }
                }
                if (tmp.length > 0) {
                   table.push(tmp);
                   if (tmp.length > maxcols) {
                     maxcols = tmp.length;
                   }
                   tmp = []; 
                }
            }
            this.maxcols = maxcols;
            return table;
        },
        change: function(index, value) {
            this.$emit('change', index, value);
        }
    },
    components: {
      'yon-select': select,
      'yon-input': input,
      'yon-datepicker': datepicker,
      'yon-ref': ref
    },
    created() {
      this.table = this.removeBlank();
      this.tableWidth = 250 * this.maxcols;
    }
};
</script>
<style scoped>
.norequired-div-vertical {
    max-width: 170px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.norequired-div-hoz {
    max-width: 118px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    float: left;
}
label {
    color: #48576a;
    padding-left: 10px;
}
.label-hoz {
    width: 135px;
    text-align: right;
    padding-top: 4px;
    vertical-align: middle;
}
.el-date-editor.el-input {
    width: 100%;
}
</style>
