import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import './index.less'
import { gennerateQueryUrlPath } from '../../helper/Url';
import { appBroadCast, EBroadCast } from '../../helper/BroadCast';
import { EStore } from '../../store';
import AppStore from '../../store/app';

import Banner from '../../components/banner'

type PageStateProps = {
  counterStore: {
    counter: number,
    increment: Function,
    decrement: Function,
    incrementAsync: Function
  },
  appStore: AppStore
}

interface Index {
  props: PageStateProps;
}

@inject('counterStore', EStore.appStore)
@observer
class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  state = {
    value: 'default',
  }

  componentWillMount () { }

  componentWillReact () {
    console.log('componentWillReact')
  }

  componentDidMount () {
    // 监听事件
    appBroadCast.on(EBroadCast.TEST, data => {
      this.setState({
        value: data.value,
      });
    })
  }


  increment = () => {
    const { counterStore } = this.props
    counterStore.increment()
  }

  decrement = () => {
    const { counterStore } = this.props
    counterStore.decrement()
  }

  incrementAsync = () => {
    const { counterStore } = this.props
    counterStore.incrementAsync()
  }

  public onBrowseClick = () => {
    Taro.navigateTo({
      url: gennerateQueryUrlPath('/pages/browse/index', {
        url: 'https://taro-club.jd.com/',
        title: ' '
      })
    })
  }

  render () {
    const { counterStore: { counter }, appStore } = this.props
    const { value } = this.state;
    const { value: appStoreValue } = appStore;
    return (
      <View className='index'>
        <Banner images={['https://taro.jd.com/static/images/book.png']} />
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
        <Button onClick={this.incrementAsync}>Add Async</Button>
        <Text>{counter}</Text>
        <View><Text>event value: {value}</Text></View>
        <View><Text>mobx value: {appStoreValue}</Text></View>
        

        <Button onClick={this.onBrowseClick}>打开浏览器</Button>
        
      </View>
    )
  }
}

export default Index  as ComponentType
