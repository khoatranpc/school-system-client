import React from 'react';
import { BiRefresh } from 'react-icons/bi';
import { SaveOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Divider, Form, Input, Radio, Row } from 'antd';
import ImageUpload from '@/src/components/ImageUpload';
import { Gender } from '@/src/types/interface';

const StudentInfo = () => {
    return (
        <div className='studentInfo'>
            <Form
                layout='vertical'
            >
                <Row gutter={[12, 12]}>
                    <Col span={12}>
                        <ImageUpload
                            className='flex h-full items-center justify-center'
                            fileList={[]} setFileList={() => {

                            }} />
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Mã"
                        >
                            <Input disabled placeholder='0123456789' className='w-fit' />
                        </Form.Item>
                        <Form.Item
                            required
                            label="Họ tên"
                            name="name"
                        >
                            <Input placeholder='Họ và tên' />
                        </Form.Item>
                        <div className='flex gap-[2.4rem]'>
                            <Form.Item
                                required
                                label="Ngày sinh"
                                name="dob"
                            >
                                <DatePicker format={'DD/MM/YYYY'} placeholder='DD/MM/YYYY' />
                            </Form.Item>
                            <Form.Item
                                required
                                label="Giới tính"
                                name="gender"
                            >
                                <Radio.Group>
                                    <Radio value={Gender.Male}>Nam</Radio>
                                    <Radio value={Gender.Female}>Nữ</Radio>
                                    <Radio value={Gender.Other}>Khác</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </div>
                        <Form.Item
                            label="Số điện thoại"
                            name="phoneNumber"
                        >
                            <Input placeholder='Số điện thoại của học sinh' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[12, 12]}>
                    <Col span={8}>
                        <Form.Item
                            required
                            label="Email"
                            name="email"
                        >
                            <Input placeholder='Email học sinh' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            required
                            label="Số CCCD"
                            name="identity"
                        >
                            <Input placeholder='CCCD 12 số' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            required
                            label="Địa chỉ"
                            name="address"
                        >
                            <Input placeholder='Địa chỉ thường trú/tạm trú của học sinh' />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider
                    orientation='left'
                    orientationMargin={0}
                >
                    Thông tin phụ huynh
                </Divider>
                <Row gutter={[12, 12]}>
                    <Col span={8}>
                        <Form.Item
                            label="Phụ huynh 1"
                        >
                            <Input placeholder='Chức danh' />
                        </Form.Item>
                        <Form.Item
                        >
                            <Input placeholder='Họ tên' />
                        </Form.Item>
                        <Form.Item
                        >
                            <Input placeholder='Số điện thoại' />
                        </Form.Item>
                        <Form.Item
                        >
                            <Input placeholder='Địa chỉ' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Phụ huynh 2"
                        >
                            <Input placeholder='Chức danh' />
                        </Form.Item>
                        <Form.Item
                        >
                            <Input placeholder='Họ tên' />
                        </Form.Item>
                        <Form.Item
                        >
                            <Input placeholder='Số điện thoại' />
                        </Form.Item>
                        <Form.Item
                        >
                            <Input placeholder='Địa chỉ' />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />
                <Row>
                    <Form.Item
                        label="Ghi chú học sinh"
                        className='flex-1'
                    >
                        <Input.TextArea
                            className='w-full'
                            style={{
                                resize: 'none'
                            }}
                        />
                    </Form.Item>
                </Row>
                <Row
                    className='flex justify-end gap-[1.2rem]'
                >
                    <Button icon={<BiRefresh />}>Đặt lại</Button>
                    <Button icon={<SaveOutlined />}>Lưu</Button>
                </Row>
            </Form>
        </div>
    )
}

export default StudentInfo;