/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-17 23:09:35
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-17 23:11:06
 * @FilePath: \Hes\models\Dcu.js
 */
import mongoose, {Schema, model, models} from 'mongoose';

let Dcu = new Schema({
    dcuno: {
        type: String,
        require: true,
        unique: true
    },
    orgcode: String,
    protocol: String,
    builddata: {
        type: Date,
    },
})
mongoose.models = {}
const DcuT = model('Dcu', Dcu);

export default DcuT;