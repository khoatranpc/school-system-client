'use client';
import React from 'react';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import Lazy from '@/src/components/Lazy';
import { store } from '@/src/store/store';
import "./globals.scss";

interface Props {
  children: React.ReactNode;
}
const RootLayout = (props: Props) => {

  const MainLayout = Lazy('layouts', 'MainLayout', props);

  return <html>
    <head>
      <title>School system</title>
    </head>
    <body>
      <div className='flex flex-col m-auto min-h-screen'>
        <Provider store={store}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#4F45E5'
              }
            }}
          >
            <MainLayout />
          </ConfigProvider>
        </Provider>
      </div>
    </body>
  </html>;
}

export default RootLayout;
