import Taro from '@tarojs/taro'
import { FetchAPI } from './api'
import { getErrorMessage } from '../helper/Toast';
import get from 'lodash/get';

interface IWxRequest {
  url: string
  data?: object | string | ArrayBuffer
  header?: object
  method?:
  | 'OPTIONS'
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'TRACE'
  | 'CONNECT'
  dataType?: string
  responseType?: string
  success?: (data: any) => void
  fail?: (err: any) => void
  complete?: () => void
}

const failFunc = (rs: any, reject: (rs: any) => void) => {
  const errorCode = get(rs, "data.errorCode")
  // 翻译错误码显示
  // const { errorCode } = rs.data
  // 判断是否是 token 过期
  if (errorCode === 'CheckAuthenticationCodeFail') {
    
    // const dispatch = getDispatch()
    // 清除本地token
    // dispatch(action('user/clearUserAndToken'))
    // clearUserToken()
    return
  }
  const title = getErrorMessage(errorCode);
  if (title) {
    Taro.showToast({
      title,
      icon: 'none',
      duration: 2500
    });
  }

  // Promise.reject(rs)
  return reject(rs.data)
}

export const appFetch: FetchAPI = (url: string, init?: any) => {
  return new Promise<Response>((resolve, reject) => {
    const params: IWxRequest = Object.assign(
      {
        url,
        data: init.body,
        header: {
          ...init.headers,
          // userToken: getUserToken(),
        },
        fail: (rs: any) => {
          return failFunc(rs, reject);
        },
        success: (rs: any) => {
          const response = {
            ...rs,
            status: rs.statusCode,
            json: () => Promise.resolve(rs.data)
          }
          if (response.status >= 200 && response.status < 300) {
            return resolve(response)
          } else {
            return failFunc(rs, reject);
          }
        },
        timeout: 100000,
      },
      init
    )
    Taro.request(params)
  })
}
