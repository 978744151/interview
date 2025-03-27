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
    // const onLike = () => {
    //     // 处理点赞逻辑
    //     console.log('点赞', item?.id);
    //     createLike({
    //         commentId: item?.id
    //     })
    // };
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
    const handleChildrenClick = (e: React.MouseEvent) => {

        console.log(123)
        e.stopPropagation();
        if (item?.replies?.length > 0) {
            onOpenModal?.({
                author: item.replies[0].user?.name,
                content: item.replies[0].content,
                commentId: item.replies[0].id
            });
        }
    };
    const handleOnOpenModal = (e: React.MouseEvent) => {
        e.stopPropagation();
        onOpenModal?.({
            author,
            content,
            commentId: item?.id
        });
    };
    return (
        <div className="comment-item">
            <div className="comment-main" onClick={() => handleClick()}>
                <Avatar src={avatar} className="comment-avatar" />
                <div className="comment-content" onClick={handleOnOpenModal}>
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
                    <div className="comment-text"  >{content}</div>
                </div>
            </div>
            {children && <div className="comment-replies" onClick={handleChildrenClick}>{children}</div>}
        </div>
    );
};

export default CommentItem;