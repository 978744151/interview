import React from 'react';
import { Layout, } from 'antd';
import AnchorComponent from './anchor'
import Menus from './menus'
import DeskHeaderComponents from './desk-header'
const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  // paddingInline: 48,
  // lineHeight: '64px',
  backgroundColor: '#fff',
  width: "100%",
  color: '#333',
  top: 0,
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  // overflow: 'auto'
};


const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#fff',
  position: 'fixed',
  width: "100%",
  zIndex: 10,
  bottom: 0,
};

const layoutStyle = {
  // overflow: 'scroll',
  // width: '100%',
};

const Home: React.FC = () => (
  <>
    <Layout style={layoutStyle}>
      {/* <Menus/> */}
      <Header style={headerStyle}>
        <DeskHeaderComponents />
      </Header>
      <Content style={contentStyle}>
        {/* <AnchorComponent /> */}
      </Content>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
  </>
);

export default Home;