import listStudent from '@/src/store/reducers/listStudent';
import { Button, Transfer } from 'antd';
import { TransferItem } from 'antd/es/transfer';
import { SaveOutlined } from '@ant-design/icons';
import React, { useEffect, useMemo, useState } from 'react';
import { mutationAddStudentsIntoClass, queryStudentsRNotInClass } from './config';
import { Obj } from '@/src/types/interface';
import Loading from '@/src/components/Loading';
import detailClass from '@/src/store/reducers/detailClass';
import NotAvailable from '@/src/components/NotAvailable';
import './styles.scss';
import addStudentsIntoClass from '@/src/store/reducers/addStudentIntoClass';

interface Props {
    classId?: string;
}

const componentId = 'AddStudent';
const AddStudent = (props: Props) => {
    const ltStudent = listStudent.hook();
    const detail = detailClass.hook();
    const getDetailClass = detail.data.data?.detailClass as Obj ?? {};
    const insertStudentsIntoClass = addStudentsIntoClass.hook();
    const getListStudent: TransferItem[] = useMemo(() => {
        return (ltStudent.data.data?.students?.data as Obj[] ?? []).map(student => {
            return {
                key: student._id as string,
                title: student.userId?.name as string ?? '',
                description: `${student.userId?.name as string ?? ''}${student.userId?.email as string ?? ''}${student.userId?.phoneNumber as string ?? ''}`,
                element: <div className=''>
                    <p><b>{student.userId?.name as string ?? ''}</b></p>
                    <p><i className='text-[1.2rem]'>{student.userId?.email as string ?? ''}</i></p>
                    <p><i className='text-[1.2rem]'>Lớp hiện tại:</i></p>
                </div>,
                email: student.userId?.email as string ?? '',
                phoneNumber: student.userId?.phoneNumber as string ?? '',
            }
        })
    }, [ltStudent.data]);
    const [targetKeys, setTargetKeys] = useState<React.Key[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
    const handleSave = () => {
        insertStudentsIntoClass.query({
            query: mutationAddStudentsIntoClass,
            action: 'Create',
            operationName: 'AddStudentsIntoClass',
            path: 'addStudentsIntoClass',
            payload: targetKeys
        });
    }
    useEffect(() => {
        if (props.classId !== ltStudent.data.componentId) {
            ltStudent.query({
                query: queryStudentsRNotInClass,
                action: 'Read',
                operationName: 'Students',
                path: 'students',
                componentId,
                payload: {
                    filter: {
                        classId: props.classId,
                        schoolYearId: getDetailClass.schoolYearId?._id as string ?? '',
                        gradeLevelId: getDetailClass.gradeLevelId?._id as string ?? '',
                        isNotInThisClass: true
                    },
                    pagination: {
                        limit: 50
                    }
                }
            });
        }
    }, []);
    return (
        <div className='h-full'>
            {ltStudent.data.isLoading ? <Loading /> :
                <div className='h-full'>
                    <Transfer
                        className='transferAddStudent justify-center'
                        showSearch
                        titles={['Danh sách', 'Lựa chọn']}
                        dataSource={getListStudent}
                        targetKeys={targetKeys}
                        selectedKeys={selectedKeys}
                        filterOption={(valueSearch, item) => {
                            return item.description!.toLowerCase().indexOf(valueSearch.toLowerCase()) > -1;
                        }}
                        render={(item) => {
                            // return item.element as React.ReactElement ?? <NotAvailable />
                            return {
                                label: item.element as React.ReactElement ?? <NotAvailable />,
                                value: `${item.title}${item.phoneNumber}${item.email}`
                            }
                        }}
                        oneWay
                        onChange={(targetKeys) => {
                            setTargetKeys([...targetKeys]);
                        }}
                        onSelectChange={(selectedKeys) => {
                            setSelectedKeys([...selectedKeys])
                        }}
                    />
                    <div className='flex justify-end mt-[1.2rem]'>
                        <Button icon={<SaveOutlined />} onClick={handleSave} loading={insertStudentsIntoClass.data.isLoading}>Lưu</Button>
                    </div>
                </div>
            }
        </div>
    )
}

export default AddStudent;