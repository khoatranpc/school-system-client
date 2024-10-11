import React, { useMemo, useState } from 'react';
import { MantineReactTable, MRT_ColumnDef, useMantineReactTable } from 'mantine-react-table';
import { MRT_Localization_VI } from 'mantine-react-table/locales/vi';
import { CiBookmarkPlus } from "react-icons/ci";
import { TfiReload } from "react-icons/tfi";
import { Obj } from '@/src/types/interface';
import { Button, Drawer } from 'antd';
import FormSchoolYear from './FormSchoolYear';

const SchoolYear = () => {
    const [open, setOpen] = useState(false);
    const columns: MRT_ColumnDef<Obj>[] = [
        {
            header: 'Năm học',
            accessorKey: 'year'
        },
        {
            header: 'Khối',
            accessorKey: 'grade'
        },
        {
            header: 'Số lượng lớp',
            accessorKey: 'classCount'
        },
        {
            header: 'Điểm TB toàn khoá',
            accessorKey: 'avgScore'
        },
        {
            header: 'Học lực',
        },
        {
            header: 'Tỷ lệ lên lớp'
        },
        {
            header: 'Trạng thái'
        }
    ];
    const dataTable = useMemo(() => {
        return []
    }, []);
    const table = useMantineReactTable({
        data: dataTable,
        columns,
        localization: MRT_Localization_VI
    });
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <div className='schoolYearPage'>
            <div className="toolbar flex justify-end mb-[1.4rem] gap-[1.4rem]">
                <Button size='small' onClick={() => showDrawer()}><CiBookmarkPlus /> Tạo học kỳ</Button>
                <Button size='small'><TfiReload /> Tải lại</Button>
            </div>
            <Drawer
                onClose={onClose}
                open={open}
                title="Thông tin học kỳ"
            >
                {open && <FormSchoolYear />}
            </Drawer>
            <MantineReactTable
                table={table}
            />
        </div>
    )
}

export default SchoolYear;