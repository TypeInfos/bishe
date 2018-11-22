<template src="./index.html">

</template>

<style lang="less" src="./index.less">

</style>

<script>
import Vue from 'vue'

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
    this.addListenerToSubmit()
    this.getCookie()
  },
  methods: {
    // 获取cookie
    getCookie() {
      this.vipName = this.$cookies.get('vipName')
      this.vipPwd = this.$cookies.get('vipPwd')
      this.rememberPwd = true
    },
    addListenerToSubmit() {
      const btn = document.querySelector('.el-form')
      btn.addEventListener('keydown', this.clickBtn)
    },
    removeListenerToSubmit() {
      const btn = document.querySelector('.el-form')
      btn.removeEventListener('keydown', this.clickBtn)
    },
    clickBtn(e) {
      if (e.keyCode === 13) {
        document.querySelector('.loginBtn').click()
      }
    },
    douShuLogin() {
      console.log(navigator.userAgent)
      if (navigator.userAgent.indexOf('Chrome') > -1) {
        this.ysLogin()
      } else {
        alert('该产品目前只支持谷歌和360浏览器！')
      }
    },
    // 易数账号登录
    ysLogin() {
      const getInfo = () => {
        this.removeListenerToSubmit()
        this.$axios.get(this.$api.info).then((resp) => {
          this.loginLoading = false
          this.bindTaobaoName = resp.data.name
          try {
            chrome.runtime.sendMessage(this.$store.getters.editorExtensionId, {
              type: 'getShopInfo',
            },
            (response) => {
              if (response.code != 400) {
                if (response.shopInfo === '{}' || response.shopInfo === '') {
                  this.isLoginTaobao = false
                  this.active = 1
                } else {
                  this.isLoginTaobao = true
                  this.taobaoName = response.shopInfo.runAsShopTitle
                  if (this.taobaoName !== this.bindTaobaoName) {
                    this.active = 3
                  } else {
                    this.finishLogin()
                  }
                }
              } else {
                this.isLoginTaobao = false
                this.active = 1
              }
            })
          } catch (error) {
            this.$alert('请安装插件', '提示')
          }
        }).catch(error => {
          console.log('get Info err', error)
        })
      }
      let data = ''
      try {
        chrome.runtime.sendMessage(this.$store.getters.editorExtensionId, {
          type: 'version'
        }, response => {
          console.log('response', response)
          if (!response) {
            this.$emit('versionErr')
            return
          }
          this.loginLoading = true
          this.$axios.post(this.$api.login, {
            loginName: this.vipName,
            password: this.vipPwd,
          }).then((res) => {
            this.$message({
              showClose: true,
              message: '抖数账号登录成功',
              type: 'success',
              customClass: 'message-g-zindex'
            })
            this.token = res.data
            try {
              chrome.runtime.sendMessage(this.$store.getters.editorExtensionId, {
                type: 'token',
                token: this.token,
              },
              (response) => {
                console.log(response)
              })
            } catch (error) {
              alert('插件的版本id与抖数id不同')
            }
            // getInfo
            getInfo()
          }).catch(err => {
            this.loginLoading = false
          })
        })
      } catch (err) {
        console.log('获取版本失败', err)
      }
      // set cookie
      if (this.rememberPwd == true) {
        this.$cookies.set('vipName', this.vipName, 60 * 60 * 24 * 30)
        this.$cookies.set('vipPwd', this.vipPwd, 60 * 60 * 24 * 30)
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
      this.vipName = ''
      this.vipPwd = ''
    },
    // 跳转注册
    goRegister() {
      this.$router.push('/register')
    },
    // 跳转直通车登录
    loginToTaobao() {
      try {
        chrome.runtime.sendMessage(this.$store.getters.editorExtensionId, {
          type: 'logout'
        },
        response => {
          try {
            this.taobaoLoading = true
            this.watchLogin()
          } catch (error) {
            console.log('退出直通车出错')
          }
        })
      } catch (error) {
        alert('插件ID与前端不匹配')
        this.$router.push('/login')
      }
      document.querySelector('#goSubway').click()
    },
    // 完成登录
    finishLogin() {
      this.$store.dispatch('login')
      this.$store.dispatch('setTaobaoName', {
        name: this.taobaoName,
      })
      this.$router.push('/funcView')
    },
    // 接受插件传过来的消息
    receiveExtensionMessage() {
      try {
        chrome.runtime.sendMessage(this.$store.getters.editorExtensionId, {
          type: 'getShopInfo',
        },
        response => {
          if (response.code == 400) {
            this.isLoginTaobao = false
          } else {
            this.taobaoName = response.shopInfo.runAsShopTitle
            if (this.taobaoName != this.bindTaobaoName) {
              this.active = 3
            } else {
              this.active = 2
              this.isLoginTaobao = true
            }
          }
        })
      } catch (error) {
        this.$alert('请安装插件', '提示')
      }
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
              this.isLoginTaobao = false
            } else {
              this.taobaoName = response.shopInfo.runAsShopTitle
              if (this.taobaoName != this.bindTaobaoName) {
                this.active = 3
              } else {
                this.active = 2
                this.isLoginTaobao = true
                clearInterval(this.timer)
              }
            }
          })
        } catch (error) {
          clearInterval(this.timer)
          this.$alert('请安装插件', '提示')
        }
      }, 500)
    },
  },
}
</script>
