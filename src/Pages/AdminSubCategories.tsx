import React, { useState } from 'react';
import { Layout, Form, Input, Button, Select, Space, Table, Typography, Drawer, Upload,  Radio } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
// import { UploadChangeParam } from 'antd/es/upload';
import { RcFile } from 'antd/es/upload';

const {  Content } = Layout;
const { Option } = Select;
const { Title } = Typography;
const AdminSubcategories: React.FC = () => {
    const [categories] = useState<string[]>(['South Indian', 'North Indian', 'Thali']);
    const [subcategories, setSubcategories] = useState<any[]>([]);
    const [isUrlInput, setIsUrlInput] = useState<boolean>(false);
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState<string>('');
    const handleAddSubcategory = (values: any) => {
        setSubcategories([...subcategories, { ...values, key: subcategories.length, imageUrl }]);
        form.resetFields();
        setImageUrl('');
        setDrawerVisible(false);
    };
    
    const handleEditSubcategory = (key: number) => {
        
        console.log('Edit subcategory with key:', key);
    };
    const handleDeleteSubcategory = (key: number) => {
        setSubcategories(subcategories.filter(sub => sub.key !== key));
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
            title: 'Subcategory Name',
            dataIndex: 'name',
            key: 'name',
        },
        // {
        //     title: 'Description',
        //     dataIndex: 'description',
        //     key: 'description',
        // },
        // {
        //     title: 'Price',
        //     dataIndex: 'price',
        //     key: 'price',
        // },
        {
            title: 'Image',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render: (text: string) => <img src={text} alt="Subcategory" style={{ width: 100 }} />,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (record: any) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} onClick={() => handleEditSubcategory(record.key)} />
                    <Button icon={<DeleteOutlined />} onClick={() => handleDeleteSubcategory(record.key)} danger />
                </Space>
            ),
        },
    ];
    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* <Header className="site-layout-background" style={{ padding: 0 }}> */}
                <Title level={2} style={{ color: 'black', padding: '16px' }}>Subcategories</Title>
            {/* </Header> */}
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setDrawerVisible(true)}
                >
                    Add Subcategory
                </Button>
                <Table
                    columns={columns}
                    dataSource={subcategories}
                    rowKey="key"
                    style={{ marginTop: 24 }}
                />
                <Drawer
                    title="Add Subcategory"
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
                            <Button form="subcategoryForm" key="submit" htmlType="submit" type="primary">
                                Add
                            </Button>
                        </div>
                    }
                >
                    <Form
                        form={form}
                        id="subcategoryForm"
                        layout="vertical"
                        onFinish={handleAddSubcategory}
                    >
                        <Form.Item
                            name="category"
                            label="Category"
                            rules={[{ required: true, message: 'Please select a category!' }]}
                        >
                            <Select placeholder="Select a category" style={{ width: '100%' }}>
                                {categories.map(category => (
                                    <Option key={category} value={category}>{category}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="name"
                            label="Subcategory Name"
                            rules={[{ required: true, message: 'Please input the subcategory name!' }]}
                        >
                            <Input placeholder="Subcategory Name" />
                        </Form.Item>
                        {/* <Form.Item
                            name="description"
                            label="Description"
                            rules={[{ required: true, message: 'Please input the description!' }]}
                        >
                            <Input.TextArea placeholder="Description" rows={4} />
                        </Form.Item>
                        <Form.Item
                            name="price"
                            label="Price"
                            rules={[{ required: true, message: 'Please input the price!' }]}
                        >
                            <Input type="number" placeholder="Price" />
                        </Form.Item> */}
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
export default AdminSubcategories;