<template>
  <el-form :model="formData" class="basicParamConfigForm">
    <div class="formTitle font_default"><span>基础参数配置</span></div>
    <div class="formBody">
      <el-row class="row">
        <el-col :span="6">
          <label class="font_default">1. <span style="color: red">*</span> 收款提醒通知提前天数(天)</label>
        </el-col>
        <el-col :span="12">
          <el-input type="number" min="0" v-model="formData.adRemindDays"></el-input>
        </el-col>
      </el-row>
      <el-row class="row" >
        <el-col :span="6">
          <label class="font_default">2. <span style="color: red">*</span> 客户还款宽限期(天)</label>
        </el-col>
        <el-col :span="12">
          <el-input type="number" min="0" v-model="formData.gracePeriod"></el-input>
        </el-col>
      </el-row>
      <el-row class="row" >
        <el-col :span="6">
          <label class="font_default">3. <span style="color: red">*</span> 是否启用客户经理数据权限</label>
        </el-col>
        <el-col :span="12">
          <el-radio v-model="formData.permission" :label="1">是</el-radio>
          <el-radio v-model="formData.permission" :label="0">否</el-radio>
        </el-col>
      </el-row>
      <el-row class="row" >
        <el-col :span="6">
          <label class="font_default">4. <span style="color: red">*</span> 资产风险分类规则</label>
        </el-col>
      </el-row>
      <el-row class="row" >
        <el-col :offset="1">
          <el-editable-table :tableData="formData.tableData" :columns="columns" :tableStyle="{width:'693px'}" @onChange="onChange"></el-editable-table>
        </el-col>
      </el-row>
      <el-row class="row" >
        <el-col :span="6">
          <label class="font_default">5. <span style="color: red">*</span> 收付款财务审批角色</label>
        </el-col>
        <el-col :span="12">
          <el-input v-model="formData.role"></el-input>
        </el-col>
      </el-row>
      <el-row class="row" >
        <el-col :span="6">
          <label class="font_default">6. <span style="color: red">*</span> 逾期罚息日利率(%)</label>
        </el-col>
        <el-col :span="12">
          <el-input  type="number" min="0" v-model="formData.dayRate"></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="dashed"><img src="../../assets/images/border_dashed.png"></div>
    <div class="formFooter">
      <el-button size="large" @click="onSubmit" type="success">保存</el-button>
      <el-button size="large" type="success" :plain="true">取消</el-button>
    </div>
  </el-form>

</template>
<script>
export default {
  data(){
    return {
      formData: {
        adRemindDays: '', // 收款提醒通知提前天数(天)
        gracePeriod: '', // 客户还款宽限期(天)
        permission: 1, // 是否启用客户经理数据权限
        role: '', // 收付款财务审批角色
        dayRate: '', // 逾期罚息日利率(%)
        tableData: [ // 表格的数据
          {
            id: 0,
            type: '正常类',
            minOverdue: '3',
            maxOverdue: '4',
            notes: '通过',
          },
          {
            id: 1,
            type: '关注类',
            minOverdue: '2',
            maxOverdue: '6',
            notes: '批准',
          },
          {
            id: 2,
            type: '次级类',
            minOverdue: '2',
            maxOverdue: '5',
            notes: '待定',
          }
        ]
      },
      columns: [ // 表格每列的表头信息
        {
          param: 'type',
          name: '资产风险分类',
          width: 140,
        },
        {
          param: 'minOverdue',
          name: '逾期天数最小值（含）',
          width: 160,
          options: [
            {
              value: '1',
              label: '1',
            },
            {
              value: '2',
              label: '2',
            },
            {
              value: '3',
              label: '3',
            },
            {
              value: '4',
              label: '4',
            },
            {
              value: '5',
              label: '5',
            },
            {
              value: '6',
              label: '6',
            },
            {
              value: '7',
              label: '7',
            },
            {
              value: '8',
              label: '8',
            },
            {
              value: '9',
              label: '9',
            }
          ],
        },
        {
          param: 'maxOverdue',
          name: '逾期天数最大值（含）',
          width: 160,
          options: [
            {
              value: '1',
              label: '1',
            },
            {
              value: '2',
              label: '2',
            },
            {
              value: '3',
              label: '3',
            },
            {
              value: '4',
              label: '4',
            },
            {
              value: '5',
              label: '5',
            },
            {
              value: '6',
              label: '6',
            },
            {
              value: '7',
              label: '7',
            },
            {
              value: '8',
              label: '8',
            },
            {
              value: '9',
              label: '9',
            }
          ],
        },
        {
          param: 'notes',
          name: '备注',
          width: 231,
        },
      ],
    };
  },
  methods: {
    onSubmit() {
      alert('submit!');
      console.log(this.formData);
    },
    onCancel() {
      alert('submit!');
    },
    onChange(id, param, val) {
      const row = this.getRowById(id);
      if(typeof val === 'object'){
        row[param] = val.label;
      }else {
        row[param] = val;
      }
    },
    getRowById(id) {
      let row = {};
      for(let i = 0; i < this.formData.tableData.length; i++){
        if(this.formData.tableData[i].id === id){
          row = this.formData.tableData[i];
        }
      }
      return row;
    },
  },
};
</script>
<style>
.basicParamConfigForm{ position: relative; margin: 20px auto; width: 1000px; }
.formTitle{ width: 100%; height: 40px; background-color: #EFF3F6;/* font-size: 14px;*/ }
.formTitle span{ display: block; height: 20px; line-height: 20px; padding: 10px; }
.formBody{ background-color: #F5F8FA; padding-bottom: 15px; margin-bottom: 15px; }
.rule_table{ font-size: 12px; }
.row{ margin: 10px; }
.formBody .row label{ padding: 0 10px; line-height: 36px }
.formFooter{ margin-top: 15px; display: flex;  justify-content: center; }
.tdValue{ width: 100%; height: 20px; line-height: 20px; }
</style>
