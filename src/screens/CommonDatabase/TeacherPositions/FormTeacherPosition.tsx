import React, { useEffect } from 'react';
import { Button, Form, Input, Radio } from 'antd';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { BiSave } from "react-icons/bi";
import createTeacherPosition from '@/src/store/reducers/createTeacherPosition';
import { queryCreateTeacherPosition } from './config';
import './styles.scss';

const FormTeacherPosition = () => {
    const createTcPosition = createTeacherPosition.hook();
    const { values, handleSubmit, handleChange } = useFormik({
        initialValues: {
            code: '',
            name: '',
            des: '',
            isActive: true
        },
        onSubmit(values) {
            createTcPosition.query({
                query: queryCreateTeacherPosition,
                action: 'Create',
                operationName: 'CreateTeacherPosition',
                path: 'createTeacherPosition',
                payload: values
            });
        }
    });
    useEffect(() => {
        if (createTcPosition.data.successful) {
            toast('Lưu thông tin vị trí công tác thành công!', {
                type: 'success'
            });
            createTcPosition.clear?.();
        }
        if (createTcPosition.data.errors) {
            toast(`Lưu thông tin thất bại! ${createTcPosition.data.errors}`, {
                type: 'error'
            });
            createTcPosition.clear?.();
        }
    }, [createTcPosition.data]);
    return (
        <div className='formTeacherPosition'>
            <Form
                layout='vertical'
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Mã"
                    name="code"
                    required
                    rules={[{ required: true, message: 'Chưa cung cấp mã vị trí!' }]}
                    initialValue={values.code}
                >
                    <Input name="code" onChange={handleChange} />
                </Form.Item>
                <Form.Item
                    label="Tên"
                    name="name"
                    required
                    rules={[{ required: true, message: 'Chưa cung cấp tên vị trí!' }]}
                    initialValue={values.name}
                >
                    <Input name="name" onChange={handleChange} />
                </Form.Item>
                <Form.Item
                    label="Mô tả"
                    name="des"
                    initialValue={values.des}
                    required
                    rules={[{ required: true, message: 'Chưa cung cấp mô tả vị trí!' }]}
                >
                    <Input.TextArea name="des" onChange={handleChange} />
                </Form.Item>
                <Form.Item
                    label="Trạng thái"
                    required
                    name="isActive"
                    initialValue={values.isActive}
                >
                    <Radio.Group
                        optionType='button'
                        name="isActive"
                        onChange={handleChange}
                    >
                        <Radio value={true}>
                            Hoạt động
                        </Radio>
                        <Radio value={false}>
                            Ngừng
                        </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item>
                    <div className='flex justify-end'>
                        <Button icon={<BiSave />} htmlType='submit' loading={createTcPosition.data.isLoading}>Lưu</Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

export default FormTeacherPosition;