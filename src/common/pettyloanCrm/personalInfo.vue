<template>
<div id="pettyloanCustomerInfo">
  <div class="title-header">
    <h2 class="name">{{title}}</h2>
    <!--<el-button type="primary" @click="goBack" style="float:right;">返回</el-button>-->
  </div>
  <div class="search-header">
    <el-button class="fl"  v-if="isCreate" type="primary" @click="createForm">保存</el-button>
    <el-button class="fr" type="primary" @click="goBack">返回</el-button>
  </div>
  <div class="content_main">
    <div class="content_left">
      <div class="content_left_item" id="pettyloanCustomerInfoDiv">
        <h2 class="title">基本信息</h2>
        <div class="idCardInfo">
          <div class="idCardInfo_right">
            <el-template :pkTemp="pktemp.customer"
                        ref="customer"
                        @change="changeHandle"
                        @setEmptyKeys="setEmptyKey('customer', arguments[0])"
                        :hide-title="true"
                        :isEdit="createFlags['customer']"
                        :template-value="currentValues.customer"
                        class="customer_template">
            </el-template>
            <el-button-group v-if="createFlags['customer'] && !isCreate" class="button-group">
              <el-button class="save" type="primary" size="small" @click="submit('customer')" style="width:80px; display: block; margin: 0 auto;">保存</el-button>
              <el-button class="save" type="primary" size="small" @click="toggle('customer')" style="width:80px; display: block; margin-left:20px;">取消</el-button>
            </el-button-group>
            <el-button  v-else-if="!isCreate" class="save" type="primary" size="small" @click="toggle('customer')" style="width:80px; display: block; margin: 0 auto;">编辑</el-button>
          </div>
        </div>
      </div>

      <!-- 深度信息 -->
      <div class="content_left_item" id="deepInfo">
        <h2 class="title">
          深度信息 <i v-if="!createFlags['deep-info']" class="el-icon-edit" @click="toggle('deep-info')" style="font-size: 14px;color: #00a5e3;cursor: pointer;margin-left: 5px;"></i>
        </h2>
        <div class="detail-item" id="basic">
          <!-- <div class="child-title" id="deep-info"><b>深度信息</b><i v-if="!createFlags['deep-info']" class="el-icon-edit" @click="toggle('deep-info')"></i></div> -->
          <div class="child-item">
            <div class="content-left" style="width: 100%;">
              <el-template :pkTemp="pktemp['deep-info']"
                          ref="deep-info"
                          @change="changeHandle"
                          @setEmptyKeys="setEmptyKey('deep-info', arguments[0])"
                          :hide-title="true"
                          :isEdit="createFlags['deep-info']"
                          :templateValue="currentValues['deep-info']">
              </el-template>
              <el-button-group v-if="createFlags['deep-info'] && !isCreate" class="button-group">
                <el-button class="save" size="small" type="primary" @click="submit('deep-info')" style="width:80px; display:block;">保存</el-button>
                <el-button class="save" size="small" type="primary" @click="toggle('deep-info')" style="width:80px; display:block; margin-left:20px;">取消</el-button>
              </el-button-group>
            </div>
          </div>

        </div>
      </div>

      <!-- 关系人信息 -->
      <div class="content_left_item" id="contactRecord">
        <el-row class="content_label">
          <el-col :span="14">
            <h2 class="title" style="width:60%">关系人信息
              <i class="el-icon-plus" style="font-size: 14px;color: #00a5e3;cursor: pointer;margin-left: 5px;" @click="addListItem('contacts')"></i>
            </h2>
          </el-col>
          <el-col :span="10" style="text-align: right;">
            <!--<el-button size="mini" type="primary" icon="plus" style="margin-right:20px; margin-bottom: 5px; margin-bottom: 7px; vertical-align: middle;" @click="addListItem('contacts')"></el-button>-->
            <i class="el-icon-setting title_icon" @click="editTableColumns('contacts')"></i>
          </el-col>
        </el-row>
        <el-template
            :pkTemp="pktemp.contacts"
            :expand="expands['contacts']"
            :template-value="currentValues.contacts"
            :expandRowKeys="expandRowKeys.contacts"
            :table-style="tableStyle"
            rowKey="id"
            ref="contacts"
            :isEdit="createFlags['contacts']"
            hideTitle="true"
            @setEmptyKeys="setEmptyKey('contacts', arguments[0])"
            @save-expand-form="submit('contacts', arguments)"
            @delete-expand-form="deleteRowForm('contacts', arguments)"
            @edit-expand-form="editRowForm('contacts')"
            @cancel-expand-form="cancelRowForm('contacts')"
            @expand-row="function(row, expanded){expandRow('contacts', {row:row,expanded:expanded})}">
        </el-template>
      </div>

      <!-- 银行账户 -->
      <div class="content_left_item" id="bankAccount">
        <el-row class="content_label">
          <el-col :span="14">
            <h2 class="title" style="width:60%">银行账户
              <i class="el-icon-plus" style="font-size: 14px;color: #00a5e3;cursor: pointer;margin-left: 5px;" @click="addBankRow"></i>
            </h2>
          </el-col>
          <el-col :span="10" style="text-align: right;">
            <!--<el-button size="mini" type="primary" icon="plus" style="margin-right:20px; margin-bottom: 5px; margin-bottom: 7px; vertical-align: middle;" @click="addListItem('bank')"></el-button>-->
            <i class="el-icon-setting title_icon" @click="editTableColumns('bank')"></i>
          </el-col>
        </el-row>
        <div>
          <div class="leftTemplate">
            <el-template
                :pkTemp="pktemp.bank"
                :template-value="currentValues.bank"
                :table-style="tableStyle"
                rowKey="id"
                ref="bank"
                :isEdit="createFlags['bank']"
                :hide-title="true"
                @setEmptyKeys="setEmptyKey('bank', arguments[0])"
                :show-button="showBankButton"
                @check-table-row="checkTableRow"
                @edit-table-row="editTableRow"
                @delete-table-row="deleteTableRow">
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
                          :templateValue="currentValues['bank-record-form']"
                          @setEmptyKeys="function(v){setEmptyKey('bank-record-form',v)}"
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
          <div style="width:100%; clear:both;"></div>
        </div>
      </div>


      <!-- 业务员信息 -->
      <div class="content_left_item" id="salesmanInfo">
          <h2 class="title">
            业务员信息 <i v-if="!createFlags['salesman-info']" class="el-icon-edit" @click="toggle('salesman-info')" style="font-size: 14px;color: #00a5e3;cursor: pointer;margin-left: 5px;"></i>
          </h2>
          <!-- <div class="child-title" id="salesman-info"><b>收支信息</b><i v-if="!createFlags['salesman-info']" class="el-icon-edit" @click="toggle('salesman-info')"></i></div> -->
          <div class="child-item">
            <div class="content-left">
              <el-template :pkTemp="pktemp['salesman-info']"
                          ref="salesman-info"
                          @change="changeHandle"
                          @setEmptyKeys="setEmptyKey('salesman-info', arguments[0])"
                          :hide-title="true"
                          :isEdit="createFlags['salesman-info']"
                          :templateValue="currentValues['salesman-info']">
              </el-template>
              <el-button-group  v-if="createFlags['salesman-info'] && !isCreate" class="button-group">
                <el-button class="save" size="small" type="primary" @click="submit('salesman-info')" style="width:80px; display:block;">保 存</el-button>
                <el-button class="save" size="small" type="primary" @click="toggle('salesman-info')" style="width:80px; display:block; margin-left: 20px;">取 消</el-button>
              </el-button-group>
            </div>
          </div>
      </div>

      <!-- 其他信息 -->
      <!-- <div class="content_left_item" id="otherInfo">
          <h2 class="title">
            其他信息 <i v-if="false" class="el-icon-edit" @click="toggle('other-info')" style="font-size: 14px;color: #00a5e3;cursor: pointer;margin-left: 5px;"></i>
          </h2>
          <div class="child-item">
            <div class="content-left">
              <el-template :pkTemp="pktemp['other-info']"
                          ref="other-info"
                          @change="changeHandle"
                          @setEmptyKeys="setEmptyKey('other-info', arguments[0])"
                          :hide-title="true"
                          :isEdit="false"
                          :templateValue="currentValues['other-info']">
              </el-template>
            </div>
          </div>
      </div> -->

    </div>
    <div class="nav_right">
      <ul id="side-nav">
        <li v-for="(item, index) in sideNavData" :class="{selected: index === 0}" :key="index">
          <a href="javascript:;" :data-id="item.anchor" @click="anchorClick">{{item.label}}</a>
        </li>
        <span class="line" style=""></span>
      </ul>
    </div>
  </div>
  <div id="cover" ref="cover">
    <div class="el-loading-spinner">
      <svg viewBox="25 25 50 50" class="circular">
        <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
      </svg>
    </div>
  </div>
  <el-image-previewer ref="imagePreviewer" :imageUrls="imageUrlsArray"></el-image-previewer>
  <el-dialog v-model="dialogVisible" size="tiny">
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
</div>
</template>
<script>
// import echarts from 'vue-echarts';
import _ from 'lodash';

export default {
  data() {
    var isCreate = this.$route.params.id === 'add';
    return {
      showBankForm: false,
      isEditBankForm: false, //判断是否是编辑态
      isAddBankForm: false, //判断是否是新增
      bankRowId: '', //修改银行账户的时候需要的行标
      bankValue: {},
      pktemp: {
        // 'deep-info': '50212a7f-e3eb-4d67-9786-4104c712a914',
        'deep-info': '94b5f6ed-7987-428b-b96d-dd08f9982180', // 深度信息_小贷
        // 'marital-status1': '1510c82a-146c-48f8-8b3c-51746166fb9f',
        // 'marital-status2': '6c5593b3-dd46-4950-9ea6-b12a1ed12507',
        // 'child-detail': '7c647893-4258-4584-a8ab-c5eb1f94b5f2',
        // habitation: 'f4dc61fa-1724-4fe7-8b5d-35c507860585',
        // 'job-detail': 'e8a9e0f1-4694-41e6-af56-0379af75c2f7',
        // 'other-info': '1ec3d27a-6ed8-4ca9-ac7d-f1db6446299e', // 其他信息
        'salesman-info': '3a9f444f-1228-48c0-90cb-e1f8dfadaab7', // 业务员信息_小贷
        customer: '8486f8e0-de3d-4683-92f8-f0d6e69ebcfb', // 客户信息(右)_小贷
        contacts: '4075ab2d-e3c2-4327-ad95-037d56032e7b', // 关系人信息_小贷
        bank: 'aa9833c7-8a68-4cb4-96fe-e32d97ebcdc3', // 个人客户银行账户表格_小贷
        // capital: '66a62597-bc64-428e-bf9f-decaed96d4d2',
        'bank-record-form': 'a59097d0-ccf6-4196-b5b3-9faddfe8ebfc', // 个人客户银行账户表单_小贷
      },
      title: '客户信息设置',
      id: this.$route.params.id,
      isCreate: isCreate,
      templateValue: '', // 整个元数据的集合
      promises: {},
      emptyListItem: {},
      emptyId: '',
      loadDefer: [],
      idMap: {
        'child-detail': 'childreninfo_id',
        habitation: 'estateinfo_id',
        contacts: 'contacts_id',
        bank: 'probank_id',
        capital: 'procapital_id'
      },
      fileList: [],
      avFileList: [],
      imageUrl: {},
      imageCodes: {
        'deep-info': 'id_img',
        'marital-status1': 'mateidimg',
        'marital-status2': 'mate_attach',
        'child-detail': 'child_img',
        habitation: 'estateinfo_img',
        'job-detail': 'work_img',
        // 'salesman-info': 'payments_img',
        idImg: 'id_img',
        customer: 'upbody_img',
        bank: 'show_img',
        capital: 'capital_img'
      },
      formForCreate: ['customer'],
      realPath: {},
      bankImgUrls: [],
      expands: {},
      sideNavData: [ // 右侧导航目录数据
        {
          anchor: 'pettyloanCustomerInfoDiv',
          label: '基本信息'
        },
        {
          anchor: 'deepInfo',
          label: '深度信息'
        },
        /* 基本档案 子标题
        {
          anchor: 'deep-info',
          label: '深度信息'
        },
        {
          anchor: 'marital-status',
          label: '婚姻信息'
        },
        {
          anchor: 'child-detail',
          label: '子女信息'
        },
        {
          anchor: 'habitation',
          label: '居住信息'
        },
        {
          anchor: 'job-detail',
          label: '工作信息'
        },
        {
          anchor: 're-exp-detail',
          label: '收支信息'
        },
         */
        /*{
          anchor: 'creditRecord',
          label: '信用档案'
        },*/
        {
          anchor: 'contactRecord',
          label: '关系人信息'
        },
        {
          anchor: 'bankAccount',
          label: '银行账户'
        },
        /*{
          anchor: 'avRecord',
          label: '影音档案'
        },*/
        {
          anchor: 'salesmanInfo',
          label: '业务员信息'
        },
        // {
        //   anchor: 'otherInfo',
        //   label: '其他信息'
        // },
        /*{
          anchor: 'familyRecord',
          label: '族谱档案'
        },
        {
          anchor: 'followRecord',
          label: '跟进档案'
        },*/
      ],
      tableStyle: {
        'max-height': '1000px'
      },
      myEcharts: {
        options: '',
        graphStyle: {},
      },
      // basicRecord formdata
      basicRecordFrom: [
        {
          flag: 'contact',
          name: '深度信息',
          buttons: [
            {
              name: 'edit',
              icon: 'edit'
            }
          ]
        },
        {
          flag: 'marriageInfo',
          name: '婚姻信息',
          buttons: [
            {
              name: 'edit',
              icon: 'edit'
            },
            {
              name: 'upload',
              icon: 'upload2'
            }
          ]
        },
        {
          flag: 'childrenInfo',
          name: '子女信息',
          buttons: [
            {
              name: 'edit',
              icon: 'edit'
            },
            {
              name: 'upload',
              icon: 'upload2'
            }
          ]
        },
        {
          flag: 'residenceInfo',
          name: '居住信息',
          buttons: [
            {
              name: 'add',
              icon: 'plus'
            }
          ]
        },
        {
          flag: 'workInfo',
          name: '工作信息',
          buttons: [
            {
              name: 'add',
              icon: 'plus'
            },
            {
              name: 'upload',
              icon: 'upload2'
            }
          ]
        },
        {
          flag: 'paymentInfo',
          name: '收支信息',
          buttons: [
            {
              name: 'add',
              icon: 'plus'
            },
            {
              name: 'upload',
              icon: 'upload2'
            }
          ]
        }
      ],
      followTableTmp: {
        showRowCount: 4,
        columns: [
          {
            flag: 'follower',
            name: '跟进人',
          },
          {
            flag: 'followTime',
            name: '跟进时间',
            type: 'date'
          },
          {
            flag: 'followType',
            name: '跟进方式',
          },
          {
            flag: 'followContent',
            name: '内容',
          },
          {
            flag: 'followerName',
            name: '备注',
          },
        ],
      },
      // 存储ui模板grid展开列
      expandRowKeys: {
        'child-detail': [],
        habitation: [],
        contacts: [],
        bank: [],
        capital: [],
      },
      originalValues: {},
      // currentValues flags
      currentValues: {
        // 'deep-info': '',
        // 'marital-status1': '',
        // 'marital-status2': '',
        // 'child-detail': '',
        // habitation: '',
        // 'job-detail': '',
        // 'salesman-info': '',
        // customer: '',
        // contacts: '',
        // bank: '',
        // capital: '',
      },
      // create flags
      createFlags: {
        'deep-info': isCreate,
        'marital-status1': isCreate,
        'marital-status2': isCreate,
        'child-detail': isCreate,
        habitation: isCreate,
        'job-detail': isCreate,
        'salesman-info': isCreate,
        customer: isCreate,
        contacts: isCreate,
        bank: isCreate,
        capital: isCreate,
      },
      dialogImageUrl:'',
      dialogVisible: false,
      imageUrlsArray: [],
      showBankButton: {
        width: 100,
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
  methods: {
    //初始化Promise数组，对每一个pktemp的属性进行循环，
    initPromise(request,requestBank) {
      var tmpRequest;
      Object.keys(this.pktemp).forEach((flag) => {
        var promise = new Promise((res, rej) => {
          this.promises[flag] = {
            resolve: res,
            reject: rej
          };
        });
        if(flag !== 'bank-record-form'){
          this.loadDefer.push(promise);
        }
        if(!this.isCreate) {
          tmpRequest = (['bank-record-form', 'bank'].indexOf(flag) > -1) ? requestBank : request;
          Promise.all([promise, tmpRequest]).then(() => {
            this.assignValues(flag);
          });
        }
      });
      Promise.race(this.loadDefer).then(() => {
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.cover.remove();
          },400);
        });
      });
    },
    // 请求值数据
    require() {
      const url = '/ifbp-app-bd/bd/customer/personal/' + this.id;
      const self = this;
      return this.$http({
        url: url,
        method: 'GET',
      }).then((res) => {
        if(res.data.success === true) {
          self.templateValue = res.data.data;
          this.initImgUrl(res.data.data);
          this.initAvFileList(res.data.data);
        }
      });
    },
    // 请求银行账户值数据
    requireBank() {
      const url = '/ifbp-app-bd/bd/customer/personal/bank?id=' + this.id;
      return this.$http({
        url: url,
        method: 'GET',
      }).then((res) => {
        if(res.data.success === true) {
          this.bankValue = res.data.data;
        } else {
          this.$message('银行账户获取账户失败');
        }
      }).catch(() => {
        this.$message('银行账户请求出错');
      });
    },
    assignValues(flag) {
      if(flag === 'bank') {
        this.$set(this.currentValues,flag,this.bankValue);
      } else if (Object.keys(this.idMap).indexOf(flag) > -1) { // grid
        this.$set(this.currentValues, flag, this.templateValue[this.idMap[flag]] || []);
      } else if(flag !== 'bank-record-form') { // form
        var map = Object.keys(this.currentValues[flag]);
        for(var i=0;i<map.length;i++){ // 从返回值中获取出form所有数据
          this.currentValues[flag][map[i]] = this.templateValue[map[i]] || '';
        }
        // 修复参照初次加载不显示的问题
        this.currentValues[flag].beanMap = this.templateValue.beanMap || {};
      }
      this.originalValues[flag] = JSON.parse(JSON.stringify(this.currentValues[flag]));
    },
    getBankImgUrl(bankData) {
      return bankData[this.imageCodes.bank] || '';
    },
    initImgUrl(data) {
      const self = this;
      Object.keys(this.imageCodes).forEach((v) => {
        if(v === 'bank') {
          var bankDatas = data[self.idMap.bank];
          var bankImgUrl = '';
          if(bankDatas instanceof Array && bankDatas.length) {
            bankImgUrl = self.getBankImgUrl.call(self, bankDatas[0]);
          }
          this.$set(self.imageUrl, self.imageCodes[v], bankImgUrl);
        }else {
          self.$set(self.imageUrl, self.imageCodes[v], data[self.imageCodes[v]] === null ? '' : data[self.imageCodes[v]]);
        }
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
    beforeAvatarUpload(){
      return true;
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
    handleAvatarSuccess(id, res){
      console.log(id+res+"文件上传成功");
      if(id === 'bank') { // 银行账户图片
        this.$set(this.imageUrl, this.imageCodes[id], res.data);
        if(!this.createFlags[id]) {
          this.addListItem(id);
        }
      } else if (Object.keys(this.idMap).indexOf(id) > -1 || id === 'idImg') { // grid 中图片(或者身份证照片)上传后直接保存回执
        // grid 中的图片貌似都可以多张?
        var muiltPath = this.imageUrl[this.imageCodes[id]];
        if (muiltPath === '') {
          muiltPath = res.data;
        } else {
          muiltPath = muiltPath.split(',');
          muiltPath.push(res.data);
          muiltPath = muiltPath.join(',');
        }

        this.$set(this.imageUrl, this.imageCodes[id], muiltPath);

        var submitData = {};
        submitData[this.imageCodes[id]] = this.imageUrl[this.imageCodes[id]];
        submitData.changedPropertyNames = [this.imageCodes[id]];
        submitData.id = this.id;
        this.$http({// 保存回执
          url: '/ifbp-app-bd/bd/customer/personal/',
          method: 'post',
          dateType: 'json',
          data: submitData
        }).then((response) => {
          if (response.data.success === true) {
            if (window.env === 'dev') {
              this.$message('图片保存成功');
            }
          } else {
            this.$error('图片保存失败');
          }
        }).catch(() => {
          this.$error('图片保存失败');
        });
      } else { // form 上传后先赋值，点保存才存回执
        this.$set(this.imageUrl, this.imageCodes[id], res.data);
        this.$set(this.createFlags, id, true);
      }
    },
    handleAvRecordSuccess(res, file, fileList) {
      console.log("影音档案上传成功："+res, file, fileList);
      let filePath = '';
      const submitData = {};
      if(res.success === true && res.data) {
        filePath = res.data || '';
      } else {
        if (window.env === 'dev') {
          this.$error('保存失败');
        }
        return;
      }
      const fileData = {
        filename: file.raw.name,
        filepath: filePath,
        filesize: file.raw.size,
        filetype: file.raw.type,
        mediainfo_id: this.id
      };
      const self = this;
      submitData.changedPropertyNames = [''];
      submitData.mediainfo_id = [fileData];
      submitData.id = this.id;

      this.$http({
        url: '/ifbp-app-bd/bd/customer/personal/',
        method: 'post',
        dataType: 'json',
        data: submitData
      }).then((response) => {
        if(response.data.success === true) {
          self.templateValue = response.data.data;
          self.avFileList.push({
            name: file.raw.name,
            url: self.getRealImg(filePath)
          });
          if (window.env === 'dev') {
            self.$message('保存成功');
          }
        }else {
          self.$error('保存失败');
        }
      }).catch(() => {
        self.$error('保存失败');
      });
    },
    scroll() {
      if(this.$route.path.indexOf('/pettyloanCrm/personalInfo') < 0){
        return;
      }
      this.fixedNav();
      this.scrollFocus();
    },
    // 控制side-nav悬浮在页面右上方
    fixedNav() {
      if($('#pettyloanCustomerInfo .content_main').length > 0) {
        const mainTop = $('#pettyloanCustomerInfo .content_main').offset().top;
        const $fixedDom = $('#pettyloanCustomerInfo .nav_right');
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
    /* remove picture */
    handleRemove(file) {
      const self = this;
      const curFileList = this.templateValue.mediainfo_id;
      if(curFileList) {
        curFileList.forEach((v, i) => {
          if(file.url.indexOf(v.filepath) > -1) {
            this.$http({
              url: '/ifbp-app-bd/bd/customer/personal/child?idtype=mediainfo_id&id=' + v.id,
              method: 'delete',
            }).then((res) => {
              if(res.data.success === true) {
                if (window.env === 'dev') {
                  self.$message('删除成功！');
                }
                self.avFileList.splice(i,1);
                self.templateValue.mediainfo_id.splice(i,1);
              } else {
                self.$message('删除失败！');
              }
            });
          }
        });
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    changeHandle(data) {
      if(data.key === 'salesman') {
        this.$set(this.currentValues['salesman-info'], 'def1', data.value && data.value.length ? data.value[0].refcode : '');
      }
    },
    // 点击设置按钮，弹出穿梭框显示隐藏列
    editTableColumns(flag) {
      if(this.$refs[flag]) {
        var gridVm = this.$refs[flag].$children[0];
        if(gridVm && typeof gridVm.editColumns === 'function') {
          gridVm.editColumns();
        }
      }
    },
    toggle(flag) {
      this.createFlags[flag] = !this.createFlags[flag];
      // rebuild original data
      this.currentValues[flag] = JSON.parse(JSON.stringify(this.originalValues[flag]));
    },
    /* 个人档案 事件处理 */
    handleBasicRecordButton(eventName, itemName) {
      console.log('editBasic', eventName, itemName);
      this.$router.push('/pettyloanCrm/personalDetail/' + this.id);
    },
    setEmptyKey(flag, value) {
        if(Object.keys(this.idMap).indexOf(flag) < 0){ // form
          this.$set(this.currentValues, flag, value);
        } else { // grid
          this.emptyListItem[flag] = value;
          this.emptyListItem[flag].id = this.emptyId;
        }
        this.promises[flag].resolve(flag);
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
        for (var i = 0;i < this.currentValues[flag].length; i++) {
          if (this.currentValues[flag][i].id === this.expandRowKeys[flag][0]) {
            const emptyListItemInfo = JSON.parse(JSON.stringify(this.emptyListItem[flag]));
            const originalValueInfo = JSON.parse(JSON.stringify(this.originalValues[flag][i]));
            if (this.expandRowKeys[flag][0] === '') {
              this.currentValues[flag].splice(i, 1, emptyListItemInfo);
            } else {
              this.currentValues[flag].splice(i, 1, originalValueInfo);
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
      if (this.isCreate) {
        this.$message('请先新增并保存主表数据');
        return;
      }
      if(!this.currentValues[flag]) {
        this.currentValues[flag] = [];
      }
      if(!this.originalValues[flag]) {
        this.originalValues[flag] = [];
      }
      this.rebuildEditRow(flag);
      if(!this.createFlags[flag]) {
        this.$set(this.createFlags, flag, true);
        this.setExpandButtons(flag);
        this.currentValues[flag].push(JSON.parse(JSON.stringify(this.emptyListItem[flag])));
        this.originalValues[flag].push(JSON.parse(JSON.stringify(this.emptyListItem[flag])));
        if(flag === 'bank') {
          var bankData = this.currentValues[flag][this.currentValues[flag].length-1];
          this.$set(this.imageUrl, this.imageCodes.bank, this.getBankImgUrl(bankData));
        }
        this.expandRowKeys[flag] = [this.emptyId];
      } else {
        this.createFlags[flag] = false;
        this.setExpandButtons(flag);
        this.currentValues[flag].pop();
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
      this.originalValues[flag] = JSON.parse(JSON.stringify(this.currentValues[flag]));
    },
    // 点击expand表单取消
    cancelRowForm(flag) {
      this.createFlags[flag] = false;
      const tableArray = this.currentValues[flag];
      if(!tableArray[tableArray.length-1].id) { // expand表单为创建时，点击取消要删除该行
        this.currentValues[flag].pop();
        this.expandRowKeys[flag] = [];
        this.setExpandButtons(flag);
      } else {
        this.currentValues[flag] = JSON.parse(JSON.stringify(this.originalValues[flag]));
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
          url: '/ifbp-app-bd/bd/customer/personal/child?idtype=' + this.idMap[flag] + '&id=' + row.id,
          method: 'delete',
        }).then((res) => {
          if(res.data.success === true) {
            this.currentValues[flag].splice(index, 1);
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
    // 保存信息
    createForm(){
        console.log("this is createform");
        this.handleMultiValidate(['customer',]).then(() => {
          var submitData = {id: ''};
          this.formForCreate.forEach((formID) => {
            Object.keys(this.currentValues[formID]).forEach((v) => {
              submitData[v] = this.currentValues[formID][v];
            });
          });
          submitData[this.imageCodes.customer] = this.imageUrl[this.imageCodes.customer];
          this.$http({
            url: '/ifbp-app-bd/bd/customer/personal/',
            method: 'post',
            dataType: 'json',
            data: submitData
          }).then((res) => {
            if(res.data.success === true) {
              if (window.env === 'dev') {
                this.$message('添加成功');
              }
              this.id = res.data.data.id;
              this.$router.push('/pettyloanCrm/personalInfo/' + this.id);
              window.location.reload();
              // this.originalValues = JSON.parse(JSON.stringify(this.currentValues));
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
          // this.$message.error('表单验证错误');
        });

      },
    submit(flag, args) {
      console.log("submit执行了");
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
                var tableData = JSON.parse(JSON.stringify(this.currentValues[flag]));
                row = this.deleteNullValue(row);
                row[this.idMap[flag]] = this.id;
                if(flag === 'bank'){
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
                changedPropertyNames = Object.keys(this.currentValues[flag]);
                submitData = JSON.parse(JSON.stringify(this.currentValues[flag]));
                // submitData.id = this.id;
                if(this.imageCodes[flag]) {
                  changedPropertyNames.push(this.imageCodes[flag]); // 带上图片key
                  submitData[this.imageCodes[flag]] = this.imageUrl[this.imageCodes[flag]];
                }
                // 删除def1
                // if(flag === 'salesman-info') {
                //   delete submitData.def1;
                //   var index = changedPropertyNames.indexOf('def1');
                //   if (index > -1) {
                //   changedPropertyNames.splice(index, 1);
                //   }
                // }
                // submitData.changedPropertyNames = changedPropertyNames;
              }
              if(!this.isCreate === true) {
                submitData.id = this.id;
                submitData.changedPropertyNames = changedPropertyNames;
              }
              const self = this;
              this.$http({
                url: '/ifbp-app-bd/bd/customer/personal/',
                method: 'post',
                dataType: 'json',
                data: submitData,
              }).then((res) => {
                if(res.data.success === true) {
                  if(Object.keys(self.idMap).indexOf(flag) > -1) { // grid
                    self.$set(self.currentValues, flag, res.data.data[self.idMap[flag]]);
                    const currentValues = this.currentValues[flag];
                    // 重新给原数据赋值
                    self.originalValues[flag] = JSON.parse(JSON.stringify(currentValues));
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
                    const currentValues = this.currentValues[flag];
                    // 重新给原数据赋值
                    self.originalValues[flag] = JSON.parse(JSON.stringify(currentValues));
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
    // 鼠标离开图片隐藏预览上传图标层
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
            submitData = JSON.parse(JSON.stringify(self.currentValues[flag]));
            delete submitData.id;
            delete submitData.BankAccBas;
            if(!self.isAddBankForm){
              self.$http({
                url: '/ifbp-app-bd/bd/bank/accbas/',
                method: 'post',
                dataType: 'json',
                data: submitData,
              }).then((res) => {
                if(res.data.success === true) {
                  var rowId = self.bankRowId;
                  var currentValues = self.currentValues.bank;
                  var originalValues = self.originalValues.bank;
                  self.$set(currentValues,rowId,res.data.data);
                  self.$set(originalValues,rowId,res.data.data);
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
            } else {
                self.$http({
                  url: '/ifbp-app-bd/bd/customer/personal/addBank?id=' + self.id,
                  method: 'post',
                  dataType: 'json',
                  data: submitData,
                }).then((res) => {
                  if(res.data.success === true) {
                    self.currentValues.bank.push(submitData);
                    self.originalValues.bank.push(submitData);
                    self.$message('保存成功');
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
      //点击新增银行账户按钮
      addBankRow() {
        this.isAddBankForm = true;
        this.isEditBankForm = true;
        this.showBankForm = true;
        var currentBankRow = JSON.parse(JSON.stringify(this.emptyListItem.bank));
        this.$set(this.currentValues,'bank-record-form',currentBankRow);
      },
      //点击银行账户查看按钮
      checkTableRow (row) {
        var bankRecordForm = JSON.parse(JSON.stringify(row));
        this.showBankForm = true;
        this.isEditBankForm = false;
        this.$set(this.currentValues,'bank-record-form',bankRecordForm);
      },
    //点击银行账户编辑按钮
      editTableRow (row,index) {
        var bankRecordForm = JSON.parse(JSON.stringify(row));
        this.isAddBankForm = false;
        this.showBankForm = true;
        this.isEditBankForm = true;
        this.bankRowId = index;
        this.$set(this.currentValues,'bank-record-form',bankRecordForm);
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
              self.currentValues.bank.splice(index,1);
              self.originalValues.bank.splice(index,1);
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
  created() {
    var requireDefer;
    var requireBank = this.requireBank();
    if(this.id === 'add'){
      requireDefer = '';
    }else{
      requireDefer = this.require();
    }
    this.initPromise(requireDefer,requireBank);
    this.setExpandsValue();
  },
  mounted() {
    this.scroll();
    document.getElementById('main-right').addEventListener('scroll', this.scroll);
  },
  watch: {
    imageUrl:{
      handler: function(){
        const self = this;
        Object.keys(this.imageUrl).forEach((v) => {
          self.$set(self.realPath, v, self.getRealImg(self.imageUrl[v]));
        });
      },
      deep: true
    }
  },
  computed: {
    /*realPath(){
      const obj = {};
      Object.keys(this.imageUrl).forEach((v) => {
        obj[v] = this.getRealImg(this.imageUrl[v]);
      });
      return obj;
    },*/
  },
  // components: {
  //   chart: echarts
  // }
};
</script>
<style>
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
  .el-icon-loading {
    top: 50%;
    position: absolute;
    left: 50%;
    margin-left: -25px;
    margin-top: -25px;
    font-size: 50px;
  }
  /*#pettyloanCustomerInfo .title-header{*/
    /*height: 56px;*/
    /*padding: 10px 20px;*/
    /*background-color: #ffffff;*/
    /*border-bottom: 1px solid #e3e3e3;*/
  /*}*/
  /*#pettyloanCustomerInfo .title-header h2 {*/
    /*font-size: 18px;*/
    /*font-weight: bold;*/
  /*}*/
  #pettyloanCustomerInfo .search-header {
    height: 50px;
    padding: 5px 20px;
    background-color: #ffffff;
    border-bottom: 1px solid #e3e3e3;
    margin-bottom: 6px;
  }
  #pettyloanCustomerInfo {
    padding: 20px 30px;
    margin-bottom: 30px;
  }
  #pettyloanCustomerInfo .content_left {
    width: calc(100% - 175px);
    /* height: 1000px; */
    float: left;
  }
  .content_left_item{
    /* height: 500px; */
    position: relative;
    padding-bottom: 10px;
    background-color: #fff;
    margin-bottom: 20px;
  }
  #pettyloanCustomerInfoDiv.content_left_item {
    padding: 10px;
  }
  .content_left_item .title {
    font-size: 20px;
    font-weight: bold;
    padding: 20px;
  }
  #pettyloanCustomerInfo .nav_right{
    width: 164px;
    float: right;
    position: relative;
    border: 1px solid #DDD;
    font: 14px 'Microsoft YaHei';
    padding: 10px 40px 10px 50px;
    background-color: #FFF;
    z-index: 20;
  }
  #pettyloanCustomerInfo .nav_right.fixed{
    width: 164px;
    position: fixed;
    right: 31px;
    top: 80px;
    border: 1px solid #DDD;
    font: 14px 'Microsoft YaHei';
    padding: 10px 40px 10px 50px;
    background-color: #FFF;
    z-index: 20;
  }
  .idCardUpload {
    position: relative;
    float: left;
    width: 370px;
    height: 220px;
    /*padding: 40px 50px 0 50px;*/
    margin: 10px;
    box-sizing: border-box;
    /*border: 1px solid #CECECE;*/
    padding: 0px 15px;
    text-align: center;
  }
  .idCardUpload .upload-component{
    padding-top:120px;
    text-align: center;
  }
  #pettyloanCustomerInfo .el-upload__input{
    display: none;
  }
  .idCardUpload__title {
    position: absolute;
    width: 300px;
    top:0;
    padding: 60px 0;
    text-align: center;
  }
  .idCardUpload__title p {
    font-size: 13px;
    height: 20px;
    line-height: 20px;
  }
  #pettyloanCustomerInfo .idCardInfo {
    width: calc(100%);
    /* max-width: 700px; */
    margin: 10px;
    /*float: left;*/
    /*height: 230px;*/
    /*border: 1px solid #CECECE;*/
  }
  #pettyloanCustomerInfo .idCardInfo_left {
    width: 312px;
    text-align: center;
    margin-left: 13px;
    margin-top: 30px;
  }
  .upload-lifephoto {
  }
  .lifephoto_title {
    position: absolute;
    top: 40px;
    width: 126px;
  }
  #pettyloanCustomerInfo .idCardInfo_left_photo {
    height: 170px;
    width: 100%;
    /*border-right: 1px solid #CECECE;
    border-bottom: 1px solid #CECECE;*/
  }
  #pettyloanCustomerInfo .idCardInfo_left_photo + p{
    height: 30px;
    width: 100%;
    margin: 14px 0;
    line-height: 30px;
  }
  #pettyloanCustomerInfo .idCardInfo_right {
    width: calc(100%);
    /* height: 228px; */
    position: relative;
    /*float: right;*/
  }
  #pettyloanCustomerInfo .idCardInfo_right .customer_template {
    padding: 3px 0;
    margin: 0;
  }
/*  #pettyloanCustomerInfo .customer_template .el-form-item {
    margin-bottom: 0px;
  }*/
/*   #pettyloanCustomerInfo .el-form-item {
  margin-bottom: 5px;
} */
  #pettyloanCustomerInfo .el-form-item__label {
    padding: 11px 12px 11px 0;
    font-size: 15px;
  }
  #pettyloanCustomerInfo #deepInfo .el-form-item__content{
    line-height: 36px;
  }
  #pettyloanCustomerInfo .el-form-item__content{
    /* line-height: 18px; */
  }
  #pettyloanCustomerInfo .el-form-item__label {
    /* padding: 2px 12px 2px 0; */
    font-size: 14px;
  }
  #pettyloanCustomerInfo .el-button-group .el-button:first-child{
    border-radius:4px;
  }
  #pettyloanCustomerInfo .el-button-group .el-button:last-child{
    border-radius:4px;
  }
  #pettyloanCustomerInfo .idCardInfo {
    font-size: 14px;
  }
  #pettyloanCustomerInfo .self_form_row {
    /* height: 30px;
    padding: 15px 0; */
  }
  .content_label .title_icon {
    color: gray;
    font-size: 20px;
    line-height: 60px;
    height: 60px;
    margin-right: 30px;
    cursor: pointer;
  }
  table.avRecordTable {
    width: calc(100% - 80px);
    /*border: 1px solid #dfe8ec;*/
    margin: 20px 40px;
    font-size: 14px;
  }
  .avRecordTable tr {
    position: relative;
    height: 40px;
  }
  .avRecordTable tr td {
    /*border: 1px solid #dfe8ec;*/
    padding: 0 10px;
  }
  .avRecordTable .tdTitle {
    width:20%;
    line-height: 40px;
  }
  .avRecordTable .tdTitle .prompt{
    position: absolute;
    left: 130px;
    /* top: 45%; */
  }
  .avRecordTable .tdTitle .prompt i {
    display: inline-block;
    margin-left: 5px;
    font-size: 18px;
    color: #00A5E3;
  }
  .avRecordTable .tdTitle .prompt span {
    min-height: 32px;
    max-width: 80%;
    /*border: 1px solid #eeeff1;*/
    line-height: 26px;
    background-color: #FDF6BF;
    padding: 0 10px;
    z-index: 20;
    white-space: normal;
    cursor: pointer;
    display: none;
  }
  .avRecordTable .picture .el-upload--picture-card {
    background-color: #fbfdff;
    border: 2px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 80px;
    height: 80px;
    cursor: pointer;
    line-height: 80px;
    vertical-align: middle;
    margin: 8px 8px 8px 0;
  }
  .avRecordTable .el-upload-list--picture-card .el-upload-list__item {
    width: 80px;
    height: 80px;
    vertical-align: middle;
    margin: 8px 8px 8px 0;
  }
  .avRecordTable .picture {
    width:75%;
  }
  #pettyloanCustomerInfo .RecordDiagram {
    /* background-color: whitesmoke; */
    /* border: solid 1px black; */
    width: 100%;
    height: 500px;
    margin: 0px auto;
    padding: 20px 40px;
  }
  #pettyloanCustomerInfo #self-grid  {
    margin-bottom: 20px;
    padding: 0 10px;
  }
  #pettyloanCustomerInfo input.el-input__inner {
    height: 28px;
  }

  /* upload css */
  #pettyloanCustomerInfo .leftTemplate {
    display: inline-block;
    /* float: left; */
    width: calc(100%);
    height: 100%;
    position: inherit;
    margin-left: 0px;
  }
  #pettyloanCustomerInfo .rightUpload {
    float: right;
    width: 180px;
    margin: 0 20px 0 0;
    text-align: center;
    /*border: 1px solid #CECECE;*/
    position: relative;
    margin-left: 0px;
    padding: 2px;
  }
  #followRecord .followTable {
    margin: 20px 20px 20px 20px;
    padding: 0px 20px 0px 20px;
  }

  /* === basic info css === */
  .child-title {
    line-height: 20px;
    font-size: 14px;
    text-align: left;
    padding: 10px 10px 0px 10px;
    clear: both;
  }
  #deepInfo .child-title .el-icon-edit,#deepInfo .child-title .el-icon-plus {
    font-size: 12px;
    color: #00a5e3;
    cursor: pointer;
    margin-left: 10px;
  }
  #deepInfo .detail-item {
    padding: 10px 20px;
  }
  #deepInfo .content-left,
  #salesmanInfo .content-left,
  #otherInfo .content-left {
    position: relative;
    width: calc(100% - 200px);
    margin-left: 0;
    float: left;
  }
  #deepInfo .content-right {
    float: right;
    width: 180px;
    /*border: 1px solid #CECECE;*/
    position: inherit;
    margin-left: 0px;
    /*padding: 2px;*/
    text-align: center;
  }
  #pettyloanCustomerInfo .content-right {
    position: relative;
  }
  #pettyloanCustomerInfo .hoverCard{
    width: 100%;
    height: 125px;
    position: absolute;
    top: 3px;
    left: 3px;
    margin: 0 auto;
    font-size: 22px;
    background-color: #0e0e0e;
    opacity: 0.65;
    vertical-align: middle;
    color: white;
    display: inline-block;
  }
  #pettyloanCustomerInfo .hoverCard i {
    margin-top: 50px;
    cursor: pointer;
  }
  .child-item {
    width: calc(100% - 20px);
    border-bottom: 1px solid #CECECE;
    margin: 10px;
    display: inline-block;
    padding-bottom: 10px;
  }
  .child-item:last-child{
    border:none;
  }
  .child-item-left {
    margin-right: 10px;
    /*border: 1px solid #CECECE;*/
    width: 370px;
    float: left;
    padding: 0 30px;
  }
  .child-item-right {
    margin-left: 10px;
    /*border: 1px solid #CECECE;*/
    width: calc(100% - 420px);
    float: left;
  }
  #pettyloanCustomerInfo .yon-form div.tpl-label {
    font-size: 14px;
  }
  .el-table__expanded-cell .yon-form{
    text-align: left;
  }


  /* ==     upload css     == */

  #pettyloanCustomerInfo .avatar-uploader .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  #pettyloanCustomerInfo .upload-box {
    border: 1px dashed #d9d9d9;
    text-align: center;
  }
  #pettyloanCustomerInfo .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  #pettyloanCustomerInfo .avatar-show-icon, #pettyloanCustomerInfo .avatar-uploader .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    text-align: center;
    width: 28px;
    height: 28px;
    line-height: 28px;
  }



  /* === side-nav start === */
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
/*   ul#side-nav span.line {
  display: block;
  top: 30px;
  left: 29px;
  width: 1px;
  height: calc(100% - 50px);
  background: #B2B2B2;
  border-left: 1px dashed #ccc;
  z-index: 0;
} */
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
  #pettyloanCustomerInfo .el-table .cell:last-child{
    padding-left:13px;
    padding-right:0;
  }
  .editBank{
    margin-bottom:20px;
  }
</style>

<style scoped>
  #pettyloanCustomerInfo .button-group {
    margin-left: calc(50% - 90px);
  }
</style>
