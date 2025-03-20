import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Input, Select, Typography, Tag, Skeleton, Button } from 'antd';
import { useNavigation } from '@/hooks/useNavigation.ts';
import { getNftList, getNftsList } from '@/api/nft.ts'
import { div } from 'framer-motion/client';
import { AppstoreOutlined, BarsOutlined, HeartFilled } from '@ant-design/icons';

const { Meta } = Card;
const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;


const collections = [
    { id: 1, category: 1, name: '加密朋克#123', price: '1.2 ETH', author: 'CryptoArtist', likes: 2345 },
    { id: 2, category: 1, name: '数字蒙娜丽莎', price: '4.8 ETH', author: 'DaVinci 2.0', likes: 1892 },
    { id: 3, category: 2, name: '传奇武器皮肤', price: '0.8 ETH', author: 'GameStudio', likes: 3456 },
    { id: 4, category: 3, name: '限量版单曲', price: '2.5 ETH', author: 'DJ Block', likes: 1567 },
    { id: 5, category: 4, name: '元宇宙别墅', price: '15 ETH', author: 'MetaEstate', likes: 892 },
];

const DigitalCollectionPage = () => {
    const { goBack, navigate } = useNavigation();
    const [viewMode, setViewMode] = useState<any>('grid'); // 新增视图状态
    const [categories, setCategories] = useState<any>([])
    const [collections, setCollections] = useState<any>([])
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortBy, setSortBy] = useState('popular');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getNftList({})
                if (data.success) {
                    setCategories(data.data)
                    getNfts(data.data[0]._id)
                }
            } catch (error) {
                console.error('获取博客详情失败:', error)
                navigate('/')
            } finally {

            }
        }

        fetchData()
    }, [])
    const getNfts = async (category: string) => {
        const { data } = await getNftsList({ page: 1, perPage: 10, category })
        setCollections(data.data.data)
    }
    const handleNextPage = (path: string) => {
        // 使用 useNavigation 的 navigate 方法进行页面跳转
        navigate(path)
    };
    const handleSetSelectedCategory = (categoryId: string) => {
        console.log(categoryId)
        getNfts(categoryId)
    };
    const filteredCollections = collections
        .filter((item: any) => {
            const matchCategory = !selectedCategory || item.category._id === selectedCategory;
            const matchSearch = item.name.toLowerCase().includes(searchKeyword.toLowerCase());
            return matchCategory && matchSearch;
        })
    // .sort((a, b) => sortBy === 'popular' ? b.likes - a.likes : a.price.localeCompare(b.price));

    return (
        <>
            <div style={{ maxWidth: 1200, margin: '20px auto', padding: '0 12px', overflow: 'hidden' }}>
                {/* <Button onClick={goBack} style={{ marginBottom: 24 }}>返回</Button> */}

                {/* 分类导航 */}
                <div style={{ marginBottom: 12 }}>
                    {/* <Title level={2} style={{ marginBottom: 24 }}>数字藏品分类</Title> */}
                    <div style={{ display: 'flex', gap: 16, overflowX: 'auto', padding: '8px 0' }}>
                        {categories.map((category: any) => (
                            <Card
                                key={category._id}
                                hoverable
                                style={{
                                    width: 200,
                                    border: selectedCategory === category._id ? '2px solid #1890ff' : 'none',
                                    borderRadius: 8
                                }}
                                onClick={() => handleSetSelectedCategory(category._id)}
                                cover={<img alt={category.name} src={category.cover} style={{ height: 100, objectFit: 'cover' }} />}
                            >
                                <Meta
                                    title={category.name}
                                // description={<Tag color="#108ee9">{collections.filter(c => c.category === category._id).length} 件藏品</Tag>}
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
                    {filteredCollections.map((item: any) => (
                        <Col
                            key={item._id}
                            xs={viewMode === 'grid' ? 12 : 24}
                            sm={viewMode === 'grid' ? 12 : 24}
                            md={viewMode === 'grid' ? 8 : 24}
                            lg={viewMode === 'grid' ? 6 : 24}
                        >
                            {viewMode === 'grid' && <Card
                                hoverable
                                onClick={() => handleNextPage(`/nft/goods/${item.id}`)}
                                bodyStyle={{
                                    padding: 16,
                                    // 新增间距控制
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                }}
                                cover={
                                    <div style={{
                                        backgroundImage: `url(${item.imageUrl})`,
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        height: "200px",
                                        width: "100%",
                                    }}>

                                    </div>
                                    // <img
                                    //     alt={item.name}
                                    //     src={item.imageUrl}
                                    //     style={{
                                    //         height: viewMode === 'list' ? 100 : 285,
                                    //         objectFit: 'cover',
                                    //     }}
                                    // />
                                }
                            >
                                <Meta
                                    title={
                                        <div>
                                            <Text
                                                ellipsis
                                                style={{
                                                    fontSize: viewMode === 'list' ? 14 : 16,
                                                    marginBottom: 4
                                                }}
                                            >
                                                {item.name}
                                            </Text>
                                            <div className='flex'>
                                                <div style={{
                                                    fontSize: 9, color: '#666', marginTop: 4,
                                                    border: '1px solid #f0f0f0',
                                                    borderRadius: '4px',
                                                    padding: '4px 8px',
                                                    display: 'flex',
                                                }}>
                                                    发行: {item.quantity || 1000}
                                                </div>
                                                <div style={{
                                                    fontSize: 9, color: '#666', marginTop: 4,
                                                    border: '1px solid #f0f0f0',
                                                    borderRadius: '4px',
                                                    padding: '4px 8px',
                                                    display: 'flex',
                                                }}>
                                                    流通: {item.circulatingSupply || 856}
                                                </div>
                                            </div>

                                        </div>
                                    }
                                    description={
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: viewMode === 'list' ? 'row' : 'row',
                                            justifyContent: 'space-between',
                                            alignItems: viewMode === 'list' ? 'center' : 'flex-start',
                                            gap: 8
                                        }}>
                                            <Text strong style={{
                                                color: '#1890ff',
                                                fontSize: viewMode === 'list' ? 14 : 16
                                            }}>
                                                ¥{item.price}
                                            </Text>
                                            <Text>
                                                {item.likes || 99}
                                            </Text>
                                        </div>
                                    }
                                />
                            </Card>}
                            {viewMode === 'list' && <Card
                                hoverable
                                onClick={() => handleNextPage(`/nft/goods/${item.id}`)}
                                bodyStyle={{
                                    padding: 10,
                                    display: 'flex',
                                    // gap: 12,
                                    alignItems: 'center'
                                }}
                            >
                                <img
                                    alt={item.name}
                                    src={item.imageUrl}
                                    style={{
                                        width: 80,
                                        height: 60,
                                        objectFit: 'cover',
                                        borderRadius: 4
                                    }}
                                />
                                <div style={{ flex: 1, minWidth: 0 }} className='ml-2'>
                                    <Text
                                        ellipsis
                                        style={{
                                            fontSize: viewMode === 'list' ? 14 : 16,
                                            marginBottom: 4
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                    <div className='flex justify-between'>
                                        <div style={{
                                            fontSize: 10,
                                            color: '#666',
                                            marginTop: 4,
                                            border: '1px solid #f0f0f0',
                                            borderRadius: '4px',
                                            padding: '4px 8px',
                                            display: 'flex',
                                            gap: 12
                                        }}>
                                            <div >发行: {item.totalSupply || 1000}</div>
                                            <div >流通: {item.circulatingSupply || 856}</div>
                                        </div>
                                        <div>¥{item.price}</div>
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