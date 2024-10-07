'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PiStudentFill } from "react-icons/pi";
import { v6 as uuid } from 'uuid';
import Highchart from 'highcharts';
import { ReloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import HighchartsReact from 'highcharts-react-official';
import { MantineReactTable, MRT_ColumnDef, useMantineReactTable } from 'mantine-react-table';
import { MRT_Localization_VI } from 'mantine-react-table/locales/vi';
import { Obj } from '@/src/types/interface';
import listStudent from '@/src/store/reducers/listStudent';
import { chartOptions, queryListStudent } from './config';
import './styles.scss';

const ListStudent = () => {
    const [columnFilters, setColumnFilters] = useState([]);
    const ltStudent = listStudent.hook();
    const componentId = useRef<string>(uuid());
    const getDataListStudent = useMemo(() => {
        return ltStudent.data.data?.students as Obj[] ?? [];
    }, [ltStudent.data]);
    const columns: MRT_ColumnDef<Obj>[] = [
        {
            header: 'Mã HS',
            accessorKey: 'code',
            enablePinning: true
        },
        {
            header: 'Tên',
            Cell(props) {
                console.log(props.cell.row.original);
                return <div className='flex items-start gap-[1.2rem]'>
                    <PiStudentFill color='var(--base)' size={"2.8rem"} />
                    <div className="student">
                        <p className='font-bold'>{props.cell.row.original.userId?.name ?? ''}</p>
                        <p>{props.cell.row.original.userId?.email ?? ''}</p>
                    </div>
                </div>
            },
            enablePinning: true
        },
        {
            header: 'Lớp',
            accessorKey: 'class',
            Cell(props) {
                return <div>
                    {props.renderedCellValue}
                </div>
            }
        },
        {
            header: 'Năm học',
            Cell() {
                return <div>
                    2024-2025
                </div>
            }
        },
        {
            header: 'Học tập',
            Cell(props) {
                return <HighchartsReact highcharts={Highchart} options={chartOptions} />
            },
            mantineTableHeadCellProps(props) {
                return {
                    className: 'headerCenter'
                }
            },
        },
        {
            header: 'GVCN',
            accessorKey: 'GVCN',
            Cell(props) {
                return <div>
                    Khoa Trần
                </div>
            }
        },
        {
            header: 'Liên hệ PH',
            Cell() {
                return <div>
                    0123456789
                </div>
            }
        }
    ];
    console.log(getDataListStudent);
    const table = useMantineReactTable({
        columns: columns,
        data: getDataListStudent,
        localization: MRT_Localization_VI,
        state: {
            isLoading: ltStudent.data.isLoading,
        },
        onColumnFiltersChange: (filters) => {
            setColumnFilters(filters as any);
        },
        columnFilterModeOptions: [],
        enableGlobalFilter: false,
    });
    useEffect(() => {
        if (!ltStudent.data.data) {
            ltStudent.query({
                action: 'Read',
                operationName: 'Students',
                path: 'students',
                query: queryListStudent,
                componentId: componentId.current
            });
        }
    }, []);
    useEffect(() => {
        if (ltStudent.data.successful) {
            console.log(ltStudent.data);
        }
    }, [ltStudent.data]);
    return (
        <div className="listStudent">
            <div className="flex justify-end mb-4">
                <Button><ReloadOutlined /> Tải lại</Button>
            </div>
            <MantineReactTable
                table={table}
            />
        </div>
    )
}

export default ListStudent;