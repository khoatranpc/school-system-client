import React, { useMemo } from 'react';
import { Button, Radio, Select, Table } from "antd";
import { ReloadOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { configHeaderCell } from '@/src/utils';

const ScoreTable = () => {
    const columns: ColumnsType = useMemo(() => {
        return [
            {
                key: 'STT',
                title: 'TT',
                render(_, __, index) {
                    return index + 1
                },
                onHeaderCell() {
                    return configHeaderCell();
                }
            },
            {
                key: 'Subject',
                title: 'Môn học',
                onHeaderCell() {
                    return configHeaderCell();
                }
            },
            {
                key: 'Ratio',
                title: 'Tỉ lệ',
                onHeaderCell() {
                    return configHeaderCell();
                }
            },
            {
                key: 'Teacher',
                title: 'Giáo viên',
                onHeaderCell() {
                    return configHeaderCell();
                }
            },
            {
                key: 'AVG',
                title: 'Điểm trung bình',
                onHeaderCell() {
                    return configHeaderCell();
                }
            },
            {
                key: 'Result',
                title: 'Kết quả',
                onHeaderCell() {
                    return configHeaderCell();
                }
            }
        ];
    }, []);
    return (
        <div className='scoreTable flex flex-col gap-[1.2rem]'>
            <div className='flex gap-[1.2rem]'>
                <Select
                    options={[
                        {
                            value: '1',
                            label: 'Lớp 10A | 2023-2024'
                        }
                    ]}
                    placeholder="Chọn lớp"
                />
                <Radio.Group
                    optionType='button'
                >
                    <Radio value={1}>Học kỳ 1</Radio>
                    <Radio value={2}>Học kỳ 2</Radio>
                </Radio.Group>
                <Button icon={<ReloadOutlined />}>Tải lại</Button>
            </div>
            <div>
                <p>Trạng thái: Đang học</p>
                <p>Tổng kết: 7.8</p>
                <p>Học lực: Khá</p>
            </div>
            <Table
                columns={columns}
            />
        </div>
    )
}

export default ScoreTable;