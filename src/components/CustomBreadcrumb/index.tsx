import React from 'react';
import { Breadcrumb } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigation } from '@/hooks/useNavigation.ts';

interface CustomBreadcrumbProps {
    title?: string;
}

const CustomBreadcrumb: React.FC<CustomBreadcrumbProps> = ({ title }) => {
    const { goBack } = useNavigation();

    return (
        <Breadcrumb style={{ marginBottom: 24 }}>
            <Breadcrumb.Item>
                <LeftOutlined style={{ fontSize: 18, cursor: 'pointer' }} onClick={goBack} />
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <div className="truncate max-w-[200px]">{title}</div>
            </Breadcrumb.Item>
        </Breadcrumb>
    );
};

export default CustomBreadcrumb;