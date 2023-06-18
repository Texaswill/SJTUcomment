import React, { Component } from 'react';
import LoginForm from '../components/userLoginForm';
import RegistrationForm from '../components/userRegistrationForm';
import '../css/login.css'
import { Tabs } from 'antd';

const { TabPane } = Tabs;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'login',
        };
    }

    handleTabChange = (activeKey) => {
        this.setState({
            activeTab: activeKey,
        });
    };

    render() {
        const { activeTab } = this.state;
        return (
            <div className="login-page">
                <div className="login-container">
                    <Tabs activeKey={activeTab} onChange={this.handleTabChange} className="login-container-box">
                            <TabPane tab="登录" key="login" className="login-box">
                            <LoginForm />
                        </TabPane>
                        <TabPane tab="注册" key="register" className="login-box">
                            <RegistrationForm />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default Login;
