import React, { useEffect, useState, useRef } from 'react';
import { Image, Card, Button, Typography, Row, Col, Tag, List, Statistic } from 'antd';

import { ShoppingCartOutlined, LinkOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
const { Title, Text } = Typography;
import './goods.scss'
import { useNavigation, useParams } from '@/hooks/useNavigation'
import { LeftOutlined } from '@ant-design/icons';  // 添加这个引入
import { getNfts } from '@/api/nft.ts'

// 模拟数据
const nftDetail = {
    id: 1,
    banner: 'https://picsum.photos/1200/400',
    title: '幻殇数字艺术系列',
    totalSupply: 1000,
    circulatingSupply: 856,
    description: '幻殇数字艺术系列是一个独特的NFT集合，融合了东方美学与数字艺术...',
    consignments: [
        {
            id: 1,
            name: '幻殇·月光',
            serialNumber: '#0001',
            hash: '0x7d8f...3e2a',
            price: '2.5 ETH'
        },
        {
            id: 2,
            name: '幻殇·星辰',
            serialNumber: '#0002',
            hash: '0x9c4e...8f1b',
            price: '3.1 ETH'
        },
        {
            id: 1,
            name: '幻殇·月光',
            serialNumber: '#0001',
            hash: '0x7d8f...3e2a',
            price: '2.5 ETH'
        },
        {
            id: 2,
            name: '幻殇·星辰',
            serialNumber: '#0002',
            hash: '0x9c4e...8f1b',
            price: '3.1 ETH'
        }, {
            id: 1,
            name: '幻殇·月光',
            serialNumber: '#0001',
            hash: '0x7d8f...3e2a',
            price: '2.5 ETH'
        },
        {
            id: 2,
            name: '幻殇·星辰',
            serialNumber: '#0002',
            hash: '0x9c4e...8f1b',
            price: '3.1 ETH'
        },
        {
            id: 1,
            name: '幻殇·月光',
            serialNumber: '#0001',
            hash: '0x7d8f...3e2a',
            price: '2.5 ETH'
        },
        {
            id: 2,
            name: '幻殇·星辰',
            serialNumber: '#0002',
            hash: '0x9c4e...8f1b',
            price: '3.1 ETH'
        }, {
            id: 1,
            name: '幻殇·月光',
            serialNumber: '#0001',
            hash: '0x7d8f...3e2a',
            price: '2.5 ETH'
        },
        {
            id: 2,
            name: '幻殇·星辰',
            serialNumber: '#0002',
            hash: '0x9c4e...8f1b',
            price: '3.1 ETH'
        }, {
            id: 1,
            name: '幻殇·月光',
            serialNumber: '#0001',
            hash: '0x7d8f...3e2a',
            price: '2.5 ETH'
        },
        {
            id: 2,
            name: '幻殇·星辰',
            serialNumber: '#0002',
            hash: '0x9c4e...8f1b',
            price: '3.1 ETH'
        }, {
            id: 1,
            name: '幻殇·月光',
            serialNumber: '#0001',
            hash: '0x7d8f...3e2a',
            price: '2.5 ETH'
        },
        {
            id: 2,
            name: '幻殇·星辰',
            serialNumber: '#0002',
            hash: '0x9c4e...8f1b',
            price: '3.1 ETH'
        }
    ]
};
const mockData = {
    ...nftDetail,
    transactions: [
        { id: 1, buyer: '0x1234...5678', price: '2.1 ETH', time: '2024-01-20 15:30' },
        { id: 2, buyer: '0x8765...4321', price: '1.8 ETH', time: '2024-01-19 10:15' },
    ],
    details: {
        creator: 'NFT艺术工作室',
        createTime: '2024-01-01',
        blockchain: 'Ethereum',
        contract: '0xabcd...efgh',
    },
    announcements: [
        { id: 1, title: '限量版NFT发售公告', date: '2024-01-15', content: '我们很高兴地宣布...' },
        { id: 2, title: '交易手续费调整通知', date: '2024-01-10', content: '为了更好地服务用户...' },
    ]
};
const NFTDetail: React.FC = () => {
    const { navigate, goBack } = useNavigation()
    const { id } = useParams()
    const [nftData, setNftData] = useState({})
    const [isScrolled, setIsScrolled] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = (e) => {
            const scrollTop = window.scrollY ||
                document.documentElement.scrollTop ||
                document.body.scrollTop
            console.log(scrollTop)
            setIsScrolled(scrollTop > 290);
        };

        container.addEventListener('scroll', handleScroll, true);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getNfts({ id }, id)
                console.log(data.data)
                setNftData(data.data)
            } catch (error) {
                console.error('获取博客详情失败:', error)
            } finally {

            }
        }
        fetchData()
    }, [])
    return (
        <div ref={containerRef} className="mx-auto nft-goods" style={{ height: '100vh', overflow: 'auto' }}>
            {/* Banner区域 */}
            {/* 悬浮返回按钮 */}
            {/* <LeftOutlined onClick={goBack}
                className='leftReturn' /> */}
            <Button
                style={{ color: isScrolled ? '#000' : '#fff' }}
                icon={<LeftOutlined />}
                onClick={goBack}
                className='leftReturn'
            />
            <div className='goodInfoBox'>
                <div className='goodImg' style={{ backgroundImage: 'url(' + nftData?.imageUrl + ')' }}></div>
                <div className='coverBg'></div>
                <div className=' w-full flex justify-center h-full'>
                    <Image
                        src={nftData?.imageUrl}
                        alt={nftData?.name}
                        preview={true}
                        className="rounded-lg shadow-lg center"
                        style={{
                            height: 280,
                            objectFit: 'contain',
                            marginTop: 60,
                            borderRadius: 12,
                        }}
                    />
                </div>

            </div>

            {/* 基本信息区域 */}
            <Card className="mb-4">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <Title level={4} style={{ margin: 0 }}>
                            {nftData.name}
                        </Title>
                        <Tag color="gold">限量版</Tag>
                    </div>
                    <div className="flex items-center gap-6">
                        <Statistic
                            title="限量发行"
                            value={nftData.quantity}
                            suffix="份"
                            valueStyle={{ color: '#1890ff', fontSize: 14 }}
                        />
                        <div className="h-6 w-[1px] bg-gray-200" />
                        <Statistic
                            title="当前流通"
                            value={nftDetail.soldQty || 0}
                            suffix="份"
                            valueStyle={{ color: '#52c41a', fontSize: 14 }}
                        />
                    </div>
                </div>
            </Card>
            <Card className="mb-8">
                <Tabs defaultActiveKey="1" size="middle" className="nft-detail-tabs">
                    <TabPane tab="寄售列表" key="1">
                        <List
                            itemLayout="horizontal"
                            dataSource={mockData.consignments}
                            renderItem={item => (
                                <List.Item
                                    key={item.id}
                                    actions={[
                                        <div className="flex flex-col items-end gap-2 mb-1s">
                                            <Text className="price-text">
                                                {item.price}
                                            </Text>
                                            <Button
                                                type="primary"
                                                icon={<ShoppingCartOutlined />}
                                                size="middle"
                                            >
                                                购买
                                            </Button>
                                        </div>
                                    ]}
                                >
                                    <List.Item.Meta
                                        title={
                                            <div className="flex items-center gap-3">
                                                <span className="text-lg font-medium">{item.name}</span>
                                                <Tag color="blue">{item.serialNumber}</Tag>
                                            </div>
                                        }
                                        description={
                                            <div className="hash-container mt-2 flex items-center gap-2">
                                                <LinkOutlined />
                                                <Text copyable={{ text: item.hash }}>
                                                    {item.hash}
                                                </Text>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </TabPane>

                    <TabPane tab="当前成交" key="2">
                        <List
                            itemLayout="horizontal"
                            dataSource={mockData.transactions}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={<Text strong>成交价格: {item.price}</Text>}
                                        description={
                                            <div>
                                                <Text type="secondary">买家: {item.buyer}</Text>
                                                <br />
                                                <Text type="secondary">成交时间: {item.time}</Text>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </TabPane>

                    <TabPane tab="NFT详情" key="3">
                        <div className="space-y-4">
                            <div>
                                <Text type="secondary">创作者：</Text>
                                <Text strong>{mockData.details.creator}</Text>
                            </div>
                            <div>
                                <Text type="secondary">创建时间：</Text>
                                <Text strong>{mockData.details.createTime}</Text>
                            </div>
                            <div>
                                <Text type="secondary">区块链：</Text>
                                <Text strong>{mockData.details.blockchain}</Text>
                            </div>
                            <div>
                                <Text type="secondary">合约地址：</Text>
                                <Text copyable strong>{mockData.details.contract}</Text>
                            </div>
                        </div>
                    </TabPane>

                    <TabPane tab="相关公告" key="4">
                        <List
                            itemLayout="vertical"
                            dataSource={mockData.announcements}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={item.title}
                                        description={item.date}
                                    />
                                    <Text>{item.content}</Text>
                                </List.Item>
                            )}
                        />
                    </TabPane>
                </Tabs>
            </Card>

        </div >
    );
};

export default NFTDetail;

