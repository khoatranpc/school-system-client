'use client';
import React from 'react';
import Lazy from '@/src/components/Lazy';

interface Props {
    children: React.ReactNode;
}
const AuthLayout = (props: Props) => {
    const Layout = Lazy('layouts', 'AuthLayout', props);
    return <Layout />;
}

export default AuthLayout;