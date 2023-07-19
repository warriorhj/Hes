const readDirection = {
    "Instantaneous voltage L1": {
        "direction": "C0 01 C1 00 03 01 00 0F 07 00 FF 02 00",
        "divValue" : 10
    },
    "Instantaneous current L1": {
        "direction": "C0 01 C1 00 03 01 00 1F 07 00 FF 02 00",
        "divValue" : 100
    } ,
    "Instantaneous current L2": {
        "direction": "C0 01 C1 00 03 01 00 33 07 00 FF 02 00",
        "divValue" : 100
    },
    "Instantaneous active power import L1": {
        "direction": "C0 01 C1 00 03 01 00 01 07 00 FF 02 00",
        "divValue" : 1000
    },
    "Instantaneous active power export L2": {
        "direction": "C0 01 C1 00 03 01 00 02 07 00 FF 02 00",
        "divValue" : 1000
    },
}
module.exports = {
    readDirection
}