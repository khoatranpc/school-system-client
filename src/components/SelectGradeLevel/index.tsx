import { Select } from 'antd';
import React, { useEffect } from 'react';
import { DefaultOptionType, SelectProps } from 'antd/es/select';
import { Obj } from '@/src/types/interface';
import gradeLevels from '@/src/store/reducers/gradeLevels';
import { queryGradeLevels } from './config';

interface Props extends SelectProps {
  defaultValue?: string;
  onChange?: (value: string) => void;
}
const SelectGradeLevel = (props: Props) => {
  const ltGradeLevels = gradeLevels.hook();
  const options: DefaultOptionType[] = (ltGradeLevels.data.data?.gradeLevels as Obj[] ?? []).map((item) => {
    return {
      label: `Khối ${item.level}`,
      value: item._id
    }
  })
  useEffect(() => {
    if (!ltGradeLevels.data.data) {
      ltGradeLevels.query({
        query: queryGradeLevels,
        action: 'Read',
        operationName: 'GradeLevels',
        path: 'gradeLevels',
      });
    }
  }, []);
  return (
    <div>
      <Select
        {...props}
        placeholder="Chọn khối lớp"
        defaultValue={props.defaultValue}
        options={options}
        size='small'
        onChange={(value) => {
          props.onChange?.(value);
        }}
      />
    </div>
  )
}

export default SelectGradeLevel;