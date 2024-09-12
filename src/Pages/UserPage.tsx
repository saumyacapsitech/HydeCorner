import React, { useState } from 'react';
import { Card, Col, Row, Button, Drawer, Form, Input, TimePicker } from 'antd';
import SouthIndianPage from './SouthIndian';
import NorthIndian from './NorthIndian';
import Thali from './Thali';
import './UserPage.css';
import dayjs from 'dayjs';
const UserPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onFinish = (values: any) => {
    console.log('Table booking details:', values);
    // Handle submission logic here
    setOpen(false); // Close the drawer after submission
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
    setSearchQuery(e.target.value);
  }
  const renderSelectedCategory = () => {
    switch (selectedCategory) {
      case 'south-indian':
        return <SouthIndianPage />;
      case 'north-indian':
        return <NorthIndian />;
      case 'thalis':
        return <Thali />;
      default:
        return null;
    }
  };
  return (
    // <Layout style={{ height: '100vh', overflow: 'auto',textAlign:'center' }}>
      <div className="user-home-page" style={{ height: '100vh',textAlign:'center' }}>
        <h1 className="heading">Hungry ?</h1>
        <h2 className="heading">Explore and Order &#128512;</h2>
        {/* Drawer Button */}
        <div className="drawer">
          <Button type="primary" onClick={showDrawer}>
            Book Table
          </Button>

          
          <Drawer
            title="Book Your Table Now"
            placement="right"
            onClose={onClose}
            open={open}
            getContainer={false}
          >
            <Form layout="vertical" onFinish={onFinish}>
              {/* User's name */}
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please enter your name!' }]}
              >
                <Input placeholder="Enter your name" />
              </Form.Item>
              {/* Time selection */}
              <Form.Item
                label="Time Preference"
                name="time"
                rules={[{ required: true, message: 'Please select a time!' }]}
              >
                <TimePicker format="HH:mm" defaultValue={dayjs('12:00', 'HH:mm')} />
              </Form.Item>
              {/* Department */}
              <Form.Item
                label="Department"
                name="department"
                rules={[{ required: true, message: 'Please enter your department!' }]}
              >
                <Input placeholder="Enter your department" />
              </Form.Item>
              {/* Submit button */}
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Drawer>

          
        </div>

        <div className='search-box' style={{marginBottom:'60px',marginTop:'-150px', textAlign:'left', padding:'0 20px', marginLeft:'60px'}}>
          <h3>Search for dishes</h3>
          <Input

          placeholder='search for dishes'
          value={searchQuery}
          onChange={handleSearchChange}
          style={{width:'300px'}}/>
        </div>



        {/* Category cards */}
        <Row gutter={16} justify="center" style={{padding:'30px'}}>
          <Col span={8} >
            <Card 
              hoverable
              // cover={<img alt="South Indian Foods" src="https://static.vecteezy.com/system/resources/thumbnails/035/376/005/small_2x/ai-generated-south-indian-food-idli-sambar-with-coconut-chutney-photo.jpg" className="card-image" />}
              className="category-card"
              onClick={() => setSelectedCategory('south-indian')}
            >
              <Card.Meta title="South Indian Foods" description="Explore South Indian dishes" />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              // cover={<img alt="North Indian Foods" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSipip84cyHknfHz5u2havCf2lbvgLlPJHPhA&s" className="card-image" />}
              className="category-card"
              onClick={() => setSelectedCategory('north-indian')}
            >
              <Card.Meta title="North Indian Foods" description="Explore North Indian dishes" />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              // cover={<img alt="Thalis" src="https://thumbs.dreamstime.com/b/indian-thali-26440151.jpg" className="card-image" />}
              className="category-card"
              onClick={() => setSelectedCategory('thalis')}
            >
              <Card.Meta title="Thalis" description="Explore various Thalis" />
            </Card>
          </Col>
        </Row>
   
        <div className="category-content">
          {renderSelectedCategory()}
        </div>
      </div>
    // </Layout>
  );
};
export default UserPage;