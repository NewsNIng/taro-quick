import { isAlipay } from "./OS";

// tslint:disable-next-line
const url = require("url");

/**
 * 生成带参数查询的url
 * @param path 地址
 * @param query 查询参数
 * 用法如下
 * const pathUrl = gennerateQueryUrlPath('pages/dishes/index', {
 *     merchantId: '6',
 *    a: '123',
 *    b: '666'
 * });
 * pathUrl === 'pages/dishes/index?merchantId=6&a=123&b=666'
 */
export const gennerateQueryUrlPath = (
  path: string,
  query: { [key: string]: string | number }
) => {
  const queryArr: string[] = [];
  for (const key in query) {
    if (query.hasOwnProperty(key)) {
      queryArr.push(`${key}=${encodeURIComponent(query[key]+'')}`);
    }
  }
  //   for (const [key, value] of Object.entries(query)) {
  //     queryArr.push(`${key}=${value}`);
  //   }
  return `${path}?` + queryArr.join("&");
};

// 获取路由参数确保最好在didMount周期里面调用
export const getTaroRouterParams = (
  taroThis: any,
  keys: string[]
): string[] => {
  const routerParams = taroThis.$router.params;
  const props = taroThis.props;
  const query = isAlipay ? props.qrCode : routerParams.q;
  return keys.map((key: string) => {
    if (routerParams[key]) {
      return routerParams[key];
    }
    const decodeURIStr = decodeURIComponent(query);
    const urlObj = url.parse(decodeURIStr, true);
    if (urlObj.query[key]) {
      return urlObj.query[key];
    }
    return "";
  });
};
