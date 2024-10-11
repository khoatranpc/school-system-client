import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

const NotAvailable = () => {
    return (
        <Text className='text-neutral-300 italic'>N/A</Text>
    )
}

export default NotAvailable;