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
      isLoginTaobao: false,
      dialogVisible: false,
      // 忘记密码模块
      phoneNum: '',
      code: '',
      pwd: '',
      rePwd: '',
      time: 60, // 倒计时
      timeFlag: false, // 是否显示倒计时
      codeName: '获取验证码',
      taobaoLoading: false,
      timer: null, // 定时器
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
    // 点击忘记密码
    forget() {
      this.dialogVisible = true;
    },
    // 注册
    forgetPwd() {
      if (!this.phoneNum) {
        this.$notify('手机号不能为空', 'warning', 'warning');
      } else if (!this.code) {
        this.$notify('验证码不能为空', 'warning', 'warning');
      } else if (!this.pwd) {
        this.$notify('密码不能为空', 'warning', 'warning');
      } else if (this.pwd !== this.rePwd) {
        this.$notify('密码不一致', 'warning', 'warning');
      } else {
        this.$axios.post(this.$api.forget, {
          phone: this.phoneNum,
          type: 2,
          code: this.code,
          password: this.pwd,
        }).then(() => {
          this.dialogVisible = false;
          this.$notify('密码修改成功', 'success', 'success');
        });
      }
    },
    // 获取验证码
    getCode() {
      if (this.phoneNum) {
        const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (myreg.test(this.phoneNum)) {
          this.countDown();
          this.$axios.post(this.$api.code, {
            phone: this.phoneNum,
            type: 2,
          }).then(() => {
            console.log('验证码获取成功');
          });
        } else {
          this.$notify('手机号格式错误', 'warning', 'warning');
        }
      } else {
        this.$notify('请先填写手机号', 'warning', 'warning');
      }
    },
    // 倒计时
    countDown() {
      this.timeFlag = true;
      const tm = setInterval(() => {
        this.time = this.time - 1;
        if (this.time === 0) {
          clearInterval(tm);
          this.timeFlag = false;
          this.codeName = '重新获取';
          this.time = 60;
        }
      }, 1000);
    },
  },
};
</script>
