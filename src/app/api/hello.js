/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-17 09:12:39
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-18 10:46:17
 * @FilePath: \hes\src\pages\api\hello.js
 */


export default function handler(
  req,
  res
) {
  const data = { header: req.headers, url: req.url, text: "返回内容" };
  res.status(200).json(data);
}
