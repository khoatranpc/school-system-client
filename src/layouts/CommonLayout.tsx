'use client';
import React, { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Image from 'next/image';
import { KeyTab, Role, Router } from '../types/interface';
import routers, { getLinkByRoute } from '../utils/router';
import UserDropdown from '../components/UserDropdown';
import TimeCounter from '../components/Timer';
import Typewriter from 'typewriter-effect';
const { Header, Content, Sider } = Layout;

interface Props {
    children: React.ReactNode;
}

const filterIsHiddenRouter = (routers: Router[]) => {
    return routers.filter(item => !item.isHidden).map((item) => {
        const newItem = { ...item };
        if (item.children) {
            newItem.children = filterIsHiddenRouter(item.children);
        }
        return newItem;
    })
}
const CommonLayout = (props: Props) => {
    const router = useRouter();
    const path = usePathname();
    const [tabActive, setTabActive] = useState<string[]>([]);
    const [breadcrumb, setBreadcrumb] = useState<ItemType[]>([]);
    const MOCK_ROLE = Role.ADMIN;
    const navs: MenuProps['items'] = filterIsHiddenRouter(routers[MOCK_ROLE]);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    function findKeyPath(items: Router[], targetKey: KeyTab, path: ItemType[]): any {
        for (const item of items) {
            const currentPath: ItemType[] = [...path, {
                title: item.label,
                path: item.link,
                key: item.key,
                onClick() {
                    if (item.link) {
                        router.push(item.link);
                    }
                }
            }];

            if (item.key === targetKey) {
                return currentPath;
            }

            if (item.children) {
                const result = findKeyPath(item.children, targetKey, currentPath);
                if (result) return result;
            }
        }
        return null;
    }
    useEffect(() => {
        const currentKeyTab = Object.keys(getLinkByRoute[MOCK_ROLE]).find((item: string) => {
            return getLinkByRoute[MOCK_ROLE][item] === path;
        });
        if (currentKeyTab) {
            const path = findKeyPath(routers[MOCK_ROLE], currentKeyTab as KeyTab, []);
            setBreadcrumb(path);
            setTabActive([currentKeyTab]);
        }
    }, []);

    return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center' }} className='bg-white gap-[1.4rem] leading-normal'>
                <Image src={'/schoolLogo.jpg'} alt='' width={50} height={40} />
                <h1 className='text-[var(--base)] text-[2.4rem] font-bold'>School System</h1>
                <TimeCounter />
                <div className='text-[var(--base)]'>
                    <Typewriter
                        options={{
                            strings: ['Hệ thống tạo bởi', 'Trần Đăng Khoa', 'khoatranpc603@gmail.com'],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </div>
                <UserDropdown />
            </Header>
            <Layout>
                <Sider width={200}>
                    <Menu
                        mode="inline"
                        selectedKeys={tabActive}
                        style={{ height: '100%', borderRight: 0 }}
                        items={navs}
                        onClick={(info) => {
                            setTabActive(info.keyPath);
                            const path = findKeyPath(routers[MOCK_ROLE], info.key as KeyTab, []);
                            setBreadcrumb(path);
                            router.replace(getLinkByRoute[MOCK_ROLE][info.key]);
                        }}
                    />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb
                        items={breadcrumb}
                        style={{ margin: '16px 0' }}
                    />
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {props.children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default CommonLayout;