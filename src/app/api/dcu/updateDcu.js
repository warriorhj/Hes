import connectDB from '../../../../middleware/mongodb'
import Dcu from '../../../../models/Dcu'
import * as dayjs from 'dayjs';

const handler = async (req, res) => {
    let DcuInfo = JSON.parse(req.body);
    console.log("update", req.body, DcuInfo.id);
    const result = await Dcu.updateOne({ _id: DcuInfo.id}, DcuInfo)
    // console.log(result)
    return res.status(201).send(result);
}

export default connectDB(handler);