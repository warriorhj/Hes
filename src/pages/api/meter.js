/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-17 10:03:15
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-17 11:03:21
 * @FilePath: \hes\src\pages\api\meter.js
 */
import connectDB from '../../../middleware/mongodb'
import Meter from '../../../models/Meter'
import * as dayjs from 'dayjs';

const handler = async (req, res) => {

    console.log(req.query)
    return res.status(200).send({"ok":"1"})
    // if (req.method = "POST") {
    //     const {meterno, metertype, metermode} = req.body;
    //     console.log('meter', meterno)
    //     const data = dayjs();
    //     const meter = new Meter({meterno, metertype, metermode, builddata:data});
    //     const metercreated = await meter.save();
    //     return res.status(200).send(metercreated)
    // }
    // else if(req.method = "GET") {
    //     console.log(req)
    //     return res.status(200)
    // }
}

export default connectDB(handler);