import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { MantineReactTable, MRT_ColumnDef, useMantineReactTable } from 'mantine-react-table';
import { TfiReload } from 'react-icons/tfi';
import { LuPackagePlus } from "react-icons/lu";
import { Obj } from '@/src/types/interface';
import FormGrade from './FormGrade';

const Grades = () => {
    const [drawer, setDrawer] = useState<boolean>(false);
    const columns: MRT_ColumnDef<Obj>[] = [
        {
            header: 'Khối'
        },
        {
            header: 'Năm học'
        },
        {
            header: 'Số lớp'
        },
        {
            header: 'Số học sinh'
        },
        {
            header: 'Trạng thái'
        }
    ]
    const table = useMantineReactTable({
        data: [],
        columns: columns
    });
    return (
        <div>
            <div className="toolbar flex justify-end mb-[1.4rem] gap-[1.4rem]">
                <Button size='small' onClick={() => setDrawer(true)}><LuPackagePlus /> Tạo khối</Button>
                <Button size='small'><TfiReload /> Tải lại</Button>
            </div>
            <Drawer
                title="Khối lớp"
                open={drawer}
                onClose={() => {
                    setDrawer(false);
                }}
            >
                {drawer && <FormGrade />}
            </Drawer>
            <MantineReactTable table={table} />
        </div>
    )
}

export default Grades;