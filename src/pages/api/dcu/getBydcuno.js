/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-17 23:15:06
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-17 23:15:15
 * @FilePath: \Hes\src\pages\api\dcu\getBydcuno.js
 */
import connectDB from '../../../../middleware/mongodb'
import Dcu from '../../../../models/Dcu'
import * as dayjs from 'dayjs';

const handler = async (req, res) => {
    // console.log(typeof req.query, req.query)
    const query = req.query.dcuno ? req.query : null;
    const dcuget = await Dcu.find(query)
    res.status(200).send({res:dcuget})
}

export default connectDB(handler);