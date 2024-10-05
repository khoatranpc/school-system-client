'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import AuthLayout from './AuthLayout';
import CommonLayout from './CommonLayout';
import AuthProtect from '../components/AuthProtect';

interface Props {
    children: React.ReactNode
}
const MainLayout = (props: Props) => {
    const path = usePathname();

    return (
        path.startsWith('/auth') ? <AuthLayout>
            {props.children}
        </AuthLayout> : <AuthProtect>
            <CommonLayout>
                {props.children}
            </CommonLayout >
        </AuthProtect>

    )
};

export default MainLayout;