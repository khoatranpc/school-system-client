'use client';
import React from 'react';
import Lazy from '@/src/components/Lazy';

const GradesPage = () => {
    const Grades = Lazy('screens', 'Grades')
    return <Grades />
}

export default GradesPage;