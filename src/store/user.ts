// 这是通过类方式定义Mobx数据的例子
// 推荐使用这种 更直观

import { observable, action } from 'mobx'
import { API } from 'src/api';

export default class UserStore {
    @observable public name: string;

    constructor() {
        this.name = 'world'
    }

    @action public setName(newName: string) {
        this.name = newName;
    }

    // 异步更改数据
    @action public asyncSetName() {
        return new Promise((re, rj) => {
            // 模拟ajax
            setTimeout(action(() => {
                // 这里直接修改name数据需要用action修饰
                this.name = 'async world'
                re(true);
            }), 1000);
        });
    }

    // 测试登录接口
    @action public async login(tel: string, code: string) {
        const { data } = await API.user.login({
            tel,
            code,
        });
    }
}
