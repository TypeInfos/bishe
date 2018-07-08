<template src="./index.html">

</template>

<style lang="less" src="./index.less">

</style>

<script>
  import {
    mapGetters
  } from 'vuex';
  export default {
    name: 'Home',
    data() {
      return {
        activeIndex: '',
        name: '',
      };
    },
    watch: {
    },
    computed: {
      isLogin: {
        get: function() {
          return this.$store.getters.login;
        },
        set: function() {
          return false;
        }
      }
    },
    mounted() {
      this.getUserInfo();
    },
    methods: {
      logoClick() {
        // 开发阶段先定义为刷新当前页面，上线后定位到首页。
        location.reload();
      },
      handleSelect(key, keyPath) {
        switch (key) {
          case 1:
            this.$router.push('/rootRadar');
            window.location.reload();
            break;
          case 2:
            break;
          case 3:
            break;
          case 4:
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
      getUserInfo() {
        this.$axios.get(this.$api.info).then((res) => {
          this.$store.dispatch('login');
          this.name = res.data.name;
        });
      },
      // 退出登录
      loginOut() {
        this.$axios.get(this.$api.logout).then(() => {
          this.$router.push('/login');
          window.location.reload();
        });
      },
      // 接收插件数据
      getTaobaoData() {
        const data = document.getElementById('taobao-extension-data').value;
        console.log('taobao-extension-data', data);
      },
    },
  };
</script>
