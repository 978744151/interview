import React, { useState } from 'react';
import { Card, Row, Col, Input, Select, Typography, Tag, Skeleton } from 'antd';
import MainLayout from '@/layouts/MainLayout';
import { useNavigation } from '@/hooks/useNavigation';

const { Meta } = Card;
const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

// 模拟数据
const categories = [
    { id: 1, name: '数字艺术', cover: 'https://picsum.photos/200/150?art' },
    { id: 2, name: '游戏资产', cover: 'https://picsum.photos/200/150?game' },
    { id: 3, name: '音乐NFT', cover: 'https://picsum.photos/200/150?music' },
    { id: 4, name: '虚拟地产', cover: 'https://picsum.photos/200/150?land' },
];

const collections = [
    { id: 1, category: 1, name: '加密朋克#123', price: '1.2 ETH', author: 'CryptoArtist', likes: 2345 },
    { id: 2, category: 1, name: '数字蒙娜丽莎', price: '4.8 ETH', author: 'DaVinci 2.0', likes: 1892 },
    { id: 3, category: 2, name: '传奇武器皮肤', price: '0.8 ETH', author: 'GameStudio', likes: 3456 },
    { id: 4, category: 3, name: '限量版单曲', price: '2.5 ETH', author: 'DJ Block', likes: 1567 },
    { id: 5, category: 4, name: '元宇宙别墅', price: '15 ETH', author: 'MetaEstate', likes: 892 },
];

const DigitalCollectionPage = () => {
    const { goBack } = useNavigation();
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortBy, setSortBy] = useState('popular');

    const filteredCollections = collections
        .filter(item => {
            const matchCategory = !selectedCategory || item.category === selectedCategory;
            const matchSearch = item.name.toLowerCase().includes(searchKeyword.toLowerCase());
            return matchCategory && matchSearch;
        })
        .sort((a, b) => sortBy === 'popular' ? b.likes - a.likes : a.price.localeCompare(b.price));

    return (
        <>
            <div style={{ maxWidth: 1200, margin: '40px auto', padding: '0 20px' }}>
                <Button onClick={goBack} style={{ marginBottom: 24 }}>返回</Button>

                {/* 分类导航 */}
                <div style={{ marginBottom: 40 }}>
                    <Title level={2} style={{ marginBottom: 24 }}>数字藏品分类</Title>
                    <div style={{ display: 'flex', gap: 16, overflowX: 'auto', padding: '8px 0' }}>
                        {categories.map(category => (
                            <Card
                                key={category.id}
                                hoverable
                                style={{
                                    width: 200,
                                    border: selectedCategory === category.id ? '2px solid #1890ff' : 'none',
                                    borderRadius: 8
                                }}
                                onClick={() => setSelectedCategory(prev => prev === category.id ? null : category.id)}
                                cover={<img alt={category.name} src={category.cover} style={{ height: 150 }} />}
                            >
                                <Meta
                                    title={category.name}
                                    description={<Tag color="#108ee9">{collections.filter(c => c.category === category.id).length} 件藏品</Tag>}
                                />
                            </Card>
                        ))}
                    </div>
                </div>

                {/* 搜索筛选 */}
                <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                    <Search
                        placeholder="搜索藏品名称"
                        allowClear
                        enterButton
                        style={{ width: 400 }}
                        onChange={e => setSearchKeyword(e.target.value)}
                    />
                    <Select
                        value={sortBy}
                        onChange={setSortBy}
                        style={{ width: 150 }}
                    >
                        <Option value="popular">按热度</Option>
                        <Option value="price">按价格</Option>
                    </Select>
                </div>

                {/* 藏品列表 */}
                <Row gutter={[24, 24]}>
                    {filteredCollections.map(item => (
                        <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
                            <Card
                                hoverable
                                cover={
                                    <img
                                        alt={item.name}
                                        src={`https://picsum.photos/400/300?${item.id}`}
                                        style={{ height: 200, objectFit: 'cover' }}
                                    />
                                }
                            >
                                <Meta
                                    title={item.name}
                                    description={
                                        <>
                                            <div style={{ margin: '8px 0' }}>
                                                <Text strong style={{ color: '#1890ff', fontSize: 16 }}>
                                                    {item.price}
                                                </Text>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Text type="secondary">{item.author}</Text>
                                                <div>
                                                    <HeartFilled style={{ color: '#eb2f96', marginRight: 4 }} />
                                                    {item.likes.toLocaleString()}
                                                </div>
                                            </div>
                                        </>
                                    }
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    );
};

export default DigitalCollectionPage;