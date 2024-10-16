import React from 'react';
import { Select, SelectProps } from 'antd';
import { Degree } from '@/src/types/interface';
import { DegreeTranslation } from '@/src/utils';

const { Option } = Select;

const DegreeSelect = (props: SelectProps) => {
    const handleChange = (value: Degree) => {
        console.log("Selected degree: ", value);
    };

    return (
        <Select placeholder="Chọn học vị" onChange={handleChange} {...props}>
            {Object.entries(DegreeTranslation).map(([key, value]) => (
                <Option key={key} value={key}>
                    {value}
                </Option>
            ))}
        </Select>
    );
};

export default DegreeSelect;
