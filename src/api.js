// const absUrl = window.location.href;

// let path = 'http://localhost:8081/yishu';
// if (absUrl.match('yishubox.com')) {
// }

let path = 'http://www.yishubox.com/yishu';

const api = {
  login: `${path}/login`, // 易数登录
  taobaoLogin: `${path}/loginTaoBao`, // 淘宝账号登录
  logout: `${path}/logout`, // 登出
  info: `${path}/info`, // 获取右上角用户信息
  loginQr: `${path}/loginQr`, // 登录之后先请求这个再请求getQrCode
  getQrCode: `${path}/getQrCode`, // 获取二维码
  checkLogin: `${path}/checkLogin`, // 检测二维码是否登录成功
  focusList: `${path}/focusList`, // 获取关注列表
  searchList: `${path}/searchList`, // 最近浏览列表
  search: `${path}/search`, // 点击搜索
  focus: `${path}/focus`, // 添加关注
  unFocus: `${path}/unFocus`, // 取消关注
  addRoot: `${path}/addRoot`, // 添加分词
  deleteRoot: `${path}/root`, // 删除词根
  getRoot: `${path}/root`, // 获取自己分词列表
  tmallSplit: `${path}/tmallSplit`, // 获取天猫分词列表
  singleItem: `${path}/singleItem`, // 单品整体分析
  rootAnalysis: `${path}/rootAnalysis`, // 词根分析
  rootChart: `${path}/rootChart`, // 查看表格数据
  relateRoot: `${path}/relateRoot`, // 相关搜索词分析
  rootItems: `${path}/rootItems`, // 同词根宝贝对比
  code: `${path}/code`, // 获取验证码
  register: `${path}/register`, // 注册
  bind: `${path}/bind`, // 绑定淘宝店铺名
  forget: `${path}/forget`, // 忘记密码
};

export default api;
