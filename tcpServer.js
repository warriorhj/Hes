/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-18 16:16:26
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-19 22:54:00
 * @FilePath: \Hes\tcpServer.js
 */
const net = require('net');
const tcpManager = require('./tcp_manage')

const tcpserver = net.createServer(function(socket){
    console.log('Client Conneted');
    var address=tcpserver.address();
    var message='client,the server address is'+JSON.stringify(address);


    tcpManager.addSocket(socket)

    socket.write(message,function(){
        
        var writeSize=socket.bytesWritten;
        
        console.log(message+'has send');
        console.log('the size of message is'+writeSize);
    });

    socket.on("data", function(data){
        
        // 当客户端建立连接后，客户端会发送连接成功指令，其中包含了meterInfo和dcuInfo的信息
        // 最好此时通过meterInfo和dcuInfo的信息，将socket和meterInfo和dcuInfo进行绑定

        console.log("接受到数据",data.toString())
    })


    socket.on("end", function(data){
        console.log("client disconnet");
    })
})

tcpserver.listen(18001,()=>{
    console.log("tcp server listening at port 18001")
})
