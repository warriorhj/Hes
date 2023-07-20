/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-19 23:58:45
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-20 10:02:33
 * @FilePath: \hes\src\app\login\page.tsx
 */
'use client'
import {
    LockOutlined,
    UserOutlined,
  } from '@ant-design/icons';
  import {
    LoginFormPage,
    ProFormCheckbox,
    ProFormText,
  } from '@ant-design/pro-components';
  import { Tabs } from 'antd';
  import type { CSSProperties } from 'react';
  import { useState } from 'react';
  import { useRouter } from 'next/navigation';
  
  type LoginType = 'phone' | 'account';
  
  const iconStyles: CSSProperties = {
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '18px',
    verticalAlign: 'middle',
    cursor: 'pointer',
  };

  const Login = () => {
    const [loginType, setLoginType] = useState<LoginType>('account');
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const router = useRouter();

    const handleLoginEvent = async (values: any) => {
      console.log(values);
      console.log(userName);
      // 判断用户名和密码是否正确
      if (userName === 'admin' && password === 'ant.design') {
        // 登录成功 跳转到home页面
        router.push('/home/meterInfo');
      }
    };

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
          onFinish={handleLoginEvent}
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
                  onChange: (e) => { setUserName(e.target.value) },
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
                  onChange: (e) => { setPassword(e.target.value) },
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