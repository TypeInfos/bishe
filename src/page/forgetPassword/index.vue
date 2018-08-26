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
        // timer: null, // 定时器
        //gjfAdd起始
        showSecretError1: false,
        showSecretError2: false,
        showreSecretError: false,
      }
    },
    methods: {
      //gjfAdd
      secretError1() {
        if (this.pwd.length < 8) {
          this.showSecretError1 = true;
        }
      },
      secretError2() {
        if (this.rePwd.length < 8) {
          this.showSecretError2 = true;
        }
        if (this.rePwd !== this.pwd) {
          this.showreSecretError = true;
        }
      },
      hideSecretError1() {
        this.showSecretError1 = false;
        if (this.rePwd === this.pwd) {
          this.showreSecretError = false;
        }
      },
      hideSecretError2() {
        this.showSecretError2 = false;
        this.showreSecretError = false;
        if (this.rePwd === this.pwd) {
          this.showreSecretError = false;
        }
      },
      //gjfAdd结束
      resetData() {
        this.phoneNum = '';
        this.code = '';
        this.pwd = '';
        this.rePwd = '';
        this.time = 60;
        this.timeFlag = false;
      },
      getCode() {
        if (this.phoneNum) {
          const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
          if (myreg.test(this.phoneNum)) {
            this.$axios.post(this.$api.code, {
              phone: this.phoneNum,
              type: 2,
            }).then(() => {
              this.countDown();
              console.log('验证码获取成功');
            });
          } else {
            this.$message({
              showClose: true,
              message: '手机号格式错误',
              type: 'warning'
            });
          }
        } else {
          this.$message({
            showClose: true,
            message: '请先填写手机号',
            type: 'warning'
          });
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
          this.$message({
            showClose: true,
            message: '手机号不能为空',
            type: 'warning'
          });
        } else if (!this.code) {
          this.$message({
            showClose: true,
            message: '验证码不能为空',
            type: 'warning'
          });
        } else if (!this.pwd) {
          this.$message({
            showClose: true,
            message: '密码不能为空',
            type: 'warning'
          });
        } else if (this.pwd !== this.rePwd) {
          this.$message({
            showClose: true,
            message: '两次密码不相同',
            type: 'warning'
          });
        } else {
          this.$axios.post(this.$api.forget, {
            phone: this.phoneNum,
            type: 2,
            code: this.code,
            password: this.pwd,
          }).then(() => {
            this.$message({
            showClose: true,
            message: '密码修改成功',
            type: 'warning'
          });
            this.resetData();
          });
        }
      },
  
    }
  }
</script>
