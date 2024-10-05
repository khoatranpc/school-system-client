import React from 'react';
import { useRouter } from 'next/navigation';
import { UserOutlined } from '@ant-design/icons';
import { MdLogout } from "react-icons/md";
import { CiSettings } from 'react-icons/ci';
import { Avatar, Dropdown, MenuProps, Tag } from 'antd';
import { CgProfile } from 'react-icons/cg';
import { Obj } from '@/src/types/interface';
import currentUser from '@/src/store/reducers/currentUser';

const UserDropdown = () => {
    const router = useRouter();
    const crrUser = currentUser.hook();
    const getCurrentUser = crrUser.data.data?.getOneUserInfo as Obj;
    const menuDropdown: MenuProps['items'] = [
        {
            key: 'Profile',
            label: <p className='flex gap-[1rem] items-center'><CgProfile /> Thông tin cá nhân</p>,
        },
        {
            key: 'Setting',
            label: <p className='flex gap-[1rem] items-center'><CiSettings /> Cài đặt</p>
        },
        {
            key: 'Logout',
            label: <p className='flex gap-[1rem] items-center'><MdLogout /> Đăng xuất</p>,
            onClick() {
                router.push('/auth/login');
            }
        }
    ]
    return (
        <div className='userDropdown ml-auto cursor-pointer'>
            <Dropdown className='h-fit' menu={{ items: menuDropdown }} trigger={['click']}>
                <div className='flex items-center gap-2 hover:bg-[var(--base-soft)] px-[1.2rem] py-[0.8rem] rounded-[0.8rem]'>
                    <Avatar shape="square" size="large" icon={<UserOutlined />} />
                    <div className='flex flex-col gap-2'>
                        <span className='font-bold'>{getCurrentUser?.name}</span>
                        <Tag color="#f50" className='font-bold w-fit'>{getCurrentUser?.role}</Tag>
                    </div>
                </div>
            </Dropdown>
        </div>
    )
}

export default UserDropdown;