<template>
  <div id="enterprise-info">
    <div class="title-header" style="padding: 20px 23px;">
      <h2 class="name">{{title}}</h2>
    </div>
    <div class="detail-container">
      <div class="cards-title">
        <el-button class="fl" v-if="isCreate" type = "primary" @click="createForm" style="width: 80px;">保存</el-button>
        <el-button class="fr" type = "primary" @click="backButton" style="float:right;width: 80px;">返回</el-button>
      </div>
      <div class="content-main">
        <!-- 左侧主要部分开始 -->
        <div class="content-left">
          <!-- 基本档案开始 -->
          <div class="detail-item" id="enterprise-information" style="height:930px;">
            <div class="detail-items" style="height:898px;">
            <div class="child-title"><b>基本档案</b><i v-if="!createFlags['enterprise-information'] && !isCreate" class="el-icon-edit" @click="toggle('enterprise-information')"></i></div>
            <div class="child-item-left" id="child-item-left">
              <el-upload
                class="avatar-uploader"
                action="/ifbp-app-bd/bd/customer/enterprise/file"
                v-if="createFlags['enterprise-information']"
                :show-file-list="false"
                :on-success="function(res,file){handleAvatarSuccess('enterprise-information',res,file)}"
                :before-upload="function(res,file){return beforeAvatarUpload('enterprise-information',res,file)}">
                <img v-if="imageUrl[imageCodes['enterprise-information']]" :src="realPath[imageCodes['enterprise-information']]" style="max-height:100%;max-width:100%">
                <div v-else style="height:100%;text-align:center;width:100%;">
                  <i class="el-icon-plus avatar-uploader-icon"></i>点击上传图片
                </div>
              </el-upload>
            <div v-else class="avatar-uploader" style="padding:1px;border:1px dashed #d9d9d9;border-radius:4px;">
              <img :src="realPath[imageCodes['enterprise-information']]" style="max-height:100%;max-width:100%;">
              <p>点击编辑之后上传营业执照图片</p>
            <!-- <div style="text-align:center;">营业执照</div> -->
            </div>
          </div>
            <div class="child-item-right">
              <el-template :pkTemp="pktemp['enterprise-information']"
                          ref="enterprise-information"
                          @change="changeHandle"
                          @setEmptyKeys="function(v){setEmptyKey(v,'enterprise-information')}"
                          :hide-title="true"
                          :isEdit="createFlags['enterprise-information']"
                          :templateValue="currentValue['enterprise-information']">
              </el-template>
              <el-button-group class="group" v-if="createFlags['enterprise-information'] && !isCreate">
                <el-button class="save" type="primary" @click="submit('enterprise-information')">保存</el-button>
                <el-button class="save" type="primary" @click="cancel('enterprise-information')">取消</el-button>
              </el-button-group>
              <el-button v-if="!createFlags['enterprise-information']" class="save" type="primary" @click="toggle('enterprise-information')">编辑</el-button>
            </div>
            </div>
          </div>
          <!-- 基本档案结束 -->
          <!-- 纳税人信息开始 -->
          <div class="detail-item" id="taxpayer-information">
            <div class="detail-items">
            <div class="child-title"><b>纳税人信息</b><i v-if="!createFlags['taxpayer-information'] && !isCreate" class="el-icon-edit" @click="toggle('taxpayer-information')"></i></div>

            <el-template :pkTemp="pktemp['taxpayer-information']"
                          ref="taxpayer-information"
                          :table-style="tableStyle"
                          :hide-title="true"
                          :isEdit="createFlags['taxpayer-information']"
                          :templateValue="currentValue['taxpayer-information']"
                          @setEmptyKeys="function(v){setEmptyKey(v,'taxpayer-information')}"
                          @change="changeHandle"
                        >
            </el-template>
            <el-button-group class="group" v-if="createFlags['taxpayer-information'] && !isCreate">
                <el-button class="save" type="primary" @click="submit('taxpayer-information')">保存</el-button>
                <el-button class="save" type="primary" @click="cancel('taxpayer-information')">取消</el-button>
            </el-button-group>
            </div>

          </div>
          <!-- 纳税人信息结束 -->
          <!-- 联系人档案开始 -->
          <div class="detail-item" id="contracts-record">
            <div class="detail-items">
            <el-row>
              <el-col class="child-title-left" :span="12">
                联系人档案<i class="el-icon-plus" title="增加账户" @click="addListItem('contracts-record')"></i>
              </el-col>
              <el-col class="child-title-right" :span="12">
                <i class="el-icon-setting" @click="editTableColumns('contracts-record')"></i>
              </el-col>
            </el-row>
            <el-template
                        :pkTemp="pktemp['contracts-record']"
                        ref="contracts-record"
                        :hide-title="true"
                        :isEdit="createFlags['contracts-record']"
                        :template-value="currentValue['contracts-record']"
                        @setEmptyKeys="function(v){setEmptyKey(v,'contracts-record')}"
                        @change="changeHandle"
                        :expand="expands['contracts-record']"
                        :expandRowKeys="expandRowKeys['contracts-record']"
                        @save-expand-form="submit('contracts-record', arguments)"
                        @delete-expand-form="deleteRowForm('contracts-record', arguments)"
                        @edit-expand-form="editRowForm('contracts-record')"
                        @cancel-expand-form="cancelRowForm('contracts-record')"
                        @expand-row="function(row, expanded){expandRow('contracts-record', {row:row,expanded:expanded})}"
                        rowKey="id"
                        >

            </el-template>
            </div>
          </div>
          <!-- 联系人档案结束 -->
          <!-- 银行账户开始 -->
          <div class="detail-item" id="bank-record">
            <div class="detail-items">
            <el-row>
              <el-col class="child-title-left" :span="12">
                银行账户<i class="el-icon-plus" @click="addBankRow"></i>
              </el-col>
              <el-col class="child-title-right" :span="12">
                <i class="el-icon-setting" @click="editTableColumns('bank-record')"></i>
              </el-col>
            </el-row>
            <el-template
                        :pkTemp="pktemp['bank-record']"
                        ref="bank-record"
                        :hide-title="true"
                        :show-button="showBankButton"
                        :isEdit="createFlags['bank-record']"
                        :template-value="currentValue['bank-record']"
                        @setEmptyKeys="function(v){setEmptyKey(v,'bank-record')}"
                        @change="changeHandle"
                        @check-table-row="checkTableRow"
                        @edit-table-row="editTableRow"
                        @delete-table-row="deleteTableRow"
                        >
            </el-template>
            <el-dialog
                      title="增加银行账户"
                      v-model="showBankForm"
                      size="large"
                      >
              <el-template
                          :pkTemp="pktemp['bank-record-form']"
                          :hide-title="true"
                          :isEdit="isEditBankForm"
                          ref="bank-record-form"
                          :table-style="tableStyle"
                          :templateValue="currentValue['bank-record-form']"
                          @setEmptyKeys="function(v){setEmptyKey(v,'bank-record-form')}"
                          >
              </el-template>
              <div class="fr editBank" v-if="!isEditBankForm">
                <el-button @click="showBankForm = false">返 回</el-button>
                <el-button  type="primary" @click="isEditBankForm = true">编 辑</el-button>
              </div>
              <span v-else slot="footer" class="dialog-footer">
                <el-button @click="showBankForm = false">取 消</el-button>
                <el-button type="primary" @click="addBankForm('bank-record-form')">确 定</el-button>
              </span>
            </el-dialog>
            </div>
          </div>
          <!-- 银行账户结束 -->
          <!-- 股东版权信息开始 -->
          <div class="detail-item" id="shareCopyright-record">
            <div class="detail-items">
            <el-row>
              <el-col class="child-title-left" :span="12">
                股东股权信息<i class="el-icon-plus" @click="addListItem('shareCopyright-record')"></i>
              </el-col>
              <el-col class="child-title-right" :span="12">
                <i class="el-icon-setting" @click="editTableColumns('shareCopyright-record')"></i>
              </el-col>
            </el-row>
            <el-template
                        :pkTemp="pktemp['shareCopyright-record']"
                        ref="shareCopyright-record"
                        :hide-title="true"
                        :isEdit="createFlags['shareCopyright-record']"
                        :templateValue="currentValue['shareCopyright-record']"
                        :expand="expands['shareCopyright-record']"
                        :expandRowKeys="expandRowKeys['shareCopyright-record']"
                        @setEmptyKeys="function(v){setEmptyKey(v, 'shareCopyright-record')}"
                        @change="changeHandle"
                        @save-expand-form="submit('shareCopyright-record',arguments)"
                        @delete-expand-form="deleteRowForm('shareCopyright-record', arguments)"
                        @edit-expand-form="editRowForm('shareCopyright-record')"
                        @cancel-expand-form="cancelRowForm('shareCopyright-record')"
                        @expand-row="function(row, expanded){expandRow('shareCopyright-record', {row:row,expanded:expanded})}"
                        rowKey="id"
                        >

            </el-template>
            </div>
          </div>
          <!-- 股东版权信息结束 -->

        </div>
        <!-- 左侧主要部分结束 -->
        <!-- 右侧导航栏开始 -->
        <div class="content-right">
          <ul id="side-nav">
          <li v-for="(item, index) in sideNavData" :class="{selected: index === 0}" :key="index">
            <a href="javascript:;" :data-id="item.anchor" @click="anchorClick">{{item.label}}</a>
          </li>
          <span class="line" style=""></span>
          </ul>
        </div>
        <!-- 右侧导航栏结束 -->
        </div>
    </div>
    <!--
      <div id="cover" ref="cover"><div class="el-loading-spinner"><svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg></div></div>
    -->
    </div>
  </div>
</template>
<script>
 //import template from '../../../userInfo/ui-template/src/template.vue';
  export default {
    components:{
     // uitemplate:template
    },
    data(){
      var isCreate = this.$route.params.id === 'add';//there: isCreate = false
      return {
        showBankForm: false, //是否显示银行的表单
        isEditBankForm: false, //判断是否是编辑态
        isAddBankForm: false, //判断是否是新增
        bankRowId: '', //修改银行账户的时候需要的行标
        loading: '',
        title: '企业客户',
        templateValue: {},//整个元数据值集合
        currentValue: {}, //
        originalValue: {}, //备份的值数据
        bankValue: {}, //银行账户获取的值数据
        createFlags: {
          'enterprise-information': isCreate,
          'taxpayer-information': isCreate,
          'contracts-record': isCreate,
          'bank-record': isCreate,
          'shareCopyright-record': isCreate,
        },
        loadDefer: [],
        imageUrl: {},
        realPath: {},
        emptyId: '',
        validity_time_tpl: {},
        imageCodes: {
          'enterprise-information': 'certificate_img',
        },
        id: this.$route.params.id,//'uapcloud100000006r22'
        isCreate: isCreate,
        formForCreate: ['enterprise-information','taxpayer-information'],
        isEdit: {
          'enterprise-information': isCreate,
          'taxpayer-information': isCreate,
          'contracts-record': isCreate,
          'bank-record': isCreate,
          'shareCopyright-record': isCreate,
        },
        isAdding:{
          'contracts-record': false,
          'bank-record': false,
          'shareCopyright-record': false,
        },
        pktemp: {
          'enterprise-information': 'd2ae2af0-c6b3-4e88-9c13-170e1ec72c2e',
          'taxpayer-information': '21545b59-99a1-4704-8959-eb4c8e8ab54c',
          'contracts-record': 'bb6821f4-572c-427b-b81b-59ccbdb7d898',
          'bank-record-form': 'feff7486-ad9d-40a5-94b9-90821b9a6cba',
          'bank-record':'349dcd79-ac1f-4bd0-a5f1-aedea6ca922a',
          'shareCopyright-record': '27768bad-26aa-4ac1-8c5e-0941fce91e68',
        },
        promises: {},
        expands: {},
        // 存储ui模板grid展开列
        expandRowKeys: {
          'contracts-record': [],
          'bank-record': [],
          'shareCopyright-record': [],
      },
      emptyListItem: {},
      idMap:{
        'contracts-record': 'id_entperson',
        'bank-record': 'id_entbank',
        'shareCopyright-record': 'id_entshareholder'
      },
      idMapChild:{
        'contracts-record': 'fk_id_entperson',
        'bank-record': 'id_entbank',
        'shareCopyright-record': 'fk_id_entshareholder'
      },
      tableStyle: {
        'max-height': '1000px'
      },
      // showContractsButton: {},
      sideNavData: [ // 右侧导航目录数据
        {
          anchor: 'enterprise-information',
          label: '基本信息'
        },
        {
          anchor: 'taxpayer-information',
          label: '纳税人信息'
        },
        {
          anchor: 'contracts-record',
          label: '联系人档案'
        },
        {
          anchor: 'bank-record',
          label: '银行账户'
        },
        {
          anchor: 'shareCopyright-record',
          label: '股东版权信息'
        }
      ],
      //银行账户的最后一列的操作按钮
      showBankButton: {
        width: 110,
        group: true,
        buttons: [
          {
            name: 'check',
            text: '',
            icon: 'search',
            content: '查看',
          },{
            name: 'edit',
            text: '',
            icon: 'edit',
            content: '编辑',
          },{
            name: 'delete',
            text: '',
            icon: 'delete',
            content: '删除',
          }
        ]
      }
      };
    },
    beforeCreate(){
    },
    created() {
      var requestDefer = this.request();
      var requestBank = this.requestBank();
      this.initPromise(requestDefer, requestBank);
      this.setExpandsValue();
    },
    watch: {
      imageUrl:{
        handler: function(){
          Object.keys(this.imageUrl).forEach((v) => {
            this.$set(this.realPath, v, this.getRealImg(this.imageUrl[v]));
          });
        },
        deep: true
      }
    },
    methods: {
      initPromise(request, requestBank){
        var tmpRequest;
        Object.keys(this.pktemp).forEach((id) => {
          var promise = new Promise((res, rej) => {
            this.promises[id] = {
              resolve: res,
              reject: rej
            };
          });
          if(id !== 'bank-record-form'){
            this.loadDefer.push(promise);
          }
          if (!this.isCreate) {
            tmpRequest = (['bank-record-form', 'bank-record'].indexOf(id) > -1) ? requestBank : request;
            Promise.all([promise, tmpRequest]).then(() => {
              this.assignValues(id);
            });
          }
        });
        Promise.all(this.loadDefer.concat(request,requestBank)).then(() => {
          this.$nextTick(() => {
            setTimeout(() => {
              // this.$refs.cover.remove();
            },400);
          });
          this.validity_time_tpl = this.getTemplateByCode('validity_time');
          this.specialLogic();
        });
      },
      specialLogic() { // if checkbox is checked, disabled validity_time component
        var watchValue = this.currentValue['enterprise-information'].islongterm;
        if (Object.prototype.toString.call(watchValue) === '[object String]' && watchValue !== '') {
          this.validity_time_tpl.isReadonly = true;
          this.currentValue['enterprise-information'].validity_time = null;
        } else {
          this.validity_time_tpl.isReadonly = false;
        }
      },
      // get template data of special itemCode, to edit more than data of component
      getTemplateByCode(code) {
        var formlayout = this.$refs['enterprise-information'].formLayout;// refname here
        var tpl;
        var components = [];
        formlayout.forEach((form) => {
          components = components.concat(form.layoutDetail);
        });
        for (var i=0;i<components.length;i++) {
          if (components[i].itemCode.split('.').pop() === code) {
            tpl = components[i];
            break;
          }
        }
        return tpl;
      },
      initImgUrl(data) {
        var img = 'group1/M00/00/11/CgRmOVlwCDiAOAi-AAC0BlVVYIk045.jpg';
        var tmp;
        var datas = data || [];
        Object.keys(this.imageCodes).forEach((v) => {
          tmp = [null,''].indexOf(datas[this.imageCodes[v]]) > -1 ? img : datas[this.imageCodes[v]];
          this.$set(this.imageUrl, this.imageCodes[v], tmp);
        });
      },
      initAvFileList(data) {
      if(data.mediainfo_id instanceof Array) {
        const self = this;
        self.avFileList = [];
        data.mediainfo_id.forEach((v) => {
          if(v.filepath) {
            self.avFileList.push({
              name: v.filename,
              url: self.getRealImg(v.filepath)
            });
          }
        });
      }
    },
    //获取值数据
    request() {
      const url = '/ifbp-app-bd/bd/customer/enterprise/withchild/' + this.id;
      const self = this;
      return this.$http({
        url: url,
        method: 'GET',
      }).then((res) => {
        if(res.data.success === true) {
          self.templateValue = res.data.data;
          this.initImgUrl(res.data.data);
          if (res.data.data){
            this.initAvFileList(res.data.data);
          }

        }
      });
    },
    requestBank() { // 获取银行账户值数据
      return this.$http({
        url: '/ifbp-app-bd/bd/customer/enterprise/bank?id=' + this.id,
        method: 'GET'
      }).then((res) => {
        if(res.data.success === true) {
          this.bankValue = res.data.data;
        } else {
          this.$message('获取数据失败');
        }
      }).catch(() => {
        this.$message('银行账户请求出错');
      });
    },
      //设置grid 和 form 的数据
      assignValues(id){
        if (id === 'bank-record') { // handle individual bank component
          this.$set(this.currentValue,id,this.bankValue);
        } else if (Object.keys(this.idMap).indexOf(id) > -1){
          this.$set(this.currentValue,id,this.templateValue[this.idMap[id]] || []);
        } else if (id !== 'bank-record-form') {
          var map = Object.keys(this.currentValue[id]);
          for(var i=0;i<map.length;i++){
            this.currentValue[id][map[i]] = this.templateValue[map[i]] || '';
          }
        }
        this.originalValue[id] = JSON.parse(JSON.stringify(this.currentValue[id]));
      },
      // 点击设置按钮，弹出穿梭框显示隐藏列
      editTableColumns(flag) {
        console.log("点击了设置按钮");
        if(this.$refs[flag]) {
          var gridVm = this.$refs[flag].$children[0];
          if(gridVm && typeof gridVm.editColumns === 'function') {
            gridVm.editColumns();
          }
        }
      },
      toggle(id) {
        this.createFlags[id] = !this.createFlags[id];
        this.currentValue[id] = JSON.parse(JSON.stringify(this.originalValue[id]));
      },
      cancel(id) {
        this.toggle(id);
        this.currentValue[id] = JSON.parse(JSON.stringify(this.originalValue[id]));
        if(id === 'enterprise-information') { // special logic for enterprise-information page
          this.specialLogic();
        }
      },
      handleMultiValidate(ids) {
        var promises = [];
        ids.forEach((id) => {
          promises.push(new Promise((res, rej) => {
            this.$refs[id].validate((valid) => {
              if(valid) {
                res();
              }else {
                rej();
              }
            });
          }));
        });
        return Promise.all(promises);
      },
      createForm(){
        this.handleMultiValidate(['enterprise-information','taxpayer-information']).then(() => {
          var submitData = {id: ''};
          this.formForCreate.forEach((formID) => {
            Object.keys(this.currentValue[formID]).forEach((v) => {
              submitData[v] = this.currentValue[formID][v];
            });
          });
          submitData[this.imageCodes['enterprise-information']] = this.imageUrl[this.imageCodes['enterprise-information']];
          this.$http({
            url: '/ifbp-app-bd/bd/customer/enterprise/',
            method: 'post',
            dataType: 'json',
            data: submitData
          }).then((res) => {
            if(res.data.success === true) {
              if (window.env === 'dev') {
                this.$message('添加成功');
              }
              this.id = res.data.data.id;
              this.$router.push('/crm/enterpriseInfo/' + this.id);
              window.location.reload();
              // this.originalValue = JSON.parse(JSON.stringify(this.currentValue));
              // this.isCreate = false;
              // Object.keys(this.createFlags).forEach((v) => {
              //   this.createFlags[v] = false;
              // });
            } else {
              this.$message.error('保存失败');
            }
          }).catch(() => {
            this.$message.error('保存失败');
          });
        }).catch(() => {
          this.$message.error('表单验证错误');
        });

      },
     //设置空值
      setEmptyKey(value,flag) {
        if(Object.keys(this.idMap).indexOf(flag) < 0){ // form
          this.$set(this.currentValue, flag, value);
        } else { // grid
          this.emptyListItem[flag] = value;
          this.emptyListItem[flag].id = this.emptyId;
        }
        this.promises[flag].resolve(flag);
    },
      changeHandle(data) {
        if (data.key === 'islongterm') {
          this.specialLogic();
        }
      },
      backButton() {
        window.history.back(-1);
      },
      beforeAvatarUpload(id){
        var pass;
        if(this.isCreate && ['enterprise-information'].indexOf(id) < 0) {
          this.$message('请先新增并保存主表数据');
          pass = false;
        } else {
          pass = true;
        }
        return pass;
      },
      getRealImg(url) {
        var realPath = '';
        if(url && url.length > 0) {
          if (url.indexOf(',') > -1) { // grid中的多个图片暂时显示最新一张
            realPath = '/ifbp-app-bd/bd/customer/personal/file?filepath=' + url.split(',').pop();
          } else { // form 中图片都是一张
            realPath = '/ifbp-app-bd/bd/customer/personal/file?filepath=' + url;
          }
        }
        return realPath;
      },
      //点击新增银行账户按钮
      addBankRow() {
        if (this.isCreate) {
          this.$message('请先新增并保存主表数据');
          return;
        }
        this.isAddBankForm = true;
        this.isEditBankForm = true;
        this.showBankForm = true;
        var currentBankRow = JSON.parse(JSON.stringify(this.emptyListItem['bank-record']));
        this.$set(this.currentValue,'bank-record-form',currentBankRow);
      },
      handleAvatarSuccess(id, res){
        this.$set(this.imageUrl, this.imageCodes[id], res.data);
      },


      scroll() {
        if(this.$route.path.indexOf('/crm/enterpriseInfo') < 0){
          return;
        }
        this.fixedNav();
        this.scrollFocus();
      },
      // 控制side-nav悬浮在页面右上方
      fixedNav() {
        if($('#enterprise-info .content-main').length > 0) {
          const mainTop = $('#enterprise-info .content-main').offset().top;
          const $fixedDom = $('#enterprise-info .content-right');
          if(mainTop >= 82) {
            $fixedDom.removeClass('fixed');
          }
          if(mainTop < 82) {
            $fixedDom.addClass('fixed');
          }
        }
      },
      // 页面滚动时，根据锚点focus右侧当行栏
      scrollFocus() {
        let focusDom = null;
        var topHeidht = $("html").height() - 170;
        if($(`#${this.sideNavData[0].anchor}`).offset().top > topHeidht){
            focusDom = $('#side-nav').find(`a[data-id=${this.sideNavData[0].anchor}]`);
        } else if($(`#${this.sideNavData[this.sideNavData.length - 1].anchor}`).offset().top < topHeidht){
          focusDom = $('#side-nav').find(`a[data-id=${this.sideNavData[this.sideNavData.length - 1].anchor}]`);
        } else {
          for(let i = 1; i < this.sideNavData.length; i++) {
            if($(`#${this.sideNavData[i - 1].anchor}`).offset().top <= topHeidht &&
            $(`#${this.sideNavData[i].anchor}`).offset().top > topHeidht) {
              focusDom = $('#side-nav').find(`a[data-id=${this.sideNavData[i - 1].anchor}]`);
            }
          }
        }
        if(focusDom && focusDom.length) {
          focusDom.parent().siblings().removeClass('selected');
          focusDom.parent().addClass('selected');
        }
      },
      anchorClick(e) {
        e.preventDefault();
        const target = e.currentTarget;
        if(target) {
          $(target).parent().siblings().removeClass('selected');
          $(target).parent().addClass('selected');
          const domId = $(target).data('id');
          const scrollDom = document.getElementById(domId);
          if(scrollDom) {
            scrollDom.scrollIntoView(); // 根据id找到对应DOM滚动到顶部
          }
        }
      },
      setExpandButtons(flag) {
        if(!this.createFlags[flag]) {
          this.$set(this.expands[flag], 'buttons', [
            {
              name: 'edit',
              text: '编辑',
              icon: ''
            },
            {
              name: 'delete',
              text: '删除',
              icon: '',
              type: 'normal'
            }
          ]);
        } else {
          this.$set(this.expands[flag], 'buttons', [
            {
              name: 'save',
              text: '保存',
              icon: ''
            },
            {
              name: 'cancel',
              text: '取消',
              icon: '',
              type: 'normal'
            }
          ]);
        }
      },
      rebuildEditRow(flag) {
        if (this.expandRowKeys[flag].length > 0) {
          for (var i = 0;i < this.currentValue[flag].length; i++) {
            if (this.currentValue[flag][i].id === this.expandRowKeys[flag][0]) {
              const emptyListItemInfo = JSON.parse(JSON.stringify(this.emptyListItem[flag]));
              const originalValueInfo = JSON.parse(JSON.stringify(this.originalValue[flag][i]));
              if (this.expandRowKeys[flag][0] === '') {
                this.currentValue[flag].splice(i, 1, emptyListItemInfo);
              } else {
                this.currentValue[flag].splice(i, 1, originalValueInfo);
              }
            }
          }
        }
      },
      expandRow(flag, data) {
        this.rebuildEditRow(flag);
        if (data.expanded) {
          if (data.row.id !== '') {
            this.createFlags[flag] = false;
          } else {
            this.createFlags[flag] = true;
          }
          if(flag === 'bank') {
            this.$set(this.imageUrl, this.imageCodes.bank, this.getBankImgUrl(data.row));
          }
          this.setExpandButtons(flag);
          this.expandRowKeys[flag] = [];
          this.expandRowKeys[flag] = [data.row.id];
        } else {
          this.expandRowKeys[flag] = [];
        }
      },
      addListItem(flag) {
        console.log("Click the addListItem");
        if (this.isCreate) {
          console.log(this.isCreate);
          this.$message('请先新增并保存主表数据');
          return;
        }
        if(!this.currentValue[flag]) {
          this.currentValue[flag] = [];
        }
        if(!this.originalValue[flag]) {
          this.originalValue[flag] = [];
        }
        this.rebuildEditRow(flag);
        if(!this.createFlags[flag]) {
          this.$set(this.createFlags, flag, true);
          this.setExpandButtons(flag);
          this.currentValue[flag].push(JSON.parse(JSON.stringify(this.emptyListItem[flag])));
          this.originalValue[flag].push(JSON.parse(JSON.stringify(this.emptyListItem[flag])));
          if(flag === 'bank-recored') {
            var bankData = this.currentValue[flag][this.currentValue[flag].length-1];
            this.$set(this.imageUrl, this.imageCodes.bank, this.getBankImgUrl(bankData));
          }
          this.expandRowKeys[flag] = [this.emptyId];
        } else {
          this.createFlags[flag] = false;
          this.setExpandButtons(flag);
          this.currentValue[flag].pop();
          this.expandRowKeys[flag] = [];
        }
      },
      deleteNullValue(obj) {
        var newObj = {};
        var map = Object.keys(obj);
        for(var i = 0; i < map.length; i++) {
          if(obj[map[i]] !== null) {
            newObj[map[i]] = obj[map[i]];
          }
        }
        return newObj;
      },
      // 点击编辑expand表单
      editRowForm(flag) {
        this.createFlags[flag] = true;
        this.setExpandButtons(flag);
        this.originalValue[flag] = JSON.parse(JSON.stringify(this.currentValue[flag]));
      },
      // 点击expand表单取消
      cancelRowForm(flag) {
        this.createFlags[flag] = false;
        const tableArray = this.currentValue[flag];
        if(!tableArray[tableArray.length-1].id) { // expand表单为创建时，点击取消要删除该行
          this.currentValue[flag].pop();
          this.expandRowKeys[flag] = [];
          this.setExpandButtons(flag);
        } else {
          this.currentValue[flag] = JSON.parse(JSON.stringify(this.originalValue[flag]));
        }
      },
      // 点击expand表单删除
      deleteRowForm(flag, args) {
        this.$confirm('是否删除当前记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const [index, row] = args;
          this.$http({
            url: '/ifbp-app-bd/bd/customer/enterprise/child?idtype=' + this.idMap[flag] + '&id=' + row.id,
            method: 'delete',
          }).then((res) => {
            if(res.data.success === true) {
              this.currentValue[flag].splice(index, 1);
              if (window.env === 'dev') {
                this.$message({type: 'success',message: '删除成功!'});
              }
            } else {
              this.$message({type: 'error',message: '删除失败!'});
            }
          }).catch(() => {
            this.$message({type: 'error',message: '请求出错!'});
          });
          this.$set(this.createFlags, flag, false);
          this.setExpandButtons(flag);
        }).catch(() => {
          this.$message({type: 'info',message: '已取消删除'});
        });
      },
      //保存信息
      submit(flag, args) {
        this.$refs[flag].validate((valid) => {
            if(valid) {
                var changedPropertyNames=[];
                var submitData = {};
                var index = 0;
                var row = {};
                if (Object.keys(this.idMap).indexOf(flag) > -1) { // grid
                  index = args[0];
                  row = _.cloneDeep(args[1]);
                  changedPropertyNames = [''];
                  var tableData = JSON.parse(JSON.stringify(this.currentValue[flag]));
                  row = this.deleteNullValue(row);
                  row[this.idMapChild[flag]] = this.id;
                  // row['fk_id_entperson'] = this.id;
                  if(flag === 'bank-record'){
                    row[this.imageCodes[flag]] = this.imageUrl[this.imageCodes[flag]];
                  }
                  if (this.createFlags[flag]) {
                    tableData.pop();
                    tableData.push(row);
                  } else {
                    tableData.splice(index, 1, row);
                  }
                  // submitData = {
                  //   id: this.id,
                  //   changedPropertyNames: changedPropertyNames
                  // };
                  submitData[this.idMap[flag]] = tableData;
                } else {
                  changedPropertyNames = Object.keys(this.currentValue[flag]);
                  changedPropertyNames.push(this.imageCodes[flag]); // 带上图片key
                  submitData = JSON.parse(JSON.stringify(this.currentValue[flag]));
                  // submitData.id = this.id;
                  submitData[this.imageCodes[flag]] = this.imageUrl[this.imageCodes[flag]];
                  // submitData.changedPropertyNames = changedPropertyNames;
                }
                if(!this.isCreate === true) {
                  submitData.id = this.id;
                  submitData.changedPropertyNames = changedPropertyNames;
                }

                const self = this;
                this.$http({
                  url: '/ifbp-app-bd/bd/customer/enterprise/',
                  method: 'post',
                  dataType: 'json',
                  data: submitData,
                }).then((res) => {
                  if(res.data.success === true) {
                    if(Object.keys(self.idMap).indexOf(flag) > -1) { // grid
                      self.$set(self.currentValue, flag, res.data.data[self.idMap[flag]]);
                      const currentValue = this.currentValue[flag];
                      // 重新给原数据赋值
                      self.originalValue[flag] = JSON.parse(JSON.stringify(currentValue));
                      if(self.createFlags[flag]) { // create
                        self.$set(this.createFlags, flag, false);
                        self.setExpandButtons(flag);
                        if (window.env === 'dev') {
                          self.$message('添加成功！');
                        }
                      } else if (window.env === 'dev') {
                          self.$message('更新成功！');
                      }
                      self.expandRowKeys[flag] = [];
                    } else { // form
                      if(self.isCreate) {
                        self.id = res.data.data.id;
                        self.isCreate = false;
                      }
                      if (window.env === 'dev') {
                        self.$message('保存成功！');
                      }
                      const currentValue = this.currentValue[flag];
                      // 重新给原数据赋值
                      self.originalValue[flag] = JSON.parse(JSON.stringify(currentValue));
                      self.createFlags[flag] = false;
                    }
                  } else {
                    this.$message({
                      message: '保存失败！',
                      type: 'error'
                    });
                  }
                }).catch(() => {
                  this.$message({
                    message: '请求出错！',
                    type: 'error'
                  });
                });
            } else {
              // 验证失败
            }
        });
      },
      goBack() {
        window.history.back(-1);
      },
      // 初始化表格expand表单的按钮为非编辑态时的编辑/删除
      setExpandsValue() {
        Object.keys(this.idMap).forEach((v) => {
          const expand = {
            buttonAlign: 'center',
            columnsShowCount: 3,
            buttons: [
              {
                name: 'edit',
                text: '编辑',
                icon: ''
              },
              {
                name: 'delete',
                text: '删除',
                icon: '',
                type: 'normal'
              }
            ]
          };
          this.$set(this.expands, v, expand);
        });
      },
      // 鼠标进入图片显示预览上传图标层
      showHoverCard(flag, event) {
        var target = event.currentTarget;
        if(this.realPath[this.imageCodes[flag]]) {
          target.nextElementSibling.style.display = 'inline-block';
      }
      },
      //   鼠标离开图片隐藏预览上传图标层
      hideHoverCard(event) {
        var target = event.currentTarget;
        target.style.display = 'none';
      },
      // 点击图片预览按钮
      handlePreview(flag){
        var imgUrl = this.imageUrl[this.imageCodes[flag]];
        this.imageUrlsArray = [];
        var self = this;
        imgUrl.split(',').forEach((item) => {
          this.imageUrlsArray.push(self.getRealImg(item));
        });
        this.$refs.imagePreviewer.show();
      },
      // 点击图片上传按钮
      handleUpload(flag) {
        this.$refs[flag+'-upload'].$el.querySelector(".el-upload").click();
      },
      //点击新增银行账户按钮
      addBankForm (flag) {
        const self = this;

        this.$refs[flag].validate((valid) => {
            if(valid) {
              var submitData = {};
              submitData = JSON.parse(JSON.stringify(this.currentValue[flag]));
              delete submitData.id;
              delete submitData.BankAccBas;
              if(!this.isAddBankForm){
                self.$http({
                  url: '/ifbp-app-bd/bd/bank/accbas/',
                  method: 'post',
                  dataType: 'json',
                  data: submitData,
                }).then((res) => {
                  if(res.data.success === true) {
                    var rowId = self.bankRowId;
                    var currentValue = self.currentValue['bank-record'];
                    var originalValue = self.originalValue['bank-record'];
                    self.$set(currentValue,rowId,res.data.data);
                    self.$set(originalValue,rowId,res.data.data);
                    self.$message({
                      message:'保存成功',
                    });
                    self.showBankForm = false;
                  } else {
                    self.$message({
                      message: '保存失败！',
                      type: 'error'
                    });
                  }
                }).catch(() => {
                  self.$message({
                    message: '请求出错！',
                    type: 'error'
                  });
                });
              }else {
                self.$http({
                  url: '/ifbp-app-bd/bd/customer/enterprise/addBank?id=' + this.id,
                  method: 'post',
                  dataType: 'json',
                  data: submitData,
                }).then((res) => {
                  if(res.data.success === true) {
                    self.currentValue['bank-record'].push(res.data.data);
                    self.originalValue['bank-record'].push(res.data.data);
                    self.$message({
                      message:'保存成功',
                    });
                    self.showBankForm = false;
                  } else {
                    self.$message({
                      message: '保存失败！',
                      type: 'error'
                    });
                  }
                }).catch(() => {
                  self.$message({
                    message: '请求出错！',
                    type: 'error'
                  });
                  });
              }
            } else {
              // 验证失败
              self.$message({
                message: '验证失败',
                type: 'error'
              });
            }
        });
      },
      //点击银行账户查看按钮
      checkTableRow (row) {
        var bankRecordForm = JSON.parse(JSON.stringify(row));
        this.showBankForm = true;
        this.isEditBankForm = false;
        this.$set(this.currentValue,'bank-record-form',bankRecordForm);
      },
      //点击银行账户编辑按钮
      editTableRow (row,index) {
        var bankRecordForm = JSON.parse(JSON.stringify(row));
        this.isAddBankForm = false;
        this.showBankForm = true;
        this.isEditBankForm = true;
        this.bankRowId = index;
        this.$set(this.currentValue,'bank-record-form',bankRecordForm);
      },
      //点击银行账户删除数据
      deleteTableRow (row,index) {
        const self = this;
        self.$confirm('是否删除当前记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$http({
            url: '/ifbp-app-bd/bd/bank/accbas/' + row.pk_bankaccbas,
            method: 'DELETE',
          }).then((res) => {
            if (res.data.success === true) {
              self.currentValue['bank-record'].splice(index,1);
              self.originalValue['bank-record'].splice(index,1);
              self.$message('删除成功');
            } else {
              self.$message('删除失败');
            }
            }).catch(() => {
              self.$message('删除失败');
            });
        }).catch(() => {
          self.$message('已取消删除');
        });
      },
    },

    mounted() {
      this.scroll();
      document.getElementById('main-right').addEventListener('scroll', this.scroll);
    },
  };
</script>
<style>
  #enterprise-info .detail-container .el-form-item {
    margin-bottom: 22px;
  }
  #enterprise-info .detail-container input.el-input__inner {
    height: 28px !important;
  }
  #enterprise-info .detail-container .el-upload__input {
  display: none;
  }
  #enterprise-info .detail-container .el-form-item__label {
    font-size: 13px;
  }
  #enterprise-info .detail-container .save {
    width: 100px;
    margin-left: calc(50% - 50px);
  }
  #enterprise-info .detail-container .group .save {
    width: 100px;
    margin-left: 10px;
    border-radius: 4px;
  }
  #enterprise-info .detail-container .group {
    width: 220px;
    margin-left: calc( 50% - 110px);
    margin-bottom: 20px;
  }
  #enterprise-info .detail-container .el-upload.el-upload--text {
    height: 100%;
    width: 100%;
  }
  #enterprise-info .detail-container .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  #enterprise-info .detail-container .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
/*  #enterprise-info .detail-container .el-table td.is-left, .el-table th.is-left{
    text-align: center;
  }
  .detail-container .el-table th>.cell{
    text-align: center;
  }
  .detail-container .el-table .cell{
    padding-left:0;
  }*/
  #enterprise-info .detail-container .el-table .cell{
    padding-left:10px;
    padding-right:0;
  }
</style>
<style scoped>
  #cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: hsla(0,0%,100%,.9);
    z-index: 200000;
    transition: opacity .3s;
  }
  .avatar-uploader {
    width: 300px;
    height: 300px;
    margin-left: calc(50% - 150px);
    text-align: center;
    margin-top: calc(290px - 180px);
  }
  .avatar-uploader-icon {
    width: 300px;
    height: 300px;
    line-height: 300px;
  }
  .el-icon-loading {
    top: 50%;
    position: absolute;
    left: 50%;
    margin-left: -25px;
    margin-top: -25px;
    font-size: 50px;
  }
  .el-icon-edit, .el-icon-plus {
    font-size: 15px;
    color: #00a5e3;
    cursor: pointer;
    margin-left: 5px;
  }
  .detail-item {
    min-height: 250px;
    background-color: white;
    /* border-bottom: 1px solid #eee; */
    padding: 10px;
    text-align: left;
  }
  .detail-items{
    margin: 0 10px;
    border-bottom: 1px solid #eee;
  }
  .detail-item .title{
    font-size: 20px;
  }
  .child-item {
    /*height: 250px;*/
    border-bottom: 1px solid #CECECE;;
    margin: 10px;
    padding-bottom: 15px;
  }
  .child-item:last-child{
    border:none;
  }
  .child-item-left {
    margin-right: 10px;
    /*border: 1px solid black;*/
    width: calc(40% - 12px);
    vertical-align: top;
    display: inline-block;
  }
  .child-item-right {
    margin-left: 10px;
    /*border: 1px solid black;*/
    width: calc(60% - 12px);
    vertical-align: top;
    display: inline-block;
  }
  .cards-title {
    /* width: 100%; */
    font-size: 20px;
    background-color: white;
    /*border: 1px solid #cecece;*/
    height: 64px;
    padding: 14px;
    margin: 20px 20px 0 20px;
  }
  .content-main {
    background-color: #eeeff1;
    margin: 20px 20px 0 20px;
  }
  .child-title {
    line-height: 20px;
    font-size: 18px;
    text-align: left;
    padding: 10px 10px 10px 10px;
    font-weight: 600;
  }
  .child-title-left {
    line-height: 20px;
    font-size: 18px;
    text-align: left;
    padding: 10px 10px 15px 10px;
    font-weight: 600;
  }
  .child-title-right{
    font-size: 18px;
    line-height: 20px;
    text-align: right;
    padding: 10px 10px 15px 10px;
    font-weight: 600;
  }
  .child-title-right i{
    cursor: pointer;
  }
  #enterprise-info{
     text-align:center;
   }
  #enterprise-info .content-left{
    position:relative;
    width: calc(100% - 175px);
    float: left;
    margin-left:0;
  }
  #enterprise-info .content-right {
    width: 164px;
    float: right;
    position: relative;
    border: 1px solid #DDD;
    font: 14px 'Microsoft YaHei';
    padding: 10px 40px 10px 50px;
    background-color: #FFF;
    z-index: 20;
    margin:0;
  }

  #enterprise-info .content-right.fixed {
    width: 164px;
    position: fixed;
    right: 20px;
    top: 80px;
    border: 1px solid #DDD;
    font: 14px 'Microsoft YaHei';
    padding: 10px 40px 10px 50px;
    background-color: #FFF;
    z-index: 20;
  }
  #side-nav li{
    width: 85px;
  }
  ul#side-nav {
    position: relative;
  }
  ul#side-nav li {
    list-style-type: none;
    position: relative;
  }
  ul#side-nav li.selected a {
    color: #189CC7;
  }
  ul#side-nav li a {
    display: block;
    line-height: 35px;
    text-decoration: none;
    color: #666;
  }
  ul#side-nav li.selected::after, ul#side-nav li::before, ul#side-nav span.line {
    content: "";
    position: absolute;
  }
  ul#side-nav span.line {
      display: block;
      top: 20px;
      left: -21px;
      width: 1px;
      height: calc(100% - 35px);
      background: #B2B2B2;
      border-left: 1px dashed #ccc;
      z-index: 0;
  }
  ul#side-nav li::before {
    width: 9px;
    height: 9px;
    position: absolute;
    border: 1px solid #B2B2B2;
    background-color: #FFF;
    border-radius: 50%;
    left: -25px;
    top: 16px;
    z-index: 2;
  }
  ul#side-nav li.selected::before {
    background-color: #189CC7;
    border: 1px solid #189CC7;
  }
  ul#side-nav li.selected::after {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 1px solid #189CC7;
    left: -28px;
    top: 13px;
    position: absolute;
  }
  /* === side-nav end === */
  .upload-box{
    border-radius: 5px;
  }
  .editBank{
    margin-bottom:20px;
  }
</style>
