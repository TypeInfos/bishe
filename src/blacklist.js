/**
 * 黑名单：接口返回NACK时，不需要做弹框提示的接口
 */
const path = 'http://localhost:8081';

const blacklist = [
  `${path}/loginQr`, // 登录之后先请求这个再请求getQrCode
  `${path}/getQrCode`, // 获取二维码
  `${path}/checkLogin`, // 检测二维码是否登录成功
];

export default blacklist;
