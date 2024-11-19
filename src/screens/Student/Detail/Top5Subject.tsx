import { Divider, Tooltip } from 'antd';
import React, { memo } from 'react';

interface Props {
    studentId: string;
    className?: string;
}
interface PropsSubject {
    top: 1 | 2 | 3 | 4 | 5;
    score: number;
}
const getColor = {
    1: '#FFD700',
    2: '#C0C0C0',
    3: '#CD7F32',
    4: '#1E90FF',
    5: '#32CD32'
}
const Subject = memo((props: PropsSubject) => {
    const label = `Top ${props.top} - Toán`;
    const calcWidth = props.score / 10 * 100;
    return (
        <div className={'w-full'}>
            <span className='text-[1.6rem]'>{label}</span>
            <Tooltip title={`${props.score}/10 điểm`} color='var(--base)' className='cursor-pointer'>
                <div className='flex items-center h-[1.5rem] rounded-sm bg-[var(--base-soft)]'>
                    <div className={`h-[1rem] rounded-sm`} style={{
                        width: `${calcWidth}%`,
                        backgroundColor: getColor[props.top]
                    }}>
                    </div>
                </div>
            </Tooltip>
        </div>
    )
});
const BoundaryTop5Subject = (props: Props) => {
    return <div className='w-full'>
        <p className='font-bold text-[1.6rem] mb-[1.6rem]'>
            Top 5 bộ môn có thành tích tốt nhất
        </p>
        <div className='flex flex-col gap-[1.4rem]'>
            <Subject top={1} score={9} />
            <Subject top={2} score={8} />
            <Subject top={3} score={8} />
            <Subject top={4} score={7.8} />
            <Subject top={5} score={7} />
        </div>
    </div>;
}
export default BoundaryTop5Subject;