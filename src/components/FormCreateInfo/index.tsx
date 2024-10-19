import React, { memo, useEffect, useState } from 'react';
import { Button, DatePicker, Divider, Form, Input, Table, UploadFile } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useForm, SubmitHandler, Controller, useFieldArray } from "react-hook-form";
import { Obj, Role } from '@/src/types/interface';
import { columns, queryCreateStudent, queryCreateTeacher } from './config';
import SelectTeacherPosition from '@/src/components/SelectTeacherPosition';
import ImageUpload from '@/src/components/ImageUpload';
import createTeacher from '@/src/store/reducers/createTeacher';
import createStudent from '@/src/store/reducers/createStudent';


interface Values {
    name: string,
    dob: Date | string,
    address: string,
    phoneNumber: string,
    identity: string,
    email: string,
    degrees?: Obj[],
    teacherPositionsId?: string[]
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

interface FormCreateInfoProp {
    info: Role;
    onSubmit?: (values: Obj) => void;
    loading?: boolean;
}
const FormCreateInfo = (props: FormCreateInfoProp) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const createTc = createTeacher.hook();
    const createStu = createStudent.hook();

    const initValues: Values = {
        name: '',
        dob: '',
        address: '',
        phoneNumber: '',
        identity: '',
        email: '',
        ...props.info === Role.TEACHER ? {
            degrees: [],
            teacherPositionsId: []
        } : {}
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
        } else if (!isAppend && typeof indexRemove === 'number' && indexRemove >= 0) {
            controlDegrees.remove(indexRemove);
        } else if (isReplace && values) {
            controlDegrees.replace([...values]);
        }
    }

    const onSubmit: SubmitHandler<Values> = (data) => {
        switch (props.info) {
            case Role.TEACHER:
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
                return;
            default:
                createStu.query({
                    operationName: 'CreateStudent',
                    path: 'createStudent',
                    action: 'Create',
                    query: queryCreateStudent,
                    payload: {
                        ...data,
                        dob: new Date(data.dob).getTime(),
                    }
                })
                break;
        }
    };
    useEffect(() => {
        if (props.info === Role.TEACHER) {
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
        }
        if (props.info === Role.STUDENT) {
            if (createStu.data.successful) {
                toast('Lưu thông tin HS thành công!', {
                    type: 'success'
                });
                createStu.clear?.();
            }
            if (createStu.data.errors) {
                toast(`Thất bại! ${createStu.data.errors}`, {
                    type: 'warning'
                });
                createStu.clear?.();
            }
        }
    }, [createTc.data, createStu, props.info]);
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
                                    initialValue={initValues.name}
                                    name="name"
                                    rules={[{ required: true, message: 'Chưa nhập họ tên!', validateTrigger: '' }]}
                                >
                                    <Input {...register("name")} type="text" placeholder='VD: Nguyễn Văn A' />
                                </Form.Item>

                                <Form.Item
                                    label="Số điện thoại"
                                    required
                                    name="phoneNumber"
                                    rules={[{ required: true, message: 'Chưa nhập số điện thoại!' }]}
                                    initialValue={initValues.phoneNumber}
                                >
                                    <Input {...register("phoneNumber")} placeholder='Nhập số điện thoại' />
                                </Form.Item>
                                <Form.Item
                                    label="Số CCCD"
                                    required
                                    name="identity"
                                    rules={[{ required: true, message: 'Chưa nhập số CCCD!' }]}
                                    initialValue={initValues.identity}
                                >
                                    <Input {...register("identity")} placeholder='Nhập số CCCD' />
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
                                            initialValue={field.value}
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
                                    initialValue={initValues.email}
                                >
                                    <Input {...register("email")} placeholder='example@school.edu.vn' />
                                </Form.Item>
                                <Form.Item
                                    label="Địa chỉ"
                                    required
                                    name="address"
                                    rules={[{ required: true, message: 'Chưa nhập địa chỉ thường trú!' }]}
                                    initialValue={initValues.address}
                                >
                                    <Input {...register("address")} placeholder='Địa chỉ thường trú' />
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                </div>
                {props.info === Role.TEACHER ?
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
                            </div>
                        </div>
                    </div>
                    : null
                }
                <div className='flex justify-end mt-[1.4rem]'>
                    <Button icon={<SaveOutlined />} htmlType='submit' loading={createStu.data.isLoading ?? createTc.data.isLoading}>Lưu</Button>
                </div>
            </Form>
        </div>
    )
};

export default FormCreateInfo;