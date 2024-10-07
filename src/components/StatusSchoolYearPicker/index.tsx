import React from 'react';
import { Select } from 'antd';
import { DefaultOptionType } from 'antd/es/select';

export enum StatusSchoolYear {
    ACTIVE = 'ACTIVE',
    FINISH = 'FINISH'
}

interface Props {
    value?: StatusSchoolYear,
    onChange?: (value?: StatusSchoolYear) => void;
}
const StatusSchoolYearPicker = (props: Props) => {
    const onChange = (value: string) => {
        props.onChange?.(value as StatusSchoolYear);
        console.log(`selected ${value}`);
    };
    const options: DefaultOptionType[] = [
        {
            label: <p className='text-[var(--active)] font-semibold'>Đang hoạt động</p>,
            value: StatusSchoolYear.ACTIVE
        },
        {
            label: <p className='text-[var(--finish)] font-semibold'>Đã kết thúc</p>,
            value: StatusSchoolYear.FINISH
        }
    ];
    return (
        <Select
            size="small"
            showSearch
            placeholder="Chọn trạng thái"
            defaultValue={props.value}
            onChange={onChange}
            options={options}
        />
    )
}

export default StatusSchoolYearPicker;