/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-18 16:16:26
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-19 10:10:06
 * @FilePath: \Hes\tcpServer.js
 */
const net = require('net');
let clientSocket = [];
const tcpserver = net.createServer(function(socket){
    console.log('Client Conneted');
    clientSocket.push(socket);
    console.log('clientSocket',clientSocket);
    var address=tcpserver.address();
    var message='client,the server address is'+JSON.stringify(address);
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
tcpserver.listen(18001, 'localhost', () => {
    console.log('TCP server started on port 18001 in tcpServer.js');
  });


module.exports = {
    tcpServer: () => {return tcpserver},
    getClientSocket:() => { return clientSocket}
    // getClientSocket:(callback)=>{
    //     if (clientSocket) {
    //         // 如果存在，立即返回socket对象
    //         console.log('clientSocket',clientSocket);
    //         callback(clientSocket)
    //       } else {
    //         // 如果不存在，等待服务器启动后再返回socket对象
    //         tcpserver.on('listening', () => {
    //             console.log('listening in tcpServer.js', clientSocket);
    //             callback(clientSocket);
    //         });
    //       }
    // }
};




