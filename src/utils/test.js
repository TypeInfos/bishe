exports.install = function (Vue, options) {
  Vue.prototype.changeData = function (){
    alert('执行成功');
  };

  Vue.prototype.name = 'prototype'

  Vue.myGlobalMethod = function () {
    console.log('globla')
  }
};

// 调用 =》 在vue的method中 用 this.changeData()

// 调用 =》 在vue中用Vue.myGlobalMethod()调用


