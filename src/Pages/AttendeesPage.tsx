import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Input, Modal, Space, DatePicker, Radio } from 'antd';
// import moment from 'moment'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
interface KitchenWorker {
  key: string;
  name: string;
  position: string;
  shift: string;
  hireDate:string;
  gender: string;
}
const AttendeesPage: React.FC = () => {
  const [workers, setWorkers] = useState<KitchenWorker[]>([]);
  const [editingWorker, setEditingWorker] = useState<KitchenWorker | null>(null);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  // UseNavigate hook
  const navigate = useNavigate();
  useEffect(() => {
    fetchWorkers();
  }, []);
  const fetchWorkers = async () => {
    try {
      const response = await axios.get<KitchenWorker[]>('https://localhost:7015/api/Attendees');
      setWorkers(response.data);
    } catch (error) {
      console.error("error fetching workers");
    }
  };
  const handleFinish = async (values: Omit<KitchenWorker, 'key'>) => {
    try {
      console.log("Form values:", values);
      if (isEditMode && editingWorker) {
        await axios.put(`https://localhost:7015/api/Attendees/${editingWorker.key}`, values);
        setWorkers(workers.map(worker => (worker.key === editingWorker.key ? { ...values, key: worker.key } : worker)));
      } else {
        const response = await axios.post('https://localhost:7015/api/Attendees', values);
        const newWorker: KitchenWorker = {
          key: response.data.id,
          ...values,
        };
        setWorkers([...workers, newWorker]);
      }
      form.resetFields();
      setIsModalVisible(false);
      setEditingWorker(null);
      
      navigate('/attendees');
    } catch (error) {
      console.error("Error in handleFinish:", error);
    }
  };
  const showFormModal = (worker: KitchenWorker | null) => {
    setIsEditMode(!!worker);
    setEditingWorker(worker);
    form.setFieldsValue(worker || { name: '', position: '', shift: '', hireDate: '' });
    setIsModalVisible(true);
  };
  const handleDelete = async (key: string) => {
    try {
      await axios.delete(`https://localhost:7015/api/Attendees/${key}`);
      setWorkers(workers.filter(worker => worker.key !== key));
    } catch (error) {
      console.error("Error deleting worker:", error);
    }
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Shift',
      dataIndex: 'shift',
      key: 'shift',
    },
    {
      title: 'Hire Date',
      dataIndex: 'hireDate',
      key: 'hireDate',
      // render: (text: string) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: KitchenWorker) => (
        <Space size="middle">
          <Button onClick={() => showFormModal(record)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record.key)}>Delete</Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <h1>Attendee</h1>
      <Button type="primary" onClick={() => showFormModal(null)} style={{ marginBottom: 20 }}>
        Add Attendee
      </Button>
      <Table dataSource={workers} columns={columns} rowKey="key" />
      <Modal
        title={isEditMode ? 'Edit Kitchen Worker' : 'Add Kitchen Worker'}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingWorker(null);
        }}
        footer={null}
      >
        <Form form={form} onFinish={handleFinish} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="position"
            label="Position"
            rules={[{ required: true, message: 'Please input the position!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: 'Please select the gender!' }]}
          >
            <Radio.Group>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="shift"
            label="Shift"
            rules={[{ required: true, message: 'Please input the shift!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="hireDate"
            label="Hire Date"
            // rules={[{ required: true, message: 'Please input the hire date!' }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEditMode ? 'Update' : 'Add'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default AttendeesPage;