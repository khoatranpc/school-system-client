import React, { useRef } from 'react';
import { ColumnsType } from 'antd/es/table';
import { Image, Tag, Divider, Table, Button } from 'antd';
import { IoSchoolOutline } from "react-icons/io5";
import { PiChalkboardThin } from "react-icons/pi";
import { PlusCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { Obj } from '@/src/types/interface';
import ModalHomeRoomTeacher from './ModalHomeRoomTeacher';
import DrawerPickTeacher from './DrawerPickTeacher';


interface Props {
  classId?: string;
}

const HomeroomTeacher = (props: Props) => {
  const modalHomeRoomTeacherRef = useRef(null);
  const pickTeacher = useRef(null);
  const dataSource: Obj[] = [
    // {
    //   name: 'Trần Đăng Khoa',
    //   schoolYear: '2024-2025',
    //   isActive: true
    // },
    // {
    //   name: 'Trần Đăng Khoa',
    //   schoolYear: '2024-2025',
    //   isActive: true
    // },
    // {
    //   name: 'Trần Đăng Khoa',
    //   schoolYear: '2024-2025',
    //   isActive: true
    // },
    // {
    //   name: 'Trần Đăng Khoa',
    //   schoolYear: '2024-2025',
    //   isActive: true
    // },
    // {
    //   name: 'Trần Đăng Khoa',
    //   schoolYear: '2024-2025',
    //   isActive: true
    // },
  ];
  const columns: ColumnsType = [
    {
      title: 'STT',
      render(_, __, index) {
        return index + 1;
      },
      onHeaderCell() {
        return {
          className: 'bg-[var(--base-soft)!important]'
        }
      },
      width: 80,
      fixed: true
    },
    {
      title: 'Giáo viên',
      dataIndex: 'name',
      onHeaderCell() {
        return {
          className: 'bg-[var(--base-soft)!important]'
        }
      },
      width: 150,
      fixed: true
    },
    {
      title: 'Nhiệm kỳ',
      dataIndex: 'schoolYear',
      onHeaderCell() {
        return {
          className: 'bg-[var(--base-soft)!important]'
        }
      },
      width: 150,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      className: 'text-center',
      render(value) {
        return <Tag color={value ? 'green-inverse' : 'red-inverse'}>{value ? 'Đang làm việc' : 'Ngừng'}</Tag>
      },
      onHeaderCell() {
        return {
          className: 'bg-[var(--base-soft)!important] text-[center!important]'
        }
      },
    },
    {
      title: 'Hành động',
      onHeaderCell() {
        return {
          className: 'bg-[var(--base-soft)!important]'
        }
      },
      render() {
        return <Button size="small">Cập nhật</Button>
      }
    }
  ];
  return (
    <div className='homeroomTeacher'>
      <div className="currentHomeroomTeacher flex gap-[1.8rem]">
        <Image
          className='rounded-lg'
          width={300}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
        <div className=''>
          <p>Chủ nhiệm <span className='text-[1.8rem] font-semibold'>Trần Đăng Khoa</span></p>
          <p>Nhiệm kỳ <span className='text-[1.8rem] font-semibold'>2024-2025</span></p>
          <Tag color='green-inverse'>Đang làm việc</Tag>
          <Divider orientation="left" orientationMargin={0}><span className='text-[1.4rem]'>Trình độ</span></Divider>
          <p className='flex items-center gap-[1.2rem]'><IoSchoolOutline /> Thạc sĩ</p>
          <p className='flex items-center gap-[1.2rem]'><PiChalkboardThin /> Toán</p>
        </div>
      </div>
      <div className="list mt-[1.8rem]">
        <div className='flex justify-end gap-[1.2rem] mb-[1.2rem]'>
          <Button icon={<ReloadOutlined />}>
            Tải lại
          </Button>
          <Button
            icon={<PlusCircleOutlined />}
            onClick={() => {
              // (modalHomeRoomTeacherRef.current as unknown as Obj)?.handleModal?.(true);
              (pickTeacher.current as unknown as Obj)?.handleDrawer?.(true);
            }}
          >
            Thêm
          </Button>
        </div>
        <ModalHomeRoomTeacher
          ref={modalHomeRoomTeacherRef}
        />
        <DrawerPickTeacher
          ref={pickTeacher}
        />
        <Table
          style={{
            width: '100%',
            maxWidth: '100%',
            minWidth: 200
          }}
          size='small'
          columns={columns}
          dataSource={dataSource}
          pagination={false}
        />
      </div>
    </div>
  )
}

export default HomeroomTeacher;