import { Select } from 'antd';
import React, { useEffect } from 'react';
import { queryListSchoolYear } from './config';
import { DefaultOptionType, SelectProps } from 'antd/es/select';
import listSChoolYear from '@/src/store/reducers/listSchoolYear';
import { Obj } from '@/src/types/interface';

interface Props extends SelectProps {
}
const SelectSchoolYear = (props: Props) => {
    const ltSchoolYear = listSChoolYear.hook();
    const getListSchoolYear: DefaultOptionType[] = (ltSchoolYear.data.data?.schoolYears as Obj[] ?? []).filter((item) => {
        return !item.isDeleted
    }).map((item) => {
        return {
            ...item,
            label: item.name,
            value: item._id,
            title: item.name
        }
    });
    useEffect(() => {
        if (!ltSchoolYear.data?.data) {
            ltSchoolYear.query({
                query: queryListSchoolYear,
                operationName: 'SchoolYears',
                action: 'Read',
                path: 'schoolYears',
                payload: {
                    isDeleted: false
                }
            });
        }
    }, []);
    return (
        <div>
            <Select
                placeholder="Chọn học kỳ"
                size="small"
                defaultValue={null}
                loading={ltSchoolYear.data.isLoading}
                options={getListSchoolYear}
                {...props}
            />
        </div>
    )
}

export default SelectSchoolYear;