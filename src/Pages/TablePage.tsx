import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Switch, message } from 'antd';
interface Table {
  id: string;
  name: string;
  seats: number;
  isAvailable: boolean;
}
const initialTables: Table[] = [
  { id: '1', name: 'Table 1', seats: 4, isAvailable: true },
  { id: '2', name: 'Table 2', seats: 2, isAvailable: false },
];
const TablePage: React.FC = () => {
  const [tables, setTables] = useState<Table[]>(initialTables);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingTable, setEditingTable] = useState<Table | null>(null);
  const handleEdit = (table: Table) => {
    setEditingTable(table);
    form.setFieldsValue({
      name: table.name,
      seats: table.seats,
      isAvailable: table.isAvailable,
    });
    setIsModalVisible(true);
  };
  const handleDelete = (id: string) => {
    setTables(tables.filter(table => table.id !== id));
    message.success('Table deleted successfully');
  };
  const handleSave = () => {
    form.validateFields().then(values => {
      if (editingTable) {
        setTables(tables.map(table =>
          table.id === editingTable.id
            ? { ...table, ...values }
            : table
        ));
        message.success('Table updated successfully');
      } else {
        setTables([
          ...tables,
          { id: (tables.length + 1).toString(), ...values }
        ]);
        message.success('Table added successfully');
      }
      setIsModalVisible(false);
    }).catch(error => {
      message.error('Failed to save table',error);
    });
  };
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Seats', dataIndex: 'seats', key: 'seats' },
    { title: 'Available', dataIndex: 'isAvailable', key: 'isAvailable', render: (text: boolean) => (text ? 'Yes' : 'No') },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Table) => (
        <>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </>
      ),
    },
  ];
  return (
    <>
      <Button type="primary" onClick={() => { setEditingTable(null); setIsModalVisible(true); }}>
        Add Table
      </Button>
      <Table dataSource={tables} columns={columns} rowKey="id" />
      <Modal
        title={editingTable ? 'Edit Table' : 'Add Table'}
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical" initialValues={{ isAvailable: true }}>
          <Form.Item name="name" label="Table Name" rules={[{ required: true, message: 'Please input table name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="seats" label="Seats" rules={[{ required: true, message: 'Please input number of seats!' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="isAvailable" label="Available" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default TablePage;