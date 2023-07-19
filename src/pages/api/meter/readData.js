/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-18 17:37:11
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-19 10:01:30
 * @FilePath: \Hes\src\pages\api\meter\readData.js
 */

import connectDB from '../../../../middleware/mongodb'
import {tcpServer,getClientSocket} from '../../../../tcpServer';
console.log('aa', JSON.stringify(getClientSocket))
const handler = async (req, res) => {

    console.log("readData", req.query, getClientSocket());
    
    // tcpServer().on('connection', (socket) => {
    //     console.log('A new client connected to the TCP server!');
    //     socket.write(req.query,function(){
    //         var writeSize=socket.bytesWritten;
    //         console.log('the size of message is'+writeSize);
    //         });
    //     });

    
    return res.status(201).send({ok:"test"});
}

export default connectDB(handler);