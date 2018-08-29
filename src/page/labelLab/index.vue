<template src="./index.html">

</template>

<style lang="less" src="./index.less">

</style>

<script>
import draggable from 'vuedraggable';
import datePicker from '@/components/datePicker/index';
import createGroup from '@/components/createGroup/index';
import modifyGroups from '@/components/modifyGroups/index';
import peopleRate from '@/components/peopleRate/index';
import premium from '@/components/premium/index';
import peopleMove from '@/components/peopleMove/index';
import lineChart from '@/components/newLineChart/index';
import createPeople from '@/components/createPeople/index';

export default {
  name: 'labelLab',
  components: {
    datePicker,
    createGroup,
    modifyGroups,
    peopleRate,
    premium,
    peopleMove,
    lineChart,
    createPeople,
    draggable,
  },
  data() {
    return {
      editorExtensionId: 'bjddgpdnmmkpmdhoajcfpgkfnjkmbcmj', // 插件ID
      czd: '全部终端', // 终端展示
      source: '全部来源', // 全部来源
      planStatus: '全部计划', // 计划状态
      selectPlanStatus: '',
      imgUrl: '', // 商品图片地址
      goodsName: '', // 商品名字
      goodsPrice: '', // 商品价格
      goodsUrl: '',
      planName: '', // 计划名字
      fiterPlansInput: '', // 过滤计划的输入框
      fiterGoodsInput: '', // 过滤商品的输入框
      headerData: [], // 一个隐藏表体的总表头 无数据
      groupAnalyzePopStatus: false, // pop指标的状态
      groupListLoading: false, // 点击商品后请求数据
      premiumLoading: false, // 修改溢价loading
      selectPlanFlag: true, // 选择计划，选择完就可以选择商品
      labGroupLoading: false, // 标签群组分层loading
      checkboxIndexListFlag: false, // 展示指标 超过6个提示
      modifyGroupsDialog: false, // 修改群组名字的dialog
      modifyGroupRepeat: false, // 修改群组名字 检查是否名字重复
      modifyGroupName: '', // 修改群组名字input
      modifyGroupNameDisable: false,
      initGroupLoading: true, // 初始化群组 loading
      initGroupLoadingText: '请先选择计划和商品之后，才能在此查看数据哦～',
      peopleMoveLoading: false, // 人群移动弹窗的loading
      labelTendencyData: [], // 标签趋势数据
      saveLabelTendencyData: [], // 保存 已经转换完的数据
      createPeopleDialog: false, // 创建人群的dialog
      peopleMoveTableRef: '',
      tagScore: 0, // 标签化分数
      tableRowNode: [],
      loadingPlans: false,
      allPlans: [], // 所有计划
      filterInputPlans: [], // 过滤输入框后的 计划列表
      resultPlans: [], //
      planOfGoodsList: [], // 这个计划中的所有商品
      resultGoods: [], // 过滤输入框后的商品列表
      groupList: [], // 群组的所有结果
      checkAllGroup: false, // 全选checkBox
      currentCampaignId: '', // 当前计划Id
      currentAdGroupId: '', // 当前计划商品id
      currentProductId: '', // 当前商品的 productId
      currentFirstCat: '', // 当前商品的firstCat
      currentCreateGroupId: '', // 要创建的人群到哪个群组
      currentUpdateGroupId: '', // 将要修改的群组
      currentToken: null, // 当前token
      loginName: '', // 用户的登陆手机号
      oneKeyTimer: null, // 一键登录进度条的计时器
      groupAnalyzeLoading: false, // 群组分析loading
      modifyGroupLoading: false, // 修改群组名的loading
      peopleRateLoading: false, // 修改人群loading
      operatIngIndex: '', // 正在操作的 index
      createGroupDialog: false, // 创建人群 提示框flag
      createGroupName: '',
      createGroupDisabled: false, // 创建人群的确定按钮
      showErrorCreateGroup: false,
      createGroupLoading: false,
      premiumDialog: false, // 修改溢价的dialog
      premium: '', // 溢价input
      premiumError: false,
      premiumDisable: true,
      radio: '1',
      showMyDefinedGroup: '',
      // 标准群组的属性
      showStandardGroup: true,
      // 人群移动
      moveOptions: [],
      peopleMoveDialog: false,
      peopleMoveDisabled: true,
      targetGroup: '', // 目标群组
      options: [{
        value: '关系群组',
        label: '关系群组',
      }, {
        value: '比单价性别优群组',
        label: '比单价性别优群组',
      }, {
        value: '性别年龄优群组',
        label: '性别年龄优群组',
      }, {
        value: '屏蔽流量群组',
        label: '屏蔽流量群组',
      }, {
        value: '未标签化群组',
        label: '未标签化群组',
      }],
      createGroups: '',
      resultCreateGroupName: '',
      allGroupCheckbox: [],
      checkIndexListGroup: [{
        label: '溢价',
        name: 'discount',
      },
      {
        label: '展现量',
        name: 'impression',
      },
      {
        label: '点击量',
        name: 'click',
      }, {
        label: '花费',
        name: 'cost',
      }, {
        label: '点击率',
        name: 'ctr',
      }, {
        label: '平均点击花费',
        name: 'cpc',
      }, {
        label: '千次展现花费',
        name: 'cpm',
      }, {
        label: '直接成交金额',
        name: 'directtransaction',
      }, {
        label: '直接成交笔数',
        name: 'directtransactionshipping',
      }, {
        label: '间接成交金额',
        name: 'indirecttransaction',
      }, {
        label: '间接成交笔数',
        name: 'indirecttransactionshipping',
      }, {
        label: '收藏宝贝数',
        name: 'favitemtotal',
      }, {
        label: '收藏店铺数',
        name: 'favshoptotal',
      }, {
        label: '投入产出比',
        name: 'roi',
      }, {
        label: '总成交金额',
        name: 'transactiontotal',
      }, {
        label: '总成交笔数',
        name: 'transactionshippingtotal',
      }, {
        label: '总收藏',
        name: 'favtotal',
      }, {
        label: '点击转化率',
        name: 'coverage',
      }, {
        label: '直接购物车数',
        name: 'directcarttotal',
      }, {
        label: '间接购物车数',
        name: 'indirectcarttotal',
      }, {
        label: '总购物车数',
        name: 'carttotal',
      },
      ],
      checkIndexList: [
        '溢价', '展现量', '点击量', '花费',
      ],
      // 保存上一次的 checkList
      tempCheckIndexList: ['溢价', '展现量', '点击量', '花费'],
      finalCheckIndexList: [{
        label: '溢价',
        name: 'discount',
      },
      {
        label: '展现量',
        name: 'impression',
      },
      {
        label: '点击量',
        name: 'click',
      }, {
        label: '花费',
        name: 'cost',
      },
      ],
      // 人群评级
      peopleRateDialog: false,
      peopleRateDisable: true,
      peopleRateOptions: [{
        value: '0',
        label: '优质人群',
      }, {
        value: '1',
        label: '一般人群',
      }, {
        value: '2',
        label: '劣质人群',
      }],
      rate: '',
      asideFixed: false,
      checkboxListFlag: false, // 标签整体数据 checkbox 提示
      checkSurplus: 2, //
      tendencyAnalysShow: false, // 趋势图 是否显示
      startTime: '', // 开始时间
      endTime: '', // 结束时间
      allPlanStatus: [{
        value: -1,
        label: '全部计划',
      }, {
        value: 1,
        label: '推广中',
      }, {
        value: 0,
        label: '暂停',
      }],
      checkListGroup: [{
        label: '展现量',
        name: 'impressionList',
        isActive: false,
      },
      {
        label: '点击量',
        name: 'clickList',
        isActive: false,
      },
      {
        label: '花费',
        name: 'costList',
        isActive: false,
      }, {
        label: '点击率',
        name: 'ctrList',
        isActive: false,
      }, {
        label: '平均点击花费',
        name: 'cpcList',
        isActive: false,
      }, {
        label: '千次展现花费',
        name: 'cpmList',
        isActive: false,
      }, {
        label: '直接成交金额',
        name: 'directtransactionList',
        isActive: false,
      }, {
        label: '直接成交笔数',
        name: 'directtransactionshippingList',
        isActive: false,
      }, {
        label: '间接成交金额',
        name: 'indirecttransactionList',
        isActive: false,
      }, {
        label: '间接成交笔数',
        name: 'indirecttransactionshippingList',
        isActive: false,
      }, {
        label: '收藏宝贝数',
        name: 'favitemtotalList',
        isActive: false,
      }, {
        label: '收藏店铺数',
        name: 'favshoptotalList',
        isActive: false,
      }, {
        label: '投入产出比',
        name: 'roiList',
        isActive: false,
      }, {
        label: '总成交金额',
        name: 'transactiontotalList',
        isActive: false,
      }, {
        label: '总成交笔数',
        name: 'transactionshippingtotalList',
        isActive: false,
      }, {
        label: '总收藏',
        name: 'favtotalList',
        isActive: false,
      }, {
        label: '点击转化率',
        name: 'coverageList',
        isActive: false,
      }, {
        label: '直接购物车数',
        name: 'directcarttotalList',
        isActive: false,
      }, {
        label: '间接购物车数',
        name: 'indirectcarttotalList',
        isActive: false,
      }, {
        label: '总购物车数',
        name: 'carttotalList',
        isActive: false,
      },
      ],
      checkList: [
        '展现量',
        '点击量',
      ], // 已选择的checkbox
    };
  },
  methods: {
    // gjfAdd 进入页面先判断是否订购产品
    checkOrder() {
      this.$axios.post(this.$api.checkOrder, {
        pid: 1, // pid为1是词根雷达
      }).then((res) => {
        if (res.data) {
          this.getShopId();
        } else {
          this.$message({
            message: res.message,
            type: 'warning',
          });
          this.$router.push('/buy1');
        }
      });
    },
    // 关闭createPeople dialog
    closeCreatePeopleDialog() {
      this.createPeopleDialog = false;
    },
    // 删除群组
    deleteGroup(index) {
      this.$confirm(`此操作将删除该${this.groupList[index].groupName}中的所有人群, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        // 删除群组
        const param = {
          adGroupId: this.currentAdGroupId,
          productId: this.currentProductId,
          groupId: this.groupList[index].groupId,
          campaignId: this.currentCampaignId,
        };
        console.log(param);
        this.$axios.post(this.$api.deleteGroup, param)
          .then(() => {
            this.getCrowdInfo();
            this.$message({
              type: 'success',
              message: '删除成功!',
            });
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });
      });
    },
    // pop指标的hide回调
    hide() {
      this.groupAnalyzePopStatus = false;
    },
    show() {
      this.groupAnalyzePopStatus = true;
    },
    turnEndDataToJson(data) {
      // 数据保留2位小数
      // 将后端传过来的数据 进行初始化
      const impressionList = [];
      const clickList = [];
      const costList = [];
      const ctrList = [];
      const cpcList = [];
      const cpmList = [];
      const directtransactionList = [];
      const directtransactionshippingList = [];
      const indirecttransactionList = [];
      const indirecttransactionshippingList = [];
      const favitemtotalList = [];
      const favshoptotalList = [];
      const roiList = [];
      const transactiontotalList = [];
      const transactionshippingtotalList = [];
      const favtotalList = [];
      const coverageList = [];
      const directcarttotalList = [];
      const indirectcarttotalList = [];
      const carttotalList = [];
      const dataTimeList = [];
      let total = [];
      for (let i = 0; i < data.length - 1; i++) {
        impressionList.push(this.toFix(data[i].impression));
        clickList.push(this.toFix(data[i].click));
        costList.push(this.toFix(data[i].cost));
        ctrList.push(this.toFix(data[i].ctr));
        cpmList.push(this.toFix(data[i].cpm));
        directtransactionList.push(this.toFix(data[i].directtransaction));
        directtransactionshippingList.push(this.toFix(data[i].directtransactionshipping));
        indirecttransactionList.push(this.toFix(data[i].indirecttransaction));
        indirecttransactionshippingList.push(this.toFix(data[i].indirecttransactionshipping));
        favitemtotalList.push(this.toFix(data[i].favitemtotal));
        favshoptotalList.push(this.toFix(data[i].favshoptotal));
        roiList.push(this.toFix(data[i].roi));
        transactiontotalList.push(this.toFix(data[i].transactiontotal));
        transactionshippingtotalList.push(this.toFix(data[i].transactionshippingtotal));
        favtotalList.push(this.toFix(data[i].favtotal));
        coverageList.push(this.toFix(data[i].coverage));
        directcarttotalList.push(data[i].directcarttotal);
        indirectcarttotalList.push(data[i].indirectcarttotal);
        carttotalList.push(data[i].carttotal);
        directcarttotalList.push(data[i].directcarttotal);
        dataTimeList.push(data[i].dataDate);
      }
      // 和后端约定，最后一个数组是前面的总和
      total = data.pop();
      const allList = {
        impressionList,
        clickList,
        costList,
        ctrList,
        cpcList,
        cpmList,
        directtransactionList,
        directtransactionshippingList,
        indirecttransactionList,
        indirecttransactionshippingList,
        favitemtotalList,
        favshoptotalList,
        roiList,
        transactiontotalList,
        transactionshippingtotalList,
        favtotalList,
        coverageList,
        directcarttotalList,
        indirectcarttotalList,
        carttotalList,
        dataTimeList,
        total,
      };
      return allList;
    },
    turnData(checkList, allList, checkListGroup) {
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
      const total = {
        展现量: 0,
        点击量: 0,
        花费: 0,
        点击率: 0,
        平均点击花费: 0,
        千次展现花费: 0,
        直接成交金额: 0,
        直接成交笔数: 0,
        间接成交金额: 0,
        收藏宝贝数: 0,
        收藏店铺数: 0,
        投入产出比: 0,
        总成交金额: 0,
        总成交笔数: 0,
        总收藏: 0,
        点击转化率: 0,
        直接购物车数: 0,
        间接购物车数: 0,
        总购物车数: 0,
      };
      const arr = [];
      checkListGroup.forEach((item) => {
        if (item.isActive) {
          const target = item.name.replace(/List/, '');
          total[item.label] = this.toFix(allList.total[target]);
          arr.push({
            name: `${item.label}`,
            box: allList[item.name],
          });
        }
      });
      // xAxisData
      let xAxisData = [];
      xAxisData = allList.dataTimeList;
      const yAxis = [];
      const colors = ['#00A7EE', '#FFBD35', '#7DC2FD'];
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
        series.push({
          name: item.name,
          smooth: true,
          type: 'line',
          yAxisIndex,
          data: item.box,
          // label:{
          //   show:true,
          // }
        });
      });
      console.log('这里是total');
      console.log(total);
      const wrap = {
        total,
        checkList,
        xAxisData,
        yAxis,
        series,
      };
      return wrap;
    },
    labelTendency() {
      const param = this.setParams();
      this.$axios.post(this.$api.tagChart, param)
        .then((res) => {
          this.tendencyAnalysShow = true;
          this.saveLabelTendencyData = [];
          this.saveLabelTendencyData = this.turnEndDataToJson(res.data);
          this.labelTendencyData = this.turnData(this.checkList, this.saveLabelTendencyData, this.checkListGroup);
        });
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
    // 人群移动
    peopleMovecloseModal() {
      this.peopleMoveDialog = false;
    },
    peopleMoveCancel() {
      this.peopleMoveDialog = false;
    },
    peopleMoveConfirm() {
      const param = {
        crowdIdList: [],
        groupId: this.targetGroup,
      };
      for (const v of this.$refs[this.peopleMoveTableRef][0].selection) {
        param.crowdIdList.push(v.crowdId);
      }
      if (param.crowdIdList.length > 0) {
        this.peopleMoveLoading = false;
        this.$axios.post(this.$api.moveCrowd, param)
          .then(() => {
            this.peopleMoveLoading = false;
            this.peopleMoveDialog = false;
            this.$message({
              showClose: true,
              message: '移动人群成功',
              type: 'success',
            });
            this.getCrowdInfo();
          });
      }
    },
    // 修改溢价
    premiumcloseModal() {
      this.premiumDialog = false;
    },
    premiumCancel() {
      this.premiumDialog = false;
    },
    premiumConfirm() {
      this.premiumLoading = true;
      const param = {
        campaignId: this.currentCampaignId,
        crowdIdList: [],
        discount: this.premium,
        adGroupId: this.currentAdGroupId,
        productId: this.currentProductId,
      };
      for (let i = 0; i < this.groupList.length; i++) {
        const tableS = `table${i}`;
        const selection = this.$refs[tableS][0].selection;
        if (selection.length !== 0) {
          for (const v of selection) {
            param.crowdIdList.push(v.crowdId);
          }
        }
      }
      this.$axios.post(this.$api.updateDiscount, param)
        .then(() => {
          this.$message({
            showClose: true,
            message: '成功修改溢价',
            type: 'success',
          });
          this.premiumLoading = false;
          this.premiumDialog = false;
          this.getCrowdInfo();
        });
    },
    betweenRange() {
      if (isNaN(this.premium) || this.premium > 300 || this.premium < 5) {
        this.premiumDisable = true;
        this.premiumError = true;
      } else {
        this.premiumDisable = false;
        this.premiumError = false;
      }
    },
    // 人群评级
    peopleRatecloseModal() {
      this.peopleRateDialog = false;
    },
    peopleRateCancel() {
      this.peopleRateDialog = false;
    },
    peopleRateConfirm() {
      this.peopleRateLoading = true;
      let param = {
        crowdIdList: [],
        level: 0,
      };
      for (let i = 0; i < this.groupList.length; i++) {
        const tableS = `table${i}`;
        const selection = this.$refs[tableS][0].selection;
        if (selection.length !== 0) {
          for (const v of selection) {
            param.crowdIdList.push(v.crowdId);
          }
        }
      }
      param.level = this.rate;
      this.$axios.post(this.$api.levelCrowd, param)
        .then(() => {
          this.peopleRateDialog = false;
          this.peopleRateLoading = false;
          this.$message({
            showClose: true,
            message: '修改人群评级成功',
            type: 'success',
          });
          this.getCrowdInfo();
        });
      // 接口
    },
    changeSelect() {
      console.log(this.selectPlanStatus);
    },
    // datePicker 刷新时间
    refreshDate(startTime, endtime) {
      this.startTime = startTime;
      this.endTime = endtime;
      if (this.currentAdGroupId !== '') {
        this.getCrowdInfo();
      }
    },
    // 修改群组名字
    modifyGroupCancel() {
      this.modifyGroupName = '';
      this.modifyGroupsDialog = false;
    },
    checkGroupName() {
      this.$axios.post(this.$api.checkGroupName, {
        groupName: this.modifyGroupName,
        adGroupId: this.currentAdGroupId,
      })
        .then((res) => {
          if (res.data) {
            this.modifyGroupRepeat = false;
            this.modifyGroupNameDisable = false;
          } else {
            this.modifyGroupRepeat = true;
            this.modifyGroupNameDisable = true;
          }
        });
    },
    // 用插件获取ID
    getShopId() {
      try {
        chrome.runtime.sendMessage(this.$store.getters.editorExtensionId, {
          type: 'getShopId',
        },
        (response) => {
          try {
            if (response.code === 200) {
              this.currentShopid = response.currentShopid;
              this.$axios.post(this.$api.checkBind, {
                id: this.currentShopid,
              }).then((res) => {
                if (res.data) {
                  this.getPlans();
                  this.getUserInfo();
                } else {
                  this.$router.push('/login');
                  window.location.reload();
                }
              });
            } else {
              this.$message.error('你当前没有登陆淘宝，请登陆淘宝！');
              this.$router.push('/login');
              window.location.reload();
            }
          } catch (error) {
            this.$router.push('/login');
            window.location.reload();
          }
        });
      } catch (error) {
        this.$router.push('/login');
        window.location.reload();
      }
    },
    // 修改群组名字 确定按钮
    modifyGroupConfirm() {
      this.modifyGroupLoading = true;
      this.$axios.post(this.$api.updateGroup, {
        groupName: this.modifyGroupName,
        adGroupId: this.currentAdGroupId,
        groupId: this.currentUpdateGroupId,
      }).then(() => {
        this.groupList[this.operatIngIndex].groupName = this.modifyGroupName;
        this.modifyGroupLoading = false;
        this.modifyGroupsDialog = false;
      });
    },
    modifyGroupsCloseModel() {
      this.modifyGroupName = '';
      this.modifyGroupsDialog = false;
    },
    // 修改溢价 按钮
    peopleUpdatePremium() {
      this.premiumDialog = true;
    },
    // 创建群组
    radioChange() {
      this.createGroupName = '';
      if (this.radio === 1) {
        this.showStandardGroup = true;
        this.showMyDefinedGroup = false;
      }
      if (this.radio === 2) {
        this.showMyDefinedGroup = true;
        this.showStandardGroup = false;
      }
    },
    closeCreateModal() {
      this.createGroupDialog = false;
    },
    createGroupBtn() {
      this.createGroupDialog = true;
    },
    btnCreateCancel() {
      this.createGroupDialog = false;
    },
    // 检测 创建群组的名字是否存在
    checkCreateGroupName() {
      this.$axios.post(this.$api.checkGroupName, {
        groupName: this.createGroupName,
        adGroupId: this.currentAdGroupId,
      })
        .then((res) => {
          if (res.data) {
            this.showErrorCreateGroup = false;
            this.createGroupDisabled = false;
          } else {
            this.showErrorCreateGroup = true;
            this.createGroupDisabled = true;
          }
        });
    },
    btnCreateConfirm() {
      this.createGroupLoading = true;
      this.$axios.post(this.$api.addGroup, {
        groupName: this.createGroupName,
        adGroupId: this.currentAdGroupId,
      }).then(() => {
        this.$message({
          showClose: true,
          message: '创建群组成功',
          type: 'success',
        });
        this.createGroupName = '';
        this.createGroupLoading = false;
        this.createGroupDialog = false;

        // 重新请求数据，重新渲染金字塔
        this.getCrowdInfo();
      });
    },
    // 全选 =》 每个群组可以全选各自群组下的 人群
    selectAllCheck(refValue) {
      this.$refs[refValue][0].toggleAllSelection();
    },
    // 创建人群到当前群组
    createCrowd(index) {
      this.currentCreateGroupId = this.groupList[index].groupId;
      console.log(this.currentCreateGroupId);
      this.createPeopleDialog = true;
    },
    // 创建人群创建成功后 刷新数据
    refreshData() {
      this.getCrowdInfo();
    },
    // 一键创建人群
    oneKey() {
      const param = this.setParams();
      this.initGroupLoading = true;
      const cookieValue = {
        adGroupId: this.currentAdGroupId,
        productId: this.currentProductId,
        firstCat: this.currentFirstCat,
        title: this.goodsName,
        price: this.goodsPrice,
        imgUrl: this.imgUrl,
        linkUrl: this.linkUrl,
        campaignId: this.currentCampaignId,
      };

      this.$axios.post(this.$api.ifFirstTag, cookieValue)
        .then((res) => {
          if (res) {
            this.$confirm(`注意：一键创建人群将快捷帮您创建好标准化的金字塔群组及人群，
            同时会同步删除商品直通车后台精选人群的人群数据并按照标准化人群进行创建，
            请谨慎操作！`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              closeOnClickModal: false,
              type: 'warning',
            }).then(() => {
              let complete = false;
              this.initGroupLoadingText = 0;
              this.initGroupLoading = true;
              this.oneKeyTimer = setInterval(() => {
                if (this.initGroupLoadingText < 90) {
                  this.initGroupLoadingText = this.initGroupLoadingText + (Math.random() * 1.5);
                } else {
                  this.initGroupLoadingText = this.initGroupLoadingText + (Math.random() * 0.4);
                  if (this.initGroupLoadingText >= 99.6) {
                    clearInterval(this.oneKeyTimer);
                  }
                  if (complete) {
                    this.initGroupLoadingText = 100;
                    this.initGroupLoading = false;
                  }
                }
              }, 500);
              this.$axios.post(this.$api.initGroup, {
                adGroupId: this.currentAdGroupId,
                productId: this.currentProductId,
                firstCat: this.currentFirstCat,
              })
                .then(() => {
                  this.initGroupLoading = false;
                  complete = true;
                  this.$message({
                    type: 'success',
                    message: '创建成功!',
                  });
                  this.$axios.post(this.$api.getCrowd, param)
                    .then(() => {
                      for (let i = 0; i < res.data.length; i++) {
                        res.data[i] = Object.assign({
                          extend: true,
                        }, res.data[i]);
                      }
                      this.groupList = res.data;
                      this.trapezoid();
                      this.getScoreRenderTag();
                      this.labelTendency();
                    });
                });
            }).catch((err) => {
              console.log(err);
            });
          } else {
            this.initGroupLoading = false;
            this.$message({
              type: 'warning',
              message: '该商品已一键创建人群，无需重复点击',
            });
          }
        });
    },
    // 获取用户信息
    getUserInfo() {
      this.$axios.get(this.$api.info).then((res) => {
        this.$store.dispatch('login');
        this.$store.dispatch('setTaobaoName', {
          name: res.data.name,
        });
        this.loginName = res.data.loginName;
        this.currentToken = res.data.token;
        // this.giveTokenToExtension();
        const checkCookie = this.$cookies.isKey(`${this.loginName}Item`);
        if (checkCookie) {
          const result = JSON.parse(this.$cookies.get(`${this.loginName}Item`));
          this.imgUrl = result.imgUrl;
          this.currentFirstCat = result.firstCat;
          this.linkUrl = result.linkUrl;
          this.goodsPrice = result.price;
          this.goodsName = result.title;
          this.currentProductId = result.productId;
          this.currentCampaignId = result.campaignId;
          this.currentAdGroupId = result.adGroupId;
          this.planName = result.planName;
          this.getCrowdInfo();
        } else {
          console.log('本地没有cookie');
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    giveTokenToExtension() {
      try {
        // 发送一个简单的请求：
        chrome.runtime.sendMessage(this.editorExtensionId, {
          type: 'token',
          token: this.currentToken,
        },
        () => {
          console.log('token send succeed');
        });
      } catch (error) {
        this.$alert('没有安装正确的插件，请联系官网客服', '警告', {
          confirmButtonText: '确定',
          callback: () => {
            this.$message({
              type: 'warn',
              message: '没有安装正确的插件，请联系官网客服',
            });
          },
        });
      }
    },
    // 更改群组名称
    updateGroupName(index) {
      this.operatIngIndex = index;
      this.modifyGroupsDialog = true;
      this.currentUpdateGroupId = this.groupList[index].groupId;
      this.modifyGroupName = this.groupList[index].groupName;
    },
    // 人群移动
    moveCrowd(refValue) {
      this.peopleMoveTableRef = refValue;
      this.peopleMoveDialog = true;
    },
    // 人群评级按钮
    peopleRateBtn() {
      this.peopleRateDialog = true;
    },
    // 1=> 参与推广 2=> 暂停推广
    promotion(onlineStatus) {
      const param = {
        adGroupId: this.currentAdGroupId,
        campaignId: this.currentCampaignId,
        onlineStatus,
        productId: this.currentProductId,
        crowdIdList: [],
      };
      for (let i = 0; i < this.groupList.length; i++) {
        const tableS = `table${i}`;
        const selection = this.$refs[tableS][0].selection;
        if (selection.length !== 0) {
          for (const v of selection) {
            param.crowdIdList.push(v.crowdId);
          }
        }
      }
      if (param.crowdIdList.length > 0) {
        this.$axios.post(this.$api.updateStatus, param)
          .then(() => {
            this.getCrowdInfo();
            if (onlineStatus === 1) {
              this.$message({
                showClose: true,
                message: '参与推广成功',
                type: 'success',
              });
            } else {
              this.$message({
                showClose: true,
                message: '暂停推广成功',
                type: 'success',
              });
            }
          });
      }
    },
    // 删除人群
    deleteCrowd() {
      const param = {
        adGroupId: this.currentAdGroupId,
        campaignId: this.currentCampaignId,
        productId: this.currentProductId,
        crowdIdList: [],
      };
      for (let i = 0; i < this.groupList.length; i++) {
        const tableS = `table${i}`;
        const selection = this.$refs[tableS][0].selection;
        if (selection.length !== 0) {
          for (const v of selection) {
            param.crowdIdList.push(v.crowdId);
          }
        }
      }
      if (param.crowdIdList.length > 0) {
        this.$confirm('此操作将同时删除该直通车人群数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.initGroupLoadingText = '加载中，请稍等';
          this.initGroupLoading = true;
          this.$axios.post(this.$api.deleteCrowd, param)
            .then(() => {
              this.initGroupLoading = false;
              this.getCrowdInfo();
              this.$message({
                type: 'success',
                message: '删除成功!',
              });
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
      } else {
        this.$message({
          type: 'info',
          message: '请选择人群!',
        });
      }
    },
    // 限制选两个
    checkListGroupClick(val) {
      const name = val.toElement.defaultValue || val.toElement.innerText;
      if (this.checkList.length === 2) {
        let flag = false;
        this.checkList.forEach((item) => {
          if (item === name) {
            flag = true;
          }
        });
        if (!flag) {
          this.checkboxListFlag = true;
          setTimeout(() => {
            this.checkboxListFlag = false;
          }, 1000);
        } else {
          this.checkboxListFlag = false;
        }
      }
    },
    // 限制选择6个 指标
    checkCheckbox(val) {
      const name = val.toElement.defaultValue || val.toElement.innerText;
      console.log(name);
      if (this.checkIndexList.length === 6) {
        let flag = false;
        this.checkIndexList.forEach((item) => {
          if (item === name) {
            flag = true;
          }
        });
        if (!flag) {
          this.checkboxIndexListFlag = true;
          setTimeout(() => {
            this.checkboxIndexListFlag = false;
          }, 1000);
        } else {
          this.checkboxIndexListFlag = false;
        }
      }
    },
    // 防抖函数
    antiShake(fn, context, delay, args) {
      clearTimeout(fn.timeoutID);
      //  在delay秒之内连续触发会刷新setTimeout，从而不能执行到fn
      fn.timeoutID = setTimeout(() => {
        fn.call(context, args);
      }, delay);
    },
    /**
       * 展示指标的 取消按钮
       */
    showIndexCancel() {
      console.log(this.groupAnalyzePopStatus);
      this.groupAnalyzePopStatus = false;
      this.checkIndexList = this.tempCheckIndexList;
    },
    /**
       * 展示指标的 确定按钮
       */
    showIndexConfirm() {
      this.groupAnalyzePopStatus = false;
      // 将checkList 赋值给 最终渲染的checkList
      this.finalCheckIndexList = [];
      for (let i = 0; i < this.checkIndexList.length; i++) {
        for (let j = 0; j < this.checkIndexListGroup.length; j++) {
          if (this.checkIndexList[i] === this.checkIndexListGroup[j].label) {
            this.finalCheckIndexList.push(this.checkIndexListGroup[j]);
            break;
          }
        }
      }
      this.tempCheckIndexList = this.checkIndexList;
    },
    //
    handleCheckAllChange() {
      for (let i = 0; i < this.groupList.length; i++) {
        const tableS = `table${i}`;
        this.$refs[tableS][0].toggleAllSelection();
      }
    },
    // 每个群组的展示按钮
    showTable(index) {
      this.groupList[index].extend = !this.groupList[index].extend;
      console.log(index);
      console.log(this.groupList[index].extend);
    },
    /**
       * 选择计划
       */
    selectPlan(index) {
      this.currentCampaignId = this.resultPlans[index].campaignId;
      this.loadingPlans = true;
      this.$axios.post(this.$api.getCampItems, {
        campaignId: this.currentCampaignId,
      }).then((res) => {
        this.planName = this.resultPlans[index].title;
        this.selectPlanFlag = false;
        this.planOfGoodsList = res.data;
        this.resultGoods = res.data;
        this.loadingPlans = false;
      });
    },
    // 左侧商品 选择
    searchGoods(index) {
      this.goodsName = this.resultGoods[index].title;
      this.goodsPrice = this.resultGoods[index].price;
      this.goodsUrl = this.resultGoods[index].linkUrl;
      this.imgUrl = this.resultGoods[index].imgUrl;
      this.goodsPrice = this.resultGoods[index].price;
      this.currentAdGroupId = this.resultGoods[index].adGroupId;
      this.currentProductId = this.resultGoods[index].productId;
      this.currentFirstCat = this.resultGoods[index].firstCat;
      this.getCrowdInfo();
      // 下面显示数据
      // 相当于刷新数据，重新请求groupList
    },
    // 返回参数
    setParams() {
      const adGroupId = this.currentAdGroupId;
      const productId = this.currentProductId;
      const startDate = this.startTime;
      const campaignId = this.currentCampaignId;
      const endDate = this.endTime;
      const terminal = this.currentTerminal;
      const rptkey = this.currentRptkey;
      const firstCat = this.currentFirstCat;
      const param = {
        adGroupId,
        productId,
        startDate,
        endDate,
        terminal,
        rptkey,
        firstCat,
        campaignId,
      };
      return param;
    },
    // 获取标签化程度并渲染
    getScoreRenderTag() {
      const param = this.setParams();
      this.$axios.post(this.$api.tagScore, param)
        .then((res) => {
          this.tagScore = Number(res.data.score);
          // this.tagScore = Number(50); // 测试笑脸专用
          document.querySelector('.bgcolor').style.height = `${this.tagScore}%`;
        });
    },
    // 获取群组list
    getCrowdInfo() {
      const param = this.setParams();
      this.initGroupLoadingText = '加载中，请稍后';
      this.initGroupLoading = true;
      const cookieValue = {
        adGroupId: this.currentAdGroupId,
        productId: this.currentProductId,
        firstCat: this.currentFirstCat,
        planName: this.planName,
        title: this.goodsName,
        price: this.goodsPrice,
        imgUrl: this.imgUrl,
        linkUrl: this.linkUrl,
        campaignId: this.currentCampaignId,
      };
      this.$axios.post(this.$api.ifFirstTag, cookieValue)
        .then(() => {
          this.$cookies.set(`${this.loginName}Item`, JSON.stringify(cookieValue));
          this.$axios.post(this.$api.getCrowd, param)
            .then(() => {
              for (let i = 0; i < res.data.length; i++) {
                res.data[i] = Object.assign({
                  extend: true,
                }, res.data[i]);
              }
              this.initGroupLoading = false;
              this.groupList = res.data;
              this.trapezoid();
              this.getScoreRenderTag();
              this.labelTendency();
            });
        });
    },
    // 返回计划列表
    backPlan() {
      this.selectPlanFlag = true;
    },
    /** *
       *左侧 固定
       */
    handleScroll() {
      const leftEle = document.querySelector('.label-left');
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
      const offsetTop = leftEle.offsetTop;
      if (this.asideFixed === false) {
        if (scrollTop > offsetTop) {
          this.asideFixed = true;
        }
      } else {
        leftEle.style.left = `${100 - scrollLeft}px`;
        if (scrollTop < 50) {
          this.asideFixed = false;
        }
      }
    },
    /**
       * 终端选择
       */
    chooseZd(val) {
      // 改变终端时重新请求当前数据
      this.czd = val;
      console.log(this.czd);
      if (this.currentAdGroupId !== '') {
        this.getCrowdInfo();
      }
    },
    /**
       * 来源选择
       */
    chooseLy(val) {
      this.source = val;
      if (this.currentAdGroupId !== '') {
        this.getCrowdInfo();
      }
    },
    /**
       * 计划状态
       */
    chooseStatus(val) {
      this.planStatus = val;
    },
    /** *
       * 标签群组分层 checkchange
       */
    checkListChange() {
      console.log();
    },
    /**
       * 排序 所有表
       */
    sortAllTable(props) {
      console.log(this.groupList);
      const order = props.order;
      const prop = props.prop;
      for (let i = 0; i < this.groupList.length; i++) {
        const tableS = `table${i}`;
        this.$refs[tableS][0].sort(prop, order);
      }
    },
    sortTest(props) {
      const order = props.order;
      const prop = props.prop;
      console.log(`this is 子表 排序${order} 属性${prop}`);
    },
    tempTable(props) {
      const order = props.order;
      const prop = props.prop;
      console.log(`this is 临时表 排序${order} 属性${prop}`);
    },
    /**
       * 重置 标签群组分层的checkBox
       */
    resetCheckBoxList1() {
      this.checkSurplus = 0;
      this.checkList = [];
    },
    /**
       * 获取所有计划
       */
    getPlans() {
      this.loadingPlans = true;
      this.$axios.post(this.$api.getCampaign)
        .then((res) => {
          this.allPlans = res.data;
          this.resultPlans = res.data;
          this.filterInputPlans = res.data;
          this.loadingPlans = false;
        });
    },
    trapezoid() {
      this.$nextTick(() => {
        const pyramid = document.querySelector('.pyramid');
        const allChilds = pyramid.childNodes;
        // 删除所有节点，除了两个三角形，反向删除了解下
        for (let i = allChilds.length - 1; i >= 3; i--) {
          pyramid.removeChild(allChilds[i]);
        }
        // length
        const length = this.groupList.length;
        let temp = 0;
        const nodeHeight = (pyramid.offsetHeight / length) - 2;
        for (let i = 0; i < length; i++) {
          const node = document.createElement('div');
          const p1 = document.createElement('p');
          p1.classList.add('p1');
          const p2 = document.createElement('p');
          p2.classList.add('p2');
          p1.innerHTML = `<span><i class="iconfont">&#xe618;</i>${this.groupList[i].groupName}</span>`;
          p2.innerHTML = `<span>展现量:${this.groupList[i].impression}</span><span>点击量:${this.groupList[i].click}</span><span>点击率:${this.groupList[i].ctr}%</span><span>平均点击花费:${this.groupList[i].cpc}</span>`;
          if (i !== 0) {
            node.style.borderTop = '2px solid white';
          }
          node.appendChild(p1);
          node.appendChild(p2);
          node.classList.add('pyramidStyle');
          node.style.height = `${nodeHeight}px`;
          // node.style.height = '40px';
          node.style.display = 'flex';
          node.style.justifyContent = 'space-between';
          node.style.flexDirection = 'column';
          temp = 240 + ((nodeHeight / Math.sqrt(3)) * 2.1 * i);
          node.style.width = `${temp}px`;
          pyramid.appendChild(node);
        }
      });
    },
  },
  beforeCreate() {},
  // 请求axios
  created() {
    // this.getShopId();
    // 进入页面先判断是否订购产品
    this.checkOrder();
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    document.querySelector('.DiBu').style.minWidth = '1375px !important';
    document.getElementsByClassName('el-container')[0].style.height = 'auto';
    document.getElementsByClassName('el-main')[0].style.height = 'auto';
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
    currentRptkey() {
      switch (this.source) {
        case '全部来源':
          return 0;
        case '站内':
          return 1;
        default:
          return 2;
      }
    },
    currentTerminal() {
      switch (this.czd) {
        case '全部终端':
          return 0;
        case 'PC端':
          return 1;
        default:
          return 2;
      }
    },
  },
  watch: {
    checkList(val) {
      if (val.length === 0) {
        this.tendencyAnalysShow = false;
      } else {
        this.tendencyAnalysShow = true;
      }
      this.checkSurplus = val.length;
      this.labelTendencyData = this.turnData(this.checkList, this.saveLabelTendencyData, this.checkListGroup);
      console.log(this.labelTendencyData);
    },
    // 输入框 过滤计划
    fiterPlansInput(val) {
      if (val.trim() === '') {
        this.filterInputPlans = this.allPlans;
      } else {
        const arr = [];
        for (const v of this.allPlans) {
          if (v.title.includes(val)) {
            arr.push(v);
          }
        }
        this.filterInputPlans = arr;
      }
      this.resultPlans = this.filterInputPlans.filter((value) => {
        if (this.selectPlanStatus === -1) {
          return value;
        } else if (this.selectPlanStatus === 1) {
          return value.status === 1;
        }
        return value.status !== 1;
      });
    },
    // 下拉框选择计划状态
    selectPlanStatus(val) {
      this.resultPlans = this.filterInputPlans.filter((value) => {
        if (val === -1) {
          return value;
        } else if (val === 1) {
          return value.status === 1;
        }
        return value.status !== 1;
      });
    },
    // 过滤商品列表
    fiterGoodsInput(val) {
      if (val.trim() === '') {
        this.resultGoods = this.planOfGoodsList;
      } else {
        const arr = [];
        for (const v of this.planOfGoodsList) {
          if (v.title.includes(val)) {
            arr.push(v);
          }
        }
        this.resultGoods = arr;
      }
    },
    modifyGroupName(val) {
      if (val.trim() === '') {
        this.modifyGroupNameDisable = true;
      } else {
        this.antiShake(this.checkGroupName, null, 400, null);
      }
    },
    createGroupName(val) {
      if (val === '') {
        this.createGroupDisabled = true;
      } else {
        this.antiShake(this.checkCreateGroupName, null, 400, null);
      }
    },
    rate(val) {
      if (val === '') {
        this.peopleRateDisable = true;
      } else {
        this.peopleRateDisable = false;
      }
    },
    // 人群移动的v-mode
    targetGroup(val) {
      if (val === '') {
        this.peopleMoveDisabled = true;
      } else {
        this.peopleMoveDisabled = false;
      }
    },
    groupAnalyzePopStatus() {
      this.checkIndexList = this.tempCheckIndexList;
    },
  },
};
</script>
