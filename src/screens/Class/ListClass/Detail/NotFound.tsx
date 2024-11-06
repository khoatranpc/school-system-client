import React from 'react';
import { Button, Result, Tooltip } from 'antd';
import { BsArrowReturnLeft } from "react-icons/bs";
import { ReloadOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { KeyTab, Role } from '@/src/types/interface';
import { getLinkByRoute } from '@/src/utils/router';

interface Props {
    handleReload?: () => void;
}

const NotFoundClass = (props: Props) => {
    const router = useRouter();
    const MOCK_ROLE = Role.ADMIN;
    return (
        <Result
            status="404"
            title="404"
            subTitle={<div>
                <p>Không tìm thấy thông tin lớp học!</p>
                <div className='flex gap-[1.2rem] items-center justify-center'>
                    <Tooltip title="Quay trở lại danh sách lớp học" color='var(--base)'>
                        <Button
                            icon={<BsArrowReturnLeft />}
                            onClick={() => {
                                router.replace(getLinkByRoute[MOCK_ROLE][KeyTab.CLASSES]);
                            }}
                        >
                            Trở lại
                        </Button>
                    </Tooltip>
                    <Tooltip title="Tải lại dữ liệu" color='var(--base)'>
                        <Button icon={<ReloadOutlined />} onClick={() => {
                            props.handleReload?.();
                        }}>Tải lại</Button>
                    </Tooltip>
                </div>
            </div >}
        />
    )
}

export default NotFoundClass