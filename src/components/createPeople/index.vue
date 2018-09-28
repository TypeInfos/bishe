<template src="./index.html">

</template>

<script>
export default {
  name: 'premium',
  props:
  [
    'createPeopleDialog',
    'firstCat',
    'campaignId',
    'adGroupId',
    'groupId',
  ],
  data() {
    return {
      addWordSucceed: true,
      showMustWrite: false, // 显示名称必填的提示
      showErrorP: false, // 显示溢价范围有误的提示
      showPeopleProperty: true, // 显示人口属性人群整块
      showWeatherProperty: true, // 显示天气属性人群整块
      // confirmDisabled:true,
      loading: false,
      price: '',
      name: '',
      radio: '1',
      sexRadio: '',
      checked: '',
      monthAverageLimitRadio: '',
      overPeopleNumber: '-', // 覆盖人群的数量
      // jy
      wordList: '', // 保存插件需要的一大串文字
      peoplePropertyObj: [],
      weatherPropertyObj: [],
      para: [], // 保存要传给插件的参数数组
      peopleCheckList: [], // check-group的v-model
      crowdId: [], // 给后端的参数
      // editorExtensionId:'lnbdcilfaojoldgckojoidnafpagkjbn',
      // lnbdcilfaojoldgckojoidnafpagkjbn   上线ID
      // cpnmealmpgcapggbgjgfahpiifbbooef  测试ID
      timer: null, // 创建人群的定时器
    }
  },
  mounted() {
    this.radioChange()
  },
  methods: {
    init() {
      // 发送一个(简单的请求：
      // console.log(this.firstCat);
      chrome.runtime.sendMessage(this.$store.getters.editorExtensionId, {
        type: 'getLayoutExt',
        firstCat: this.firstCat,
        campaignId: this.campaignId,
        adGroupId: this.adGroupId,
      },
      response => {
        this.peoplePropertyObj = response.layout[1].dimDTOs // 将返回来的人口属性人群的信息都保存下来
        this.weatherPropertyObj = response.layout[0].dimDTOs // 将返回来的天气属性人群的信息都保存下来
        this.wordList = response.wordList // 保存插件需要的一大串文字
      })
    },
    closeModal() {
      this.$emit('closeDialog')
      this.overPeopleNumber = '-' // 每次关闭弹框，初始化覆盖人群数
    },
    nameMust() {
      // if(this.name == '' ){
      //   this.showMustWrite = true;
      //   this.confirmDisabled = true;
      // }else{
      //   this.showMustWrite = false;
      //   this.confirmDisabled = false;
      // }
    },
    clearChecked() {
      this.peopleCheckList = []
      this.name = ''
      this.price = ''
    },
    btnCancel() {
      this.clearChecked()
      this.closeModal()
    },
    // 判断元素是否存在数组内
    contains(arr, obj) {
      let i = arr.length
      while (i--) {
        if (arr[i] === obj) {
          return true
        }
      }
      return false
    },
    checkboxChange(postfix, prefixIndex, postfixIndex, obj) {
      let ckState = this.contains(this.peopleCheckList, postfix.tagName)
      if (ckState) {
        // this.peopleCheckList.push(postfix.tagName);  //把每次点击的字段添加到数组    //不用手动添加了 element的label自动添加到v-model的peopleCheckList数组里了
        this.para.push(obj[prefixIndex].tagOptions[postfixIndex]) // 添加一个tagOptions数组
      } else {
        let i = this.peopleCheckList.indexOf(postfix)
        if (i > -1) {
          this.peopleCheckList.splice(i, 1)
        }
        // this.peopleCheckList.splice(postfix.tagName,1);  //把每次点击的字段从数组删除   //splice删除不精确 最好是遍历再splice删除
        // console.log(this.peopleCheckList);
        let tagNameState = this.contains(this.para, postfix.tagName)
        // console.log('tagNameState的状态是'+tagNameState);
        if (!tagNameState) {
          let p = this.para.indexOf(postfix)
          if (p > -1) {
            this.para.splice(p, 1)
          }
        }
      }
      // 我们希望与之通信的扩展程序标识符。
      // 发送一个简单的请求：lhr：此处应该添加防抖动
      if (this.timer) {
        clearTimeout(this.timer)
      }
      const sendMessage = () => {
        let param = {
          type: 'getCrowdCount',
          selectTagOptions: this.para,
          wordList: this.wordList,
        }
        let cb = response => {
          this.overPeopleNumber = response.result
        }
        chrome.runtime.sendMessage(this.$store.getters.editorExtensionId, param, cb)
      }
      this.timer = setTimeout(sendMessage, 500)
    },
    confirmBtn() {
      if (!this.name) {
        this.$message({
          message: '名称不能为空',
          type: 'warning',
          customClass: 'message-g-zindex'
        })
      } else if (this.overPeopleNumber === '-' || this.overPeopleNumber === 0) {
        this.$message({
          message: '覆盖人群数量无意义',
          type: 'warning',
          customClass: 'message-g-zindex'
        })
      } else if (this.price > 300 || this.price < 5) {
        this.$message({
          message: '溢价范围有误',
          type: 'warning',
          customClass: 'message-g-zindex'
        })
      } else {
        chrome.runtime.sendMessage(this.$store.getters.editorExtensionId, {
          type: 'addCrowd',
          firstCat: this.firstCat,
          adGroupId: this.adGroupId,
          tagList: this.para,
          name: this.name,
          discount: Number(this.price) + 100,
        },
        (response) => {
        // console.log(response);
          if (response.code === 200) {
            this.crowdId = []
            this.crowdId.push(response.crowdId)
            this.loading = true
            this.$axios.post(this.$api.createCrowd, {
              groupId: this.groupId,
              crowdIdList: this.crowdId,
            }).then(() => {
              this.loading = false
              this.closeModal()
              this.$emit('refreshData')
            })
          } else {
            this.$message({
              message: '人群创建重复',
              type: 'error',
              customClass: 'message-g-zindex'
            })
          }
        })
      }
    },
    betweenRange() {
      // if(this.price>300 || this.price<5) {
      //   this.showErrorP = true;
      //   this.confirmDisabled = false;
      // }else{
      //   this.confirmDisabled = true;
      //   this.showErrorP = false;
      // }
    },
    radioChange(radio) {
      this.peopleCheckList = [] // 每次切换单选都清空多选框群组的数组
      this.para = [] // 清空传给插件的数组
      this.overPeopleNumber = '-' // 每次切换单选 初始化覆盖人群的数量
      // console.log('peopleCheckList数组清空了'+this.peopleCheckList);
      // console.log('para数组清空了'+this.para);
      if (parseInt(this.radio) === 2) {
        this.showPeopleProperty = false
        this.showWeatherProperty = true
      } else {
        this.showPeopleProperty = true
        this.showWeatherProperty = false
      }
    },
  },
  filters: {
    NumFormat(value) {
      if (!value || value <= 0) {
        return 0
      }
      return value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
    },
  },
  watch: {
    createPeopleDialog(val) {
      if (val) {
        this.init()
      }
    },
  },
}
</script>

<style lang="less" src="./index.less">

</style>
