<template>
<div>
<el-dialog title="" v-model="visible" size="small" @close="close233">

  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="常用" name="first"></el-tab-pane>
    <el-tab-pane label="全部" name="second"></el-tab-pane>
 </el-tabs>

 <div style="display:flex;background-color:#FFF;border:1px #EEE solid">
      <div v-if="treeData.length>0" :style="styleTree">
         <el-input
            placeholder="输入关键字进行过滤"
            icon="search"
            v-model="filterText">
          </el-input>
          <el-tree
            :data="treeData"
            :props="treeprops"
          
            default-expand-all
            ref ="reftree"
            :filter-node-method="filterNode"
            @node-click="handleNodeClick">
          </el-tree>
      </div>
        <div v-if="tableData.length>0" :style="styleTable">
          <div v-if="treeData.length<=0">
           <el-input 
            placeholder="输入关键字进行过滤"
             icon="search"
            v-model="filterText">
          </el-input>
          </div>

             <el-table
            :data="tableData"
            highlight-current-row
            @current-change="handleCurrentChange"
            style="width: 100%">
            <el-table-column
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              property="date"
              label="日期"
              width="120">
            </el-table-column>
            <el-table-column
              property="name"
              label="姓名"
              width="120">
            </el-table-column>
            <el-table-column
              property="address"
              label="地址">
            </el-table-column>
          </el-table>
        </div>
 </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="handleCloseSelf()">取 消</el-button>
    <el-button type="primary" @click="handleCloseSelf">确 定</el-button>
  </div>
 </el-dialog>
</div>
</template>

<script>
/*eslint no-console: "warn"*/
  export default {
     props: ['dialogVisible', 'treeDc', 'children', 'label', 'tableDc'],
    data() {
      return {
        activeName: 'first',
        treeData: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        // 外部引用可以添加的属性
        treeprops: {
          children: 'children',
          label: 'label'
        },
        styleTree: {
          width: '100%'
        },

        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        currentRow: null,
        styleTable: {
          width: '100%'
        },
        // dialogVisible: true,
        filterText: ''
      };
    },
     watch: {
      filterText(val) {
        this.$refs.reftree.filter(val);
     }
    },
    computed: {
      visible: function() {
        console.log('computed');
        return this.dialogVisible;
      }
    },
    created() {
     
      // this.dialogVisible = this.props.dialogVisible;
      this.treeprops = {
        children: this.children,
        label: this.label
      };
     console.log(this.treeDc, this.tableDc);
      if ((this.treeDc.length > 0) && (this.tableDc.length > 0)) {
         this.styleTree = {width: '30%'};
         this.styleTable = {width: '70%'};
      } else if ((this.treeDc.length > 0) && (this.tableDc.length <= 0)) {
         this.styleTree = {width: '100%'};
         this.styleTable = {width: '0%'};
         this.tableData = [];
      } else if ((this.treeDc.length <= 0) && (this.tableDc.length > 0)) {
         this.styleTree = {width: '0%'};
         this.styleTable = {width: '100%'};
         this.treeData = [];
      }
      this.fetchData();
    },
    beforeMount() {
        console.log(this.treeDc, this.tableDc);
    },
    methods: {
      fetchData(url) {
        if (url) {
          this.$http.get('./static/data.js').then((response) => {
            // success callback
            console.log(response.data);
        }, (response) => {
            // error callback
        });
        }
        

      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
       /*eslint no-unused-vars: "warn"*/
      handleClick(tab, event) {
        console.log(tab.name, event);
         this.$emit('onTabClick', tab);
      },
      
      handleNodeClick(data) {
        console.log(data);
        this.data = data;
        this.$emit('onTreeNodeClick', data);
      },
      loadNode(node, resolve) {
        var data;
        if (node.level === 0) {
          return resolve([{ name: 'region1' }, { name: 'region2' }]);
        }
        if (node.level > 3) return resolve([]);

        let hasChild;
        if (node.data.name === 'region1') {
          hasChild = true;
        } else if (node.data.name === 'region2') {
          hasChild = false;
        } else {
          hasChild = Math.random() > 0.5;
        }

        setTimeout(() => {
          
          if (hasChild) {
            const count = this.count + 1;
            data = [{
              name: `zone${count}`
            }, {
              name: `zone${count}`
            }];
          } else {
            data = [];
          }

          return resolve(data);
        }, 500);
  
          return resolve(data);
      },
      handleCurrentChange(val) {
        console.log(val.name);
        this.currentRow = val;
        this.data = val;
        this.$emit('onSelectRow', val);
      },
      close233: function() {
        console.log('close');
        this.$parent.$emit('closeDialog', 233);
      },
      handleCloseSelf() {
        console.log(this.$parent);
        this.$emit('onSelectData', this.data);
        this.close233();
        // this.visible=false;
      }
    }
  };
</script>
<style scoped>
   .el-tree{
    border-bottom: none;
   }
</style>
