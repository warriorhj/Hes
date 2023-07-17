/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-17 23:17:13
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-17 23:18:39
 * @FilePath: \Hes\src\pages\api\dcu\insertDcu.js
 */
import connectDB from '../../../../middleware/mongodb'
import Dcu from '../../../../models/Dcu'
import * as dayjs from 'dayjs';

const handler = async (req, res) => {
    console.log(req.body)
    const insertData = Object.assign({},JSON.parse(req.body),{ builddata:dayjs()})
    console.log('insertData', insertData);
    const dcu = new Dcu(insertData);
    const createDcu = await dcu.save();
    return res.status(200).send(createDcu)
}

export default connectDB(handler);