import '@tarojs/async-await'

import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import Index from './pages/index'
import store from './store'
import './app.less'


// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }



class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      // tabs
      "pages/index/index",
      "pages/person/index",

    ],
    // 分包
    subPackages: [
      {
        // 浏览器页
        root: "pages/browse",
        pages: ["index"]
      },
      // {
      //   // 分包多子页
      //   root: "pages/test",
      //   pages: ["index", "list", "detail"]
      // },
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      // navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh: true,
    },
    // 使用地理位置需要开启此权限说明
    // permission: {
    //   "scope.userLocation": {
    //     desc: "获取定位能够精准给您推荐"
    //   }
    // },
    tabBar: {
      color: "#CCCCCC",
      selectedColor: "#FE7321",
      backgroundColor: "#f7f7f7",
      borderStyle: "white",
      list: [
        {
          pagePath: "pages/index/index",
          text: "主页",
          iconPath: "./asset/images/home_gay.png",
          selectedIconPath: "./asset/images/home_c.png"
        },
        {
          pagePath: "pages/person/index",
          text: "我的",
          iconPath: "./asset/images/person_gay.png",
          selectedIconPath: "./asset/images/person_c.png"
        }
      ]
    }
  }

  // componentDidMount () {}

  // componentDidShow () {}

  // componentDidHide () {}

  // componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
