

/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-18 12:15:57
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-18 15:44:20
 * @FilePath: \hes\server_tcp.ts
 */

//引入net模块
const tcpServer = require('./tcpServer')
const next = require("next");
const express = require('express');

const httpserver = express();
const port = process.env.PORT || 8083;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, });
const handle = app.getRequestHandler();
httpserver.set("x-powered-by", dev);

app
  .prepare()
  .then(() => {

    //自定义api
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

    try {
        httpserver.listen(port, "0.0.0.0", () => {
        console.log(`> Ready on http://localhost:${port}`);
      });
    } catch (error) {
      console.error(error);
    }
  })
  .catch((err) => console.log(err));


