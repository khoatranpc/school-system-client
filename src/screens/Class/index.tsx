'use client';
import React, { useState } from 'react';
import { Tabs, TabsProps } from 'antd';
import SchoolYear from './SchoolYear';
import ListClass from './ListClass';
import Grades from './Grades';

type Tab = 'SchoolYear' | 'ListClass' | 'Grades';
const Class = () => {
    const [tab, setTab] = useState<Tab>('ListClass');

    const items: TabsProps['items'] = [
        {
            key: 'ListClass',
            label: 'Danh sách',
        },
        {
            key: 'SchoolYear',
            label: 'Học kỳ',
        },
        // {
        //     key: 'Grades',
        //     label: 'Khối'
        // }
    ];
    const renderTab: Record<Tab, React.ReactNode> = {
        ListClass: <ListClass />,
        SchoolYear: <SchoolYear />,
        Grades: <Grades />
    }
    return (
        <div className='classPage'>
            <Tabs
                items={items}
                activeKey={tab}
                onChange={(tab) => {
                    setTab(tab as Tab);
                }} />
            <div className="content">
                {renderTab[tab]}
            </div>
        </div>
    )
}

export default Class;