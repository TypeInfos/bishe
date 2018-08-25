import Vue from 'vue';
import Router from 'vue-router';
import NewRegister from '@/page/newRegister/index';
import newLogin from '@/page/newLogin/index';
import rootRadar from '@/page/rootRadar/index';
import forgetPassword from '@/page/forgetPassword/index';
import tempBqsys from '@/page/tempBqsys/index';
import wisdomSearch from '@/page/wisdomSearch/index';
import buy from '@/page/buy/index';
import funcView from '@/page/funcView/index';
import test from '@/components/datePicker/index';
import labelLab from '@/page/labelLab/index';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: rootRadar,
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
      path: '/buy',
      name: 'buy',
      component: buy,
    },
    // {
    //   path: '/test',
    //   name: 'test',
    //   component: test,
    // }
    {
      path: '/labelLab',
      name: 'labelLab',
      component: labelLab,
    },
  ],
});
