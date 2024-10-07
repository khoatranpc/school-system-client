'use client';
import React, { useState } from 'react';
import { Tabs, TabsProps } from 'antd';
import SchoolYear from './SchoolYear';
import ListClass from './ListClass';

type Tab = 'SchoolYear' | 'ListClass';
const Class = () => {
    const [tab, setTab] = useState<Tab>('SchoolYear');

    const items: TabsProps['items'] = [
        {
            key: 'SchoolYear',
            label: 'Học kỳ',
        },
        {
            key: 'ListClass',
            label: 'Danh sách',
        },
    ];
    return (
        <div className='classPage'>
            <Tabs items={items} onChange={(tab) => {
                setTab(tab as Tab);
            }} />
            <div className="content">
                {tab === 'SchoolYear' ? <SchoolYear /> : <ListClass />}
            </div>
        </div>
    )
}

export default Class;