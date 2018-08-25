<template src="./index.html">
    
</template>

<style lang="less" src="./index.less">

</style>

<script>
export default {
    data(){
        return{
            
        }
    },
    props: {
        orderBlockInfo: Object  
    },
    methods:{
        buyBtn(){
            // if(this.isLogin.set){
                //页面间跳转 router携带参数
                this.$router.push({
                    name:'buy2',
                    params:{
                    orderBlockInfo:this.orderBlockInfo
                    }
                });
            // }
        },
    }
}
</script>

