import { useEffect, useRef, useState } from 'react'
import { AiEditor } from "aieditor";
import "aieditor/dist/style.css"
import { useNavigation } from '@/hooks/useNavigation.ts'
import { getBlogDetail } from '@/api/log.ts'
import { Skeleton, Typography, Button, Input, Avatar, List, message } from 'antd'
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom';
import './preview.scss'
import { Breadcrumb } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import CommentItem from '@/components/Comment/index.tsx';
import { createComment, getComment } from '@/api/comment.ts'
const { Title, Text } = Typography

interface CommentItem {
    id: string;
    content: string;
    createTime: string;
    user: {
        name: string;
        avatar: string;
    };
    replies?: CommentItem[];
}

function BlogPreview() {
    const containerStyle: React.CSSProperties = {
        marginTop: 20,
        padding: '0 12px',
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
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [id])

    useEffect(() => {
        fetchComment()
    }, [id])
    const fetchComment = async () => {
        try {
            const { data } = await getComment({ blogId: id })
            if (data.success) {
                setComments(data.data)
            }
        } catch (error) {
            console.error('获取博客详情失败:', error)
        } finally {
            setLoading(false)
        }
    }
    const [comments, setComments] = useState<CommentItem[]>([]);
    const [commentContent, setCommentContent] = useState('');
    const [replyTo, setReplyTo] = useState<string | null>(null);
    const { TextArea } = Input;

    // 提交评论
    const handleSubmitComment = async () => {
        if (!commentContent.trim()) {
            message.warning('请输入评论内容');
            return;
        }
        try {
            // TODO: 调用评论接口
            const newComment = {
                blogId: id,
                content: commentContent,
            };
            const { data } = await createComment(newComment)
            if (!data.success) {
                message.error('评论失败');
                return
            }
            // await fetchComment()
            setComments(prev => [newComment, ...prev]);
            setCommentContent('');
            message.success('评论成功');
        } catch (error) {
            message.error('评论失败');
        }
    };

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey && isMobile) {
            e.preventDefault();
            handleSubmitComment();
        }
    };

    return (
        <>
            <div style={containerStyle} className='preview'>
                <Breadcrumb style={{ marginBottom: 24 }}>
                    <Breadcrumb.Item><LeftOutlined style={{ fontSize: 18 }} onClick={goBack} /></Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <div className="truncate max-w-[300px]">{blogData?.title}</div>
                    </Breadcrumb.Item>
                </Breadcrumb>
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

                <div ref={divRef} style={{
                    border: '1px solid #f0f0f0',
                    borderRadius: 4,
                    padding: 16,
                    marginBottom: 32
                }} />

                {/* 评论区域 */}
                <div className="comments-section">
                    <Title level={4} style={{ marginBottom: 16 }}>
                        评论区
                    </Title>

                    <div className="comment-input">
                        <TextArea
                            value={commentContent}
                            onChange={e => setCommentContent(e.target.value)}
                            placeholder="写下你的评论..."
                            autoSize={{ minRows: 3, maxRows: 6 }}
                            onKeyPress={handleKeyPress}
                        />
                        <Button
                            type="primary"
                            onClick={handleSubmitComment}
                            style={{ marginTop: 16, display: isMobile ? 'none' : 'inline-block' }}
                        >
                            发表评论
                        </Button>
                    </div>

                    <List
                        className="comment-list"
                        itemLayout="horizontal"
                        dataSource={comments}
                        renderItem={item => (
                            <CommentItem
                                author={item.user?.name}
                                // avatar={item.user.avatar}
                                content={item?.content}
                                datetime={item.createTime}
                                likes={item.likes}
                                onReply={() => setReplyTo(item.id)}
                                onLike={() => handleLikeComment(item.id)}
                            >
                                {replyTo === item.id && (
                                    <div className="reply-input">
                                        <TextArea
                                            placeholder="回复评论..."
                                            autoSize={{ minRows: 2, maxRows: 4 }}
                                            style={{ marginBottom: 8 }}
                                        />
                                        <Button
                                            size="small"
                                            type="primary"
                                            style={{ marginRight: 8 }}
                                        >
                                            提交
                                        </Button>
                                        <Button
                                            size="small"
                                            onClick={() => setReplyTo(null)}
                                        >
                                            取消
                                        </Button>
                                    </div>
                                )}
                                {item.replies?.map(reply => (
                                    <CommentItem
                                        key={reply.id}
                                        author={reply.user.name}
                                        avatar={reply.user.avatar}
                                        content={reply.content}
                                        datetime={reply.createTime}
                                        likes={reply.likes}
                                    />
                                ))}
                            </CommentItem>
                        )}
                    />
                </div>
            </div>
        </>
    )
}

export default BlogPreview