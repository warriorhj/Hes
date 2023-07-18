/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-17 11:16:30
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-17 15:24:42
 * @FilePath: \hes\src\pages\api\meter\insertMeter.js
 */
import connectDB from '../../../../middleware/mongodb'
import Meter from '../../../../models/Meter'
import * as dayjs from 'dayjs';

const handler = async (req, res) => {
    console.log(req.body)
    const insertData = Object.assign({},JSON.parse(req.body),{ builddata:dayjs()})
    console.log('insertData', insertData);
    const meter = new Meter(insertData);
    const createmeter = await meter.save();
    return res.status(200).send(createmeter)
}

export default connectDB(handler);