import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import './index.scss'; import { useNavigate } from 'react-router-dom';
import { getStore } from '@/utils/store.ts'
import { message } from 'antd';
interface FloatingButtonProps {
    icon?: React.ReactNode;
    onClick?: () => void;
    style?: React.CSSProperties;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
    icon = <PlusOutlined />,
    onClick,
    style
}) => {
    const navigate = useNavigate();

    const handleCreatePost = () => {
        if (!getStore({ name: 'token' })) {
            message.error('请先登录！');
            navigate('/login');
            return;
        }
        navigate('/blog/create');
    };
    return (
        <div
            className="floating-button"
            onClick={handleCreatePost}
            style={style}
        >
            {icon}
        </div>
    );
};

export default FloatingButton;