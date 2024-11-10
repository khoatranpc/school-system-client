import React, { useEffect, useState } from 'react';
import { Button, Drawer, Image, Input, Table, Tooltip } from 'antd';
import { EyeOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { useSearchParams } from 'next/navigation';
import { IoAddOutline } from 'react-icons/io5';
import { configHeaderCell } from '@/src/utils';
import studentClasses from '@/src/store/reducers/studentClasses';
import { Obj } from '@/src/types/interface';
import { queryStudentClasses } from './config';
import AddStudent from './AddStudent';

const componentId = 'LIST_STUDENT_IN_CLASS';
const List = () => {
    const searchParams = useSearchParams();
    const classId = searchParams.get('classId');
    const listStudentInClass = studentClasses.hook();
    const getListStudent = (listStudentInClass.data.data?.studentClasses?.data as Obj[] ?? []).map((item) => {
        return {
            key: item._id as string,
            ...item
        }
    });
    const [drawer, setDrawer] = useState(false);
    const columns: ColumnsType = [
        {
            key: 'stt',
            title: 'STT',
            render(_, __, index) {
                return index + 1
            },
            onHeaderCell() {
                return configHeaderCell();
            },
            width: 50
        },
        {
            key: 'code',
            title: 'Mã HS',
            render(_, record) {
                return record.studentId?.code ?? ''
            },
            onHeaderCell() {
                return configHeaderCell();
            },
            width: 150
        },
        {
            key: 'hs',
            title: 'Học sinh',
            render(_, record) {
                return <div className='flex gap-[1.2rem]'>
                    <div>
                        <Image
                            className='rounded-lg'
                            width={50}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />
                    </div>
                    <div>
                        <p className='font-semibold '>{record.studentId?.userId?.name}</p>
                        <p className='text-[1.2rem] italic'>{record.studentId?.userId?.email}</p>
                        <p className='text-[1.2rem] italic'>{record.studentId?.userId?.phoneNumber}</p>
                    </div>
                </div>
            },
            onHeaderCell() {
                return configHeaderCell();
            }
        },
        {
            key: 'ct',
            title: 'Liên hệ',
            render(_, record) {
                return <div>
                    <p>{record.studentId?.userId?.address}</p>
                </div>
            },
            onHeaderCell() {
                return configHeaderCell();
            }
        },
        {
            key: 'ln',
            title: 'Học tập',
            render(_, record) {
                return <div className='flex gap-[1.2rem]'>
                    <div>
                        <p>Điểm TB:</p>
                        <p>Hạnh kiểm:</p>
                    </div>
                    <Tooltip title="Xem bảng điểm"><Button size="small" icon={<EyeOutlined />}></Button></Tooltip>
                </div>
            },
            onHeaderCell() {
                return configHeaderCell();
            }
        },
        {
            key: 'status',
            title: 'Trạng thái',
            onHeaderCell() {
                return configHeaderCell();
            },
            render(_, record) {
                return <div>
                    <span>{record.type}</span>
                </div>
            },
            width: 120
        },
        {
            key: 'action',
            title: 'Hành động',
            onHeaderCell() {
                return configHeaderCell();
            },
            render(_, record) {
                return <div>
                    <Button size='small' icon={<EyeOutlined />}>Chi tiết</Button>
                </div>
            }
        }
    ];
    const queryListStudentInClass = (page: number = 1, limit: number = 50) => {
        listStudentInClass.query({
            query: queryStudentClasses,
            action: 'Read',
            operationName: 'StudentClasses',
            path: 'studentClasses',
            componentId: componentId,
            payload: {
                filter: {
                    classId
                },
                pagination: {
                    page,
                    limit
                }
            }
        });
    }
    useEffect(() => {
        queryListStudentInClass();
    }, []);
    return (
        <div className='listStudentInClass mt-[1.8rem] flex flex-col gap-[1rem]'>
            <div className="toolbar flex justify-end gap-[1.8rem]">
                <Input className='w-fit' size="small" prefix={<SearchOutlined />} placeholder='Nhập thông tin tìm kiếm' />
                <Button size='small' icon={<ReloadOutlined />} onClick={() => queryListStudentInClass()}>Tải lại</Button>
                <Button size='small' onClick={() => setDrawer(true)} icon={<IoAddOutline />}>Thêm học sinh</Button>
            </div>
            <Drawer
                open={drawer}
                onClose={() => setDrawer(false)}
                title="Thêm học sinh"
                width='80vw'
            >
                {drawer && <AddStudent classId={classId as string} />}
            </Drawer>
            <Table
                loading={listStudentInClass.data.isLoading}
                size='small'
                columns={columns}
                dataSource={getListStudent}
                pagination={false}
                scroll={{ x: getListStudent.length ? 'max-content' : '', y: getListStudent.length ? '55vh' : '' }}
            />
        </div>
    )
}

export default List;