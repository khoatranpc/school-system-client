'use client';
import React from 'react';
interface Props {
    children: React.ReactNode;
}

const AuthLayout = (props: Props) => {
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            {props.children}
        </div>
    )
}

export default AuthLayout;