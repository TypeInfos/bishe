<template src="./index.html">

</template>

<style lang="less" src="./index.less">

</style>

<script>
import orderBlock from '../../components/orderBlock';
export default {
    components:{
        orderBlock
    },
    data(){
        return{
            orderBlockInfo: {
                pid:1,          //传给后端的标识符产品pid   词根雷达为1
                firstLine:'基础版',
                secondLine:'（词根雷达+标签实验室）',
                thirdLine:'原价¥3980元/年',
                fourthLine:'2980',
                fifthLine:'节省25%',
                sixLine:'单品整体词根分析',
                seventhLine:'单品单个词根分析及操作',
                eightLine:'单品整体标签分析',
                ninthLine:'单品群组分析及便捷管理 ',
                tenthLine:'单品标签数据排序',
                eleventhLine:'多维度交叉分析',
                twelfthLine: require('../../assets/buy1.png'),  //为什么用require呢？img引用的是静态文件下的资源，子组件即使用v-bind:src也不会被webpack编译
            }
        }
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
    },
    mounted(){
        this.getUserInfo();
    }
}
</script>