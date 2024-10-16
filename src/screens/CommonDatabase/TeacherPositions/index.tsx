import React, { useEffect, useState } from 'react';
import { Button, Drawer, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PlusOutlined, ReloadOutlined, SettingFilled } from '@ant-design/icons';
import teacherPositions from '@/src/store/reducers/teacherPositions';
import { configHeaderCell } from '@/src/utils';
import FormTeacherPosition from './FormTeacherPosition';
import { queryTeacherPositions } from './config';
import { Obj } from '@/src/types/interface';

const TeacherPositions = () => {
    const [drawer, setDrawer] = useState<boolean>(false);
    const listTeacherPosition = teacherPositions.hook();
    const columns: ColumnsType = [
        {
            title: 'STT',
            render(_, __, index) {
                return index + 1;
            },
            onHeaderCell() {
                return configHeaderCell()
            }
        },
        {
            title: 'Mã',
            dataIndex: 'code',
            onHeaderCell() {
                return configHeaderCell()
            }
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            onHeaderCell() {
                return configHeaderCell()
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isActive',
            render(value) {
                return <Tag color={value ? 'green-inverse' : 'red-inverse'}>{value ? 'Hoạt động' : 'Ngừng'}</Tag>
            },
            onHeaderCell() {
                return configHeaderCell()
            }
        },
        {
            title: 'Mô tả',
            dataIndex: 'des',
            onHeaderCell() {
                return configHeaderCell()
            }
        },
        {
            title: '',
            onHeaderCell() {
                return configHeaderCell()
            },
            render() {
                return <Button><SettingFilled /></Button>
            },
            width: 30
        }
    ];
    const dataSource = (listTeacherPosition.data.data?.teacherPositions?.data as Obj[] ?? []);
    const handleQuery = () => {
        listTeacherPosition.query({
            query: queryTeacherPositions,
            "operationName": "TeacherPositions",
            "path": "teacherPositions",
            "action": "Read"
        });
    }
    useEffect(() => {
        if (!listTeacherPosition.data.data) {
            handleQuery();
        }
    }, []);
    return (
        <div>
            <div className="toolbar flex justify-end mb-[1.2rem] gap-[1.2rem]">
                <Button icon={<PlusOutlined />} onClick={() => setDrawer(true)}>Tạo</Button>
                <Button disabled={listTeacherPosition.data.isLoading} icon={<ReloadOutlined />} onClick={() => {
                    handleQuery();
                }}>Làm mới</Button>
            </div>
            <Drawer
                title="Vị trí công tác"
                open={drawer}
                onClose={() => setDrawer(false)}
            >
                {drawer && <FormTeacherPosition />}
            </Drawer>
            <Table
                loading={listTeacherPosition.data.isLoading}
                pagination={false}
                columns={columns}
                dataSource={dataSource}
            />
        </div>
    )
}

export default TeacherPositions;