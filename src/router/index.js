import Vue from 'vue';
import Router from 'vue-router';
import Tool from '@/page/tool/index';
import Login from '@/page/login/index';
import Register from '@/page/register/index';
import MyTest from '@/page/mytest/index'
import NewRegister from '@/page/newRegister/index'
import inputTest from '@/components/inputComponent'
import newLogin from '@/page/newLogin/index'
import rootRadar from '@/page/rootRadar/index'
import forgetPassword from '@/page/forgetPassword/index'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Tool,
    },
    {
      path: '/tool',
      name: 'Tool',
      component: Tool,
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
      path:'/test',
      name:'test',
      component:MyTest
    },
    {
      path: '/testInput',
      name: 'testInput',
      component: inputTest,
    },
    {
      path: '/rootRadar',
      name: 'rootRadar',
      component: rootRadar,
    },{
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: forgetPassword,
    }
  ],
});
