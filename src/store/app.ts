// 这是通过类方式定义Mobx数据的例子
// 推荐使用这种 更直观

import { observable, action } from 'mobx'

export default class AppStore {
    @observable public value: string;

    constructor() {
        console.log('app constructor')
        this.value = 'app'
    }

    @action public setValue(newValue: string) {

        console.log('app setValue ' + newValue)
        this.value = newValue;
    }
}
