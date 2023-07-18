/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-17 15:35:00
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-17 16:43:27
 * @FilePath: \hes\src\pages\api\meter\updateMeter.js
 */
import connectDB from '../../../../middleware/mongodb'
import Meter from '../../../../models/Meter'
import * as dayjs from 'dayjs';

const handler = async (req, res) => {
    let meterInfo = JSON.parse(req.body);
    console.log("update", req.body, meterInfo.id);
    const result = await Meter.updateOne({ _id: meterInfo.id}, meterInfo)
    // console.log(result)
    return res.status(201).send(result);
}

export default connectDB(handler);