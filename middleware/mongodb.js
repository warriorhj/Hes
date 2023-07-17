/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-16 18:27:24
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-16 22:34:09
 * @FilePath: \Hes\middleware\mongodb.js
 */
// 数据库连接层
import mongoose from 'mongoose';

const connectDB = handler => async (req, res) => {
    // console.log('mongoose', mongoose);
    if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req, res);
  }
  // Use new db connection
  await mongoose.connect(process.env.mongodburl, {
    // useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
    // useNewUrlParser: true
  });
  return handler(req, res);
};

export default connectDB;