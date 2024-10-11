import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import createGradeLevel from '@/src/store/reducers/createGradeLevel';
import { queryCreateGrade } from './config';

const FormGrade = () => {
    const crGradeLevel = createGradeLevel.hook();
    const { handleSubmit, handleChange } = useFormik({
        initialValues: {
            level: null,
            name: null,
            des: ''
        },
        onSubmit(values) {
            crGradeLevel.query({
                query: queryCreateGrade,
                action: "Create",
                operationName: "CreateGradeLevel",
                path: "createGradeLevel",
                payload: values
            });
        }
    });
    useEffect(() => {
        if (crGradeLevel.data.successful) {
            toast("Tạo thông tin khối thành công!", {
                type: 'success'
            });
            crGradeLevel.clear?.();
        }
        if (crGradeLevel.data.errors) {
            toast(`Thất bại! ${crGradeLevel.data.errors}`, {
                type: 'error'
            });
            crGradeLevel.clear?.();
        }
    }, [crGradeLevel.data]);
    return (
        <div>
            <Form
                layout='vertical'
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Khối (VD: 10, 11, 12)"
                    required
                    rules={[{ required: true, type: "number", message: "Nhập khối (VD: 10, 11, 12)" }]}
                >
                    <Input type='number' size='small' name='level' onChange={handleChange} />
                </Form.Item>
                <Form.Item
                    label="Tên"
                    required
                    rules={[{ required: true, type: "number", message: "Nhập tên khối (VD: Khối 10, Khối 11, Khối 12)" }]}
                >
                    <Input size='small' placeholder='VD: Khối 10, Khối 11, Khối 12' name='name' onChange={handleChange} />
                </Form.Item>
                <Form.Item
                    label="Mô tả"
                >
                    <Input.TextArea style={{ resize: 'none' }} name='des' onChange={handleChange} />
                </Form.Item>
                <Form.Item>
                    <div className='flex justify-end gap-[1.4rem]'>
                        <Button size="small" htmlType='submit' loading={crGradeLevel.data.isLoading}>Lưu</Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

export default FormGrade;