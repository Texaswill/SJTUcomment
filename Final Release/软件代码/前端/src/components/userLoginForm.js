import React, { useState } from 'react';
import {Form, Input, Button, message} from 'antd';
import {HttpStatusCode} from "axios";
import '../css/login.css'

export let currentUser = {
    userID: -1,
    username: "",
    password: "",
    role: -1
};
const LoginForm = () => {
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        try {
            const response = await fetch('http://localhost:8080/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            const data = await response.json();
            console.log(data)

            if (response.ok) {
                // 登录成功

                // 重置表单
                form.resetFields();
                message.success("登陆成功")

                currentUser.userID = data.userId
                currentUser.username = values.username
                currentUser.password =values.password
                currentUser.role = data.role            // role: 0=>普通用户 1=>食堂工作人员 2=>管理员

                console.log("currentUser: ", currentUser);
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                window.location.replace('/home')

            }
            else {
                // 登录失败
                // 处理错误信息
                if (response.status === HttpStatusCode.Conflict) {
                    message.error("用户名或密码错误")
                }
                else if (response.status === HttpStatusCode.Unauthorized) {
                    message.error("用户不存在")
                }

                console.log(currentUser)
            }
        }
        catch (error) {
            // 处理异常
            // ...
            console.log(currentUser)
        }
    };

    return (
        <Form form={form} onFinish={handleSubmit}>
            <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
