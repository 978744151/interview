import React from 'react';
import { Avatar, Button, Input } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import './index.scss';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

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
    item
}) => {

    const handleClick = () => {
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

    const handleOnOpenModal = (e: React.MouseEvent) => {
        e.stopPropagation();
        onOpenModal?.({
            ...item,
            author,
            content,
            commentId: item?.id,
            replyTo: item?.user._id,
        });
    };
    return (
        <div className="comment-item">
            <div className="comment-main" >
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
        </div >
    );
};

export default CommentItem;