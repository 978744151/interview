import React, { useState } from 'react';
import type { CarouselProps } from 'antd';
import { Carousel } from 'antd';

type DotPosition = CarouselProps['dotPosition'];
const contentStyles: React.CSSProperties = {
  height: '400px',
  color: '#fff',
  textAlign: 'center',
  background: '#364d79',
  margin: 0
};
const AnchorComponent: React.FC = () => {
  const [dotPosition] = useState<DotPosition>('right');
  return (
    <>
      <Carousel dotPosition={dotPosition} autoplay>
        <div>
          <h3 style={contentStyles}></h3>
        </div>
        <div>
          <h3 style={contentStyles}></h3>
        </div>
        <div>
          <h3 style={contentStyles}></h3>
        </div>
        <div>
          <h3 style={contentStyles}></h3>
        </div>
      </Carousel>
    </>
  );
}

export default AnchorComponent;