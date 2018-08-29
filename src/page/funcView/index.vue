<template src="./index.html">
    
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted(){
      this.getUserInfo();
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      this.$axios
        .get(this.$api.info)
        .then(res => {
          this.$store.dispatch("login");
          this.$store.dispatch("setTaobaoName", {
            name: res.data.name
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    use(item) {
      switch(item){
        case 'rootRadar':
          this.$router.push("/rootRadar");
          break;
        case 'labelLab':
          this.$router.push("/labelLab");
          break;
        default:
          break;
      }
    },
    lookUseVideo(item) {
      switch(item){
        case 'rootRadar':
          window.open("https://v.doushudata.com/video.html");
          break;
        case 'labelLab':
          window.open("about:blank");
          break;
        default:
          break;
      }
      
    }
  }
};
</script>

<style lang="less" src="./index.less">
</style>