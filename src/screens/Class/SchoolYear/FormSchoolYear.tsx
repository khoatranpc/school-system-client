import React, { useEffect } from 'react';
import { Button, DatePicker, Form, Input } from 'antd';
import { useFormik } from 'formik';
import StatusSchoolYearPicker, { StatusSchoolYear } from '@/src/components/StatusSchoolYearPicker';
import createSchoolYear from '@/src/store/reducers/createSchoolYear';
import queryCreateSchoolYear from './config';
import { toast } from 'react-toastify';

const FormSchoolYear = () => {
    const cSchoolYear = createSchoolYear.hook();
    const createdSchoolYear = cSchoolYear.data;
    const { values, setFieldValue, handleSubmit, handleChange } = useFormik({
        initialValues: {
            startDate: null,
            endDate: null,
            status: StatusSchoolYear.ACTIVE,
            name: ''
        },
        onSubmit(values) {
            cSchoolYear.query({
                action: 'Create',
                operationName: 'CreateSchoolYear',
                path: 'createSchoolYear',
                query: queryCreateSchoolYear,
                payload: values
            });
        }
    });
    useEffect(() => {
        console.log(createdSchoolYear);
        if (createdSchoolYear.successful && createdSchoolYear.data) {
            toast("Tạo thông tin học kỳ thành công!", {
                type: "success"
            });
            cSchoolYear.clear?.();
        }
        if (createdSchoolYear.errors) {
            toast(`Tạo thông tin học kỳ thất bại! ${createdSchoolYear.errors}`, {
                type: "error"
            });
            cSchoolYear.clear?.();
        }
    }, [cSchoolYear.data]);
    return (
        <div className='formSchoolYear'>
            <Form
                layout='vertical'
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="name"
                    label="Tên học kỳ"
                    required
                    rules={[{ required: true, message: "Hãy nhập tên học kỳ (number-number)!", pattern: /^\d{4,}-\d{4,}$/ }]}
                >
                    <Input
                        size='small'
                        placeholder='VD: 2018-2019'
                        name='name'
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item
                    name="startDate"
                    label="Ngày bắt đầu"
                    required
                    rules={[{ required: true, message: "Hãy chọn ngày bắt đầu học kỳ!" }]}
                >
                    <DatePicker format={"DD/MM/YYYY"} size="small" name="startDate" onChange={(day) => {
                        const getDate = day ? new Date(day.toISOString()).getTime() : null;
                        setFieldValue('startDate', getDate);
                    }} />
                </Form.Item>
                <Form.Item
                    name="endDate"
                    label="Ngày kết thúc"
                    required
                    rules={[{ required: true, message: "Hãy chọn ngày kết thúc học kỳ!" }]}
                >
                    <DatePicker format={"DD/MM/YYYY"} size="small" name="endDate" onChange={(day) => {
                        const getDate = day ? new Date(day.toISOString()).getTime() : null;
                        setFieldValue('endDate', getDate);
                    }} />
                </Form.Item>
                <Form.Item
                    label="Trạng thái"
                >
                    <StatusSchoolYearPicker
                        value={values.status}
                        onChange={(value) => {
                            setFieldValue('status', value);
                        }}
                    />
                </Form.Item>
                <Form.Item>
                    <div className='flex justify-end gap-[1.4rem]'>
                        {/* <Button size='small' onClick={handleReset}>Đặt lại</Button> */}
                        <Button size='small' htmlType='submit' loading={createdSchoolYear.isLoading}>Lưu</Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

export default FormSchoolYear;