import React, { useState } from 'react';
import { Card, Row, Col, Input, Select, Typography, Tag, Skeleton, Button } from 'antd';
import { useNavigation } from '@/hooks/useNavigation';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
const { Meta } = Card;
const { Title, Text } = Typography;
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
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid'); // 新增视图状态
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
            <div style={{ maxWidth: 1200, margin: '20px auto', padding: '0 12px', overflow: 'hidden' }}>
                {/* <Button onClick={goBack} style={{ marginBottom: 24 }}>返回</Button> */}

                {/* 分类导航 */}
                <div style={{ marginBottom: 40 }}>
                    {/* <Title level={2} style={{ marginBottom: 24 }}>数字藏品分类</Title> */}
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
                                cover={<img alt={category.name} src={category.cover} style={{ height: 100 }} />}
                            >
                                <Meta
                                    title={category.name}
                                    description={<Tag color="#108ee9">{collections.filter(c => c.category === category.id).length} 件藏品</Tag>}
                                />
                            </Card>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', gap: 16, marginBottom: 24, alignItems: 'center' }}>
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
                    <Button.Group>
                        <Button
                            type={viewMode === 'grid' ? 'primary' : 'default'}
                            icon={<AppstoreOutlined />}
                            onClick={() => setViewMode('grid')}
                        />
                        <Button
                            type={viewMode === 'list' ? 'primary' : 'default'}
                            icon={<BarsOutlined />}
                            onClick={() => setViewMode('list')}
                        />
                    </Button.Group>
                </div>

                {/* // 修改藏品列表部分 */}
                <Row gutter={viewMode === 'grid' ? [12, 12] : [12, 12]}>
                    {filteredCollections.map(item => (
                        <Col
                            key={item.id}
                            xs={viewMode === 'grid' ? 12 : 24}
                            sm={viewMode === 'grid' ? 12 : 24}
                            md={viewMode === 'grid' ? 8 : 24}
                            lg={viewMode === 'grid' ? 6 : 24}
                        >
                            {viewMode === 'grid' && <Card
                                hoverable
                                bodyStyle={{
                                    padding: 16,
                                    // 新增间距控制
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                }}
                                cover={
                                    <img
                                        alt={item.name}
                                        src={`https://picsum.photos/400/300?${item.id}`}
                                        style={{
                                            height: viewMode === 'list' ? 100 : 200,
                                            objectFit: 'cover',
                                        }}
                                    />
                                }
                            >
                                <Meta
                                    title={
                                        <Text
                                            ellipsis
                                            style={{
                                                fontSize: viewMode === 'list' ? 14 : 16,
                                                marginBottom: 4
                                            }}
                                        >
                                            {item.name}
                                        </Text>
                                    }
                                    description={
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: viewMode === 'list' ? 'row' : 'column',
                                            justifyContent: 'space-between',
                                            alignItems: viewMode === 'list' ? 'center' : 'flex-start',
                                            gap: 8
                                        }}>
                                            <Text strong style={{
                                                color: '#1890ff',
                                                fontSize: viewMode === 'list' ? 14 : 16
                                            }}>
                                                {item.price}
                                            </Text>
                                            <div style={{
                                                display: 'flex',
                                                gap: 8,
                                                alignItems: 'center'
                                            }}>
                                                <Text type="secondary">{item.author}</Text>
                                                <Text type="secondary">·</Text>
                                                <Text>
                                                    {/* <HeartFilled style={{ marginRight: 4 }} /> */}
                                                    {item.likes.toLocaleString()}
                                                </Text>
                                            </div>
                                        </div>
                                    }
                                />
                            </Card>}
                            {viewMode === 'list' && <Card
                                hoverable
                                bodyStyle={{
                                    padding: 10,
                                    display: 'flex',
                                    gap: 12,
                                    alignItems: 'center'
                                }}
                            >
                                <img
                                    alt={item.name}
                                    src={`https://picsum.photos/400/300?${item.id}`}
                                    style={{
                                        width: 80,
                                        height: 60,
                                        objectFit: 'cover',
                                        borderRadius: 4
                                    }}
                                />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <Text
                                        ellipsis
                                        style={{
                                            fontSize: 14,
                                            marginBottom: 4,
                                            display: 'block'
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        gap: 8
                                    }}>
                                        <Text strong style={{ color: '#1890ff', fontSize: 12 }}>
                                            {item.price}
                                        </Text>
                                        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                                            <Text type="secondary" style={{ fontSize: 12 }}>{item.author}</Text>
                                            <Text style={{ fontSize: 12 }}>❤️ {item.likes.toLocaleString()}</Text>
                                        </div>
                                    </div>
                                </div>
                            </Card>}
                        </Col>
                    ))}
                </Row>

            </div>
        </>
    );
};

export default DigitalCollectionPage;