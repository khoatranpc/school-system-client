'use client';
import React, { useEffect, useState } from 'react';
import { Drawer } from 'antd';
import { IoPersonAdd } from "react-icons/io5";
import { CiCircleInfo } from "react-icons/ci";
import { Button, Image, Input, Table, Tag, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { EyeOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { configHeaderCell, DegreeTranslation } from '@/src/utils';
import teachers from '@/src/store/reducers/teachers';
import { Degree, Obj, Role } from '@/src/types/interface';
import NotAvailable from '@/src/components/NotAvailable';
import { queryTeachers } from './config';
import FormCreateInfo from '@/src/components/FormCreateInfo';

const componentId = 'LIST_TEACHER';
const Teacher = () => {
    const [drawer, setDrawer] = useState(false);
    const listTeacher = teachers.hook();
    const getListTeacher = listTeacher.data.data?.teachers?.data as Obj[] ?? [];
    const crrPagination = {
        page: listTeacher.data.data?.teachers?.page ?? 1,
        limit: listTeacher.data.data?.teachers?.limit ?? 10,
    }
    const columns: ColumnsType = [
        {
            title: <p>Mã</p>,
            dataIndex: 'code',
            render(value, record) {
                return value
            },
            onHeaderCell() {
                return configHeaderCell();
            }
        },
        {
            title: 'Giáo viên',
            render(_, record) {
                return <div className='flex gap-[1.2rem]'>
                    <Image
                        className='rounded-lg'
                        width={50}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                    <div>
                        <span className='font-semibold'>{record.userId?.name ?? '-'}</span>
                        <p><i className='text-[1.2rem]'>{record.userId?.email ?? '-'}</i></p>
                        <p><i className='text-[1.2rem]'>{record.userId?.phoneNumber ?? '-'}</i></p>
                    </div>
                </div>
            },
            onHeaderCell() {
                return configHeaderCell();
            }
        },
        {
            title: 'Trình độ (cao nhất)',
            render(_, record) {
                const getDegreeLatest = record.degrees as Obj[] ?? [];
                const latest = getDegreeLatest.length ? getDegreeLatest[getDegreeLatest.length - 1] as Obj : {};
                return <div>
                    <p>Bậc: {latest ? DegreeTranslation[latest.type as Degree] : '-'}</p>
                    <p>Chuyên ngành: {latest ? latest.major ?? '' : '-'}</p>
                </div>
            },
            onHeaderCell() {
                return configHeaderCell();
            }
        },
        {
            title: 'Bộ môn',
            render() {
                return <div>
                    <NotAvailable />
                </div>
            },
            onHeaderCell() {
                return configHeaderCell();
            }
        },
        {
            title: <Tooltip title="Thông tin công tác tại trường" className='flex items-center'><p>TT Công tác<CiCircleInfo /></p></Tooltip>,
            render(_, record) {
                const getTeacherPositions = (record.teacherPositionsId as Obj[] ?? []).map(item => item.name).join(', ');
                return <div>
                    <p>{getTeacherPositions}</p>
                </div>
            },
            onHeaderCell() {
                return configHeaderCell();
            }
        },
        {
            title: 'Địa chỉ',
            render(_, record) {
                return <div>
                    {record.userId?.address ?? '-'}
                </div>
            },
            onHeaderCell() {
                return configHeaderCell();
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isActive',
            render(value, __) {
                return <div>
                    <Tag color={value ? 'green-inverse' : 'red-inverse'}>{value ? 'Đang công tác' : 'Đã nghỉ'}</Tag>
                </div>
            },
            onHeaderCell() {
                return configHeaderCell();
            }
        },
        {
            title: 'Hành động',
            render() {
                return <div>
                    <Button size="small" icon={<EyeOutlined />}>Chi tiết</Button>
                </div>
            },
            onHeaderCell() {
                return configHeaderCell();
            }
        }
    ];
    const handleQueryListTeacher = (page: number = 1, limit: number = 10) => {
        listTeacher.query({
            query: queryTeachers,
            action: 'Read',
            operationName: 'Teachers',
            path: 'teachers',
            componentId: componentId,
            payload: {
                pagination: {
                    page,
                    limit
                }
            }
        });
    }
    useEffect(() => {
        if (!listTeacher.data.data) {
            handleQueryListTeacher();
        } else if (listTeacher.data.componentId && listTeacher.data.componentId !== componentId) {
            handleQueryListTeacher();
        }
    }, []);
    return (
        <div className='h-full'>
            <div className="toolbar flex justify-end gap-[1.2rem] mb-[1.2rem]">
                <Input placeholder='Tìm kiếm thông tin' className='w-fit' prefix={<SearchOutlined />} />
                <Button icon={<ReloadOutlined />} onClick={() => {
                    handleQueryListTeacher(crrPagination.page, crrPagination.limit);
                }}>Tải lại</Button>
                <Tooltip title="Tạo mới một thông tin giáo viên" color='#4F45E5'><Button icon={<IoPersonAdd />} onClick={() => setDrawer(true)}>Tạo mới</Button></Tooltip>
            </div>
            <Drawer
                open={drawer}
                onClose={() => setDrawer(false)}
                title="Tạo thông tin giáo viên"
                width={"60vw"}
            >
                {
                    drawer && <FormCreateInfo info={Role.TEACHER} onSubmit={(values) => {

                    }}
                    />
                }
            </Drawer>
            <Table
                loading={listTeacher.data.isLoading}
                size="small"
                className='h-full'
                columns={columns}
                dataSource={getListTeacher}
                pagination={{
                    showTotal(total) {
                        return <p className='text-[var(--base)!important]'>Tổng: {total}</p>
                    },
                    showSizeChanger: true,
                    pageSize: crrPagination.limit,
                    current: crrPagination.page,
                    total: listTeacher.data.data?.teachers?.count as number ?? 0,
                    onChange(page, pageSize) {
                        handleQueryListTeacher(page, pageSize);
                    },
                }}
            />
        </div >
    )
}

export default Teacher;