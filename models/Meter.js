import mongoose, {Schema, model, models} from 'mongoose';

let Meter = new Schema({
    meterno: {
        type: String,
        require: true,
        unique: true
    },
    metermodel: String,
    manufacturer: String,
    orgcode: String,
    ctratio: String,
    ptratio: String,
    protocol: String,
    builddata: {
        type: Date,
    },
    metertype: {
        type: String,
        require: true,
    },
    metermode: {
        type: String,
        require: true,
    },

 
})
mongoose.models = {}
const Test = model('Meter', Meter);

export default Test;