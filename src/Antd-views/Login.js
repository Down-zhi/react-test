import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
const Login = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "#123",
        }}>
            <div style={{
                width: "600px",
                height: "350px",
                position: "fixed",
                margin: "100px auto",
                backgroundColor: "#fff",
                left: 0,
                right: 0,
                paddingRight: "100px",
                paddingTop: "50px"
            }}>
                <Form name="basic" labelCol={{ span: 4, }}
                    wrapperCol={{ span: 16, }}
                    initialValues={{ remember: true, }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name={['obj','name']}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            登陆
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
export default Login;