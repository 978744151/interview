import React from 'react';
import { Layout, } from 'antd';
import AnchorComponent from './anchor'
import Menus from './menus'
import DeskHeaderComponents from './desk-header'
import { Row, Col, Card, Typography, Skeleton } from 'antd';
const { Content } = Layout;
const { Title } = Typography;
import { getBlogList, createBlog } from '@/api/log.ts';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TabBar from '../../components/TabBar';
import { Grid } from 'antd-mobile';

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
const categoryItemStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '16px 8px',
  background: '#fff',
  borderRadius: 8,
  gap: 8,
};





const layoutStyle = {
  // overflow: 'scroll',
  width: '100%',
  // paddingBottom: '70px',
  // height: '100%',
};

const categoryStyle: React.CSSProperties = {
  marginTop: 24,
  padding: '0 12px',
  maxWidth: 1200,
  marginLeft: 'auto',
  marginRight: 'auto',
};
const blogListStyle: React.CSSProperties = {
  marginTop: 20,
  padding: '10px 12px',
  maxWidth: 1200,
  marginLeft: 'auto',
  marginRight: 'auto'
};

const blogItemStyle: React.CSSProperties = {
  padding: '10px 0px',
  transition: 'background 0.3s',
  cursor: 'pointer',
};
// 添加类型定义
interface Blog {
  _id: string;
  id: string;
  title: string;
  summary: string;
  cover?: string;
  likes: number;
  createdAt: string;
  user?: {
    name: string;
  };
}

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

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
  const handleUpdate = async (blog: Blog, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    navigate(`/blog/update/${blog._id}`);
  }

  const handleNext = (blog: Blog, event?: React.MouseEvent) => {
    navigate(`/blog/${blog._id}`);
  };
  const handleGames = (index: number) => {
    if (index === 0) {
      navigate(`/nft/digitalCollectionPage`);
    } else if (index === 1) {
      navigate(`/nft/notice`);
    } else {
      navigate(`/game/game${index - 1}`);
    }
    // if (index) {
    //   navigate(`/game/game${index}`);
    // } else {
    //   navigate(`/nft/digitalCollectionPage`);
    // }
  }
  return (
    <>
      <Layout style={layoutStyle} className="main-content">
        <DeskHeaderComponents />
        <Content >
          <AnchorComponent blogs={blogs} />

          {/* 新增分类模块 */}
          <div style={categoryStyle}>
            {/* <Title level={4} style={{ marginBottom: 24 }}>热门分类</Title> */}
            <Grid columns={3} gap={8}>
              {[
                { name: '数字藏品', icon: '🎨' },
                { name: '公告管理', icon: '📢' },
                { name: '数字猜谜', icon: '🎮' },
                { name: '记忆卡牌', icon: '🃏' },
                { name: '贪吃蛇', icon: '🐍' },
                { name: '日期计算器', icon: '🧮' },
              ].map((item, index) => (
                <Grid.Item key={item.name} onClick={() => handleGames(index)}>
                  <div style={categoryItemStyle}>
                    <span style={{ fontSize: 24 }}>{item.icon}</span>
                    <span style={{ fontSize: 14, color: '#333' }}>{item.name}</span>
                  </div>
                </Grid.Item>
              ))}
            </Grid>
          </div>
          {/* 新增博客列表 */}
          <div style={blogListStyle}>
            <div className='flex justify-between item-center' style={{ marginBottom: 16 }}>
              <Title level={4} style={{ fontSize: 18 }}>最新文章</Title>
              <p style={{ fontSize: 14 }}>查看更多  </p>
            </div>
            <Skeleton loading={loading} active>
              {blogs.map((blog: Blog) => (
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
                      {/* <span onClick={(e) => handleUpdate(blog, e)}>编辑</span> */}
                      <span style={{ margin: '0 8px' }}>@{blog?.user?.name || '匿名用户'}</span>
                      {/* <span style={{ margin: '0 8px' }}>·</span> */}
                      {/* <span style={{ margin: '0 8px' }}>❤️ {blog.likes}</span> */}
                      {/* <span style={{ margin: '0 8px' }}>·</span> */}
                      <span style={{
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
      <TabBar />
    </>
  )
};

export default Home;