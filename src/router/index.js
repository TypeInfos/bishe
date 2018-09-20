import Vue from 'vue';
import Router from 'vue-router';
import NewRegister from '@/page/newRegister/index'
import newLogin from '@/page/newLogin/index'
import rootRadar from '@/page/rootRadar/index'
import forgetPassword from '@/page/forgetPassword/index'
import tempBqsys from '@/page/tempBqsys/index'
import wisdomSearch from '@/page/wisdomSearch/index'
import buy1 from '@/page/buy1/index'
import buy2 from '@/page/buy2/index'
import myOrder from '@/page/myOrder/index'
import funcView from '@/page/funcView/index'
import test from '@/components/datePicker/index';
import labelLab from '@/page/labelLab/index'
import shenqiHigh from '@/page/shenqiHigh'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: newLogin,
    },
    {
      path: '/login',
      name: 'newLogin',
      component: newLogin,
    },
    {
      path: '/register',
      name: 'NewRegister',
      component: NewRegister,
    },
    {
      path: '/rootRadar',
      name: 'rootRadar',
      component: rootRadar,
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: forgetPassword,
    },
    {
      path: '/tempBqsys',
      name: 'tempBqsys',
      component: tempBqsys,
    },
    {
      path: '/wisdomSearch',
      name: 'wisdomSearch',
      component: wisdomSearch,
    },
    {
      path: '/funcView',
      name: 'funcView',
      component: funcView,
    },
    {
      path: '/buy1',
      name: 'buy1',
      component: buy1,
    },
    {
      path: '/buy2',
      name: 'buy2',
      component: buy2,
    },
    {
      path: '/myOrder',
      name: 'myOrder',
      component: myOrder,
    },
    {
      path: '/test',
      name: 'test',
      component: test,
    },
    {
      path: '/labelLab',
      name: 'labelLab',
      // component: labelLab,
      component: wisdomSearch,
    },
    {
      path: '/guide',
      name: 'GuidePage',
      component: () => import('@/page/guidePages/temp'),
    },
    {
      path: '/download',
      name: 'Download',
      component: () => import('@/page/download'),
    },
    {
      path: '/help',
      name: 'Help',
      component: wisdomSearch,
      // component: () => import('@/page/help'),
    },
    {
      path: '/shenqiHigh',
      name: 'shenqiHigh',
      component: shenqiHigh,
    },
  ],
});
