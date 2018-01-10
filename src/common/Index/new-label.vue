<style>
  .new-label {
    font-family: '.PingFang-SC-Medium', 'PingFang SC Bold', 'PingFang SC';
    box-sizing: border-box;
    width: 1080px;
    background: #fff;
    padding: 20px;
    list-style: none;
    position: relative;
    font-size: 14px;

  }
  .new-label h4 {
    font-size: 14px;
  }
  .new-label .left-input,.right-input {

    margin-right: 10px;
    width: 430px;
    text-align: right;
    display: inline-block;
    z-index: 10px;
  }
  .new-label .right-input {
    position: absolute;
    top: 40px;
    right: 115px;

  }
  .new-label input{
    margin-left: 10px;
    padding: 5px;
    width: 300px;
    height: 36px;
    box-sizing: border-box;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 1);
    border: 1px solid rgba(206, 208, 218, 1);
    color: #9FA9BA;
  }
  .new-label li {
    color: #393C3E;
    padding-left: 45px;
    margin-top: 10px;
    display: inline-block;
    text-align: right;
  }
  .new-label .left-input li:before,.right-input li:before{
    content: '*';
    margin-right: 4px;
    color: #E60012;
  }
  .new-label .label {
    margin-top: 10px;
    color: #393C3E;
    font-size: 14px;
    vertical-align: middle;
  }
  .new-label .label textarea {
    vertical-align: middle;
    margin-left: 10px;
    width: 300px;
    height: 60px;
    box-sizing: border-box;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 1);
    border: 1px solid rgba(206, 208, 218, 1);
    padding: 5px;
  }
  .new-label .active p{
    text-align: left;
    color: #E60012;
    font-size: 12px;
    margin-left: 80px;
  }
  .new-label .upload-file {
    margin-top: -10px;
    margin-left: -20px;
  }
  .new-label .center-uploader {
    position: relative;
    margin-top: 10px;
    width: 1040px;
    background: inherit;
    overflow-y: auto;
    background-color: rgba(255, 255, 255, 1);
    box-sizing: border-box;
    border: 1px solid rgba(230, 234, 238, 1);
  }
  .new-label  .upload-demo {
    width: 250px;
    height: 80px;
    position: absolute;
    display: inline-block;
    text-align: center;
    left: 0;
    right: 0;
    top: 20px;
    bottom: 0;
    margin: auto;
  }

  .new-label .add-upload {
    padding-left: 20px;
    padding-top: 20px;
    position: absolute;
    display: inline-block;
    text-align: left;
  }
  .new-label .center-uploader .el-button {
    font-size: 14px;
    color: #71787E;
    width: 100px;
    height: 36px;
    background-color: rgba(250, 251, 252, 1);
    border: 1px solid rgba(206, 208, 218, 1);
    margin: auto;
    vertical-align: baseline;
  }
  .new-label .center-uploader .el-button:before {
    content: '';
    font-family: 'icomoon', 'icomoon';
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    color: #71787E;
  }
  .new-label .center-uploader .el-button--primary {
    font-size: 14px;
    color: #71787E;
  }
  .new-label .el-upload__tip {
    font-size: 12px;
    display: inline-block;
    text-align: center;
    margin-left: 10px;
    color: rgba(159, 169, 186, 0.498039215686275);
  }
  .new-label .el-upload-ul {
    color: #71787E;
    width: 1080px;
    position: absolute;
    left: -80px;
    top: 60px;
    display: block;
  }
  .new-label .el-upload-list__li {
    display: inline-block;
    width: 400px;
    height: 36px;
    line-height: 36px;
    text-align: left;
    padding-left: 0px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0 20px 0 100px ;
  }
  .new-label .el-look-load {
    display: none;
  }
  .new-label .el-upload-list__li:hover .el-look-load{
    display: inline-block;
    margin-right: 10px;

  }

  .new-label .el-upload-list__li a{
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    color: #00A5E3;

  }
  .new-label .el-upload-list__li .el-upload-list__item-a{
    width: 227px;
    font-size: 14px;
    color: #71787E;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .new-label .el-upload-list__item-a:before {
    content: '';
    width: 17px;
    height: 16px;
    font-family: 'icomoon', 'icomoon';
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    color: #71787E;
  }
  .new-label .btn{
    position: absolute;
    bottom: 0;
    left: 0px;
    height: 60px;
    line-height: 60px;
    width: 1080px;
    box-shadow: 0px -3px 3px rgba(0, 0, 0, 0.0784313725490196);

  }
  .new-label .btn .el-form {
    float: right;
    margin-top: 10px;
    margin-right: 200px;
    display: inline-block;
  }
  .new-label .btn .el-button {
    box-sizing: border-box;
    border-radius: 4px;
    width: 100px;
    height: 40px;

  }
   .new-label .btn .el-button--primary {
    background-color: rgba(114, 193, 28, 1);
    border: 1px solid rgba(92, 160, 18, 1);
   }

</style>
<template>
  <div class="new-label">
    <h4>标题信息</h4>
    <div class="left-input">
       <ul>
         <li class="active" v-for="(ipt , index) in options">{{ ipt.title }} <input :type="ipt.type"></li>
         <div class="label">
           备注<textarea  cols="5" rows="5"></textarea>
         </div>
       </ul>
    </div>
    <div class="right-input">
      <ul>
         <li>表单标题<input placeholder="请输入" type="text"></li>
         <li>表单标题<input placeholder="请输入" type="text"></li>
         <li>表单标题<input placeholder="请输入" type="text"></li>
      </ul>
    </div>
    <div class="upload-file">
      <h4>附件</h4>
      <div class="center-uploader" :style="{ height: autoheight + 'px'}">
        <el-upload
        multiple
        :class="{'upload-demo': !showul, 'add-upload': showul}"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="showfile"
      :on-success="getsuccess"
     >
      <el-button  size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
       <ul class="el-upload-ul" v-show="showul">
            <li v-for="files in filelists" class="el-upload-list__li">
              <a href="#" class="el-upload-list__item-a" v-if="!files.rename">
                {{ files.name}}
              </a>
              <a href="#" class="el-upload-list__item-a" v-else="!files.rename">
                {{ files.rename}}
              </a>
              <div class="el-look-load">
                <a href="#">查看&nbsp;&nbsp</a>
                <a href="#">下载&nbsp;&nbsp</a>
                <a href="#" @click="del(files.uid)">删除</a>
              </div>
            </li>
          </ul>
      </div>
    </div>
    <div class="btn">
      <el-form>
        <el-form-item>
          <el-button type="primary" @click="submitForm('numberValidateForm')">保存</el-button>
          <el-button @click="resetForm('numberValidateForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        options:[
          {title: "标题菜单", type: "text", value: ''},
          {title: "标题菜单", type: "text", value: ''},
          {title: "标题菜单", type: "text", value: ''}
        ],
        showfile: false,
        filelists: [],
        showul: false,
        autoheight: 130
      };
    },
    methods: {
      getsuccess: function(response, file, fileList) {
          console.log(JSON.stringify(fileList));
          console.log(file.name);
          if (file.name.length >= 13){
              const arr = file.name.split('.');
              const tmp = arr[0].substr(0,10) + '....' + arr[arr.length-1];
            /* eslint-disable */
            file.rename = tmp ;
            /* eslint-enable */
          }
        this.showul = true;
        this.autoheight = 190;
        let filesize = file.size;
        this.filelists.forEach((element) => {
          filesize+= element.size;
        });
        if (filesize >= 1048576) {
          if (!this.filelists.length) {
            this.showul = false;
            this.autoheight = 130;
          }
          return;
        }
        this.filelists.push(file);


      },
      del: function (id) {
        let index;
        this.filelists.some((element, i) => {
          if (element.uid === id) {
            index = i;
            return true;
          }
          return false;
        });
        if (index === undefined) {
          return;
        }
        this.filelists.splice(index, 1);
        if(!this.filelists.length) {
            this.showul = false;
            this.autoheight = 130;
        }
      }

    }
  };
</script>
