import React, { memo } from 'react';
import { Tag } from 'antd';
import { FaChevronCircleRight } from 'react-icons/fa';
import { TypeStudentInClassTranslations } from '@/src/utils';


interface Props {
    className?: string;
    studentClassId?: string;
}

const ContentViewMoreInfoClass = memo((props: Props) => {
    return (
        <div className={`${props.className ?? ''} border-l-[var(--base)] border-l-[1px] pl-[1.2rem]`}>
            {props.studentClassId ?
                <div className='flex flex-col gap-[1.2rem]'>
                    <p className='status'>Học sinh: <Tag color='green-inverse'>{TypeStudentInClassTranslations['Promoted']}</Tag></p>
                    <p className='status'>Trạng thái: <Tag color='green-inverse'>Đang học</Tag></p>
                </div>
                : <p className='flex items-center justify-center gap-[5px]'><span>Chọn biểu tượng</span> <FaChevronCircleRight className='text-[var(--base)]' /><span>tương ứng để xem thông tin</span></p>}
        </div>
    )
});

export default ContentViewMoreInfoClass;