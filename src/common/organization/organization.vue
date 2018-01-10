<template>
  <div></div>
</template>
<script>
  export default {
    created(){
      // $('#main-right').find('div.view').css('display','none');
      // const el = document.getElementById('main-right');
      // requirejs(['pages/organization/index.js'], (a) => {
      //   a.init(el);
      // });

    },
    mounted() {
      // $('#main-right').find('div.view').css('display','none');
      const el =  this.$el;//document.getElementById('organization');
      requirejs(['pages/organization/index.js'], (a) => {
        a.init(el);
      });
    },
    activated(){
    }
  };

</script>
<style>
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }
  #myDiagramDiv{
    border:1px solid;
  }
  .list-panel {
    padding: 20px 30px;
  }
  #u-confirm-dialog {
    position: fixed;
    width: 30%;
    border-radius: 0;
    top: 20%;
    left: 0;
    right: 0;
  }



  /**
 * ====穿透查询功能页样式====
 * @table link-style
 * @by pengyic
 */
  /*************************
  @edit-page style
  @by pengyic
  *************************/
  .common-header .page-name {
    font-size: 20px;
    line-height: 32px;
    font-family: 'Microsoft Yahei';
    color: #333333;
    float: left;
    margin: 0;
    padding-right: 18px;
  }
  div.edit-page {
    font: 14px 'Microsoft Yahei';
    padding: 15px 0 15px 70px;
    background-color: #ffffff;
    min-height: 300px;
    margin-top: 10px;
  }
  div.edit-panel {
    margin-bottom: 20px;
  }
  /*************************
  @form style
  @by pengyic lizhik
  *************************/
  .common-form {
    font: 14px 'Microsoft Yahei';
  }
  .common-form fieldset {
    margin-top: 10px;
    padding: 0 20px 20px;
    background-color: #ffffff;
  }
  .common-form fieldset .fieldset-header {
    height: 54px;
    line-height: 54px;
    margin-bottom: 20px;
    border-bottom: 1px solid #cecece;
    font-weight: bold;
    color: #333333;
  }
  .common-form fieldset .fieldset-header span.left-border {
    border-left: 5px solid #1baede;
    line-height: 54px;
    padding-right: 5px;
  }
  .common-form fieldset .form-col-odd {
    width: 18%;
  }
  .form-row-hide {
    display: none;
  }
  .form-row {
    margin-bottom: 20px;
    height: 41px;
  }
  .form-row .form-col-odd {
    line-height: 36px;
    width: 10%;
    text-align: right;
    display: inline-block;
    padding-right: 16px;
    float: left;
  }
  .form-row label.date-icon i {
    font-size: 30px;
    font-weight: normal;
    color: #b4b4b4;
  }
  .form-row label.date-icon {
    position: absolute;
    margin: 2px 0 0 -40px;
    color: #cecece;
  }
  /* 编辑态 */
  .form-row input.form-col-even {
    line-height: 35px;
    width: 27%;
    padding: 0 10px;
    float: left;
    border: 1px solid #cecece;
  }
  /* 非编辑态 */
  .form-row span.form-col-even,
  .form-row-textarea span.form-col-even {
    width: 27%;
    padding: 0 10px;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    float: left;
    height: 41px;
  }
  .form-row span.form-col-even {
    line-height: 36px;
  }
  .form-row-textarea span.form-col-even {
    line-height: 41px;
  }
  .form-row-textarea {
    margin: 15px 0;
    height: 80px;
  }
  .form-row-textarea .form-col-odd {
    line-height: 41px;
    width: 10%;
    text-align: right;
    display: inline-block;
    padding-right: 16px;
    float: left;
    vertical-align: top;
  }
  .form-row-textarea .form-col-textarea {
    width: 64%;
    padding: 10px;
  }
  /* 编辑态 */
  .form-row-textarea textarea.form-textarea {
    width: 72%;
    height: 80px;
    padding: 10px;
    border: 1px solid #cecece;
  }
  /* 非编辑态 */
  .form-row-textarea span.form-textarea {
    width: 71%;
    padding: 10px;
    display: inline-block;
    /*lihzhik--bug英文数字不折行*/
    word-wrap: break-word;
    overflow: hidden;
  }
  /*************************
  @switch
  @by pengyic
  *************************/
  label.my-switch {
    width: 60px;
    padding: 2px;
    margin: 0px;
    line-height: 16px;
    border: 1px solid #61c6ed;
    border-radius: 10px;
    vertical-align: middle;
    background-color: #61c6ed;
  }
  label.my-switch > .thumb {
    display: block;
    float: right;
    width: 15px;
    height: 15px;
    background-color: #ffffff;
    border-radius: 7.5px;
  }
  label.my-switch > .track {
    display: block;
    float: left;
    width: 25px;
    line-height: 15px;
    font-size: 10px;
    font-family: 'Microsoft Yahei';
    font-weight: normal;
    margin: 0 5px;
    color: #ffffff;
  }
  label.my-switch-disable {
    width: 60px;
    padding: 2px;
    line-height: 16px;
    border: 1px solid #aaaaaa;
    border-radius: 10px;
    background-color: #ffffff;
  }
  label.my-switch-disable > .thumb {
    display: block;
    float: left;
    width: 14px;
    height: 14px;
    border: 1px solid #aaaaaa;
    background-color: #e3e3e3;
    border-radius: 7.5px;
  }
  label.my-switch-disable > .track {
    display: block;
    float: right;
    width: 25px;
    line-height: 15px;
    font-size: 10px;
    font-family: 'Microsoft Yahei';
    font-weight: normal;
    margin: 0 5px;
    color: #aaaaaa;
  }
  /*********************
  @相关操作样式 by pengyic
  *********************/
  ul.related-oper {
    margin: 0px;
    padding: 0px;
    width: 150px;
    position: absolute;
    top: 0px;
    right: 0px;
    background-color: #ffffff;
    border: 1px solid #cecece;
    font-size: 13px;
  }
  ul.related-oper li {
    list-style: none;
    height: 47px;
    line-height: 47px;
    padding: 0 0 0 20px;
  }
  ul.related-oper li a {
    color: #000000;
    display: block;
  }
  ul.related-oper li a:hover {
    text-decoration: none;
  }
  ul.related-oper li:first-child {
    font-weight: bold;
    border-bottom: 1px solid #cecece;
    padding-left: 7px;
  }
  ul.related-oper li:hover {
    background-color: #eee;
  }
  ul.related-oper li:first-child:hover {
    background-color: #ffffff;
  }
  /**
   * 编辑状态下：下拉框样式
   * by：weishp -04-21 lizhik
   */
  .form-row select {
    height: 36px;
  }
  .form-row select.form-col-select {
    line-height: 36px;
    width: 27%;
    padding: 0 10px;
    float: left;
    border: 1px solid #cecece;
  }
  /*p背景色*/
  .p-bground {
    background: #e8e9ee;
    height: 40px;
    line-height: 40px;
    padding-left: 5px;
    margin-left: -70px;
    margin-bottom: 15px;
  }
  /**
   * 参照样式
   */
  #content .form-ref {
    float: left;
    width: 27%;
  }
  #content .form-ref span {
    /*影响模板校验字体和位置*/
    /*font-size: 30px; */
    font-weight: normal;
    /*right: 6px;*/
  }
  /**
   * 保存加载样式 by tsingm
   */
  .save-waiting {
    position: fixed;
    width: 120px;
    height: 120px;
    top: 50%;
    left: 50%;
    margin-left: -60px;
    margin-top: -60px;
    display: block;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 0 20px #333333;
    z-index: 1055;
  }
  .save-waiting img {
    margin-top: 10px;
    margin-left: 23px;
  }
  .save-waiting span {
    margin-top: 5px;
    display: block;
    text-align: center;
  }
  .save-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1051;
    background-color: #cecece;
    opacity: 0.5;
    filter: alpha(opacity=50);
    transition: opacity .15s linear;
  }


  /**
 *头部标题栏样式：
 *form: lizhik, tsingm
 */
  .title-header {
    height: 26px;
    margin-bottom: 6px;
    position: relative;
  }
  .title-header .name {
    float: left;
    line-height: 26px;
    font-size: 16px;
    margin: 0;
  }
  .title-header .star {
    float: left;
    line-height: 26px;
    font-size: 18px;
    margin-left: 5px;
    color: #FB9611;
  }
  .title-header .link {
    float: right;
    line-height: 26px;
    font-size: 12px;
    width: 90px;
    height: 26px;
    -webkit-border-radius: 13px;
    /* Safari and Chrome */
    -moz-border-radius: 13px;
    /* Firefox */
    -o-border-radius: 13px;
    /* Opera */
    border-radius: 13px;
    text-align: center;
    background-color: #FFF;
    color: #0377C1;
  }
  .title-header .link:hover {
    text-decoration: none;
  }
  .title-header .re-list {
    font-size: 26px;
    line-height: 26px;
    color: #9b9b9b;
    margin-left: 5px;
    cursor: pointer;
  }
  /**
   *头部操作栏样式：
   */
  .common-header {
    height: 56px;
    padding: 10px 20px;
    background-color: #FFF;
    /*select下拉箭头样式*/
    /*搜索框*/
  }
  .common-header .right {
    float: right;
  }
  .common-header .choose {
    float: left;
  }
  .common-header .choose label {
    font-size: 14px;
    font-weight: normal;
  }
  .common-header select {
    border: solid 1px #BFBFBF;
    /*默认的select选择框样式清除*/
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    /*在选择框的最右侧中间显示小箭头图片*/
    background: #FFF url("/hrcloud/static/img/background/selectDown.png") no-repeat 90% center;
    /*为下拉小箭头留出一点位置，避免被文字覆盖*/
    padding: 0 15px;
    min-width: 87px;
    outline: none;
  }
  .common-header select::-ms-expand {
    display: none;
  }
  .common-header .search {
    float: left;
    margin-left: 10px;
    display: inline;
  }
  .common-header .search input {
    float: left;
    width: 160px;
    font-size: 12px;
    padding: 0 6px;
    border: 1px solid #CECECE;
    border-right: none;
    outline: none;
  }
  .common-header .search button {
    float: left;
    width: 40px;
    height: 36px;
    background-color: #FFF;
    border-left: 0;
    -webkit-border-radius: 0;
    /* Safari and Chrome */
    -moz-border-radius: 0;
    /* Firefox */
    -o-border-radius: 0;
    /* Opera */
    border-radius: 0;
  }
  .common-header .search button i {
    color: #B4B4B4;
  }
  .common-header .search button:focus,
  .common-header .search button:hover {
    background-color: #FFF;
    border-color: #BFBFBF;
  }
  .common-header .search label {
    float: left;
    height: 36px;
    line-height: 36px;
    margin-left: 10px;
    font-size: 14px;
    font-weight: normal;
    color: #0377C1;
  }
  .common-header .search label i {
    font-size: 12px;
    margin-left: 5px;
  }
  /**
   * reset样式
   * by:lizhik
   */
  /*
   * 避免影响表格样式
   * table, caption, tbody, tfoot, thead, tr, th, td,
   */
  a,
  abbr,
  acronym,
  address,
  applet,
  article,
  aside,
  audio,
  b,
  big,
  blockquote,
  body,
  canvas,
  center,
  cite,
  code,
  dd,
  del,
  details,
  dfn,
  div,
  dl,
  dt,
  em,
  embed,
  fieldset,
  figcaption,
  figure,
  footer,
  form,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  header,
  hgroup,
  html,
  i,
  iframe,
  img,
  ins,
  kbd,
  label,
  legend,
  li,
  mark,
  menu,
  nav,
  object,
  ol,
  output,
  p,
  pre,
  q,
  ruby,
  s,
  samp,
  section,
  small,
  span,
  strike,
  strong,
  sub,
  summary,
  sup,
  time,
  tt,
  u,
  ul,
  var,
  video {
    margin: 0;
    padding: 0;
    border: 0;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:after,
  blockquote:before,
  q:after,
  q:before {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  textarea {
    resize: none;
  }
  /**
   *常用属性：
   *可根据个人页面添加常用字体、属性样式
   */
  .position-rel {
    position: relative;
  }
  .align-right {
    text-align: right;
  }
  .cursor-point {
    cursor: pointer;
  }
  .block {
    display: block;
  }
  .inline-bolck {
    display: inline-block;
  }
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .pad-left30 {
    padding-left: 30px;
  }
  .font-yahei {
    font-family: 'Microsoft Yahei';
  }
  li,
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  /**
   * 全局通用样式
   * form: lizhik, tsingm
   */
  #content {
    padding: 6px 28px;
    font-family: tahoma, arial, 'Hiragino Sans GB', 'Microsoft YaHei', '\5b8b\4f53', sans-serif;
    color: #333;
    font-size: 14px;
    line-height: 1;
    /**
     * 按钮样式和划过样式
     */
  }
  #content .btn-default {
    border-color: #CECECE;
  }
  #content .blue-button {
    min-width: 72px;
    height: 34px;
    background-color: #1BAEDE;
    border: 1px solid #1BAEDE;
    -webkit-border-radius: 1px;
    /* Safari and Chrome */
    -moz-border-radius: 1px;
    /* Firefox */
    -o-border-radius: 1px;
    /* Opera */
    border-radius: 1px;
    color: #FFF;
    font-size: 14px;
    outline: none;
    margin-right: 10px;
  }
  #content .blue-button:hover {
    background-color: #189CC7;
  }
  #content .white-button {
    min-width: 72px;
    height: 34px;
    background-color: #FFF;
    border: 1px solid #CCC;
    -webkit-border-radius: 1px;
    /* Safari and Chrome */
    -moz-border-radius: 1px;
    /* Firefox */
    -o-border-radius: 1px;
    /* Opera */
    border-radius: 1px;
    font-size: 14px;
    outline: none;
    margin-right: 10px;
  }
  #content .white-button:hover {
    background-color: #F1F1F1;
  }
  #content .green-button {
    background-color: #39B588;
    border: 1px solid #39B588;
    -webkit-border-radius: 0;
    /* Safari and Chrome */
    -moz-border-radius: 0;
    /* Firefox */
    -o-border-radius: 0;
    /* Opera */
    border-radius: 0;
    color: #FFF;
    outline: none;
    margin-right: 12px;
  }
  #content .green-button:hover {
    background-color: #33A37A;
    color: #FFF;
    outline: none;
  }
  #content .red-button {
    background-color: #ED4047;
    -webkit-border-radius: 0;
    /* Safari and Chrome */
    -moz-border-radius: 0;
    /* Firefox */
    -o-border-radius: 0;
    /* Opera */
    border-radius: 0;
    outline: none;
  }
  #content .red-button:hover {
    background-color: #D53940;
  }
  #content .button-blue-disable,
  #content .button-blue-disable:hover {
    background-color: #98DAF0;
    color: #FFF;
    border: 1px solid #98DAF0;
  }
  #content .form-control {
    background-color: #FFF;
  }
  #content button {
    outline: none;
  }
  #content label {
    font-weight: normal;
  }
  #content a {
    text-decoration: none;
  }
  /**
   * checkbox样式
   */
  .u-checkbox-outline {
    border: 2px solid #D7D7D7;
  }
  .u-checkbox.is-checked .u-checkbox-outline {
    border: 2px solid #2AAFD6;
  }
  /*.u-checkbox.is-checked .u-checkbox-tick-outline {
      background: #2cafd6;
  }*/
  /**
   * "*"号必填项样式
   */
  .must-icon:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #F00;
  }
  .must-icon::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #F00;
  }
  .must-icon:-ms-input-placeholder {
    color: #F00;
  }
  .must-icon::-webkit-input-placeholder {
    color: #F00;
  }
  /*表单样式*/
  input,
  select {
    height: 36px;
    line-height: 36px;
  }
  input[disabled] {
    background-color: #F5F5F5;
  }
  select {
    border: 1px solid #CECECE;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background: #FFF url("/hrcloud/static/img/background/selectDown.png") no-repeat 95% center;
    padding: 0 15px;
    min-width: 87px;
    outline: none;
    -webkit-border-radius: 0;
    /* Safari and Chrome */
    -moz-border-radius: 0;
    /* Firefox */
    -o-border-radius: 0;
    /* Opera */
    border-radius: 0;
  }
  /**
   * 分页
   */
  .paginate-box {
    overflow: hidden;
    width: 100%;
    height: 36px;
    margin-top: 10px;
  }
  .u-pagination {
    position: absolute;
    right: 5px;
  }
  .u-pagination > .active > a,
  .u-pagination > .active > a:hover,
  .u-pagination > .active > span,
  .u-pagination > .active > span:focus,
  .u-pagination > .active > span:hover,
  .u-pagination > .active > a:focus {
    background-color: #1BAEDE;
    border-color: #1BAEDE;
  }
  /**
   * 相关操作样式
   * 参见职务图谱页面使用
   * pengyic
   */
  .dropdown-icon {
    float: right;
    line-height: 26px;
    font-size: 12px;
    width: 30px;
    height: 26px;
    -webkit-border-radius: 13px;
    /* Safari and Chrome */
    -moz-border-radius: 13px;
    /* Firefox */
    -o-border-radius: 13px;
    /* Opera */
    border-radius: 13px;
    text-align: center;
    color: #0377C1;
    cursor: pointer;
  }
  .droplist {
    display: none;
    border: 1px solid #E3E3E3;
    border-bottom: 0;
    background-color: #FFF;
    margin: 0;
    padding: 0;
    position: absolute;
    z-index: 3;
    top: 30px;
    right: 0;
  }
  .droplist a {
    color: #000;
    text-decoration: none;
    display: inline-block;
    width: 120px;
  }
  .droplist li {
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 120px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    cursor: pointer;
    border-bottom: 1px solid #E3E3E3;
  }
  .droplist li:hover {
    background-color: #EFFAFD;
  }
  /**
   * 创建打印div样式
   */
  .print-content {
    width: 100%;
    height: 100%;
    z-index: 1000;
    position: absolute;
    background: #FFF;
    top: 0;
    display: block !important;
    /*display: visible !important;*/
  }
  /**
   * 流程历史按钮样式
   */
  .flow-icon {
    color: #1BAEDE;
    font-size: 22px;
    position: relative;
    top: 3px;
  }
  .flow-btn {
    color: #0377C1;
    font-size: 12px;
    line-height: 36px;
  }
  /**
   * 导入功能 弹出框样式
   */
  .import {
    padding: 5px 35px 0;
  }
  .import .circleGre {
    color: #1BAEDE;
  }
  .import .import-title {
    padding: 0 16px 0 20px;
    display: inline-block;
  }
  .import .import-text {
    color: #999;
    font-size: 12px;
  }
  .import .sliderLine {
    display: block;
    height: 36px;
    width: 100%;
    border-left: 1px dashed #D7D7D7;
    margin-left: 12px;
  }
  .import .file-line {
    width: 100%;
    border-left: 1px dashed #D7D7D7;
    margin-left: 12px;
    padding: 16px 0 26px 32px;
  }
  .import .file-line input {
    width: 258px;
    height: 32px;
    padding-left: 10px;
    border: 1px solid #BFBFBF;
    margin-right: 15px;
  }
  .import .file-line button {
    width: 76px;
    height: 32px;
    font-size: 14px;
    font-family: 'Microsoft Yahei';
    margin-left: 15px;
  }
  .import .import-btn {
    background-color: #1BAEDE;
    border: 1px solid #1BAEDE;
    -webkit-border-radius: 0;
    /* Safari and Chrome */
    -moz-border-radius: 0;
    /* Firefox */
    -o-border-radius: 0;
    /* Opera */
    border-radius: 0;
    color: #FFF;
    outline: none;
    margin-right: 12px;
  }
  .import .import-btn:hover {
    background-color: #189CC7;
  }
  .import .result-info {
    font-size: 12px;
  }
  .import .err-info {
    color: #656565;
    font-size: 12px;
    padding: 18px 0 0 38px;
    max-height: 170px;
    overflow-y: auto;
  }
  /**
   * 组织机构图和员工关系图放大和缩小按钮样式
   */
  .zoom-btn {
    position: absolute;
    right: 30px;
    bottom: 30px;
    width: 36px;
    text-align: center;
    color: #999999;
    border: 1px solid #ccc;
    cursor: pointer;
    z-index: 2;
    background-color: #ffffff;
  }
  .zoom-btn .zoom {
    margin: 8px 0;
  }
  .zoom-btn .zoom-line {
    height: 1px;
    background-color: #ccc;
  }
  .zoom-btn .hrfont {
    font-size: 18px;
  }
  /**
   * 流程详情历史图样式
   */
  .pic_con {
    width: 100%;
    height: 230px;
    overflow: auto;
  }
  .tab-button {
    width: 60px;
    height: 42px;
    margin: 0 3px;
    display: block;
    list-style: none;
    color: #666;
    font-size: 15px;
    text-align: center;
    line-height: 42px;
    float: left;
    cursor: pointer;
  }
  .cur {
    font-weight: 600;
    border-bottom: 3px solid #ff8687;
  }
  .card-content {
    margin-top: 15px;
    width: 100%;
  }
  .card-info {
    width: 32%;
    min-width: 298px;
    height: 210px;
    background-color: #FFF;
    border: 1px solid #DADBDD;
    float: left;
    position: relative;
    margin: 15px 2% 0 0;
  }
  .card-info:hover {
    background-color: #EDF8FF;
    cursor: pointer;
  }
  .modal-footer .footbtn-pad {
    padding: 5px 22px;
  }
  .modal-footer .btn-default {
    -webkit-border-radius: 0;
    /* Safari and Chrome */
    -moz-border-radius: 0;
    /* Firefox */
    -o-border-radius: 0;
    /* Opera */
    border-radius: 0;
    min-width: 72px;
    height: 36px;
  }
  .modal-footer .btn-default:hover {
    background-color: #EBEBEB;
  }
  .modal-title {
    color: #232933;
    font: 16px 'Microsoft Yahei';
  }
  .font-styles {
    color: #212121;
    padding-left: 10px;
    font: normal 14px 'Microsoft Yahei';
  }
  .title-fontsyle {
    font: 30px 'Microsoft Yahei';
    color: #272727;
  }
  .time-title {
    font: normal 12px 'Microsoft Yahei';
    color: #919191;
  }
  .delete-shift {
    float: left;
    /*width:72px;*/
    height: 32px;
    background-color: #FFF;
    border: 1px solid #CCC;
    color: #333;
    margin-left: 25px;
    padding: 0 6px;
    font: normal 14px 'Microsoft Yahei';
  }
  .modal .save-new {
    width: 88px;
    height: 32px;
    border: 1px solid #CCC;
    background-color: #FFF;
    margin-right: 18px;
    margin-top: 1px;
  }
  .container-fluid .input-size {
    width: 130px;
    height: 38px;
  }
  .line-middle {
    display: inline-block;
    width: 14px;
    margin: 0 7px;
    height: 19px;
    border-bottom: 1px solid #BFBFBF;
    float: left;
  }
  .form-name input {
    width: 289px;
    height: 38px;
    border: 1px solid #BFBFBF;
    font-size: 14px;
  }
  /**
   * 无数据图片显示
   */
  .leave-empty {
    position: absolute;
    top: 400px;
    left: 50%;
    margin-left: -71px;
  }
  .leave-empty span {
    display: block;
    line-height: 30px;
    text-align: center;
    color: #A9A9A9;
  }
  /**
   * 编辑新增页面
  * 导入页面向导
  */
  .lead-bar {
    width: 100%;
    overflow: hidden;
    padding: 30px 0 20px 0;
    background-color: #ffffff;
  }
  .lead-bar ul {
    width: 1080px;
    margin: 0 auto;
  }
  .lead-bar ul .item-left {
    width: 60px;
    height: 60px;
    position: relative;
    float: left;
  }
  .lead-bar ul .item-left .circle-outer {
    width: 30px;
    height: 30px;
    background-color: #ffffff;
    border: 2px solid #b4b4b4;
    border-left: 0px;
    border-top: 0px;
    border-radius: 0 0 30px 0;
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .lead-bar ul .item-left .circle-inner {
    width: 46px;
    height: 46px;
    background-color: #b4b4b4;
    border-radius: 23px;
    position: absolute;
    top: 7px;
    left: 7px;
    color: #ffffff;
    text-align: center;
    font-size: 30px;
    line-height: 46px;
  }
  .lead-bar ul .item-right {
    width: 300px;
    height: 60px;
    margin-left: -2px;
    float: left;
  }
  .lead-bar ul .item-right .text-top {
    width: 300px;
    height: 30px;
    border-bottom: 2px solid #b4b4b4;
    color: #b4b4b4;
    font-size: 18px;
    line-height: 28px;
    text-indent: 1em;
  }
  .lead-bar ul .item-right .text-bottom {
    width: 300px;
    height: 28px;
    color: #b4b4b4;
    line-height: 25px;
    text-indent: 1em;
  }
  .lead-bar ul .selected .circle-outer {
    border-color: #52bc7c;
  }
  .lead-bar ul .selected .circle-inner {
    background-color: #52bc7c;
  }
  .lead-bar ul .selected .text-top {
    border-bottom-color: #52bc7c;
    color: #52bc7c;
  }
  .lead-bar ul .selected .text-bottom {
    color: #808080;
  }
  .abnormal {
    margin-bottom: 20px;
    height: 36px;
    clear: both;
  }
  .abnormal .u-combo {
    display: inline-block;
    width: 180px;
    float: left;
  }
  .abnormal .u-datepicker {
    display: inline-block;
    position: relative;
  }
  .abnormal .u-datepicker .choose-meta {
    margin-right: -27px;
  }
  .abnormal .u-datepicker label {
    color: #CECECE;
    top: 10px;
    position: absolute;
  }
  .abnormal:last-child {
    margin-bottom: 0;
  }
  .check-span {
    height: 28px;
    line-height: 28px;
    clear: both;
  }
  .left-span,
  .right-meta,
  .choose-span,
  .choose-meta,
  .big-span,
  .big-meta,
  .small-meta {
    font-size: 14px;
    color: #656565;
    display: inline-block;
    float: left;
    line-height: 36px;
  }
  .left-span,
  .choose-span,
  .big-span {
    padding-right: 10px;
    width: 95px;
    text-align: right;
  }
  .right-meta {
    text-align: left;
    width: 180px;
  }
  .choose-meta {
    width: 180px;
    border: 1px solid #CECECE;
    padding-left: 10px;
  }
  .big-span {
    width: 110px;
  }
  .small-meta {
    text-align: left;
    width: 120px;
  }
  .big-meta {
    text-align: left;
  }
  .edittime {
    display: inline-block;
    width: 130px;
    position: relative;
  }
  .edittime input {
    width: 100%;
    border: 1px solid #CECECE;
    padding-left: 15px;
  }
  .edittime .hrfont {
    position: absolute;
    top: 8px;
    right: 3px;
    color: #CECECE;
    font-size: 22px;
  }
  .qizhiline {
    width: 15px;
    display: inline-block;
    border-top: 1px solid #CECECE;
    margin: 0 9px 5px 9px;
  }
  .daily-check {
    display: inline-block;
    height: 25px;
    line-height: 0px;
    width: 15%;
    left: 50px;
    position: relative;
  }
  .daily-check span {
    color: #333;
  }
  .yell-num {
    color: #FE8125;
    margin: 0 3px;
  }
  /**
   *表格样式：
   *from: lizhik, tsingm
   */
  .main-container {
    position: relative;
    margin-top: 10px;
    margin-bottom: 20px;
    padding: 20px;
    background: #FFF;
  }
  .hr-table table {
    width: 100%;
    table-layout: fixed;
  }
  .hr-table tr {
    height: 45px;
    border: 1px solid #EEEFF1;
  }
  .hr-table tr.daymonth td:last-child {
    padding-right: 10px;
    text-align: left;
  }
  .hr-table td,
  .hr-table th {
    padding-left: 10px;
    text-align: left;
  }
  .hr-table th {
    font-weight: normal;
  }
  .hr-table th.sortable:hover {
    background: #D7D7D7;
  }
  .hr-table th i {
    display: none;
    font-size: 12px;
    color: #B4B4B4;
  }
  .hr-table th.clicked i {
    display: inline;
  }
  .hr-table thead {
    font-size: 15px;
    background-color: #EEEFF1;
  }
  .hr-table tbody {
    font-size: 13px;
  }
  .hr-table tbody tr.is-selected,
  .hr-table tbody tr:hover {
    background: #E9F7FC;
  }
  .hr-table tbody tr:hover i {
    display: inline;
  }
  .hr-table tbody tr:hover .check-link {
    color: #2788CC;
  }
  .hr-table tbody tr:hover .check-link:hover {
    cursor: pointer;
    text-decoration: underline;
  }
  .hr-table tbody td {
    overflow: hidden;
    white-space: nowrap;
    -o-text-overflow: ellipsis;
    /* Opera */
    -webkit-text-overflow: ellipsis;
    /* Safari and Chrome */
    -moz-text-overflow: ellipsis;
    /* Firefox */
    text-overflow: ellipsis;
  }
  .hr-table tbody td:last-child {
    padding-right: 10px;
    text-align: right;
  }
  .hr-table tbody i {
    margin-left: 15px;
    cursor: pointer;
    color: #2788CC;
    display: none;
  }
  .hr-table tbody i.disable {
    color: #B4B4B4;
  }
  .hr-table .u-checkbox-focus-helper,
  .hr-table .u-checkbox-outline {
    top: -11px;
  }
  /**
  * loading样式
  */
  #LoadingImage {
    border: 1px solid #EAEAEA;
    border-top: 0;
    display: none;
    position: relative;
    /*width: 100%;
    text-align: center;*/
    min-height: 448px;
  }
  #LoadingImage img {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -38px;
    margin-left: -38px;
  }
  #LoadingImage span {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: 55px;
    margin-left: -26px;
    color: #B4B4B4;
    font-size: 14px;
  }
  #emptyImage {
    border: 1px solid #EAEAEA;
    border-top: 0;
    display: none;
    position: relative;
    /*width: 100%;*/
    /*text-align: center;*/
    min-height: 448px;
  }
  #emptyImage img {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -45px;
    margin-left: -38px;
  }
  #emptyImage span {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: 60px;
    margin-left: -84px;
    color: #B4B4B4;
    font-size: 14px;
  }
  /**
 * ======================================
 * 覆盖组件样式统一维护管理
 * by :lizhik  2016/7/22
 * ======================================
 */
  /**
   * 覆盖 portal 解决菜单设置左树边距问题
   * by :lizhik
   */
  #appmgr .nav li .mname {
    margin-left: 25px;
    display: inline-block;
    max-width: 166px;
    /* width: 177px; */
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    -webkit-text-overflow: ellipsis;
    -moz-text-overflow: ellipsis;
    white-space: nowrap;
  }
  #appmgr .menu-group > .items > li > a {
    color: #333333;
    text-decoration: none;
    background-color: #fff;
    position: relative;
    display: block;
    padding: 5px 15px;
    padding-left: 50px;
  }
  /**
   * 覆盖树滑过样式
   * by:lizhik
   */
  #content .ztree li a:hover,
  .outerContainer .ztree li a:hover {
    background-color: #e9f7fc !important;
  }
  #content .ztree li a.focusNode,
  .outerContainer .ztree li a.focusNode {
    background-color: #C4EAF6 !important;
    color: #333333;
  }
  /**
   *信息框样式覆盖
   */
  body .u-msg-dialog .u-msg-footer.only-one-btn button {
    float: right;
  }
  body .u-msg-dialog {
    width: 36%;
  }
  body .u-msg-dialog .u-msg-footer {
    width: auto;
    float: right;
  }
  .u-msg-dialog .u-msg-footer .u-msg-ok {
    float: left;
  }
  /**
   * 树图标层级覆盖
   */
  #content .ztree li span.button.switch {
    z-index: 1;
  }
  /**
  * select 下拉
  */
  .u-combo-ul {
    min-width: 87px;
  }
  /**
   * 提示框取消按钮边框
   */
  .u-msg-dialog .u-msg-cancel {
    border: 1px solid #cecece;
  }
  /**
   * 参照圆角
   */
  #content .u-form-control {
    border-radius: 0px;
    padding-right: 36px;
    border: 1px solid #cecece;
  }
  /**
   * portal右上角的图片和文字位置
   */
  #username .avatar {
    display: initial;
    vertical-align: baseline;
  }
  #username .icon-arrowdown {
    margin-top: 8px;
    padding-right: 10px;
  }
  .menubar-menu .active {
    background-color: #333333;
  }
  /**
   * portal的row样式hidden影响下拉
   */
  #content .row {
    overflow: visible !important;
  }
  .u-date-panel .u-date-clean {
    border: solid 1px #CECECE;
  }

</style>
