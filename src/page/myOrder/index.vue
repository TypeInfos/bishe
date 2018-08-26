<template src="./index.html">
    
</template>

<style lang="less" src="./index.less">

</style>

<script>
export default {
    data(){
        return{
            goodsTotalPage:6, //用户下的订单商品总页数
            pageChange:1,      //当前页的监听事件
            myOrderTableData:[{
                productName:'基础版（词根雷达+标签实验室）',
                orderBeginTime:'2018-06-26 08:08:08',
                serviceBeginTime:'2018-06-26',
                serviceEndTime:'2019-06-26',
                buyTime:'12个月',
                cost:'2980',
                state:'使用中',
            }],
        }
    },
    created(){
        this.getOrderList();
    },
    mounted(){
        this.getUserInfo();
    },
    methods:{
        // 获取用户信息
        getUserInfo() {
            this.$axios.get(this.$api.info).then((res) => {
            this.$store.dispatch('login');
            this.$store.dispatch('setTaobaoName', {
                name: res.data.name
            })
            }).catch(error => {
            console.log(error)
            })
        },
        getOrderList(){
            this.$axios.get(this.$api.getOrderList).then((res)=>{
                this.productName = res.data.title;
                this.orderBeginTime = res.data.payTime;
                this.serviceBeginTime = res.data.beginTime;
                this.serviceEndTime = res.data.endTime;
                this.buyTime = res.data.payPrice;
                this.cost = res.data.orderTime;
                this.state = res.data.status;
            });
        },
        goBuy(index, rows){
            console.log(index+rows);
            this.$router.push('/buy1');
        },
    },
    watch:{
        pageChange(val){
            console.log('第'+val+'页');
        }
    }
}
</script>

