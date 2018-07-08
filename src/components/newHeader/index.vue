<template src="./index.html"></template>
<style lang="less" src="./index.less"></style>
<script>
  export default{
    name:'newHeader',
    data(){
      return{
        isLogin:false,
      }
    },
    methods:{
      logoClick(){
        // 开发阶段先定义为刷新当前页面，上线后定位到首页。
       location.reload();
      },

      resetActiveIndex(type) {
      if (type === 0) {
        this.$router.push('/login');
      } else {
        this.$router.push('/register');
      }
      window.location.reload();
    },
      getTaobaoData() {
      const data = document.getElementById('taobao-extension-data').value;
      console.log('taobao-extension-data', data);
    },
    }
  }
</script>
