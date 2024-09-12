import React from 'react';
import { Form, Input, Button, Typography, Row, Col, message } from 'antd';

const { Title } = Typography;
const Signup: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Form Values:', values);
    message.success('Signup successful!');
  };
  const validatePasswords = ({ getFieldValue }: any) => ({
    validator(_: any, value: any) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('The two passwords do not match!'));
    },
  });
  return (
    <Row className="signup-container" justify="center" align="middle">
      <Col xs={22} sm={16} md={12} lg={8} xl={6}>
        <div className="signup-form-container">
          <Title level={2} className="signup-title">Create an Account</Title>
          <Form
            name="signup"
            onFinish={onFinish}
            layout="vertical"
            initialValues={{ remember: true }}
          >
            {/* Username */}
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
            {/* Email */}
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'The input is not valid email!' },
              ]}
            >
              <Input />
            </Form.Item>
            {/* Password */}
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 6, message: 'Password must be at least 6 characters!' },
              ]}
            >
              <Input.Password />
            </Form.Item>
            {/* Confirm Password */}
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password!' },
                validatePasswords,
              ]}
            >
              <Input.Password />
            </Form.Item>
            {/* Signup Button */}
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};
export default Signup;