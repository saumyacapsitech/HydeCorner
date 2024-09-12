import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
    AppstoreOutlined,
    TagsOutlined,
    ShoppingCartOutlined,
    TableOutlined,
    LogoutOutlined,
    HomeOutlined,

} from '@ant-design/icons';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const AdminLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('./login');
    }

    const handleCollapse = (collapsed: boolean) => {
        setCollapsed(collapsed);
    }

    return (
        <Layout style={{ height: '100vh' , overflow:'auto'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={handleCollapse}>
                <div className="logo" />
                {/* <Menu.Item key="6" icon={<AppstoreOutlined />}>
                        <Link to="">Users</Link>
                    </Menu.Item> */}
                <h1 className='un'>Admin Dashboard</h1>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>

                    <Menu.Item key="Home" icon={<HomeOutlined />}>
                        <Link to="">Home</Link>
                    </Menu.Item>

                    <Menu.Item key="category" icon={<AppstoreOutlined />}>
                        <Link to="category">Categories</Link>
                    </Menu.Item>

                    <Menu.Item key="sub-category" icon={<AppstoreOutlined />}>
                        <Link to="subcategory">Sub Categories</Link>
                    </Menu.Item>
                    <Menu.Item key="items" icon={<AppstoreOutlined />}>
                        <Link to="items">Items</Link>
                    </Menu.Item>

                    <Menu.Item key="attendee" icon={<TagsOutlined />}>
                        <Link to="attendees">Attendee</Link>
                    </Menu.Item>
                    <Menu.Item key="tables" icon={<TableOutlined />}>
                        <Link to="table">Tables</Link>
                    </Menu.Item>
                    <Menu.Item key="orders" icon={<ShoppingCartOutlined />}>
                        <Link to="">Orders</Link>
                    </Menu.Item>
                    
                    <Menu.Item icon={<LogoutOutlined />} onClick={handleLogout} >
                        Logout
                    </Menu.Item>
                </Menu>


            </Sider>
            <Layout>
                <Header className="site-layout-background" style={{ padding: 0 }} />


                <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, overflow:'auto'}}>
                    <Outlet />

                </Content>
            </Layout>
        </Layout>
    );
};
export default AdminLayout;