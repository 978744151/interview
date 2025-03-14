import React, { useState } from 'react';
import { DatePicker, Button, Select, InputNumber, Card, Typography, Row, Col } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import MainLayout from '@/layouts/MainLayout';
import { useNavigation } from '@/hooks/useNavigation';

const { Title } = Typography;
const { Option } = Select;

const Game4 = () => {
    const { goBack } = useNavigation();
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    const [operation, setOperation] = useState<'add' | 'subtract'>('add');
    const [days, setDays] = useState<number>(0);
    const [result, setResult] = useState<string>('');

    // 计算日期差
    const calculateDifference = () => {
        if (startDate && endDate) {
            const diffDays = endDate.diff(startDate, 'day');
            setResult(`相差天数: ${Math.abs(diffDays)} 天`);
        }
    };

    // 计算日期加减
    const calculateOperation = () => {
        if (startDate && days > 0) {
            const calculatedDate = operation === 'add'
                ? startDate.add(days, 'day')
                : startDate.subtract(days, 'day');
            setResult(`结果日期: ${calculatedDate.format('YYYY-MM-DD')}`);
        }
    };

    return (
        <>
            <div style={{ maxWidth: 800, margin: '40px auto' }}>
                <Button onClick={goBack} style={{ marginBottom: 24 }}>返回</Button>
                <Title level={2} style={{ marginBottom: 24 }}>日期计算器</Title>

                <Card>
                    <Row gutter={16}>
                        {/* 日期差计算 */}
                        <Col span={12}>
                            <Title level={5} style={{ marginBottom: 16 }}>计算两个日期差值</Title>
                            <div style={{ marginBottom: 16 }}>
                                <DatePicker
                                    placeholder="开始日期"
                                    value={startDate}
                                    onChange={setStartDate}
                                    style={{ width: '100%', marginBottom: 8 }}
                                />
                            </div>
                            <div style={{ marginBottom: 16 }}>
                                <DatePicker
                                    placeholder="结束日期"
                                    value={endDate}
                                    onChange={setEndDate}
                                    style={{ width: '100%', marginBottom: 8 }}
                                />
                            </div>
                            <Button
                                type="primary"
                                onClick={calculateDifference}
                                disabled={!startDate || !endDate}
                            >
                                计算差值
                            </Button>
                        </Col>

                        {/* 日期加减计算 */}
                        <Col span={12}>
                            <Title level={5} style={{ marginBottom: 16 }}>日期加减计算</Title>
                            <div style={{ marginBottom: 16 }}>
                                <DatePicker
                                    placeholder="选择基准日期"
                                    value={startDate}
                                    onChange={setStartDate}
                                    style={{ width: '100%', marginBottom: 8 }}
                                />
                            </div>
                            <div style={{ marginBottom: 16 }}>
                                <InputNumber
                                    min={1}
                                    value={days}
                                    onChange={(value) => setDays(value || 0)}
                                    placeholder="输入天数"
                                    style={{ width: '45%', marginRight: '5%' }}
                                />
                                <Select
                                    value={operation}
                                    onChange={(value) => setOperation(value)}
                                    style={{ width: '50%' }}
                                >
                                    <Option value="add">加</Option>
                                    <Option value="subtract">减</Option>
                                </Select>
                            </div>
                            <Button
                                type="primary"
                                onClick={calculateOperation}
                                disabled={!startDate || days <= 0}
                            >
                                计算日期
                            </Button>
                        </Col>
                    </Row>

                    {result && (
                        <div style={{
                            marginTop: 24,
                            padding: 16,
                            backgroundColor: '#f0f5ff',
                            borderRadius: 4,
                            textAlign: 'center'
                        }}>
                            <Title level={4} style={{ color: '#1890ff' }}>{result}</Title>
                        </div>
                    )}
                </Card>
            </div>
        </>
    );
};

export default Game4;