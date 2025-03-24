import React from 'react';
import { Outlet } from 'react-router-dom';
import TabBar from '@/components/TabBar';

const RootLayout: React.FC = () => {
    return (
        <>
            <Outlet />
            <TabBar />
        </>
    );
};

export default RootLayout;