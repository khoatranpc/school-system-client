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
import { queryCountStudentInClass, queryHomeRoomTeachers } from '@/src/utils/operationGraphQl';
import homeroomTeachers from '@/src/store/reducers/homeroomTeachers';
import countStudentInClass from '@/src/store/reducers/countStudentInClass';
import './styles.scss';


interface Props {
    dataListClass: ReduxState;
}

const componentId = 'LIST_CLASS';
let isReload = false;
const ListClass = (props: Props) => {
    const [open, setOpen] = useState(false);
    const listClass = classes.hook();
    const listHomeroomTeacher = homeroomTeachers.hook();
    const countSTinClass = countStudentInClass.hook();
    const getCountStudentInClass = useMemo(() => {
        const data: Obj = {};
        (countSTinClass.data.data?.countStudentInClass as Obj[] ?? []).forEach(item => {
            data[item.classId] = item.count;
        });
        return data;
    }, [countSTinClass.data.data]);
    const getDataListHomeRoomTeacher = useMemo(() => {
        const data: Record<string, Obj[]> = {};
        (listHomeroomTeacher.data.data?.homeroomTeachers?.data as Obj[])?.filter((item) => {
            return item.isActive && !item.isDeleted
        })?.forEach((item) => {
            if (data[item.classId?._id as string]) {

                data[item.classId?._id as string].push(item)
            } else {
                data[item.classId?._id as string] = [item];

            }
        });
        return data;
    }, [listHomeroomTeacher.data.data]);
    const router = useRouter();
    const [pagination, setPagination] = useState({
        limit: props.dataListClass?.data?.classes?.limit ?? 10,
        page: props.dataListClass?.data?.classes?.page ?? 1,
    });

    const columns: ColumnsType = useMemo(() => {
        return [
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
                dataIndex: '_id',
                key: 'ss',
                render(classId) {
                    return getCountStudentInClass[classId] ?? 0;
                },
                onHeaderCell() {
                    return {
                        className: 'bg-[var(--base-soft)!important]'
                    }
                }
            },
            {
                title: 'GVCN',
                key: 'GVCN',
                dataIndex: '_id',
                render(classId) {
                    const getValue = getDataListHomeRoomTeacher[classId]?.[0]?.teacherId?.userId?.name as string ?? <NotAvailable />;
                    return getValue
                },
                onHeaderCell() {
                    return {
                        className: 'bg-[var(--base-soft)!important]'
                    }
                }
            },
            {
                title: 'Trạng thái',
                key: 'TT',
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
                key: 'ACTION',
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
    }, [getDataListHomeRoomTeacher, getCountStudentInClass]);

    const dataListClass: Obj[] = useMemo(() => {
        return ((props.dataListClass?.componentId !== componentId) ? [] : props.dataListClass?.data?.classes?.data as Obj[] ?? []).map((cls) => {
            return {
                ...cls,
                key: cls._id
            }
        });
    }, [props.dataListClass?.data]);
    const handleQueryExtend = () => {
        const mapFilterPayload: {
            classIds: Obj,
            schoolYearIds: Obj
        } = {
            classIds: {},
            schoolYearIds: {}
        };
        dataListClass.forEach((item) => {
            mapFilterPayload.classIds[item._id] = item._id;
            mapFilterPayload.schoolYearIds[item.schoolYearId?._id] = item.schoolYearId?._id;
        });
        if (isReload || listHomeroomTeacher.data.componentId !== componentId) {
            listHomeroomTeacher.query({
                "operationName": "HomeRoomTeacher",
                "path": "homeroomTeachers",
                "action": "All",
                "payload": {
                    "filter": {
                        classIds: Object.keys(mapFilterPayload.classIds),
                        schoolYearIds: Object.keys(mapFilterPayload.schoolYearIds),
                        isDeleted: false,
                        isActive: true
                    },
                    "pagination": {
                        limit: 100
                    }
                },
                query: queryHomeRoomTeachers,
                componentId: componentId
            });
        }
        if (isReload || countSTinClass.data.componentId !== componentId) {
            countSTinClass.query({
                "operationName": "CountStudentInClass",
                "path": "countStudentInClass",
                "action": "All",
                "payload": {
                    "classIds": Object.keys(mapFilterPayload.classIds)
                },
                query: queryCountStudentInClass,
                componentId: componentId
            });
        }
        isReload = false;
    };
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
        if (!props.dataListClass.isLoading) {
            handleQueryListClass(pagination.limit, pagination.page);
        }
    }, [props.dataListClass]);
    useEffect(() => {
        if (dataListClass.length) {
            handleQueryExtend();
        }
    }, [dataListClass]);
    return (
        <div className="manageListClass">
            <div className="toolbar flex justify-end mb-[1.4rem] gap-[1.4rem]">
                <Button size='small' onClick={() => setOpen(true)}><LuPackagePlus /> Tạo lớp</Button>
                <Button size='small' onClick={() => {
                    handleQueryListClass(pagination.limit, pagination.page, true);
                    isReload = true;
                }}><TfiReload /> Tải lại</Button>
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