import React from 'react';
import { Button, DatePicker, Form } from 'antd';
import { useFormik } from 'formik';
import StatusSchoolYearPicker, { StatusSchoolYear } from '@/src/components/StatusSchoolYearPicker';

const FormSchoolYear = () => {
    const { values, setFieldValue, handleSubmit } = useFormik({
        initialValues: {
            startDate: null,
            endDate: null,
            status: StatusSchoolYear.ACTIVE
        },
        onSubmit(values) {
            console.log("🚀 ~ FormSchoolYear ~ values:", values)
        }
    });
    return (
        <div className='formSchoolYear'>
            <Form
                layout='vertical'
                onFinish={handleSubmit}
            >
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
                        <Button size='small' htmlType='submit'>Lưu</Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

export default FormSchoolYear;