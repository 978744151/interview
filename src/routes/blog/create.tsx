import { useEffect, useState, useRef } from 'react'
import AIEditor from '../../components/AIEditor';
import CustomBreadcrumb from '@/components/CustomBreadcrumb/index.tsx';

import { Button, Form, Input, message } from 'antd';
import { createBlog } from '@/api/log';
import { useNavigate } from "react-router-dom";

function BlogCreate() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState("");
    const containerStyle = {
        marginTop: 20,
        padding: '0 12px',
        maxWidth: 1200,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: 100
    }
    const navigate = useNavigate();

    //初始化 AiEditor
    useEffect(() => {

    }, [])
    // 提交逻辑
    const handleSubmit = async () => {
        try {
            setLoading(true);
            const values = await form.validateFields();

            if (!value) {
                message.error('请填写博客内容');
                return;
            }
            console.log(value)
            await createBlog({
                title: values.title,
                summary: values.summary,
                content: value
            });

            message.success('博客创建成功');
            form.resetFields();
            navigate('/')
        } catch (error) {
            console.log(error)
            // message.error('提交失败，请重试');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>

            <div style={containerStyle}>
                <CustomBreadcrumb title="创建博客" />
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{ required: true, message: '请输入标题' }]}
                    >
                        <Input placeholder="请输入博客标题" maxLength={50} />
                    </Form.Item>

                    <Form.Item
                        label="摘要"
                        name="summary"
                    >
                        <Input.TextArea
                            placeholder="请输入博客摘要"
                            rows={3}
                            maxLength={200}
                            showCount
                        />
                    </Form.Item>

                    <div style={{ margin: '16px 0' }}>
                        <AIEditor placeholder="描述代码的作用，支持 Markdown 语法.."
                            style={{ height: 620 }}
                            value={value}
                            onChange={(val) => setValue(val)} />
                    </div>

                    <Button
                        type="primary"
                        onClick={handleSubmit}
                        loading={loading}
                        size="large"
                        style={{ width: '100%' }}
                    >
                        立即发布
                    </Button>
                </Form>
            </div>
        </ >
    )
}
export default BlogCreate