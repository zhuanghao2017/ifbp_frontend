<template>
  <div class="headerMenu menuHeaderCenter" v-clickoutside="handleClickoutside">
    <span class="menuHeaderContent" @click="handleHeaderContentClick">
      {{ mainHeadTitle }}
      <i :class="{'menuHeaderIcon':true, 'el-icon-arrow-down': !showMenu, 'el-icon-arrow-up': showMenu}"></i>
    </span>
    <div class="menuHeaderExpandbox" v-show="showMenu">
      <div class="expand-box-header">
        <i class="el-icon-pt-fenlei1 showLeftBtn" @click="showLeftBtnClick"></i>
        {{ parentLabel }}
      </div>
      <div class="expandBox-inner">
        <div class="expand-box-container">
          <div class="left fl" v-clickoutside="handleLeftClickOutside">
            <div class="left-scroll-box">
              <menuTree :data="menuData" @menu-data-change="handleMenuDataChange" @parent-label-change="handleParentLabelChange"></menuTree>
              <div class="middle-border"></div>
            </div>
          </div>
          <div class="right fl">
            <div class="right-header">{{selfLabel}}</div>
            <menuPanel :data="menuListData"></menuPanel>
          </div>
        </div>
      </div>
      <span class="triangleUp"></span>
    </div>
  </div>
</template>
<script>
import menuTree from './menu-tree.vue';
import menuPanel from './menu-panel.vue';
import Clickoutside from 'ifbp-element/lib/utils/clickoutside';
export default {
  data() {
    return {
      showMenu: false,
      leftShown: false,
      mainHeadTitle: '首页',
      menuListData: [],
      parentLabel: '',
      selfLabel: '',
    };
  },
  props: ['menuData'],
  components: {
    menuTree,
    menuPanel,
  },
  directives: { Clickoutside }, // 指令clickoutside
  methods: {
    handleClickoutside() {
      if(this.showMenu) {
        this.showMenu = false;
      }
    },
    handleMenuDataChange(childNodes, selfLabel) {
      this.menuListData = childNodes;
      this.selfLabel = selfLabel;
    },
    handleParentLabelChange(parentLabel) {
      this.parentLabel = parentLabel;
    },
    handleHeaderContentClick(e) {
      this.showMenu = !this.showMenu;
      e.preventDefault();
      e.stopPropagation();
    },
    showLeftBtnClick() {

      if(!this.leftShown) {
        this.showLeft();
        this.leftShown = true;
      } else {
        this.handleClickoutside();
      }
    },
    handleLeftClickOutside() {
      if(this.leftShown) {
        this.hideLeft();
        this.leftShown = false;
      }
    },
    showLeft() {
      var leftEl = document.querySelector(".expand-box-container .left");
      leftEl.style.left = "0";
    },
    hideLeft() {
      var leftEl = document.querySelector(".expand-box-container .left");
      leftEl.style.left = "-330px";
    }
  }
};
</script>
<style>
.headerMenu.menuHeaderCenter {
  height: 70px;
  line-height: 70px;
  text-align: center;
  font-size: 15px;
}

.headerMenu .menuHeaderContent {
  height: 40px;
  line-height: 40px;
  padding: 0 14px;
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  box-sizing: border-box;
  border-radius: 3px;
  cursor: pointer;
  z-index: 10;
}

.headerMenu .menuHeaderContent:hover {
  background-color: #eeeff1;
}

.headerMenu .menuHeaderExpandbox {
  position: absolute;
  background-color: #fff;
  border: 1px solid #d1dbe5;
  box-shadow: 2px 2px 15px #a2a0a0;
  z-index: 100;
  border-radius: 5px;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  min-width: 769px;
}
.expandBox-inner {
  width: 100%;
  min-height: 200px;
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
}
.menuHeaderExpandbox .expand-box-header {
  position: relative;
  text-align: center;
  font-size: 13px;
  width: 100%;
  height: 30px;
  line-height: 30px;
}
.menuHeaderExpandbox .expand-box-header .showLeftBtn {
  display: none;
  position: absolute;
  left: 15px;
  top: 8px;
  font-size: 15px;
  cursor: pointer;
}
.menuHeaderExpandbox .expand-box-container {
  width: 100%;
  min-width:767px;
  height: 400px;
}

.headerMenu .menuHeaderExpandbox .left {
  border-right: 1px solid #dfe6ec;
  display: block;
  background-color: #fff;
  z-index: 2;
  transform: translate3d(0px, 0px, 0px);
  transition: all 300ms;
  height: 400px;
}

.expand-box-container .left-scroll-box {
  height: 400px;
  overflow-x: hidden;
  overflow-y: auto;
}

.headerMenu .menuHeaderExpandbox .right {
  width: calc(100% - 330px);
  height: 400px;
  overflow-x: hidden;
  overflow-y: auto;
}

.headerMenu .el-tree {
  width: 320px;
  text-align: left;
}

.headerMenu .el-tree .TreeBack {
  height: 30px;
  line-height: 26px;
}

.right .right-header {
  width: 100%;
  height: 32px;
  line-height: 32px;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  text-align: left;
  padding-bottom: 0.5rem;
  padding-left: 0.75rem;
  display: block;
  background-color: #fafafa;
  font-size: 13px;
}
.triangleUp {
  width: .8rem;
  height: .8rem;
  position: absolute;
  top: -0.4rem;
  left: 50%;
  transform: translateX(-100%) rotate(-45deg);
  box-shadow: 2px -2px 3px #dcd8d8;
  background-color: #fff;
  z-index: 100;
}
.middle-border {
  width: 1px;
  height: 2000px;
  border-left: 1px solid #e5e5e5;
  position: absolute;
  left: 320px;
}
</style>
