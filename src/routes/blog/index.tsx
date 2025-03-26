import React, { useState, useEffect } from 'react';
import { List, Input, Skeleton, Avatar, Typography, Space, Tabs } from 'antd';
import { SearchOutlined, FireFilled, MessageOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import { getBlogList } from '../../api/log';
import { PlusOutlined } from '@ant-design/icons';
import TabBar from '@/components/TabBar/index.tsx';
import FloatingButton from '@/components/FloatingButton/index.tsx';

const { Text } = Typography;

interface ForumPost {
    id: number;
    title: string;
    author: string;
    avatar: string;
    publishDate: string;
    views: number;
    comments: number;
    isHot: boolean;
    hotComment?: {
        content: string;
        author: string;
        likes: number;
    };
}

const ForumList: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<ForumPost[]>([]);
    const [searchText, setSearchText] = useState('');
    const [activeTab, setActiveTab] = useState('recommend');
    const [blogs, setBlogs] = useState<any>([]);

    useEffect(() => {
        fetchBlogs()
    }, [])
    const fetchBlogs = async () => {
        // const { datas } = await createBlog({ title: 123, summary: '关于本次会议纪要', })

        const { data } = await getBlogList({ page: 1, pageSize: 10 });
        setBlogs(data.data.data)
        setLoading(false)
        // 处理数据...
    }

    useEffect(() => {
        const fetchData = async () => {
            setTimeout(() => {
                const mockData: ForumPost[] = Array(20).fill(null).map((_, index) => ({
                    id: index + 1,
                    title: `关于NFT交易平台的安全性问题讨论 ${index + 1}`,
                    author: `用户${Math.floor(Math.random() * 1000)}`,
                    avatar: `https://randomuser.me/api/portraits/men/${index % 30 + 1}.jpg`,
                    publishDate: `${Math.floor(Math.random() * 24)}小时前`,
                    views: Math.floor(Math.random() * 500) + 50,
                    comments: Math.floor(Math.random() * 50),
                    isHot: index < 2, // 前两个设为热门
                    hotComment: {
                        content: '这个观点非常有价值，特别是关于安全性的建议很实用',
                        author: `用户${Math.floor(Math.random() * 1000)}`,
                        likes: Math.floor(Math.random() * 100)
                    }
                }));
                setPosts(mockData);
                setLoading(false);
            }, 1000);
        };

        fetchData();
    }, []);

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchText.toLowerCase())
    );

    const items = [
        {
            key: 'follow',
            label: '关注',
        },
        {
            key: 'recommend',
            label: '推荐',
        },
        {
            key: 'latest',
            label: '最新',
        },
    ];
    const handleNext = (blog: Blog, event?: React.MouseEvent) => {
        navigate(`/blog/${blog._id}`);
    };
    const handleCreatePost = () => {
        navigate('/blog/create');
    };

    return (
        <div className="forum-list-container">
            <div className="tab-header">
                <Tabs
                    activeKey={activeTab}
                    items={items}
                    onChange={setActiveTab}
                    className="forum-tabs"
                />
                <SearchOutlined className="header-search-icon" />
            </div>
            {/* <div className="search-box">
                <Input
                    placeholder="搜索帖子"
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    allowClear
                />
            </div> */}

            <List
                className="forum-list"
                itemLayout="vertical"
                dataSource={blogs}
                renderItem={post => (
                    <List.Item className="forum-item" onClick={() => handleNext(post)}>
                        <Skeleton loading={loading} active>
                            <div className="post-header">
                                <Avatar src={post.avatar} />
                                <div className="post-info">
                                    <div className="post-title">
                                        {post.isHot && <FireFilled className="hot-icon" />}
                                        <Text strong>{post.title}</Text>
                                    </div>
                                    <div className="post-meta">
                                        <Text type="secondary">{post.author}</Text>
                                        <Text type="secondary">{post.publishDate}</Text>
                                        <Space className="post-stats">
                                            <span><EyeOutlined /> {post.views}</span>
                                            <span><MessageOutlined /> {post.comments}</span>
                                        </Space>
                                    </div>
                                </div>
                            </div>
                            {post.hotComment?.content && (
                                <div className="hot-comment">
                                    <Text type="secondary" className="comment-content">
                                        {post.hotComment.content}
                                    </Text>
                                    <Text type="secondary" className="comment-author">
                                        {/* —— {post.hotComment.author} */}
                                    </Text>
                                </div>
                            )}
                        </Skeleton>
                    </List.Item>
                )}
            />
            <FloatingButton onClick={handleCreatePost} />
            <TabBar />
        </div>
    );
};

export default ForumList;