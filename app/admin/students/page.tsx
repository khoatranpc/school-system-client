'use client';
import React from 'react';
import Lazy from '@/src/components/Lazy';

const Students = () => {
    const ListStudent = Lazy('screens', 'Student/ListStudent');
    return <ListStudent />;
}

export default Students;