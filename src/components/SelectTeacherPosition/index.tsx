import React, { useEffect } from 'react';
import { BaseOptionType } from 'antd/es/select';
import { TreeSelect, TreeSelectProps } from 'antd';
import teacherPositions from '@/src/store/reducers/teacherPositions';
import { queryTeacherPositions } from '@/src/screens/CommonDatabase/TeacherPositions/config';
import { Obj } from '@/src/types/interface';

interface Props extends TreeSelectProps { }
const SelectTeacherPosition = (props: Props) => {
    const listTeacherPosition = teacherPositions.hook();
    const treeData: BaseOptionType[] = (listTeacherPosition.data.data?.teacherPositions?.data as Obj[] ?? []).map((item) => {
        return {
            value: item._id,
            title: `${item.code} - ${item.name}`
        }
    });
    useEffect(() => {
        if (!listTeacherPosition.data.data) {
            listTeacherPosition.query({
                query: queryTeacherPositions,
                "operationName": "TeacherPositions",
                "path": "teacherPositions",
                "action": "Read"
            });
        }
    }, []);
    return (
        <div>
            <TreeSelect
                placeholder="Chọn các vị trí công tác"
                loading={listTeacherPosition.data.isLoading}
                treeData={treeData}
                treeCheckable={true}
                {...props}
            />
        </div>
    )
}

export default SelectTeacherPosition;