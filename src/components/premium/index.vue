<template src="./index.html">

</template>

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
    },
    betweenRange(){
      if(this.price>300 || this.price<5) {
        this.showErrorP = true;
      }else{
        this.showErrorP = false;
      }
    },
  }
}
</script>

<style lang="less" src="./index.less">

</style>
