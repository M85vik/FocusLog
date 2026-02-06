import {model, Schema} from 'mongoose'

// 1. Make Schema 

const timeseriesSchema = new Schema(
    {
        hours:{
            type:Number,
            default:0
        },

        startTime:{
            type:Date
        },

        endTime:{
            type:Date
        }
    }
)


// make model


const Timeseries = model("Timeseries", timeseriesSchema);


export default Timeseries