/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-18 12:15:57
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-24 15:35:37
 * @FilePath: \hes\server.js
 */

//引入net模块

require('./tcpServer.js')
const tcpManager = require('./tcp_manage.js')
const express = require("express");
const next = require("next");
const { readDirection, Addr } = require('./cont.js');

const httpserver = express();
const port = parseInt(process.env.PORT, 10) || 8083;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, });
const handle = app.getRequestHandler();
httpserver.set("x-powered-by", dev);

let Seq = 0;

app
  .prepare()
  .then(() => {
    // 读取数据  
    httpserver.get("/api/readdata", (req, res) => {

        // console.log(req.query);

        const { readItem , meterno} = req.query;

        Seq = Seq > 255 ? 0 : Seq + 1; // 序列号 0-255循环

        const TYPE = '00';
        const SEQ = Seq.toString(16).padStart(2, '0'); // 固定长度2,前置补0
        // const Addr = "22 40 00 00 00 19"; // meterAddr的值
        console.log('发送数据',readItem)
        const DIRECTION = readDirection[readItem].direction;
        console.log('发送数据',readItem ,DIRECTION)

        const LENGTH2 = (DIRECTION.match(/ /g).length + 1).toString(16).padStart(4,'0'); //指令的长度转十六进制

        const LENGTH2_1 = LENGTH2.slice(0,2) + ' ' + LENGTH2.slice(2,4);

        const MESSAGE1 = "00 01 00 66 00 01";

        const LENGTH1 = (DIRECTION.match(/ /g).length + 1 + 8).toString(16).padStart(2,'0'); // message1长度 + message2长度 + message2长度的长度 占1个字节

        const data = [TYPE, SEQ, Addr, LENGTH1, MESSAGE1, LENGTH2_1, DIRECTION].join(' ');
       
        // 结合meterno找到对应的socket，对其发送数据
        const socket = tcpManager.getConnectedSockets();

        console.log("发送数据",data)

        // 字符串转十六进制数组
        const hesData = data.split(' ').map(item => parseInt(item, 16));
        const sendData = new Uint8Array(hesData);

        if(!socket.length){
          // 该客户端没有建立连接，前端进行提示
           return res.json({code:0, data:'no connect'})
        }else{
          socket[0].write(sendData);
          socket[0].on("data", (data) => {

            // 十六进制数组转字符串
            const hexString = Array.from(data, byte => byte.toString(16).padStart(2, '0'));
            const hexvalue = hexString.slice(9,).join('');
            // 十六进制字符串转十进制进行显示
            const value = parseInt(hexvalue, 16) / readDirection[readItem].divValue;
            // 确定小数位数
            const fixnumValue = value.toFixed(Math.log10(readDirection[readItem].divValue));

            console.log("接受到数据",hexString, "转换后数据", value)
            // console.log("接受到数据",data.toString())
            // acceptData = data.toString();
            // 十六进制转十进制进行显示

            res.status(200).json({code:1, data: fixnumValue + readDirection[readItem].unit}).end();
            // 关闭数据监听
            socket[0].removeAllListeners('data');
          })
        }
        }  
    );

    // sendToken api
    httpserver.get("/api/sendToken", (req, res) => {
      // sendToken 报文结构
      // console.log(req.query.token);
      const userToken = req.query.token;
      const TYPE = '00';
      Seq = Seq > 255 ? 0 : Seq + 1;
      const SEQ = Seq.toString(16).padStart(2, '0'); // 固定长度2,前置补0
      const Addr = "22 40 00 00 00 19"; // meterAddr的值

      const message1 = "00 01 00 66 00 01";

      const message2 = "C3 01 C1 00 73 00 00 13 28 00 FF 01 01 09";

      const TOKENLENGTH = userToken.match(/ /g).length + 1; // TOKEN的长度 占一个字节 

      const MESSAGELENGTH2 = (message2.match(/ /g).length + 1 + TOKENLENGTH + 1).toString(16).padStart(4,'0') ; // message2长度 + token长度 + token长度的长度 占两个字节

      const MESSAGELENGTH1 = message1.match(/ /g).length + 1 + message2.match(/ /g).length + 1 + TOKENLENGTH + 1 + 2; // message1长度 + message2长度 + message2长度的长度 占1个字节

      const MESSAGELENGTH2_1 = MESSAGELENGTH2.slice(0,2) + ' ' + MESSAGELENGTH2.slice(2,4);

      // const token = [TYPE, SEQ, Addr, MESSAGELENGTH1.toString(16).padStart(2,'0'), message1, MESSAGELENGTH2.toString(16).padStart(4,'0'), message2, TOKENLENGTH.toString(16).padStart(2,'0'), userToken].join(' ');
      const token = [TYPE, SEQ, Addr, MESSAGELENGTH1.toString(16).padStart(2,'0'), message1, MESSAGELENGTH2_1, message2, TOKENLENGTH.toString(16).padStart(2,'0'), userToken].join(' ');


      const socket = tcpManager.getConnectedSockets();

       // 字符串转十六进制数组
       const hesData = token.split(' ').map(item => parseInt(item, 16));
       const sendData = new Uint8Array(hesData);

      if(!socket.length){
        // 该客户端没有建立连接，前端进行提示
         return res.json({code:0, data:'no connect'})
      }else{
        console.log("发送数据",token)
        socket[0].write(sendData);
        socket[0].on("data", (data) => {

          // 十六进制数组转字符串
          const hexString = Array.from(data, byte => byte.toString(16).padStart(2, '0'));
          const hexvalue = hexString.slice(9,).join('');
          
          console.log("接受到数据",hexvalue)
            // console.log("接受到数据",data.toString())
            // acceptData = data.toString();
            // 十六进制转十进制进行显示

          res.status(200).json({code:1, data: hexvalue === '00' ? true : false}).end();
            // 关闭数据监听
          socket[0].removeAllListeners('data');

        })
      }
      })  

    httpserver.get("/api/action", (req, res) => {

        const { readItem , meterno} = req.query;

        Seq = Seq > 255 ? 0 : Seq + 1; // 序列号 0-255循环
        const TYPE = '00';
        const SEQ = Seq.toString(16).padStart(2, '0'); // 固定长度2,前置补0
        // const Addr = "22 40 00 00 00 19"; // meterAddr的值

        const DIRECTION = readDirection[readItem].direction;
        console.log('发送数据',readItem ,DIRECTION)

        const LENGTH2 = (DIRECTION.match(/ /g).length + 1).toString(16).padStart(4,'0'); //指令的长度转十六进制

        const LENGTH2_1 = LENGTH2.slice(0,2) + ' ' + LENGTH2.slice(2,4);

        const MESSAGE1 = "00 01 00 66 00 01";

        const LENGTH1 = (DIRECTION.match(/ /g).length + 1 + 8).toString(16).padStart(2,'0'); // message1长度 + message2长度 + message2长度的长度 占1个字节

        const data = [TYPE, SEQ, Addr, LENGTH1, MESSAGE1, LENGTH2_1, DIRECTION].join(' ');

        // 字符串转十六进制数组
        const hesData = data.split(' ').map(item => parseInt(item, 16));
        const sendData = new Uint8Array(hesData);
       
        // 结合meterno找到对应的socket，对其发送数据
        const socket = tcpManager.getConnectedSockets();
        if(!socket.length){
          // 该客户端没有建立连接，前端进行提示
           return res.json({code:0, data:'no connect'})
        }else{
          socket[0].write(sendData);
          socket[0].on("data", (data) => {

            // 十六进制数组转字符串
            const hexString = Array.from(data, byte => byte.toString(16).padStart(2, '0'));
            const hexvalue = hexString.slice(9,).join('');
          
            console.log("接受到数据",hexvalue)
            // console.log("接受到数据",data.toString())
            // acceptData = data.toString();
            // 十六进制转十进制进行显示

            res.status(200).json({code:1, data: hexvalue === '00' ? true : false}).end();
            // 关闭数据监听
            socket[0].removeAllListeners('data');
          })
        }

    })


    httpserver.get("/api_test", (req, res) => {
      res.json({ code: 1, data: "ok" });
    });

    
    // 自定义渲染内容
    httpserver.get("/t/:id", (req, res) => {
      console.log(req.params.id);
      return handle(req, res);
    });
    // 拦截所有内容
    httpserver.get("*", (req, res) => {
      return handle(req, res);
    });
    
    httpserver.put("*", (req, res) => {

      return handle(req, res);
    });

    httpserver.post("*", (req, res) => {
      return handle(req, res);
    });

    httpserver.delete("*", (req, res) => {
      return handle(req, res);
    });

    try {
        httpserver.listen(port, "0.0.0.0", () => {
        console.log(`> Ready on http://localhost:${port}`);
      });
    } catch (error) {
      console.error(error);
    }
    
  })
  .catch((err) => console.log(err));


