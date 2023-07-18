/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-17 11:05:13
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-18 17:47:29
 * @FilePath: \hes\src\pages\api\meter\getBymeterno.js
 */
import connectDB from '../../../../middleware/mongodb'
import Meter from '../../../../models/Meter'
import * as dayjs from 'dayjs';
import tcpserver from '../../../../tcpServer';

const handler = async (req, res) => {
    // console.log(typeof req.query, req.query)
    const query = req.query.meterno ? req.query : null;
    const meterget = await Meter.find(query)
    res.status(200).send({res:meterget})
    // console.log(tcpserver);
    // tcpserver.listen(18002, 'localhost', () => {
    //     console.log('TCP server started on port 3000 on api');
    //   });
    
}

export default connectDB(handler);