<template src="./index.html"></template>
<style lang="less" src="./index.less"></style>
<script>
  export default{
    name:'login',
    data(){
      return{
      active: 0,
      vipName: '',
      vipPwd: '',
      tName: '',
      tPwd: '',
      isEwm: true,
      ewmUrl: '',
      loading: false,
      interval: null,
      isLoginTaobao: false,
      autoLogin:false,
      taobaoLoading: false,
      }
    },
        // 易数账号登录
    ysLogin() {
      this.$axios.post(this.$api.login, {
        loginName: this.vipName,
        password: this.vipPwd,
      }).then(() => {
        const data = document.getElementById('taobao-extension-data').value;
        console.log(data);
        if (data === '{}' || data === '') {
          this.isLoginTaobao = false;
        } else {
          this.isLoginTaobao = true;
        }
        this.active = this.active + 1;
        // this.$notify('登录成功', 'success', 'success');
      });
    },
    // 上一步
    backToLogin() {
      this.active = 0;
      this.taobaoLoading = false;
    },
    // 重置易数账号
    reset() {
      this.vipName = '';
      this.vipPwd = '';
    },
    // 跳转注册
    goRegister() {
      this.$router.push('/register');
      window.location.reload();
    },
    // 完成登录
    finished() {
      this.$router.push('/tool');
      window.location.reload();
    },
    // 跳转直通车登录
    loginToTaobao() {
      this.taobaoLoading = true;
      this.watchLogin();
      window.open('http://zhitongche.taobao.com/');
    },
    // 开启监听，是否已登录
    watchLogin() {
      this.timer = setInterval(() => {
        const data = document.getElementById('taobao-extension-data').value;
        if (data === '{}' || data === '') {
          this.isLoginTaobao = false;
        } else {
          this.isLoginTaobao = true;
          clearInterval(this.timer);
        }
      }, 500);
    },
  }
</script>



