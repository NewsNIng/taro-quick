
import Taro from "@tarojs/taro";

export const isAlipay = Taro.getEnv() === Taro.ENV_TYPE.ALIPAY;

export const isWechat = Taro.getEnv() === Taro.ENV_TYPE.WEAPP;

const systemInfo = Taro.getSystemInfoSync();

export const isAndroid = systemInfo.platform.toLowerCase() === 'android';

export const isiOS = !isAndroid;

export const getPlatformName = () => {
    return isiOS ? 'ios': 'android';
}

export const getEnvTypeName = () => {
    if(isAlipay) {
        return 'alipay';
    }
    if(isWechat) {
        return 'wechat';
    }
    // 兼容以后多个平台
    return '';
}