import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Col, Row } from 'antd';
import NotFoundClass from './NotFound';
import HomeroomTeacher from './HomeroomTeacher';
import Students from './Students';

const DetailClass = () => {
    const searchParams = useSearchParams();
    const classId = searchParams.get('classId');
    if (!classId) {
        return <NotFoundClass />
    }
    return (
        <div className='detailClass'>
            <Row gutter={[48, 16]}>
                <Col
                    span={8}
                    className='border-r-[1px] border-r-[var(--base)]'
                >
                    <HomeroomTeacher />
                </Col>
                <Col
                    span={16}
                >
                    <p className='text-[2.4rem] font-semibold mb-[1.8rem]'>Lớp: 10A</p>
                    <Students />
                </Col>
            </Row>
        </div>
    )
}

export default DetailClass;