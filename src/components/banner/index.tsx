import Taro from "@tarojs/taro";
import { Image, Swiper, SwiperItem, View } from "@tarojs/components";

import "./index.scss";

interface IProps {
  images: string[];
}

export default class Banner extends Taro.PureComponent<IProps> {
  public render() {
    let { images = [] } = this.props;
    return (
      <View>
        <Swiper
          className={`swiper ${images.length === 0? 'null':''}`}
          indicatorColor="#999"
          indicatorActiveColor="#333"
          circular
          indicatorDots
          autoplay
        >
          {images.map((src: string, index: number) => {
            const key = `$${index}`;
            return (
              <SwiperItem
                className={"swiper-item"}
                itemId={key}
                key={key}
              >
                <Image
                  className={
                    "swiper-item__image"
                  }
                  src={src}
                  lazyLoad={true}
                />
              </SwiperItem>
            );
          })}
        </Swiper>
      </View>
    );
  }
}
