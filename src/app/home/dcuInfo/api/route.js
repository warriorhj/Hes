/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-18 11:35:52
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-18 11:35:52
 * @FilePath: \hes\src\app\home\dcuInfo\api\route.js
 */
import { NextResponse } from 'next/server'
 
export async function GET() {
  return NextResponse.json({ ok:"dcuInfo" })
}