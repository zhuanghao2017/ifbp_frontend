// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
// import VueECharts from 'vue-echarts/components/ECharts.vue';
import router from './router';
import store from './store.js';
import 'babel-polyfill';
// import axios from 'axios';
import axios from 'httpIntercept';
import "./assets/css/fn-common.css";
import "./assets/css/element-reset.css";
Vue.prototype.$http = axios;
window.org = false;
window.env = 'production'; // dev to enable debug message
window.VERSION = '3.0.1';
window.ctxs = {
  ap: '/wbalone',
  fin: '/fin-ifbp-base'
};

$('#main-right').attr('is-reload', '');
// Vue.component('chart', VueECharts);

/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  if (to.path === window.notFoundPath) {
    window.notFoundPath = null;
  }
  if (to.matched.length === 0) {
    // 如果是未注册的路由
    window.notFoundPath = to.fullPath;
    if (window.appRouterArr && window.appRouterArr.length > 0) {
      for (var i = 0; i < window.appRouterArr.length; i++) {
        if (window.appRouterArr[i].getMatchedComponents(notFoundPath).length > 0) {
          window.appRouterArr[i].push(window.notFoundPath);
        }
      }
    }
    next(true);
  }
  if (to.path === '/' || to.path === '/index') {
    var cookieObj1 = {};
    var tmp1;
    var list1 = document.cookie.split(';');
    list1.forEach((v) => {
      tmp1 = v.split('=');
      cookieObj1[tmp1[0].trim()] = tmp1[1];
    });
    var roleCode1 = '_A_P_roleCode';
    if (cookieObj1[roleCode1] === 'sys') {
      if (to.path === '/') {
        next(true);
        window.location.hash = '/finindex/finIndex';
      } else {
        next(false);
        window.location.hash = '/finindex/finIndex';
      }
    } else {
      next(true);
      window.location.hash = '/index';
    }
  } else {
    // axios({
    //   method: 'post',
    //   url: window.ctxs.ap + '/appMGT/checkApp',
    //   data: {
    //     appPath: to.path
    //   }
    // }).then((res) => {
    //   if (res.data.status === 1) {
    //     next(true);
    //   } else {
    //     next(false);
    //   }
    // }).catch(() => {
    //   next(false);
    // });
     next(true);
  }


});

var config = require('../config');
var autoLogin = config.dev.autoLogin;
if (autoLogin) {
  var loginname = config.dev.loginname;
  var pwd = config.dev.pwd;
  var d = {
    loginname: loginname,
    pwd: pwd,
    encrypt: "ON"
  };
  $.ajax({
    url: '/wbalone/sso/appLogin',
    data: JSON.stringify(d),
    // data: d,
    type: "post",
    contentType: 'application/json',
    success: function(data) {
      if (data.success === true) {
        new Vue({
          el: '#app',
          router,
          store,
          data: {
            isLogin: false
          },
          template: '<App/>',
          components: {
            App
          },
        });
      } else {
        alert(data.data);
      }
    }
  });
} else {

  new Vue({
    el: '#app',
    router,
    store,
    data: {
      isLogin: false
    },
    template: '<App/>',
    components: {
      App
    },
  });

}
