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

// 在现有样式后添加
const blogListStyle: React.CSSProperties = {
  marginTop: 40,
  padding: '0 50px',
  maxWidth: 1200,
  marginLeft: 'auto',
  marginRight: 'auto'
};

const blogCardStyle: React.CSSProperties = {
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  marginBottom: 16,
  cursor: 'pointer',
  borderRadius: 8,
  overflow: 'hidden'
};
const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
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

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true)
    fetchBlogs()
  }, [])
  const fetchBlogs = async () => {
    const { datas } = await createBlog({ title: 123,summary:'关于本次会议纪要',})

    const { data } = await getBlogList({ page: 1, pageSize: 10 });
    setBlogs(data.data)
    setLoading(false)
    // 处理数据...
  }
  return (<>
    <Layout style={layoutStyle}>
      <DeskHeaderComponents />
      <Content style={contentStyle}>
        <AnchorComponent />

        {/* 新增分类模块 */}
        {/* <div style={categoryStyle}>
          <Title level={4} style={{ marginBottom: 24 }}>热门分类</Title>
          <Row gutter={[16, 16]}>
            {['前端开发', '后端架构', '数据科学', '人工智能'].map((name) => (
              <Col span={6} key={name}>
                <Card
                  hoverable
                >
                  <Card.Meta title={name} description="相关岗位数量：128" />
                </Card>
              </Col>
            ))}
          </Row>
        </div> */}
        {/* 新增博客列表 */}
        <div style={blogListStyle}>
          <Title level={4} style={{ marginBottom: 24 }}>最新文章</Title>
          <Skeleton loading={loading} active>
            <Row gutter={[24, 24]}>
              {blogs.map(blog => (
                <Col xs={24} sm={12} lg={8} key={blog.id}>
                  <div style={blogCardStyle} className="hover:shadow-lg">
                    <img
                      src={blog.cover || 'https://picsum.photos/800/400'}
                      alt={blog.title}
                      style={{
                        width: '100%',
                        height: 100,
                        objectFit: 'cover',
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8
                      }}
                    />
                    <div style={{ padding: 20 }}>
                      <span style={{ marginBottom: 8, fontSize: 18 }}>{blog.title}</span>
                      <p style={{
                        color: '#666',
                        lineHeight: 1.6,
                        WebkitLineClamp: 3,
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {blog.summary}
                      </p>
                      <div style={{
                        marginTop: 16,
                        display: 'flex',
                        justifyContent: 'space-between',
                        color: '#999'
                      }}>
                        <span>@{blog.author?.name || '匿名用户'}</span>
                        <div>
                          <span style={{ marginRight: 16 }}>{blog.createdAt}</span>
                          <span>❤️ {blog.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Skeleton>
        </div>
      </Content>
      {/* <Footer style={footerStyle}>Footer</Footer> */}
    </Layout>
  </>
  )
};

export default Home;