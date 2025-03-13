import { Layout, Row, Col, Typography } from 'antd';

const { Footer: AntFooter } = Layout;
const { Text, Link } = Typography;

const footerStyle: React.CSSProperties = {
    backgroundColor: '#f8f9fa',
    borderTop: '1px solid #e9ecef',
    padding: '40px 0',
    marginTop: 60,

};
const footerBoxStyle: React.CSSProperties = {
    maxWidth: 1200,
    margin: '0 auto',
    textAlign: 'center',
};
const PageFooter = () => (
    <AntFooter style={footerStyle}>
        <Row justify="center" style={footerBoxStyle} className='align-center' >
            <Col span={24} >
                <Row gutter={[24, 24]} className='align-center'>
                    <Col span={8} className='align-center'>
                        <Text strong style={{ display: 'block', marginBottom: 12 }}>技术社区</Text>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, }}>
                            <Link href="/about">关于我们</Link>
                            <Link href="/docs">开发文档</Link>
                            <Link href="/careers">加入我们</Link>
                        </div>
                    </Col>

                    <Col span={8}>
                        <Text strong style={{ display: 'block', marginBottom: 12 }}>帮助支持</Text>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <Link href="/faq">常见问题</Link>
                            <Link href="/contact">联系我们</Link>
                            <Link href="/feedback">问题反馈</Link>
                        </div>
                    </Col>

                    <Col span={8}>
                        <Text strong style={{ display: 'block', marginBottom: 12 }}>协议条款</Text>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <Link href="/terms">服务条款</Link>
                            <Link href="/privacy">隐私政策</Link>
                            <Link href="/license">开源协议</Link>
                        </div>
                    </Col>
                </Row>

                <Row justify="center" style={{ marginTop: 40 }}>
                    <Text type="secondary">
                        © {new Date().getFullYear()} 哈咯技术社区 · 沪ICP备12345678号
                    </Text>
                </Row>
            </Col>
        </Row>
    </AntFooter>
);

export default PageFooter;