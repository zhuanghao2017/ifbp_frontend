// 引入公共组件
import Vue from 'vue';
import Router from 'vue-router';
import approute from './apps-route';
// import {tab} from '../../node_modules/ifbp-element/packages/tab';

Router.prototype.go = function() {
  this.isBack = true;
  window.history.go(-1);
};

// 引入组件
import legacy from '../common/legacy.vue';
import index from '../common/Index/index.vue';
import documents from '../common/documents/index.vue';
import maintain from '../common/maintain.vue';
import baseservice from '../common/baseservice/index.vue';
import organization from '../common/organization/organization.vue';
import editOrg from '../common/organization/edit.vue';
import addOrg from '../common/organization/add.vue';
import addDept from '../common/organization/addDept.vue';
import editDept from '../common/organization/editDept.vue';

// 移动适配的员工信息修改
// import staffInfo from '../common/staffInfo/staff-info.vue';
// import staffdetail from '../common/staffInfo/staff-detail.vue';
// import staffadd from '../common/staffInfo/staff-add.vue';
// import staffChildAdd from '../common/staffInfo/staff-child-add.vue';
import staffInfo from '../common/staffInfo/staff-info.vue';
import staffdetail from '../common/staffInfo/staff-detail.vue';
import staffadd from '../common/staffInfo/staff-add.vue';

import userInfo from '../common/userInfo/user-info.vue';
import userdetail from '../common/userInfo/user-detail.vue';
import useradd from '../common/userInfo/user-add.vue';

//数表典型页面
import treeDemoInfo from '../common/treeDemo/treeDemo-info.vue';
import treeDemodetail from '../common/treeDemo/treeDemo-detail.vue';
import treeDemoadd from '../common/treeDemo/treeDemo-add.vue';
import treeDemoChildAdd from '../common/treeDemo/treeDemo-child-add.vue';


import parameterList from '../common/parameterDefinition/parameterList.vue';
import tenementList from '../common/parameterDefinition/tenementList.vue';
import approve from '../common/approve/approve.vue';
// import parameterize from '../common/parameterDefinition/parameterize.vue';


import thirdApp from '../common/thirdApp.vue';
import industryInfo from '../common/industry/industry-info.vue';

import account from '../common/tenant/account.vue';
import orderList from '../common/tenant/order-list.vue';
import initGroup from '../common/Index/initGroup.vue';
import apps from '../common/tenant/apps.vue';
import messageCenter from '../common/Index/messageCenter.vue';
import messageDetail from '../common/Index/messageDetail.vue';

import crmList from '../common/crm/crmList.vue';
import personalInfo from '../common/crm/personalInfo.vue';
import enterpriseInfo from '../common/crm/enterpriseInfo.vue';
import personalDetail from '../common/crm/personalDetail.vue';

import insCrmList from '../common/insCrm/crmList.vue';
import insPersonalInfo from '../common/insCrm/personalInfo.vue';
import insEnterpriseInfo from '../common/insCrm/enterpriseInfo.vue';

import pettyloanCrmList from '../common/pettyloanCrm/crmList.vue';
import pettyloanPersonalInfo from '../common/pettyloanCrm/personalInfo.vue';
import pettyloanEnterpriseInfo from '../common/pettyloanCrm/enterpriseInfo.vue';

import agencyList from '../common/dealer/agencyList.vue';
import agency from '../common/dealer/agency.vue';

import defDoc from '../common/defdoc/defdoc.vue';
import defdocDetail from '../common/defdoc/defdocDetail.vue';

import dataAuthority from '../common/dataAuthority/dataAuthority.vue';

Vue.use(Router);
export default new Router({
  mode: 'hash',
  linkActiveClass: "active",
  routes: [{
      path: "/initGroup",
      component: initGroup
    },
    {
      path: '/maintain',
      component: maintain
    },
    {
      path: '/documents',
      component: documents
    },
    {
      path: '/lgc/:appcode',
      component: legacy
    },
    {
      path: '/',
      component: index
    },
    {
      path: '/ifr/:appcode',
      component: legacy
    },
    {
      path: '/manage/:id',
      component: index
    },
    {
      path: '/index',
      component: index,
    },
    {
      path: '/appArea*',
      component: baseservice
    },
    {
      path: '/sysmgr',
      component: baseservice
    },
    {
      path: '/HR010003',
      component: organization
    },
    // {
    //   path: '/staff',
    //   component: staffInfo,
    //   children: [{
    //       path: '/staff/detail/:id',
    //       component: staffdetail
    //     },
    //     {
    //       path: '/staff/add',
    //       component: staffadd
    //     },
    //     {
    //       path: '/staff/edit/:id',
    //       component: staffadd
    //     },
    //     {
    //       path: '/staff/addRecord',
    //       component: staffChildAdd
    //     },
    //     {
    //       path: '/staff/editRecord/:id',
    //       component: staffChildAdd
    //     }
    //   ]
    // },
    {
      path: '/staff',
      component: staffInfo,
    },
    {
      path: '/staff/detail/:id',
      component: staffdetail
    },
    {
      path: '/staff/add',
      component: staffadd
    },
    {
      path: '/treeDemo',
      component: treeDemoInfo,
      children: [{
          path: '/treeDemo/detail/:id',
          component: treeDemodetail
        },
        {
          path: '/treeDemo/add',
          component: treeDemoadd
        },
        {
          path: '/treeDemo/edit/:id',
          component: treeDemoadd
        },
        {
          path: '/treeDemo/addRecord',
          component: treeDemoChildAdd
        },
        {
          path: '/treeDemo/editRecord/:id',
          component: treeDemoChildAdd
        }
      ]
    },
    {
      path: '/parameterDefinition',
      component: parameterList,
    },
    {
      path: '/tenementList',
      component: tenementList,
    },
    {
      path: '/approve',
      component: approve,
    },
    {
      path: '/userInfo',
      component: userInfo,
    },
    {
      path: '/userInfo/detail/:id',
      component: userdetail,
    },
    {
      path: '/userInfo/add',
      component: useradd,
    },
    {
      path: '/organization/addOrg/:type',
      component: addOrg
    },
    {
      path: '/organization/:id/editOrg/:type',
      component: editOrg
    },
    {
      path: '/organization/addDept/:type',
      component: addDept
    },
    {
      path: '/organization/:id/editDept/:type',
      component: editDept
    },
    {
      path: '/third',
      component: thirdApp
    },
    {
      path: '/industry',
      component: industryInfo
    },
    {
      path: '/account',
      component: account
    },
    {
      path: '/orderList',
      component: orderList
    },
    {
      path: '/myapp',
      component: apps
    },
    {
      path: "/messageCenter",
      component: messageCenter
    },
    {
      path: "/messageDetail/:id",
      component: messageDetail
    },
    {
      path: "/crm/crmList",
      component: crmList
    },
    {
      path: "/crm/personalInfo/:id",
      component: personalInfo
    },
    {
      path: "/crm/enterpriseInfo/:id",
      component: enterpriseInfo
    },
    {
      path: "/crm/personalDetail/:id",
      component: personalDetail
    },
    {
      path: "/insCrm/crmList",
      component: insCrmList
    },
    {
      path: "/insCrm/personalInfo/:id",
      component: insPersonalInfo
    },
    {
      path: "/insCrm/enterpriseInfo/:id",
      component: insEnterpriseInfo
    },
    {
      path: "/pettyloanCrm/crmList",
      component: pettyloanCrmList
    },
    {
      path: "/pettyloanCrm/personalInfo/:id",
      component: pettyloanPersonalInfo
    },
    {
      path: "/pettyloanCrm/enterpriseInfo/:id",
      component: pettyloanEnterpriseInfo
    },
    {
      path: "/dealer/agencyList",
      component: agencyList
    },
    {
      path: "/dealer/agency/:id",
      component: agency
    },{
      path: "/defDoc",
      component: defDoc
    },
    {
      path: "/defdoc/detail/:id/:name/:buid",
      component: defdocDetail
    },
    {
      path: "/dataAuthority",
      component: dataAuthority
    }
    ].concat(approute.routes),
  // ]
});
