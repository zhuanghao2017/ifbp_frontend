/**
 * http配置
 */
// 引入axios以及element ui中的loading和message组件
import axios from 'axios';
window.axios = axios;
import SHA256 from 'crypto-js/sha256';
import {Loading, Message} from 'ifbp-element';

var timestamp = '';
var headtoken = '';
var signtoken = '';
var sign = '';
var domain = '/ifbp-uc-web';
var instance = axios.create();

function buildParamStr(param, timestamp, url, signtoken) {
  var vmparam = JSON.parse(JSON.stringify(param));
  vmparam["timestamp"] = timestamp;
  vmparam["url"] = url;
  vmparam["signtoken"] = signtoken;
  var keys = [];
  var paramstr = "";
  for (var paramkey in vmparam) {
    keys.push(paramkey);
  }
  keys.sort();
  for (var i = 0; i < keys.length; i++) {
    var itemkey = keys[i];
    if (typeof(vmparam[itemkey]) === 'object') {
      vmparam[itemkey] = JSON.stringify(vmparam[itemkey]);
    }
    if (i === keys.length - 1) {
      paramstr += itemkey + "=" + vmparam[itemkey];
    } else {
      paramstr += itemkey + "=" + vmparam[itemkey] + "&";
    }
  }
  // console.log(paramstr);
  return paramstr;
}
function bulidSign(paramdata, timestamp, url, signtoken) {
  var paramStr = buildParamStr(paramdata, timestamp, url, signtoken);
  var hash = SHA256(paramStr);
  // console.log(hash.toString());
  return hash.toString();
}
function getToken() {
  return instance({url: domain + '/token/getToken', method: 'get'});
}

// 超时时间
axios.defaults.timeout = 20000;

// http请求拦截器
// 实例化一个axios请求
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// http响应拦截器
axios.interceptors.response.use((res) => {
  if(res.headers.sessionstatus === 'timeout') {
    var url = btoa(window.location.href);
    window.location.href = window.ctxs.ap + "/sso/login.jsp?r=" + url;
  }
  return res;
}, (error) => {
  // console.log(axios.interceptors.response);
  // Message.error({
  //   message: '加载失败'
  // });
  return Promise.reject(error);
});

// export default axiosdummy

// 暂时去掉此功能，待金府升级之后放开
// axios.interceptors.request.use(
//   config => {
//     return getToken().then((res) => {
//       timestamp = res.data.data.timestamp;
//       headtoken = res.data.data.headtoken;
//       signtoken = res.data.data.signtoken;
//
//       config = config ? config : {};
//       config.params = config.params ? config.params : {};
//       config.data = config.data ? config.data : {};
//
//       if (config.method === 'get') {
//         sign = bulidSign(config.params, timestamp, config.url, res.data.data.signtoken);
//       } else if(config.method === 'post') {
//         sign = bulidSign(config.data, timestamp, config.url, res.data.data.signtoken);
//       }
//
//       config.headers.timestamp = timestamp;
//       config.headers.headtoken = headtoken;
//       config.headers.sign = sign;
//       // config.url = domain + config.url;
//       return config;
//     }).catch((res) => {
//       console.log(res);
//     });
//
//     // return Promise.reject(error)
//   }, error => {
//     Message.error({
//       message: '加载超时'
//     });
//     return Promise.reject(error)
//   });

export default axios
