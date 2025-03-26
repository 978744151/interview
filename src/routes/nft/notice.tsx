import React, { useState, useEffect } from 'react';
import { Card, List, Typography, Tag, Input, Select, DatePicker, Space, Badge } from 'antd';
import { BellOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { getNoticeList, getNoticeListSync } from '@/api/nft'
import CustomBreadcrumb from '@/components/CustomBreadcrumb/index.tsx';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const { RangePicker } = DatePicker;

const NoticePage: React.FC = () => {
    const fetchData = async () => {
        try {
            // await getNoticeListSync({})
            const { data } = await getNoticeList({})
            console.log(data)
            if (data.success) {

            }
        } catch (error) {

        } finally {

        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    // setInterval(() => {
    //     fetchData()
    // }, 10000)
    const [notices, setNotices] = useState([
        {
            id: 1,
            title: '重要系统升级通知',
            content: '为提供更好的服务体验，系统将于2024年2月1日进行升级维护...',
            type: 'important',
            date: '2024-01-28',
            status: 'unread'
        },
        {
            id: 2,
            title: '新功能发布公告',
            content: '我们很高兴地宣布，新的交易功能已经上线...',
            type: 'feature',
            date: '2024-01-25',
            status: 'read'
        },
        // 更多公告数据...
    ]);

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }} className="main-content">
            <CustomBreadcrumb title="公告通知"></CustomBreadcrumb>
            <Card>
                <div style={{ marginBottom: 24 }}>
                    <Title level={4}>
                        <BellOutlined style={{ marginRight: 8 }} />
                        系统公告
                    </Title>
                </div>

                <div style={{ marginBottom: 24 }}>
                    <Space size={16}>
                        <Search
                            placeholder="搜索公告"
                            style={{ width: 300 }}
                            allowClear
                        />
                        <Select
                            defaultValue="all"
                            style={{ width: 120 }}
                        >
                            <Select.Option value="all">全部类型</Select.Option>
                            <Select.Option value="important">重要通知</Select.Option>
                            <Select.Option value="feature">功能更新</Select.Option>
                            <Select.Option value="maintenance">系统维护</Select.Option>
                        </Select>
                        <RangePicker />
                    </Space>
                </div>

                <List
                    itemLayout="vertical"
                    dataSource={notices}
                    renderItem={item => (
                        <List.Item
                            key={item.id}
                            extra={
                                <Space>
                                    <ClockCircleOutlined style={{ color: '#8c8c8c' }} />
                                    <Text type="secondary">{item.date}</Text>
                                </Space>
                            }
                        >
                            <List.Item.Meta
                                title={
                                    <Space>
                                        {item.status === 'unread' && (
                                            <Badge status="processing" />
                                        )}
                                        <Text strong>{item.title}</Text>
                                        {item.type === 'important' && (
                                            <Tag color="red">重要</Tag>
                                        )}
                                        {item.type === 'feature' && (
                                            <Tag color="blue">更新</Tag>
                                        )}
                                        {item.type === 'maintenance' && (
                                            <Tag color="orange">维护</Tag>
                                        )}
                                    </Space>
                                }
                                description={
                                    <Paragraph
                                        ellipsis={{ rows: 2 }}
                                        style={{ marginTop: 8 }}
                                    >
                                        {item.content}
                                    </Paragraph>
                                }
                            />
                        </List.Item>
                    )}
                />
            </Card>
        </div>
    );
};

export default NoticePage;