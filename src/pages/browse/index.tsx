import Taro, { Config } from "@tarojs/taro";
import { WebView } from "@tarojs/components";
import { getTaroRouterParams } from "../../helper/Url";

interface IProps {
  url: string;
  title: string;
}

export class Browse extends Taro.Component<IProps> {
  config: Config = {
    navigationBarTitleText: "页面详情",
    enablePullDownRefresh: false,
    navigationBarTextStyle: "black",
    backgroundColor: "#f7f7f7",
    navigationBarBackgroundColor: "#FFFFFF",
    disableScroll: true
  };
  
  private onWebViewMessage() {}

  private onWebViewLoad(e) {
    console.log(e);
  }

  private setTitle(title: string) {
    Taro.setNavigationBarTitle({
      title
    });
  }
  

  public componentDidMount() {
    const [title] = getTaroRouterParams(this, ['title']);
    if (title) {
      this.setTitle(title);
    }
  }

  public render() {
    const [url] = getTaroRouterParams(this, ['url']);

    return (
        <WebView src={url} onMessage={this.onWebViewMessage} onLoad={this.onWebViewLoad} />
    );
  }
}
