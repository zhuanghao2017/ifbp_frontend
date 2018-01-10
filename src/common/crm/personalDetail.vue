<template>
  <div id="personalDetail">
    <div class="detail-container">
    <div class="cards-title"><b>{{title}}</b></div>
    <el-button type = "primary" @click="toggle" style="width: 80px;">切换</el-button>
    <div class="background">
      <div class="detail-left">
        <div class="detail-item" style="height:300px;">
          <div class="child-item-left" style="height:280px;">
            <!-- <img v-if="imageUrl[imageCodes['contact-number']]" :src="realPath[imageCodes['contact-number']]" style="width: 100%;height: 280px;">
            <div v-else style="height:280px;line-height:280px;text-align:center;width:100%;">身份证照片</div> -->
            <img :src="realPath[imageCodes['contact-number']]" style="width: 100%;height: 280px;">
          </div>
          <div class="child-item-right" style="height:280px;">
            <div class="headshot-container">
              <div class="headshot">
                <!-- <el-upload
                  class="avatar-uploader"
                  action="/ifbp-app-bd/bd/customer/personal/file"
                  :show-file-list="false"
                  :on-success="function(res,file){handleAvatarSuccess('personalDetail',res,file)}"
                  :before-upload="function(res,file){beforeAvatarUpload('personalDetail',res,file)}">
                  <img v-if="imageUrl[imageCodes['personalDetail']]" :src="realPath[imageCodes['personalDetail']]" style="width: 100%;height: 198px;">
                  <div v-else style="height:198px;line-height:198px;text-align:center;width:100%;">日常半身照</div>
                </el-upload> -->
                <img :src="realPath[imageCodes['personalDetail']]" style="width: 100%;height: 198px;">
              </div>
              <div class="similarity">相似度: 90%</div>
            </div>
            <div class="personalDetail">
              <el-template :pkTemp="pktemp.personalDetail"
                          ref="detail"
                          @change="changeHandle"
                          @setEmptyKeys="function(v){setEmpty(v,'personalDetail')}"
                          :hide-title="true"
                          :isEdit="isEdit"
                          :templateValue="currentValue['personalDetail']">
              </el-template>
              <el-button class="save" type="primary" @click="submit('personalDetail')">保存</el-button>
            </div>

          </div>
        </div>
        <div class="detail-item" id="basic">
          <div class="title"><b>个人档案</b></div>
          <div class="child-title" id="contact-number"><b>联系方式</b><i class="el-icon-edit" @click="toggle('contact-number')"></i></div>
          <div class="child-item">
            <div class="content-left">
              <el-template :pkTemp="pktemp['contact-number']"
                          ref="contact-number"
                          @change="changeHandle"
                          @setEmptyKeys="function(v){setEmpty(v,'contact-number')}"
                          :hide-title="true"
                          :isEdit="isEdit"
                          :templateValue="currentValue['contact-number']">
              </el-template>
              <el-button class="save" type="primary" @click="submit('contact-number')">保存</el-button>
            </div>
            <div class="content-right">
              <!-- <el-upload
                class="avatar-uploader"
                action="/ifbp-app-bd/bd/customer/personal/file"
                :show-file-list="false"
                :on-success="function(res,file){handleAvatarSuccess('contact-number',res,file)}"
                :before-upload="function(res,file){beforeAvatarUpload('contact-number',res,file)}">
                <div style="height:120px;line-height:120px;text-align:center;width:100%;">上传身份证照片</div>
              </el-upload> -->
              <img :src="realPath[imageCodes['contact-number']]" style="width: 100%;height: 120px;">
            </div>
          </div>
          <div class="child-title" id="marital-status"><b>婚姻信息</b><i class="el-icon-edit" @click="toggle('marital-status')"></i></div>
          <div class="child-item" style="border:none;height:280px;">
            <div class="child-item-left" style="height:280px;">
              <!-- <el-upload
                class="avatar-uploader"
                action="/ifbp-app-bd/bd/customer/personal/file"
                :show-file-list="false"
                :on-success="function(res,file){handleAvatarSuccess('marital-status1',res,file)}"
                :before-upload="function(res,file){beforeAvatarUpload('marital-status1',res,file)}">
                <img v-if="imageUrl[imageCodes['marital-status1']]" :src="realPath[imageCodes['marital-status1']]" style="width: 100%;height: 280px;">
                <div v-else style="height:280px;line-height:280px;text-align:center;width:100%;">配偶身份证照片</div>
              </el-upload> -->
              <img :src="realPath[imageCodes['marital-status1']]" style="width: 100%;height: 280px;">
            </div>
            <div class="child-item-right" style="height:280px;">
              <el-template :pkTemp="pktemp['marital-status1']"
                          ref="marital-status1"
                          @change="changeHandle"
                          @setEmptyKeys="function(v){setEmpty(v,'marital-status1')}"
                          :hide-title="true"
                          :isEdit="isEdit"
                          :templateValue="currentValue['marital-status1']">
              </el-template>
              <el-button class="save" type="primary" @click="submit('marital-status1')">保存</el-button>
            </div>
          </div>
          <div class="child-item">
            <div class="content-left">
              <el-template :pkTemp="pktemp['marital-status2']"
                          ref="marital-status2"
                          @change="changeHandle"
                          @setEmptyKeys="function(v){setEmpty(v,'marital-status2')}"
                          :hide-title="true"
                          :isEdit="isEdit"
                          :templateValue="currentValue['marital-status2']">
              </el-template>
              <el-button class="save" type="primary" @click="submit('marital-status2')">保存</el-button>
            </div>
            <div class="content-right">
              <!-- <el-upload
                class="avatar-uploader"
                action="/ifbp-app-bd/bd/customer/personal/file"
                :show-file-list="false"
                :on-success="function(res,file){handleAvatarSuccess('marital-status2',res,file)}"
                :before-upload="function(res,file){beforeAvatarUpload('marital-status2',res,file)}">
                <img v-if="imageUrl[imageCodes['marital-status2']]" :src="realPath[imageCodes['marital-status2']]" style="width: 100%;height: 120px;">
                <div v-else style="height:120px;line-height:120px;text-align:center;width:100%;">配偶附件图片</div>
              </el-upload> -->
              <img :src="realPath[imageCodes['marital-status2']]" style="width: 100%;height: 120px;">
            </div>
          </div>
          <div class="child-title" id="child-detail"><b>子女信息</b><i class="el-icon-plus" @click="addListItem('child-detail')"></i></div>
          <div class="child-item">
            <div class="content-left">
              <el-template :pkTemp="pktemp['child-detail']"
                          ref="child-detail"
                          @change="changeHandle"
                          @setEmptyKeys="function(v){setEmpty(v,'child-detail')}"
                          @save-expand-form="function(index, row){submit('child-detail', {index:index,row:row})}"
                          @delete-expand-form="function(index, row){delListItem('child-detail', {index:index,row:row})}"
                          :hide-title="true"
                          :expand="expand"
                          :expandRowKeys="expandRowKeys['child-detail']"
                          rowKey="id"
                          :isEdit="isEdit"
                          :templateValue="currentValue['child-detail']">
              </el-template>
            </div>
            <div class="content-right">
              <!-- <el-upload
                class="avatar-uploader"
                action="/ifbp-app-bd/bd/customer/personal/file"
                :show-file-list="false"
                :on-success="function(res,file){handleAvatarSuccess('child-detail',res,file)}"
                :before-upload="function(res,file){beforeAvatarUpload('child-detail',res,file)}">
                <img v-if="imageUrl[imageCodes['child-detail']]" :src="realPath[imageCodes['child-detail']]" style="width: 100%;height: 120px;">
                <div v-else style="height:120px;line-height:120px;text-align:center;width:100%;">子女照片</div>
              </el-upload> -->
              <img :src="realPath[imageCodes['child-detail']]" style="width: 100%;height: 120px;">
            </div>
          </div>
          <div class="child-title" id="habitation"><b>居住信息</b><i class="el-icon-plus" @click="addListItem('habitation')"></i></div>
          <div class="child-item">
            <div class="content-left">
              <el-template :pkTemp="pktemp.habitation"
                          ref="habitation"
                          @change="changeHandle"
                          @setEmptyKeys="function(v){setEmpty(v,'habitation')}"
                          @save-expand-form="function(index, row){submit('habitation', {index:index,row:row})}"
                          @delete-expand-form="function(index, row){delListItem('habitation', {index:index,row:row})}"
                          :hide-title="true"
                          :expand="expand"
                          :expandRowKeys="expandRowKeys['habitation']"
                          rowKey="id"
                          :isEdit="isEdit"
                          :templateValue="currentValue['habitation']">
              </el-template>
            </div>
            <div class="content-right">
              <!-- <el-upload
                class="avatar-uploader"
                action="/ifbp-app-bd/bd/customer/personal/file"
                :show-file-list="false"
                :on-success="function(res,file){handleAvatarSuccess('habitation',res,file)}"
                :before-upload="function(res,file){beforeAvatarUpload('habitation',res,file)}">
                <img v-if="imageUrl[imageCodes['habitation']]" :src="realPath[imageCodes['habitation']]" style="width: 100%;height: 120px;">
                <div v-else style="height:120px;line-height:120px;text-align:center;width:100%;">居住信息</div>
              </el-upload> -->
              <img :src="realPath[imageCodes['habitation']]" style="width: 100%;height: 120px;">
            </div>
          </div>
          <div class="child-title" id="job-detail"><b>工作信息</b></div>
          <div class="child-item">
            <div class="content-left">
              <el-template :pkTemp="pktemp['job-detail']"
                          ref="job-detail"
                          @change="changeHandle"
                          @setEmptyKeys="function(v){setEmpty(v,'job-detail')}"
                          :hide-title="true"
                          :isEdit="isEdit"
                          :auto-merge-col="true"
                          :templateValue="currentValue['job-detail']">
              </el-template>
              <el-button class="save" type="primary" @click="submit('job-detail')">保存</el-button>
            </div>
            <div class="content-right">
              <!-- <el-upload
                class="avatar-uploader"
                action="/ifbp-app-bd/bd/customer/personal/file"
                :show-file-list="false"
                :on-success="function(res,file){handleAvatarSuccess('job-detail',res,file)}"
                :before-upload="function(res,file){beforeAvatarUpload('job-detail',res,file)}">
                <img v-if="imageUrl[imageCodes['job-detail']]" :src="realPath[imageCodes['job-detail']]" style="width: 100%;height: 120px;">
                <div v-else style="height:120px;line-height:120px;text-align:center;width:100%;">工作信息</div>
              </el-upload> -->
              <img :src="realPath[imageCodes['job-detail']]" style="width: 100%;height: 120px;">
            </div>
          </div>
          <div class="child-title" id="re-exp-detail"><b>收支信息</b></div>
          <div class="child-item">
            <div class="content-left">
              <el-template :pkTemp="pktemp['re-exp-detail']"
                          ref="re-exp-detail"
                          @change="changeHandle"
                          @setEmptyKeys="function(v){setEmpty(v,'re-exp-detail')}"
                          :hide-title="true"
                          :isEdit="isEdit"
                          :templateValue="currentValue['re-exp-detail']">
              </el-template>
              <el-button class="save" type="primary" @click="submit('re-exp-detail')">保存</el-button>
            </div>
            <div class="content-right">
              <!-- <el-upload
                class="avatar-uploader"
                action="/ifbp-app-bd/bd/customer/personal/file"
                :show-file-list="false"
                :on-success="function(res,file){handleAvatarSuccess('re-exp-detail',res,file)}"
                :before-upload="function(res,file){beforeAvatarUpload('re-exp-detail',res,file)}">
                <img v-if="imageUrl[imageCodes['re-exp-detail']]" :src="realPath[imageCodes['re-exp-detail']]" style="width: 100%;height: 120px;">
                <div v-else style="height:120px;line-height:120px;text-align:center;width:100%;">收支信息</div>
              </el-upload> -->
              <img :src="realPath[imageCodes['re-exp-detail']]" style="width: 100%;height: 120px;">
            </div>
          </div>
        </div>
        <div class="detail-item" id="credit">
          <div class="title"><b>李四 信用档案</b></div>

        </div>
        <div class="detail-item" id="relation">
          <div class="title"><b>关联人档案</b></div>

        </div>
        <div class="detail-item" id="account">
          <div class="title"><b>银行账户</b></div>

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
// import template from './ui-template/src/template.vue';
  export default {
    // components: {
    //   el-template:template
    // },
    data(){
      return {
        loading: '',
        title: '客户',
        templateValue: '',//整个元数据值集合
        currentValue: {},
        emptyListItem: {},
        emptyId: '',
        loadDefer: [],
        imageUrl: {},
        realPath: {},
        imageCodes: {
          personalDetail: 'upbody_img',
          'contact-number': 'id_img',
          'marital-status1': 'mateidimg',
          'marital-status2': 'mate_attach',
          'child-detail': 'child_img',
          habitation: 'estateinfo_img',
          'job-detail': 'work_img',
          're-exp-detail': 'payments_img'
        },
        expand: {
          buttonAlign: 'right',
          columnsShowCount: 3,
          buttons: [
            {
              name: 'save',
              text: '保存',
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
        expandRowKeys: {
          'child-detail': [],
          habitation: []
        },
        listValue: {
          'child-detail': 'childreninfo_id',
          habitation: 'estateinfo_id'
        },
        id: this.$route.params.id,
        isEdit: true,
        isAdding:{
          'child-detail': false,
          habitation: false
        },
        pktemp: {
          personalDetail: 'eaa9aeaa-1cea-4a60-9e8d-11fee3bf654a',
          'contact-number': '50212a7f-e3eb-4d67-9786-4104c712a914',
          'marital-status1': '1510c82a-146c-48f8-8b3c-51746166fb9f',
          'marital-status2': '6c5593b3-dd46-4950-9ea6-b12a1ed12507',
          'child-detail': '7c647893-4258-4584-a8ab-c5eb1f94b5f2',
          habitation: 'f4dc61fa-1724-4fe7-8b5d-35c507860585',
          'job-detail': 'e8a9e0f1-4694-41e6-af56-0379af75c2f7',
          're-exp-detail': 'cbf9ab22-9f2b-4138-aec4-91277d4e089c'
        },
        promises: {},
        sideNavData: [
          {
            anchor: 'basic',
            label: '个人档案'
          },
          {
            anchor: 'contact-number',
            label: '联系方式'
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
          {
            anchor: 'credit',
            label: '信用档案'
          },
          {
            anchor: 'relation',
            label: '关联人档案'
          },
          {
            anchor: 'account',
            label: '银行账户'
          },
        ],
      };
    },
    beforeCreate(){
    },
    created() {
      console.log(this);
      var requestDefer = this.request();
      this.initPromise(requestDefer);
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
      initPromise(request){
        Object.keys(this.pktemp).forEach((id) => {
          var promise = new Promise((res, rej) => {
            this.promises[id] = {
              resolve: res,
              reject: rej
            };
          });
          this.loadDefer.push(promise);
          Promise.all([promise, request]).then(() => {
            this.assignValues(id);

          });
        });
        Promise.all(this.loadDefer.concat(request)).then(() => {
          this.$nextTick(() => {
            setTimeout(() => {
              this.$refs.cover.remove();
            },100);
          });
        });
      },
      initImgUrl(data) {
        var img = 'group1/M00/00/08/CgRmOVlE8D2AP60eAAFBvZgpebg889.png';
        var tmp;
        Object.keys(this.imageCodes).forEach((v) => {
          tmp = [null,''].indexOf(data[this.imageCodes[v]]) > -1 ? img : data[this.imageCodes[v]];
          this.$set(this.imageUrl, this.imageCodes[v], tmp);
        });
      },
      request(){
        return this.$http({
          url: '/ifbp-app-bd/bd/customer/personal/'+ this.id,
          method: 'get',
          dataType: 'json'
        }).then((res) => {
          this.templateValue = res.data.data;
          this.initImgUrl(res.data.data);
          // this.assignValues(this.currentValue, this.templateValue);
          // this.currentValue = JSON.parse(JSON.stringify(this.templateValue));
        });
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
      },
      addListItem(id) {
        console.log(this);
        if(!this.isAdding[id]) {
          this.isAdding[id] = true;
          this.currentValue[id].push(JSON.parse(JSON.stringify(this.emptyListItem[id])));
          this.expandRowKeys[id] = [this.emptyId];
        } else {
          this.isAdding[id] = false;
          this.currentValue[id].pop();
          this.expandRowKeys[id] = [];
        }
      },
      toggle(){
        this.isEdit = !this.isEdit;
      },
      submit(id, listData){
        var changedPropertyNames;
        var submitData;
        var tmpListData = listData;
        if (Object.keys(this.listValue).indexOf(id) > -1) { // grid
          changedPropertyNames = [''];
          var tableData = JSON.parse(JSON.stringify(this.currentValue[id]));
          if (this.isAdding[id]) {
            tableData.pop();
            tmpListData.row[this.listValue[id]] = this.id;
            tableData.push(tmpListData.row);
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
          url: '/ifbp-app-bd/bd/customer/personal/',
          method: 'post',
          dataType: 'json',
          data: submitData
        }).then((res) => {
          console.log(res);
          if(res.data.success === true) {
            if (Object.keys(this.listValue).indexOf(id) > -1) {
              this.currentValue[id] = res.data.data[this.listValue[id]];
              this.isAdding[id] = false;
              this.expandRowKeys[id] = [];
              if (window.env === 'dev') {
                this.$message('更新成功');
              }
            } else if (window.env === 'dev'){
                this.$message('保存成功');
            }
          }else {
            this.$error('保存失败');
          }

        }).catch(() => {
          this.$error('保存失败');
        });
      },
      delListItem(id, listData) {
        if(listData.row.id) {
          this.$http({
            url: '/ifbp-app-bd/bd/customer/personal/child?idtype=' + this.listValue[id] + '&id=' + listData.row.id,
            method: 'delete',
          }).then((res) => {
            if(res.data.success === true) {
              console.log('delete successfully');
              this.$message('删除成功');
              this.currentValue[id].splice(listData.index, 1);
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
        }
        this.promises[id].resolve(id);
      },
      changeHandle(){

      },
      beforeAvatarUpload(){
        return true;
      },
      getRealImg(url) {
        var realPath = '';
        if(url.length > 0) {
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
              this.$message.error('图片保存成功');
            }
          }).catch(() => {
            this.$message.error('图片保存失败');
          });
        } else { // form 上传后先赋值，点保存才存回执
          this.$set(this.imageUrl, this.imageCodes[id], res.data);
        }
      },
      scroll() {
        if(this.$route.path.indexOf('/crm/personalDetail') < 0){
          return;
        }
        this.fixedNav();
        this.scrollFocus();
      },
      // 控制side-nav悬浮在页面右上方
      fixedNav() {
        if($('#personalDetail .background').length > 0) {
          const mainTop = $('#personalDetail .background').offset().top;
          const $fixedDom = $('#personalDetail .nav_right');
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
<style scoped>
  .detail-container .el-form-item {
    margin-bottom: 2px;
  }
  .detail-container input.el-input__inner {
    height: 24px;
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
  .detail-container .el-upload.el-upload--text {
    width: 100%;
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
  }
  .child-item {
    /*height: 250px;*/
    border: 1px solid black;
    margin: 10px;
  }
  .child-item-left {
    margin-right: 10px;
    border: 1px solid black;
    width: calc(50% - 11px);
    height: 230px;
    float: left;
  }
  .child-item-right {
    margin-left: 10px;
    border: 1px solid black;
    width: calc(50% - 11px);
    height: 230px;
    float: left;
  }
  .personalDetail {
    width: calc(100% - 130px);
    height: 250px;
    float: right;
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
    border: 1px solid black;
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
    width: 100%;
    font-size: 20px;
    background-color: white;
    border: 1px solid #cecece;
    padding: 14px;
  }
  .background {
    background-color: #eeeff1;
    margin: 20px 20px 0 20px;
  }
  .cards-container {
    background-color: white;
  }
  .tile {
    border: 1px solid #ccc;
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
    border: 1px solid #DDD;
    font: 14px 'Microsoft YaHei';
    padding: 10px 40px 10px 50px;
    background-color: #FFF;
    z-index: 20;
  }
  .nav_right.fixed{
    width: 164px;
    position: fixed;
    right: 21px;
    top: 83px;
    border: 1px solid #DDD;
    font: 14px 'Microsoft YaHei';
    padding: 10px 40px 10px 50px;
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
</style>
