<template>
  <div>
    <div class="card-box" v-for="(item, index) in list" :key="item.index" style="width:100%">
      <header class="card-name">
        {{item.name}}
      </header>
      <router-link tag="div" :to="{path:child.path,query:{url: child.url}}" v-for="(child, index) in item.children" :key="child.index" style="text-align:center">
        <el-tile :title="child.name" :cardStyle="{padding: '0px',cursor: 'pointer' }">
           <div class="" slot="media">
              <img src="../../assets/images/logo.png" style="width: 100%;" alt="" />
           </div>
        </el-tile>
      </router-link>
    </div>
  </div>
</template>

<script>
  // 引入组件
  export default {
  data() {
    return {
      currentDate: new Date(),
      list: [],
      title: 'ss'
    };
  },
   methods: {
      request(){
         const vm = this;
         vm.list = [
            {
              name: '系统管理',
              children: [
                { name: '用户管理', path: '/user', url: 'http://localhost:8080/legacy/portal/index.html#/user' },
                { name: '角色管理', path: '/role', url: 'http://localhost:8080/legacy/portal/index.html#/role' },
                 { name: '应用中心', path: '/appcenter', url: 'http://localhost:8080/legacy/portal/index.html#/appcenter' },
                { name: '应用列表', path: '/applist', url: 'http://localhost:8080/legacy/portal/index.html#/applist' },
                 { name: '管理中心', path: '/ctrlCenter', url: 'http://localhost:8080/legacy/portal/index.html#/ctrlCenter' },

              ]
            }
         ];
    },
      opentab(child){
        const path = child.path;
        this.$router.push({ path, query: { url: child.url } });
      }
    },

    created(){
      this.request();
    }
};
</script>

<style>
  .card-box {
    margin:0 auto;
    background: #fff;
    position: relative;
    z-index: 0;
    overflow: hidden;
  /*  margin-top: 29px!important;*/
    /*border-radius: 8px;*/
    /*border: 1px solid rgba(0,0,0,.14);*/
    /*box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);*/
    box-sizing: border-box;
  }

  .card-name{
    background: #fafafa;
    line-height: 60px;
    font-size: 18px;
    color: #666;
    position: relative;
    display: block;
    padding-left: 30px;
    box-shadow: none;
    border-bottom: 1px solid #eee
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 50%;
    display: block;
    margin: 0 auto;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
</style>
 No newline at end of file
