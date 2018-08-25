<template src="./index.html">

</template>

<style lang="less" src="./index.less">

</style>

<script>
  import {
    mapGetters
  } from 'vuex';
  import moment from 'moment';
  import lineChart from '../../components/lineChart';
  import toolTableData from './tableData';
  import toolAnalysisData from './analysisData';
  import toolComparedData from './comparedData';
  import backTop from '../../components/backToTop';
  import pagination from '../../components/pagination';
  export default {

    name: 'Tool',
    components: {
      lineChart,
      toolTableData,
      toolAnalysisData,
      toolComparedData,
      backTop,
      pagination,
    },
    data() {
      return {
        searchLoading: false,
        searchInput: '', // 搜索
        // 重点关注
        focusOn: [],
        // 最近浏览
        recentBrowse: [],
        goodsUrl: '', // 商品url
        goodsTitle: '', // 商品标题
        goodsId: '', // 商品ID
        goodsPrice: '', // 商品价格
        split: false, // 是否自己分词
        isCollect: false, // 是否关注
        czd: '全部终端', // 终端展示
        nealDay: '', // 最近天数
        oneDay: '',
        sevenDay: '',
        thirtyDay: '',
        singleItemLoading: false, // 单品整体分析loading
        checkList: ['直通车花费', '自然搜索访客数'],
        singleChartsData: {
          checkList: [],
          xAxisData: [],
          yAxis: {},
          series: {},
        }, // 单品整体分析图表数据
        checkListGroup: [{
            label: '直通车花费',
            disabled: false,
            isActive: false,
            name: 'zCostList',
          },
          {
            label: '直通车访客数',
            disabled: false,
            isActive: false,
            name: 'zVisitList',
          },
          {
            label: '自然搜索访客数',
            disabled: false,
            isActive: false,
            name: 'rVisitList',
          },
          {
            label: '直通车转化率',
            disabled: false,
            isActive: false,
            name: 'zTransformList',
          },
          {
            label: '自然搜索转化率',
            disabled: false,
            isActive: false,
            name: 'rTransformList',
          },
          {
            label: '直通车成交量',
            disabled: false,
            isActive: false,
            name: 'zDealList',
          },
          {
            label: '自然搜索成交量',
            disabled: false,
            isActive: false,
            name: 'rDealList',
          },
        ],
        checkList2: ['直通车花费', '自然搜索访客数'],
        checkListGroup2: [{
            label: '直通车花费',
            disabled: false,
            isActive: false,
            name: 'zCostList',
          },
          {
            label: '直通车访客数',
            disabled: false,
            isActive: false,
            name: 'zVisitList',
          },
          {
            label: '自然搜索访客数',
            disabled: false,
            isActive: false,
            name: 'rVisitList',
          },
          {
            label: '直通车转化率',
            disabled: false,
            isActive: false,
            name: 'zTransformList',
          },
          {
            label: '自然搜索转化率',
            disabled: false,
            isActive: false,
            name: 'rTransformList',
          },
          {
            label: '直通车成交量',
            disabled: false,
            isActive: false,
            name: 'zDealList',
          },
          {
            label: '自然搜索成交量',
            disabled: false,
            isActive: false,
            name: 'rDealList',
          },
        ],
        root: [{
          createTs: 1527688117000,
          id: 780,
          root: '睡衣',
          taoId: '527723490416',
          type: 1,
          userId: 1,
        }], // 分词列表
        isShow: false,
        pxzd: '标题分词排序', // 排序字段
        addWorldVisible: false, // 自定义词根model show
        wordInput: '', // 自定义词根值
        wrapData: [],
        curBegin: '', // 当前选中开始时间
        curEnd: '', // 当前选中结束时间
        rootAnalysisLoading: false,
        saveSingleData: {}, // 保存单品整体分析返回数据
        turnNealDay: '', // 时间选择转换样式
        customTime: [], // 自定义时间
        customFlag: false, // 是否显示自定义
        checkboxListFlag: false, // 多选提示
        checkboxList2Flag: false,
        itemLoading: false, // 词根分析loading
        shopName: '', // 店铺名
        timer: null, // 定时器
        taobaoLoginVisible: false,
        taobaoLoading: false,
        dataSearchFlag: false,
      };
    },
    computed: {
      ...mapGetters(['test']),
    },
    mounted() {
      this.watchLogin();
      this.focusList();
      this.searchList();
      const myDate = new Date();
      const hours = myDate.getHours();
      if (hours >= 8) {
        this.currentDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
        this.nealOneDay = moment().subtract(2, 'days').format('YYYY-MM-DD');
        this.nealSevenDay = moment().subtract(8, 'days').format('YYYY-MM-DD');
        this.nealThirtyDay = moment().subtract(31, 'days').format('YYYY-MM-DD');
      } else {
        this.currentDate = moment().subtract(2, 'days').format('YYYY-MM-DD');
        this.nealOneDay = moment().subtract(3, 'days').format('YYYY-MM-DD');
        this.nealSevenDay = moment().subtract(9, 'days').format('YYYY-MM-DD');
        this.nealThirtyDay = moment().subtract(32, 'days').format('YYYY-MM-DD');
      }
      this.oneDay = `${this.nealOneDay} 至 ${this.currentDate}`;
      this.sevenDay = `${this.nealSevenDay} 至 ${this.currentDate}`;
      this.thirtyDay = `${this.nealThirtyDay} 至 ${this.currentDate}`;
      this.curBegin = this.nealSevenDay;
      this.curEnd = this.currentDate;
      this.nealDay = `最近7天${this.sevenDay}`;
    },
    methods: {
      // 搜索商品
      searchGoods(id) {
        if (this.shopName) {
          this.searchLoading = true;
          this.$axios.post(this.$api.search, {
            keyword: id,
          }).then((res) => {
            this.goodsUrl = res.data.image;
            this.goodsTitle = res.data.name;
            this.goodsId = res.data.itemId;
            this.goodsPrice = res.data.price;
            this.isCollect = res.data.focus;
            this.isShow = true;
            this.searchLoading = false;
            this.split = res.data.split;
            this.wrapData = [];
            this.getSingleItem();
            if (res.data.split) {
              this.getTmallSplit();
            } else {
              this.getOurRoot();
            }
          }).catch(() => {
            this.searchLoading = false;
          });
        } else {
          this.taobaoLoginVisible = true;
          this.dataSearchFlag = false;
          setTimeout(() => {
            this.dataSearchFlag = true;
          }, 5000);
        }
      },
      // 获取单品整体分析数据
      getSingleItem() {
        this.singleItemLoading = true;
        let terminal = 0;
        if (this.czd === '全部终端') {
          terminal = 0;
        } else if (this.czd === '移动端') {
          terminal = 1;
        } else {
          terminal = 2;
        }
        const params = {
          begin: this.curBegin, // yyyy-MM-dd
          end: this.curEnd, // yyyy-MM-dd
          terminal, // 终端 0-全部 1-无线 2-PC
          itemId: this.goodsId, // 商品ID
        };
        this.$axios.post(this.$api.singleItem, params).then((res) => {

          this.saveSingleData = res.data;
          //   选中的 checkBox
          this.singleChartsData = this.turnData(this.checkList, res.data, this.checkListGroup);
          this.singleItemLoading = false;
        }).catch(() => {
          this.singleItemLoading = false;
        });
      },
      // 词根分析 递归获取词根数据
      getRootAnalysis(root) {
        if (root.length > 0) {
          this.itemLoading = true;
          const params = this.setParams(root);
          this.$axios.post(this.$api.rootAnalysis, params).then((res) => {
            const rootChartsData = this.turnData(this.checkList2, res.data, this.checkListGroup2);
            this.wrapData.push({
              loading: false,
              lookTableVisible: false, // 查看表格model
              wordAnalysisVisible: false, // 相关搜索词model
              comparedVisible: false, // 同词根宝贝对比model
              deleteFlag: false,
              rootChartsData,
              root: root[0].root, // 词根
              id: root[0].id,
              grailRevel: res.data.grailRevel, // 大盘展现指数
              grailIncrease: res.data.grailIncrease, // 大盘展现指数涨幅
              competition: res.data.competition, // 竞争度
              efficiency: res.data.efficiency, // 效率分
              wordData: [], // 相关搜索词分析数据
              tableData: [], // 查看表格数据
              comparedData: [], // 同词根宝贝对比
              zVisit: res.data.zVisit, // 直通车访客数
              rVisit: res.data.rVisit, // 自然搜索访客数
              zTransform: res.data.zTransform, // 直通车转化率
              rTransform: res.data.rTransform, // 自然搜索转化率
              zDeal: res.data.zDeal, // 直通车成交量
              rDeal: res.data.rDeal, // 自然搜索成交量
              singleRootData: res.data, // 单条词根数据

              comparedPage: {
                pageSize: 10, // 每页数据条数
                currentPage: 1, // 当前页 从1开始
                totalRecords: 0,
              },
              tablePage: {
                pageSize: 10, // 每页数据条数
                currentPage: 1, // 当前页 从1开始
                totalRecords: 0,
              },
              wordPage: {
                pageSize: 10, // 每页数据条数
                currentPage: 1, // 当前页 从1开始
                totalRecords: 0,
              },

            });
            const newRoot = Object.assign([], root);
            newRoot.splice(0, 1);
            this.getRootAnalysis(newRoot);
          }).catch(() => {
            this.itemLoading = false;
          });
        } else {
          this.itemLoading = false;
        }
      },
      // 入参配置
      setParams(root, type, currentPage, pageSize) {
        let realRoot = root[0].root;
        if (type === 0) {
          realRoot = root;
        }
        let terminal = 0;
        if (this.czd === '全部终端') {
          terminal = 0;
        } else if (this.czd === '移动端') {
          terminal = 1;
        } else {
          terminal = 2;
        }
        let params = {};
        if (currentPage) {
          params = {
            begin: this.curBegin, // yyyy-MM-dd
            end: this.curEnd, // yyyy-MM-dd
            terminal, // 终端0-全部 1-无线 2-PC
            root: realRoot,
            currentPage,
            pageSize,
            itemId: this.goodsId, // 商品ID
            shopName: this.shopName, // 店铺名称
          };
        } else {
          params = {
            begin: this.curBegin, // yyyy-MM-dd
            end: this.curEnd, // yyyy-MM-dd
            terminal, // 终端0-全部 1-无线 2-PC
            root: realRoot,
            itemId: this.goodsId, // 商品ID
            shopName: this.shopName, // 店铺名称
          };
        }
        return params;
      },
      // 转换数据
      turnData(checkList, data, checkListGroup) {
        // 数据保留2位小数
        data.rDealList.forEach((item) => {
          item.value = this.toFix(item.value);
        });
        data.rTransformList.forEach((item) => {
          item.value = this.toFix(item.value);
        });
        data.rVisitList.forEach((item) => {
          item.value = this.toFix(item.value);
        });
        data.zCostList.forEach((item) => {
          item.value = this.toFix(item.value);
        });
        data.zDealList.forEach((item) => {
          item.value = this.toFix(item.value);
        });
        data.zTransformList.forEach((item) => {
          item.value = this.toFix(item.value);
        });
        data.zVisitList.forEach((item) => {
          item.value = this.toFix(item.value);
        });
        checkListGroup.forEach((item) => {
          item.isActive = false;
        });
        checkList.forEach((item) => {
          checkListGroup.forEach((subItem) => {
            if (item === subItem.label) {
              subItem.isActive = true;
            }
          });
        });
        const arr = [];
        checkListGroup.forEach((item) => {
          if (item.isActive) {
            arr.push({
              name: item.label,
              box: data[item.name],
            });
          }
        });
        // xAxisData
        const xAxisData = [];
        arr[0].box.forEach((item) => {
          xAxisData.push(item.date);
        });
        // yAxis
        const yAxis = [];
        const colors = ['#FFBC2F', '#7DC92B', '#7DC2FD'];
        checkList.forEach((item, index) => {
          let position = 'left';
          if (index === 1) {
            position = 'right';
          }
          yAxis.push({
            type: 'value',
            name: item,
            position,
            axisLine: {
              lineStyle: {
                color: colors[index],
              },
            },
            axisLabel: {
              formatter: '{value}',
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          });
        });
        // series
        const series = [];
        arr.forEach((item, index) => {
          let yAxisIndex = 0;
          if (index === 1) {
            yAxisIndex = 1;
          }
          const seriesData = [];
          item.box.forEach((subItem) => {
            seriesData.push(subItem.value);
          });
          series.push({
            name: item.name,
            smooth: true,
            type: 'line',
            yAxisIndex,
            data: seriesData,
          });
        });
        const wrap = {
          checkList,
          xAxisData,
          yAxis,
          series,
        };
        return wrap;
      },
      // 保留2位小数
      toFix(val) {
        let turnVal = parseFloat(val).toFixed(2);
        const arr = String(turnVal).split('.');
        if (arr[1] === '00') {
          turnVal = parseInt(arr[0], 10);
        }
        return turnVal;
      },
      // 获取自己分词列表
      getOurRoot() {
        this.$axios.get(`${this.$api.getRoot}?itemId=${this.goodsId}`).then((res) => {
          this.root = res.data;
          this.getRootAnalysis(this.root);
        });
      },
      // 获取天猫分词列表
      getTmallSplit() {
        const params = {
          itemId: this.goodsId,
          name: this.goodsTitle,
        };
        this.$axios.post(this.$api.tmallSplit, params).then((res) => {
          this.root = res.data;
          this.getRootAnalysis(this.root);
        });
      },
      // 获取关注列表
      focusList() {
        this.$axios.get(this.$api.focusList).then((res) => {
          this.focusOn = res.data;
        });
      },
      // 最近浏览列表
      searchList() {
        this.$axios.get(this.$api.searchList).then((res) => {
          this.recentBrowse = res.data;
        });
      },
      // 添加关注
      collect() {
        const params = {
          // image: this.goodsUrl,
          itemId: this.goodsId,
          // name: this.goodsTitle,
          // price: this.goodsPrice,
        };
        this.$axios.post(this.$api.focus, params).then(() => {
          this.focusList();
          this.isCollect = true;
          this.$notify('关注成功', 'success', 'success');
        });
      },
      // 取消关注
      cancelCollect() {
        this.$axios.delete(`${this.$api.unFocus}?itemId=${this.goodsId}`).then(() => {
          this.focusList();
          this.isCollect = false;
          this.$notify('取消关注成功', 'success', 'success');
        });
      },
      // 终端选择
      chooseZd(val) {
        this.czd = val;
      },
      // 天数选择
      chooseDate(val) {
        this.nealDay = val;
      },
      // 单品整体分析checkbox检验
      changeCheckList() {
        console.log(this.checkList);
      },
      // 选择排序字段
      choosePxzd(val) {
        this.pxzd = val;
        if (val === '标题分词排序') {
          this.compare2();
        } else if (val === '效率分') {
          this.wrapData.sort(this.compare('efficiency'));
        } else if (val === '竞争度') {
          this.wrapData.sort(this.compare('competition'));
        }
      },
      // 展示-添加自定义词根弹框
      addWord() {
        this.addWorldVisible = true;
      },
      // 添加自定义词根
      saveAddWord() {
        if (this.wordInput) {
          const params = {
            root: this.wordInput,
            taoId: this.goodsId,
          };
          this.$axios.post(this.$api.addRoot, params).then((res) => {
            this.$notify('添加成功', 'success', 'success');
            this.getIndexData(this.wordInput, res.data.id);
          });
          this.addWorldVisible = false;
        } else {
          this.$notify('请输入自定义词根', 'warning', 'warning');
        }
      },
      // 单独请求词根数据
      getIndexData(root, id) {
        const params = this.setParams(root, 0);
        this.$axios.post(this.$api.rootAnalysis, params).then((res) => {
          this.root.push({
            root,
            id,
          });
          const rootChartsData = this.turnData(this.checkList2, res.data, this.checkListGroup2);
          this.wrapData.push({
            loading: false,
            lookTableVisible: false, // 查看表格model
            wordAnalysisVisible: false, // 相关搜索词model
            comparedVisible: false, // 同词根宝贝对比model
            deleteFlag: false,
            rootChartsData,
            root, // 词根
            id,
            grailRevel: res.data.grailRevel, // 大盘展现指数
            grailIncrease: res.data.grailIncrease, // 大盘展现指数涨幅

            efficiency: res.data.efficiency, // 效率分
            competition: res.data.competition, // 竞争度
            wordData: [], // 相关搜索词分析数据
            tableData: [], // 查看表格数据
            comparedData: [], // 同词根宝贝对比
            zVisit: res.data.zVisit, // 直通车访客数
            rVisit: res.data.rVisit, // 自然搜索访客数
            zTransform: res.data.zTransform, // 直通车转化率
            rTransform: res.data.rTransform, // 自然搜索转化率
            zDeal: res.data.zDeal, // 直通车成交量
            rDeal: res.data.rDeal, // 自然搜索成交量
            comparedPage: {
              pageSize: 10, // 每页数据条数
              currentPage: 1, // 当前页 从1开始
              totalRecords: 0,
            },
            tablePage: {
              pageSize: 10, // 每页数据条数
              currentPage: 1, // 当前页 从1开始
              totalRecords: 0,
            },
            wordPage: {
              pageSize: 10, // 每页数据条数
              currentPage: 1, // 当前页 从1开始
              totalRecords: 0,
            },
          });
        });
      },
      // 打开查看表格数据弹框
      lookTableData(index) {
        this.wrapData[index].wordAnalysisVisible = false;
        this.wrapData[index].comparedVisible = false;
        this.wrapData[index].lookTableVisible = !this.wrapData[index].lookTableVisible;
        if (this.wrapData[index].lookTableVisible) {
          this.getTableData(this.wrapData[index].root, index);
        }
      },
      // 打开相关搜索词弹框
      lookWordAnalysis(index) {
        this.wrapData[index].comparedVisible = false;
        this.wrapData[index].lookTableVisible = false;
        this.wrapData[index].wordAnalysisVisible = !this.wrapData[index].wordAnalysisVisible;
        if (this.wrapData[index].wordAnalysisVisible) {
          this.getRelateRoot(this.wrapData[index].root, index);
        }
      },
      // 打开同词根宝贝对比
      comparedData(index) {
        this.wrapData[index].lookTableVisible = false;
        this.wrapData[index].wordAnalysisVisible = false;
        this.wrapData[index].comparedVisible = !this.wrapData[index].comparedVisible;
        if (this.wrapData[index].comparedVisible) {
          this.getComparedBaby(this.wrapData[index].root, index);
        }
      },
      // enter
      enter(index) {
        this.wrapData[index].deleteFlag = true;
      },
      // leave
      leave(index) {
        this.wrapData[index].deleteFlag = false;
      },
      // 删除词根
      deleteData(index, id) {
        this.$confirm('确定删除该词根?', '提示', {
          confirmButtonText: '确 定',
          cancelButtonText: '取 消',
          type: 'warning',
        }).then(() => {
          this.$axios.post(this.$api.deleteRoot,).then(() => {
            this.$notify('删除成功', 'success', 'success');
            this.root.forEach((item, index2) => {
              if (item.id === id) {
                this.root.splice(index2, 1);
              }
            });
            this.wrapData.splice(index, 1);
          });
        }).catch(() => {
          console.log('cancel');
        });
      },
      // 相关搜索词分析，获取数据
      getRelateRoot(root, index) {
        this.wrapData[index].loading = true;
        const params = {
          date: this.nealOneDay,
          root,
          currentPage: this.wrapData[index].wordPage.currentPage,
          pageSize: this.wrapData[index].wordPage.pageSize,
          itemId: this.goodsId, // 商品ID
          shopName: this.shopName, // 店铺名称
          column: 1, // 按关键词排序
          order: 'desc', // 降序
        };
        this.$axios.post(this.$api.relateRoot, params).then((res) => {
          res.data.data.forEach((item) => {
            item.avgPrice = parseFloat(item.avgPrice);
            item.click = parseFloat(item.click);
            item.clickChangeRate = parseFloat(item.clickChangeRate);
            item.clickRate = parseFloat(item.clickRate);
            item.competition = parseFloat(item.competition);
            item.impression = parseFloat(item.impression);
          });
          this.wrapData[index].wordData = res.data.data;
          this.wrapData[index].wordPage.totalRecords = res.data.totalRecords;
          this.wrapData[index].loading = false;
        }).catch(() => {
          this.wrapData[index].loading = false;
        });
      },
      // 相关搜索词分析分页
      handleCurrentChange2(data) {
        this.wrapData[data.index].wordPage.currentPage = data.currentPage;
        this.getRelateRoot(this.wrapData[data.index].root, data.index);
      },
      // 查看表格数据
      getTableData(root, index) {
        this.wrapData[index].loading = true;
        let terminal = 0;
        if (this.czd === '全部终端') {
          terminal = 0;
        } else if (this.czd === '移动端') {
          terminal = 1;
        } else {
          terminal = 2;
        }
        const params = {
          begin: this.curBegin, // yyyy-MM-dd
          end: this.curEnd, // yyyy-MM-dd
          terminal, // 终端0-全部 1-无线 2-PC
          root,
          itemId: this.goodsId, // 商品ID
          shopName: this.shopName, // 店铺名称
          column: 1, // 按效率分排序
          order: 'desc', // 降序
        };
        // const params = this.setParams(root, 0, this.wrapData[index].tablePage.currentPage, this.wrapData[index].tablePage.pageSize);
        this.$axios.post(this.$api.rootChart, params).then((res) => {
          res.data.detailDtoList.forEach((item) => {
            item.efficiency = parseFloat(item.efficiency);
            item.rDeal = parseFloat(item.rDeal);
            item.rVisit = parseFloat(item.rVisit);
            item.zCost = parseFloat(item.zCost);
            item.zDeal = parseFloat(item.zDeal);
            item.zTransform = parseFloat(item.zTransform);
            item.zVisit = parseFloat(item.zVisit);
          });
          this.wrapData[index].tableData = res.data;
          // this.wrapData[index].tablePage.totalRecords = res.data.totalRecords;
          this.wrapData[index].loading = false;
        }).catch(() => {
          this.wrapData[index].loading = false;
        });
      },
      // 表格分页
      handleCurrentChange(data) {
        this.wrapData[data.index].tablePage.currentPage = data.currentPage;
        this.getTableData(this.wrapData[data.index].root, data.index);
        console.log(data);
      },
      // 同词根宝贝对比
      getComparedBaby(root, index) {
        this.wrapData[index].loading = true;
        const params = this.setParams(root, 0, this.wrapData[index].comparedPage.currentPage, this.wrapData[index].comparedPage.pageSize);
        this.$axios.post(this.$api.rootItems, params).then((res) => {
          this.wrapData[index].comparedData = res.data.records;
          this.wrapData[index].comparedPage.totalRecords = res.data.totalRecords;
          this.wrapData[index].loading = false;
        }).catch(() => {
          this.wrapData[index].loading = false;
        });
      },
      // 同词根宝贝对比分页
      handleCurrentChange3(data) {
        this.wrapData[data.index].comparedPage.currentPage = data.currentPage;
        this.getComparedBaby(this.wrapData[data.index].root, data.index);
      },
      // 同词根宝贝对比，改变子组件中的checkbox，返回数据并重新请求结果
      subInfoGetData(data) {
        const index = data.index;
        this.wrapData[index].loading = true;
        let terminal = 0;
        if (this.czd === '全部终端') {
          terminal = 0;
        } else if (this.czd === '移动端') {
          terminal = 1;
        } else {
          terminal = 2;
        }
        data.checkListGroup.forEach((item) => {
          item.isActive = false;
        });
        data.checkList.forEach((item) => {
          data.checkListGroup.forEach((subItem) => {
            if (item === subItem.label) {
              subItem.isActive = true;
            }
          });
        });
        const params = {
          begin: this.curBegin, // yyyy-MM-dd
          end: this.curEnd, // yyyy-MM-dd
          zCost: data.checkListGroup[0].isActive, // 直通车花费
          zVisit: data.checkListGroup[1].isActive, // 直通车访客数
          rVisit: data.checkListGroup[2].isActive, // 自然搜索访客数
          zTransform: data.checkListGroup[3].isActive, // 直通车转化率
          rTransform: data.checkListGroup[4].isActive, // 自然搜索转化率
          zDeal: data.checkListGroup[5].isActive, // 直通车成交量
          rDeal: data.checkListGroup[6].isActive, // 自然搜索成交量
          terminal, // 终端0-全部 1-无线 2-PC
          root: data.root,
        };
        this.$axios.post(this.$api.rootItems, params).then((res) => {
          this.wrapData[index].comparedData = res.data;
          this.wrapData[index].loading = false;
        }).catch(() => {
          this.wrapData[index].loading = false;
        });
      },
      // 排序
      compare(prop) {
        return (obj1, obj2) => {
          let val1 = obj1[prop];
          let val2 = obj2[prop];
          if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            val1 = Number(val1);
            val2 = Number(val2);
          }
          if (val1 > val2) {
            return -1;
          } else if (val1 < val2) {
            return 1;
          }
          return 0;
        };
      },
      // 排序
      compare2() {
        const arr = [];
        this.root.forEach((item) => {
          this.wrapData.forEach((subItem) => {
            if (item.id === subItem.id) {
              arr.push(subItem);
            }
          });
        });
        this.wrapData = arr;
      },
      // checkCheckbox
      checkCheckbox(val) {
        const name = val.toElement.defaultValue || val.toElement.innerText;
        if (this.checkList.length === 2) {
          let flag = false;
          this.checkList.forEach((item) => {
            if (item === name) {
              flag = true;
            }
          });
          if (!flag) {
            console.log('最多选择两项');
            this.checkboxListFlag = true;
          } else {
            this.checkboxListFlag = false;
          }
        }
      },
      // checkCheckbox2
      checkCheckbox2(val) {
        const name = val.toElement.defaultValue || val.toElement.innerText;
        if (this.checkList2.length === 2) {
          let flag = false;
          this.checkList2.forEach((item) => {
            if (item === name) {
              flag = true;
            }
          });
          if (!flag) {
            console.log('最多选择两项');
            this.checkboxList2Flag = true;
          } else {
            this.checkboxList2Flag = false;
          }
        }
      },
      // 开启监听，是否已登录，去拿店铺信息
      watchLogin() {
        this.timer = setInterval(() => {
          const data = document.getElementById('taobao-extension-data').value;
          if (data === '{}' || data === '') {
            this.isLoginTaobao = false;
            // console.log('data=', data);
          } else {
            // console.log('data=', data);
            const taobaoData = JSON.parse(data);
            this.isLoginTaobao = true;
            this.shopName = taobaoData.nickName;
            this.taobaoLoading = false;
            this.taobaoLoginVisible = false;
            this.dataSearchFlag = false;
            clearInterval(this.timer);
          }
        }, 200);
      },
      // 跳转直通车登录
      loginToTaobao() {
        this.taobaoLoading = true;
        this.watchLogin();
        window.open('http://zhitongche.taobao.com/');
      },
    },
    watch: {
      // 时间改变请求数据
      nealDay(val) {
        // if (val.includes('最近1天')) {
        //   this.curBegin = this.nealOneDay;
        //   this.turnNealDay = `最近1天（${this.oneDay}）`;
        // } else if (val.includes('最近7天')) {
        //   this.curBegin = this.nealSevenDay;
        //   this.turnNealDay = `最近7天（${this.sevenDay}）`;
        // } else
        if (val.includes('最近30天')) {
          this.curBegin = this.nealThirtyDay;
          this.turnNealDay = `最近30天（${this.thirtyDay}）`;
        }
        if (val.includes('自定义')) {
          console.log('自定义', this.customTime);
        } else {
          if (this.isShow) {
            // 清空数据
            this.wrapData = [];
            this.getSingleItem();
            this.getRootAnalysis(this.root);
          }
        }
      },
      // 监听自定义时间设置
      customTime(val) {
        this.curBegin = val[0];
        this.curEnd = val[1];
        this.turnNealDay = `自定义（${this.curBegin} 至 ${this.curEnd}）`;
        if (this.isShow) {
          this.wrapData = [];
          this.getSingleItem();
          this.getRootAnalysis(this.root);
        }
      },
      // 改变终端请求
      czd() {
        if (this.isShow) {
          this.getSingleItem();
          this.wrapData = [];
          this.getRootAnalysis(this.root);
        }
      },
      // 改变单品CheckBox
      checkList(val) {
        this.singleChartsData = this.turnData(val, this.saveSingleData, this.checkListGroup);
      },
      // 改变单品CheckBox2
      checkList2(val) {
        this.wrapData.forEach((item) => {
          const rootChartsData = this.turnData(val, item.singleRootData, this.checkListGroup2);
          item.rootChartsData = rootChartsData;
        });
      },
    },
  };
</script>
