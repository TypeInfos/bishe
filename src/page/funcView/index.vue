<template src="./index.html">

</template>

<script>
import checkProduct from '@/components/checkProduct'

export default {
  data() {
    return {
      pid: '',
      day: '', // 产品剩余使用期限
      showCheckProduct: false, // 显示过期的弹框
    };
  },
  components: {
    checkProduct,
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    cjy(data) {
      this.showCheckProduct = data
    },
    // 获取用户信息
    getUserInfo() {
      this.$axios
        .get(this.$api.info)
        .then(res => {
          this.$store.dispatch('login');
          this.$store.dispatch('setTaobaoName', {
            name: res.data.name,
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    use(item, pid) {
      this.pid = pid;
      this.$axios.post(this.$api.checkOrder, {
        pid: this.pid,
      }).then((res) => {
        this.day = res.data;
        if (res.data === -1) {
          this.$router.push({ name: 'GuidePage', query: { type: -1, name: item } })
        } else if (res.data === -2) {
          this.$router.push({ name: 'GuidePage', query: { type: -2, name: item } })
        } else {
          switch (item) {
            case 'rootRadar':
              this.$router.push('/rootRadar');
              break;
            case 'labelLab':
              this.$router.push('/wisdomSearch');
              break;
            default:
              break;
          }
        }
      });
    },
    lookUseVideo(item) {
      switch (item) {
        case 'rootRadar':
          window.open('https://v.doushudata.com/video.html');
          break;
        case 'labelLab':
          window.open('about:blank');
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="less" src="./index.less">
</style>
