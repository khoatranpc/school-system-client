import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TfiReload } from 'react-icons/tfi';
import { LuPackagePlus } from "react-icons/lu";
import { ColumnsType } from 'antd/es/table';
import { Button, Table } from 'antd';
import { Obj } from '@/src/types/interface';
import classes from '@/src/store/reducers/classes';
import { uuid } from '@/src/utils';
import NotAvailable from '@/src/components/NotAvailable';
import ModalListClass from './ModalListClass';
import { queryClasses } from './config';
import './styles.scss';

const ListClass = () => {
    const [open, setOpen] = useState(false);
    const listClass = classes.hook();
    const [pagination, setPagination] = useState({
        limit: 10,
        page: 1
    });

    const componentId = useRef(uuid());
    const columns: ColumnsType = [
        {
            title: 'Khối',
            key: 'Khối',
            render(_, record) {
                return record.gradeLevelId?.level ?? <NotAvailable />
            },
            onHeaderCell() {
                return {
                    className: 'bg-[var(--base-soft)!important]'
                }
            }
        },
        {
            title: 'Lớp',
            key: 'Lớp',
            dataIndex: 'name',
            render(value) {
                return value ?? <NotAvailable />
            },
            onHeaderCell() {
                return {
                    className: 'bg-[var(--base-soft)!important]'
                }
            }
        },
        {
            title: 'Học kỳ',
            key: 'Học kỳ',
            render(_, record) {
                return record.schoolYearId?.name ?? <NotAvailable />
            },
            onHeaderCell() {
                return {
                    className: 'bg-[var(--base-soft)!important]'
                }
            }
        },
        {
            title: 'Sĩ số',
            render() {
                return <NotAvailable />
            },
            onHeaderCell() {
                return {
                    className: 'bg-[var(--base-soft)!important]'
                }
            }
        },
        {
            title: 'GVCN',
            render() {
                return <NotAvailable />
            },
            onHeaderCell() {
                return {
                    className: 'bg-[var(--base-soft)!important]'
                }
            }
        },
        {
            title: 'Trạng thái',
            render() {
                return <NotAvailable />
            },
            onHeaderCell() {
                return {
                    className: 'bg-[var(--base-soft)!important]'
                }
            }
        }
    ];

    const dataListClass = useMemo(() => {
        return listClass.data.data?.classes?.data as Obj[] ?? [];
    }, [listClass.data]);
    const handleQueryListClass = (limit: number, page: number) => {
        listClass.query({
            query: queryClasses,
            "operationName": "Classes",
            "path": "classes",
            "action": "Read",
            payload: {
                isDeleted: false,
                limit: limit,
                page: page
            },
            componentId: componentId.current
        });
    };

    useEffect(() => {
        handleQueryListClass(pagination.limit, pagination.page);
    }, [pagination]);

    return (
        <div className="manageListClass">
            <div className="toolbar flex justify-end mb-[1.4rem] gap-[1.4rem]">
                <Button size='small' onClick={() => setOpen(true)}><LuPackagePlus /> Tạo lớp</Button>
                <Button size='small' onClick={() => handleQueryListClass(pagination.limit, pagination.page)}><TfiReload /> Tải lại</Button>
            </div>
            <ModalListClass open={open} onClose={() => setOpen(false)} />
            <Table
                bordered
                loading={listClass.data.isLoading}
                size='small'
                columns={columns}
                dataSource={dataListClass}
                pagination={{
                    size: "small",
                    showSizeChanger: true,
                    showTotal(total) {
                        return <p className='text-[var(--base)] font-semibold'>Tổng: {total}</p>
                    },
                    pageSize: pagination.limit,
                    onChange(page, pageSize) {
                        setPagination({
                            limit: pageSize,
                            page: page
                        });
                    },
                    total: listClass.data.data?.classes?.count ?? 1
                }}
            />
        </div>
    )
}

export default ListClass;