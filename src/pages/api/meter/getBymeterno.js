/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-17 11:05:13
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-19 22:51:55
 * @FilePath: \Hes\src\pages\api\meter\getBymeterno.js
 */
import connectDB from '../../../../middleware/mongodb'
import Meter from '../../../../models/Meter'

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