import React from 'react';
import { Layout, } from 'antd';
import AnchorComponent from './anchor'
import Menus from './menus'
import DeskHeaderComponents from './desk-header'
import { Row, Col, Card, Typography, Skeleton } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;
import { getBlogList, createBlog } from '@/api/log';
import { useEffect, useState } from 'react';
import { getStore } from '@/utils/store';
import { useNavigate } from "react-router-dom";
import PageFooter from '@/layouts/PageFooter'


const blogCardStyle: React.CSSProperties = {
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  marginBottom: 16,
  cursor: 'pointer',
  borderRadius: 8,
  overflow: 'hidden',
  borderBottom: '1px solid #f0f0f0',
  padding: '10px 10px 0px 10px',
  background: '#fff',

};
const contentStyle: React.CSSProperties = {

  // overflow: 'auto'
};


const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#fff',
  position: 'fixed',
  width: "100%",
  zIndex: 10,
  bottom: 0,
};

const layoutStyle = {
  // overflow: 'scroll',
  width: '100%',
  // height: '100%',
};

const categoryStyle: React.CSSProperties = {
  marginTop: 24,
  padding: '0 50px'
};
const blogListStyle: React.CSSProperties = {
  marginTop: 20,
  padding: '10px 20px',
  maxWidth: 1200,
  marginLeft: 'auto',
  marginRight: 'auto'
};

const blogItemStyle: React.CSSProperties = {
  padding: '10px 0px',
  transition: 'background 0.3s',

  cursor: 'pointer',
};
const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<any[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true)
    fetchBlogs()
  }, [])
  const fetchBlogs = async () => {
    // const { datas } = await createBlog({ title: 123, summary: '关于本次会议纪要', })

    const { data } = await getBlogList({ page: 1, pageSize: 10 });
    setBlogs(data.data)
    setLoading(false)
    // 处理数据...
  }
  const handleUpdate = async (blog, event) => {
    event.preventDefault();    // 阻止默认行为
    event.stopPropagation();   // 停止冒泡
    navigate(`/blog/update/${blog._id}`);
  }
  const handleNext = (blog, event) => {

    // 处理点击事件...
    navigate(`/blog/${blog._id}`);
  };
  const handleGames = (index: number) => {
    if (index) {
      navigate(`/game/game${index}`);
    } else {
      navigate(`/nft/digitalCollectionPage`);
    }

  }
  return (
    <>
      <Layout style={layoutStyle}>
        <DeskHeaderComponents />
        <Content style={contentStyle}>
          <AnchorComponent blogs={blogs} />

          {/* 新增分类模块 */}
          <div style={categoryStyle}>
            <Title level={4} style={{ marginBottom: 24 }}>热门分类</Title>
            <Row gutter={[16, 16]}>
              {['数字藏品', '数字猜谜游戏', '记忆卡牌游戏', '贪吃蛇', '日期计算器',].map((name, index) => (
                <Col span={6} key={name}>
                  <Card
                    hoverable
                    onClick={() => handleGames(index)}
                  >
                    <Card.Meta title={name} description="" />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
          {/* 新增博客列表 */}
          <div style={blogListStyle}>
            <Title level={4} style={{ marginBottom: 16, fontSize: 18 }}>最新文章</Title>
            <Skeleton loading={loading} active>
              {blogs.map(blog => (
                <div
                  key={blog.id}
                  className="hover:bg-gray-50 "
                  style={blogCardStyle}
                  onClick={() => handleNext(blog)}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 6
                  }}>
                    <span style={{
                      fontSize: 16,
                      fontWeight: 400,
                      marginRight: 12
                    }}>{blog.title}</span>
                  </div>
                  <div className='flex justify-between' style={blogItemStyle}>

                    <p style={{
                      color: '#666',
                      fontSize: 13,
                      lineHeight: 1.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      marginBottom: 4
                    }}>
                      {blog.summary}
                    </p>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: 12,
                      color: '#999'
                    }}>
                      <span onClick={(e) => handleUpdate(blog, e)}>编辑</span>
                      <span>@{blog?.user?.name || '匿名用户'}</span>
                      <span style={{ margin: '0 8px' }}>·</span>
                      <span>❤️ {blog.likes}</span>
                      <span style={{ margin: '0 8px' }}>·</span>
                      <span style={{
                        color: '#666',
                        fontSize: 12
                      }}>{blog.createdAt}</span>
                    </div>
                  </div>
                  {
                    blog.cover && (
                      <img
                        src={blog.cover}
                        alt={blog.title}
                        style={{
                          width: 80,
                          height: 60,
                          objectFit: 'cover',
                          borderRadius: 4,
                          marginLeft: 16
                        }}
                      />
                    )
                  }
                </div>
              ))}
            </Skeleton>
          </div>
        </Content >
      </Layout >
      <PageFooter />
    </>
  )
};

export default Home;