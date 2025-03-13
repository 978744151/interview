import React, { useState } from 'react';
import { DownOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space, Divider, theme, Layout, Button, Typography } from 'antd';
import { useNavigate } from "react-router-dom";
import { getStore } from '@/utils/store';
const { Text } = Typography;

const { useToken } = theme;
const { Header } = Layout;
const headerStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  width: "100%",
  color: '#333',
  top: 0,
  borderBottom: '1px solid #eee',
};
const titleStyle: React.CSSProperties = {
  fontSize: '14px',
  cursor: 'pointer',
}
const headerRightComponents: React.FC = () => {
  const { token } = useToken();
  const navigate = useNavigate();
  const handleUnLogin = () => {
    navigate('/login')
  }
  const handleBase = () => {
    navigate('/base')
  }
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a rel="noopener noreferrer" onClick={handleBase}>
          个人信息
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a rel="noopener noreferrer" onClick={handleUnLogin}>
          退出登录
        </a>
      ),
      disabled: false,
    }
  ];
  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const menuStyle: React.CSSProperties = {
    boxShadow: 'none',
  };
  // 新增新建博客跳转
  const handleCreateBlog = () => {
    navigate('/blog/create');
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleCreateBlog}
        style={{
          borderRadius: 6,
          padding: '0 20px',
          height: 36,
          background: '#1890ff',
          border: 'none',
          boxShadow: '0 2px 4px rgba(24,144,255,0.2)',
          transition: 'all 0.3s',
        }}
      >
        新建博客
      </Button>

      <Dropdown
        menu={{ items }}
        dropdownRender={(menu) => (
          <div style={contentStyle}>
            {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
            <Divider style={{ margin: 0 }} />
          </div>
        )}
      >
        <a onClick={(e) => e.preventDefault()} style={{ display: 'block' }}>
          <Space
            style={{
              borderRadius: 6,
              transition: 'background 0.3s',
              cursor: 'pointer',
              ':hover': { background: '#f5f5f5' }
            }}
          >
            <UserOutlined style={{ color: '#666', fontSize: 16 }} />
            <Text strong style={{ color: '#333' }}>
              {getStore({ name: 'userInfo' })?.name}
            </Text>
            <DownOutlined style={{ color: '#666', fontSize: 12 }} />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
}

const DeskHeaderComponents: React.FC = () => {
  const navigate = useNavigate();
  const handleToHome = () => {
    navigate('/')
  }
  return (
    <Header style={headerStyle}>
      <div className="flex justify-between align-center">
        <div style={titleStyle} onClick={handleToHome}>幻殇</div>
        {headerRightComponents({}, {})}
      </div>
    </Header>
  );
}

export default DeskHeaderComponents;