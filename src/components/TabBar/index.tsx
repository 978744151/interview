import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HomeOutlined, AppstoreOutlined, UserOutlined, BellOutlined } from '@ant-design/icons';
import './index.scss';

const TabBar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const tabs = [
        { key: '/', icon: <HomeOutlined />, label: '首页' },
        { key: '/nft/digitalCollectionPage', icon: <AppstoreOutlined />, label: '藏品' },
        { key: '/notice', icon: <BellOutlined />, label: '消息' },
        { key: '/user', icon: <UserOutlined />, label: '我的' },
    ];

    return (
        <div className="tab-bar">
            {tabs.map(tab => (
                <div
                    key={tab.key}
                    className={`tab-item ${location.pathname === tab.key ? 'active' : ''}`}
                    onClick={() => navigate(tab.key)}
                >
                    {tab.icon}
                    <span>{tab.label}</span>
                </div>
            ))}
        </div>
    );
};

export default TabBar;