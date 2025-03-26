import React from 'react';
import { Button, Checkbox, Form, type FormProps, Input, theme, message, Row, Col } from 'antd';
import { loginUser, getUserInfo } from '@/api/login'
import { setStore } from '@/utils/store'
import { useNavigate } from "react-router-dom";
import website from '@/plugins/website'
import './login.scss'
type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const containerStyle = {
  // backgroundColor: theme.defaultSeed.colorPrimary,
  width: '100%',
  height: '100vh',
  overflow: 'hidden',
}


const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const Login: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { data } = await loginUser(values)
    if (data.success) {
      setStore({ type: 'local', content: data.token, name: 'token' })
      getUserInfoFunc()
      messageApi.open({
        type: 'success',
        content: '登录成功',
      });

      setTimeout(() => {
        navigate('/', { replace: true })
      }, 1000);
    }
  };
  const getUserInfoFunc = () => {
    getUserInfo({}).then(({ data }: any) => {
      if (data.success) {
        setStore({ type: 'local', content: data.data, name: 'userInfo' })
      }
    })
  }
  const handleRegister = () => {
    navigate('/register')
  }
  return (
    <>
      {contextHolder}
      <div className="login-container">
        <div className="login-background">
          <div className="login-shape"></div>
          <div className="login-shape"></div>
        </div>

        <Row justify="center" align="middle" className="login-content">
          <Col xs={24} sm={20} md={12} lg={10} xl={8}>
            <div className="login-card">
              <div className="login-header">
                <h1 className="login-title">
                  <span className="gradient-text-1">Once</span>
                  <span className="gradient-text-2"></span>
                </h1>
                <p className="login-subtitle">Digital Collection Universe</p>
              </div>

              <Form
                className="login-form"
                layout="vertical"
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item<FieldType>
                  label="邮箱"
                  name="email"
                  rules={[{ required: true, message: '请输入邮箱!' }]}
                >
                  <Input size="large" placeholder="请输入邮箱" />
                </Form.Item>

                <Form.Item<FieldType>
                  label="密码"
                  name="password"
                  rules={[{ required: true, message: '请输入密码!' }]}
                >
                  <Input.Password size="large" placeholder="请输入密码,不少于6位数" />
                </Form.Item>

                <Form.Item<FieldType>
                  name="remember"
                  valuePropName="checked"
                >
                  {/* <Checkbox>子</Checkbox> */}
                  未注册用户 自动注册
                </Form.Item>

                <Form.Item className="login-buttons">
                  <Button type="primary" htmlType="submit" size="large" block>
                    登录
                  </Button>
                  {/* <Button size="large" block onClick={handleRegister}>
                    注册账号
                  </Button> */}
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Login;