/// <reference path="./custom.d.ts" />
// tslint:disable
/**
 * API Mini
 * 你可以通过这里来了解 [OpenAPI 的语法](https://swagger.io/docs/specification/about/)。还可以通过 [Best Practices in API Design](https://swagger.io/resources/articles/best-practices-in-api-design/) 了解设计 API 的最佳实践。     For this sample, you can use the api key `special-key` to test the authorization     filters.
 *
 * OpenAPI spec version: 0.0.1
 * Contact: zhujh@wangushengshi.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as url from "url";
const portableFetch: any = undefined;
import { Configuration } from "./configuration";

const BASE_PATH = "https://api.xxx.tech/".replace(/\/+$/, "");

/**
 *
 * @export
 */
export const COLLECTION_FORMATS = {
    csv: ",",
    ssv: " ",
    tsv: "\t",
    pipes: "|",
};

/**
 *
 * @export
 * @interface FetchAPI
 */
export interface FetchAPI {
    (url: string, init?: any): Promise<Response>;
}

/**
 *  
 * @export
 * @interface FetchArgs
 */
export interface FetchArgs {
    url: string;
    options: any;
}

/**
 * 
 * @export
 * @class BaseAPI
 */
export class BaseAPI {
    protected configuration: Configuration;

    constructor(configuration?: Configuration, protected basePath: string = BASE_PATH, protected fetch: FetchAPI = portableFetch) {
        if (configuration) {
            this.configuration = configuration;
            this.basePath = configuration.basePath || this.basePath;
        }
    }
};

/**
 * 
 * @export
 * @class RequiredError
 * @extends {Error}
 */
export class RequiredError extends Error {
    name: "RequiredError"
    constructor(public field: string, msg?: string) {
        super(msg);
    }
}

/**
 * 
 * @export
 * @interface Body
 */
export interface Body {
    /**
     * 手机号
     * @type {string}
     * @memberof Body
     */
    tel: string;
    /**
     * 验证码
     * @type {string}
     * @memberof Body
     */
    code: string;
}

/**
 * 用户结构
 * @export
 * @interface User
 */
export interface User {
    /**
     * 用户id
     * @type {string}
     * @memberof User
     */
    id?: string;
    /**
     * 昵称
     * @type {string}
     * @memberof User
     */
    name?: string;
    /**
     * 手机号
     * @type {string}
     * @memberof User
     */
    mobile?: string;
}


/**
 * UserApi - fetch parameter creator
 * @export
 */
export const UserApiFetchParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 用户登录
         * @param {Body} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        login(body?: Body, options: any = {}): FetchArgs {
            const localVarPath = `/login`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication UserTokenAuth required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
					? configuration.apiKey("userToken")
					: configuration.apiKey;
                localVarHeaderParameter["userToken"] = localVarApiKeyValue;
            }

            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            
            const myHeaders = configuration ? (configuration.headers || {}) : {};
            localVarRequestOptions.headers = Object.assign(myHeaders, localVarHeaderParameter, options.headers);
        
            const needsSerialization = (<any>"Body" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body =  needsSerialization ? JSON.stringify(body || {}) : (body || "");

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * UserApi - functional programming interface
 * @export
 */
export const UserApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 用户登录
         * @param {Body} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        login(body?: Body, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any> {
            const localVarFetchArgs = UserApiFetchParamCreator(configuration).login(body, options);
            return (fetch: FetchAPI = portableFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        throw response;
                    }
                });
            };
        },
    }
};

/**
 * UserApi - factory interface
 * @export
 */
export const UserApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
    return {
        /**
         * 
         * @summary 用户登录
         * @param {Body} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        login(body?: Body, options?: any) {
            return UserApiFp(configuration).login(body, options)(fetch, basePath);
        },
    };
};

/**
 * UserApi - object-oriented interface
 * @export
 * @class UserApi
 * @extends {BaseAPI}
 */
export class UserApi extends BaseAPI {
    /**
     * 
     * @summary 用户登录
     * @param {Body} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public login(body?: Body, options?: any) {
        return UserApiFp(this.configuration).login(body, options)(this.fetch, this.basePath);
    }

}

