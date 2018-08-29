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
            myOrderTableData:[],
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
                // console.log(res.data);
                this.myOrderTableData=res.data;
                console.log(this.myOrderTableData)
                // this.myOrderTableData[0].productName = res.data.title;
                // this.myOrderTableData[0].orderBeginTime = res.data.payTime;
                // this.myOrderTableData[0].serviceBeginTime = res.data.beginTime;
                // this.myOrderTableData[0].serviceEndTime = res.data.endTime;
                // this.myOrderTableData[0].buyTime = res.data.payPrice;
                // this.myOrderTableData[0].cost = res.data.orderTime;
                // this.myOrderTableData[0].state = res.data.status;
            });
        },
        goBuy(index, rows){
            console.log(index+rows);
            this.$router.push('/buy1');
        },
        changeStatus(row, column, cellValue, index){
            if(cellValue == true){
                return '使用中'
            }
            if(cellValue == false){
                return '已过期'
            }
        }
    },
    watch:{
        pageChange(val){
            console.log('第'+val+'页');
        }
    }
}
</script>

