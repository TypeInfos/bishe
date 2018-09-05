<template src="./index.html">

</template>

<style lang="less" src="./index.less">

</style>

<script>
import {
  mapGetters,
} from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      activeIndex: '',
      name: '',
    };
  },
  computed: {
    isLogin: {
      get() {
        return this.$store.getters.login;
      },
      set() {
        return false;
      },
    },
    globaTaobaoName: {
      get() {
        return this.$store.getters.taobaoName;
      },
      set() {
        return false;
      },
    },
  },
  // mounted() {
  //  this.getUserInfo();
  // },
  methods: {
    logoClick() {
      // 开发阶段先定义为刷新当前页面，上线后定位到首页。
      this.$router.push('/rootRadar');
      location.reload();
    },
    handleSelect(key) {
      switch (key) {
        case '1':
          this.$router.push('/funcView');
          location.reload();
          break;
        case '2':
          this.$router.push('/rootRadar');
          location.reload();
          break;
        case '3':
          this.$router.push('/labelLab');
          location.reload();
          break;
        case '4':
          this.$router.push('/wisdomSearch');
          location.reload();
          break;
        case '5':
          this.$router.push('/buy1');
          location.reload();
          break;
        case '6':
          // let iframe = document.createElement('iframe');
          // iframe.style.display = 'none';
          // iframe.src = 'http://static.openssl.me/doushu.zip';
          // iframe.onload = function() {
          //   document.body.removeChild(iframe);
          // };
          // document.body.appendChild(iframe);
          // break;
          // this.$router.push('/tempBqsys');
          //   location.reload();
          // break;
          this.$router.push('/download');
          // location.reload();
          break;
        default:
          break;
      }
    },
    resetActiveIndex(type) {
      if (type === 0) {
        this.$router.push('/login');
      } else {
        this.$router.push('/register');
      }
    },
    // 获取用户信息
    // getUserInfo() {
    // this.$axios.get(this.$api.info).then((res) => {
    //   this.$store.dispatch('login');
    //   this.$store.dispatch('setTaobaoName', {
    //     name: res.data.name
    //   })
    // }).catch(error => {
    //   console.log(error)
    // })
    // },
    // 退出登录
    loginOut() {
      this.$store.dispatch('logout');
      this.$store.dispatch('setTaobaoName', {
        name: '',
      });
      this.$axios.get(this.$api.logout).then(() => {
        this.$router.push('/login');
        location.reload();
      });
    },
    goToMyOrder() {
      this.$router.push('/myOrder');
      location.reload();
    },
    // 接收插件数据
    getTaobaoData() {
      const data = document.getElementById('taobao-extension-data').value;
      console.log('taobao-extension-data', data);
    },
  },
};
</script>
