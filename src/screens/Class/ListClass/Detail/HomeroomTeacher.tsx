import React, { useEffect, useRef } from 'react';
import { ColumnsType } from 'antd/es/table';
import { Image, Tag, Divider, Table, Button } from 'antd';
import { IoSchoolOutline } from "react-icons/io5";
import { PiChalkboardThin } from "react-icons/pi";
import { LoadingOutlined, PlusCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { Degree, Gender, Obj } from '@/src/types/interface';
import ModalHomeRoomTeacher from './ModalHomeRoomTeacher';
import DrawerPickTeacher from './DrawerPickTeacher';
import { queryHomeRoomTeachers } from '@/src/utils/operationGraphQl';
import detailClass from '@/src/store/reducers/detailClass';
import homeroomTeachers from '@/src/store/reducers/homeroomTeachers';
import NotAvailable from '@/src/components/NotAvailable';
import { DegreeTranslation } from '@/src/utils';


interface Props {
  classId?: string;
}

const HomeroomTeacher = (props: Props) => {
  const modalHomeRoomTeacherRef = useRef(null);
  const pickTeacher = useRef(null);
  const listHomeroomTeacher = homeroomTeachers.hook();
  const detail = detailClass.hook();
  const getDetailClass = detail.data.data?.detailClass as Obj ?? {};
  const dataSource: Obj[] = listHomeroomTeacher.data.data?.homeroomTeachers?.data as Obj[] ?? [];
  const currentHomeRoomTeacher = dataSource.find((data: Obj) => data.isActive && !data.isDeleted) as Obj;
  const teachersDegrees = currentHomeRoomTeacher?.teacherId?.degrees as Obj[] ?? [];
  const getLatestDegree = teachersDegrees[teachersDegrees.length - 1];
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
      render(_, record) {
        return <strong>{record?.teacherId?.userId?.name as string}</strong>
      },
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
      dataIndex: 'schoolYearId',
      render(value) {
        return value?.name as string
      },
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
      render(_, record) {
        return <Button
          size="small"
          onClick={() => {
            (modalHomeRoomTeacherRef.current as unknown as Obj)?.handleModal?.(true, record);
          }}
        >
          Cập nhật
        </Button>
      }
    }
  ];
  const handleQueryListHomeRoomTeacher = () => {
    listHomeroomTeacher.query({
      "operationName": "HomeRoomTeacher",
      "path": "homeroomTeachers",
      "action": "All",
      "payload": {
        "filter": {
          "classId": getDetailClass?._id,
          "schoolYearId": getDetailClass?.schoolYearId?._id
        }
      },
      query: queryHomeRoomTeachers
    });
  };
  useEffect(() => {
    handleQueryListHomeRoomTeacher();
  }, []);
  return (
    <div className='homeroomTeacher relative'>
      {
        listHomeroomTeacher.data.isLoading && <div className='absolute z-50 w-full h-full flex items-center justify-center bg-[#ffffffc4]'>
          <LoadingOutlined />
        </div>
      }
      <div className="currentHomeroomTeacher flex gap-[1.8rem]">
        <Image
          className='rounded-lg'
          width={300}
          src={currentHomeRoomTeacher ? (
            currentHomeRoomTeacher?.teacherId?.userId?.gender === Gender.Male ? '/teachermale.avif' : '/teacherfemale.avif'
          ) : "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"}
        />
        <div className=''>
          <p>Chủ nhiệm <span className='text-[1.8rem] font-semibold'>{currentHomeRoomTeacher ? currentHomeRoomTeacher?.teacherId?.userId?.name : <NotAvailable />}</span></p>
          <p>Nhiệm kỳ <span className='text-[1.8rem] font-semibold'>{currentHomeRoomTeacher ? currentHomeRoomTeacher?.schoolYearId?.name : <NotAvailable />}</span></p>
          <Tag color='green-inverse'>Đang làm việc</Tag>
          <Divider orientation="left" orientationMargin={0}><span className='text-[1.4rem]'>Trình độ</span></Divider>
          <p className='flex items-center gap-[1.2rem]'><IoSchoolOutline /> {currentHomeRoomTeacher ? (DegreeTranslation[getLatestDegree?.type as Degree] ?? <NotAvailable />) : <NotAvailable />}</p>
          <p className='flex items-center gap-[1.2rem]'><PiChalkboardThin /> {currentHomeRoomTeacher ? (getLatestDegree?.major ?? <NotAvailable />) : <NotAvailable />}</p>
        </div>
      </div>
      <ModalHomeRoomTeacher ref={modalHomeRoomTeacherRef} />
      <div className="list mt-[1.8rem]">
        <div className='flex justify-end gap-[1.2rem] mb-[1.2rem]'>
          <Button icon={<ReloadOutlined />} onClick={() => handleQueryListHomeRoomTeacher()}>
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