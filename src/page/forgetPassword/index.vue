<template src="./index.html">

</template>

<style lang="less" src="./index.less">

</style>

<script>
  export default {
    name: 'forgetPassword',
    data() {
      return {
        phoneNum: '', //手机号码
        code: '', // 验证码
        pwd: '', //密码
        rePwd: '', //确认密码
        time: 60, // 倒计时
        timeFlag: false, // 是否显示倒计时
        codeName: '获取验证码',
        timer: null, // 定时器
      }
    },
    methods: {
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
      // 修改密码
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
            this.$notify('密码修改成功', 'success', 'success');
          });
        }
      },

    }
  }
</script>
