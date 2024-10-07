'use client';
import React from 'react';
import Lazy from '@/src/components/Lazy';

const ClassesPage = () => {
    const Class = Lazy('screens', 'Class');
    return <Class />
}

export default ClassesPage;