/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-16 19:01:20
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-16 22:42:55
 * @FilePath: \Hes\models\testmongo.js
 */

import mongoose, {Schema, model, models} from 'mongoose';

let testSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    }
})

// models = {}
mongoose.models = {}
const Test = model('Test1', testSchema);

export default Test;