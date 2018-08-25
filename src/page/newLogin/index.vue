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
        timer: null, //定时器
        taobaoName: '',
        rememberPwd: '', //gjfAdd
        loginLoading: false,
        bindTaobaoName: '', // 当前账户绑定的淘宝名字
        loginTaobaoName: '', //当前登陆的淘宝名字
        token: '',
      }
    },
    mounted() {
      this.getCookie();
    },
    methods: {
      //获取cookie
      getCookie() {
        this.vipName = this.$cookies.get('vipName');
        this.vipPwd = this.$cookies.get('vipPwd');
        this.rememberPwd = true;
      },
      // 易数账号登录
      ysLogin() {
        //
        this.loginLoading = true;
        this.$axios.post(this.$api.checkProduct, {
            phone: this.vipName
          })
          .then(res => {
            if (res.data) {
              this.$axios.post(this.$api.login, {
                loginName: this.vipName,
                password: this.vipPwd,
              }).then((res) => {
                this.$message({
                  showClose: true,
                  message: '抖数账号登录成功',
                  type: 'success'
                });
                this.token = res.data;
                this.$axios.get(this.$api.info).then((res) => {
                  this.loginLoading = false;
                  this.bindTaobaoName = res.data.name;
                  const data = document.getElementById('taobao-extension-data').value;
                  if (data === '{}' || data === '') {
                    this.isLoginTaobao = false;
                    this.active = 1;
                  } else {
                    this.isLoginTaobao = true;
                    this.taobaoName = JSON.parse(data).runAsShopTitle;
                    if (this.taobaoName != this.bindTaobaoName) {
                      this.active = 3;
                    } else {
                      this.active = 2;
                    }
                  }
                })
              }).catch(err => {
                this.loginLoading = false;
              });
              //gjfAdd
              if (this.rememberPwd == true) {
                this.$cookies.set('vipName', this.vipName, 60 * 60 * 24 * 30);
                this.$cookies.set('vipPwd', this.vipPwd, 60 * 60 * 24 * 30);
              }
            } else {
              this.loginLoading = false;
              this.$confirm(`您的7天免费试用已到期，如需继续使用请联系客服！`, '内测提示', {
                confirmButtonText: '确 定',
                cancelButtonText: '取 消',
                type: 'info',
              }).then(res => {
                this.openDialog();
              }).catch(res => {
                console.log(error)
              })
            }
          }).catch(error => {
            this.loginLoading = false;
          })
      },
      /**
       * 二维码弹窗
       */
      openDialog() {
        this.$alert('<img class="footerImg2" src="https://www.doushudata.com/img/dsgzh.d5dd62f.jpg"></img>', '扫描二维码，联系客服小抖进行预约', {
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
              token: curToken
            },
            response => {
              console.log(response);
            });
        } catch (error) {
          alert('插件的版本id与抖数id不同');
        }
        this.$store.dispatch('login');
        this.$store.dispatch('setTaobaoName', {
          name: this.taobaoName
        });
        this.$router.push('/rootRadar');
        location.reload();
      },
      // 开启监听，是否已登录
      watchLogin() {
        this.timer = setInterval(() => {
          const data = document.getElementById('taobao-extension-data').value;
          if (data === '{}' || data === '') {
            this.isLoginTaobao = false;
          } else {
            // 和 插件绑定的 淘宝名字
            this.taobaoName = JSON.parse(data).runAsShopTitle;
            if (this.taobaoName != this.bindTaobaoName) {
              this.active = 3;
            } else {
              this.active = 2;
              this.isLoginTaobao = true;
              clearInterval(this.timer);
            }
          }
        }, 500);
      }
    },
  }
</script>
