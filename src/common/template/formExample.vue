<template>
<div>
  <!-- 调用方法：
          :form为必需传入的数据，格式见下data部分
          @onSubmit和@onCancel用来监听保存和取消按钮的事件。可选，当设置showButtons为false时不用写。
   -->
  <!--<formComponent :form="form" @onSubmit="onSubmit" @onCancel="onCancel"></formComponent>-->
  <el-form-component :form="form" @onSubmit="onSubmit" @onCancel="onCancel"></el-form-component>
</div>
</template>
<script>
export default {
  data() {
    return {
      /**
       * form 包含三个key: formData(必需), settingData(必需), formStyle(非必需)
       * 1. formData: 数组格式，每一项为包含key和value的对象，用来存储表单每一项的数据
       *      比如：
       *      formData: [
       *        { key: 'factorageScale', value: '' },
       *        { key: 'brokerageScale', value: '' },
       *        { key: 'recoveryTime', value: '' },
       *        { key: 'linkIFMBP', value: '' },
       *        { key: 'externalPortLink', value: '' },
       *      ]
       * 2. settingData: 数组格式，长度需要和keyValues保持一致，里面是每个表单项的具体设置（对象格式）
       *      比如：
       *          settingData:[
       *            ...
       *            {
       *              label: '手续费默认计提比例', // 左边字段名
       *              el: 'input',                 // 右边元素【默认input】
       *              type: 'number',              // input时的元素类型【默认为文字框：text】，文本域：textarea
       *              prepend: '%',                // input时内部左边的文字【可无】
       *              placeholder: '请输入',       // 默认显示提示信息【可无】
       *              required: true,              // 是否必填【可无，默认为false】
       *            },
       *            ...
       *          ]
       * 3. formStyle: object格式，用来设置表单的显示效果
       *     比如：formStyle: {
       *            columns: 1,         // 按多少列显示
       *            showButtons: false, // 是否显示底部保存和取消按钮
       *            styleObject: {      // 自定义form表单的样式
       *              width: '500px',
       *              margin: '0 auto',
       *            },
       *          },
       * @type {Object}
       */
      form: {
        formData: [
          { key: 'factorageScale', value: '' },
          { key: 'brokerageScale', value: '' },
          { key: 'recoveryTime', value: '' },
          { key: 'linkIFMBP', value: '' },
          { key: 'externalPortLink', value: '' },
        ],
        settingData: [
          {
            label: '手续费默认计提比例', // 左边字段名
            el: 'input',                 // 右边元素
            type: 'number',              // input时的元素类型
            prepend: '%',                // input时内部左边的文字
            placeholder: '请输入',       // 默认显示提示信息
            required: true,              // 是否必填
          },
          {
            label: '佣金默认计提比例',  // 左边字段名
            el: 'input',                // 右边元素
            type: 'number',             // input时的元素类型
            prepend: '%',               // input时内部左边的文字
            placeholder: '请输入',      // 默认显示提示信息
            required: true,             // 是否必填
          },
          {
            label: '单证默认回收时间',  // 左边字段名
            el: 'input',                // 右边元素
            type: 'number',             // input时的元素类型
            prepend: '天',              // input时内部左边的文字
            placeholder: '请输入',      // 默认显示提示信息
            required: true,             // 是否必填
          },
          {
            label: '财务系统是否连接链融云', // 左边字段名
            el: 'select',                    // 右边元素
            placeholder: '请选择',           // 默认显示提示信息
            required: true,                  // 是否必填
            options: [
              {
                value: '1',
                label: '是',
              },
              {
                value: '0',
                label: '否',
              },
            ],
          },
          {
            label: '外部财务系统接口地址',  // 左边字段名
            el: 'input',                    // 右边元素
            placeholder: '请输入',          // 默认显示提示信息
            required: false,                // 是否必填
          },
        ],
        // formStyle 可选
        formStyle: {
          simpleColumn: false,         // 是否按单列显示，false表示按两列显示
          showButtons: true, // 是否显示底部保存和取消按钮，false表示不显示保存取消按钮
          styleObject: {      // 自定义form表单的样式
            width: '500px',
            margin: '0 auto',
          },
        },
      }
    };
  },
  methods: {
    onSubmit(data) {
      /**
       * data format like
       * {
       *    factorageScale: "0.4",
       *    brokerageScale: "0.2",
       *    recoveryTime: "12",
       *    linkIFMBP: "1",
       *    externalPortLink: "http://www.portal.yonyou.com"
       * }
       */
      console.log(data);
      //console.log(this.form.formData);
    },
    onCancel() {
      console.log('click cancel..');
    }
  }
};
</script>
<style>

</style>
