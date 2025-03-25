import React from 'react';
import { Button, Form, type FormProps, Input, message, Row, Col } from 'antd';
import { register } from '@/api/login';
import { useNavigate } from "react-router-dom";
import './register.scss';

type FieldType = {
  email?: string;
  password?: string;
  role?: string;
  name?: string;
};

const Register: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { data } = await register(values)
    if (data.success) {
      messageApi.open({
        type: 'success',
        content: '注册成功',
      });
      setTimeout(() => {
        navigate('/login')
      }, 1000);
    }
  };

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
                <p className="login-subtitle">创建您的账户</p>
              </div>

              <Form
                className="login-form"
                layout="vertical"
                name="register"
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item<FieldType>
                  label="用户名"
                  name="name"
                  rules={[{ required: true, message: '请输入用户名!' }]}
                >
                  <Input size="large" placeholder="请输入用户名" />
                </Form.Item>

                <Form.Item<FieldType>
                  label="邮箱"
                  name="email"
                  rules={[
                    { required: true, message: '请输入邮箱!' },
                    { type: 'email', message: '请输入有效的邮箱地址!' }
                  ]}
                >
                  <Input size="large" placeholder="请输入邮箱" />
                </Form.Item>

                <Form.Item<FieldType>
                  label="密码"
                  name="password"
                  rules={[{ required: true, message: '请输入密码!' }]}
                >
                  <Input.Password size="large" placeholder="请输入密码" />
                </Form.Item>

                <Form.Item<FieldType>
                  label="角色"
                  name="role"
                  rules={[{ required: true, message: '请选择角色!' }]}
                >
                  <Input size="large" placeholder="请输入角色" />
                </Form.Item>

                <Form.Item className="login-buttons">
                  <Button type="primary" htmlType="submit" size="large" block>
                    注册
                  </Button>
                  <Button size="large" block onClick={() => navigate('/login')}>
                    返回登录
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Register;