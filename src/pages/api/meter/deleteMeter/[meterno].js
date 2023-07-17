/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-17 13:22:38
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-17 13:27:08
 * @FilePath: \hes\src\pages\api\meter\deleteMeter\[meterno].js
 */
import connectDB from '../../../../../middleware/mongodb'
import Meter from '../../../../../models/Meter'
import * as dayjs from 'dayjs';

const handler = async (req, res) => {
    // console.log(req.params, req.query)
    // const meterget = await Meter.find(req.query)
    // const result = await Meter.deleteOne(req.query)
    // const test = [{meterno:"warrior2"},{meterno:"warriortest"}]
    // const result = await Meter.deleteMany({meterno:{$in: ['warrior2', 'warriortest']}})
    console.log(typeof req.query,Object.values(req.query))
    const deleteList = Object.values(req.query);
    const result = await Meter.deleteMany({meterno:{$in: deleteList}})
    console.log(result)
    return res.status(200).send(result)
}

export default connectDB(handler);