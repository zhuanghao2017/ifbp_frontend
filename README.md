## 介绍

本仓库为与ap-fe-optimze配套的项目工程模板。

## 文件说明

```
│  devlogin.html // 开发时登陆页面
│  fis-conf.js // fis3配置
│  index.html // 首页
│  package.json // 项目配置
│  README.md // 说明文件
│  
├─build
│      add-route.js // 将src/apps下的路由信息合并至src/router/apps-route.js中
│      build.js // 产出dist目录
│      dev-server.js // 开发启动服务
│      webpack.base.conf.js // webpack基础配置
│      webpack.dev.conf.js // webpack开发配置
├─config  // 配置文件
│      
├─legacy // 静态资源目录
│      
└─src  
    └─apps // 项目开发时修改的目录
       │      
       └─assets // 项目静态资源文件，图片、josn文件等，直接放入dist
       │      
       └─common // 项目公共资源，公共的js、vue组件等，进行打包后合并放入dist/包名/common/index.js
       │      
       └─pages // 项目功能节点
          │
          └─*** // 功能节点目录
              │
              └─index.js  // 功能节点下的路由信息
              │
              └─mockdemo.js  // 开发时mock数据，产出代码前需要将此文件的引用去掉
              │
              └─src  // 功能节点下的vue文件
                    BjBrokaccDetailDetail.vue
                    BjBrokaccDetailEdit.vue
                    BjBrokaccDetailList.vue
```


#### 注意点：

- 项目开发时仅需要修改src/apps目录，其他内容理论不需要修改，但是开发相关的配置可适当调整
- 项目开发时要将src/apps/assets、src/apps/common、src/apps/pages目录清空，根据实际情况来添加对应内容
- 对于项目开发时的公共css，建议放到src/apps/common/css/index.css中进行维护，同时在src/App.vue中添加引用`import './apps/common/css/index.css';`。线上环境通过平台机制会将common中的内容进行加载，不许额外处理
- 引用图片资源时在路径增加后缀`?__inline`，方便资源引用
- pages目录下，index.js只能用于定义路由信息，并且index.js中路由需要的vue文件需放入同级src目录下，其他依赖文件可随意存放。此设置是为了保证最终产出文件的路由配置与产出模块名称保持一致
- 以下文件必须修改
  - package.json
    - name：需要与ap-fe-optimze工程src/App.vue文件中请求(window.ctxs.ap + '/appMGT/appCenter/allList?showway=apparea&areaId=&groupId=')返回模块的areaKey值保持一致

## 开发说明

由于次工程中已包含平台工程的必须内容，因此前端开发时仅需要启动本工程及可开发调试。

### 修改config.js

按照实际情况修改proxyList下平台服务以及后台服务的地址及url的匹配规则。

### 启动服务

可通过以下方式启动服务

```
$ gulp
```

或者

```
npm run dev
```


### 线上部署

将产出的dist目录进行部署，并且保证线上服务可通过下面的地址找到对应文件

ip + port + '/ifbp-fe/config.js'
