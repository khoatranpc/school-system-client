'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PiStudentFill } from "react-icons/pi";
import Highchart from 'highcharts';
import { ColumnsType } from 'antd/es/table';
import { Table } from 'antd/lib';
import { IoAddCircle } from 'react-icons/io5';
import { EyeOutlined, LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Drawer, Tag, Tooltip } from 'antd';
import HighchartsReact from 'highcharts-react-official';
import { Obj, Role } from '@/src/types/interface';
import listStudent from '@/src/store/reducers/listStudent';
import { configHeaderCell } from '@/src/utils';
import FormCreateInfo from '@/src/components/FormCreateInfo';
import { chartOptions, queryListStudent } from './config';
import './styles.scss';

const ListStudent = () => {
    const ltStudent = listStudent.hook();
    const componentId = useRef<string>('ListStudent');
    const [drawer, setDrawer] = useState(false);
    const getDataListStudent = useMemo(() => {
        return ltStudent.data.data?.students?.data as Obj[] ?? [];
    }, [ltStudent.data]);
    const columns: ColumnsType = [
        {
            key: 'STT',
            title: 'STT',
            render(_, __, idx) {
                return idx + 1;
            },
            onHeaderCell() {
                return configHeaderCell();
            }
        },
        {
            key: 'Code',
            title: 'Mã HS',
            dataIndex: 'code',
            onHeaderCell() {
                return configHeaderCell();
            }
        },
        {
            key: 'HS',
            title: 'Học sinh',
            dataIndex: 'userId',
            render(user) {
                return <div className='flex gap-[1.2rem]'>
                    <div><PiStudentFill fontSize={'8rem'} size={30} className='text-[8rem] text-[var(--base)]' /></div>
                    <div>
                        <p className='font-semibold'>{user.name ?? ''}</p>
                        <p><i className='text-[1rem]'>{user.email ?? ''}</i></p>
                        <p><i className='text-[1rem]'>{user.phoneNumber ?? ''}</i></p>
                    </div>
                </div>
            },
            onHeaderCell() {
                return configHeaderCell();
            }
        },
        {
            key: 'Class',
            title: 'Lớp học (Hiện tại)',
            onHeaderCell() {
                return configHeaderCell();
            }
        },
        {
            key: 'Học tập',
            title: 'Học tập',
            render() {
                return <HighchartsReact highcharts={Highchart} options={chartOptions} />
            },
            onHeaderCell() {
                return configHeaderCell();
            }
        },
        {
            key: 'TT',
            title: 'Trạng thái',
            dataIndex: 'isActive',
            render(value) {
                return <Tag color={value ? 'green-inverse' : 'red-inverse'}>{value ? 'Đang học' : 'Ngừng học'}</Tag>
            },
            onHeaderCell() {
                return configHeaderCell();
            }
        },
        {
            key: 'Action',
            title: 'Hành động',
            onHeaderCell() {
                return configHeaderCell();
            },
            render() {
                return <div>
                    <Button icon={<EyeOutlined />}>Chi tiết</Button>
                </div>
            }
        }
    ];
    const queryData = (page: number = 1, limit: number = 10) => {
        ltStudent.query({
            action: 'Read',
            operationName: 'Students',
            path: 'students',
            query: queryListStudent,
            componentId: componentId.current,
            payload: {
                pagination: {
                    page,
                    limit
                }
            }
        });
    }
    useEffect(() => {
        if (!ltStudent.data.data || ltStudent.data.componentId !== componentId.current) {
            queryData();
        }
    }, []);
    useEffect(() => {
        if (ltStudent.data.successful) {
            // console.log(ltStudent.data);
        }
    }, [ltStudent.data]);
    return (
        <div className="listStudent">
            <div className="flex justify-end mb-4 gap-2">
                <Button onClick={() => {
                    queryData(ltStudent.data.data?.students?.page, ltStudent.data.data?.students?.limit);
                }}><ReloadOutlined /> Tải lại</Button>
                <Tooltip title="Tạo mới một thông tin học sinh" color='var(--base)'>
                    <Button onClick={() => setDrawer(true)}>
                        <IoAddCircle /> Tạo
                    </Button>
                </Tooltip>
            </div>
            <Drawer
                title="Thông tin học sinh"
                open={drawer}
                onClose={() => setDrawer(false)}
                width='60vw'
            >
                {drawer && <FormCreateInfo info={Role.STUDENT} />}
            </Drawer>
            <Table
                loading={{
                    spinning: ltStudent.data.isLoading,
                    indicator: <LoadingOutlined spin />
                }}
                columns={columns}
                dataSource={getDataListStudent}
                pagination={{
                    total: ltStudent.data.data?.students?.count ?? 0,
                    current: ltStudent.data.data?.students?.page ?? 1,
                    pageSize: ltStudent.data.data?.students?.limit ?? 10,
                    showTotal(total) {
                        return <p className='text-[var(--base)]'>Tổng: {total}</p>
                    },
                    showSizeChanger: true,
                    onChange(page, pageSize) {
                        queryData(page, pageSize);
                    },
                }}
            />
        </div>
    )
}

export default ListStudent;