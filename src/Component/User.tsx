import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { ShoppingCartOutlined, OrderedListOutlined, WalletOutlined, LogoutOutlined, BellOutlined, HomeOutlined, AppstoreOutlined } from '@ant-design/icons';
import './User.css';
const { Header, Content, Footer } = Layout;
const User: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/login');
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#001529',
           overflow:'auto'
        }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ flex: 1, lineHeight: '64px' }}
        >
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.SubMenu key="categories" icon={<AppstoreOutlined />} title="Categories">
            <Menu.Item key="south">
              <Link to="south">South Indian</Link>
            </Menu.Item>
            <Menu.Item key="north">
              <Link to="north">North Indian</Link>
            </Menu.Item>
            <Menu.Item key="thali">
              <Link to="thali">Thali</Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="subcategories" icon={<AppstoreOutlined />} title="Subcategories">
            <Menu.Item key="fast">
              <Link to="">Fast Food</Link>
            </Menu.Item>
            <Menu.Item key="beverages">
              <Link to="">Beverages</Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="order-list" icon={<OrderedListOutlined />}>
            <Link to="">Order List</Link>
          </Menu.Item>
          <Menu.Item key="wallet" icon={<WalletOutlined />}>
            <Link to="">Wallet</Link>
          </Menu.Item>
          <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
            <Link to="">Cart</Link>
          </Menu.Item>
          <Menu.Item key="notifications" icon={<BellOutlined />}>
            <Link to="notifications">Notifications</Link>
          </Menu.Item>
          <Menu.Item icon={<LogoutOutlined />} onClick={handleLogout} style={{ textAlign: 'right' }}>
            Logout
          </Menu.Item>
        </Menu>
        <Button type="text" icon={<ShoppingCartOutlined />} style={{ marginRight: '16px' }} />
        <Button type="text" icon={<LogoutOutlined />} onClick={handleLogout} />
      </Header>
      <Content
        style={{
          padding: '0 24px',
          marginTop: '16px',
          backgroundColor: '#fff',
          minHeight: 380,
           overflow:'auto'
        }}
      >
        <Outlet />
      </Content>
      <Footer
        style={{
          textAlign: 'center',
          backgroundColor: '#001529',
          color: '#fff'
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default User;