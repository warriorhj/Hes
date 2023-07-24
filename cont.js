/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-19 15:39:12
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-24 14:50:12
 * @FilePath: \hes\cont.js
 */
const readDirection = {
    "Instantaneous voltage L1": {
        "direction": "C0 01 C1 00 03 01 00 20 07 00 FF 02 00",
        "divValue" : 10,
        "fixnum": 1,
        "unit": "V",
    },
    "Instantaneous current L1": {
        "direction": "C0 01 C1 00 03 01 00 1F 07 00 FF 02 00",
        "divValue" : 100,
        "fixnum": 2,
        "unit": "A"
    } ,
    "Instantaneous current L2": {
        "direction": "C0 01 C1 00 03 01 00 33 07 00 FF 02 00",
        "divValue" : 100,
        "fixnum": 2,
        "unit": "A"
    },
    "Instantaneous active power import L1": {
        "direction": "C0 01 C1 00 03 01 00 15 07 00 FF 02 00",
        "divValue" : 1000,
        "fixnum": 3,
        "unit": "kW"
    },
    "Instantaneous active power export L2": {
        "direction": "C0 01 C1 00 03 01 00 29 07 00 FF 02 00",
        "divValue" : 1000,
        "fixnum": 3,
        "unit": "kW"
    },
    "Over Active Power threshold":{
        "direction": "C0 01 C1 00 03 01 00 01 23 00 FF 02 00",
        "divValue" : 1,
        "unit": "W"                        
    },
    "Active accumulative energy import":{
        "direction": "C0 01 C1 00 03 01 00 01 08 00 FF 02 00",
        "divValue" : 100,
        "unit": "kW"
    },
    "Active accumulative energy export":{
        "direction": "C0 01 C1 00 03 01 00 02 08 00 FF 02 000",
        "divValue" : 100,
        "unit": "kW"

    },
    "prepay-current balance":{
        "direction": "C0 01 C1 00 03 00 00 60 50 06 FF 02 00",
        "divValue" : 100,
        "unit": "credit"
    },
    "remote_disconnect(data)":{
        "direction": "C3 01 C1 00 46 00 00 60 03 0A FF 01 01 0F 00",
    },
    "remote_reconnect(data)":{
        "direction": "C3 01 C1 00 46 00 00 60 03 0A FF 02 01 0F 00",
    },
    "Token gateway enter token":{
        "direction": "C3 01 C1 00 46 00 00 60 03 0A FF 01 01 0F 00",
    }
    
}

const Addr = "22 40 00 00 00 19"; // meterAddr的值
module.exports = {
    readDirection,
    Addr
}