import React, { useState } from 'react';
import { Tabs as TabsComponent } from 'antd';
import type { TabsProps } from 'antd';
import StudentInfo from './StudentInfo';
import Classes from './Classes';
import ScoreTable from './ScoreTable';

export enum TabStudentInfo {
    Classes = 'Classes',
    TableScore = 'TableScore',
    PersonalInformation = 'PersonalInformation',
}

const getLabelTabStudentInfo: Record<TabStudentInfo, string> = {
    Classes: 'Lớp học',
    PersonalInformation: 'Thông tin cá nhân',
    TableScore: 'Bảng điểm'
};

const getItemsTab: TabsProps['items'] = Object.keys(getLabelTabStudentInfo).map((key) => {
    return {
        key: key,
        label: getLabelTabStudentInfo[key as TabStudentInfo]
    }
})


interface Props {
    className?: string;
}
const Tabs = (props: Props) => {
    const [tab, setTab] = useState<TabStudentInfo>(TabStudentInfo.Classes);
    const getTab: Record<TabStudentInfo, React.ReactNode> = {
        Classes: <Classes />,
        PersonalInformation: <StudentInfo />,
        TableScore: <ScoreTable />
    };
    return (
        <div className={`tabStudentInfo ${props.className}`}>
            <TabsComponent
                activeKey={tab}
                items={getItemsTab}
                onChange={(key) => {
                    setTab(key as TabStudentInfo);
                }}
            />
            <div className='contentTab w-full'>
                {getTab[tab]}
            </div>
        </div>
    )
}

export default Tabs;