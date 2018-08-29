<template src="./index.html">

</template>
<style lang="less" src="./index.less">

</style>
<script>
export default {
  name: 'premium',
  data () {
    return {
      addWordSucceed:true,
      addGoodsFocuDialog:true,
      price:'',
      showErrorP:false,
    }
  },
  methods:{
    closeModal(){
      this.addGoodsFocuDialog = ! this.addGoodsFocuDialog ;
      this.$cookies.set('isFirstTime', 'exist',60 * 60 * 24 * 30);
    },
    betweenRange(){
      if(this.price>300 || this.price<5) {
        this.showErrorP = true;
      }else{
        this.showErrorP = false;
      }
    },
    lookFuncView(){
      this.$router.push('/funcView');
    },
    lookUseVideo(){
      window.open('https://v.doushudata.com/video.html');
    },
  }
}
</script>


