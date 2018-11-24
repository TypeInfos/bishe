<template src="./index.html">

</template>

<style lang="less" src="./index.less">

</style>

<script>
export default {
  name: 'myregister',
  data() {
    return {
      active: 0,
      phoneNum: '', // 手机号
      code: '', // 验证码
      pwd: '', // 密码
      rePwd: '', // 确认密码
      wechart: '', // 微信号
      inviteCode: '', // 邀请码
      time: 60, // 倒计时
      timeFlag: false, // 是否显示倒计时
      codeName: '获取验证码',
      codeLoading: false, // 获取验证码loading
      isLoginTaobao: false, // 是否登录淘宝
      taobaoName: '', // 淘宝店铺名
      id: '', // 店铺id
      taobaoData: {},
      taobaoLoading: false,
      agreed: true,
      timer: null,
      bindState: false,
      // gjfAdd起始
      showSecretError1: false,
      showSecretError2: false,
      showreSecretError: false,
      registerLoading: false,
    };
  },
  mounted() {
    this.addListenerToSubmit();
  },
  methods: {
    // gjfAdd
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
    addListenerToSubmit() {
      const btn = document.querySelector('.el-form');
      btn.addEventListener('keydown', this.clickBtn)
    },
    removeListenerToSubmit() {
      const btn = document.querySelector('.el-form');
      btn.removeEventListener('keydown', this.clickBtn)
    },
    clickBtn(e) {
      if (e.keyCode === 13) {
        document.querySelector('.registerBtn').click();
      }
    },
    hideSecretError2() {
      this.showSecretError2 = false;
      this.showreSecretError = false;
      if (this.rePwd === this.pwd) {
        this.showreSecretError = false;
      }
    },
    // gjfAdd结束
    register() {
      if (!this.phoneNum) {
        this.$message({
          showClose: true,
          message: '手机号不能为空',
          type: 'warning',
          customClass: 'message-g-zindex'
        });
      } else if (!this.code) {
        this.$message({
          message: '验证码不能为空',
          type: 'warning',
          customClass: 'message-g-zindex'
        });
      } else if (!this.pwd) {
        this.$message({
          message: '密码不能为空',
          type: 'warning',
          customClass: 'message-g-zindex'
        });
      } else if (this.pwd !== this.rePwd) {
        this.$message({
          message: '密码不一致',
          type: 'warning',
          customClass: 'message-g-zindex'
        });
      } else if (!this.agreed) {
        this.$message({
          message: '请同意法律声明和隐私条款',
          type: 'warning',
          customClass: 'message-g-zindex'
        });
      }
      // else if(!this.inviteCode) {
      //     this.$message({
      //       message: '无效的邀请码',
      //       type: 'warning'
      //     });
      //   }
      else {
        this.registerLoading = true;
        this.$axios
          .post(this.$api.register, {
            phone: this.phoneNum,
            type: 1,
            code: this.code,
            password: this.pwd,
            wechat: this.wechart,
            inviteCode: this.inviteCode,
          })
          .then(() => {
            this.registerLoading = false;
            this.$message({
              showClose: true,
              message: '注册账号成功，请绑定淘宝账号',
              type: 'success',
              customClass: 'message-g-zindex'
            });
            this.removeListenerToSubmit();
            this.active = 1;
          })
          .catch(res => {
            this.registerLoading = false;
          });
      }
    },
    // 开启监控
    watchLogin() {
      this.timer = setInterval(() => {
        try {
          chrome.runtime.sendMessage(
            this.$store.getters.editorExtensionId, {
              type: 'getShopInfo',
            },
            (response) => {
              if (response.code == 400) {
                this.isLoginTaobao = false;
              } else {
                this.isLoginTaobao = true
                this.active = 2;
                this.taobaoName = response.shopInfo.runAsShopTitle;
                this.$store.dispatch('setTaobaoName', {
                  name: this.taobaoName,
                });
                // 店铺ID
                this.id = response.shopInfo.runAsShopId;
                clearInterval(this.timer);
              }
            },
          );
        } catch (error) {
          clearInterval(this.timer);
        }
      }, 500);
    },
    // 跳转直通车登录
    loginToTaobao() {
      this.taobaoLoading = true;
      this.watchLogin();
      window.open('https://subway.simba.taobao.com/');
    },
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
    // 绑定淘宝店铺名
    bindTaobao() {
      if (true) {
        const params = {
          id: this.id,
          shopname: this.taobaoName,
        };
        this.registerLoading = true;
        this.$axios.post(this.$api.bind, params).then(res => {
          this.registerLoading = false;
          this.bindState = true;
          this.$message({
            showClose: true,
            message: '绑定成功',
            type: 'success',
            customClass: 'message-g-zindex'
          });
          const token = res.data;
          try {
            chrome.runtime.sendMessage(
              this.$store.getters.editorExtensionId, {
                type: 'token',
                token,
              },
              response => {
                console.log(response);
              },
            );
          } catch (error) {
            console.log('插件id不同');
          }
          this.$store.dispatch('login');
          this.active = 3;
        });
      }
    },
    /**
       * 二维码弹窗
       */
    openDialog() {
      this.$alert(
        '<img class="footerImg2" src="http://www.doushudata.com/img/dsgzh.d5dd62f.jpg"></img>',
        '扫描二维码，联系客服小抖进行预约', {
          dangerouslyUseHTMLString: true,
          closeOnClickModal: true,
          closeOnPressEscape: true,
          center: true,
          showConfirmButton: false,
        },
      ).catch(res => {});
    },
    getCode() {
      if (this.phoneNum) {
        const myreg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        if (myreg.test(this.phoneNum)) {
          this.codeLoading = true;
          this.$axios
            .post(this.$api.code, {
              phone: this.phoneNum,
              type: 1,
            })
            .then(() => {
              this.codeLoading = false;
              this.countDown();
            })
            .catch(error => {
              this.codeLoading = false;
            });
        } else {
          this.$message({
            showClose: true,
            message: '手机号格式错误',
            type: 'warning',
            customClass: 'message-g-zindex'
          });
        }
      } else {
        this.$message({
          showClose: true,
          message: '请先填写手机号',
          type: 'warning',
          customClass: 'message-g-zindex'
        });
      }
    },
    finish() {
      this.$router.push('/funcView');
      location.reload();
    },
  },
};
</script>
