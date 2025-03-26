import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HomeOutlined, AppstoreOutlined, UserOutlined, BellOutlined } from '@ant-design/icons';
import './index.scss';

const TabBar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const tabs = [
        { key: '/', icon: <HomeOutlined />, label: '首页' },
        { key: '/nft/digitalCollectionPage', icon: <AppstoreOutlined />, label: '藏品' },
        { key: '/blog/list', icon: <BellOutlined />, label: '社区' },
        { key: '/base', icon: <UserOutlined />, label: '我的' },
    ];

    return (
        <>
            {true && <div className="tab-bar">
                <div className="tab-bar-inner">
                    {tabs.map(tab => (
                        <div
                            key={tab.key}
                            className={`tab-item ${location.pathname === tab.key ? 'active' : ''}`}
                            onClick={() => navigate(tab.key)}
                        >
                            <div className="tab-content">
                                {React.cloneElement(tab.icon, {
                                    className: `tab-icon ${location.pathname === tab.key ? 'icon-active' : ''}`
                                })}
                                <span className="tab-label">{tab.label}</span>
                            </div>
                            {location.pathname === tab.key && <div className="tab-indicator" />}
                        </div>
                    ))}
                </div>
            </div>}
        </>
    );
};

export default TabBar;