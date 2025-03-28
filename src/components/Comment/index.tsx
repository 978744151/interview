import React, { useState } from 'react';
import { Avatar, Button, Input, message } from 'antd';
import { ActionSheet, } from 'antd-mobile';

import { LikeOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import './index.scss';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { deleteComment } from '@/api/comment.ts';
import { getStore, } from '@/utils/store.ts';

interface CommentProps {
    author: string;
    avatar: string;
    content: string;
    datetime: string;
    likeCount?: number;
    onReply?: () => void;
    onLike?: any;
    children?: React.ReactNode;
    isMobile?: boolean;
    onFocus?: () => void;
    onOpenModal: any,
    item: any
    onDelete?: (id: string) => void,
    onfetchComment?: any
}

const CommentItem: React.FC<CommentProps> = ({
    author,
    avatar,
    content,
    datetime,
    likeCount = 0,
    onReply,
    onLike,
    children,
    onFocus,
    isMobile = false,
    onOpenModal,
    item,
    onfetchComment
}) => {
    const [showActionSheet, setShowActionSheet] = useState(false);

    const handleTouchStart = () => {
        const timer = setTimeout(() => {
            setShowActionSheet(true);
        }, 800);
        setPressTimer(timer);
    }; const handleClick = () => {
        if (isMobile) {
            onReply?.();
            // 自动聚焦并打开键盘
            onFocus?.();
            // 滚动到评论框位置
            const commentInput = document.querySelector('.comment-input textarea');
            if (commentInput) {
                (commentInput as HTMLTextAreaElement).focus();
                commentInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    };

    const handleOnOpenModal = (e: any) => {
        e.stopPropagation();
        onOpenModal?.({
            ...item,
            author,
            content,
            commentId: item?.id,
            replyTo: item?.user._id,
        });
    };
    const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
    const onDelete = async (id: string) => {
        const { data } = await deleteComment(id)
        if (data.success) {
            message.success('删除成功');
            onfetchComment()
        }
    };
    const getActions = () => {
        const baseActions: any = [
            { text: '回复', key: 'reply' },
            { text: '复制', key: 'copy' },
            { text: '分享到微信', key: 'share' },
        ];

        // 只有当评论是用户自己发的才显示删除按钮
        if (item?.user._id === getStore({ name: 'userInfo' })?._id) {
            baseActions.push({ text: '删除', key: 'delete', danger: true });
        }

        return baseActions;
    };
    const handleAction = (type: any) => {
        switch (type) {
            case 'delete':
                onDelete?.(item.id);
                break;
            case 'copy':
                navigator.clipboard.writeText(content);
                break;
            case 'reply':
                handleOnOpenModal({
                    stopPropagation: () => { },
                });
                break;
            case 'share':
                // 分享到微信的逻辑
                break;
        }
        setShowActionSheet(false);
    };

    const handleTouchEnd = () => {
        if (pressTimer) {
            clearTimeout(pressTimer);
            setPressTimer(null);
        }
    };

    return (
        <div className="comment-item">
            <div
                className="comment-main"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchMove={handleTouchEnd}
            >
                <Avatar src={item.user.avatar} className="comment-avatar" />
                <div className="comment-content">
                    <div className="comment-header">
                        <div>
                            <span className="author">{author}</span>
                            <span className="time">{dayjs(datetime).format('YYYY-MM-DD HH:mm')}</span>
                        </div>
                        <div className="meta-info">
                            <div className="like-wrapper">
                                {item?.isLiked ? (
                                    <HeartFilled
                                        className="font-size-16 liked"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            onLike?.(item?.id);
                                        }}
                                    />
                                ) : (
                                    <HeartOutlined
                                        className="font-size-16"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            onLike?.(item?.id);
                                        }}
                                    />
                                )}
                                {likeCount > 0 && <span className="like-count"> {likeCount} </span>}
                            </div>
                        </div>
                    </div>
                    <div className="comment-text" onClick={handleOnOpenModal} >  {item.toUserName && <Button type="link" size='small' style={{ color: " #3f3f3f " }}>回复 {item.toUserName}:
                    </Button>}{content} {!item.parentId && <span className="comment-text-reply" >回复</span>} </div>
                </div>
            </div>
            {children && <div className="comment-replies" >{children}</div>}
            <ActionSheet
                visible={showActionSheet}
                actions={getActions()}
                onAction={action => handleAction(action.key)}
                onClose={() => setShowActionSheet(false)}
            />
        </div >
    );
};

export default CommentItem;