<style>
  .upload-file {
    padding-left: 20px;
    padding-top: 20px;
  }
  .upload-file .center-uploader {
    position: relative;
    margin-top: 10px;
    width: 1040px;
    background: inherit;
    overflow-y: auto;
    background-color: rgba(255, 255, 255, 1);
    box-sizing: border-box;
    border: 1px solid rgba(230, 234, 238, 1);
  }
  .upload-file  .upload-demo {
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
  .upload-file .add-upload {
    padding-left: 20px;
    padding-top: 20px;
    position: absolute;
    display: inline-block;
    text-align: left;
  }
  .upload-file .center-uploader .el-button {
    font-size: 14px;
    color: #71787E;
    width: 100px;
    height: 36px;
    background-color: rgba(250, 251, 252, 1);
    border: 1px solid rgba(206, 208, 218, 1);
    margin: auto;
    vertical-align: baseline;
  }
  .upload-file .center-uploader .el-button:before {
    content: '';
    font-family: 'icomoon', 'icomoon';
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    color: #71787E;
  }
  .upload-file .center-uploader .el-button--primary {
    font-size: 14px;
    color: #71787E;
  }
  .upload-file .el-upload__tip {
    font-size: 12px;
    display: inline-block;
    text-align: center;
    margin-left: 10px;
    color: rgba(159, 169, 186, 0.498039215686275);
  }
  .upload-file .el-upload-ul {
    color: #71787E;
    width: 1080px;
    position: absolute;
    left: -80px;
    top: 60px;
    display: block;
  }
  .upload-file .el-upload-list__li {
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
  .upload-file .el-look-load {
    display: none;
  }
  .upload-file .el-upload-list__li:hover .el-look-load{
    display: inline-block;
    margin-right: 10px;

  }

  .upload-file .el-upload-list__li a{
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    color: #00A5E3;

  }
  .upload-file .el-upload-list__li .el-upload-list__item-a{
    width: 227px;
    font-size: 14px;
    color: #71787E;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .upload-file .el-upload-list__item-a:before {
    content: '';
    width: 17px;
    height: 16px;
    font-family: 'icomoon', 'icomoon';
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    color: #71787E;
  }
  .upload-file .btn{
    position: absolute;
    bottom: 0;
    left: 0px;
    height: 60px;
    line-height: 60px;
    width: 1080px;
    box-shadow: 0px -3px 3px rgba(0, 0, 0, 0.0784313725490196);

  }
  .upload-file .btn .el-form {
    float: right;
    margin-top: 10px;
    margin-right: 200px;
    display: inline-block;
  }
  .upload-file .btn .el-button {
    box-sizing: border-box;
    border-radius: 4px;
    width: 100px;
    height: 40px;

  }
  .upload-file .btn .el-button--primary {
    background-color: rgba(114, 193, 28, 1);
    border: 1px solid rgba(92, 160, 18, 1);
  }

</style>
<template>
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
</template>
<script>
  export default {
    data() {
      return {
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
