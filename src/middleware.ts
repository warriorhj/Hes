/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-20 10:32:16
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-20 10:32:20
 * @FilePath: \hes\middleware.ts
 */
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 拦截初始路由，重定向到指定路由

export function middleware(req: NextRequest) {
    const nextUrl = req.nextUrl
    if (nextUrl.pathname === '/') {
        return NextResponse.rewrite(new URL('/login', req.url))
    }
  }