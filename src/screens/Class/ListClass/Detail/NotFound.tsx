import React from 'react';
import { Result } from 'antd';

const NotFoundClass = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Không tìm thấy thông tin lớp học!"
        />
    )
}

export default NotFoundClass