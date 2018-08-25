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
    use() {
      this.$router.push("/labelLab");
    },
    lookUseVideo() {
      window.open("about:blank");
    }
  }
};
</script>

<style lang="less" src="./index.less">
</style>