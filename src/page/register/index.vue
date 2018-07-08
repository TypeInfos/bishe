<template src="./index.html"></template>
<style lang="less" src="./index.less"></style>
<script>

export default {
  name: 'Register',
  data() {
    return {
      active: 0,
      phoneNum: '', // 手机号
      code: '', // 验证码
      pwd: '', // 密码
      rePwd: '', // 确认密码
      wechart: '', // 微信号
      time: 60, // 倒计时
      timeFlag: false, // 是否显示倒计时
      codeName: '获取验证码',
      isLoginTaobao: false, // 是否登录淘宝
      taobaoName: '', // 淘宝店铺名
      taobaoData: {},
      taobaoLoading: false,
      timer: null,
    };
  },
  mounted() {
  },
  methods: {
    // 注册
    register() {
      if (!this.phoneNum) {
        this.$notify('手机号不能为空', 'warning', 'warning');
      } else if (!this.code) {
        this.$notify('验证码不能为空', 'warning', 'warning');
      } else if (!this.pwd) {
        this.$notify('密码不能为空', 'warning', 'warning');
      } else if (this.pwd !== this.rePwd) {
        this.$notify('密码不一致', 'warning', 'warning');
      } else if (!this.wechart) {
        this.$notify('负责人微信号不能为空', 'warning', 'warning');
      } else {
        this.$axios.post(this.$api.register, {
          phone: this.phoneNum,
          type: 1,
          code: this.code,
          password: this.pwd,
          wechat: this.wechart,
        }).then(() => {
          const data = document.getElementById('taobao-extension-data').value;
          this.taobaoData = JSON.parse(data);
          if (data === '{}' || data === '') {
            this.isLoginTaobao = false;
          } else {
            this.isLoginTaobao = true;
            this.taobaoName = this.taobaoData.nickName;
          }
          this.$notify('注册成功', 'success', 'success');
          this.active = 1;
        });
      }
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
          this.taobaoName = JSON.parse(data).nickName;
          clearInterval(this.timer);
        }
      }, 500);
    },
    // 获取验证码
    getCode() {
      if (this.phoneNum) {
        const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (myreg.test(this.phoneNum)) {
          this.countDown();
          this.$axios.post(this.$api.code, {
            phone: this.phoneNum,
            type: 1,
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
    // 跳转登录
    login() {
      this.$router.push('/login');
      window.location.reload();
    },
    // 绑定淘宝店铺名
    bindTaobao() {
      if (this.taobaoName) {
        const params = {
          password: this.pwd,
          phone: this.phoneNum,
          shopName: this.taobaoName,
        };
        this.$axios.post(this.$api.bind, params).then(() => {
          this.active = 2;
          this.$notify('绑定成功', 'success', 'success');
        });
      } else {
        this.$notify('请填写店铺名称', 'warning', 'warning');
      }
    },
    // 返回上一步
    backUp() {
      this.active = 0;
      this.taobaoLoading = false;
    },
    // 最后完成跳转tool页面
    finished() {
      this.$router.push('/tool');
      window.location.reload();
    },
  },
};
</script>
