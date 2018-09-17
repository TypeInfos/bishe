<template src="./index.html">
</template>

<style lang="less" src="./index.less">
</style>

<script>

export default {
  name: 'Home',
  data() {
    return {
      activeIndex: '1',
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
    },
    handleSelect(key) {
      this.activeIndex = key
      switch (key) {
        case '1':
          this.$router.push('/funcView');
          break;
        case '2':
          this.$router.push('/rootRadar');
          break;
        case '3':
          this.$router.push('/labelLab');
          break;
        case '4':
          this.$router.push('/wisdomSearch');
          break;
        case '5':
          this.$router.push('/buy1');
          break;
        case '6':
          this.$router.push('/download');
          break;
        case '7':
          this.$router.push('/help');
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
    sendMsgToExtension(type){
      
    },
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
    },
  },
};
</script>
