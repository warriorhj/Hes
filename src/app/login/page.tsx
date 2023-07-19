/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-19 23:58:45
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-20 00:22:21
 * @FilePath: \Hes\src\app\login\page.tsx
 */
'use client'
import {
    AlipayOutlined,
    LockOutlined,
    MobileOutlined,
    TaobaoOutlined,
    UserOutlined,
    WeiboOutlined,
  } from '@ant-design/icons';
  import {
    LoginFormPage,
    ProFormCaptcha,
    ProFormCheckbox,
    ProFormText,
  } from '@ant-design/pro-components';
  import { Button, Divider, message, Space, Tabs } from 'antd';
  import type { CSSProperties } from 'react';
  import { useState } from 'react';
  
  type LoginType = 'phone' | 'account';
  
  const iconStyles: CSSProperties = {
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '18px',
    verticalAlign: 'middle',
    cursor: 'pointer',
  };

  const Login = () => {
    const [loginType, setLoginType] = useState<LoginType>('account');
    return (
      <div
        style={{
          backgroundColor: 'white',
          height: 'calc(100vh - 48px)',
          margin: -24,
        }}
      >
        <LoginFormPage
          backgroundImageUrl="https://p2.itc.cn/images01/20220429/ce3a7a5297264015a015fb090d489efe.png"
          logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
          title="京仪北方HES管理系统"
          actions={
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
            </div>
          }
        >
          <Tabs
            centered
            activeKey={loginType}
            onChange={(activeKey) => setLoginType(activeKey as LoginType)}
          >
            <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
          </Tabs>
          {loginType === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'} />,
                }}
                placeholder={'用户名: admin or user'}
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                placeholder={'密码: ant.design'}
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码
            </a>
          </div>
        </LoginFormPage>
      </div>
    );
  };
  
  export default Login; 