<template>
  <mb-tree id="header-menu-tree" ref="menuTree" class="menu-tree" :data="data" @node-click="handleNodeClick" @node-expand="handleNodeExpand">
  </mb-tree>
</template>
<script>
export default {
  data() {
    return {
      firstAutoClick: false  //判断不可展开节点，是否首次自动点击
    };
  },
  props: ['data'],
  created() {

  },
  mounted() {
    // var vm = this;
    this.$watch(() => this.$refs.menuTree.root, () => {
      // 菜单为三层，第三层显示到右侧，第二层就不要有向右展开的图标了
      var newVal = this.$refs.menuTree.root;
      if(newVal.level === 1) {
        for(var i = 0; i < newVal.childNodes.length; i++){
          newVal.childNodes[i].isLeaf = true;
        }
      } else if(newVal.level === 0) {
        var selfLabel = '';
        newVal.childNodes.forEach((item) => {
          if(item.isLeaf !== false) {
            selfLabel = item.data.label;
            vm.$emit('menu-data-change', item.childNodes, selfLabel);
          }
        });
        // var selfLabel = item.data.label;
        this.$emit('menu-data-change', [], '');
      }
    },{
      deep: true
    });
  },
  methods: {
    handleNodeClick(nodeData, node, instance) {
      if(!node.isLeaf) { // 当前节点可以展开
        this.$parent.mainHeadTitle = nodeData.label;
        // this.$parent.showMenu = false;
        // this.$router.push(nodeData.path);
        instance.handleExpandIconClick();
        this.firstAutoClick = true;
      }else if(node.childNodes && node.childNodes.length) { // 当前节点不可展开，且有子节点，子节点显示到右侧
        var selfLabel = nodeData.label;
        this.$emit('menu-data-change', node.childNodes, selfLabel);
        if(!this.firstAutoClick) {
          this.$parent.handleLeftClickOutside();
        }
        this.firstAutoClick = false;
      }
    },
    handleNodeExpand(data, node) {
      var parentLabel = node.data.label;
      this.$emit('parent-label-change', parentLabel);
      if(node.childNodes.length) {
        this.$nextTick(() => {
          this.$el.querySelector(".menu-tree .el-tree-node").click();
        });
      }
    },
  }
};
</script>
<style>
.el-tree.menu-tree {
  border: none;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
}
.menu-tree .el-tree-node{
  border-top: 1px solid #e5e5e5;
}
.menu-tree .el-tree-node .el-tree-node__content {
  padding: 0 5px 0 20px;
}
.menu-tree.el-tree .TreeBack{
  cursor: pointer;
}
/* .el-tree-node__content .el-icon-caret-right {
  padding: 7px 6px 7px 8px;
  border-radius: 20px;
}
.el-tree-node__content .el-icon-caret-right:hover {
  background-color: #FFF;
} */
.menu-tree .el-tree-node.is-current .el-tree-node__content {
  background-color: #f1f4f7;
}
.menu-tree .el-icon-arrow-left {
  font-size: 14px;
  margin: 0.3125rem !important;
  padding: 0.4125rem;
  padding-right: 0.6125rem;
  box-sizing: border-box;
  border-radius: 20px;
  color: #97a8be;
}
/*.menu-tree .el-icon-arrow-left:hover {
  cursor: pointer;
  background-color: #e8e8e8;
}*/

</style>
