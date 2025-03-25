import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Input, Select, Typography, Tag, Skeleton, Button } from 'antd';
import { useNavigation } from '@/hooks/useNavigation.ts';
import { getNftList, getNftsList } from '@/api/nft.ts'
import { div } from 'framer-motion/client';
import { AppstoreOutlined, BarsOutlined, HeartFilled } from '@ant-design/icons';
import DeskHeaderComponents from '@/routes/home/desk-header.tsx'
import './index.scss'
// 添加搜索历史类型
interface SearchHistory {
    keyword: string;
    timestamp: number;
}
const { Meta } = Card;
const { Text } = Typography;
const { Search } = Input;
const { Option } = Select;




// 添加类型定义
interface Category {
    _id: string;
    name: string;
    cover: string;
}

interface NFTItem {
    _id: string;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;
    circulatingSupply: number;
    likes: number;
    category: {
        _id: string;
    };
}

const DigitalCollectionPage: React.FC = () => {
    const { goBack, navigate } = useNavigation();
    const [viewMode, setViewMode] = useState<any>('grid');
    const [categories, setCategories] = useState<Category[]>([]);
    const [collections, setCollections] = useState<NFTItem[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortBy, setSortBy] = useState<'popular' | 'price'>('popular');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getNftList({})
                if (data.success) {
                    setCategories(data.data)
                    setSelectedCategory(data.data[0]._id)  // 设置初始选中分类
                    getNfts(data.data[0]._id)
                }
            } catch (error) {
                console.error('获取博客详情失败:', error)
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
        setSelectedCategory(categoryId)  // 设置选中的分类
        getNfts(categoryId)
    };
    const filteredCollections = collections
        .filter((item: NFTItem) => {
            const matchCategory = !selectedCategory || item.category._id === selectedCategory;
            const matchSearch = item.name.toLowerCase().includes(searchKeyword.toLowerCase());
            return matchCategory && matchSearch;
        });

    return (
        <>
            {/* <DeskHeaderComponents />  */}
            <div style={{ maxWidth: 1200, margin: '12px auto', padding: '0 12px', overflow: 'hidden' }} className="main-content">
                {/* <Button onClick={goBack} style={{ marginBottom: 24 }}>返回</Button> */}

                {/* 分类导航 */}
                <div className="category-nav">
                    {categories.map((category: Category) => (
                        <div
                            key={category._id}
                            className={`category-item ${selectedCategory === category._id ? 'active' : ''}`}
                            onClick={() => handleSetSelectedCategory(category._id)}
                        >
                            <img src={category.cover} alt={category.name} />
                            <span>{category.name}</span>
                        </div>
                    ))}
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
                            style={{ borderRadius: 12, overflow: 'hidden' }}

                        >
                            {viewMode === 'grid' && <Card
                                hoverable
                                onClick={() => handleNextPage(`/nft/goods/${item._id}`)}
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
                                onClick={() => handleNextPage(`/nft/goods/${item._id}`)}
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
