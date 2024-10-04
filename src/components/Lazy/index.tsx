'use client';
import React from 'react';
import dynamic, { DynamicOptions } from 'next/dynamic';
import { Obj } from '@/src/types/interface';
import Loading from '../Loading';


const Lazy = (root: 'components' | 'layouts' | 'screens', path: string, props?: Obj, options?: DynamicOptions) => {
    const Component = dynamic(() => {
        switch (root) {
            case 'components':
                return import(`@/src/components/${path}`);
            case 'layouts':
                return import(`@/src/layouts/${path}`);
            case 'screens':
                return import(`@/src/screens/${path}`);
            default:
                return import(`@/src/${path}`)
        }
    }, {
        ssr: false,
        loading: () => <Loading />,
        ...options,
    });
    return () => <Component {...props} />;
}

export default Lazy;