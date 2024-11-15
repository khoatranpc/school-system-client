import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Col, Row } from 'antd';
import NotFoundClass from './NotFound';
import HomeroomTeacher from './HomeroomTeacher';
import Students from './Students';
import Loading from '@/src/components/Loading';
import detailClass from '@/src/store/reducers/detailClass';
import { queryDetailClass } from './config';
import { Obj } from '@/src/types/interface';

const DetailClass = () => {
    const searchParams = useSearchParams();
    const [loadCurrentClass, setLoadCurrentClass] = useState(true);
    const classId = searchParams.get('classId');
    const detail = detailClass.hook();
    const getDetailClass = detail.data.data?.detailClass as Obj ?? {};

    const handleQuery = () => {
        detail.query({
            query: queryDetailClass,
            action: 'Read',
            operationName: 'DetailClass',
            path: 'detailClass',
            payload: {
                classId
            }
        });
    }
    useEffect(() => {
        if (classId && (!detail.data.data?.detailClass || (detail.data.data?.detailClass?._id !== classId))) {
            handleQuery();
        }
    }, []);
    useEffect(() => {
        if (detail.data.successful || detail.data.errors) {
            setLoadCurrentClass(false);
        }
    }, [detail.data]);
    return (
        loadCurrentClass || detail.data.isLoading ? <Loading /> :
            (!classId || detail.data.errors ? <NotFoundClass handleReload={handleQuery} /> :
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
                            <p className='text-[2.4rem] font-semibold mb-[1.8rem] text-center'>
                                <p className='flex gap-[1.2rem] justify-center text-[var(--base)]'>
                                    <span>---<span>꧁</span></span>
                                    {getDetailClass?.name}
                                    <span>
                                        <span className='inline-block scale-x-[-1]'>
                                            ꧁</span>---</span>
                                </p>
                                <span>{getDetailClass?.schoolYearId?.name}</span>
                            </p>
                            <Students />
                        </Col>
                    </Row>
                </div>
            )
    )
}

export default DetailClass;