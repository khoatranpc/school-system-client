import React from 'react';
import { Button, Timeline, Tooltip } from 'antd';
import { FaChevronCircleRight } from "react-icons/fa";
import { MdOutlineDone } from "react-icons/md";
import { MdOutlinePending } from "react-icons/md";
import ContentViewMoreInfoClass from './ContentViewMoreInfoClass';

interface ChildProps {

}
const Child = (props: ChildProps) => {
    return <div className='childClass flex gap-[1.2rem] items-center'>
        <div className='title'>
            <p className='font-bold'>Lớp 10A | 2023 - 2024 </p>
            <p>Hạnh kiểm: Khá</p>
            <p>Học tập: Khá</p>
            <p>Điểm TB: 7.8</p>
        </div>
        <div className="action">
            <Tooltip
                title="Xem chi tiết thông tin"
                color='var(--base)'
            >
                <Button>
                    <FaChevronCircleRight className='text-[var(--base)]' />
                </Button>
            </Tooltip>
        </div>
    </div>
}
const Classes = () => {
    return (
        <div className='classesOfStudent flex gap-[1rem]'>
            <Timeline
                items={[
                    {
                        dot: <MdOutlineDone className='text-[var(--base)]' />,
                        children: <Child />,
                    },
                    {
                        dot: <MdOutlineDone className='text-[var(--base)]' />,
                        children: <Child />,
                    },
                    {
                        dot: <MdOutlineDone className='text-[var(--base)]' />,
                        children: <Child />,
                    },
                    {
                        dot: <MdOutlinePending className='text-[var(--base)]' />,
                        children: <Child />,
                    },
                ]}
            />
            <ContentViewMoreInfoClass
                className='flex-1'
                studentClassId='1'
            />
        </div>
    )
}

export default Classes;