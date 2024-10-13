import React from 'react';
import { IoPersonAdd } from "react-icons/io5";
import { Button, Image, Input, Table, Tag, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { configHeaderCell } from '@/src/utils';

const Teacher = () => {
    const columns: ColumnsType = [
        {
            title: 'Mã',
            render() {
                return <div>
                    9076738312
                </div>
            },
            onHeaderCell() {
                return configHeaderCell();
            }
        },
        {
            title: 'Giáo viên',
            render() {
                return <div className='flex gap-[1.2rem]'>
                    <Image
                        className='rounded-lg'
                        width={50}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                    <div>
                        <span className='font-semibold'>Trần Thị Trịnh</span>
                        <p><i className='text-[1.2rem]'>abc@gmail.com</i></p>
                        <p><i className='text-[1.2rem]'>098765421</i></p>
                    </div>
                </div>
            },
            onHeaderCell() {
                return configHeaderCell();
            }
        },
        {
            title: 'Trình độ',
            render() {
                return <div>
                    <p>Bậc: Thạc sĩ</p>
                    <p>Chuyên ngành: Toán</p>
                </div>
            },
            onHeaderCell() {
                return configHeaderCell();
            }
        },
        {
            title: 'Bộ môn',
            render() {
                return <div>
                    <p>Toán</p>
                </div>
            },
            onHeaderCell() {
                return configHeaderCell();
            }
        },
        {
            title: 'TT Công tác',
            render() {
                return <div>
                    <p>Giáo viên bộ môn</p>
                </div>
            },
            onHeaderCell() {
                return configHeaderCell();
            }
        },
        {
            title: 'Địa chỉ',
            render() {
                return <div>
                    ABC, Tỉnh XYZ, Làng PDFK
                </div>
            },
            onHeaderCell() {
                return configHeaderCell();
            }
        },
        {
            title: 'Trạng thái',
            render(_, __, idx) {
                return <div>
                    <Tag color={idx % 2 === 0 ? 'green-inverse' : 'red-inverse'}>{idx % 2 === 0 ? 'Đang công tác' : 'Đã nghỉ'}</Tag>
                </div>
            },
            onHeaderCell() {
                return configHeaderCell();
            }
        },
        {
            title: 'Hành động',
            render() {
                return <div>
                    <Button size="small" icon={<EyeOutlined />}>Chi tiết</Button>
                </div>
            },
            onHeaderCell() {
                return configHeaderCell();
            }
        }
    ];
    const dataSource = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    return (
        <div>
            <div className="toolbar flex justify-end gap-[1.2rem] mb-[1.2rem]">
                <Input placeholder='Tìm kiếm thông tin' className='w-fit' prefix={<SearchOutlined />} />
                <Tooltip title="Tạo mới một thông tin giáo viên" color='#4F45E5'><Button icon={<IoPersonAdd />}>Tạo mới</Button></Tooltip>
            </div>
            <Table
                size="small"
                columns={columns}
                dataSource={dataSource}
                pagination={{

                }}
            />
        </div>
    )
}

export default Teacher;