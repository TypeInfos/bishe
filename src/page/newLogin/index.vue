<template src="./index.html">

</template>

<style lang="less" src="./index.less">

</style>

<script>
export default {
  name: 'login',
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
      autoLogin: false,
      taobaoLoading: false,
      timer: null, // 定时器
      taobaoName: '',
      rememberPwd: '', // gjfAdd
      loginLoading: false,
      bindTaobaoName: '', // 当前账户绑定的淘宝名字
      loginTaobaoName: '', // 当前登陆的淘宝名字
      token: '',
    }
  },
  mounted() {
    this.getCookie();
  },
  methods: {
    // 获取cookie
    getCookie() {
      this.vipName = this.$cookies.get('vipName');
      this.vipPwd = this.$cookies.get('vipPwd');
      this.rememberPwd = true;
    },
    // 易数账号登录
    ysLogin() {
      let data = '';
      this.loginLoading = true;
      //   this.$axios.post(this.$api.checkProduct, {
      //       phone: this.vipName
      //     })
      //     .then(res => {
      // if (res.data) {
      this.$axios.post(this.$api.login, {
        loginName: this.vipName,
        password: this.vipPwd,
      }).then((res) => {
        this.$message({
          showClose: true,
          message: '抖数账号登录成功',
          type: 'success',
        });
        this.token = res.data;
        console.log(`token${this.token}`)
        this.$axios.get(this.$api.info).then((resp) => {
          this.loginLoading = false;
          this.bindTaobaoName = resp.data.name;
          try {
            chrome.runtime.sendMessage(this.$store.getters.editorExtensionId, {
              type: 'getShopInfo',
            },
            (response) => {
              console.log(response);
              if (response.code !== 400) {
                data = response.shopInfo;
              }
            })
          } catch (error) {
            this.$alert('请安装插件', '提示');
          }
          if (data === '{}' || data === '') {
            this.isLoginTaobao = false;
            this.active = 1;
          } else {
            this.isLoginTaobao = true;
            this.taobaoName = data.runAsShopTitle;
            if (this.taobaoName !== this.bindTaobaoName) {
              this.active = 3;
            } else {
              this.active = 2;
            }
          }
        }).catch(error => {
          console.log('get Info err', error)
        })
      }).catch(err => {
        this.loginLoading = false;
      });
      // gjfAdd
      if (this.rememberPwd == true) {
        this.$cookies.set('vipName', this.vipName, 60 * 60 * 24 * 30);
        this.$cookies.set('vipPwd', this.vipPwd, 60 * 60 * 24 * 30);
      }
    },
    /**
       * 二维码弹窗
       */
    openDialog() {
      this.$alert('<img class="footerImg2" src="http://www.doushudata.com/img/dsgzh.d5dd62f.jpg"></img>', '扫描二维码，联系客服小抖进行预约', {
        dangerouslyUseHTMLString: true,
        closeOnClickModal: true,
        closeOnPressEscape: true,
        center: true,
        showConfirmButton: false,
      }).catch(res => {})
    },
    // 重置易数账号
    reset() {
      this.vipName = '';
      this.vipPwd = '';
    },
    // 跳转注册
    goRegister() {
      this.$router.push('/register');
    },
    // 跳转直通车登录
    loginToTaobao() {
      this.taobaoLoading = true;
      this.watchLogin();
      window.open('https://subway.simba.taobao.com/');
    },
    // 完成登录
    finishLogin() {
      const curToken = this.token
      try {
        chrome.runtime.sendMessage(this.$store.getters.editorExtensionId, {
          type: 'token',
          token: curToken,
        },
        response => {
          console.log(response);
        });
      } catch (error) {
        alert('插件的版本id与抖数id不同');
      }
      this.$store.dispatch('login');
      this.$store.dispatch('setTaobaoName', {
        name: this.taobaoName,
      });
      this.$router.push('/funcView');
      location.reload();
    },
    // 开启监听，是否已登录
    watchLogin() {
      this.timer = setInterval(() => {
        try {
          chrome.runtime.sendMessage(this.$store.getters.editorExtensionId, {
            type: 'getShopInfo',
          },
          response => {
            if (response.code == 400) {
              this.isLoginTaobao = false;
            } else {
              this.taobaoName = response.shopInfo.runAsShopTitle;
              if (this.taobaoName != this.bindTaobaoName) {
                this.active = 3;
              } else {
                this.active = 2;
                this.isLoginTaobao = true;
                clearInterval(this.timer);
              }
            }
          })
        } catch (error) {
          clearInterval(this.timer);
          this.$alert('请安装插件', '提示');
        }
      }, 500);
    },
  },
}
</script>
