// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

//demo服务
var proxyDemoHost = 'http://localhost:8090';


// var baseHost = 'http://10.4.102.57:38081';
// var baseHost = 'http://testap.imfbp.com';
var baseHost = 'https://pre.ap.imfbp.com';

// var baseHost = 'http://10.3.1.141';

//应用平台服务地址
var proxyAPHost = baseHost;
//portal集成服务地址
var proxyIntegrationHost = baseHost;
//主数据服务地址
var proxyBDHost = baseHost;
//系统管理服务地址
var proxySMHost = baseHost;
//UI模板服务地址
var proxyUiTemplateHost = baseHost;
//业务日志服务地址
var proxyBusilogHost = baseHost;
//编码规则服务地址
var proxyBillCodeHost = baseHost;
//任务调度服务地址
var proxyDispatchHost = baseHost;
//安全日志服务地址
var proxySecurityLogHost = baseHost;
//流程中间件地址
var proxyBpmHost = baseHost;
//消息服务地址
var proxyMessageHost = baseHost;
//云市场地址
// var proxyYSC = 'http://10.4.102.35:8331';

// var proxyToken = 'http://10.4.102.35:8551';
var  proxyYSC = 'http://testap.imfbp.com'; // 金府环境
var proxyToken = 'http://testap.imfbp.com';// 金府环境

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/wbalone/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8082,
    devLoginUrl:proxyAPHost + '/wbalone/sso/login?tenantId=ifbp-ap-mv-wbuser&loginname=',

    autoOpenBrowser: true,
    // autoOpenUrl: '/wbalone/devlogin.html',
    // autoLogin:false,
    autoOpenUrl: '/wbalone/index.html',
    autoLogin: true,
    loginname: 'yanglqa',
    pwd: '123456',
    assetsSubDirectory: 'static',
    assetsPublicPath: '/wbalone',
    proxyTable: {
        // '/ifbp-app-sm/**':{target: proxyDemoHost,secure: false},
      '/fin-ifbp-base/**':{target: proxyAPHost,secure: false},
    	'/ifbp-demo-user/**':{target: proxyDemoHost,secure: false},
        '/wbalone/deptOrg/**': {target:  proxyAPHost,secure: false,},
        '/wbalone/sso/**':{target: proxyAPHost,secure: false},
        '/wbalone/logout':{target: proxyAPHost,secure: false},
        '/wbalone/account/**':{target: proxyAPHost,secure: false},
        '/wbalone/wbuserrole/**':{target:  proxyAPHost,secure: false},
        '/wbalone/open/**':{target:  proxyAPHost,secure: false,},
        '/wbalone/wbalyout/**': {target:  proxyAPHost ,secure: false,},
        '/wbalone/auth/**': {target:  proxyAPHost ,secure: false,},
        '/wbalone/appMGT/**': {target: proxyAPHost,secure: false,},
        '/wbalone/label/**': {target: proxyAPHost,secure: false,},
        '/wbalone/appArea/**': {target: proxyAPHost,secure: false,},
        '/wbalone/appmenumgr/**': {target: proxyAPHost,secure: false,},
        '/integration/**': {target: proxyIntegrationHost,secure: false,},
         '/wbalone/roleDesign/**': {target: proxyAPHost,secure: false,},
        '/uui/**': {target: proxyAPHost,secure: false,},
        '/wbalone/roleMGT/**': {target: proxyAPHost,secure: false,},
        '/wbalone/userMGT/**': {target: proxyAPHost,secure: false,},
        '/wbalone/security/**': {target: proxyAPHost,secure: false,},
        '/wbalone/rolemgr/**': {target: proxyAPHost,secure: false,},
        '/wbalone/organizationRef/**': {target: proxyAPHost,secure: false,},
        '/wbalone/wbUserRef/**': {target: proxyAPHost,secure: false,},
        '/wbalone/widgetQuery/**': {target: proxyAPHost,secure: false,},
        '/wbalone/data:layout/**': {target: proxyAPHost,secure: false,},
        // 工作台设计
        '/wbalone/data:widget/**': {target: proxyAPHost,secure: false,},
        '/wbalone/page/**': {target: proxyAPHost,secure: false,},
        '/busilog': {target: proxyBusilogHost,secure: false,},
        '/securitylog': {target: proxySecurityLogHost,secure: false,},
        '/ifbp-eiap-bpm-service/**': {target: proxyBpmHost,secure: false,},
//        '/iuap-saas-billcode-service/**': {target: proxyBillCodeHost,secure: false,},
        '/billcode/**': {target: proxyBillCodeHost,secure: false,},
        //布局管理
        '/wbalone/layout/**': {target: proxyAPHost,secure: false,},
        //小应用管理
        '/wbalone/eventbus/**': {target: proxyAPHost,secure: false,},

//        '/wbalone/widget/**': {
//            target: proxyHost3,
//            secure: false,
//        },
        //消息管理问题最后一个
        '/iuap-saas-message-center/**': {target: proxyMessageHost,secure: false,},
        '/iuap-saas-dispatch-service': {target: proxyDispatchHost,secure: false,},
        '/wbalone/passwordPolicy/**': {target: proxyAPHost,secure: false,},
        //业务单元
        '/wbalone/organization/**': {target: proxyAPHost,secure: false,},
        '/ifbp-app-bd/**': {target: proxyBDHost,secure: false,},
        '/ifbp-app-sm/**': {target: proxySMHost,secure: false,},
        //小部件授权保存
        '/wbalone/widgetAuth/**': {target: proxyAPHost,secure: false,},
        // 人员增删改查
        '/wbalone/user/**': {target: proxyAPHost,secure: false,},
        '/wbalone/userGroupRef/**': {target: proxyAPHost,secure: false,},
        '/wbalone/personTypeRef/**': {target: proxyAPHost,secure: false,},
        '/wbalone/orgdeptrefdata/**': {target: proxyAPHost,secure: false,},
        '/oss/**': {target: proxyAPHost,secure: false,},
        '/ifbp-bop-web/**': {target: proxyYSC,secure: false,},
        '/user/getBopUserAccount': {target: proxyYSC,secure: false,},
        '/ifbp-uc-web/token/**': {target: proxyToken,secure: false},
        // '/ifbp-app-sm-defdoc-web/**': { target: 'http://172.27.35.1:8080', secure: false },
        // '/uitemplate_web/**': { target: 'http://testap.imfbp.com', secure: false},
        // '/ifbp-app-sm-infoset-web/**': { target: 'http://172.27.35.1:8080', secure: false }
        '/ifbp-app-sm-defdoc-web/**': { target: proxyAPHost, secure: false },
        '/uitemplate_web/**': { target: proxyAPHost, secure: false},
        '/ifbp-app-sm-infoset-web/**': { target: proxyAPHost, secure: false },
        '/imfbp-ins-web/**': { target: 'http://dev-test.iservice.imfbp.com', secure: false },

    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
