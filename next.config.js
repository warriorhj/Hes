/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-17 09:12:39
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-18 16:49:50
 * @FilePath: \hes\next.config.js
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        mongodburl: 'mongodb://127.0.0.1:27017/Hes'
    },
    experimental:{
        appDir: true
    },
}

module.exports = nextConfig
