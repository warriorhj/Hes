/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-18 17:37:11
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-19 13:15:50
 * @FilePath: \hes\src\pages\api\meter\readData.js
 */

import connectDB from '../../../../middleware/mongodb'
// import {tcpserver,getclientSocket} from '../../../../tcpServer';
// const socketManager = require('../../../../tcp_manage.js');

const handler = async (req, res) => {

    console.log("readData", req.query);    

    
    // 获取已连接的socket
    // const connectedSockets = socketManager.getConnectedSockets();

    // console.log('connectedSockets',connectedSockets)
    
    // // 在这里使用已连接的socket进行操作
    // connectedSockets.forEach(socket => {
    // // 处理socket连接
    //     console.log(socket)
    // });
    
    return res.status(201).send({ok:"test"});
}

export default connectDB(handler);