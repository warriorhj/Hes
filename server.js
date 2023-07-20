/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-18 12:15:57
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-20 14:16:20
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

        console.log(req.query)

        const { readItem , meterno} = req.query;

        Seq = Seq > 255 ? 0 : Seq + 1;

        const TYPE = '00';
        const SEQ = Seq.toString(16).padStart(2, '0'); // 固定长度2,前置补0
        const Addr = null; // meterAddr的值

        const DIRECTION = readDirection[readItem].direction;
        const LENGTH = DIRECTION.match(/ /g).length + 1;

        const data = [TYPE, SEQ, Addr, LENGTH, DIRECTION].join(' ');
       
        // 结合meterno找到对应的socket，对其发送数据
        const socket = tcpManager.getConnectedSockets();

        let acceptData = null;

        if(!socket.length){
          // 该客户端没有建立连接，前端进行提示
           return res.json({code:0, data:'no connect'})
        }else{
          // 该客户端已经建立连接，发送数据
          console.log('res',res.req.url)
          socket[0].write(data);
          // const test = res;
          function aa() {
            let test = res;
            console.log('test', test.req.url);
            return function (data) {
              console.log('res1', res);
              // const test = res;
              console.log("接受到数据",data.toString())
              acceptData = data.toString();
              res.status(200).json({code:1, data: data.toString()}).end();}
            }
          }
          socket[0].on("data", (data) => {
            aa()(data)
          })
        }  
    );

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


