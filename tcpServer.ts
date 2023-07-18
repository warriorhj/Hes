/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-18 14:48:47
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-18 16:11:46
 * @FilePath: \hes\tcpServer.ts
 */
import net from 'net';

const tcpserver = net.createServer(function(socket: any){
    console.log('Client Conneted');
    var address=tcpserver.address();
    var message='client,the server address is'+JSON.stringify(address);
    //发送数据
    socket.write(message,function(){
        
        var writeSize=socket.bytesWritten;
        
        console.log(message+'has send');
        console.log('the size of message is'+writeSize);
    });

    socket.on("data", function(data: any){
        console.log("接受到数据",data.toString())
    })

    socket.on("end", function(data: any){
        console.log("client disconnet");
    })
})
// tcpserver.listen(18001);
// tcpserver.on('listening', function () {
//     //获取地址信息
//     let address = tcpserver.address();
//     //获取地址详细信息
//     console.log("服务器监听的端口是：" + address.port);
//     console.log("服务器监听的地址是：" + address.address);
//     console.log("服务器监听的地址类型是：" + address.family);
// });

export default tcpserver;