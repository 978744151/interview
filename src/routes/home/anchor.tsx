import React, { useState } from 'react';
import type { CarouselProps } from 'antd';
import { Carousel } from 'antd';
import { useNavigate } from "react-router-dom";

type DotPosition = CarouselProps['dotPosition'];
// 添加悬浮动画样式
const carouselItemStyle: React.CSSProperties = {
  height: '400px',
  position: 'relative',
  overflow: 'hidden',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

// 渐变遮罩层
const gradientOverlay: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5))',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 0.3s ease',
};
type AnchorProps = {
  blogs: Array<{ cover?: string }>;
};

const AnchorComponent: React.FC = ({ blogs }) => {

  const [dotPosition] = useState<DotPosition>('right');
  const navigate = useNavigate();

  const handleNext = (blog) => {
    console.log(123)
    // 处理点击事件...
    navigate(`/blog/${blog._id}`);
  };
  return (
    <>
      <Carousel
        dotPosition={dotPosition}
        autoplay
        effect="fade"
        style={{ borderRadius: 8, overflow: 'hidden' }}
      >
        {blogs.map((blog, index) => (
          <div key={index}>
            <div style={{
              ...carouselItemStyle,
              backgroundImage: `url(${blog.cover || 'https://picsum.photos/1600/900'})`
            }}>
              <div style={gradientOverlay} onClick={() => handleNext(blog)}>
                <h3 style={{
                  color: '#fff',
                  fontSize: '2.5rem',
                  textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
                  transform: 'translateY(20px)',
                  transition: 'all 0.5s ease',
                  cursor: 'pointer'
                }} className="hover:translate-y-0 hover:opacity-100 ">
                  {blog.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </>
  );
}

export default AnchorComponent;