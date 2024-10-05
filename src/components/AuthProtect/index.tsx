'use client';
import React, { useEffect, useState } from 'react';
import Loading from '../Loading';
import { useRouter } from 'next/navigation';
import currentUser from '@/src/store/reducers/currentUser';
import { query } from './query';

interface Props {
    children: React.ReactNode;
}
const AuthProtect = (props: Props) => {
    const [checking, setChecking] = useState<boolean>(true);
    const router = useRouter();
    const crrUser = currentUser.hook();
    useEffect(() => {
        const crrToken = localStorage.getItem('accessToken');
        if (!crrToken) {
            router.push('/auth/login');
        } else {
            crrUser.query({
                query: query,
                action: 'Read',
                operationName: 'GetOneUserInfo',
                path: 'getOneUserInfo',
                payload: {}
            });
        }
    }, []);
    useEffect(() => {
        if (crrUser.data.data) {
            if (crrUser.data.successful) {
                setChecking(false);
            }
        }
        if (crrUser.data.errors) {
            localStorage.removeItem('accessToken');
            router.push('/auth/login');
        }
    }, [crrUser.data]);
    if (checking) return <Loading />;
    return (
        props.children
    )
}

export default AuthProtect;