import React from 'react';
import { Button, Image, Input, Table, Tooltip } from 'antd';
import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { configHeaderCell } from '@/src/utils';

const List = () => {
    const columns: ColumnsType = [
        {
            title: 'STT',
            render(_, __, index) {
                return index + 1
            },
            onHeaderCell() {
                return configHeaderCell();
            },
            width: 50
        },
        {
            title: 'Mã HS',
            render() {
                return <div>
                    56839232
                </div>
            },
            onHeaderCell() {
                return configHeaderCell();
            },
        },
        {
            title: 'Học sinh',
            render(_, record) {
                return <div className='flex gap-[1.2rem]'>
                    <div>
                        <Image
                            className='rounded-lg'
                            width={50}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />
                    </div>
                    <div>
                        <p className='font-semibold '>Nguyễn Văn Cường</p>
                        <p className='text-[1.2rem] italic'>cuongnv@gmail.com</p>
                        <p className='text-[1.2rem] italic'>0123456789</p>
                    </div>
                </div>
            },
            onHeaderCell() {
                return configHeaderCell();
            }
        },
        {
            title: 'Liên hệ',
            render(_, record) {
                return <div>
                    <p>Đ/C: Yên Thịnh, Yên Mô, Ninh Bình</p>
                    <p>Bố: 123456789</p>
                    <p>Mẹ: 123456789</p>
                </div>
            },
            onHeaderCell() {
                return configHeaderCell();
            }
        },
        {
            title: 'Học tập',
            render(_, record) {
                return <div className='flex gap-[1.2rem]'>
                    <div>
                        <p>Điểm TB: 7.6</p>
                        <p>Hạnh kiểm: Tốt</p>
                    </div>
                    <Tooltip title="Xem bảng điểm"><Button size="small" icon={<EyeOutlined />}></Button></Tooltip>
                </div>
            },
            onHeaderCell() {
                return configHeaderCell();
            }
        },
        {
            title: 'Trạng thái',
            onHeaderCell() {
                return configHeaderCell();
            },
            render(_, record) {
                return <div>
                    <span>Đã chuyển lớp</span>
                </div>
            }
        },
        {
            title: 'Hành động',
            onHeaderCell() {
                return configHeaderCell();
            },
            render(_, record) {
                return <div>
                    <Button size='small' icon={<EyeOutlined />}>Chi tiết</Button>
                </div>
            }
        }
    ];
    return (
        <div className='listStudentInClass mt-[1.8rem] flex flex-col gap-[1rem]'>
            <div className="toolbar flex justify-end gap-[1.8rem]">
                <Input className='w-fit' size="small" prefix={<SearchOutlined />} placeholder='Nhập thông tin tìm kiếm' />
                <Button size='small'>Thêm học sinh</Button>
            </div>
            <Table
                size='small'
                columns={columns}
                dataSource={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]}
                pagination={false}
                scroll={{ x: 'max-content', y: '55vh' }}
            />
        </div>
    )
}

export default List;