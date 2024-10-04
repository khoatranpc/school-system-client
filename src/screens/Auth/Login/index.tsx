'use client';
import React from "react";
import { MdErrorOutline } from "react-icons/md";
import { Button, Checkbox, Form, Input, Tag, Typography } from "antd";
import Image from "next/image";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import authenticated from "@/src/store/reducers/authenticated";

const { Text } = Typography;

export default function Login() {
    const auth = authenticated.hook();
    console.log(auth);
    const onFinish = (values: any) => {
        auth.query({
            action: 'Read',
            operationName: 'Authenticated',
            path: 'authenticated',
            query: `mutation Authenticated($payload: AuthenticatedInput!){
    authenticated(payload: $payload){
       accessToken 
    }
}`, payload: {
                identifier: values.email,
                password: values.password
            }
        })
        console.log("Received values of form: ", values);
    };


    return (
        <section className="flex items-center bg-white h-screen md:h-auto p-0 md:py-20">
            <div className="w-full md:w-[380px] mx-auto py-16 md:py-24 px-4">
                <div className="mb-8 text-center">
                    <Image className="m-auto" src={'/schoolLogo.jpg'} alt="" width={150} height={150} />
                    <Text className="text-gray-500">
                        Chào mừng tới <span className="text-[var(--base)] text-[2.4rem] font-bold">School System</span>
                    </Text>
                </div>

                <Form
                    name="normal_login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    layout="vertical"
                    requiredMark="optional"
                    className="space-y-4"
                >
                    <Form.Item
                        name="email"
                        rules={[{ type: "email", required: true, message: "Hãy nhập Email!" }]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="Email"
                            className="p-3 border rounded w-full"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: "Hãy nhập Mật khẩu!" }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Password"
                            className="p-3 border rounded w-full"
                        />
                    </Form.Item>
                    {auth.data.errors && <Form.Item>
                        <Tag icon={<MdErrorOutline size={"1.8rem"} color="red" />} className="p-[1.2rem] w-full">
                            <p className="text-[1.4rem] text-[red]">{auth.data.errors}</p>
                        </Tag>
                    </Form.Item>}
                    <Form.Item className="flex justify-between items-center">
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Giữ đăng nhập</Checkbox>
                        </Form.Item>
                        <a href="" className="text-blue-500">Quên mật khẩu?</a>
                    </Form.Item>
                    <Form.Item className="mb-0">
                        <Button loading={auth.data.isLoading} disabled={auth.data.isLoading || auth.data.data} block={true} type="primary" htmlType="submit">
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
}