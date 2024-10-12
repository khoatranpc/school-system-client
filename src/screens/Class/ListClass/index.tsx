import React, { memo, useEffect, useMemo, useState } from 'react';
import { TfiReload } from 'react-icons/tfi';
import { LuPackagePlus } from "react-icons/lu";
import { ColumnsType } from 'antd/es/table';
import { EyeOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { Button, Table, Tag } from 'antd';
import { KeyTab, Obj, ReduxState } from '@/src/types/interface';
import classes from '@/src/store/reducers/classes';
import { getLinkByRoute } from '@/src/utils/router';
import NotAvailable from '@/src/components/NotAvailable';
import ModalListClass from './ModalListClass';
import { queryClasses } from './config';
import './styles.scss';


interface Props {
    dataListClass: ReduxState;
}

const componentId = 'LIST_CLASS';
const ListClass = (props: Props) => {
    const [open, setOpen] = useState(false);
    const listClass = classes.hook();
    const router = useRouter();
    const [pagination, setPagination] = useState({
        limit: props.dataListClass?.data?.classes?.limit ?? 10,
        page: props.dataListClass?.data?.classes?.page ?? 1,
    });

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
            },
            fixed: true,
            width: 100,
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
            },
            width: 100,
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
            dataIndex: 'isActive',
            className: 'text-center',
            render(value) {
                return <Tag className='m-0' color={value ? 'green-inverse' : 'red-inverse'}>{value ? 'Đang học' : 'Kết thúc'}</Tag>
            },
            onHeaderCell() {
                return {
                    className: 'bg-[var(--base-soft)!important]'
                }
            },
            width: 100
        },
        {
            title: 'Hành động',
            render(_, record) {
                return <div>
                    <Button icon={<EyeOutlined />} size='small'
                        onClick={() => {
                            router.push(`${getLinkByRoute['ADMIN'][KeyTab.DETAIL_CLASS]}?classId=${record._id ?? ''}`);
                        }}
                    >
                        Chi tiết
                    </Button>
                </div>
            },
            onHeaderCell() {
                return {
                    className: 'bg-[var(--base-soft)!important]'
                }
            },
            width: 100,
            fixed: true
        }
    ];

    const dataListClass = useMemo(() => {
        return (props.dataListClass?.componentId !== componentId) ? [] : props.dataListClass?.data?.classes?.data as Obj[] ?? [];
    }, [props.dataListClass?.data]);
    const handleQueryListClass = (limit: number, page: number, isQuery?: boolean) => {
        if (isQuery || !props.dataListClass?.data || (props.dataListClass?.componentId !== componentId)) {
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
                componentId: componentId
            });
        }
    };

    useEffect(() => {
        handleQueryListClass(pagination.limit, pagination.page);
    }, [props.dataListClass]);

    return (
        <div className="manageListClass">
            <div className="toolbar flex justify-end mb-[1.4rem] gap-[1.4rem]">
                <Button size='small' onClick={() => setOpen(true)}><LuPackagePlus /> Tạo lớp</Button>
                <Button size='small' onClick={() => handleQueryListClass(pagination.limit, pagination.page, true)}><TfiReload /> Tải lại</Button>
            </div>
            <ModalListClass open={open} onClose={() => setOpen(false)} />
            <Table
                bordered
                loading={props.dataListClass?.isLoading}
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
                        handleQueryListClass(pageSize, page, true);
                        setPagination({
                            limit: pageSize,
                            page: page
                        });
                    },
                    total: props.dataListClass?.data?.classes?.count ?? 1,
                    current: props.dataListClass?.data?.classes?.page ?? 1
                }}
            />
        </div>
    )
}


const MemoListClass = memo((props: Props) => {
    return <ListClass dataListClass={props.dataListClass} />
}, (_, nextProps) => {
    if (nextProps.dataListClass.componentId && nextProps.dataListClass.componentId === componentId) {
        return false;
    }
    return true;
});

const HighOrderListClass = () => {
    const listClass = classes.hook();
    const dataListClass = listClass.data;
    return <MemoListClass dataListClass={dataListClass} />;
}

export default HighOrderListClass;