import { useEffect, useRef, useState } from 'react'
import { AiEditor } from "aieditor";
import "aieditor/dist/style.css"
import { useNavigation } from '@/hooks/useNavigation.ts'
import { getBlogDetail } from '@/api/log.ts'
import { Skeleton, Typography, Button, Input, Avatar, List, message } from 'antd'
// import { List, Switch } from 'antd-mobile'
import { createLike } from '@/api/comment.ts'

import dayjs from 'dayjs'
import { useParams } from 'react-router-dom';
import './preview.scss'
import { Breadcrumb } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import CommentItem from '@/components/Comment/index.tsx';
import { createComment, getComment, commentIdReply } from '@/api/comment.ts'
import { comment } from 'postcss';
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
    const textareaRef = useRef<HTMLTextAreaElement>(null);
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
    // 在状态部分添加
    const [currentCommentId, setCurrentCommentId] = useState<string | null>(null);

    // 修改 handleOnOpenModal 函数
    const handleOnOpenModal = async (info: { author: string; content: string, commentId: string }) => {
        console.log(info)
        setReplyInfo(info);
        setCurrentCommentId(info.commentId);
        setIsModalVisible(true);
    };
    const handleLikeComment = async (commentId: string) => {
        console.log(commentId)
        try {
            const { data } = await createLike({ commentId });
            if (data.success) {
                // message.success('点赞成功');
                await fetchComment(); // 刷新评论列表
            }
        } catch (error) {
            message.error('点赞失败');
        }
    };    // 修改提交评论函数
    const handleSubmitComment = async () => {
        console.log(`123`)
        if (!commentContent.trim()) {
            message.warning('请输入评论内容');
            return;
        }
        try {
            if (currentCommentId) {
                // 发送子评论
                const { data } = await commentIdReply({
                    commentId: currentCommentId,
                    content: commentContent,
                    blog: id,
                });
                if (!data.success) {
                    message.error('回复失败');
                    return;
                }
                message.success('回复成功');
                await fetchComment();
            } else {
                // 发送主评论
                const newComment = {
                    blogId: id,
                    content: commentContent,
                };
                const { data } = await createComment(newComment);
                if (!data.success) {
                    message.error('评论失败');
                    return;
                }
                message.success('评论成功');
                setComments(prev => [data.data, ...prev]);
                setCommentContent('');
            }

            // 重置状态
            setCommentContent('');
            setIsModalVisible(false);
            setCurrentCommentId(null);
            setReplyInfo(null);
            // 刷新评论列表

        } catch (error) {
            message.error(currentCommentId ? '回复失败' : '评论失败');
        }
    };
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [replyInfo, setReplyInfo] = useState<{ author: string; content: string } | null>(null);

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
                                {/* <Text>❤️ {blogData.likes} 点赞</Text> */}
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

                {/* 评论区域 */}
                <div className="comments-section">
                    <Title level={4} style={{ marginBottom: 16 }}>
                        评论区
                    </Title>

                    <div className="comment-input-wrapper" onClick={() => {
                        textareaRef.current?.focus()
                        setIsModalVisible(true)
                    }}>
                        <Avatar src="https://api.dicebear.com/7.x/avataaars/svg" className="avatar" />
                        <div className="input-container">
                            写点什么吧...
                        </div>
                        {!isMobile && (
                            <Button type="primary" onClick={() => handleSubmitComment}>
                                发表
                            </Button>
                        )}
                    </div>

                    <List
                        className="comment-list"
                        itemLayout="horizontal"
                        dataSource={comments}
                        renderItem={item => (
                            <CommentItem
                                // ... 其他属性
                                // onFocus={() => {
                                //     // 可以在这里添加额外的聚焦逻辑
                                //     const textarea = document.querySelector('.comment-input textarea');
                                //     if (textarea) {
                                //         (textarea as HTMLTextAreaElement).focus();
                                //     }
                                // }}
                                author={item.user?.name}
                                // avatar={item.user.avatar}
                                content={item?.content}
                                datetime={item.createTime}
                                likeCount={item.likeCount}
                                item={item}
                                // onReply={() => handleSetReplyTo(item.id)}
                                onLike={handleLikeComment}
                                onOpenModal={handleOnOpenModal}
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
                                        likeCount={reply.likeCount}
                                        onClick={() => handleOnOpenModal(reply)}

                                    />
                                ))}
                            </CommentItem>
                        )}
                    />
                </div>
            </div>
            <div
                className={`modal-backdrop ${isModalVisible ? 'visible' : ''}`}
                onClick={() => setIsModalVisible(false)}
            />
            <div className={`comment-modal ${isModalVisible ? 'visible' : ''}`}>
                <div className="modal-content">
                    {replyInfo && (
                        <div className="reply-info">
                            <div className="reply-to">回复 {replyInfo?.author}</div>
                            <div className="reply-content" title={replyInfo?.content}>
                                {replyInfo?.content}
                            </div>
                        </div>
                    )}
                </div>
                <div className="modal-content">
                    <div className="input-wrapper">
                        <textarea
                            value={commentContent}
                            onChange={e => setCommentContent(e.target.value)}
                            placeholder="写下你的评论..."
                            autoFocus
                            ref={textareaRef}
                            onKeyPress={handleKeyPress}
                        />
                        {/* <div className="emoji-buttons">
                            <button className="emoji-btn">😊</button>
                            <button className="emoji-btn">👍</button>
                            <button className="emoji-btn">😄</button>
                        </div> */}
                    </div>
                    <div className="action-buttons">
                        <button className="cancel" onClick={() => setIsModalVisible(false)}>
                            取消
                        </button>
                        <button className="submit" onClick={() => handleSubmitComment()} >
                            发送
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default BlogPreview