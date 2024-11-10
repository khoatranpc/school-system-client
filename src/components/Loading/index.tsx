'use client';
import React from 'react';
import { Flex, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface Props {
    className?: string;
}
const Loading = (props: Props) => {
    return (
        <Flex align="center" gap="middle" className={`flex-1 self-center flex justify-center items-center ${props.className}`}>
            <Spin indicator={<LoadingOutlined spin />} size="default" />
        </Flex>
    )
}

export default Loading;