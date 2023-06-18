import React, { useState } from 'react';
import {Form, Input, Button, Select, message} from 'antd';
import {HttpStatusCode} from "axios";

const RegistrationForm = () => {
    const [form] = Form.useForm();
    //const [roles, setRoles] = useState([]);

    const handleRoleChange = (value) => {
        // 设置选择的用户类型
        form.setFieldsValue({ role: value });
    };

    const handleSubmit = async (values) => {
        try {
            const response = await fetch('http://localhost:8080/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                // 注册成功
                // 重置表单
                form.resetFields();
                const res = response.body
                console.log(res);
            }
            else {
                // 注册失败
                // 处理错误信息
                if (response.status === HttpStatusCode.Conflict) {
                    message.error("用户已存在");
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
        <Form form={form} onFinish={handleSubmit} >
            <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请输入用户名（最多20位）' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码（最多20位）' }]}>
                <Input.Password />
            </Form.Item>
            <Form.Item name="role" label="用户类型" rules={[{ required: true, message: '请选择用户类型' }]}>
                <Select
                    onChange={handleRoleChange}
                    // initialvalues="user"
                    style={{ width: 120 }}
                    options={[
                        { value: 'user', label: '普通用户' },
                        { value: 'staff', label: '工作人员' },
                        { value: 'administrator', label: '管理员' },
                    ]}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">注册</Button>
            </Form.Item>
        </Form>
    );
};

export default RegistrationForm;
