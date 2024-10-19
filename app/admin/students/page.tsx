'use client';
import React from 'react';
import Lazy from '@/src/components/Lazy';

const Students = () => {
    const Component = Lazy('screens', 'Student/ListStudent');
    return <Component />;
}

export default Students;