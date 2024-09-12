import React, { useState, useEffect } from 'react';
import { Layout, Table, Button, Modal, Form, Input, TimePicker, message } from 'antd';
import dayjs from 'dayjs';
const { Content } = Layout;
const NotificationPage: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingNotification, setEditingNotification] = useState<any | null>(null);
  const [form] = Form.useForm();
 
  useEffect(() => {
    const storedNotifications = localStorage.getItem('notifications');
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    }
  }, []);

  const saveNotificationsToLocalStorage = (newNotifications: any[]) => {
    localStorage.setItem('notifications', JSON.stringify(newNotifications));
  };
  const generateId = () => new Date().getTime().toString();

  const handleSubmit = (values: { message: string; time: dayjs.Dayjs }) => {
    const newNotification = {
      id: editingNotification ? editingNotification.id : generateId(),
      message: values.message,
      time: values.time.format('HH:mm'),
    };
    const updatedNotifications = editingNotification
      ? notifications.map((notification) =>
          notification.id === editingNotification.id ? newNotification : notification
        )
      : [...notifications, newNotification];
    setNotifications(updatedNotifications);
    saveNotificationsToLocalStorage(updatedNotifications);
    setIsModalVisible(false);
    setEditingNotification(null);
    form.resetFields();
    message.success(editingNotification ? 'Notification updated!' : 'Notification created!');
  };

  const handleDelete = (id: string) => {
    const updatedNotifications = notifications.filter((notification) => notification.id !== id);
    setNotifications(updatedNotifications);
    saveNotificationsToLocalStorage(updatedNotifications);
    message.success('Notification deleted successfully!');
  };

  const handleEdit = (notification: any) => {
    setEditingNotification(notification);
    form.setFieldsValue({
      message: notification.message,
      time: dayjs(notification.time, 'HH:mm'),
    });
    setIsModalVisible(true);
  };

  const showModal = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingNotification(null);
  };

  const columns = [
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: ( record: any) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </>
      ),
    },
  ];
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '24px', margin: '24px', background: '#fff' }}>
        <h1>Manage Notifications</h1>
        <Button type="primary" onClick={showModal}>Create Notification</Button>
        <Table
          dataSource={notifications}
          columns={columns}
          rowKey="id"
          style={{ marginTop: '20px' }}
        />
  
        <Modal
          title={editingNotification ? 'Edit Notification' : 'Create Notification'}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              label="Message"
              name="message"
              rules={[{ required: true, message: 'Please enter a message' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Time"
              name="time"
              rules={[{ required: true, message: 'Please select a time' }]}
            >
              <TimePicker format="HH:mm" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {editingNotification ? 'Update' : 'Create'}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};
export default NotificationPage;