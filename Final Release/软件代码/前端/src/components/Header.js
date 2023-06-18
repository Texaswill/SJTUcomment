import React from "react";
import { Button, Layout, Space, Divider, Avatar, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom"; // 导入路由组件
import '../css/Root.css'
const { Header } = Layout;
const { Search } = Input;


export default function Head() {
    const handleEnter=(value)=> {
        window.location.href="/home/Search?name="+value;
    }
    return (
        <Header defaultCollapsed={false} breakpoint={"xs"} className="TopstoryPageHeader">
            <Space split={<Divider type="vertical" />}>
                <div className="TopstoryPageHeader-main">
                    <h2 className="Logo">交大点评</h2>
                    <div className="TopstoryTabs">
                        <Link to={"/"} className="TopstoryTabs-link">首页</Link>
                    </div>
                    <div className="TopstoryTabs">
                        <Link to={"/"} className="TopstoryTabs-link">收藏</Link>
                    </div>
                </div>
                <Search
                    style={{ right: 80, top: 20, position: "absolute", width: 250 }}
                    placeholder="搜索栏"
                    allowClear
                    enterButton="Search"
                    onSearch={handleEnter}
                />
                {/* 点击头像跳转到个人信息页面 */}
                <Link to={"/home/ProfilePage"}>
                    <Avatar style={{ right: 20, top: 20, position: "absolute" }} size={32} icon={<UserOutlined />} />
                </Link>
            </Space>
        </Header>
    );
}
