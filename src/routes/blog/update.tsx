import { useEffect, useState, useRef } from 'react'
import AIEditor from '../../components/AIEditor';
// ... existing imports ...
import { Button, Form, Input, message } from 'antd';
import { createBlog } from '@/api/log';
import { useNavigation, useParams } from '@/hooks/useNavigation'
import { getBlogDetail, updateBlog } from '@/api/log'
function BlogCreate() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState("");
    const [blogData, setBlogData] = useState<any>({})
    const { id } = useParams();
    const { navigate, goBack } = useNavigation()

    const containerStyle = {
        marginTop: 20,
        padding: '0 50px',
        maxWidth: 1200,
        marginLeft: 'auto',
        marginRight: 'auto'
    }

    //初始化 AiEditor
    // 获取博客详情
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getBlogDetail(id)
                if (data.success) {
                    form.setFieldsValue({
                        title: data.data.title,
                        summary: data.data.summary
                    });
                    setBlogData(data.data)
                    setTimeout(() => {
                        setValue(data.data.content)

                    }, 200);
                }
            } catch (error) {
                console.error('获取博客详情失败:', error)
                navigate('/')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [id])
    // 提交逻辑
    const handleSubmit = async () => {
        // const navigate = useNavigate();
        try {
            setLoading(true);
            const values = await form.validateFields();

            if (!value) {
                message.error('请填写博客内容');
                return;
            }
            console.log(value)
            await updateBlog(id, {
                title: values.title,
                summary: values.summary,
                content: value,

            });

            message.success('博客修改成功');
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
                        rules={[{ required: true, message: '请输入摘要' }]}
                    >
                        <Input.TextArea
                            placeholder="请输入博客摘要"
                            rows={3}
                            maxLength={200}
                            showCount
                        />
                    </Form.Item>

                    <div style={{ margin: '16px 0' }}>
                        {blogData?._id &&
                            <AIEditor placeholder="支持 Markdown 语法.."
                                style={{ height: 620 }}
                                value={value}

                                onChange={(val) => setValue(val)} />
                        }
                    </div>

                    <Button
                        type="primary"
                        onClick={handleSubmit}
                        loading={loading}
                        size="large"
                    >
                        立即发布
                    </Button>
                </Form>
            </div>
        </ >
    )
}
export default BlogCreate