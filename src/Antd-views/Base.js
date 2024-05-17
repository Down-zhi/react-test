import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd'; //导航 布局 菜单
import { useState } from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout; //解构赋值来从Layout模块中方法或属性提取出Header、Content、Footer和Sider这四个子组件。减少代码模块引用
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
} //该对象包含了传入的四个属性，这很适合用来构建树形结构或菜单项的数据模型


const items = [
    getItem('主页面板', '/', <PieChartOutlined />),
    getItem('用户中心', '/user', <DesktopOutlined />),
    getItem('商品管理', '/goods', <UserOutlined />,),
    // getItem('登陆', '/login', <TeamOutlined />),
    // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
];



const Base = () => {
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout style={{  minHeight: '100vh', }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="logo">HaDes</div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={(item) => navigate(item.key)} />
            </Sider>
            <Layout className="site-layout">
                <Header  className="site-layout-background"style={{  padding: 0,   }}  >
                    <Link to="/login" style={{ float: "right", color:'white', marginRight: "20px" }}>登陆</Link>
                </Header>
                <Content style={{    margin: '0 16px',   }}  >
                    <Breadcrumb   style={{  margin: '16px 0',  }}  >
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            minHeight: 360,
                        }}
                    >
                        <Outlet></Outlet>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center',     }}  >
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default Base;