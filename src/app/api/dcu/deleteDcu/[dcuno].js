/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-17 23:24:10
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-18 00:27:43
 * @FilePath: \Hes\src\pages\api\dcu\deleteDcu\[dcuno].js
 */
import connectDB from '../../../../../middleware/mongodb'
import Dcu from '../../../../../models/Dcu'
import * as dayjs from 'dayjs';

const handler = async (req, res) => {
    // console.log(req.params, req.query)
    // const Dcuget = await Dcu.find(req.query)
    // const result = await Dcu.deleteOne(req.query)
    // const test = [{Dcuno:"warrior2"},{Dcuno:"warriortest"}]
    // const result = await Dcu.deleteMany({Dcuno:{$in: ['warrior2', 'warriortest']}})
    // console.log(typeof req.query,typeof Object.values(req.query)[0]);
    const query =  Object.values(req.query)[0];
    // console.log(query.split(','));
    // const deleteList = Object.values(req.query);
    // console.log(typeof query,typeof deleteList, query, deleteList)
    const deleteList = JSON.parse(query);
    // console.log(typeof test);
    console.log('delete', typeof query, query);
    // console.log('deleteList',deleteList);
    const result = await Dcu.deleteMany({dcuno:{$in: deleteList}})
    // console.log(result)
    return res.status(200).send(result)
}

export default connectDB(handler);