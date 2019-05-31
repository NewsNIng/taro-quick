import { Events } from "./Events";

export const appBroadCast = new Events();

// 事件枚举
export enum EBroadCast {
    TEST = 'test',
}

