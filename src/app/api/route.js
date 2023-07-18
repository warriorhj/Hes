/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-18 11:32:08
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-18 11:34:50
 * @FilePath: \hes\src\app\api\route.js
 */
import { NextResponse } from 'next/server'
 
export async function GET() {
  return NextResponse.json({ ok:"test" })
}
  