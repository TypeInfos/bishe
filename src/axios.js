import axios from 'axios';
import { Message } from 'element-ui';
import qs from 'qs';
import blacklist from './blacklist';
import router from './router';

const service = axios.create({
  withCredentials: true, // 允许跨域
});

/* 防止重复提交，利用axios的cancelToken */
const pending = []; // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const CancelToken = axios.CancelToken;
const removePending = (config) => {
  for (const p in pending) {
    if (pending[p].u === `${config.url}&${config.method}`) { // 当当前请求在数组中存在时执行函数体
      pending[p].f(); // 执行取消操作
      pending.splice(p, 1); // 把这条记录从数组中移除
    }
  }
};

/* request拦截器 */
service.interceptors.request.use((config) => {
  removePending(config); // 在一个ajax发送前执行一下取消操作
  config.cancelToken = new CancelToken((c) => {
    // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
    pending.push({ u: `${config.url}&${config.method}`, f: c });
  });
  return config;
}, (error) => {
  console.log(`【request】${error}`);
  return Promise.reject(error);
});

/* respone拦截器 */
service.interceptors.response.use(
  (response) => {
    removePending(response.config); // 在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
    if (response.data.code === 'NACK') {
      // 如果是黑名单中的地址，则不弹框提示错误信息
      let flag = false;
      blacklist.forEach((item) => {
        if (item === response.config.url) {
          flag = true;
        }
      });
      if (!flag) {
        Message({
          message: response.data.message,
          title: 'warning',
          showClose: true,
          type: 'warning',
          duration: 4000, // 显示时长  单位s
          customClass: 'message-g-zindex'
        });
      }
      return Promise.reject(response.data.message);
    } else if (response.data.code === 'UNAUTHORIZED') {
      router.push('/login');
      window.location.reload();
    }
    return response.data;
  },
  // (error) => {
  //   if (error.message !== undefined && error.request !== undefined) {
  //     Message({
  //       message: '服务器未知错误',
  //       title: 'error',
  //       type: 'error',
  //       showClose: true,
  //       duration: 4000, // 显示时长  单位s
  //       customClass: 'message-g-zindex'
  //     });
  //   }
  //   return Promise.reject(error);
  // },
);

service.defaults.paramsSerializer = params => qs.stringify(params, { indices: false });

export default service;
