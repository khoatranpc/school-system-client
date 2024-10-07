import React from 'react';
import { MantineReactTable, MRT_ColumnDef, useMantineReactTable } from 'mantine-react-table';
import { MRT_Localization_VI } from 'mantine-react-table/locales/vi';
import { Obj } from '@/src/types/interface';

const SchoolYear = () => {
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
    const table = useMantineReactTable({
        data: [{

        }],
        columns,
        localization: MRT_Localization_VI
    });
    return (
        <div>
            <MantineReactTable
                table={table}
            />
        </div>
    )
}

export default SchoolYear;