/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-14 13:34:07
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-14 13:38:47
 * @FilePath: \hes\src\app\home\layout.tsx
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
import type {ColumnsType} from 'antd/es/table';
import  './page.css'
const { Header, Sider, Content } = Layout;

export default function ContentLayout({
    children
}:{
    children: React.ReactNode
}){

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical">京仪北方HES</div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
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
            ]}
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