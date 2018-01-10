<template>
  <div id="fin-agency">
    <div class="title-header" style="padding: 20px 23px;">
      <h2 class="name">{{title}}</h2>
    </div>
    <div class="detail-container">

      <!--<b class="fin-agency-title">{{title}}</b>-->
      <div class="cards-title">
        <el-button v-if="isCreate" type = "primary" @click="createForm" style="width: 80px;">保存</el-button>
        <el-button type = "primary" @click="backButton" style="float:right;width: 80px;">返回</el-button>
      </div>
      <div class="background">
        <div class="detail-left">
          <div class="detail-item" id="company-information" style="height:600px;">
            <div class="child-title"><b>基本档案</b><i v-if="!isEdit['company-information'] && !isCreate" class="el-icon-edit" @click="toggle('company-information')"></i></div>
            <div class="child-item-left">
              <el-upload
                class="avatar-uploader"
                action="/ifbp-app-bd/bd/customer/personal/file"
                v-if="isEdit['company-information']"
                :show-file-list="false"
                :on-success="function(res,file){handleAvatarSuccess('company-information',res,file)}"
                :before-upload="function(res,file){return beforeAvatarUpload('company-information',res,file)}">
                <img v-if="imageUrl[imageCodes['company-information']]" :src="realPath[imageCodes['company-information']]" style="max-height:100%;max-width:100%">
                <div v-else style="height:100%;text-align:center;width:100%;"><i class="el-icon-plus avatar-uploader-icon"></i></div>
              </el-upload>
              <div v-else class="avatar-uploader" style="padding:1px;">
                <img v-if="realPath[imageCodes['company-information']]" :src="realPath[imageCodes['company-information']]" style="max-height:100%;max-width:100%;">
                <div v-else style="height:100%;text-align:center;width:100%;"><i class="el-icon-plus avatar-uploader-icon"></i></div>
              </div>

              <div style="text-align:center;">营业执照</div>
            </div>
            <div class="child-item-right">
                <el-template :pkTemp="pktemp['company-information']"
                            @change="changeHandle"
                            @setEmptyKeys="function(v){setEmpty(v,'company-information')}"
                            :hide-title="true"
                            ref="company-information"
                            :isEdit="isEdit['company-information']"
                            :templateValue="currentValue['company-information']">
                </el-template>
                <el-button-group class="group" v-if="isEdit['company-information'] && !isCreate">
                  <el-button class="save" type="primary" @click="submit('company-information')">保存</el-button>
                  <el-button class="save" type="primary" @click="cancel('company-information')">取消</el-button>
                </el-button-group>
                <el-button v-if="!isEdit['company-information']" class="save" type="primary" @click="toggle('company-information')">编辑</el-button>
            </div>
          </div>
          <div class="detail-item" id="company-detail">
            <!-- <div class="title"><b>企业档案</b></div>
            <div class="child-title" id="company-detail"><b>企业信息</b><i class="el-icon-edit" @click="toggle('company-detail')"></i></div>
            <div class="child-item" style="height:200px">
                <el-template :pkTemp="pktemp['company-detail']"
                            ref="company-detail"
                            @change="changeHandle"
                            @setEmptyKeys="function(v){setEmpty(v,'company-detail')}"
                            :hide-title="true"
                            :isEdit="isEdit"
                            :templateValue="currentValue['company-detail']">
                </el-template>
                <el-button v-if="!isCreate" class="save" type="primary" @click="submit('company-detail')">保存</el-button>
            </div> -->
            <div class="child-title"><b>纳税信息</b><i v-if="!isEdit['ratepay-detail'] && !isCreate" class="el-icon-edit" @click="toggle('ratepay-detail')"></i></div>
            <div class="child-item">
                <el-template :pkTemp="pktemp['ratepay-detail']"
                            @change="changeHandle"
                            @setEmptyKeys="function(v){setEmpty(v,'ratepay-detail')}"
                            :hide-title="true"
                            ref="ratepay-detail"
                            :isEdit="isEdit['ratepay-detail']"
                            :templateValue="currentValue['ratepay-detail']">
                </el-template>
                <el-button-group class="group" v-if="isEdit['ratepay-detail'] && !isCreate">
                  <el-button class="save" type="primary" @click="submit('ratepay-detail')">保存</el-button>
                  <el-button class="save" type="primary" @click="cancel('ratepay-detail')">取消</el-button>
                </el-button-group>
                <el-button v-if="!isEdit['ratepay-detail']" class="save" type="primary" @click="toggle('ratepay-detail')">编辑</el-button>
            </div>
          </div>
          <div class="detail-item" id="shareholder-detail">
            <div class="child-title"><b>股东股权信息</b><i class="el-icon-plus" @click="addListItem('shareholder-detail')"></i></div>
            <div class="child-item">
                <el-template :pkTemp="pktemp['shareholder-detail']"
                            ref="shareholder-detail"
                            @change="changeHandle"
                            @setEmptyKeys="function(v){setEmpty(v,'shareholder-detail')}"
                            @save-expand-form="function(index, row){submit('shareholder-detail', {index:index,row:row})}"
                            @delete-expand-form="function(index, row){delListItem('shareholder-detail', {index:index,row:row})}"
                            @cancel-expand-form="function(index, row){cancel('shareholder-detail', {index:index,row:row})}"
                            @edit-expand-form="function(index, row){editList('shareholder-detail', {index:index,row:row})}"
                            @expand-row="function(row, expanded){expandRow('shareholder-detail', {row:row,expanded:expanded})}"
                            :table-style="tableStyle"
                            :hide-title="true"
                            :expand="expand['shareholder-detail']"
                            :expandRowKeys="expandRowKeys['shareholder-detail']"
                            rowKey="id"
                            :isEdit="isEdit['shareholder-detail']"
                            :templateValue="currentValue['shareholder-detail']">
                </el-template>
            </div>
          </div>
          <div class="detail-item" id="staff-detail">
            <div class="child-title"><b>人员信息</b><i class="el-icon-plus" @click="addListItem('staff-detail')"></i></div>
            <div class="child-item">
                <el-template :pkTemp="pktemp['staff-detail']"
                            ref="staff-detail"
                            @change="changeHandle"
                            @setEmptyKeys="function(v){setEmpty(v,'staff-detail')}"
                            @save-expand-form="function(index, row){submit('staff-detail', {index:index,row:row})}"
                            @delete-expand-form="function(index, row){delListItem('staff-detail', {index:index,row:row})}"
                            @cancel-expand-form="function(index, row){cancel('staff-detail', {index:index,row:row})}"
                            @edit-expand-form="function(index, row){editList('staff-detail', {index:index,row:row})}"
                            @expand-row="function(row, expanded){expandRow('staff-detail', {row:row,expanded:expanded})}"
                            :table-style="tableStyle"
                            :hide-title="true"
                            :expand="expand['staff-detail']"
                            :expandRowKeys="expandRowKeys['staff-detail']"
                            rowKey="id"
                            :isEdit="isEdit['staff-detail']"
                            :templateValue="currentValue['staff-detail']">
                </el-template>
            </div>
          </div>
          <div class="detail-item" id="bank-detail">
            <div class="child-title"><b>银行账户</b><i class="el-icon-plus" @click="addListItem('bank-detail')"></i></div>
            <div class="child-item">
              <el-template :pkTemp="pktemp['bank-detail']"
                          ref="bank-detail"
                          @change="changeHandle"
                          @setEmptyKeys="function(v){setEmpty(v,'bank-detail')}"
                          @save-expand-form="function(index, row){submit('bank-detail', {index:index,row:row})}"
                          @delete-expand-form="function(index, row){delListItem('bank-detail', {index:index,row:row})}"
                          @cancel-expand-form="function(index, row){cancel('bank-detail', {index:index,row:row})}"
                          @edit-expand-form="function(index, row){editList('bank-detail', {index:index,row:row})}"
                          @expand-row="function(row, expanded){expandRow('bank-detail', {row:row,expanded:expanded})}"
                          :table-style="tableStyle"
                          :hide-title="true"
                          :expand="expand['bank-detail']"
                          :expandRowKeys="expandRowKeys['bank-detail']"
                          rowKey="id"
                          :isEdit="isEdit['bank-detail']"
                          :templateValue="currentValue['bank-detail']">
              </el-template>
            </div>
          </div>
          <div class="detail-item" id="file-list">
            <div class="child-title" id="re-exp-detail"><b>影音档案</b></div>
            <div class="child-item">
              <el-upload
                  multiple
                  action="/ifbp-app-bd/bd/supplier/file"
                  list-type="picture-card"
                  :before-upload="beforeAvatarUpload"
                  :on-success="handleAvRecordSuccess"
                  :on-remove="handleRemove"
                  :file-list="avFileList">
                  <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </div>
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
      <div id="cover" ref="cover"><div class="el-loading-spinner"><svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg><!----></div></div>
    </div>
  </div>
</template>
<script>

  export default {
    data(){
      var isCreate = this.$route.params.id === 'add';
      return {
        loading: '',
        title: '供应商信息设置',
        templateValue: {},//整个元数据值集合
        currentValue: {},
        originalValue: {},
        emptyListItem: {},
        emptyId: '',
        loadDefer: [],
        imageUrl: {},
        realPath: {},
        validity_time_tpl: {},
        imageCodes: {
          'company-information': 'show_img',
          'bank-detail': 'work_img',
          're-exp-detail': 'payments_img'
        },
        expand: {},
        viewExpand: {
          buttonAlign: 'right',
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
        },
        editExpand: {
          buttonAlign: 'right',
          columnsShowCount: 3,
          buttons: [
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
          ]
        },
        tableStyle: {
          'max-height': '1000px'
        },
        expandRowKeys: {
          'shareholder-detail': [],
          'staff-detail': [],
          'bank-detail': []
        },
        listValue: {
          'shareholder-detail': 'supshareholder_id',
          'staff-detail': 'supperson_id',
          'bank-detail': 'supbank_id'

        },
        avFileList: [],
        id: this.$route.params.id,//'uapcloud100000006r22'
        isCreate: isCreate,
        formForCreate: ['company-information', 'ratepay-detail'],
        isEdit: {
          'company-information': isCreate,
          'ratepay-detail': isCreate,
          'shareholder-detail': isCreate,
          'staff-detail': isCreate,
          'bank-detail': isCreate,
          'file-list': isCreate
        },
        isAdding:{
          'shareholder-detail': false,
          'staff-detail': false,
          'bank-detail': false
        },
        pktemp: {
          'company-information': '234ab067-5214-4446-9283-ef5d0c7b0f90',
          //'company-detail': '85c3cf11-b14c-46de-8264-e00d8f5289c0',
          'ratepay-detail': '412ff0ed-23cb-4e25-9c99-021e58ebba76',
          'shareholder-detail': 'af90d0a3-aade-46a0-b54c-c92d8e5bf37e',
          'staff-detail': 'a2b9d700-818e-4e8b-a221-5d7e09406e6d',
          'bank-detail': '8ec73f0a-2bd3-49ee-a8a1-e1a6cd721a25'
        },
        promises: {},
        sideNavData: [
          {
            anchor: 'company-information',
            label: '基本档案'
          },
          {
            anchor: 'shareholder-detail',
            label: '股东股权信息'
          },
          {
            anchor: 'staff-detail',
            label: '人员信息'
          },
          {
            anchor: 'bank-detail',
            label: '银行账户'
          },
          {
            anchor: 'file-list',
            label: '影音档案'
          }
        ],
      };
    },
    beforeCreate(){
    },
    created() {
      console.log(this);
      var requestDefer = this.request();
      this.initPromise(requestDefer);
      this.initExpand(false);
    },
    mounted() {
      console.log('mounted');
      this.scroll();
      document.getElementById('main-right').addEventListener('scroll', this.scroll);
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
      initExpand(isEdit) {
        var expand = isEdit ? this.editExpand : this.viewExpand;
        Object.keys(this.listValue).forEach((v) => {
          this.expand[v] = JSON.parse(JSON.stringify(expand));
        });
      },
      initPromise(request){
        Object.keys(this.pktemp).forEach((id) => {
          var promise = new Promise((res, rej) => {
            this.promises[id] = {
              resolve: res,
              reject: rej
            };
          });
          this.loadDefer.push(promise);
          if (!this.isCreate) {
            Promise.all([promise, request]).then(() => {
              this.assignValues(id);

            });
          }
        });
        Promise.all(this.loadDefer.concat(request)).then(() => {
          this.$nextTick(() => {
            setTimeout(() => {
              this.$refs.cover.remove();
            },100);
          });
          this.validity_time_tpl = this.getTemplateByCode('validity_time');
          this.specialLogic();
        });
      },
      specialLogic() { // if checkbox is checked, disabled validity_time component
        var watchValue = this.currentValue['company-information'].islongterm;
        if (Object.prototype.toString.call(watchValue) === '[object String]' && watchValue !== '') {
          this.validity_time_tpl.isReadonly = true;
          this.currentValue['company-information'].validity_time = null;
        } else {
          this.validity_time_tpl.isReadonly = false;
        }
      },
      // get template data of special itemCode, to edit more than data of component
      getTemplateByCode(code) {
        var formlayout = this.$refs['company-information'].formLayout;// refname here
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
        var img = '';
        var tmp;
        Object.keys(this.imageCodes).forEach((v) => {
          tmp = [null,''].indexOf(data[this.imageCodes[v]]) > -1 ? img : data[this.imageCodes[v]];
          this.$set(this.imageUrl, this.imageCodes[v], tmp);
        });
      },
      request(){
        var promise;
        if (!this.isCreate) {
          promise = this.$http({
            url: '/ifbp-app-bd/bd/supplier/'+ this.id,
            method: 'get',
            dataType: 'json'
          }).then((res) => {
            this.templateValue = res.data.data;
            this.initImgUrl(res.data.data);
            this.initAvFileList(res.data.data);
            // this.assignValues(this.currentValue, this.templateValue);
            // this.currentValue = JSON.parse(JSON.stringify(this.templateValue));
          });
        }
        return promise;
      },
      initAvFileList(data) {
        if(data.supmediainfo_id instanceof Array) {
          const self = this;
          self.avFileList = [];
          data.supmediainfo_id.forEach((v) => {
            self.avFileList.push({
              name: v.filename,
              url: self.getRealImg(v.filepath)
            });
          });
        }
      },
      assignValues(id){
        if (Object.keys(this.listValue).indexOf(id) > -1) { //后台返回的key不全，需要和解析的结构数据做一次key merge
          // var allKeyItems = Object.keys(JSON.parse(JSON.stringify(this.emptyListItem[id])));
          // var returnKeyItems = this.templateValue[this.listValue[id]];
          // var currentKeys;
          // for(var i = 0;i < returnKeyItems.length; i++){
          //   currentKeys = Object.keys(returnKeyItems[i]);
          //   allKeyItems.forEach((v) => {
          //     if(currentKeys.indexOf(v) < 0) {
          //       returnKeyItems[i][v] = null;
          //     }
          //   });
          // }
          // this.$set(this.currentValue, id, returnKeyItems);
          this.$set(this.currentValue, id, this.templateValue[this.listValue[id]]);
        } else {
          var map = Object.keys(this.currentValue[id]);
          for(var i=0;i<map.length;i++){
            this.currentValue[id][map[i]] = this.templateValue[map[i]];
          }
        }
        this.originalValue[id] = JSON.parse(JSON.stringify(this.currentValue[id]));
      },
      addListItem(id) {
        if (this.isCreate) {
          this.$message('请先新增并保存主表数据');
          return;
        }
        console.log(this);
        if (this.currentValue[id]) {
          this.rebuildEditRow(id);
          if(!this.isAdding[id]) {
            this.isEdit[id] = true;
            this.expand[id] = this.editExpand;
            this.isAdding[id] = true;
            this.currentValue[id].push(JSON.parse(JSON.stringify(this.emptyListItem[id])));
            this.expandRowKeys[id] = [this.emptyId];
          } else {
            this.isEdit[id] = false;
            this.expand[id] = this.viewExpand;
            this.isAdding[id] = false;
            this.currentValue[id].pop();
            this.expandRowKeys[id] = [];
          }
        }
      },
      rebuildEditRow(id) {
        if (this.expandRowKeys[id].length > 0) {
          for (var i = 0;i < this.currentValue[id].length; i++) {
            if (this.currentValue[id][i].id === this.expandRowKeys[id][0]) {
              const emptyListItemInfo = JSON.parse(JSON.stringify(this.emptyListItem[id]));
              const originalValueInfo = JSON.parse(JSON.stringify(this.originalValue[id][i]));
              if (this.expandRowKeys[id][0] === '') {
                this.currentValue[id].splice(i, 1, emptyListItemInfo);
              } else {
                this.currentValue[id].splice(i, 1, originalValueInfo);
              }
            }
          }
        }
      },
      expandRow(id, data) {
        console.log(data);
        if (data.expanded) {
          this.rebuildEditRow(id);
          if (data.row.id !== '') {
            this.isEdit[id] = false;
            this.expand[id] = this.viewExpand;
          } else {
            this.isEdit[id] = true;
            this.expand[id] = this.editExpand;
          }
          this.expandRowKeys[id] = [data.row.id];
        } else {
          this.expandRowKeys[id] = [];
        }

      },
      toggle(id) {
        this.isEdit[id] = !this.isEdit[id];
      },
      cancel(id, data) {
        this.toggle(id);
        if(Object.keys(this.listValue).indexOf(id) > -1) { // grid
          if (this.isAdding[id]) {
            this.isAdding[id] = false;
            this.currentValue[id].pop();
            this.expandRowKeys[id] = [];
            this.expand[id] = this.viewExpand;
          } else {
            const originalValueInfo = JSON.parse(JSON.stringify(this.originalValue[id][data.index]));
            this.currentValue[id].splice(data.index, 1,originalValueInfo);
            this.expand[id] = this.viewExpand;
          }
        } else { // form
          this.currentValue[id] = JSON.parse(JSON.stringify(this.originalValue[id]));
          if(id === 'company-information') { // special logic for company-information page
            this.specialLogic();
          }
        }
      },
      editList(id) {
        this.toggle(id);
        this.expand[id] = JSON.parse(JSON.stringify(this.editExpand));
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
        this.handleMultiValidate(['company-information', 'ratepay-detail']).then(() => {
          var submitData = {id: ''};
          this.formForCreate.forEach((formID) => {
            Object.keys(this.currentValue[formID]).forEach((v) => {
              submitData[v] = this.currentValue[formID][v];
            });
          });
          submitData[this.imageCodes['company-information']] = this.imageUrl[this.imageCodes['company-information']];
          this.$http({
            url: '/ifbp-app-bd/bd/supplier/',
            method: 'post',
            dataType: 'json',
            data: submitData
          }).then((res) => {
            if(res.data.success === true) {
              if (window.env === 'dev') {
                this.$message('添加成功');
              }
              this.id = res.data.data.id;
              this.$router.push('/dealer/agency/' + this.id);
              this.originalValue = JSON.parse(JSON.stringify(this.currentValue));
              this.isCreate = false;
              Object.keys(this.isEdit).forEach((v) => {
                this.isEdit[v] = false;
              });
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
      submit(id, listData){
        var isGrid = Object.keys(this.listValue).indexOf(id) > -1;
        if (this.isCreate && isGrid) {
          this.$message('请先新增并保存主表数据');
          return;
        }

        this.$refs[id].validate((valid) => {
          if(valid) {
            var changedPropertyNames;
            var submitData;
            var tmpListData = listData;
            if (isGrid) { // grid
              changedPropertyNames = [''];
              var tableData = JSON.parse(JSON.stringify(this.currentValue[id]));
              if (this.isAdding[id]) {
                tableData.pop();
                tmpListData.row[this.listValue[id]] = this.id;
                if (this.expandRowKeys[id][0] === '') {
                  tableData.push(tmpListData.row);
                } else {
                  tableData.splice(tmpListData.index, 1, tmpListData.row);
                }
              } else {
                tmpListData.row[this.listValue[id]] = this.id;
                tableData.splice(tmpListData.index, 1, tmpListData.row);
              }
              submitData = {
                id: this.id,
                changedPropertyNames: changedPropertyNames
              };
              submitData[this.listValue[id]] = tableData;
            } else { // form 提交时应带上对应图片
              changedPropertyNames = Object.keys(this.currentValue[id]);
              changedPropertyNames.push(this.imageCodes[id]); // 带上图片key
              submitData = JSON.parse(JSON.stringify(this.currentValue[id]));
              submitData.id = this.id;
              submitData[this.imageCodes[id]] = this.imageUrl[this.imageCodes[id]];
              submitData.changedPropertyNames = changedPropertyNames;
            }

            this.$http({
              url: '/ifbp-app-bd/bd/supplier/',
              method: 'post',
              dataType: 'json',
              data: submitData
            }).then((res) => {
              console.log(res);
              if(res.data.success === true) {
                if (Object.keys(this.listValue).indexOf(id) > -1) {
                  this.isAdding[id] = false;
                  this.expandRowKeys[id] = [];
                  this.currentValue[id] = res.data.data[this.listValue[id]];
                  if (window.env === 'dev') {
                    this.$message('更新成功');
                  }
                } else {
                  this.isEdit[id] = false;
                  if (window.env === 'dev') {
                    this.$message('保存成功');
                  }
                }
                this.originalValue[id] = JSON.parse(JSON.stringify(this.currentValue[id]));
              }else {
                this.$message.error('保存失败');
              }

            }).catch(() => {
              this.$message.error('保存失败');
            });
          }else {
            // this.$message.error('表单验证错误');
          }
        });

      },
      delListItem(id, listData) {
        if(listData.row.id) {
          this.$http({
            url: '/ifbp-app-bd/bd/supplier/child?idtype=' + this.listValue[id] + '&id=' + listData.row.id,
            method: 'delete',
          }).then((res) => {
            if(res.data.success === true) {
              if (window.env === 'dev') {
                console.log('delete successfully');
                this.$message('删除成功');
              }
              this.currentValue[id].splice(listData.index, 1);
              this.originalValue[id].splice(listData.index, 1);
            } else {
              this.$message('删除失败');
            }
          });
        }
      },
      setEmpty(value, id){
        if (Object.keys(this.listValue).indexOf(id) < 0) { // form
          this.$set(this.currentValue, id, value);
        } else { // grid
          this.emptyListItem[id] = value;
          this.emptyListItem[id].id = this.emptyId;
          this.$set(this.currentValue, id, []);
        }
        this.promises[id].resolve(id);
      },
      changeHandle(data) {
        if (data.key === 'islongterm') {
          this.specialLogic();
        }
      },
      backButton() {
        this.$router.push('/dealer/agencylist');
      },
      beforeAvatarUpload(id){
        var pass;
        if(this.isCreate && ['company-information'].indexOf(id) < 0) {
          this.$message('请先新增并保存主表数据');
          pass = false;
        } else {
          pass = true;
        }
        return pass;
      },
      handleAvRecordSuccess(res, file, fileList) {
        console.log(res, file, fileList);
        let filePath = '';
        const submitData = {};
        if(res.success === true) {
          filePath = res.data;
        }
        const fileData = {
          filename: file.raw.name,
          filepath: filePath,
          filesize: file.raw.size,
          filetype: file.raw.type,
          supmediainfo_id: this.id
        };
        const self = this;
        submitData.changedPropertyNames = [''];
        submitData.supmediainfo_id = [fileData];
        submitData.id = this.id;

        this.$http({
          url: '/ifbp-app-bd/bd/supplier/',
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
            self.$message.error('保存失败');
          }
        }).catch(() => {
          self.$message.error('保存失败');
        });
      },
      handleRemove(file) {
        const self = this;
        const curFileList = this.templateValue.supmediainfo_id;
        if(curFileList) {
          curFileList.forEach((v, num) => {
            var i = file.url.indexOf(v.filepath);
            if(i > -1) {
              this.$http({
                url: '/ifbp-app-bd/bd/supplier/child?idtype=supmediainfo_id&id=' + v.id,
                method: 'delete',
              }).then((res) => {
                if(res.data.success === true) {
                  if (window.env === 'dev') {
                    self.$message('删除成功！');
                  }
                  self.templateValue.supmediainfo_id.splice(num,1);
                  self.avFileList.splice(num,1);
                } else {
                  self.$message('删除失败！');
                }
              });
            }
          });
        }
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
        if(Object.keys(this.listValue).indexOf(id) > -1) { // grid 中图片上传后直接保存回执
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
          this.$http({//保存回执
            url: '/ifbp-app-bd/bd/supplier/file',
            method: 'post',
            dateType: 'json',
            data: submitData
          }).then((response) => {
            if (response.data.success === true) {
              if (window.env === 'dev') {
                this.$message('图片保存成功');
              }
            } else {
              this.$message.error('图片保存失败');
            }
          }).catch(() => {
            this.$message.error('图片保存失败');
          });
        } else { // form 上传后先赋值，点保存才存回执
          this.$set(this.imageUrl, this.imageCodes[id], res.data);
        }
      },
      scroll() {
        if(this.$route.path.indexOf('/dealer/agency') < 0){
          return;
        }
        this.fixedNav();
        this.scrollFocus();
      },
      // 控制side-nav悬浮在页面右上方
      fixedNav() {
        if($('#fin-agency .background').length > 0) {
          const mainTop = $('#fin-agency .background').offset().top;
          const $fixedDom = $('#fin-agency .nav_right');
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
        if($(`#${this.sideNavData[0].anchor}`).offset().top > 85){
            focusDom = $('#side-nav').find(`a[data-id=${this.sideNavData[0].anchor}]`);
        } else if($(`#${this.sideNavData[this.sideNavData.length - 1].anchor}`).offset().top < 85){
          focusDom = $('#side-nav').find(`a[data-id=${this.sideNavData[this.sideNavData.length - 1].anchor}]`);
        } else {
          for(let i = 1; i < this.sideNavData.length; i++) {
            if($(`#${this.sideNavData[i - 1].anchor}`).offset().top <= 85 &&
            $(`#${this.sideNavData[i].anchor}`).offset().top > 85) {
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
            scrollDom.scrollIntoView(); //根据id找到对应DOM滚动到顶部
          }
        }
      },
    }
  };
</script>
<style>
  .detail-container .el-form-item {
    margin-bottom: 20px;
  }
  .detail-container input.el-input__inner {
    height: 36px;
  }
  .detail-container .el-upload__input {
  display: none;
  }
  .detail-container .el-form-item__label {
    font-size: 13px;
  }
  .detail-container .save {
    width: 100px;
    margin-left: calc(50% - 50px);
  }
  .detail-container .group .save {
    width: 100px;
    margin-left: 10px;
  }
  .detail-container .group {
    width: 220px;
    margin-left: calc( 50% - 110px);
  }
  .detail-container .el-upload.el-upload--text {
    height: 100%;
    width: 100%;
  }
  .detail-container .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .detail-container .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
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
    margin-top: calc(290px - 150px);
  }
  .fin-agency-title{
    line-height: 36px;
    vertical-align: top;
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
  .detail-left {
    width: calc(100% - 175px);
    float: left;
  }
  .detail-item {
    min-height: 250px;
    background-color: white;
    margin-bottom: 20px;
    padding: 10px;
    font-size: 0px;
  }
  .child-item {
    /*height: 250px;*/
    border-bottom: 1px solid #CECECE;
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
    font-size:14px;
  }
  .child-item-right {
    margin-left: 10px;
    /*border: 1px solid black;*/
    width: calc(60% - 12px);
    vertical-align: top;
    display: inline-block;
  }
  .content-left {
    display: inline-block;
    /*float:left;*/
    width: calc(100% - 180px);
    height: 100%;
    padding-bottom: 10px;
    position: inherit;
    margin-left: 0px;
  }
  .content-right {
    float: right;
    width: 180px;
    height: 120px;
    border: 1px solid black;
    position: inherit;
    margin-left: 0px;
  }
  .headshot {
    height: 200px;
    width:120px;
    margin: 3px;
    /*border: 1px solid black;*/
  }
  .similarity {
    text-align: center;
  }
  .headshot-container {
    height: 240px;
    width:130px;
    display: inline-block;
  }
  .count {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 30px;
    height: auto;
    line-height: 31px;
    color: red;
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
  .background {
    background-color: #eeeff1;
    margin: 20px 20px 0 20px;
  }
  .cards-container {
    background-color: white;
  }
  .tile {
    /*border: 1px solid #ccc;*/
  }
  .first-list,.list  {
    padding-left: 40px;
    font-size: 13px;
    float: left;
    line-height: 28px;
  }
  .first-list .list-item {
    list-style: disc;
    text-align: left;
  }
  .title {
    line-height: 30px;
    font-size: 20px;
    text-align: left;
    padding: 10px 10px 0px 10px;
  }
  .child-title {
    line-height: 20px;
    font-size: 14px;
    text-align: left;
    padding: 10px 10px 0px 10px;
  }
  .card-tabs {
    padding-left: 10px;
    padding-right: 10px
  }
  .nav_right{
    width: 164px;
    float: right;
    position: relative;
    /*border: 1px solid #DDD;*/
    font: 14px 'Microsoft YaHei';
    padding: 10px 40px 10px 38px;
    background-color: #FFF;
    z-index: 20;
  }
  .nav_right.fixed{
    width: 164px;
    position: fixed;
    right: 21px;
    top: 83px;
    /*border: 1px solid #DDD;*/
    font: 14px 'Microsoft YaHei';
    padding: 10px 40px 10px 38px;
    background-color: #FFF;
    z-index: 20;
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
      /*border-left: 1px dashed #ccc;*/
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
</style>
