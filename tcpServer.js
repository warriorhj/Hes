/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-18 16:16:26
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-19 10:07:26
 * @FilePath: \hes\tcpServer.js
 */
const net = require('net');
let clientSocket;
const tcpserver = net.createServer(function(socket){
    console.log('Client Conneted');
    var address=tcpserver.address();
    var message='client,the server address is'+JSON.stringify(address);

    clientSocket = socket;

    //发送数据
    socket.write(message,function(){
        
        var writeSize=socket.bytesWritten;
        
        console.log(message+'has send');
        console.log('the size of message is'+writeSize);
    });

    socket.on("data", function(data){
        console.log("接受到数据",data.toString())
    })


    socket.on("end", function(data){
        console.log("client disconnet");
    })
})

module.exports = {
    tcpserver: () => {return tcpserver},
    getclientSocket: () => {
        console.log("getclientSocket",clientSocket)
        return clientSocket}
};