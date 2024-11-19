import React from 'react';
import { useSearchParams } from 'next/navigation';
import NotFound from '@/src/components/NotFound';
import StudentOverView from './StudentOverView';
import Tabs from './Tabs';

const StudentDetail = () => {
    const searchParams = useSearchParams();
    const getStudentId = searchParams.get('studentId');
    if (!getStudentId) return <NotFound />;
    return (
        <div className='flex gap-[1.2rem]'>
            <StudentOverView className='w-[40%]' />
            <Tabs className="flex-1" />
        </div>
    )
}

export default StudentDetail;