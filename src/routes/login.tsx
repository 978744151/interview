import React from 'react';
import { Button, Checkbox, Form, type FormProps, Input, theme, message, Row, Col } from 'antd';
import { loginUser, getUserInfo } from '@/api/login'
import { setStore } from '@/utils/store'
import { useNavigate } from "react-router-dom";
import website from '@/plugins/website'

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const containerStyle = {
  backgroundColor: theme.defaultSeed.colorPrimary,
  width: '100%',
  height: '100vh',
  overflow: 'hidden',
}
const formStyle = {

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

      <Row justify="center" align="middle" style={containerStyle} className='p-[12px]'>
        <Col xs={24} md={12} lg={10} xl={8} className="m-4 p-4 md:p-8 bg-white rounded-lg shadow-xl">
          <Col xs={24} md={24} className="text-center mb-8 md:mb-8 md:pr-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white animate-float">
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                幻
              </span>
              <span className="bg-gradient-to-r from-blue-400 via-green-400 to-yellow-300 bg-clip-text text-transparent">
                殇
              </span>
            </h1>
            <p className="mt-4 text-xl text-gray-200 font-mono tracking-wider">
              Digital Collection Universe
            </p>
          </Col>
          <Form
            className="w-full"
            labelCol={{ xs: 24, md: 8 }}
            wrapperCol={{ xs: 24, md: 16 }}
            name="basic"
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="邮箱"
              name="email"
              labelAlign="left"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="密码"
              name="password"
              labelAlign="left"

              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ xs: 24, md: { offset: 8, span: 16 } }}>
              <div className="flex flex-col md:flex-row gap-2 justify-between">
                <Button
                  onClick={handleRegister}
                  size="large"
                  className="md:order-1"
                >
                  注册
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="w-full md:w-auto"
                >
                  登录
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      {/* <div className='flex-1 flex justify-center items-center'>
        <span className='text-6xl font-serif text-white'>{website.title}</span>
      </div> */}
    </>
  )
};

export default Login;