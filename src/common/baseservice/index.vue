<template>
  <div>
      <!-- <p class="appTitle" v-if="this.$route.path.indexOf('/appArea_')" >应用平台</p>
      <p class="appTitle" v-if="this.$route.path === '/sysmgr'">管理中心</p> -->
      <div style="margin: 10px;">
        <!--<div style="float: left; margin-right: 120px;" v-if="this.$route.path === '/sysmgr'">-->
          <!--<span style="font-size: 15px;color: black;">领域：</span>-->
          <!--<el-select v-model="value"-->
                     <!--placeholder="请选择"-->
                     <!--@change="change(value)">-->
            <!--<el-option-->
              <!--label="全部领域"-->
              <!--value="全部领域">-->
            <!--</el-option>-->
            <!--<el-option-->
              <!--v-for="(item,index) in list"-->
              <!--:label="item.label"-->
              <!--:value="item.value"-->
              <!--:key="item.index">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</div>-->
        <!--<div style="float: left">-->
          <!--<span style="font-size: 15px;color: black;">小应用分组：</span>-->
          <!--<el-select v-model="groupValue"-->
                     <!--placeholder="选择分组"-->
                     <!--@change="changeGroup(groupValue)">-->
            <!--<el-option-->
              <!--label="全部分组"-->
              <!--value="全部分组">-->
            <!--</el-option>-->
            <!--<el-option-->
              <!--v-for="(item,index) in selectList"-->
              <!--:label="item.label"-->
              <!--:value="item.value"-->
              <!--:key="item.index">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</div>-->
      </div>
<!--       <draggable v-model="list"
                 @start="drag=true"
                 @end="drag=false"> -->
                 <div>
         <div class="card-box" v-for="(item, index) in groupList" :key="index">
           <header class="card-name">
             {{item.label}}
           </header>
           <!-- <draggable v-model="item.children" @start="drag=true" @end="drag=false"> -->
              <!--<router-link tag="div" :to="{path:child.path,query:{url: child.url}}" v-for="(child, index) in item.children" :key="index" style="text-align:center">-->
               <el-tile v-for="(child, index) in item.children"
                        :title="child.label"
                        size="sm"
                        class="tile"
                        @click.native="jumpRoute(child.path)"
                        :cardStyle="{cursor: 'pointer',width: '170px', height: '130px', fontSize: '16px',color: 'black' }">
                  <div class="" slot="media">
                     <!--<img src="../../assets/images/1.png" style="" alt="" />-->
                    <i :class="child.appIcon" class="appIcon"></i>
                  </div>
               </el-tile>
             <!--</router-link>-->
           <!-- </draggable> -->
         </div>
         </div>
      <!-- </draggable> -->
    </div>
</template>

<script>
// import 'echarts/lib/chart/bar';
// import 'echarts/lib/component/tooltip';
import draggable from 'vuedraggable';

export default {
  data() {
    return {
      list: [],                       //  领域分组选择框
      groupList: [],                  //  二次菜单
      selectList: [],                 //  小应用分组
      allList: [],                    //  全部应用
      arr: [],                        //  小应用选择框
      value: '全部领域',
      groupValue: '选择分组',
      routeName: null,
      listChildren: null,
    };
  },
  props:['menuList'],
  components: {
    draggable
  },
  methods: {
    request(){
//      const vm = this;
//      const path = this.$route.path;
//      const name = path.substring(1);
//      this.routeName = name;
//      this.list = this.menuList;
//       vm.list = [];
//       if(false&&localStorage.getItem(name)){
//         vm.list = JSON.parse(localStorage.getItem(name));
//       }else{
//         $.ajax({
//           type: 'get',
//           dataType: 'json',
//           url: 'static/data.json',
//           success(re){
//             vm.list = re[name];
//             this.list = vm.list;
//             localStorage.setItem(name, JSON.stringify(this.list));
//           }
//         });
//       }

    },
    requestMenu(){
      this.value = '全部领域';
      this.groupList = [];
      this.selectList = [];
      this.arr = [];
      this.allList = [];
      const path = this.$route.path;
      const name = path.substring(1);
      var  url;
      var type;
      if (this.$route.path.indexOf('appArea') > 0) {
        url = window.ctxs.ap + '/appMGT/appCenter/allList?showway=apparea&areaId=&groupId=';
        type = 'apparea';
      } else if (this.$route.path === '/sysmgr') {
        url = window.ctxs.ap + '/appMGT/appCenter/allList?showway=sysarea&areaId=&groupId=';
        type = 'sysarea';
      }
//        const url = '/wbalone/appMGT/appCenter/list?showway=sysarea&areaId=&groupId=';
        // url = './static/apparea.json';
      window[type] = window[type] || {};
      if (window[type].list && window[type].groupList){
          this.list = window[type].list;
          this.groupList = window[type].groupList;
          return;
        }
        const self = this;
        this.$http({
          url: url,
          method: 'get'
        }).then((data) => {
          if(data.data.msg === 'success'){
            self.list = data.data.data;
            for (let i = 0; i < self.list.length; i++) {
              for (let j = 0; j < self.list[i].children.length; j++) {
                self.allList.push(self.list[i].children[j]);
              }
            }
            self.groupList = self.allList;
            window[type].list = self.list;
            window[type].allList = self.allList;
            /* if(self.$route.path.indexOf('appArea') > 0) {
              // 从路由的path中截取最后的数字作为数组下标(从0开始)
              const index = parseInt(self.$route.path.split('_')[1], 10);
              const area = self.list[index].label;  // 根据下标找到对应菜单的label
              self.change(area);  // 切换到相应领域
            } */
            if(self.$route.path === 'appArea') {
              self.change("全部领域");
            }

            localStorage.setItem(name, JSON.stringify(this.groupList));
          }
        });
      // });   get login
    },
    change(value){
      for (let i = 0; i < this.list.length; i++) {
        if (value === this.list[i].label){
          this.groupList = this.list[i].children;
          this.selectList = this.list[i].children;
        }
      }
      if (value === '全部领域') {
        this.groupList = this.allList;
      }
      const groupValue = $('body').data('finLease_groupValue'); // 读取存储的groupValue，实现返回首页分组回显
      if(groupValue) {
        this.groupValue = groupValue;
      } else {
        this.groupValue = '全部分组';
      }
    },
    changeGroup(groupValue){
      this.arr = [];
      for (let i = 0; i < this.selectList.length; i++) {
        if (groupValue !== '') {
          if(groupValue === '全部分组'){
            this.arr.push(this.selectList[i]);
          } else if (groupValue === this.selectList[i].label) {
            this.arr.push(this.selectList[i]);
          }
          this.groupList = this.arr;
          $('body').data('finLease_groupValue', groupValue); // 存储groupValue
        }
      }
    },
    opentab(child){
      const path = child.path;
      this.$router.push({ path, query: { url: child.url } });
    },
    jumpRoute(e){
      var tmp;
      if(e.indexOf("http://") !== -1){
        tmp= '/third?url='+e;
      }else{
        tmp=e;
      }
      this.$router.push(tmp);
    }
  },
   watch: {
     $route: 'requestMenu',
//     list: {
//       handler(){
//         localStorage.setItem(this.$route.name, JSON.stringify(this.list));
//       },
//       deep: true
//     }
   },
  created(){
//    this.request();
    $('#main-right').attr('is-reload','');
    //隐藏组织结构
    $('#main-right').find('div#organization_page').css('display','none');
    this.requestMenu();
  }
};
</script>

<style>
/*  .echarts {
    width: 400px!important;
    height: 400px!important;
  }*/

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
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
  .card-name {
    background: #eeeff1;
    line-height: 15px;
    font-size: 14px;
    color: #666;
    position: relative;
    display: block;
    padding-left: 30px;
    box-shadow: none;
    border-bottom: 1px solid #eee;
  }
  .card-box {
    /* margin: 0 auto; */
    position: relative;
    z-index: 0;
    overflow: hidden;
    box-sizing: border-box;
    background: #eeeff1;
  }
  .tile{
    margin:20px 30px;
  }
  .tile:hover {
    border: 1px solid #6bcaea;
    cursor: pointer;
    background-color: #e9f7fc;
  }
  .card-title {
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: 20px;
  }
  .appIcon.iconfont {
    line-height: 40px;
    color: #9adfef;
    font-size: 50px;
    display: inline-block;
    width: 50px;
    height: 54px;
    margin-top: 10px;
  }
  p.appTitle{
    font-size: 18px;
    font-weight: 400;
    line-height: 30px;
    margin: 20px 30px 0;
  }
</style>
 No newline at end of file
