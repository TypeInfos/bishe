<template src="./index.html">

</template>

<style lang="less" src="./index.less">
</style>

<script>
export default {
  name: 'customerService',
  data() {
    return {
      show: true,
    };
  },
  watch: {
    $route: 'showByPath'
  },
  methods: {
    showByPath() {
      let path = this.$route.path;
      console.log(path);
      if (path === '/download') {
        this.show = false
      }
    }
  }
};
</script>
