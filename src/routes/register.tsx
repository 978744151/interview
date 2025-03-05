import React from 'react';
import { Button, Checkbox, Form, type FormProps, Input, theme, message } from 'antd';
import { register } from '@/api/login'
import { setStore } from '@/utils/store'
import { useNavigate } from "react-router-dom";
import website from '@/plugins/website'
type FieldType = {
  email?: string;
  password?: string;
  role?: string;
  name?: string;
};
console.log(theme)
const containerStyle = {
  backgroundColor: theme.defaultSeed.colorPrimary,
  width: '100%'
}
const formStyle = {

}


const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log('Failed:', errorInfo);
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
      <div style={containerStyle} className='flex flex-row-reverse'>
        <div style={formStyle} className="p-28 bg-white flex justify-center items-center">
          <Form
            className="w-96"
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item<FieldType>
              label="role"
              name="role"
              rules={[{ required: true, message: 'Please input your role!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <div className="flex justify-between">
                <Button type="primary" htmlType="submit" >
                  Submit
                </Button>
                <Button onClick={() => navigate(-1)} >
                  return
                </Button>
              </div>
            </Form.Item>
          </Form>

        </div>
        <div className='flex-1 flex justify-center items-center'>
          <span className='text-6xl font-serif text-white'>{website.title}</span>
        </div>
      </div>
    </>
  )
};

export default Register;