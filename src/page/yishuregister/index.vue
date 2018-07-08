<template src="./index.html"></template>
<style lang="less" src="./index.less"></style>

<script>
  export default{
    name:'myregister',
    data(){
      return{
        input3:'',
        checked: false
      }
    },
    methods:{
      testButton(){
        console.log(this.input3)
      }
    }
  }
</script>
