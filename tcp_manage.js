/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-19 11:10:22
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-19 13:36:32
 * @FilePath: \hes\tcp_manage.js
 */

const connectedSockets = [];

// 添加已连接的socket
function addSocket(socket) {
    connectedSockets.push(socket);
}

// 获取已连接的socket
function getConnectedSockets() {
    return connectedSockets;
}

// 导出函数或变量
module.exports = {
  addSocket,
  getConnectedSockets,
};