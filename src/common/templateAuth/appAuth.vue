<template>
  <div>
  <div class="title-header" style="padding: 20px 23px;">
    <h2 class="name">功能节点默认模板设置</h2>
  </div>
  <div id="appTplAuth-container">
    <div id="app-container">
      <el-tree
        :data="treeData"
        style="height: 400px;overflow: auto;"
        accordion
        :highlight-current="true"
        @current-change="handleAppChange"
      >
      </el-tree>
    </div>
    <div id="tpl-container" style="height: 400px; position:relative;">
      <el-table
      :max-height="400"
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      v-for="column in tableColumn"
      :prop="column.prop"
      :label="column.title"
      v-if="column.display"
      >
    </el-table-column>
    <el-table-column
      label="操作"
      >
      <template scope="scope">
        <i class="el-icon-delete" type="primary" @click="deleteRow(scope.row)"></i>
      </template>
    </el-table-column>
  </el-table>
  <el-button @click="add" type="primary" width="100" style="position:absolute;bottom:10px; margin-left: calc(50% - 50px);">添加</el-button>
    </div>
  </div>
  <el-dialog
  title="选择模板"
  v-model="dialogVisible">
    <div style="font-size: 0px;">
      <div id="authApp-tpl-tree">
        <el-tree
        :data="tplTree"
        style="height: 400px;overflow: auto;"
        accordion
        :highlight-current="true"
        @current-change="handleTplChange"
        :props="{label:'name',children:'forms'}"
        >
        </el-tree>
      </div>
      <div id="authApp-dialog-form" style="padding: 0 calc(35% - 140px) 0 calc(35% - 140px)">
        <el-form
        :model="dialogForm"
        label-width="80px">
          <el-form-item label="节点标示">
            <el-input v-model="dialogForm.nexuskey"></el-input>
          </el-form-item>
          <template v-if="false">
          <el-form-item label="模板选择">
            <el-input v-model="dialogForm.a"></el-input>
          </el-form-item>
          <el-form-item label="所属模块">
            <el-input v-model="dialogForm.b"></el-input>
          </el-form-item>
          <el-form-item label="所属行业">
            <el-input v-model="dialogForm.pkIndustry"></el-input>
          </el-form-item>
          <el-form-item label="国家/地区">
            <el-input v-model="dialogForm.pkCountry"></el-input>
          </el-form-item>
          <el-form-item label="资产层次">
            <el-input v-model="dialogForm.layer"></el-input>
          </el-form-item>
        </template>
        </el-form>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>

export default {
  data(){
    return {
      treeData: [],
      tableData: [],
      tplTree: [],
      dialogForm: {
        nexuskey: '',//节点标示
        pkIndustry: '',//所属行业
        pkCountry: '',//国家/地区
        layer: '',//资产层次
      },
      currentApp: '',
      currentTpl: '',
      dialogVisible: false,
      tableColumn: [{
        title: '模板类型',
        prop: 'type',
        display: true
      },{
        title: '模板名称',
        prop: 'tplName',
        display: true
      },{
        title: '节点标示',
        prop: 'nexuskey',
        display: true
      },{
        title: '所属模块',
        prop: 'moduleid',
        display: false
      },{
        title: '所属行业',
        prop: 'pkIndustry',
        display: false
      },{
        title: '国家/地区',
        prop: 'pkCountry',
        display: false
      },{
        title: '资产层次',
        prop: 'layer',
        display: false
      }]
    };
  },
  methods:{
    request(){
      this.$http({
        url:'/wbalone/appMGT/findAllApps'
      }).then((res) => {
        if(res.data.status === 1) {
          this.treeData = res.data.data;
        } else {
          this.$message.error('请求失败');
        }
      }).catch(() => {
        this.$message.error('请求出错');
      });
    },
    handleAppChange(value) {
      console.log(value);
      if(!value.children) {
        this.currentApp = value;
        this.$http({
          url: '/wbalone/uitemplatenexusbase/find/' + value.code,
          method: 'get'
        }).then((res) => {
          this.tableData = res.data.data;
          this.addType(this.tableData);
        }).catch(() => {
          this.$message.error('请求失败');
        });
      } else {
        this.currentApp = '';
      }
    },
    addType(data) {
      data.forEach((v) => {
        this.$set(v, 'type', 'UI模板');
      });
    },
    handleTplChange(value) {
      console.log(value);
      if(!value.forms) {
        this.currentTpl = value;
      } else {
        this.currentTpl = '';
      }
    },
    add() {
      if(this.currentApp === '') {
        this.$message('请选择有效的小应用节点');
      } else {
        this.resetForm();
        this.dialogVisible = true;
        this.requestTplTree();
      }
    },
    requestTplTree() {
      this.$http({
        url: '/uitemplate_web/uitemplate_ctr/uitemplate_design_ctr/queryUITemplateList',
        method: 'post',
        contentType: 'application/x-www-form-urlencoded',
        data: 'data=' + encodeURIComponent('{"tenant_id":"","type":"sys"}')
      }).then((res) => {
        this.tplTree = res.data.formCategories;
      }).catch(() => {
        this.$message.error('请求失败');
      });
    },
    deleteRow(row) {
      console.log(row);
      this.$confirm('确定删除关联?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: '/wbalone/uitemplatenexusbase/delete/' + row.pkNexus,
            method: 'post'
          }).then((res) => {
            this.tableData.splice(this.tableData.indexOf(row), 1);
            if(res.data.status === 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              });
            }
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '删除失败!'
            });
          });

        });
    },
    closeDialog() {
      console.log('close dialog');
    },
    confirm() {
      if (this.currentTpl === '') {
        this.$message('请选择有效的UI模板');
      } else {
        this.$http({
          url: '/wbalone/uitemplatenexusbase/create',
          method: 'post',
          data: {
            pkTemp: this.currentTpl.id,
            nexuskey: this.dialogForm.nexuskey,
            funnode: this.currentApp.code
          }
        }).then((res) => {
          console.log(res);
          if(res.data.status === 1) {
            console.log(res);
            this.dialogVisible = false;
            res.data.data.type = 'UI模板';
            this.tableData.push(res.data.data);
          } else {
            this.$message.error(res.data.message);
          }
        }).catch(() => {
          this.$message.error('请求失败');
        });
      }
    },
    cancel() {
      this.dialogVisible = false;
    },
    resetForm() {
      Object.keys(this.dialogForm).forEach((key) => {
        this.dialogForm[key] = '';
      });
    }
  },
  created(){
    this.request();
  }
};
</script>

<style scoped>
#appTplAuth-container {
  padding: 15px;
  font-size: 0px;
}

#app-container {
  display: inline-block;
  width: calc(30% - 20px);
  font-size: 14px;
  vertical-align: top;
  margin-right: 15px;
}

#tpl-container {
  display: inline-block;
  width: calc(70% - 20px);
  font-size: 14px;
  height: 400px;
  background-color: white;
  vertical-align: top;
}

#authApp-tpl-tree {
  display: inline-block;
  width: calc(30% - 2px);
  font-size: 14px;
  vertical-align: top;
}

#authApp-dialog-form {
  display: inline-block;
  width: calc(70% - 2px);
  font-size: 14px;
  vertical-align: top;
}
</style>
