/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-18 17:37:11
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-18 17:38:14
 * @FilePath: \hes\src\pages\api\meter\readData.js
 */

import connectDB from '../../../../middleware/mongodb'
import tcpserver from '../../../../tcpServer';

const handler = async (req, res) => {

    console.log("readData", req.query);
    
    tcpserver.on('connection')
    return res.status(201).send({ok:"test"});
}

export default connectDB(handler);