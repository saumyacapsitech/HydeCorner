import React, { useState, useEffect } from 'react';
import { Layout, Form, Input, Button, Space, Table, Typography, Drawer, Upload, Radio } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';
const { Content } = Layout;
const { Title } = Typography;
const AdminCategoriesPage: React.FC = () => {
    const [subcategories, setSubcategories] = useState<any[]>([]);
    const [isUrlInput, setIsUrlInput] = useState<boolean>(false);
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState<string>('');
 
    useEffect(() => {
        const storedSubcategories = localStorage.getItem('subcategories');
        if (storedSubcategories) {
            setSubcategories(JSON.parse(storedSubcategories));
        }
    }, []);
   
    useEffect(() => {
        localStorage.setItem('subcategories', JSON.stringify(subcategories));
    }, [subcategories]);
    const handleAddCategory = (values: any) => {
        const newCategory = { ...values, key: subcategories.length, imageUrl };
        const updatedSubcategories = [...subcategories, newCategory];
        setSubcategories(updatedSubcategories);
        form.resetFields();
        setImageUrl('');
        setDrawerVisible(false);
    };
    const handleEditCategory = (key: number) => {
        console.log('Edit Category with key:', key);
    };
    const handleDeleteCategory = (key: number) => {
        const updatedSubcategories = subcategories.filter(sub => sub.key !== key);
        setSubcategories(updatedSubcategories);
    };
    const handleImageUpload = async (file: RcFile): Promise<boolean> => {
        const reader = new FileReader();
        reader.onload = () => {
            setImageUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
        return false;
    };
    const columns = [
        {
            title: 'Category Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Image',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render: (text: string) => <img src={text} alt="Category" style={{ width: 100 }} />,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (record: any) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} onClick={() => handleEditCategory(record.key)} />
                    <Button icon={<DeleteOutlined />} onClick={() => handleDeleteCategory(record.key)} danger />
                </Space>
            ),
        },
    ];
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Title level={2} style={{ color: 'black', padding: '16px' }}>Categories</Title>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setDrawerVisible(true)}
                >
                    Add Category
                </Button>
                <Table
                    columns={columns}
                    dataSource={subcategories}
                    rowKey="key"
                    style={{ marginTop: 24 }}
                />
                <Drawer
                    title="Add Category"
                    width={720}
                    onClose={() => setDrawerVisible(false)}
                    visible={drawerVisible}
                    bodyStyle={{ paddingBottom: 80 }}
                    footer={
                        <div
                            style={{
                                textAlign: 'right',
                            }}
                        >
                            <Button onClick={() => setDrawerVisible(false)} style={{ marginRight: 8 }}>
                                Cancel
                            </Button>
                            <Button form="CategoryForm" key="submit" htmlType="submit" type="primary">
                                Add
                            </Button>
                        </div>
                    }
                >
                    <Form
                        form={form}
                        id="CategoryForm"
                        layout="vertical"
                        onFinish={handleAddCategory}
                    >
                        <Form.Item
                            name="name"
                            label="Category Name"
                            rules={[{ required: true, message: 'Please input the Category name!' }]}
                        >
                            <Input placeholder="Category Name" />
                        </Form.Item>
                        <Form.Item label="Select Image Option">
                            <Radio.Group
                                value={isUrlInput ? 'url' : 'upload'}
                                onChange={(e) => setIsUrlInput(e.target.value === 'url')}
                            >
                                <Radio value="upload">Upload Image</Radio>
                                <Radio value="url">Use Image URL</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {isUrlInput ? (
                            <Form.Item
                                label="Image URL"
                                name="imageUrl"
                                rules={[{ required: true, message: 'Please enter the image URL' }]}
                            >
                                <Input />
                            </Form.Item>
                        ) : (
                            <Form.Item label="Upload Image" valuePropName="file">
                                <Upload
                                    beforeUpload={handleImageUpload}
                                    showUploadList={false}
                                    accept="image/*"
                                >
                                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                </Upload>
                                {imageUrl && (
                                    <img
                                        src={imageUrl}
                                        alt="Uploaded"
                                        style={{ width: '100px', marginTop: '10px' }}
                                    />
                                )}
                            </Form.Item>
                        )}
                    </Form>
                </Drawer>
            </Content>
        </Layout>
    );
};
export default AdminCategoriesPage;