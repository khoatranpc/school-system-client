import React, { memo, useEffect, useRef, useState } from 'react';
import { Image, Input, Rate, Tag, Pagination, Button, Popconfirm, Empty } from 'antd';
import { IoSchoolOutline } from 'react-icons/io5';
import { PiChalkboardThin } from 'react-icons/pi';
import teachers from '@/src/store/reducers/teachers';
import { Degree, Obj } from '@/src/types/interface';
import { queryTeachers } from '../FormCreateInfo/config';
import { DegreeTranslation, uuid } from '@/src/utils';
import detailClass from '@/src/store/reducers/detailClass';
import Loading from '../Loading';
import { useDebounce } from '@/src/utils/customHooks';
import saveHomeRoomTeacher from '@/src/store/reducers/savehomeroomteacher';
import { querySaveHomeroomTeacher } from '@/src/utils/operationGraphQl';
import { toast } from 'react-toastify';


interface Props {
}
const componentId = 'PickTeacher';
interface ItemTeacherProps {
    teacher?: Obj;
}
const ItemTeacher = memo((props: ItemTeacherProps) => {
    const detail = detailClass.hook();
    const getDetailClass = detail.data.data?.detailClass as Obj ?? {};
    const getUserInfo = props.teacher?.userId as Obj;
    const getDegree = props.teacher?.degrees as Obj[] ?? [];
    const savedHomeRoomTeacher = saveHomeRoomTeacher.hook();
    const componentId = useRef(uuid());
    const handleSavedHomeRoomTeacher = () => {
        const payload = {
            teacherId: props.teacher?._id as string,
            schoolYearId: getDetailClass?.schoolYearId?._id as string,
            classId: getDetailClass?._id as string,
            isActive: true,
            isDeleted: false
        };
        savedHomeRoomTeacher.query({
            action: 'All',
            operationName: 'SaveHomeRoomTeacher',
            path: 'savehomeroomteacher',
            query: querySaveHomeroomTeacher,
            payload: payload,
            componentId: componentId.current
        });
    }
    useEffect(() => {
        if ((savedHomeRoomTeacher.data.errors || savedHomeRoomTeacher.data.successful) && savedHomeRoomTeacher.data.componentId === componentId.current) {
            const message = savedHomeRoomTeacher.data.successful ? 'Lưu thông tin thành công' : 'Lưu thông tin thất bại!';
            toast(message, {
                type: savedHomeRoomTeacher.data.successful ? 'success' : 'error'
            });
            savedHomeRoomTeacher.clear?.();
        }
    }, [savedHomeRoomTeacher.data]);
    const random = Math.round(Math.random() * 10 + 6);
    return <div className='w-1/4 p-[0.8rem] flex gap-[0.8rem] rounded-lg border border-[var(--base-soft)] mr-auto'>
        <div className="img">
            <Image className='max-w-[10rem] max-h-[15rem] rounded-lg' src={`${random % 2 ? '/teacherfemale.avif' : '/teachermale.avif'}`} preview={false} />
        </div>
        <div className="infomation flex flex-col">
            <p><b>{getUserInfo?.name}</b></p>
            <p className='flex items-center gap-[1.2rem]'><IoSchoolOutline /> {DegreeTranslation[getDegree[getDegree.length - 1]?.type as Degree]}</p>
            <p className='flex items-center gap-[1.2rem]'><PiChalkboardThin /> {getDegree[getDegree.length - 1]?.major as string}</p>
            <Rate />
            <div className='w-fit mt-auto'>
                <Tag color='green-inverse'>
                    <strong>Trống</strong>
                </Tag>
                <Popconfirm
                    title={`Phân công chủ nhiệm`}
                    description={<p>Bổ nhiệm <strong>{getUserInfo?.name}</strong> làm chủ nhiệm lớp: <strong>{getDetailClass?.name}</strong> năm <strong>{getDetailClass?.schoolYearId?.name}</strong>?</p>}
                    onConfirm={() => {
                        handleSavedHomeRoomTeacher();
                    }}
                >
                    <Button loading={savedHomeRoomTeacher.data.isLoading && savedHomeRoomTeacher.data.componentId === componentId.current}>Bổ nhiệm</Button>
                </Popconfirm>
            </div>
        </div>
    </div>;
});

const initPagination = {
    limit: 20,
    page: 1
};
const PickTeacher = (props: Props) => {

    const listTeacher = teachers.hook();
    const getListTeacher = listTeacher.data.data?.teachers?.data as Obj[] ?? [];
    const [pagination, setPagination] = useState(initPagination);
    const [searchValue, setSearchValue] = useState('');
    const debouncedSearchValue = useDebounce(searchValue, 1500);
    const handleQueryListTeacher = (isRefresh?: boolean) => {
        listTeacher.query({
            action: 'Read',
            operationName: 'Teachers',
            path: 'teachers',
            componentId,
            query: queryTeachers,
            payload: {
                filter: {
                    isActive: true,
                    searchValue: debouncedSearchValue
                },
                pagination: isRefresh ? initPagination : pagination
            }
        });
    }
    useEffect(() => {
        handleQueryListTeacher(false);
    }, [pagination, debouncedSearchValue]);
    return (
        <div className={`pickTeacher max-h-full relative ${!listTeacher.data.isLoading ? 'overflow-scroll' : ''}`}>
            <div className='filter flex justify-end gap-[1.2rem] sticky top-0 z-20 bg-[white] shadow-lg shadow-[var(--base-soft)]'>
                <Input.Search loading={listTeacher.data.isLoading} value={searchValue} onChange={e => setSearchValue(e.target.value)} className='max-w-[30%]' placeholder="Nhập tên, email hoặc số điện thoại!" />
            </div>
            <div>
                <div className='p-[1.2rem] relative listTeacher flex gap-[1.2rem] flex-wrap justify-evenly'>
                    {listTeacher.data.isLoading
                        &&
                        <div className='absolute z-10 w-full h-full flex justify-center items-center bg-[#fbfbfbdd]'>
                            <Loading />
                        </div>}
                    {
                        getListTeacher.length ?
                            getListTeacher.map((teacher) => {
                                return <ItemTeacher key={teacher._id as string} teacher={teacher} />
                            })
                            : <Empty />
                    }
                </div>
                <div
                    className='sticky bottom-0 z-20 float-right bg-[white]'
                >
                    <Pagination
                        showSizeChanger
                        pageSize={pagination.limit}
                        current={pagination.page}
                        onChange={(page, pageSize) => {
                            setPagination({
                                page,
                                limit: pageSize
                            });
                        }}
                        total={listTeacher.data.data?.teachers?.count as number ?? 0}
                    />
                </div>
            </div>
        </div>
    )
}

export default PickTeacher;