import { Carousel } from 'antd-mobile';
import React from 'react';
import { CarouselProps } from 'antd-mobile/lib/carousel';

interface Options extends CarouselProps{
  items: React.ReactNode[];
}
const Index: React.FC<Options> = (props) => (
  <Carousel autoplay={true} autoplayInterval={3500} infinite {...props}>
    {props.items?.map((item, key) => <div key={key}>{item}</div> )}
    {props.children}
  </Carousel>
);

export default Index;
