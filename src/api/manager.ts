import { AppConfig } from "../helper/Config";
import {
  UserApi,
} from "./api";
import { Configuration } from "./configuration";
import { appFetch } from "./appFetch";

const fetch = appFetch;

const initFetch = (basePath: string, headers?: any) => {
  // 分支标识
  let branch = AppConfig.BASE_API;
  // 匹配分支
  const r = /^https?:\/\/[^\s]*\/(\w+)$/;
  const matchArr = basePath.match(r);
  if (matchArr && matchArr[1]) {
    branch = matchArr[1];
  }
  const cfg = new Configuration({
    // apiKey,
    basePath,
    headers: {
      branch,
      // userToken: getUserToken(),
      clientType: AppConfig.CLENT_TYPE,
      version: AppConfig.VERSION,
      ...headers
    }
  });
  const args: any[] = [cfg, basePath, fetch];

  return {
    user: new UserApi(...args),

  };
};

let API = initFetch(AppConfig.BASE_API);



const setBaseUrl = (baseUrl: string, headers?: any) => {
  API = initFetch(baseUrl, headers);
};

export { API, setBaseUrl };
