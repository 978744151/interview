import { Button, Input, Space, Card, Descriptions, Avatar } from 'antd';
import { EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

import { UserOutlined } from '@ant-design/icons';
import DeskHeaderComponents from './home/desk-header'
import { getUserInfo, updateUser } from '../api/login';
import { useEffect, useState } from 'react';
import TabBar from '@/components/TabBar/index.tsx';

const ProfilePage = () => {
    // 示例数据，实际应从store或API获取

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    useEffect(() => {
        getUserInfoFunc()
    }, [])
    const getUserInfoFunc = () => {
        getUserInfo({}).then(({ data }: any) => {
            if (data.success) {
                setFormData(data.data)
            }
        })
    }
    const handleSave = () => {
        // 调用更新API（假设存在updateUserInfo接口）
        console.log(formData)
        updateUser(formData).then(({ data }) => {
            if (data.success) {
                setIsEditing(false);
                getUserInfoFunc()
                // 重新获取最新用户信息
                // setFormData(data.data);
            }
        });
    };
    return (
        <>
            <DeskHeaderComponents />
            <Card
                title="个人信息"
                style={{ margin: 20 }}
                extra={
                    !isEditing ? (
                        <Button
                            type="primary"
                            icon={<EditOutlined />}
                            onClick={() => setIsEditing(true)}
                        >
                            修改信息
                        </Button>
                    ) : (
                        <Space>
                            <Button
                                type="primary"
                                icon={<CheckOutlined />}
                                onClick={handleSave}
                            >
                                保存
                            </Button>
                            <Button
                                icon={<CloseOutlined />}
                                onClick={() => {
                                    setIsEditing(false);
                                    setFormData(formData);
                                }}
                            >
                                取消
                            </Button>
                        </Space>
                    )
                }
            >
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="头像">
                        <Avatar size={64} icon={<UserOutlined />} />
                    </Descriptions.Item>
                    <Descriptions.Item label="姓名">
                        {isEditing ? (
                            <Input
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        ) : (
                            formData.name
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="邮箱">
                        {isEditing ? (
                            <Input
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        ) : (
                            formData.email
                        )}
                    </Descriptions.Item>
                    {/* <Descriptions.Item label="角色">
                        {isEditing ? (
                            <Input
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            />
                        ) : (
                            formData.role
                        )}
                    </Descriptions.Item> */}
                </Descriptions>

            </Card>
            <TabBar />
        </>
    );

};

export default ProfilePage;