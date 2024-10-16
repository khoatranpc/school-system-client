import React, { memo, useEffect, useState } from 'react';
import { Button, DatePicker, Divider, Form, Input, Table, UploadFile } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { useForm, SubmitHandler, Controller, useFieldArray } from "react-hook-form";
import { Obj } from '@/src/types/interface';
import { columns, queryCreateTeacher } from './config';
import SelectTeacherPosition from '@/src/components/SelectTeacherPosition';
import ImageUpload from '@/src/components/ImageUpload';
import createTeacher from '@/src/store/reducers/createTeacher';
import { toast } from 'react-toastify';

interface Values {
    name: string,
    dob: Date | string,
    address: string,
    phoneNumber: string,
    identity: string,
    email: string,
    degrees: Obj[],
    teacherPositionsId: string[]
}

interface PropsTable {
    degrees: Obj[];
    handle: (...event: any[]) => void;
}
const TableComponent = (props: PropsTable) => {
    return <Table
        dataSource={props.degrees}
        columns={columns(props.degrees, props.handle)}
        pagination={false}
    />
};
const MemoTable = memo(TableComponent, (prevProps, nextProps) => {
    const getDataPrevDegrees = JSON.stringify(prevProps.degrees);
    const getDataNextDegrees = JSON.stringify(nextProps.degrees);
    if (getDataPrevDegrees !== getDataNextDegrees) {
        return false;
    }
    return true;
});


const FormCreateTeacher = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const createTc = createTeacher.hook();
    const initValues: Values = {
        name: '',
        dob: '',
        address: '',
        phoneNumber: '',
        identity: '',
        email: '',
        degrees: [],
        teacherPositionsId: []
    };
    const {
        register,
        control,
    } = useForm<Values>({ defaultValues: initValues });
    const controlDegrees = useFieldArray({
        control,
        name: "degrees",

    });
    const handleDegrees = (isAppend: boolean, indexRemove?: number, isReplace?: boolean, values?: Obj[]) => {
        if (isAppend) {
            const newDegree = {
                type: '',
                school: '',
                major: '',
                year: '',
                isGraduated: true
            };
            controlDegrees.append(newDegree);
        } else if (isAppend && typeof indexRemove === 'boolean') {
            controlDegrees.remove(indexRemove);
        } else if (isReplace && values) {
            controlDegrees.replace([...values]);
        }
    }

    const onSubmit: SubmitHandler<Values> = (data) => {
        const getData = {
            ...data,
            dob: new Date(data.dob).getTime(),
            degrees: controlDegrees.fields.map(({ id, ...rest }) => rest)
        };
        createTc.query({
            query: queryCreateTeacher,
            action: 'Create',
            operationName: 'CreatTeacher',
            path: 'createTeacher',
            payload: getData
        });
    };
    useEffect(() => {
        if (createTc.data.successful) {
            toast('Lưu thông tin GV thành công!', {
                type: 'success'
            });
            createTc.clear?.();
        }
        if (createTc.data.errors) {
            toast(`Thất bại! ${createTc.data.errors}`, {
                type: 'warning'
            });
            createTc.clear?.();
        }
    }, [createTc.data]);
    return (
        <div className='formCreateTeacher'>
            <Form
                layout='vertical'
                onFinish={onSubmit}
            >
                <div
                    className='flex gap-[1.8rem]'
                >
                    <div className='flex'>
                        <ImageUpload
                            fileList={fileList}
                            setFileList={setFileList}
                        />
                    </div>
                    <div className="personalInfo flex-1">
                        <Divider style={{ borderColor: 'var(--base)' }} orientation='left'>Thông tin cá nhân</Divider>
                        <div className='flex gap-[1.4rem]'>
                            <div className='flex-1'>
                                <Form.Item
                                    label="Họ và tên"
                                    name="name"
                                    rules={[{ required: true, message: 'Chưa nhập họ tên!', validateTrigger: '' }]}
                                >
                                    <Input defaultValue={initValues.name} {...register("name")} type="text" placeholder='VD: Nguyễn Văn A' />
                                </Form.Item>

                                <Form.Item
                                    label="Số điện thoại"
                                    required
                                    name="phoneNumber"
                                    rules={[{ required: true, message: 'Chưa nhập số điện thoại!' }]}
                                >
                                    <Input {...register("phoneNumber")} defaultValue={initValues.phoneNumber} placeholder='Nhập số điện thoại' />
                                </Form.Item>
                                <Form.Item
                                    label="Số CCCD"
                                    required
                                    name="identity"
                                    rules={[{ required: true, message: 'Chưa nhập số CCCD!' }]}
                                >
                                    <Input {...register("identity")} defaultValue={initValues.identity} placeholder='Nhập số CCCD' />
                                </Form.Item>
                            </div>
                            <div className='flex-1'>
                                <Controller
                                    name='dob'
                                    control={control}
                                    render={({ field }) => {
                                        return <Form.Item
                                            label="Ngày sinh"
                                            required
                                            name="dob"
                                            rules={[{ required: true, message: 'Chưa nhập ngày sinh!' }]}
                                        >
                                            <DatePicker placeholder='Chọn ngày sinh' format={"DD/MM/YYYY"} className="w-[20rem]" onChange={(date: any) => {
                                                const getDate = date ? date.toDate() : '';
                                                field.onChange(getDate);
                                            }} />
                                        </Form.Item>
                                    }}
                                />
                                <Form.Item
                                    label="Email"
                                    required
                                    name="email"
                                    rules={[{ required: true, message: 'Chưa nhập email!', type: 'email' }]}
                                >
                                    <Input {...register("email")} defaultValue={initValues.email} placeholder='example@school.edu.vn' />
                                </Form.Item>
                                <Form.Item
                                    label="Địa chỉ"
                                    required
                                    name="address"
                                    rules={[{ required: true, message: 'Chưa nhập địa chỉ thường trú!' }]}
                                >
                                    <Input {...register("address")} defaultValue={initValues.address} placeholder='Địa chỉ thường trú' />
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='flex gap-[1.4rem] flex-col'>
                        <div className='flex-1'>
                            <Divider style={{ borderColor: 'var(--base)' }} orientation='left'>Thông tin công tác</Divider>
                            <Controller
                                control={control}
                                name='teacherPositionsId'
                                defaultValue={[]}
                                render={({ field }) => {
                                    return <Form.Item
                                        label="Vị trí công tác"
                                        required
                                        rules={[{ required: true, message: 'Ít nhất một vị trí công tác!' }]}
                                        name="teacherPositionsId"
                                    >
                                        <SelectTeacherPosition
                                            {...field}
                                            onChange={(value) => {
                                                field.onChange(value);
                                            }}
                                        />
                                    </Form.Item>
                                }}
                            />
                        </div>
                        <div className='flex-1'>
                            <Divider style={{ borderColor: 'var(--base)' }} orientation='left'>Học vị</Divider>
                            <div className='flex justify-end mb-[1.4rem]'>
                                <Button
                                    onClick={() => {
                                        handleDegrees(true);
                                    }}
                                    disabled={createTc.data.isLoading}
                                >Thêm</Button>
                            </div>
                            <MemoTable
                                degrees={controlDegrees.fields}
                                handle={handleDegrees}
                            />
                            <div className='flex justify-end mt-[1.4rem]'>
                                <Button icon={<SaveOutlined />} htmlType='submit' loading={createTc.data.isLoading}>Lưu</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    )
};

export default FormCreateTeacher;