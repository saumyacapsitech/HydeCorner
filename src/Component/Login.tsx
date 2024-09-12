import React from 'react';
import { Form, Input, Button, Typography, Row, Col, message } from 'antd';
import './Login.css'; 
import {useNavigate} from 'react-router-dom';
// import { Link } from 'react-router-dom';
const { Title } = Typography;
const Login: React.FC = () => {
    const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log('Received values:', values);
    if(values.username === '123'){
        navigate('/admin')
    }
    else if(values.username === '1234'){
        navigate('/user')
    }
    message.success('Login successful!');
    // navigate('/admin')
  };

 
  return (
    <Row className="login-container" justify="center" align="middle">
      <Col xs={22} sm={16} md={12} lg={8} xl={6}>
        <div className="login-form-container">
          <Title level={2} className="login-title">Hyde Corner Canteen</Title>
          <Form
            name="login"
            onFinish={onFinish}
            initialValues={{ remember: true }}
            layout="vertical"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Log In
              </Button>
            </Form.Item>

            {/* signup button */}
            {/* <Form.Item>
                <Typography.Text>
                    New user? {' '}
                    <Link to="/signup">
                    <Button type='link'>Sign Up
                        </Button>
                        </Link>
                </Typography.Text>
            </Form.Item> */}
          </Form>
        </div>
      </Col>
    </Row>
  );
};
export default Login;