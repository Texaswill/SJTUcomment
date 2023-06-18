import React, { useState } from 'react';
import {Form, Input, Button, message, Select} from 'antd';
import {HttpStatusCode} from "axios";
import {UserOutlined, LockOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

// function LockOutlined() {
//     return null;
// }

const currentUser = JSON.parse(localStorage.getItem('currentUser'));

const ProfileForm = () => {
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        try {
            values = {
                ...values,
                userId: currentUser.userID
            };
            const response = await fetch('http://localhost:8080/user/modify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                // 修改成功
                // 重置表单
                alert("修改成功！");
                form.resetFields();
                const newUser = {
                    username: values.username,
                    userID: values.userId,
                    password: values.password,
                    role: currentUser.role,
                    intro: values.intro
                }
                localStorage.setItem('currentUser', JSON.stringify(newUser));
                window.location.replace('/home/ProfilePage')
                console.log(values);
            }
            else {
                // 修改失败
                // 处理错误信息
                if (response.status === HttpStatusCode.Conflict) {
                    message.error("用户名已存在");
                }
                // ...
            }
        }
        catch (error) {
            // 处理异常
            // ...
        }
    };

    return (
        <Form form={form} onFinish={handleSubmit}>
            <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请输入新用户名（最多20位）' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入新密码（最多20位）' }]}>
                <Input.Password />
            </Form.Item>
            <Form.Item name="intro" label="个人介绍" rules={[{ message: '请输入个人介绍' }]}>
                <TextArea
                    rows={5}
                    maxLength={1000}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">确认</Button>
            </Form.Item>
        </Form>
    );
};

export default ProfileForm;