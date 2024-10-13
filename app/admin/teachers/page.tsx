'use client';
import React from 'react';
import Lazy from '@/src/components/Lazy';

const TeacherPage = () => {
    const ListTeacher = Lazy('screens', 'Teacher');
    return (
        <ListTeacher />
    )
}

export default TeacherPage;