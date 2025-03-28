import { Button, Input, Space, Card, Descriptions, Avatar } from 'antd';
import { EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

import DeskHeaderComponents from './home/desk-header'
import { getUserInfo, updateUser } from '../api/login';
import { useEffect, useState } from 'react';
import TabBar from '@/components/TabBar/index.tsx';
import { Modal } from 'antd';

const ProfilePage = () => {
    // 示例数据，实际应从store或API获取

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<any>({});
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
    const [isAvatarModalVisible, setIsAvatarModalVisible] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState('');

    const [avatarStyles, setAvatarStyles] = useState<any>([
        'adventurer', 'avataaars', 'big-ears', 'big-smile', 'notionists-neutral', 'pixel-art-neutral', 'bottts', 'croodles', 'micah', 'miniavs', 'open-peeps', 'personas', 'pixel-art', 'fun-emoji', 'pixel-art-neutral'
    ]);



    const handleAvatarClick = () => {
        if (isEditing) {
            const newStyles = [
                'adventurer', 'avataaars', 'big-ears', 'big-smile', 'notionists-neutral', 'pixel-art-neutral', 'bottts', 'croodles', 'micah', 'miniavs', 'open-peeps', 'personas', 'pixel-art', 'fun-emoji', 'pixel-art-neutral'
            ].map((style) => generateAvatarUrl(style));

            setAvatarStyles(newStyles);
            setIsAvatarModalVisible(true);
        }
    };


    const generateAvatarUrl = (style: string) => {
        const seed = Math.random().toString(36).substring(7);
        return `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}`;
    };

    const handleAvatarSelect = (style: string) => {
        setSelectedAvatar(style);
        setFormData({ ...formData, avatar: style });
        setIsAvatarModalVisible(false);
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
                        <Avatar
                            size={64}
                            src={formData.avatar}
                            style={{ cursor: isEditing ? 'pointer' : 'default' }}
                            onClick={handleAvatarClick}
                        />
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
            <Modal
                title="选择头像"
                open={isAvatarModalVisible}
                onCancel={() => setIsAvatarModalVisible(false)}
                footer={null}
                width={800}
            >
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                    gap: '16px',
                    padding: '16px'
                }}>
                    {avatarStyles.map((style) => (
                        <div
                            key={style}
                            style={{
                                textAlign: 'center',
                                cursor: 'pointer',
                                padding: '8px',
                                border: '1px solid #eee',
                                borderRadius: '8px'
                            }}
                            onClick={() => handleAvatarSelect(style)}
                        >
                            <Avatar
                                size={64}
                                src={style}
                            />
                            {/* <div style={{
                                marginTop: '8px',
                                fontSize: '12px',
                                color: '#666'
                            }}>
                                {style}
                            </div> */}
                        </div>
                    ))}
                </div>
            </Modal>
            <TabBar />
        </>
    );

};

export default ProfilePage;