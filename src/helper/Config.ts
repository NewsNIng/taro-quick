import Taro from "@tarojs/taro";

export const dirClientType = {
  [Taro.ENV_TYPE.WEAPP]: "miniApp",
  [Taro.ENV_TYPE.ALIPAY]: "alipayMiniApp"
};
export const dirBaseApiUrl = {
  // 开发环境 配置
  development: {
    url: "https://api.app.xxx.tech",
    branch: "develop",
    sa_enable: false,
    fundebug: false
  },
  // 线上环境 配置
  production: {
    url: "https://api.xxx.com",
    branch: "master",
    sa_enable: true,
    fundebug: true
  }
}; 
const WxAppid = "wx11111111111";
const WxAppSercet = "0c2111111111111111111111"; 
const ClientType = dirClientType[Taro.getEnv()];
const TECH = dirBaseApiUrl[process.env.NODE_ENV];
const isDevelopment = "development" === process.env.NODE_ENV;

export const AppConfig = {
  // 微信 APPID
  WX_APPID: WxAppid,
  // 微信 APP SERCET
  WX_APP_SERCET: WxAppSercet,
  // 高德 KEY
  // AMAP_KEY: "ac21111111111111111111",
  BASE_API: TECH.url,
  BASE_API_BRANCH: TECH.branch, // develop master P008

  // 程序 版本号
  VERSION: "versionValue",
  // 小程序版本号
  APPVERSION: "3.55.2",
  // code
  CODE: "20190531",
  // 客户端类型
  CLENT_TYPE: ClientType,
  // fundebug 开关
  FUNDEBUG: TECH.fundebug,
  // fundebug key
  FUNDEBUG_API_KEY: "11111111111111111111111111111111111111111111111111",
  isDevelopment
};

// 神策统计配置
// export const SaConfig = {
//   // 采集总开关
//   enable: TECH.sa_enable,
//   // 神策分析注册在APP全局函数中的变量名，在非app.js中可以通过getApp().sensors(你这里定义的名字来使用)
//   name: "sensors",
//   // 如果要通过sdk自动获取openid，需要在神策分析中配置appid和appsercret，并在这里标志appid,不需要的话，不用填。
//   appid: WxAppid,
//   // 神策分析数据接收地址
//   server_url: TECH.sa_url,
//   // 请求发送超时时间
//   send_timeout: 1000,
//   // 传入的字符串最大长度限制，防止未知字符串超长
//   max_string_length: 300,
//   // 发送事件的时间使用客户端时间还是服务端时间
//   use_client_time: false,
//   // 是否允许控制台打印查看埋点数据（建议开启查看）
//   show_log: true,
//   // 是否允许修改onShareMessage里return的path，用来增加（用户id，分享层级，当前的path），在app onshow中自动获取这些参数来查看具体分享来源，层级等
//   allow_amend_share_path: true,
//   // 是否自动采集如下事件（建议开启）
//   autoTrack: {
//     appLaunch: true, // 是否采集 $MPLaunch 事件，true 代表开启。
//     appShow: true, // 是否采集 $MPShow 事件，true 代表开启。
//     appHide: true, // 是否采集 $MPHide 事件，true 代表开启。
//     pageShow: true, // 是否采集 $MPViewScreen 事件，true 代表开启。
//     pageShare: true // 是否采集 $MPShare 事件，true 代表开启。
//   },
//   // 是否集成了插件！重要！
//   is_plugin: false
// };

// leanCloud 配置
// export const AvConfig = {
//   appId: "Ak111111111111111111111111",
//   appKey: "XE111111111111111111111111"
//   // masterKey: "NN111111111111111111111"
// };
