'use client';
import React from 'react';
import Lazy from '@/src/components/Lazy';

const DetailClass = () => {
    const Detail = Lazy('screens', 'Class/ListClass/Detail');
    return (
        <Detail />
    )
}

export default DetailClass;