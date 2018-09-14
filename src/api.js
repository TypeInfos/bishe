// const absUrl = window.location.href;
let path = 'http://192.168.1.102:8082/edoushu'; // 阿炳
// let path = 'http://v99hmx.natappfree.cc/edoushu';
// let path = 'https://data.doushudata.com/edoushu'; // 上线版
// let path = 'https://data.yishubox.com/edoushu'; // 测试版
// let path = 'http://192.168.1.101:8082/edoushu' // 老庄的接口
// if (absUrl.match('edoushu.com')) {
//   path = 'https://www.edoushu.com/';
// }
let lelePath = 'https://service.api.doushudata.com/?service=App.Service.GetVer';

const api = {
  login: `${path}/login`, // 易数登录
  taobaoLogin: `${path}/loginTaoBao`, // 淘宝账号登录
  logout: `${path}/logout`, // 登出
  info: `${path}/info`, // 获取右上角用户信息
  loginQr: `${path}/loginQr`, // 登录之后先请求这个再请求getQrCode
  getQrCode: `${path}/getQrCode`, // 获取二维码
  checkLogin: `${path}/checkLogin`, // 检测二维码是否登录成功
  checkAlpha: `${path}/checkAlpha`, // 检查是否为内测用户
  checkProduct: `${path}/checkProduct`, // 检查7天是否到期

  focusList: `${path}/focusList`, // 获取关注列表
  searchList: `${path}/searchList`, // 未关注列表
  search: `${path}/search`, // 点击搜索
  focus: `${path}/focus`, // 添加关注
  firstFocus: `${path}/firstFocus`, // 添加队列关注 param:[{itemId:value},{itemId:value}]
  unFocus: `${path}/unFocus`, // 取消关注
  checkBind: `${path}/checkBind`, // 检查是否绑定的同一个店铺
  addRoot: `${path}/addRoot`, // 添加分词
  deleteRoot: `${path}/deleteRoot`, // 删除词根
  rootAnalysis: `${path}/rootAnalysis`, // 获取词根列表
  rootData: `${path}/rootData`, // 词根分析 =》 获取单个词根数据
  hmFix: `${path}/hmFix`, // 修复数据
  initialComplete: `${path}/initialComplete`, // 首次登录
  isFirst: `${path}/isFirst`, // 是否是首次登录 是的话显示初始化 弹窗

  singleItem: `${path}/singleItem`, // 单品整体分析
  checkData: `${path}/checkData`, // 检测数据
  checkItemData: `${path}/checkItemData`, // 检测数据
  rootChart: `${path}/rootChart`, // 查看表格数据
  relateRoot: `${path}/relateRoot`, // 相关搜索词分析
  rootItems: `${path}/rootItems`, // 同词根宝贝对比
  code: `${path}/code`, // 获取验证码
  register: `${path}/register`, // 注册
  bind: `${path}/bind`, // 绑定淘宝店铺名
  forget: `${path}/forget`, // 忘记密码
  matrix: `${path}/bostonMatrix`, // 波士顿矩阵数据


  // 标签实验室
  getCampaign: `${path}/getCampaign`, // 获取计划列表
  getCampItems: `${path}/getCampItems`, // 获取商品列表
  getCrowd: `${path}/getCrowd`, // 请求 群组列表 + 群组详细分析
  addGroup: `${path}/addGroup`, // 添加群组
  updateDiscount: `${path}/updateDiscount`, // 修改溢价
  updateName: `${path}/updateName`, // 修改人群名称
  moveCrowd: `${path}/moveCrowd`, // 人群移动
  updateStatus: `${path}/updateStatus`, // 参与推广
  deleteCrowd: `${path}/deleteCrowd`, // 删除人群
  deleteGroup: `${path}/deleteGroup`, // 删除群组
  ifFirstTag: `${path}/ifFirstTag`, // 判断是否是首次进入
  initGroup: `${path}/initGroup`, // 自动创建人群
  updateGroup: `${path}/updateGroup`, // 更改群组名称
  checkGroupName: `${path}/checkGroupName`, // 检测群组名称是否可用
  tagScore: `${path}/tagScore`, // 标签化程度
  moveGroup: `${path}/moveGroup`, // 群组移动
  tagChart: `${path}/tagChart`, // 标签趋势
  createCrowd: `${path}/createCrowd`, // 创建人群
  levelCrowd: `${path}/levelCrowd`, // 修改人群评级

  // 产品订购
  getPay: `${path}/getPay`, // 提交订单
  getOrderList: `${path}/getOrderList`, // 获取订单列表
  getOrderStatus: `${path}/getOrderStatus`, // 获取当前订单号的支付状态

  checkOrder: `${path}/checkOrder`, // 进入每个功能页面前判断是否订购该功能产品
  checkUserType: `${path}/checkUserType`, // 判断用户使用的是否是试用版

  // 插件下载
  getDownloadInfo: `${lelePath}`, // 获取下载插件的具体信息

  // 帮助页面
  getHelp: `${path}/getHelp`, // 获取公告以及课程
};

export default api;
