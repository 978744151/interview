import React from 'react';
import { Avatar, Button, Input } from 'antd';
import { LikeOutlined, MessageOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import './index.scss';

interface CommentProps {
    author: string;
    avatar: string;
    content: string;
    datetime: string;
    likes?: number;
    onReply?: () => void;
    onLike?: () => void;
    children?: React.ReactNode;
}

const CommentItem: React.FC<CommentProps> = ({
    author,
    avatar,
    content,
    datetime,
    likes = 0,
    onReply,
    onLike,
    children
}) => {
    return (
        <div className="comment-item">
            <div className="comment-main">
                <Avatar src={avatar} className="comment-avatar" />
                <div className="comment-content">
                    <div className="comment-header">
                        <span className="author">{author}</span>
                        <span className="time">{dayjs(datetime).format('YYYY-MM-DD HH:mm')}</span>
                    </div>
                    <div className="comment-text">{content}</div>
                    <div className="comment-actions">
                        <Button
                            type="text"
                            icon={<LikeOutlined />}
                            onClick={onLike}
                        >
                            {likes > 0 && <span>{likes}</span>}
                        </Button>
                        <Button
                            type="text"
                            icon={<MessageOutlined />}
                            onClick={onReply}
                        >
                            回复
                        </Button>
                    </div>
                </div>
            </div>
            {children && <div className="comment-replies">{children}</div>}
        </div>
    );
};

export default CommentItem;