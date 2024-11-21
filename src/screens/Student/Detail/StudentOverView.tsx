import React from 'react';
import { Image, Divider } from 'antd';
import { useSearchParams } from 'next/navigation';
import { FaRegIdCard } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import { GiPositionMarker } from "react-icons/gi";
import { FaUserGraduate } from "react-icons/fa";
import { MdPhoneAndroid } from "react-icons/md";
import BoundaryTop5Subject from './Top5Subject';
import NotFound from '@/src/components/NotFound';
import Discipline from './Discipline';

interface Props {
    className?: string;
}
const StudentOverView = (props: Props) => {
    const searchParams = useSearchParams();
    const studentId = searchParams.get('studentId');
    if (!studentId) {
        return <NotFound />;
    }
    return (
        <div className={`${props.className ?? ''} flex flex-col gap-[1.2rem]`}>
            <div className='studentOverView flex gap-[1.2rem]'>
                <Image width={'25rem'} height={'25rem'} src='/teacherfemale.avif' />
                <div className="info">
                    <Divider orientation="left">Học sinh</Divider>
                    <div className='pl-[2.8rem]'>
                        <p className='flex items-center gap-[1rem]'><FaRegIdCard /> <span className='text-[1.6rem]'>19009287323</span></p>
                        <p className='flex items-center gap-[1rem]'><FaUserGraduate /> <span className='text-[1.6rem]'>Trần Đăng Khoa</span></p>
                        <p className='flex items-center gap-[1rem]'><MdDateRange /> <span className='text-[1.6rem]'>21/12/2001</span></p>
                        <p className='flex items-center gap-[1rem]'><GiPositionMarker /> <span className='text-[1.6rem]'>Yên Thịnh, Yên Mô, Ninh Bình</span></p>
                        <p className='flex items-center gap-[1rem]'><MdPhoneAndroid /> <span className='text-[1.6rem]'>0353923603</span></p>
                    </div>
                    <Divider orientation="left">Phụ huynh</Divider>
                    <div className='pl-[2.8rem]'>
                        <p>Bố: Nguyễn Văn A - 09897875632</p>
                        <p>Bố: Nguyễn Văn A - 09897875632</p>
                    </div>
                </div>
            </div>
            <Divider />
            <div className='analyst flex flex-col gap-[2.4rem]'>
                <Discipline />
                <BoundaryTop5Subject className='w-full' studentId={studentId} />
            </div>
        </div>
    )
}

export default StudentOverView;