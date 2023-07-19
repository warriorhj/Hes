/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-18 17:37:11
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-19 09:59:57
 * @FilePath: \hes\src\pages\api\meter\readData.js
 */

import connectDB from '../../../../middleware/mongodb'
import {tcpserver,getclientSocket} from '../../../../tcpServer';

const handler = async (req, res) => {

    console.log("readData", req.query);
    getclientSocket()
    
    return res.status(201).send({ok:"test"});
}

export default connectDB(handler);