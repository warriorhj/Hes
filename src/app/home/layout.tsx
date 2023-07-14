/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-14 13:34:07
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-14 20:58:59
 * @FilePath: \Hes\src\app\home\layout.tsx
 */
'use client'
import React, { useState, useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  CloudUploadOutlined,
  SlidersOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Table, Tag, Space } from 'antd';
import * as dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import type {ColumnsType} from 'antd/es/table';
import type { MenuProps } from 'antd';
import  './page.css'
const { Header, Sider, Content } = Layout;

const items: MenuProps['items'] = [
  {
    key: 'management',
    icon: <CloudUploadOutlined />,
    label: 'archives management',
    children: [{
      key: 'meterInfo',
      label: 'meterInfo',
      icon: <SlidersOutlined />
    },{
      key: 'dcuInfo',
      label: 'dcuInfo',
      icon: <SlidersOutlined />
    }]
  }
]


export default function ContentLayout({
    children
}:{
    children: React.ReactNode
}){

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const router = useRouter();

    const handleClick = (e: any) => {
      router.push(`/home/${e.key}`)
      // console.log(e, router)
    }

    

    return (
        <Layout style={{minHeight:'100vh'}}>
        <Sider trigger={null} collapsible collapsed={collapsed} width={300}>
          <div className="demo-logo-vertical">京仪北方HES</div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={items}
            onClick={handleClick}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {children}
          </Content>
        </Layout>
        </Layout>
    )
}