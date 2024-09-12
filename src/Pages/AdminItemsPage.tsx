import React, { useState } from 'react';
import { Form, Input, Button, Select, Table, Upload, Modal, message, Radio ,Typography, Layout} from 'antd';
import { UploadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';
interface ItemFormValues {
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory: string;
  imageUrl: string;
}
const { Title } = Typography;
// const { Header} = Layout;
const AdminItemsPage: React.FC = () => {
  const [items, setItems] = useState<ItemFormValues[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUrlInput, setIsUrlInput] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<ItemFormValues | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const categories = ['South Indian', 'North Indian', 'Thali'];  // Replace with actual categories
  const subcategories = ['Dosa', 'Paneer', 'Special Thali'];  // Replace with actual subcategories
  const handleImageUpload = async (file: RcFile): Promise<boolean> => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    return false;
  };
  const openModal = () => {
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
    resetForm();
  };
  const resetForm = () => {
    setImageUrl(null);
    setIsUrlInput(false);
    setEditingItem(null);
  };
  const onFinish = (values: ItemFormValues) => {
    const finalImageUrl = isUrlInput ? values.imageUrl : imageUrl;
    if (!finalImageUrl) {
      message.error('Please provide an image URL or upload an image');
      return;
    }
    const itemData = { ...values, imageUrl: finalImageUrl };
    if (isEditing) {
      const updatedItems = items.map(item =>
        item.name === editingItem?.name ? itemData : item
      );
      setItems(updatedItems);
      message.success('Item updated successfully');
    } else {
      setItems([...items, itemData]);
      message.success('Item added successfully');
    }
    closeModal();
  };
  const handleEdit = (item: ItemFormValues) => {
    setEditingItem(item);
    setIsEditing(true);
    setIsModalVisible(true);
  };
  const handleDelete = (name: string) => {
    setItems(items.filter(item => item.name !== name));
    message.success('Item deleted successfully');
  };
  const columns = [
    {
      title: 'Item Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `₹${price}`,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Subcategory',
      dataIndex: 'subcategory',
      key: 'subcategory',
    },
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (imageUrl: string) => (
        <img src={imageUrl} alt="item" style={{ width: '80px' }} />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: ( record: ItemFormValues) => (
        <>
          <EditOutlined onClick={() => handleEdit(record)} style={{ marginRight: 16 }} />
          <DeleteOutlined onClick={() => handleDelete(record.name)} style={{ color: 'red' }} />
        </>
      ),
    },
  ];
  return (
    <div>
        <Layout></Layout>
      {/* <Header className="site-layout-background" style={{ padding: 0 }}> */}
                <Title level={2} style={{ color: 'black', padding: '16px' }}>Items</Title>
            {/* </Header> */}
      <Button type="primary" onClick={openModal} style={{ marginBottom: 16 ,marginTop: 16 }}>
        Add Item
      </Button>
      <Table columns={columns} dataSource={items} rowKey="name" />
      <Modal
        title={isEditing ? 'Edit Item' : 'Add Item'}
        visible={isModalVisible}
        onCancel={closeModal}
        footer={null}
      >
        <Form onFinish={onFinish} layout="vertical" initialValues={editingItem || {}}>
          <Form.Item
            label="Item Name"
            name="name"
            rules={[{ required: true, message: 'Please enter the item name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter the description' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please enter the price' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: 'Please select a category' }]}
          >
            <Select>
              {categories.map(category => (
                <Select.Option key={category} value={category}>
                  {category}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Subcategory"
            name="subcategory"
            rules={[{ required: true, message: 'Please select a subcategory' }]}
          >
            <Select>
              {subcategories.map(subcategory => (
                <Select.Option key={subcategory} value={subcategory}>
                  {subcategory}
                </Select.Option>
              ))}
            </Select>
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
          <Form.Item>
            <Button type='primary' htmlType='submit'>
                {isEditing ? 'Update Item' : 'Add Item'}

            </Button>
          </Form.Item>
          </Form>
          </Modal>
          </div>
          );
};
export default AdminItemsPage;