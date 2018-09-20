<template src="./index.html">
    
</template>

<script>
import Clipboard from 'clipboard'; //复制到剪切板
import goBuyDialog from '@/components/goBuy';
export default {
    components:{
        goBuyDialog
    },
    data(){
        return{
            createPeopleDialog: false, // 创建人群的dialog
            limitNum:10000,  //未订购的限制为1万
            textareaInputValue:'',  //多行文本输入值
            textareaResultValue:'', //多行文本结果值 
            tbList:[{
                value: '选项1',
                label: '交易指数',
                relation:'交易金额'
                }, {
                value: '选项2',
                label: '流量指数',
                relation:'访客数'
                }, {
                value: '选项3',
                label: '搜索人气',
                relation:'搜索人数'
                }, {
                value: '选项4',
                label: '点击人气',
                relation:'点击人数'
                }, {
                value: '选项5',
                label: '收藏人气',
                relation:'收藏人数'
                },{
                value: '选项6',
                label: '加购人气',
                relation:'加购人数'
            }],
            currentLi:['交易指数','交易金额'] //当前选中的指标
        }
    },
    mounted () {
        this.addListener();
        this.getUserInfo();
        //加载页面，默认为第一个指标
        document.querySelectorAll('#li')[0].classList.add('currentLi');
        //判断用户是否订购神器高级版，若买了，则限制改为45万
        this.$axios.post(this.$api.checkOrder,{
            pid:1
        }).then((res) => {
            if(res.data > 0){
                this.limitNum = 450000;
            }else{
                this.limitNum = 10000;
                this.createPeopleDialog = true;
            }
        })
    },
    beforeDestroy(){
        this.removeListener();
    },
    methods:{
        // 获取用户信息
        getUserInfo () {
        this.$axios.get(this.$api.info).then(res => {
            this.$store.dispatch('login')
            this.$store.dispatch('setTaobaoName', {
            name: res.data.name
            })
        }).catch(error => {
            console.log(error)
        })
        },
        // 关闭去购买弹框
        closeCreatePeopleDialog() {
        this.createPeopleDialog = false;
        },
        //选择当前指标
        chooseLi(index){
            //清空多行文本的值
            this.textareaInputValue = '';
            this.textareaResultValue = '';
            //清空当前的li数组
            this.currentLi = [];
            let ele = document.querySelectorAll('#li');
            //清空所有的li的激活class
            for(let i = 0; i < ele.length; i++){
                ele[i].classList.remove('currentLi');
            }
            //选择当前的li，添加currentLi类选择器
            ele[index].classList.add('currentLi');
            this.currentLi.push(this.tbList[index].label);
            this.currentLi.push(this.tbList[index].relation);
        },
        addListener(){
            document.querySelector('.originInput').addEventListener('keydown',this.enterKeyDown)
        },
        removeListener(){
            document.querySelector('.originInput').removeEventListener('keydown',this.enterKeyDown)
        },
        enterKeyDown(e){
                this.textareaInputValue = this.textareaInputValue.replace(/\n+/g,"\n");                
        },
        //清空输入框
        emptyInput(){
            this.textareaInputValue = '';
            this.textareaResultValue = '';
        },
        //复制计算结果
        copy(){
            this.$message({
                type:'success',
                message:'复制成功'
            })
            let clipboard = new Clipboard('.copyBtn');
        },
        submit(){
            //如果输入框的最后一行为空 ，则删除
            if(this.textareaInputValue[this.textareaInputValue.length - 1] === '\n'){
                this.textareaInputValue = this.textareaInputValue.slice(0,this.textareaInputValue.length - 1);
            }
            let sp = this.textareaInputValue.split('\n');
            sp = sp.map(str => parseInt(str.split('').filter(char => !/[^0-9]/.test(char)).join('')))
            const params = []
            for(let i = 0;i < sp.length; i++){
                if (isNaN(sp[i])) {
                    continue
                }
                if(sp[i] > this.limitNum){
                    params.push(sp[i]);
                    continue;
                }else if(sp[i] < 0){
                    continue;
                } else {
                    params.push(sp[i]);
                }
            }
            this.$axios.post(this.$api.shenqi, { indexIn: params })
            .then(res => {
                res = res.data.indexOut
                sp.forEach(source => {
                    // console.log('source', source, params.indexOf(source), params)
                    const index = params.indexOf(source)
                    if (index > -1) {
                        this.textareaResultValue += `${res[index]}\n`
                    } else {
                        if(source > this.limitNum ){
                            this.textareaResultValue += `请输入小于${limitNum}的数字\n`
                            // this.createPeopleDialog = true;
                        }
                        else if(source < 0 ){
                            this.textareaResultValue += '请输入大于0的数字\n'
                        }
                        else{
                            this.textareaResultValue += '该行数据不符合规则\n'
                        }
                    }
                })
                
            })
            .catch(err => {
                console.log('request failed', err)
            })
            
            this.textareaResultValue = ''; //每次转化完 要清空多行文本框的结果。
        },
    },
    watch:{
    }
}
</script>

<style lang="less" src="./index.less" >

</style>
