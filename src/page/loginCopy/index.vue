<template src="./index.html"></template>
<style lang="less" src="./index.less"></style>
<script>

export default {
  name: 'Login',
  data() {
    return {
      active: 0,
      vipName: '',
      vipPwd: '',
      tName: '',
      tPwd: '',
      isEwm: true,
      ewmUrl: '',
      loading: false,
      interval: null,
    };
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    // 易数账号登录
    ysLogin() {
      this.$axios.post(this.$api.login, {
        loginName: this.vipName,
        password: this.vipPwd,
      }).then(() => {
        this.active = this.active + 1;
        this.$notify('登录成功', 'success', 'success');
        this.loginQr();
      });
    },
    // 重置易数账号
    reset() {
      this.vipName = '';
      this.vipPwd = '';
    },
    // 切换淘宝登录方式
    changeLogin(val) {
      this.isEwm = val;
    },
    // 淘宝登录
    tbLogin() {
      this.$axios.post(this.$api.taobaoLogin, {
        loginName: this.tName,
        password: this.tPwd,
      }).then(() => {
        this.active = this.active + 1;
        this.$notify('登录成功', 'success', 'success');
        this.$router.push('/tool');
        window.location.reload();
      });
    },
    // 返回上一步
    back() {
      this.active = 0;
    },
    // 易数登录之后立马请求loginQr，成功后再掉getQrCode
    loginQr() {
      this.$axios.get(this.$api.loginQr).then(() => {
        this.getQrCode();
      });
    },
    // 获取淘宝二维码
    getQrCode() {
      this.loading = true;
      setTimeout(() => {
        this.$axios.get(this.$api.getQrCode).then((res) => {
          this.loading = false;
          if (res.message === 'SUCCESS') {
            this.ewmUrl = res.data;
            this.interval = setInterval(() => {
              this.checkLogin();
            }, 1000);
          } else if (res.message === 'REFRESH') {
            this.getQrCode();
          } else if (res.message === 'FAILED') {
            this.loginQr();
          }
        }).catch(() => {
          this.loading = false;
        });
      }, 1000);
    },
    // 检测二维码是否登录成功
    checkLogin() {
      this.$axios.get(this.$api.checkLogin).then((res) => {
        if (res.message === 'SUCCESS') {
          clearInterval(this.interval);
          this.active = this.active + 1;
          this.$notify('登录成功', 'success', 'success');
          this.$router.push('/tool');
          window.location.reload();
        } else if (res.message === 'FAILED') {
          clearInterval(this.interval);
          this.$notify('登录失败', 'warning', 'warning');
          this.ewmUrl = '';
        } else if (res.message === 'TIMEOUT') {
          clearInterval(this.interval);
          this.$notify('二维码过期', 'warning', 'warning');
          this.ewmUrl = '';
        }
      }).catch((msg) => {
        if (msg === 'FAILED') {
          clearInterval(this.interval);
          this.ewmUrl = '';
        }
      });
    },
  },
};
</script>
