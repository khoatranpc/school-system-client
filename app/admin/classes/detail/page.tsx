'use client';
import React from 'react';
import Lazy from '@/src/components/Lazy';
// import ClassDetail from '@/src/screens/Class/ListClass/Detail'

const DetailClass = () => {
    const Detail = Lazy('screens', 'Class/ListClass/Detail');
    return (
        <Detail />
    )
}

export default DetailClass;