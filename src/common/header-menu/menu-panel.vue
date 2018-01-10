<template>
<div class="menu-panel">
  <div class="menu-panel-item" v-for="node in data" @click="function(){handlePanelItemClick(node.data)}">
    <span>{{node.data ? node.data.label : ''}}</span>
  </div>
  <div class="menu-panel-empty" v-if="data.length === 0">
    还没有找到小应用~
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {

    };
  },
  props: {
    data: {
      default: [],
    }
  },
  methods: {
    handlePanelItemClick(data) {
      var path = data && data.path; // 获得小磁贴的path
      if(path) {
        /* 多页签代码 */
        this.$parent.showMenu = false;
        /* this.$root.$children[0].addEditableTabs({
          path: data.path,
          label: data.label
        }) */
        // this.$root.$router.push(path); // 跳转路由
        window.location.hash = path;
      }
    }
  }
};
</script>
<style>
.menu-panel {
  height: 368px;
  overflow: auto;
}
.menu-panel .menu-panel-item {
  height: 50px;
  line-height: 50px;
  font-size: 13px;
  cursor: pointer;
  color: #0070b1;
  text-align: left;
  padding: 0 20px;
  width: 50%;
  max-width: 300px;
  float: left;
}
.menu-panel .menu-panel-item:hover {
  background-color: #e8eff6;
}
.menu-panel-empty {
  height: 138px;
  line-height: 138px;
}
</style>
