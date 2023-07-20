/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-18 12:15:57
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-20 15:37:54
 * @FilePath: \hes\server.js
 */

//引入net模块

require('./tcpServer.js')
const tcpManager = require('./tcp_manage.js')
const express = require("express");
const next = require("next");
const { readDirection } = require('./cont.js');

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
    //自定义api 未解决的bug  
    httpserver.get("/api/readdata", (req, res) => {

        const { readItem , meterno} = req.query;

        Seq = Seq > 255 ? 0 : Seq + 1; // 序列号 0-255循环

        const TYPE = '00';
        const SEQ = Seq.toString(16).padStart(2, '0'); // 固定长度2,前置补0
        const Addr = null; // meterAddr的值

        const DIRECTION = readDirection[readItem].direction;

        const LENGTH = (DIRECTION.match(/ /g).length + 1).toString(16).padStart(2,'0'); //指令的长度转十六进制
        
        const data = [TYPE, SEQ, Addr, LENGTH, DIRECTION].join(' ');
       
        // 结合meterno找到对应的socket，对其发送数据
        const socket = tcpManager.getConnectedSockets();

        let acceptData = null;

        if(!socket.length){
          // 该客户端没有建立连接，前端进行提示
           return res.json({code:0, data:'no connect'})
        }else{
          socket[0].write(data);
          socket[0].on("data", (data) => {
            console.log("接受到数据",data.toString())
            acceptData = data.toString();
            // 十六进制转十进制进行显示

            res.status(200).json({code:1, data: acceptData}).end();
            // 关闭数据监听
            socket[0].removeAllListeners('data');
          })
        }
        }  
    );

    // sendToken api
    httpserver.get("/api/sendToken", (req, res) => {
      // sendToken 报文结构
      console.log(req.query.token);
      const userToken = req.query.token;
      const TYPE = '00';
      Seq = Seq > 255 ? 0 : Seq + 1;
      const SEQ = Seq.toString(16).padStart(2, '0'); // 固定长度2,前置补0
      const Addr = null; // meterAddr的值

      const message1 = "00 01 00 66 00 01";

      const message2 = "C3 01 C1 00 73 00 00 13 28 00 FF 01 01 09";

      const TOKENLENGTH = userToken.match(/ /g).length + 1; // TOKEN的长度 占一个字节

      const MESSAGELENGTH2 = message2.match(/ /g).length + 1 + TOKENLENGTH + 1 ; // message2长度 + token长度 + token长度的长度 占两个字节

      const MESSAGELENGTH1 = message1.match(/ /g).length + 1 + MESSAGELENGTH2 + 2; // message1长度 + message2长度 + message2长度的长度 占1个字节

      const token = [TYPE, SEQ, Addr, MESSAGELENGTH1.toString(16).padStart(2,'0'), message1, MESSAGELENGTH2.toString(16).padStart(4,'0'), message2, TOKENLENGTH.toString(16).padStart(2,'0'), userToken].join(' ');


      const socket = tcpManager.getConnectedSockets();

      if(!socket.length){
        // 该客户端没有建立连接，前端进行提示
         return res.json({code:0, data:'no connect'})
      }else{
        socket[0].write(token);
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


