<template src="./index.html">
</template>

<style lang="less" src="./index.less">
</style>

<script>
import moment from 'moment'
import loading from '@/components/Loading'
import guidance from '@/components/guidance/index'
import lineChart from '@/components/newLineChart'
import showGoodsAside from '@/components/showGoodsList'
import expired from '@/components/expired'
import { setStore, getStore } from '@/utils/localStorage';
import backTop from '../../components/backToTop'
import tableData from './tableData'
import keyWord from './components/keyWord'
import matrix from './components/matrix'

export default {
  name: 'rootRadar',
  components: {
    lineChart,
    backTop,
    showGoodsAside,
    tableData,
    guidance,
    expired,
    keyWord,
    matrix,
    loading
  },
  computed: {
    isGlobalLoading() {
      return this.isLoading;
    }
  },
  data() {
    return {
      isLoading: false, // 初始6个圈圈加载框是否显示
      expiredDays: -1,
      expiredTop: 0,
      showGuidance: false,
      currentShopid: '',
      firstFocusGoodsCurrentPage: 1, // 关注商品弹窗的当前页数
      firstFocusGoodsTotalPage: 2, // 关注商品弹窗的总页数
      userSelectedItem: [], // 用户已经选择商品的id
      setintervalCheckItemDataId: null, // 检查商品的checkItemId的轮训id
      firstFocusGoods: false, // 第一次进来关注商品
      firstDateInit: true, // 第一次 date 会出发一次 watch，加个判断第一次就不会触发两次 最近30天
      searchLoading: false,
      repairDataStatus: false, // 修复数据按钮状态
      globalAnalysisShow: false, // 单品整体分析 图表显示
      rootAnalysisCompleteLoading: false, // 词根分析 图表加载是否完成 loading
      overflowSurplus: false, // 初始化选择超过20个
      goodsInfoLoading: false, // 左侧商品列表loading
      firstInitComplete: null,
      deleteWorldVisible: false, // 删除关键词 弹窗
      checkGoodsInfoDataLoadingFlag: false, // 请求 商品前先请求 后端是否有数据， flag
      checkGoodsInfoDataLoading: null, // loading
      addGoodsFocusloading: false, //
      checkDataInterval: null, // checkData setinterval
      allRootEchartComplete: false, // 当所有图表都加载完成后，才能让用户排序
      firstComplete: null, // 首次加载 是否完成
      firstFocusListInit: true,
      result: [], //  初始化界面 过滤输入 和 页数的结果
      singleItemLoading: true, // 单品整体分析loading
      isShow: true,
      addWorldVisible: false, // 自定义词根model show
      addFocusDialog: false, // 添加商品关注 dialog
      customFlag: false, // 是否显示自定义
      checkboxListFlag: false, // 多选提示
      checkboxList2Flag: false,
      itemLoading: true, // 词根分析loading
      shopName: '', // 店铺名
      timer: null, // 定时器
      taobaoLoginVisible: false,
      taobaoLoading: false,
      unFocusListLoading: false,
      allStatusComplete: false, // 关注的商品数据是否都加载完
      checkboxRootsListFlag: false, // 最多 四个词根提示框
      initGoodsFocusLoading: false, // 初始化加载框点确定后的  loading
      addGoodsFocusDialog: false,
      showTableDataFlag: false, // 表格提示框
      tableDataTitle: '', // 表格数据的title
      startLoading: null,
      startLoadingTimer: null, // 首次加载的进度 setInterval
      showTableDataDialog: false, // 排序窗口的flag
      tableData: '', // 表格排序的数据
      totalData: '', // 合计数据
      searchInput: '', // 搜索
      selectSurplus: 0, // 选择初始化商品 至少一个 最多20个
      //  checkList 剩余可选
      checkSurplus: 2,
      checkSurplus2: 2,
      // 重点关注 => 监控商品
      startLoadingnumber: 0, // 进度百分比
      // 分页
      sumGoods: 0, // 所有商品
      currentPage: 1, // 当前页
      filterInput: [], // 过滤用户输入后的数组
      filterPage: [], // 过滤当前页后的数组
      customerRootQueue: [],
      focusOn: [],
      rootList: [], // 词根列表
      unFocus: [],
      filterUnFoucs: [], // 输入框过滤后的filterUnFocus
      initGoodsName: '', // 初始化窗口的名字输入
      currentItemId: '', // 当前展示的商品ID
      currentTitle: '', // 当前展示的商品名称
      czd: '全部终端', // 终端展示
      nealDay: '', // 最近天数
      thirtyDay: '',
      currentDate: '', // 今天的日期
      root: [], // 分词列表
      pxzd: '选择排序字段', // 排序字段
      wordInput: '', // 自定义词根值
      wrapData: [], // 页面显示的 词根分析
      concealData: [], // 所有的词根数据
      curBegin: '', // 当前选中开始时间
      curEnd: '', // 当前选中结束时间
      saveSingleData: {}, // 保存单品整体分析返回数据
      singleTableData: [],
      turnNealDay: '', // 时间选择转换
      customTime: [], // 自定义时间
      maxEcharts: false, // 最多只能显示5个图表 提示
      checkListRoot: [],
      checkList: ['直通车花费', '自然搜索访客数'],
      singleChartsData: {
        checkList: [],
        xAxisData: [],
        yAxis: {},
        series: {}
      }, // 单品整体分析图表数据
      checkListGroup: [
        {
          label: '直通车花费',
          disabled: false,
          isActive: false,
          name: 'zCostList'
        },
        {
          label: '直通车访客数',
          disabled: false,
          isActive: false,
          name: 'zUvList'
        },
        {
          label: '自然搜索访客数',
          disabled: false,
          isActive: false,
          name: 'nUvList'
        },
        {
          label: '总访客数',
          disabled: false,
          isActive: false,
          name: 'allUvList'
        },
        {
          label: '直通车转化率',
          disabled: false,
          isActive: false,
          name: 'zConversionList'
        },
        {
          label: '自然搜索转化率',
          disabled: false,
          isActive: false,
          name: 'nConversionList'
        },
        {
          label: '总转化率',
          disabled: false,
          isActive: false,
          name: 'allConversionList'
        },
        {
          label: '直通车成交量',
          disabled: false,
          isActive: false,
          name: 'zPayCntList'
        },
        {
          label: '自然搜索成交量',
          disabled: false,
          isActive: false,
          name: 'nPayCntList'
        },
        {
          label: '总成交量',
          disabled: false,
          isActive: false,
          name: 'allPayCntList'
        },
        {
          label: '直通车加购人数',
          disabled: false,
          isActive: false,
          name: 'zAddCartList'
        },
        {
          label: '直通车收藏人数',
          disabled: false,
          isActive: false,
          name: 'zAddFavList'
        }
      ],
      checkList2: ['直通车花费', '自然搜索访客数'],
      checkListGroup2: [
        {
          label: '直通车花费',
          disabled: false,
          isActive: false,
          name: 'zCostList'
        },
        {
          label: '直通车访客数',
          disabled: false,
          isActive: false,
          name: 'zUvList'
        },
        {
          label: '自然搜索访客数',
          disabled: false,
          isActive: false,
          name: 'nUvList'
        },
        {
          label: ' 总访客数',
          disabled: false,
          isActive: false,
          name: 'allUvList'
        },
        {
          label: '直通车转化率',
          disabled: false,
          isActive: false,
          name: 'zConversionList'
        },
        {
          label: '自然搜索转化率',
          disabled: false,
          isActive: false,
          name: 'nConversionList'
        },
        {
          label: '总转化率',
          disabled: false,
          isActive: false,
          name: 'allConversionList'
        },
        {
          label: '直通车成交量',
          disabled: false,
          isActive: false,
          name: 'zPayCntList'
        },
        {
          label: '自然搜索成交量',
          disabled: false,
          isActive: false,
          name: 'nPayCntList'
        },
        {
          label: '总成交量',
          disabled: false,
          isActive: false,
          name: 'allPayCntList'
        },
        {
          label: '直通车加购人数',
          disabled: false,
          isActive: false,
          name: 'zAddCartList'
        },
        {
          label: '直通车收藏人数',
          disabled: false,
          isActive: false,
          name: 'zAddFavList'
        }
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近三十天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - (3600 * 1000 * 24 * 30))
              end.setTime(end.getTime() - (3600 * 1000 * 24))
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '自定义',
            onClick () {
              let aaa = document.querySelectorAll('.el-picker-panel__shortcut')[1]
              aaa.style.background = 'white'
            }
          },
          {
            text: '已选择： '
          },
        ],
        disabledDate(time) {
          let curDate = (new Date()).getTime()
          let one = 31 * 24 * 3600 * 1000
          let oneMonths = curDate - one
          return time.getTime() > (Date.now() - (24 * 3600 * 1000)) || time.getTime() < oneMonths
        }
      },
      isShowKeyWord: false
    }
  },
  // 在这里请求axios
  created() {
    if (this.$cookies.isKey('isFirstTime') === false) {
      this.showGuidance = true
    } else {
      this.showGuidance = false
    }
    this.czd = getStore('rootRadarEnd') ? getStore('rootRadarEnd') : '全部终端'
    // 进入页面先判断是否订购产品
    this.checkOrder()
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  filters: {},
  methods: {
    // gjfAdd 进入页面先判断是否订购产品
    checkOrder () {
      this.$axios.post(this.$api.checkOrder, {
        pid: 1 // pid为1是词根雷达
      }).then(res => {
        this.expiredDays = res.data
        if (res.data > 0) {
          this.getShopId()
        } else {
          this.$message({
            message: res.message,
            type: 'warning',
            customClass: 'message-g-zindex'
          })
          this.$router.push({ name: 'GuidePage', query: { type: -1, name: 'rootRadar' } })
        }
      })
    },
    handleScroll () {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      let ele = document.querySelector('.card')
      let expiredEl = document.querySelector('.expired-wrapper')
      if (expiredEl && scrollTop > 50) {
        expiredEl.style.top = '0px'
      } else if (expiredEl && scrollTop <= 50) {
        expiredEl.style.top = `${50 - scrollTop}px`
      }
      let originalStyle = window.getComputedStyle(ele)
      if (scrollTop > 93.6) {
        ele.style.position = 'sticky'
        ele.style.top = `${scrollTop - 60}px`
      } else {
        ele.style = originalStyle
      }
    },
    addGoodsFocusDialogFun () {
      this.addGoodsFocusDialog = true
    },
    // 初始化界面 选择关注商品
    selectItem (index) {
      if (this.selectSurplus < 20) {
        if (!this.result[index].selectFlag) {
          this.result[index].selectFlag = true
          this.userSelectedItem.push(this.result[index].itemId)
        } else {
          this.result[index].selectFlag = false
          for (let i = 0; i < this.userSelectedItem.length; i++) {
            if (this.userSelectedItem[i] === this.result[index].itemId) {
              this.userSelectedItem.splice(i, 1)
            }
          }
        }
      }
    },
    getShopId () {
      try {
        chrome.runtime.sendMessage(this.$store.getters.editorExtensionId, {
          type: 'getShopId'
        },
        response => {
          try {
            if (response.code === 200) {
              this.currentShopid = response.currentShopid
              this.$axios.post(this.$api.checkBind, {
                id: this.currentShopid
              }).then(res => {
                if (res.data) {
                  this.isFirstLogin()
                  this.getUserInfo()
                } else {
                  alert('登录的淘宝店铺名与绑定的不符合')
                  this.$router.push('/login')
                  window.location.reload()
                }
              })
            } else {
              alert('没有登录淘宝')
              this.$router.push('/login')
              window.location.reload()
            }
          } catch (error) {
            alert('插件ID与前端不匹配')
            this.$router.push('/login')
            window.location.reload()
          }
        })
      } catch (error) {
        alert('插件ID与前端不匹配')
        this.$router.push('/login')
        window.location.reload()
      }
    },
    isFirstLogin () {
      this.$axios.post(this.$api.isFirst).then(res => {
        if (res) {
          this.firstFocusGoods = true
          this.unFocusList()
        } else {
          // this.initDiv()
          this.isLoading = false;
          this.firstInit()
        }
      })
    },
    initFocusGoodsList () {
      this.initGoodsFocusLoading = true
      this.$axios.post(this.$api.firstFocus, this.userSelectedItem)
        .then(() => {
          this.userSelectedItem = []
          this.initFocusGoodsList = false
          this.initGoodsFocusLoading = false
          this.firstFocusGoods = false
          this.firstComplete = false;
          this.isLoading = false;
          this.firstInit()
        })
    },
    addFocusBtn () {
      this.addGoodsFocusloading = true
      this.$axios.post(this.$api.firstFocus, this.userSelectedItem)
        .then(() => {
          this.$message({
            showClose: true,
            message: '成功添加监控商品',
            type: 'success',
            customClass: 'message-g-zindex'
          })
          this.userSelectedItem = []
          this.addGoodsFocusloading = false
          this.addGoodsFocusDialog = false
          this.focusList()
        })
    },
    // 删除弹窗
    deleteAnaysis (index) {
      this.$confirm(`确定删除该“${this.wrapData[index].rootName}”词根?`, '删除词根', {
        confirmButtonText: '确 定',
        cancelButtonText: '取 消',
        type: 'warning'
      }).then(() => {
        const param = {
          rootName: this.wrapData[index].rootName,
          itemId: this.currentItemId
        }
        // 传参 给后端删除词根 页面div被移除 其他保持不变
        this.$axios.post(this.$api.deleteRoot, param).then(() => {
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success',
            customClass: 'message-g-zindex'
          })
          for (let i = 0; i < this.root.length; i++) {
            if (this.wrapData[index].rootName === this.root[i]) {
              // 删掉词根的名字
              this.root.splice(i, 1)
              break
            }
          }
          for (let i = 0; i < this.checkListRoot.length; i++) {
            if (this.wrapData[index].rootName === this.checkListRoot[i]) {
              // 删掉 checklist的词根名
              this.checkListRoot.splice(i, 1)
              break
            }
          }
          this.wrapData.splice(index, 1)
        })
      }).catch(() => {
        this.$message({
          showClose: true,
          message: '取消删除',
          type: 'warning',
          customClass: 'message-g-zindex'
        })
      })
    },
    // 第一次初始化 请求后端是否把数据准备好，没有的话 一只 4秒轮询 直到 返回true
    firstInit () {
      this.$axios.get(this.$api.initialComplete)
        .then(res => {
          if (res) {
            this.firstComplete = true;
            this.isLoading = true;
          } else {
            this.firstInitComplete = setInterval(() => {
              this.$axios.get(this.$api.initialComplete)
                .then(isCompleted => {
                  this.firstComplete = isCompleted
                  this.isLoading = isCompleted
                })
                .catch(() => {
                  this.firstComplete = false
                  this.isLoading = false
                })
            }, 4000)
          }
        })
        .catch(() => {
          this.firstComplete = true
          this.isLoading = true
        })
    },
    // 加载框 百分比
    initDiv () {
      // this.startLoading = this.$loading({
      //   lock: true,
      //   text: 'Loading',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0.7)',
      //   customClass: 'startLoading'
      // })
      // document.querySelector('.startLoading').innerHTML = `<div class="startLoadingContainer">
      //                                                       <h2>温馨提示</h2>
      //                                                       <div class="anim">
      //                                                         <div class="spinner">
      //                                                           <div class="spinner-container container1">
      //                                                             <div class="circle1"></div>
      //                                                             <div class="circle2"></div>
      //                                                             <div class="circle3"></div>
      //                                                             <div class="circle4"></div>
      //                                                           </div>
      //                                                           <div class="spinner-container container2">
      //                                                             <div class="circle1"></div>
      //                                                             <div class="circle2"></div>
      //                                                             <div class="circle3"></div>
      //                                                             <div class="circle4"></div>
      //                                                           </div>
      //                                                           <!-- container3为了让正方形的四个球效果更好点，相当于延长动画的效果0.1秒 -->
      //                                                           <div class="spinner-container container3">
      //                                                             <div class="circle1"></div>
      //                                                             <div class="circle2"></div>
      //                                                             <div class="circle3"></div>
      //                                                             <div class="circle4"></div>
      //                                                           </div>
      //                                                         </div>
      //                                                         <p>数据正在加载中</p>
      //                                                       </div>
      //                                                     <p class="bottomP">进度<span id="startLoadingNumber"></span>%</p>
      //                                                     <p>请耐心等待~</p>
      //                                                   </div>`
      // this.startLoadingElement = document.getElementById('startLoadingNumber')
      // this.startLoadingTimer = setInterval(() => {
      //   if (this.startLoadingnumber < 90) {
      //     this.startLoadingnumber = this.startLoadingnumber + (Math.random() * 1.5)
      //   } else {
      //     this.startLoadingnumber = this.startLoadingnumber + (Math.random() * 0.4)
      //     if (this.startLoadingnumber >= 99.6) {
      //       clearInterval(this.startLoadingTimer)
      //     }
      //     if (this.firstComplete) {
      //       this.startLoadingnumber = 100
      //     }
      //   }
      // }, 500)
    },
    // 日期
    initData () {
      // console.log(getStore('rootRadarDate').includes('自定义'))
      const str = getStore('rootRadarDate') || ''
      if (str.includes('自定义')) {
        // 正则匹配出开始时间和结束时间
        let reg = /\d{4}(\-|\/|.)\d{1,2}\1\d{1,2}/g;
        this.customTime = str.match(reg)
      } else {
        const myDate = new Date()
        const hours = myDate.getHours()
        if (hours >= 8) {
          this.currentDate = moment().subtract(1, 'days').format('YYYY-MM-DD')
          this.nealThirtyDay = moment().subtract(30, 'days').format('YYYY-MM-DD')
        } else {
          this.nealThirtyDay = moment().subtract(31, 'days').format('YYYY-MM-DD')
          this.currentDate = moment().subtract(2, 'days').format('YYYY-MM-DD')
        }
        this.curBegin = this.nealThirtyDay
        this.curEnd = this.currentDate
        this.thirtyDay = `${this.nealThirtyDay} 至 ${this.currentDate}`
        this.nealDay = `最近30天${this.thirtyDay}`
      }
    },
    // 添加自定义词根
    saveAddWord () {
      if (this.wordInput) {
        const params = {
          rootName: this.wordInput,
          itemId: this.currentItemId
        }
        this.$axios.post(this.$api.addRoot, params).then(() => {
          this.$message({
            showClose: true,
            message: '添加成功',
            type: 'success',
            customClass: 'message-g-zindex'
          })
          this.customerRootQueue.push(this.wordInput)
          this.root.splice(0, 0, this.wordInput)
          this.addCustomerRoot(this.customerRootQueue)
          this.customerRootQueue = []
          this.focusList()
        })
        this.addWorldVisible = false
      } else {
        this.$message({
          showClose: true,
          message: '请输入自定义词根',
          type: 'warning',
          customClass: 'message-g-zindex'
        })
      }
    },
    // 选择排序字段
    choosePxzd (val) {
      this.pxzd = val
      if (val === '词根效率分') {
        this.wrapData.sort(this.compare('efficiency'))
      } else if (val === '直通车花费') {
        this.wrapData.sort(this.compare('totalzCost'))
      } else {
        this.wrapData.sort(this.compare('totalnUv'))
      }
    },
    // 排序
    compare (prop) {
      return (obj1, obj2) => {
        let val1 = obj1[prop]
        let val2 = obj2[prop]
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
          val1 = Number(val1)
          val2 = Number(val2)
        }
        if (val1 > val2) {
          return -1
        } else if (val1 < val2) {
          return 1
        }
        return 0
      }
    },
    // 清空单品整体分析的 checkList
    resetCheckBoxList1 () {
      this.checkSurplus = 0
      this.checkList = []
    },
    // 清空单品整体分析的 checkList
    resetCheckBoxList2 () {
      this.checkSurplus2 = 0
      this.checkList2 = []
    },
    // 防抖函数
    antiShake (fn, context, delay, args) {
      clearTimeout(fn.timeoutID)
      //  在delay秒之内连续触发会刷新setTimeout，从而不能执行到fn
      fn.timeoutID = setTimeout(() => {
        fn.call(context, args)
      }, delay)
    },
    // 修改数据按钮
    repairData () {
      const params = {
        begin: this.curBegin, // yyyy-MM-dd
        end: this.curEnd, // yyyy-MM-dd
        itemId: this.currentItemId // 商品ID
      }
      this.repairDataStatus = true
      this.$axios.post(this.$api.hmFix, params)
        .then(() => {
          this.$message({
            showClose: true,
            message: '后台正在进行为您修复数据',
            type: 'info',
            customClass: 'message-g-zindex'
          })
          this.repairDataStatus = false
        }).catch(() => {
          this.repairDataStatus = false
        })
    },
    /**
       * 单品整体分析的 查看详情按钮 触发一个 表格数据
       */
    globalAnalysisDetailData() {
      this.tableDataTitle = '查看表格数据(单品分析)'
      this.showTableDataDialog = true
      this.tableData = this.singleTableData
      this.totalData = this.saveSingleData.total
    },
    // 鼠标进入词根图表
    enter (index) {
      this.wrapData[index].deleteFlag = true
    },
    // 鼠标离开词根图表
    leave (index) {
      this.wrapData[index].deleteFlag = false
    },
    // 点击图片 显示数据信息
    // 子组件 showGoodsList 的searchGoods传参给父组件，左侧商品列表点击时触发的。
    // 检测后端是否有数据，没有的话 轮训后端
    recursionCheckData () {
      let temp = []
      temp.push(this.currentTitle)
      this.$axios.post(this.$api.checkItemData, this.setParams(temp))
        .then(res => {
          if (res) {
            this.checkGoodsInfoDataLoadingFlag = false
            if (this.checkGoodsInfoDataLoading != null) {
              this.checkGoodsInfoDataLoading.close()
            }
            this.refreshEchartData()
          } else {
            if (!this.checkGoodsInfoDataLoadingFlag) {
              this.checkGoodsInfoDataLoadingFlag = true
              this.checkGoodsInfoDataLoading = this.$loading({
                lock: true,
                text: '正在为你加载商品信息，请稍后...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
              })
            }
            setTimeout(() => {
              this.recursionCheckData()
            }, 3000)
          }
        })
    },
    // 设置轮训后端操作，如果返回true才继续请求该商品的数据，返回false需要再次等待
    recursionCheckDataSecond () {
      let temp = []
      temp.push(this.currentTitle)
      this.setintervalCheckItemDataId = setInterval(() => {
        this.$axios.post(this.$api.checkItemData, this.setParams(temp))
          .then(res => {
            if (res) {
              this.checkGoodsInfoDataLoading = false
              clearInterval(this.setintervalCheckItemDataId)
              this.setintervalCheckItemDataId = null
              this.refreshEchartData()
            } else {
              this.checkGoodsInfoDataLoading = true
            }
          })
      }, 4000)
    },
    // 检查当前点的商品是否是同一个 如果是的话就不刷新 先请求checkData让后端判断这个商品是否要去请求插件爬取数据
    checkDataForEchart (itemId, title) {
      if (this.currentItemId !== itemId) {
        this.currentItemId = itemId
        this.currentTitle = title
        let temp = []
        temp.push(this.currentTitle)
        this.checkGoodsInfoDataLoading = true
        this.$axios.post(this.$api.checkData, this.setParams(temp))
          .then(() => {
            if (this.setintervalCheckItemDataId !== null) {
              clearInterval(this.setintervalCheckItemDataId)
              this.setintervalCheckItemDataId = null
            }
            this.recursionCheckDataSecond()
          })
      }
    },
    // 左侧商品展示 点击商品后请求的
    refreshEchartData () {
      this.searchLoading = true
      this.rootAnalysisCompleteLoading = false
      this.wrapData = []
      this.concealData = []
      // 获取单品整体数据
      this.getSingleItem()
      // 获取所有词根的名字，依次渲染出来
      this.getAllRoot()
    },
    tempData () {
      this.singleChartsData.checkList = ['直通车花费', '直通车访客数']
      this.singleChartsData.xAxisData = ['2018.01.12', '2018.02.12', '2018.03.12', '2018.04.12', '2018.05.12', '2018.06.12', '2018.07.12', '2018.08.12', '2018.09.12', '2018.10.12', '2018.11.12', '2018.12.12']
      this.singleChartsData.yAxis = [
        {
          type: 'value',
          name: '直通车花费',
          position: 'left',
          axisLine: {
            lineStyle: {
              color: '#FFBC2F'
            }
          },
          axisLabel: {
            formatter: '{value}'
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        {
          type: 'value',
          name: '直通车访客数',
          position: 'right',
          axisLine: {
            lineStyle: {
              color: '#7DC92B'
            },
          },
          axisLabel: {
            formatter: '{value}'
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        }
      ]
      this.singleChartsData.series = [{
        name: '直通车花费',
        smooth: true,
        type: 'line',
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
      },
      {
        name: '直通车访客数',
        smooth: true,
        type: 'line',
        yAxisIndex: 1,
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
      },
      ]
    },
    // 未关注列表
    unFocusList () {
      let param = {
        currentPage: this.firstFocusGoodsCurrentPage,
        title: this.initGoodsName.trim().replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, ''),
        pageSize: 16
      }
      this.unFocusListLoading = true
      this.$axios.post(this.$api.searchList, param).then((res) => {
        this.unFocusListLoading = false
        this.unFocus = res.data.list
        this.firstFocusGoodsTotalPage = res.data.totalPage * 16
        for (let i = 0; i < this.unFocus.length; i++) {
          if (this.userSelectedItem.indexOf(this.unFocus[i].itemId) !== -1) {
            Object.assign(this.unFocus[i], {
              selectFlag: true
            })
          } else {
            Object.assign(this.unFocus[i], {
              selectFlag: false
            })
          }
        }
        this.result = this.unFocus
      }).catch(() => {
        this.unFocusListLoading = false
      })
    },
    getFilterUnFocusList () {
      this.firstFocusGoodsCurrentPage = 1;
      this.unFocusList();
    },
    // 获取关注列表
    focusList () {
      this.$axios.get(this.$api.focusList).then(res => {
        let tempData = Object.assign(res.data, {})
        for (let i = 0; i < tempData.length; i++) {
          // 在每个关注列表的 每个数据对象加上 deleteFlag:false,disabled:false 用来显示删除hover和添加关注
          Object.assign(tempData[i], {
            deleteFlag: false
          })
        }
        for (let i = 0; i < tempData.length; i++) {
          if (tempData[i].status !== 0) {
            this.allStatusComplete = false
            break
          } else {
            this.allStatusComplete = true
          }
        }
        this.focusOn = tempData
        if (this.firstFocusListInit) {
          this.firstFocusListInit = false
          this.eightSecondRefreshFocusList()
        }
      })
    },
    eightSecondRefreshFocusList () {
      setInterval(() => {
        this.focusList();
      }, 10000)
    },
    // checkCheckbox 提示不能选择超过2个
    checkCheckbox (val) {
      const name = val.toElement.defaultValue || val.toElement.innerText
      if (this.checkList.length === 2) {
        let flag = false
        this.checkList.forEach((item) => {
          if (item === name) {
            flag = true
          }
        })
        if (!flag) {
          this.checkboxListFlag = true
          setTimeout(() => {
            this.checkboxListFlag = false
          }, 1000)
        } else {
          this.checkboxListFlag = false
        }
      }
    },
    // checkCheckbox2 提示不能选择超过2个
    checkCheckbox2 (val) {
      const name = val.toElement.defaultValue || val.toElement.innerText
      if (this.checkList2.length === 2) {
        let flag = false
        this.checkList2.forEach((item) => {
          if (item === name) {
            flag = true
          }
        })
        if (!flag) {
          this.checkboxList2Flag = true
          setTimeout(() => {
            this.checkboxList2Flag = false
          }, 500)
        } else {
          this.checkboxList2Flag = false
        }
      }
    },
    // 提示 词根雷达 的图表不能超过4个
    checkCheckbox3 (val) {
      const name = val.toElement.defaultValue || val.toElement.innerText
      if (this.checkListRoot.length === 4) {
        let flag = false
        this.checkListRoot.forEach((item) => {
          if (item === name) {
            flag = true
          }
        })
        if (!flag) {
          this.checkboxRootsListFlag = true
          setTimeout(() => {
            this.checkboxRootsListFlag = false
          }, 500)
        } else {
          this.checkboxRootsListFlag = false
        }
      }
    },
    // 保留2位小数
    toFix (val) {
      let turnVal = parseFloat(val).toFixed(2)
      const arr = String(turnVal).split('.')
      if (arr[1] === '00') {
        turnVal = parseInt(arr[0], 10)
      }
      return turnVal
    },
    // 获取词根的所有信息
    getAllRoot () {
      const param = {
        itemId: this.currentItemId,
        title: this.currentTitle
      }
      this.checkListRoot = []
      this.itemLoading = true
      this.$axios.post(this.$api.rootAnalysis, param)
        .then(res => {
          this.$refs.matrix.getMatrixData()
          if (res.data.length <= 3) {
            res.data.foreach(v => {
              this.checkListRoot.push(v)
            })
          } else {
            for (let i = 0; i < res.data.length; i++) {
              this.checkListRoot.push(res.data[i])
              if (i === 2) {
                break
              }
            }
          }
          this.root = res.data
          this.getRootData(this.root)
        })
    },
    /**
       * 将后端的 [{date:'',zCost:'',....}]数据转换成 [{dateList:[{}],zCostList:[{}],.....]
       */
    turnEndDataToJson (data) {
      // 数据保留2位小数
      // 将后端传过来的数据 进行初始化
      let zCostList = []
      let zUvList = []
      let nUvList = []
      let allUvList = []
      let zConversionList = []
      let nConversionList = []
      let allConversionList = []
      let zPayCntList = []
      let nPayCntList = []
      let allPayCntList = []
      let zAddCartList = []
      let nAddCartList = []
      let allAddCartList = []
      let zAddFavList = []
      let nAddFavList = []
      let allAddFavList = []
      let dataTimeList = []
      let total = []
      for (let i = 0; i < data.length - 1; i++) {
        zCostList.push(this.toFix(data[i].zCost))
        zUvList.push(this.toFix(data[i].zUv))
        nUvList.push(this.toFix(data[i].nUv))
        allUvList.push(this.toFix(data[i].allUv))
        zConversionList.push(this.toFix(data[i].zConversion))
        nConversionList.push(this.toFix(data[i].nConversion))
        allConversionList.push(this.toFix(data[i].allConversion))
        zPayCntList.push(this.toFix(data[i].zPayCnt))
        nPayCntList.push(this.toFix(data[i].nPayCnt))
        allPayCntList.push(this.toFix(data[i].allPayCnt))
        zAddCartList.push(this.toFix(data[i].zAddCart))
        // nAddCartListt.push(this.toFix(data[i].nAddCart))
        allAddCartList.push(this.toFix(data[i].allAddCart))
        zAddFavList.push(this.toFix(data[i].zAddFav))
        nAddFavList.push(this.toFix(data[i].nAddFav))
        allAddFavList.push(this.toFix(data[i].allAddFav))
        dataTimeList.push(data[i].dataTime)
      }
      // 和后端约定，最后一个数组是前面的总和
      total = data.pop()
      // total = data[data.length-1];
      let allList = {
        zCostList,
        zUvList,
        nUvList,
        allUvList,
        zConversionList,
        nConversionList,
        allConversionList,
        zPayCntList,
        nPayCntList,
        allPayCntList,
        zAddCartList,
        nAddCartList,
        allAddCartList,
        zAddFavList,
        nAddFavList,
        allAddFavList,
        dataTimeList,
        total
      }
      return allList
    },
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
    // 转换数据
    turnData (checkList, allList, checkListGroup) {
      checkListGroup.forEach((item) => {
        item.isActive = false
      })
      checkList.forEach((item) => {
        checkListGroup.forEach((subItem) => {
          if (item === subItem.label) {
            subItem.isActive = true
          }
        })
      })
      let total = {
        直通车花费: 0,
        直通车访客数: 0,
        自然搜索访客数: 0,
        总访客数: 0,
        直通车转化率: 0,
        自然搜索转化率: 0,
        总转化率: 0,
        直通车成交量: 0,
        自然搜索成交量: 0,
        总成交量: 0,
        直通车加购人数: 0,
        直通车收藏人数: 0
      }
      const arr = []
      checkListGroup.forEach(item => {
        if (item.isActive) {
          let target = item.name.replace(/List/, '')
          total[item.label] = this.toFix(allList.total[target])
          arr.push({
            name: `${item.label}`,
            box: allList[item.name]
          })
        }
      })
      // xAxisData
      let xAxisData = []
      xAxisData = allList.dataTimeList
      const yAxis = []
      const colors = ['#00A7EE', '#FFBD35', '#7DC2FD']
      checkList.forEach((item, index) => {
        let position = 'left'
        if (index === 1) {
          position = 'right'
        }
        yAxis.push({
          type: 'value',
          name: item,
          position,
          axisLine: {
            lineStyle: {
              color: colors[index]
            }
          },
          axisLabel: {
            formatter: '{value}'
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        })
      })
      // series
      const series = []
      arr.forEach((item, index) => {
        let yAxisIndex = 0
        if (index === 1) {
          yAxisIndex = 1
        }
        series.push({
          name: item.name,
          smooth: true,
          type: 'line',
          yAxisIndex,
          data: item.box
        })
      })
      const wrap = {
        total,
        checkList,
        xAxisData,
        yAxis,
        series
      }
      return wrap
    },
    // 终端选择
    chooseZd (val) {
      this.czd = val
      setStore('rootRadarEnd', this.czd)
    },
    // 天数选择
    chooseDate (val) {
      this.nealDay = val
    },
    // 获取单品整体分析数据
    getSingleItem () {
      this.singleItemLoading = true;
      let terminal = 0
      if (this.czd === '全部终端') {
        terminal = 0;
      } else if (this.czd === 'PC端') {
        terminal = 1
      } else {
        terminal = 2
      }
      const params = {
        begin: this.curBegin, // yyyy-MM-dd
        end: this.curEnd, // yyyy-MM-dd
        terminal, // 终端0-全部 1-PC 2-无线
        itemId: this.currentItemId // 商品ID
      }
      this.$axios.post(this.$api.singleItem, params).then(res => {
        this.saveSingleData = this.turnEndDataToJson(res.data)
        this.singleTableData = res.data
        this.globalAnalysisShow = true
        this.singleChartsData = this.turnData(this.checkList, this.saveSingleData, this.checkListGroup)
        this.singleItemLoading = false
      }).catch(() => {
        this.singleItemLoading = false
      })
    },
    // 入参配置
    // root参数 为 词根数组
    setParams (root) {
      let realRoot = root[0]
      let terminal = 0
      if (this.czd === '全部终端') {
        terminal = 0
      } else if (this.czd === 'PC端') {
        terminal = 1
      } else {
        terminal = 2
      }
      let params = {}
      params = {
        begin: this.curBegin, // yyyy-MM-dd
        end: this.curEnd, // yyyy-MM-dd
        terminal, // 终端0-全部 1-无线 2-PC
        rootName: realRoot,
        itemId: this.currentItemId // 商品ID
      }
      return params
    },
    rootAnalysisDetailData (index) {
      this.tableDataTitle = `查看表格数据(词根:${this.wrapData[index].rootName})`
      this.showTableDataDialog = true
      this.tableData = this.wrapData[index].tableData
      this.totalData = this.wrapData[index].totalData
    },
    // 词根分析 递归获取词根数据
    getRootData (root) {
      if (root.length > 0) {
        this.itemLoading = true
        const params = this.setParams(root)
        this.$axios.post(this.$api.rootData, params).then(res => {
          const frontData = this.turnEndDataToJson(res.data.list)
          const rootChartsData = this.turnData(this.checkList2, frontData, this.checkListGroup2)
          let newRoot = Object.assign([], root)
          newRoot.splice(0, 1)
          if (this.wrapData.length < 3) {
            this.rootAnalysisCompleteLoading = false
            this.wrapData.push({
              deleteFlag: false,
              rootChartsData,
              tableData: res.data.list,
              // totalzCost:frontData.total,
              rootName: res.data.rootName,
              id: res.data.id, //  词根id
              totalzCost: frontData.total.zCost,
              totalnUv: frontData.total.nUv,
              efficiency: res.data.efficiency, // 效率分
              singleRootData: frontData, // 单条词根数据
              totalData: frontData.total
            })
            this.concealData.push({
              deleteFlag: false,
              rootChartsData,
              totalzCost: frontData.total.zCost,
              totalnUv: frontData.total.nUv,
              rootName: res.data.rootName,
              id: res.data.id, //  词根id
              efficiency: res.data.efficiency, // 效率分
              singleRootData: frontData // 单条词根数据
            })
          }
          if (this.wrapData.length === 3) {
            newRoot = []
          }
          // 存储全部词根数据
          // this.initialComplete = true;
          if (newRoot.length === 0) {
            this.rootAnalysisCompleteLoading = true
            this.itemLoading = false
          }
          this.getRootData(newRoot)
        }).catch(() => {
          this.itemLoading = false
        });
      } else {
        this.itemLoading = false
      }
    },
    // 当 concealData 没有获取到所有的data时 词根获取
    getRootDataNoneConcealData (root) {
      if (root.length > 0) {
        this.itemLoading = true
        const params = this.setParams(root)
        this.$axios.post(this.$api.rootData, params).then(res => {
          const frontData = this.turnEndDataToJson(res.data.list)
          const rootChartsData = this.turnData(this.checkList2, frontData, this.checkListGroup2)
          this.wrapData.push({
            loading: false,
            deleteFlag: false,
            totalzCost: frontData.total.zCost, // 总的 直通车花费
            totalnUv: frontData.total.nUv, // 总的 自然搜索访客数
            rootChartsData,
            tableData: res.data.list,
            rootName: res.data.rootName,
            id: res.data.id, //  词根id
            efficiency: res.data.efficiency, // 效率分
            singleRootData: frontData, // 单条词根数据
            totalData: frontData.total
          })
          const newRoot = Object.assign([], root)
          newRoot.splice(0, 1)
          this.getRootData(newRoot)
        }).catch(() => {
          this.itemLoading = false
        })
      } else {
        this.itemLoading = false
      }
    },
    // 添加自定义词根
    addCustomerRoot (root) {
      if (root.length > 0) {
        this.rootAnalysisCompleteLoading = false
        if (this.checkListRoot.length < 4) {
          this.checkListRoot.splice(0, 0, root[0])
        }
        this.itemLoading = true
        const params = this.setParams(root)
        this.$axios.post(this.$api.rootData, params).then(res => {
          const frontData = this.turnEndDataToJson(res.data.list)
          const rootChartsData = this.turnData(this.checkList2, frontData, this.checkListGroup2)
          let temp = {
            loading: false,
            deleteFlag: false,
            rootChartsData,
            tableData: res.data.list,
            totalzCost: frontData.total.zCost,
            totalnUv: frontData.total.nUv,
            rootName: res.data.rootName,
            id: res.data.id, //  词根id
            efficiency: res.data.efficiency, // 效率分
            singleRootData: frontData, // 单条词根数据
            totalData: frontData.total
          }
          if (this.wrapData.length < 4) {
            this.wrapData.splice(0, 0, temp)
          }
          this.concealData.splice(0, 0, temp)
          // this.initialComplete = true;
          const newRoot = Object.assign([], root)
          newRoot.splice(0, 1)
          this.addCustomerRoot(newRoot)
        }).catch(() => {
          this.itemLoading = false
        })
      } else {
        this.rootAnalysisCompleteLoading = true
        this.itemLoading = false
      }
    },
    // 添加自定义词根
    loadNewRoot (root) {
      if (root.length > 0) {
        this.rootAnalysisCompleteLoading = false
        this.itemLoading = true
        const params = this.setParams(root)
        this.$axios.post(this.$api.rootData, params).then((res) => {
          const frontData = this.turnEndDataToJson(res.data.list)
          const rootChartsData = this.turnData(this.checkList2, frontData, this.checkListGroup2)
          let temp = {
            loading: false,
            deleteFlag: false,
            rootChartsData,
            tableData: res.data.list,
            totalzCost: frontData.total.zCost,
            totalnUv: frontData.total.nUv,
            rootName: res.data.rootName,
            id: res.data.id, //  词根id
            efficiency: res.data.efficiency, // 效率分
            singleRootData: frontData, // 单条词根数据
            totalData: frontData.total
          }
          if (this.wrapData.length < 4) {
            this.wrapData.splice(0, 0, temp)
          }
          this.concealData.splice(0, 0, temp)
          // this.initialComplete = true;
          const newRoot = Object.assign([], root)
          newRoot.splice(0, 1)
          this.loadNewRoot(newRoot)
        }).catch(() => {
          this.itemLoading = false
        })
      } else {
        this.rootAnalysisCompleteLoading = true
        this.itemLoading = false
      }
    },
    showKeyWord () {
      this.isShowKeyWord = true
      this.$refs.keyWordDialog.showDialog()
    },
    cancelLoading () {
      this.isLoading = false
      this.$refs.loading.cancelLoading()
    }
  },
  watch: {
    // 初始化 界面的商品过滤输入框
    initGoodsName () {
      this.antiShake(this.getFilterUnFocusList, null, 800, null)
    },
    // 首次登录判断
    firstComplete (val) {
      if (val) {
        // clearInterval(this.firstInitComplete)
        // setTimeout(() => {
        //   this.startLoadingnumber = 100
        // }, 500)
        this.initData()
        this.focusList()
        this.unFocusList()
        // console.log('fffffffffffffffffffffffffirt')
        // this.watchLogin();
        //      关注列表
      }
    },
    // 首次登录 过渡效果
    startLoadingnumber (val) {
      // document.getElementById('startLoadingNumber').innerText = `${this.toFix(val)}`
      // if (val >= 100) {
      //   clearInterval(this.startLoadingTimer)
      //   this.startLoading.close()
      // }
    },
    // 时间改变请求数据
    nealDay (val) {
      if (val.includes('最近30天')) {
        this.curBegin = this.nealThirtyDay
        this.turnNealDay = `最近30天（${this.thirtyDay}）`
        if (this.firstDateInit) {
          this.firstDateInit = false
        } else {
          this.getSingleItem()
          this.wrapData = []
          this.getRootData(this.root)
        }
      }
    },
    // 监听自定义时间设置
    customTime (val) {
      let start = new Date(val[0])
      let end = new Date(val[1])
      this.curBegin = `${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()}`
      this.curEnd = `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`
      this.turnNealDay = `自定义（${this.curBegin} 至 ${this.curEnd}）`
      this.wrapData = []
      this.getSingleItem()
      this.getRootData(this.root)
    },
    turnNealDay(val) {
      setStore('rootRadarDate', val)
    },
    // 改变终端请求
    czd () {
      this.getSingleItem()
      this.wrapData = []
      this.getRootData(this.root)
    },
    // 改变单品CheckBox
    checkList (val) {
      if (this.checkList.length === 0) {
        this.globalAnalysisShow = false
      } else {
        this.globalAnalysisShow = true
      }
      this.checkSurplus = this.checkList.length
      this.singleChartsData = this.turnData(val, this.saveSingleData, this.checkListGroup)
    },
    // 改变单品CheckBox2
    checkList2 (val) {
      this.checkSurplus2 = this.checkList2.length
      this.wrapData.forEach((item) => {
        const rootChartsData = this.turnData(val, item.singleRootData, this.checkListGroup2)
        item.rootChartsData = rootChartsData
      })
    },
    // 监听当前页数的变化
    firstFocusGoodsCurrentPage () {
      this.unFocusList()
    },
    firstFocusGoods (val) {
      if (!val) {
        this.userSelectedItem = []
      }
    },
    // 词根显示的个数的监听
    checkListRoot (val) {
      console.log(this.concealData)
      if (val.length >= 4) {
        this.maxEcharts = true
      } else {
        this.maxEcharts = false
      }
      if (this.rootAnalysisCompleteLoading) {
        // 判断concealData 是否取到 我们想要的数据，现在暂时不用这个，
        let flag = false
        // this.checkSurplus2 = this.checkList2.length;
        if (val.length > this.wrapData.length) {
          for (let i = 0; i < this.concealData.length; i++) {
            if (this.concealData[i].rootName === val[val.length - 1]) {
              this.wrapData.splice(0, 0, this.concealData[i])
              flag = true
            }
          }
          if (!flag) {
            this.loadNewRoot([val[val.length - 1]])
          }
        } else {
          for (let i = 0; i < this.wrapData.length; i++) {
            if (val.indexOf(this.wrapData[i].rootName) === -1) {
              this.wrapData.splice(i, 1)
            }
          }
        }
      }
    },
    userSelectedItem (val) {
      this.selectSurplus = val.length
    },
    // 当添加商品的dialog关闭后 用户所选的就清楚
    addGoodsFocusDialog (val) {
      if (!val) {
        this.initGoodsName = ''
        this.userSelectedItem = []
      } else {
        this.unFocusList()
      }
    }
  },
  beforeDestroy() {
    this.cancelLoading()
  },
}
</script>
