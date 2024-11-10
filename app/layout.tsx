'use client';
import React from 'react';
import { ConfigProvider } from 'antd';
import viVN from 'antd/lib/locale/vi_VN'; // Import locale tiếng Việt
import { LoadingOutlined } from '@ant-design/icons';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { store } from '@/src/store/store';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from '@/src/layouts/MainLayout';
import "./globals.scss";

interface Props {
  children: React.ReactNode;
}
const RootLayout = (props: Props) => {

  return <html>
    <head>
      <title>School system</title>
    </head>
    <body cz-shortcut-listen="true">
      <div className='flex flex-col m-auto min-h-screen'>
        <Provider store={store}>
          <ToastContainer />
          <ConfigProvider
            locale={viVN}
            theme={{
              token: {
                colorPrimary: '#4F45E5'
              }
            }}
            componentSize='small'
            spin={{
              indicator: <LoadingOutlined spin />,
            }}
          >
            <MainLayout>
              {props.children}
            </MainLayout>
          </ConfigProvider>
        </Provider>
      </div>
    </body>
  </html>;
}

export default RootLayout;
