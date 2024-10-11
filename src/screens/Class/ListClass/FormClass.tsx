import React from 'react';
import { Button, Form, Input } from 'antd';
import { FaRegSave } from "react-icons/fa";
import SelectGradeLevel from '@/src/components/SelectGradeLevel';
import SelectSchoolYear from '@/src/components/SelectSchoolYear';

const FormClass = () => {
    return (
        <div>
            <Form
                layout='vertical'
            >
                <Form.Item
                    label="Khối"
                    required
                    name="gradeLevelId"
                    rules={[{ required: true, message: "Vui lòng chọn khối!" }]}
                >
                    <SelectGradeLevel
                    />
                </Form.Item>
                <Form.Item
                    label="Học kỳ"
                    required
                    name="schoolYearId"
                    rules={[{ required: true, message: "Vui lòng chọn học kỳ!" }]}
                >
                    <SelectSchoolYear
                    />
                </Form.Item>
                <Form.Item
                    label="Tên lớp"
                    name="name"
                    required
                    rules={[{ required: true, message: "Vui lòng cung cấp tên lớp!" }]}
                >
                    <Input size='small' />
                </Form.Item>
                <Form.Item>
                    <div className='flex justify-end'>
                        <Button size='small' icon={<FaRegSave />} htmlType='submit'>Lưu</Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

export default FormClass;