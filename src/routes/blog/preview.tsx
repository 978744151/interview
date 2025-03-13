import { useEffect, useRef, useState } from 'react'
import { AiEditor } from "aieditor";
import "aieditor/dist/style.css"
import MainLayout from '@/layouts/MainLayout'
import { useNavigation } from '@/hooks/useNavigation'
import { getBlogDetail } from '@/api/log'
import { Skeleton, Typography, Button } from 'antd'
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom';
import './preview.scss'

const { Title, Text } = Typography

function BlogPreview() {
    const containerStyle: React.CSSProperties = {
        marginTop: 20,
        padding: '0 50px',
        maxWidth: 1200,
        marginLeft: 'auto',
        marginRight: 'auto'
    };

    const [loading, setLoading] = useState(true)
    const [blogData, setBlogData] = useState<any>(null)
    const { id } = useParams();
    const { navigate, goBack } = useNavigation()
    const divRef = useRef<HTMLDivElement>(null)

    // 初始化只读编辑器
    useEffect(() => {
        if (!blogData?.content || !divRef.current) return

        const aiEditor = new AiEditor({
            element: divRef.current,
            content: blogData.content,
            contentIsMarkdown: true,
            editable: false, // 禁用编辑
            toolbar: true,  // 隐藏工具栏
            plugins: [],      // 禁用所有插件
            codeBlock: {
                languages: [
                    { name: 'Auto', value: 'auto' },
                    { name: 'Plain Text', value: 'plaintext', alias: ['text', 'txt'] },
                    { name: 'Bash', value: 'bash', alias: ['sh'] },
                    { name: 'BASIC', value: 'basic', alias: [] },
                    { name: 'C', value: 'c', alias: ['h'] },
                    { name: 'Clojure', value: 'clojure', alias: ['clj', 'edn'] },
                    { name: 'CMake', value: 'cmake', alias: ['cmake.in'] },
                ],
                codeExplainPrompt: "帮我对这个代码进行解释，返回代码的解释内容，注意，不需要对代码的注释进行解释",
                codeCommentsPrompt: "帮我对这个代码添加一些注释，并返回添加注释的代码，只返回代码",
            },
        })

        return () => aiEditor.destroy()
    }, [blogData])

    // 获取博客详情
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getBlogDetail(id)
                if (data.success) {
                    setBlogData(data.data)
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

    return (
        <>
            <div style={containerStyle} className='preview'>
                <Button onClick={goBack} style={{ marginBottom: 24 }}>返回</Button>

                <Skeleton loading={loading} active>
                    {blogData && (
                        <>
                            <Title level={2} style={{ marginBottom: 16 }}>
                                {blogData.title}
                            </Title>

                            <div style={{
                                display: 'flex',
                                gap: 16,
                                marginBottom: 24,
                                color: '#666'
                            }}>
                                <Text>作者：{blogData.createName || '匿名用户'}</Text>
                                <Text>发布时间：{dayjs(blogData.createdAt).format('YYYY-MM-DD HH:mm')}</Text>
                                <Text>❤️ {blogData.likes} 点赞</Text>
                            </div>

                            <Title level={4} style={{ marginBottom: 16 }}>
                                内容摘要
                            </Title>
                            <div style={{
                                backgroundColor: '#f8f9fa',
                                padding: 16,
                                borderRadius: 4,
                                marginBottom: 32
                            }}>
                                {blogData.summary}
                            </div>

                            <Title level={4} style={{ marginBottom: 16 }}>
                                正文内容
                            </Title>
                            <div ref={divRef} style={{
                                border: '1px solid #f0f0f0',
                                borderRadius: 4,
                                padding: 16
                            }} />


                        </>
                    )}
                </Skeleton>
            </div>
        </>
    )
}

export default BlogPreview