import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space, Divider, theme } from 'antd';
import { useNavigate } from "react-router-dom";
const { useToken } = theme;

const headerRightComponents: React.FC = () => {
  const { token } = useToken();
  const navigate = useNavigate();
  const handleUnLogin = () => {
    navigate('/login')
  }
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="#">
          个人信息
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="#" onClick={handleUnLogin}>
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
  return (
    <>
      <Dropdown
        menu={{ items }}
        dropdownRender={(menu) => (
          <div style={contentStyle}>
            {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
            <Divider style={{ margin: 0 }} />
          </div>
        )}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            欢迎光临
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </>
  );
}

const DeskHeaderComponents: React.FC = () => {
  return (
    <>
      <div className="flex justify-between">
        <div>我想睡觉</div>
        {headerRightComponents({}, {})}
      </div>
    </>
  );
}

export default DeskHeaderComponents;