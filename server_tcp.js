/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-18 12:15:57
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-19 14:35:25
 * @FilePath: \hes\server_tcp.js
 */

//引入net模块

require('./tcpServer.js')
const tcpManager = require('./tcp_manage.js')
const express = require("express");
const next = require("next");

const httpserver = express();
const port = parseInt(process.env.PORT, 10) || 8083;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, });
const handle = app.getRequestHandler();
httpserver.set("x-powered-by", dev);

// tcpserver().on('connection', (socket) => {
//   console.log('A new client connected to the TCP server1111!',tcpManager);
  
// });
 

// console.log('getclientSocket',getclientSocket())

app
  .prepare()
  .then(() => {
    //自定义api
    httpserver.get("/api/readdata", (req, res) => {
        console.log('readdata',req.query)

        // 处理未连接的情况就发起读数据的请求

        const socket = tcpManager.getConnectedSockets();

        socket[0].write("test send data");
        socket[0].on('data',(h)=>{
           res.json({code:1, data:h.toString()})
           return
        })
        
    });

    httpserver.get("/api_test", (req, res) => {
      res.json({ code: 1, data: "ok" });
    });

    
    // 自定义渲染内容
    httpserver.get("/t/:id", (req, res) => {
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


