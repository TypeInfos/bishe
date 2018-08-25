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
    computed: {
      isLogin: {
        get: function() {
          return this.$store.getters.login;
        },
        set: function() {
          return false;
        }
      },
      globaTaobaoName:{
        get: function() {
          return this.$store.getters.taobaoName;
        },
        set: function() {
          return false;
        }
      }
    },
    mounted() {
    //  this.getUserInfo();
    },
    methods: {
      logoClick() {
        // 开发阶段先定义为刷新当前页面，上线后定位到首页。
        this.$router.push('/rootRadar');
        location.reload();
      },
      handleSelect(key, keyPath) {
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
          this.$router.push('/tempBqsys');
            location.reload();
            break;
          case '4':
          this.$router.push('/wisdomSearch');
            location.reload();
            break;
          case '5':
          this.$router.push('/buy');
            location.reload();
          break;
          case '6':
          // this.$router.push('/tempBqsys');
          //   location.reload();
          // break;
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
          // this.$store.dispatch('login');
          // console.log('login')
          // this.$store.dispatch('setTaobaoName',{
          //   name:JSON.parse(data).runAsShopTitle
          // })
        }).catch(error=>{
          console.log(error)
        })
      },
      // 退出登录
      loginOut() {
        this.$store.dispatch('logout');
        this.$store.dispatch('setTaobaoName', {
          name: ''
        });
        this.$axios.get(this.$api.logout).then(() => {
          this.$router.push('/login');
          location.reload();
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
