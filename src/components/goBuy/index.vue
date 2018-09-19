<template src="./index.html">

</template>

<script>
export default {
  name: 'goBuy',
  props:[
    'createPeopleDialog',
  ],
  data () {
    return {
      addWordSucceed:true,
    }
  },
  methods:{
    closeModal(){
      this.$emit('closeDialog');
    },
    goBuy(){
      location.href='https://www.doushudata.com/#/buy1';
    }
  }
}
</script>

<style lang="less" src="./index.less">

</style>
