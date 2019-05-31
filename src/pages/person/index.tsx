import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { EStore } from '../../store';

import './index.less'
import UserStore from 'src/store/user';

interface IProps {
  userStore: UserStore;
}

@inject(EStore.userStore)
@observer
class Index extends Component<IProps> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '个人中心'
  }

  public onChangeUserNameClick = () => {
    this.props.userStore.setName('newsning');
  }

  public onAsyncChangeUserNameClick = async () => {
    Taro.showLoading({
      title: 'change...'
    });

    try {
      const rs = await this.props.userStore.asyncSetName();
      if(!rs) {
        throw Error('async change name error')
      }  
    } catch (error) {
      console.log(error)
    }
    
    Taro.hideLoading();

  }

  render () {
    const { name } = this.props.userStore;
    
    return (
      <View className='person'>
        <Text>hello {name}</Text>
        <Button onClick={this.onChangeUserNameClick}>修改名字</Button>
        <Button onClick={this.onAsyncChangeUserNameClick}>异步修改名字</Button>
      </View>
    )
  }
}

export default Index  as ComponentType
